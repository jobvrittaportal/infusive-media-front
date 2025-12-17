import React, { useEffect, useState } from "react";
import { ILead, defaultLead, LeadSchema } from "./model";
import { Drawer, DrawerBody, DrawerCloseButton, Text, DrawerContent, DrawerFooter, DrawerHeader, Flex, SimpleGrid, useSafeLayoutEffect } from "@chakra-ui/react";
import FormInput from "../../../components/FormInput/FormInput";
import { Dropdown } from "../../../components/DropDown/DropDown";
import CustomButton from "../../../components/CustomButton";
import { AddIcon } from "@chakra-ui/icons";
import { useAuth } from "../../../hooks/useAuth";
import { CustomToast } from "../../../components";
import { useFetch } from "../../../hooks/useFetch";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

interface DetailProps {
    isOpen: boolean;
    onClose: () => void;
    leads: ILead | null;
    loadLead: () => void;
};

const Details: React.FC<DetailProps> = ({ isOpen, onClose, leads, loadLead }) => {
    const { addToast } = CustomToast();
    const { fetchApi } = useFetch(addToast);
    const [loading, setLoading] = useState<boolean>(false);
    const [companyDropDown, setCompanyDropDown] = useState<[]>([]);
    const [pocDropDown, setPocDropDown] = useState<[]>([]);
    const [sourceDropDown, setSourceDropDown] = useState<[]>([]);
    const [statusDropDown, setStatusDropDown] = useState<[]>([]);


    const { handleSubmit, control, reset, formState: { errors } } = useForm<ILead>({
        defaultValues: defaultLead,
        // resolver: yupResolver(LeadSchema),
    });

    const onSubmit = async () => {
        
    };

    const loadCompanyDropDown = async () => {
        const res = await fetchApi('Dropdown/company', 'GET');
        if (res) {
            setCompanyDropDown(res);
        }
    };

    const loadStatus = async () => {
        const res = await fetchApi("Dropdown/status", "GET");
        if (res) setStatusDropDown(res);
    };

    const loadSource = async () => {
        const res = await fetchApi("Dropdown/source", "GET");
        if (res) setSourceDropDown(res);
    };

    useEffect(() => {
        loadCompanyDropDown();
        loadStatus();
        loadSource();
    }, []);

    return (
        <Drawer isOpen={isOpen} onClose={onClose} placement="right" size="md">
            <DrawerContent borderRadius="xl" p={2}>
                <DrawerCloseButton />

                <DrawerHeader textAlign="center">
                    <Text className="font-poppins font_dark text_semibold text_2xl">
                        {leads ? "Edit Lead" : "Add Lead"}
                    </Text>
                </DrawerHeader>

                <form id="company-form" onSubmit={handleSubmit(onSubmit)} >
                    <DrawerBody overflowY="auto" maxH="80vh" pr={2}>
                        <SimpleGrid columns={1} spacing={6} mt={2}>
                            <Dropdown isRequired control={control} name='companyId' label="Company" options={companyDropDown} valueKey='companyId' labelKey='companyName' errors={errors}/>

                            <Dropdown isRequired control={control} name='pocId' label="POC" options={pocDropDown} valueKey='companyId' labelKey='companyName' errors={errors} />

                            <FormInput isRequired control={control} name="email" type="string" label="Email" placeholder="Enter Email" errors={errors} />

                            <FormInput isRequired control={control} name="whatsapp" type="string" label="WhatsApp" placeholder="Enter Whatsapp" errors={errors} />

                            <Dropdown isRequired control={control} name='sourceId' label='Select Source' options={sourceDropDown} labelKey='sourceName' valueKey='sourceId' errors={errors} />

                            <Dropdown isRequired control={control} name='statusId' label='Select Status' options={statusDropDown} labelKey='statusName' valueKey='statusId' errors={errors} />
                                                
                        </SimpleGrid>
                    </DrawerBody>

                    <DrawerFooter>
                        <Flex justify="center" gap={4} mb={4}>
                            <CustomButton title="Cancel" variant="secondary" onClick={onClose} bg='red' color='white' />
                            <CustomButton type="submit" title={leads ? "Update" : "Add"} leftIcon={<AddIcon />} className='btn_theme' isLoading={loading} />
                        </Flex>
                    </DrawerFooter>
                </form>
            </DrawerContent>
        </Drawer>
    )
}

export default Details; 
