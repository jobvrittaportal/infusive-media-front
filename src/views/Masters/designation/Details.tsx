import React, { useEffect, useState } from 'react';
import {
  Drawer, DrawerOverlay, DrawerContent, DrawerHeader, DrawerBody,
  DrawerCloseButton, DrawerFooter, Text, SimpleGrid, Flex,
  Box
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { IDesignation, defaultDesignation} from './model';
import * as yup from 'yup';
import { AddIcon } from '@chakra-ui/icons';
import CustomButton from '../../../components/CustomButton';
import FormInput from '../../../components/FormInput/FormInput';
import { useFetch } from '../../../hooks/useFetch';
import { CustomToast } from '../../../components';

interface DetailProps {
  isOpen: boolean;
  onClose: () => void;
  designations?: IDesignation | null;
  loadDesignation: () => void;
}

const Detail: React.FC<DetailProps> = ({ isOpen, onClose, designations, loadDesignation }) => {
  const { addToast } = CustomToast();
  const { fetchApi } = useFetch(addToast);

  const schema = yup.object({
    designationName: yup.string().required("Designation is required"),
  });

  const { handleSubmit, control, reset, formState: { errors } } = useForm<IDesignation>({
    defaultValues: defaultDesignation,
    resolver: yupResolver(schema),
  });

  const onSubmit = async (formData: IDesignation) => {
    const res = await fetchApi("Designation", designations?.id ? "PUT" : "POST", formData, null, "Submitted");
    if (res) {
      onClose();
      loadDesignation();
    }
  };

  useEffect(() => {
    if (designations?.id) 
        reset(designations);
    else reset(defaultDesignation);
  }, [isOpen, designations]);

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="md">
      <DrawerOverlay />
      <DrawerContent >
        <DrawerCloseButton />

        <DrawerHeader textAlign="left">
          <Text className="font-poppins font_dark text_semibold text_2xl">
            {designations?.id ? "Edit Designation" : "Add New Designation"}
          </Text>
        </DrawerHeader>

       
          <DrawerBody as="form" onSubmit={handleSubmit(onSubmit)}>
           <Box>
              <FormInput isRequired control={control} name="designationName" type="string" label="Designation" placeholder="Enter Designation" errors={errors}/>
           </Box>
          </DrawerBody>

          <DrawerFooter >
            <Flex justify="right" gap={4} w="100%">
              <CustomButton title="Cancel" variant="secondary" onClick={onClose} bg='red' color='white'/>
              <CustomButton type="submit" title={designations?.id ? "Update" : "Add"} leftIcon={<AddIcon />} className='btn_theme'/>
            </Flex>
          </DrawerFooter>
       
      </DrawerContent>
    </Drawer>
  );
};

export default Detail;
