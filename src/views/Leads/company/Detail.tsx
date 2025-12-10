import React, { useEffect, useState } from 'react';
import {
  Text, SimpleGrid, Flex, Box, FormControl, FormLabel, FormErrorMessage, Input, Select, Image, HStack, Button, Menu, MenuButton, MenuList, MenuItem, DrawerFooter, DrawerContent, Drawer, DrawerBody,
  DrawerHeader, DrawerCloseButton,
} from '@chakra-ui/react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { ICompany, defaultCompany, IIndustryTypeOption, countryPhoneOptions } from './model';
import { AddIcon, ChevronDownIcon } from '@chakra-ui/icons';
import CustomButton from '../../../components/CustomButton';
import FormInput from '../../../components/FormInput/FormInput';
import { useFetch } from '../../../hooks/useFetch';
import { CustomToast, Dropdown } from '../../../components';

interface DetailProps {
  isOpen: boolean;
  onClose: () => void;
  company?: ICompany | null;
  loadCompany: () => void;
}

const Detail: React.FC<DetailProps> = ({ isOpen, onClose, company, loadCompany }) => {
  const { addToast } = CustomToast();
  const { fetchApi } = useFetch(addToast);
  const [loading, setLoading] = useState(false);
  const [industryTypes, setIndustryTypes] = useState<IIndustryTypeOption[]>([]);

  const schema = yup.object({
    companyName: yup.string().required('Company Name is required'),
    industryTypeID: yup.number().typeError('Industry Type is required').moreThan(0, 'Industry Type is required').required(),
    companyPhoneCode: yup.string().required('Phone country code is required'),
    companyPhone: yup.string().required('Company Phone is required'),
    companyEmail: yup.string().email('Invalid email format').required('Company Email is required'),
    websiteUrl: yup.string().url('Invalid Website URL').required('Website URL is required'),
    countryCode: yup.string().required('Country Code is required'),
    feidOrGst: yup.string().required('FEID / GST is required'),
    companyAddress: yup.string().required('Company Address is required'),
  });

  type FormSchema = yup.InferType<typeof schema>;

  const { handleSubmit, control, reset, setValue, watch, formState: { errors },} = useForm<FormSchema>({
    defaultValues: {
      ...(defaultCompany as any),
      companyPhoneCode: '+91',
      companyPhone: '',
    },
    resolver: yupResolver(schema) as any,
  });

  const onSubmit = async (formData: FormSchema) => {
    setLoading(true);
    const { companyPhoneCode, companyPhone, ...rest } = formData;

    const payload: ICompany = {
      ...rest,
      companyPhone: (companyPhone || '').trim(),
      phoneCountryCode: companyPhoneCode || '+91',
    };

    const res = await fetchApi('Company', company ? 'PUT' : 'POST', payload, null, 'Submitted');
    setLoading(false);
    if (res) {
      onClose();
      loadCompany();
    }
  };

  const phoneCodeValue = watch('companyPhoneCode') || '+91';
  const selectedPhoneOption =
    countryPhoneOptions.find((opt) => opt.code === phoneCodeValue) ||
    countryPhoneOptions[1]; // default India


  const loadIndustryTypes = async () => {
    const res = await fetchApi('Dropdown/IndustryType', 'GET');
    if (res) {
      setIndustryTypes(res);
    }
  };

  // 🔹 Reset form + split existing phone into code + number
  useEffect(() => {
    if (company) {
      let phoneCode = '+91';
      let phoneNum = '';

      if (company.companyPhone) {
        const match = company.companyPhone.match(/^(\+\d+)\s*(.*)$/);
        phoneCode = match?.[1] || '+91';
        phoneNum = match?.[2] || '';
      }

      reset({
        companyName: company.companyName,
        industryTypeID: company.industryTypeID,
        companyPhoneCode: phoneCode,
        companyPhone: phoneNum,
        companyEmail: company.companyEmail,
        websiteUrl: company.websiteUrl,
        countryCode: company.countryCode,
        feidOrGst: company.feidOrGst,
        companyAddress: company.companyAddress,
      });
    } else {
      reset({
        ...(defaultCompany as any),
        companyPhoneCode: '+91',
        companyPhone: '',
      });
    }
  }, [isOpen, company, reset]);

  useEffect(() => {
    loadIndustryTypes();
  }, []);

  return (
    <Drawer isOpen={isOpen} onClose={onClose} placement="right" size="lg">
      <DrawerContent borderRadius="xl" p={2}>
        <DrawerCloseButton />

        <DrawerHeader textAlign="center">
          <Text className="font-poppins font_dark text_semibold text_2xl">
            {company ? "Edit Company" : "Add New Company"}
          </Text>
        </DrawerHeader>

        <form id="company-form" onSubmit={handleSubmit(onSubmit)} >
          <DrawerBody>
            <SimpleGrid columns={1} spacing={6} mt={2}>
              <FormInput isRequired control={control} name="companyName" type="string" label="Company Name" placeholder="Enter Company Name" errors={errors} />

              <Dropdown isRequired control={control} name='industryTypeID' label="Industry Type" options={industryTypes} valueKey='industryId' labelKey='industryName' errors={errors} />

              {/* Phone Country Code + Phone Number */}
              <FormControl isInvalid={!!errors.companyPhone || !!errors.companyPhoneCode}>
                <FormLabel>Company Phone (with country code)</FormLabel>
                <Flex gap={2}>
                  <Controller
                    name="companyPhoneCode"
                    control={control}
                    render={({ field }) => (
                      <Menu>
                        <MenuButton
                          as={Button}
                          variant="outline"
                          minW="170px"
                          rightIcon={<ChevronDownIcon />}
                          justifyContent="flex-start"
                        >
                          <HStack spacing={2}>
                            <Image
                              src={selectedPhoneOption.flagUrl}
                              alt={selectedPhoneOption.country}
                              boxSize="20px"
                              borderRadius="full"
                            />
                            <Text>{phoneCodeValue}</Text>
                          </HStack>
                        </MenuButton>

                        <MenuList maxH="250px" overflowY="auto">
                          {countryPhoneOptions.map((opt) => (
                            <MenuItem key={opt.code} onClick={() => field.onChange(opt.code)}>
                              <HStack spacing={3}>
                                <Image
                                  src={opt.flagUrl}
                                  alt={opt.country}
                                  boxSize="20px"
                                  borderRadius="full"
                                />
                                <Text>
                                  {opt.country} ({opt.code})
                                </Text>
                              </HStack>
                            </MenuItem>
                          ))}
                        </MenuList>
                      </Menu>
                    )}
                  />

                  <Controller
                    name="companyPhone"
                    control={control}
                    render={({ field }) => (
                      <Input flex="1" placeholder="Enter phone number" {...field} />
                    )}
                  />
                </Flex>

                <FormErrorMessage>
                  {errors.companyPhone?.message || errors.companyPhoneCode?.message}
                </FormErrorMessage>
              </FormControl>

              <FormInput isRequired control={control} name="companyEmail" type="string" label="Company Email" placeholder="Enter Company Email" errors={errors} />

              <FormInput isRequired control={control} name="websiteUrl" type="string" label="Website URL" placeholder="https://example.com" errors={errors} />

              <FormInput isRequired control={control} name="countryCode" type="string" label="Country Code" placeholder="US / IN" errors={errors} />

              <FormInput isRequired control={control} name="feidOrGst" type="string" label="FEID / GST" placeholder="Enter FEID / GST" errors={errors} />

              <FormInput isRequired control={control} name="companyAddress" type="string" label="Company Address" placeholder="Address with Postal / Zip Code" errors={errors} />
            </SimpleGrid>
          </DrawerBody>

          <DrawerFooter>
            <Flex justify="center" gap={4} mb={4}>
              <CustomButton title="Cancel" variant="secondary" onClick={onClose} bg='red' color='white' />
              <CustomButton type="submit" title={company ? "Update" : "Add"} leftIcon={<AddIcon />} bg='green' color='white' isLoading={loading} />
            </Flex>
          </DrawerFooter>
        </form>
      </DrawerContent>
    </Drawer>
  );
};

export default Detail;
