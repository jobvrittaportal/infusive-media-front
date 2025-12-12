import React, { useEffect, useState } from 'react';
import {
  Drawer, DrawerOverlay, DrawerContent, DrawerHeader, DrawerBody,
  DrawerCloseButton, DrawerFooter, Text, SimpleGrid, Flex,
  Box,
  Button
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { IIndustrtyType, defaultIndustryType } from './model';
import * as yup from 'yup';
import { AddIcon } from '@chakra-ui/icons';
import CustomButton from '../../../components/CustomButton';
import FormInput from '../../../components/FormInput/FormInput';
import { useFetch } from '../../../hooks/useFetch';
import { CustomToast } from '../../../components';

interface DetailProps {
  isOpen: boolean;
  onClose: () => void;
  industries?: IIndustrtyType | null;
  loadIndustries: () => void;
}

const Detail: React.FC<DetailProps> = ({ isOpen, onClose, industries, loadIndustries }) => {
  const { addToast } = CustomToast();
  const { fetchApi } = useFetch(addToast);
  const [loading, setLoading] = useState(false);

  const schema = yup.object({
    industryName: yup.string().required("Industry Type is required"),
  });

  const { handleSubmit, control, reset, formState: { errors } } = useForm<IIndustrtyType>({
    defaultValues: defaultIndustryType,
    resolver: yupResolver(schema),
  });

  const onSubmit = async (formData: IIndustrtyType) => {
    setLoading(true);
    const res = await fetchApi("IndustryType", industries?.id ? "PUT" : "POST", formData, null, "Submitted");
    setLoading(false);
    if (res) {
      onClose();
      loadIndustries();
    }
  };

  useEffect(() => {
    if (industries?.id) reset(industries);
    else reset(defaultIndustryType);
  }, [isOpen, industries]);

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="md">
      <DrawerOverlay />
      <DrawerContent >
        <DrawerCloseButton />

        <DrawerHeader >
          <Text className="font-poppins font_dark text_semibold text_2xl">
            {industries?.id ? "Edit Industry" : "Add New Industry"}
          </Text>
        </DrawerHeader>

        <DrawerBody as="form" onSubmit={handleSubmit(onSubmit)} display="flex" flexDirection="column" justifyContent="space-between" height="100%">

          <Box >
            <FormInput isRequired control={control} name="industryName" type="string" label="Industry Name" placeholder="Enter Name" errors={errors} />
          </Box>
          <Flex justify="flex-end" mt={4} gap={2}>
            <Button title="Cancel" variant="secondary" onClick={onClose} bg='red' color='white'>Cancel</Button>
            <Button type="submit" title={industries?.id ? "Update" : "Add"} leftIcon={<AddIcon />} isLoading={loading} className='btn_theme'>Submit</Button>
          </Flex>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default Detail;
