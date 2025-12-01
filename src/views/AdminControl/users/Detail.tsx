import React, { useEffect, useState } from 'react';
import {
    Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, ModalFooter, Text, SimpleGrid, Flex, Center,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { IUser, defaultUser } from './model';
import * as yup from 'yup';
import { AddIcon } from '@chakra-ui/icons';
import CustomButton from '../../../components/CustomButton';
import FormInput from '../../../components/FormInput/FormInput';
import MultiSelectTypeaHeads from '../../../components/multiSelectTypeHeads/MultiSelectTypeHeads';
import { useFetch } from '../../../hooks/useFetch';
import { CustomToast } from '../../../components';
import { IRole } from '../roles/model';


interface DetailProps {
    isOpen: boolean;
    onClose: () => void;
    user?: IUser | null;
    loadUser: () => void;
}

const Detail: React.FC<DetailProps> = ({ isOpen, onClose, user, loadUser }) => {
    const [roles, setRoles] = useState<IRole[]>([]);
    const [loading, setLoading] = useState(false);
    const [rolesText, setRolesText] = useState('');
    const { addToast } = CustomToast();
    const { fetchApi } = useFetch(addToast);

    const schema = yup.object({
        name: yup.string().required("Name is required"),
        email: yup.string().email("Invalid email format").required("Email is required"),
        mobile: yup.string().required("Mobile number is required"),
        password: user
            ? yup.string().notRequired()
            : yup.string().required("Password is required").min(6),
        roles: yup.array().min(1, "Select at least one role"),
    });

    type FormSchema = yup.InferType<typeof schema>;

    const { handleSubmit, control, reset, formState: { errors } } = useForm<FormSchema>({
        defaultValues: defaultUser as Partial<FormSchema>,
        resolver: yupResolver(schema) as any,
    });


    const onSubmit = async (formData: FormSchema) => {
        const payload = {
            ...formData,
            roles: formData.roles?.map((r: any) => r.id)
        };

        if (user) {
            delete payload.password;
            const res = await fetchApi("User", "PUT", payload, null, "Submited");
            if (res) {
                onClose();
                loadUser();
            }
        } else {
            const res = await fetchApi("User", "POST", payload, null, "Submited");
            if (res) {
                onClose();
                loadUser();
            }
        }
    };

    const getRoles = async () => {
        const res = await fetchApi("Dropdown/getRoles", "GET", null, null, "");
        if (res) {
            setRoles(res);
        }
    };

    useEffect(() => {
        getRoles();
    }, []);

    useEffect(() => {
        if (isOpen) {
            if (user) reset(user);
            else reset(defaultUser);
        } else {
            reset(defaultUser);
        }
    }, [isOpen, user]);


    return (
        <Modal isOpen={isOpen} onClose={onClose} size="3xl">
            <ModalOverlay />
            <ModalContent borderRadius="xl" p={2}>
                <ModalHeader textAlign="center">
                    <Text className="font-poppins font_dark text_semibold text_2xl">
                        {user ? 'Update User' : 'Add New User'}
                    </Text>
                </ModalHeader>
                <ModalCloseButton />

                <form id="user-form" onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
                    <ModalBody>
                        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                            <FormInput isRequired control={control} name="name" type="string" label="Name" placeholder="Enter your Name" errors={errors} />
                            <FormInput isRequired control={control} name="email" type="string" label="Email" placeholder="Enter your email" errors={errors} />
                            {!user && (<FormInput isRequired control={control} name="password" type="string" label="Password" placeholder="Enter your password" errors={errors} />)}
                            {/* <FormInput isRequired control={control} name="password" type="string" label="Password" placeholder="Enter your password" errors={errors} /> */}
                            <FormInput isRequired control={control} name="mobile" type="string" label="Mobile" placeholder="Enter your mobile number" errors={errors} />

                        </SimpleGrid>

                        <Flex direction="column" mt={4} gap={2}>
                            <Text >Role</Text>
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
                    </ModalBody>

                    <ModalFooter>
                        <Flex justify="center" gap={4} mb={4}>
                            <CustomButton title='Cancel' variant="secondary" onClick={onClose} />
                            <CustomButton type='submit' title={user ? 'Update' : 'Add'} leftIcon={<AddIcon />} />
                        </Flex>
                    </ModalFooter>
                </form>
            </ModalContent>
        </Modal>
    );
};

export default Detail;
