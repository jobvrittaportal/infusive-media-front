import React, { useEffect, useState } from 'react';
import {
    Drawer, DrawerOverlay, DrawerContent, DrawerHeader, DrawerBody,
    DrawerCloseButton, DrawerFooter, Text, SimpleGrid, Flex,
    GridItem
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { AddIcon } from '@chakra-ui/icons';
import { defaultCity, ICity, ICountryOption, IStateOption } from './model';
import { yupResolver } from '@hookform/resolvers/yup';
import { CustomButton, CustomToast, Dropdown, FormInput } from '../../../components';
import { useFetch } from '../../../hooks/useFetch';


interface DetailProps {
    isOpen: boolean;
    onClose: () => void;
    cities?: ICity | null;
    loadcities: () => void;
}

const Detail: React.FC<DetailProps> = ({ isOpen, onClose, cities, loadcities }) => {
    const [country, setCountry] = useState<ICountryOption[]>([]);
    const [state, setState] = useState<IStateOption[]>([]);
    const { addToast } = CustomToast();
    const { fetchApi } = useFetch(addToast);

    const schema = yup.object({
        name: yup.string().required("Name is required"),
    });


    const { handleSubmit, control, reset, formState: { errors }, watch } = useForm<ICity>({
        defaultValues: defaultCity,
        resolver: yupResolver(schema),
    });

    const countryId = watch("countryId");


    const onSubmit = async (formData: ICity) => {
        const res = await fetchApi("City", cities?.id ? "PUT" : "POST", formData, null, "Submitted");
        if (res) {
            onClose();
            loadcities();
        }
    };

    const loadCountry = async () => {
        const res = await fetchApi('Country/dropdown', 'GET', null, null, '');
        if (res) {
            setCountry(res as ICountryOption[]);
        }
    };

    const loadStates = async (countryId: number) => {
        const res = await fetchApi(`State/dropdown/${countryId}`, 'GET', null, null, '');
        if (res) {
            setState(res as IStateOption[]);
        }
    };

    useEffect(() => {
        if (cities?.id) reset(cities);
        else reset(defaultCity);
    }, [isOpen, cities]);

    useEffect(() => {
        if (isOpen) {
            // loadState()
            loadCountry()
        }
    }, [isOpen]);

    useEffect(() => {
        if (countryId) loadStates(countryId);
    }, [countryId]);


    return (
        <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="md">
            <DrawerOverlay />
            <DrawerContent p={2}>
                <DrawerCloseButton />
                <DrawerHeader textAlign="left">
                    <Text className="font-poppins font_dark text_semibold text_2xl">
                        {cities?.id ? "Edit City" : "Add New City"}
                    </Text>
                </DrawerHeader>
                
                    <DrawerBody as="form" onSubmit={handleSubmit(onSubmit)}>
                        
                    <Dropdown isRequired label='Country' name='countryId' control={control} options={country} labelKey='name' valueKey='id' errors={errors} />
                    <Dropdown isRequired label='State' name='stateId' control={control} options={state} labelKey='name' valueKey='id' errors={errors} />
                    <FormInput isRequired control={control} name="name" type="string" label="City Name" placeholder="Enter Name" errors={errors} />
                        
                    </DrawerBody>

                    <DrawerFooter >
                        <Flex justify="right" gap={4} w="100%">
                            <CustomButton title="Cancel" variant="secondary" onClick={onClose} bg='red' color='white' />
                            <CustomButton type="submit" title={cities?.id ? "Update" : "Add"} leftIcon={<AddIcon />} bg='green' color='white' />
                        </Flex>
                    </DrawerFooter>
              
            </DrawerContent>
        </Drawer>
    );
};

export default Detail;
