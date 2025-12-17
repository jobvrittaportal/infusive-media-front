import React, { useEffect, useState } from 'react';
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerCloseButton,
  Text,
  Flex,
  Box
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { AddIcon } from '@chakra-ui/icons';

import { IPoc, defaultPoc } from './model';
import { useFetch } from '../../../hooks/useFetch';
import { CustomToast, Dropdown } from '../../../components';
import CustomButton from '../../../components/CustomButton';
import FormInput from '../../../components/FormInput/FormInput';
import { FlagDropdown } from '../../../components/flagPhoneDropdown/FlagPhoneDropdown';

interface DetailProps {
  isOpen: boolean;
  onClose: () => void;
  poc?: IPoc | null;
  loadPoc: () => void;
}

const schema = yup.object({
  name: yup.string().required('Name is required'),
  companyId: yup.number().moreThan(0, 'Company is required').required(),
  email: yup.string().email('Invalid email').required('Email is required'),
  phoneCountryCode: yup.string().required('Country code required'),
  phoneNumber: yup.string().required('Phone number required'),
  whatsapp: yup.string().required('Whatsapp number required'),
  designationId: yup.number().moreThan(0, 'Designation is required').required(),
});

type FormSchema = yup.InferType<typeof schema>;

const Detail: React.FC<DetailProps> = ({
  isOpen,
  onClose,
  poc,
  loadPoc
}) => {
  const { addToast } = CustomToast();
  const { fetchApi } = useFetch(addToast);

  const [loading, setLoading] = useState(false);

  const [companies, setCompanies] = useState<any[]>([]);
  const [designations, setDesignations] = useState<any[]>([]);
  const [dialCodes, setDialCodes] = useState<any[]>([]);

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormSchema>({
    defaultValues: defaultPoc,
    resolver: yupResolver(schema) as any,
  });


  const loadCompanyDropDown = async () => {
    const res = await fetchApi('Dropdown/company', 'GET');
    if (res) {
      setCompanies(res);
    }
  };

  const loadDesignationDropDown = async () => {
    const res = await fetchApi('Dropdown/designations', 'GET');
    if (res) {
      setDesignations(res);
    }
  };

  const loadCountryCodeDropDown = async () => {
    const res = await fetchApi('Dropdown/countrycodedropdown', 'GET');
    if (res) {
      const formatted = res.map((x: any) => ({
        ...x,
        companyCountrycode: `${x.code} (${x.dialCode})`,
        displayOnlyFlagCode: x.dialCode,
      }));
      setDialCodes(formatted);
    }
  };


  const onSubmit = async (data: FormSchema) => {
    setLoading(true);

    const res = await fetchApi(
      'CompanyPoc',                    
      poc ? 'PUT' : 'POST',
      data,
      null,
      'Submitted'
    );

    setLoading(false);

    if (res) {
      onClose();
      loadPoc();
    }
  };

  useEffect(() => {
    loadCompanyDropDown();
    loadDesignationDropDown();
    loadCountryCodeDropDown();
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    if (poc) {
      reset(poc);
    } else {
      reset(defaultPoc);
    }
  }, [isOpen, poc, reset]);


  return (
    <Drawer isOpen={isOpen} onClose={onClose} placement="right" size="md">
      <DrawerContent borderRadius="xl" p={2}>
        <DrawerCloseButton />

        <DrawerHeader textAlign="center">
          <Text className="font-poppins font_dark text_semibold text_2xl">
            {poc ? 'Edit POC' : 'Add New POC'}
          </Text>
        </DrawerHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <DrawerBody overflowY="auto" maxH="80vh" pr={2}>

            <Dropdown
              isRequired
              control={control}
              name="companyId"
              label="Company"
              options={companies}
              valueKey="companyId"
              labelKey="companyName"
              errors={errors}
            />

            <FormInput
              isRequired
              control={control}
              name="name"
              label="POC Name"
              placeholder="Enter POC Name"
              errors={errors}
            />

            <Dropdown
              isRequired
              control={control}
              name="designationId"
              label="Designation"
              options={designations}
              valueKey="designationId"     
              labelKey="designationName"
              errors={errors}
            />

            <FormInput
              isRequired
              control={control}
              name="email"
              label="Email"
              placeholder="Enter Company Email"
              errors={errors}
            />

            <Flex gap={3}>
              <Box flex="0.4" mb="-6px">
                <FlagDropdown
                  isRequired
                  name="phoneCountryCode"
                  label="Phone No."
                  control={control}
                  errors={errors}
                  options={dialCodes}
                  placeholder="Select Code"
                />
              </Box>

              <Box flex="1" mt="24px">
                <FormInput
                  control={control}
                  name="phoneNumber"
                  label=""
                  placeholder="Enter Phone"
                  errors={errors}
                />
              </Box>
            </Flex>

            <FormInput
              isRequired
              control={control}
              name="whatsapp"
              label="Whatsapp No."
              placeholder="Enter Whatsapp Number"
              errors={errors}
            />

            <FormInput
              isRequired
              control={control}
              name="linkedinUrl"
              label="Linkedin Url"
              placeholder="Enter linkedin Url"
              errors={errors}
            />

          </DrawerBody>

          <DrawerFooter>
            <Flex justify="center" gap={4} mb={4}>
              <CustomButton
                title="Cancel"
                bg="red"
                color="white"
                onClick={onClose}
              />
              <CustomButton
                type="submit"
                title={poc ? 'Update' : 'Add'}
                leftIcon={<AddIcon />}
                bg="green"
                color="white"
                isLoading={loading}
              />
            </Flex>
          </DrawerFooter>
        </form>
      </DrawerContent>
    </Drawer>
  );
};

export default Detail;


