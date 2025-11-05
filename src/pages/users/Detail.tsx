import React, { useEffect, useState } from 'react';
import {
    Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, ModalFooter, Text, SimpleGrid, Flex, Center,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { IUser, defaultUser } from './model';
import * as yup from 'yup';
import { useMutation, useLazyQuery } from '@apollo/client/react';
import { CREATE_USER_MUTATION, UPDATE_USER_MUTATION } from './graphql/mutation';
import { GET_ROLES } from './graphql/query';
import { IRole } from '../role/helpers';
import { FormInput, MultiSelectTypeahead } from '../../common/components/formElements';
import { AddIcon } from '@chakra-ui/icons';
import CustomButton from '../../common/components/customButton';
import { removeTypeNameFromformData } from '../../common/utils/common';

interface DetailProps {
    isOpen: boolean;
    onClose: () => void;
    refetch: () => void;
    user?: IUser | null;
}

const Detail: React.FC<DetailProps> = ({ isOpen, onClose, refetch, user }) => {
    const [rolesText, setRolesText] = useState('');

    const schema = yup.object().shape({
        firstName: yup.string().required('First Name is required'),
        lastName: yup.string().required('Last Nmae is requird'),
        email: yup.string().email('Inavlid email formate').required('Email is required'),
        mobile: yup.string().required('Moblie number is required'),
        password: yup.string().when([], {
            is: () => !user,
            then: schema => schema
                .required('Password is required')
                .min(6, 'Password must be at least 6 characters'),
            otherwise: schema => schema.notRequired(),
        }),
        roles: yup.array().min(1, 'Select at least one role'),

    });

    const { handleSubmit, control, reset, formState: { errors } } = useForm<IUser>({
        defaultValues: defaultUser,
        resolver: yupResolver(schema),
    });

    const [createUser, { loading: creating }] = useMutation(CREATE_USER_MUTATION, {
        onCompleted: () => {
            refetch();
            reset(defaultUser);
            onClose();
        },
        onError: (err) => alert(err.message),
    });

    const [updateUser, { loading: updating }] = useMutation(UPDATE_USER_MUTATION, {
        onCompleted: () => {
            refetch();
            reset(defaultUser);
            onClose();
        },
        onError: (err) => alert(err.message),
    });

    const [getRoles, { data: rolesData, loading: rolesLoading }] = useLazyQuery<{ roles: IRole[] }>(
        GET_ROLES,
        { fetchPolicy: 'network-only' }
    );

    useEffect(() => {
        if (isOpen) {
            getRoles({ variables: { query: rolesText } });
            let roleName = '';
            if (user){
            roleName = user.roles?.map((r:any) => r.name).join(', ') || '';
            reset(user);
            }    
            else
                reset(defaultUser);
        }

    }, [rolesText, isOpen, getRoles, user, reset]);

    const roles: IRole[] = rolesData?.roles || [];

    const onSubmit = async (formData: IUser) => {
        const roleIds = (formData.roles || []).map((r: any) => r.id);
        const payload = { ...formData, roleIds };
        delete payload.roles;

        if (user?.id) {
           
            await updateUser({
                variables: {
                    id: user.id,
                    input: removeTypeNameFromformData(payload),
                },
            });
        } else {
            await createUser({
                variables: {
                    input: payload,
                },
            });
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="xl">
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
                            <FormInput
                                isRequired
                                control={control}
                                name="firstName"
                                type="string"
                                label="First Name"
                                placeholder="Enter your First Name"
                                errors={errors}
                            />
                            <FormInput
                                isRequired
                                control={control}
                                name="lastName"
                                type="string"
                                label="Last Name"
                                placeholder="Enter your Last Name"
                                errors={errors}
                            />
                            <FormInput
                                isRequired
                                control={control}
                                name="email"
                                type="string"
                                label="Email"
                                placeholder="Enter your email"
                                errors={errors}
                            />
                            <FormInput
                                isRequired={user ? false : true}
                                control={control}
                                name="password"
                                type="string"
                                label="Password"
                                placeholder="Enter your password"
                                errors={errors}
                            />
                            <FormInput
                                isRequired
                                control={control}
                                name="mobile"
                                type="string"
                                label="Mobile"
                                placeholder="Enter your mobile number"
                                errors={errors}
                            />
                            <FormInput
                                control={control}
                                name="altEmail"
                                type="string"
                                label="Alternate Email"
                                placeholder="Enter your alternate email"
                                errors={errors}
                            />
                            <FormInput
                                control={control}
                                name="altMobile"
                                type="string"
                                label="Alternate Mobile"
                                placeholder="Enter your alternate mobile number"
                                errors={errors}
                            />

                            <MultiSelectTypeahead
                                name="roles"
                                control={control}
                                options={roles}
                                onCompletion={(query) => setRolesText(query || '')}
                                loading={rolesLoading}
                                optionValue="id"
                                optionLabel="name"
                                placeholder="Search Roles..."
                            />

                        </SimpleGrid>
                    </ModalBody>

                    <ModalFooter>
                        <Flex justify="center" gap={4} mb={4}>
                            <CustomButton label='Cancel' variantType="secondary" onClick={onClose} />
                            <CustomButton type='submit' label={user ? 'Update' : 'Add'} leftIcon={<AddIcon />} loading={creating || updating} />
                        </Flex>
                    </ModalFooter>
                </form>
            </ModalContent>
        </Modal>
    );
};

export default Detail;
