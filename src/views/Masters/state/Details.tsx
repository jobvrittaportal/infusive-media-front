import React, { useEffect, useState } from 'react';
import {
    Drawer, DrawerOverlay, DrawerContent, DrawerHeader, DrawerBody,
    DrawerCloseButton, DrawerFooter, Text, SimpleGrid, Flex,
    GridItem,
    Box
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { AddIcon } from '@chakra-ui/icons';
import { yupResolver } from '@hookform/resolvers/yup';
import { CustomButton, CustomToast, Dropdown, FormInput } from '../../../components';
import { useFetch } from '../../../hooks/useFetch';
import { defaultState, ICountryOption, IState } from './model';


interface DetailProps {
    isOpen: boolean;
    onClose: () => void;
    states?: IState | null;
    loadstates: () => void;
}

const Detail: React.FC<DetailProps> = ({ isOpen, onClose, states, loadstates }) => {
    const [country, setCountry] = useState<ICountryOption[]>([]);
    const { addToast } = CustomToast();
    const { fetchApi } = useFetch(addToast);

    const schema = yup.object({
        name: yup.string().required("Name is required"),
        countryId: yup.number().min(1).required("Country is required"),

    });

    const { handleSubmit, control, reset, formState: { errors } } = useForm<IState>({
        defaultValues: defaultState,
        resolver: yupResolver(schema),
    });

    const onSubmit = async (formData: IState) => {
        const res = await fetchApi("State", states?.id ? "PUT" : "POST", formData, null, "Submitted");
        if (res) {
            onClose();
            loadstates();
        }
    };

    const loadCountry = async () => {
        const res = await fetchApi('Country/dropdown', 'GET', null, null, '');
        if (res) {
            setCountry(res as ICountryOption[]);
        }
    };


    useEffect(() => {
        if (states?.id) reset(states);
        else reset(defaultState);
    }, [isOpen, states]);

    useEffect(() => {
        loadCountry()
    }, []);

    return (
        <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="md">
            <DrawerOverlay />
            <DrawerContent >
                <DrawerCloseButton />
                <DrawerHeader textAlign="left">
                    <Text className="font-poppins font_dark text_semibold text_2xl">
                        {states?.id ? "Edit State" : "Add New State"}
                    </Text>
                </DrawerHeader>

              
                    <DrawerBody as="form" onSubmit={handleSubmit(onSubmit)}>
                        <GridItem>
                            <Dropdown isRequired label='Country' name='countryId' control={control} options={country} labelKey='name' valueKey='id' errors={errors} />
                        </GridItem>
                       <Box>
                            <FormInput isRequired control={control} name="name" type="string" label="State Name" placeholder="Enter Name" errors={errors} />
                        </Box>


                    </DrawerBody>

                    <DrawerFooter >
                        <Flex justify="right" gap={4} w="100%">
                            <CustomButton title="Cancel" variant="secondary" onClick={onClose} bg='red' color='white' />
                            <CustomButton type="submit" title={states?.id ? "Update" : "Add"} leftIcon={<AddIcon />} className='btn_theme' />
                        </Flex>
                    </DrawerFooter>
              
            </DrawerContent>
        </Drawer>
    );
};

export default Detail;
