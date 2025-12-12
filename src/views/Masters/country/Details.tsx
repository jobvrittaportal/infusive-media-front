import React, { useEffect } from 'react';
import {
    Drawer, DrawerOverlay, DrawerContent, DrawerHeader, DrawerBody,
    DrawerCloseButton, DrawerFooter, Text, SimpleGrid, Flex,
    Box
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { AddIcon } from '@chakra-ui/icons';
import { defaultCountry, ICountry } from './model';
import { yupResolver } from '@hookform/resolvers/yup';
import { CustomButton, CustomToast, FormInput } from '../../../components';
import { useFetch } from '../../../hooks/useFetch';


interface DetailProps {
    isOpen: boolean;
    onClose: () => void;
    countries?: ICountry | null;
    loadCountries: () => void;
}

const Detail: React.FC<DetailProps> = ({ isOpen, onClose, countries, loadCountries }) => {
    const { addToast } = CustomToast();
    const { fetchApi } = useFetch(addToast);

    const schema = yup.object({
        name: yup.string().required("Name is required"),
        code: yup.string().required("Code is required"),
        dialCode: yup.string().required("DialCode is required"),
        // flagUrl: yup.string().required("Flag is required"),

    });

    const { handleSubmit, control, reset, formState: { errors } } = useForm<ICountry>({
        defaultValues: defaultCountry,
        resolver: yupResolver(schema),
    });

    const onSubmit = async (formData: ICountry) => {
        const res = await fetchApi("Country", countries?.id ? "PUT" : "POST", formData, null, "Submitted");
        if (res) {
            onClose();
            loadCountries();
        }
    };

    useEffect(() => {
        if (countries?.id) reset(countries);
        else reset(defaultCountry);
    }, [isOpen, countries]);

    return (
        <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="md">
            <DrawerOverlay />
            <DrawerContent >
                <DrawerCloseButton />

                <DrawerHeader>
                    <Text className="font-poppins font_dark text_semibold text_2xl">
                        {countries?.id ? "Edit Country" : "Add New Country"}
                    </Text>
                </DrawerHeader>
                    <DrawerBody as="form" onSubmit={handleSubmit(onSubmit)}>
                        <Box >
                            <FormInput isRequired control={control} name="name" type="string" label="Country Name" placeholder="Enter Name" errors={errors} />
                            <FormInput isRequired control={control} name="code" type="string" label="Country Code" placeholder="Enter Country Code" errors={errors} />
                            <FormInput isRequired control={control} name="dialCode" type="string" label="Dial Code" placeholder="Enter Dial Code" errors={errors} />
                            <FormInput isRequired control={control} name="flagUrl" type="string" label="Flag Url" placeholder="Enter Flag URL" errors={errors} />

                        </Box>
                    </DrawerBody>

                    <DrawerFooter >
                        <Flex justify="right" gap={4} w="100%">
                            <CustomButton title="Cancel" variant="secondary" onClick={onClose} bg='red' color='white' />
                            <CustomButton type="submit" title={countries?.id ? "Update" : "Add"} leftIcon={<AddIcon />} className='btn_theme' />
                        </Flex>
                    </DrawerFooter>
               
            </DrawerContent>
        </Drawer>
    );
};

export default Detail;
