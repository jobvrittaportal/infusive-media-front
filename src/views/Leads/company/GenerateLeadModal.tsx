import React, { useEffect, useState } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, Flex, Box } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { CustomButton, Dropdown } from '../../../components';
import { useFetch } from '../../../hooks/useFetch';
import { CustomToast } from '../../../components';
import { defaultLeadGenerate, LeadSchema, ILeadGenerate, ICompany } from './model';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    selectedPOCs: number[];
    selectedCompany?: ICompany | null;
}

const GenerateLeadModal = ({ isOpen, onClose, selectedPOCs, selectedCompany }: Props) => {

    const { addToast } = CustomToast();
    const { fetchApi } = useFetch(addToast);
    const [userDropDown, setUserDropDown] = useState<[]>([]);
    const [sourceDropDown, setSourceDropDown] = useState<[]>([]);
    const [statusDropDown, setStatusDropDown] = useState<[]>([]);

    const { control, handleSubmit, reset, formState: { errors } } = useForm<ILeadGenerate>({
        defaultValues: defaultLeadGenerate,
        resolver: yupResolver(LeadSchema),
    });

    const loadUser = async () => {
        const res = await fetchApi("Dropdown/users", "GET");
        if (res) setUserDropDown(res);
    };

    const loadSource = async () => {
        const res = await fetchApi("Dropdown/source", "GET");
        if (res) setSourceDropDown(res);
    };

    const loadStatus = async () => {
        const res = await fetchApi("Dropdown/status", "GET");
        if (res) setStatusDropDown(res);
    };

    useEffect(() => {
        if (isOpen) {
            loadUser();
            loadSource();
            loadStatus();
            reset(defaultLeadGenerate);
        }
    }, [isOpen]);

    const onSubmit = async (data: ILeadGenerate) => {
        const payload = {
            ...data,
            pocIds: selectedPOCs,
            companyId: selectedCompany?.id,
        };

        const res = await fetchApi("Lead/Generate", "POST", payload, null, "Lead Generated");
        if (res) {
            addToast({ message: "Lead generated successfully!", status: "success" });
            onClose();
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(0.8px)" />

            <ModalContent maxW="600px" bg="white" borderRadius="16px" border="1px solid #E5F1FF" boxShadow="0 8px 24px rgba(0,0,0,0.12)">
                <ModalHeader bg="#F0F6FF" borderTopRadius="16px" fontSize="xl" fontWeight="600" color="#0046B8" py={4}>
                    Generate Lead — {selectedCompany?.companyName}
                </ModalHeader>
                <ModalCloseButton color="#0046B8" />

                <ModalBody as="form" onSubmit={handleSubmit(onSubmit)} bg="#FAFCFF" px={6} py={6}>
                    <Box display="grid" gridGap="16px">
                        <Dropdown isRequired control={control} name='userId' label='Select User' options={userDropDown} labelKey='userName' valueKey='userId' errors={errors} />
                        <Dropdown isRequired control={control} name='sourceId' label='Select Source' options={sourceDropDown} labelKey='sourceName' valueKey='sourceId' errors={errors} />
                        <Dropdown isRequired control={control} name='statusId' label='Select Status' options={statusDropDown} labelKey='statusName' valueKey='statusId' errors={errors} />
                    </Box>
                    <Flex justify="center" gap={4} mt={6}>
                        <CustomButton title='Cancel' variant='secondary' onClick={onClose} bg='red' color='white' />
                        <CustomButton title='Submit' type="submit" isDisabled={selectedPOCs.length === 0} className='btn_theme' />
                    </Flex>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default GenerateLeadModal;
