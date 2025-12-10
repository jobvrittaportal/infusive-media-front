import React, { useEffect, useState } from 'react';
import {
  Drawer, DrawerOverlay, DrawerContent, DrawerHeader, DrawerBody,
  DrawerCloseButton, DrawerFooter, Text, SimpleGrid, Flex
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
      <DrawerContent p={2}>
        <DrawerCloseButton />

        <DrawerHeader textAlign="left">
          <Text className="font-poppins font_dark text_semibold text_2xl">
            {industries?.id ? "Edit Industry" : "Add New Industry"}
          </Text>
        </DrawerHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <DrawerBody>
            <SimpleGrid columns={{ base: 1 }} spacing={6} mt={3}>
              <FormInput isRequired control={control} name="industryName" type="string" label="Industry Name" placeholder="Enter Name" errors={errors}/>
            </SimpleGrid>
          </DrawerBody>

          <DrawerFooter >
            <Flex justify="end"  gap={4} w="100%">
              <CustomButton title="Cancel" variant="secondary" onClick={onClose} bg='red' color='white'/>
              <CustomButton type="submit" title={industries?.id ? "Update" : "Add"} leftIcon={<AddIcon />} isLoading={loading} bg='green' color='white'/>
            </Flex>
          </DrawerFooter>
        </form>
      </DrawerContent>
    </Drawer>
  );
};

export default Detail;
