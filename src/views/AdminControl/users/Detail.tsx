import React, { useEffect, useState } from 'react';
import {
    Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody,
    ModalCloseButton, ModalFooter, Text, SimpleGrid, Flex,
    Box,
    Drawer,
    DrawerOverlay,
    DrawerContent,
    DrawerHeader,
    DrawerCloseButton,
    DrawerBody,
    DrawerFooter,
    FormLabel
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { IUser, defaultUser } from './model';
import * as yup from 'yup';
import { AddIcon } from '@chakra-ui/icons';
import CustomButton from '../../../components/CustomButton';
import FormInput from '../../../components/FormInput/FormInput';
import { useFetch } from '../../../hooks/useFetch';
import { CustomToast } from '../../../components';
import { IRole } from '../roles/model';
import MultiSelectTypeaHeads from '../../../components/multiSelectTypeHeads/MultiSelectTypeHeads';

interface DetailProps {
    isOpen: boolean;
    onClose: () => void;
    user?: IUser | null;
    loadUser: () => void;
}

const Detail: React.FC<DetailProps> = ({ isOpen, onClose, user, loadUser }) => {
    const [roles, setRoles] = useState<IRole[]>([]);
    const [rolesText, setRolesText] = useState('');
    const [loading, setLoading] = useState(false);
    const [showForm, setShowForm] = useState(false);

    const { addToast } = CustomToast();
    const { fetchApi } = useFetch(addToast);

    const schema = yup.object({
        userId: yup.string().required("User Id is required"),
        name: yup.string().required("Name is required"),
        email: yup.string().email("Invalid email format").required("Email is required"),
        mobile: yup.string().required("Mobile number is required"),
        password: user
            ? yup.string().notRequired()
            : yup.string().required("Password is required").min(6),
        roles: yup.array().min(1, "Select at least one role"),
    });

    type FormSchema = yup.InferType<typeof schema>;

    const { handleSubmit, control, reset, watch, formState: { errors } } = useForm<FormSchema>({
        defaultValues: defaultUser as Partial<FormSchema>,
        resolver: yupResolver(schema) as any,
    });

    const userIdValue = watch("userId");

    const checkUserId = async () => {
        if (!userIdValue) {
            return;
        }

        const res = await fetchApi(`Support/CheckUser?userId=${userIdValue}`, "GET", null, null, "");

        if (res?.success) {
            addToast({ message: "User ID found", status: "success" });
            setShowForm(true);
        } else {
            addToast({ message: "User ID not found", status: "error" });
            setShowForm(false);
        }
    };


    const onSubmit = async (formData: FormSchema) => {
        const payload = {
            ...formData,
            roles: formData.roles?.map((r: any) => r.id)
        };

        const res = await fetchApi("User", user ? "PUT" : "POST", payload, null, "Submitted");

        if (res) {
            onClose();
            loadUser();
        }
    };

    const getRoles = async () => {
        const res = await fetchApi("Dropdown/getRoles", "GET", null, null, "");
        if (res) setRoles(res);
    };

    useEffect(() => {
        getRoles();
    }, []);

    useEffect(() => {
        if (user) {
            reset(user);
            setShowForm(true);
        } else {
            reset(defaultUser);
            setShowForm(false);
        }
    }, [isOpen, user]);


    return (
        <Box alignContent="center" justifyContent="center">
            <Drawer isOpen={isOpen} onClose={onClose} size="md" >
                <DrawerOverlay />
                <DrawerContent borderRadius="xl" p={2}>
                    <DrawerHeader borderBottom={5}>
                        <Text className="font-poppins font_dark text_semibold text_2xl">
                            Add New User
                        </Text>
                    </DrawerHeader>
                    <DrawerCloseButton />

                    <DrawerBody as="form" onSubmit={handleSubmit(onSubmit)} id="user-form" autoComplete="off" justifyContent="space-between"  display="flex" flexDirection="column">
                        {/* form inputs here */}

                        <Flex gap={4} >
                            <FormInput disable={!!user} isRequired control={control} name='userId' type='string' label='User Id' placeholder='Enter User Id' errors={errors} />
                            {!user && (
                                <Box alignContent="center" mt={10}>
                                    <CustomButton title='Submit' onClick={checkUserId} bg='#f2f2f2' />
                                </Box>
                            )}
                        </Flex>

                        {showForm && (
                            <>

                                <FormInput isRequired control={control} name="name" type="string" label="Name" placeholder="Enter Name" errors={errors} />
                                <FormInput isRequired control={control} name="email" type="string" label="Email" placeholder="Enter Email" errors={errors} />
                                {!user && (
                                    <FormInput isRequired control={control} name="password" type="string" label="Password" placeholder="Enter Password" errors={errors} />
                                )}
                                <FormInput isRequired control={control} name="mobile" type="string" label="Mobile" placeholder="Enter Mobile Number" errors={errors} />


                                <Flex direction="column" gap={2}>
                                    <FormLabel className='font-poppins'>Role</FormLabel>
                                    <MultiSelectTypeaHeads
                                        name="roles"
                                        control={control}
                                        options={roles}
                                        onCompletion={(query) => setRolesText(query || '')}
                                        loading={loading}
                                        optionValue="id"
                                        optionLabel="name"
                                        placeholder="Search Roles..."
                                    />
                                </Flex>
                            </>
                        )}
                        <Flex justify="flex-end" gap={4} mb={4} mt={39}>
                            {showForm && (
                                <>
                                    <CustomButton title='Cancel' variant="secondary" bg='#f2f2f2' onClick={onClose} />
                                    <CustomButton type='submit' title='Add' leftIcon={<AddIcon />} className='btn_theme' />
                                </>
                            )}
                        </Flex>
                    </DrawerBody>




                </DrawerContent>
            </Drawer>
        </Box>
    );
};

export default Detail;
