import React, { useEffect, useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  Text,
  SimpleGrid,
  Flex,
  Box,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Select,
  Image,
  HStack,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { ICompany, defaultCompany, IIndustryTypeOption } from './model';
import { AddIcon, ChevronDownIcon } from '@chakra-ui/icons';
import CustomButton from '../../../components/CustomButton';
import FormInput from '../../../components/FormInput/FormInput';
import { useFetch } from '../../../hooks/useFetch';
import { CustomToast } from '../../../components';

interface DetailProps {
  isOpen: boolean;
  onClose: () => void;
  company?: ICompany | null;
  loadCompany: () => void;
}

// 🔹 Phone country code options with REAL flag images (SVG from flagcdn)
const countryPhoneOptions = [
  {
    code: '+1',
    country: 'United States',
    iso2: 'us',
    flagUrl: 'https://flagcdn.com/us.svg',
  },
  {
    code: '+91',
    country: 'India',
    iso2: 'in',
    flagUrl: 'https://flagcdn.com/in.svg',
  },
  {
    code: '+44',
    country: 'United Kingdom',
    iso2: 'gb',
    flagUrl: 'https://flagcdn.com/gb.svg',
  },
  {
    code: '+61',
    country: 'Australia',
    iso2: 'au',
    flagUrl: 'https://flagcdn.com/au.svg',
  },
];

const DummyIndustryTypeOptions: IIndustryTypeOption[] = [
  { id: 1, name: 'IT Services' },
  { id: 2, name: 'Finance' },
  { id: 3, name: 'Healthcare' },
];

const Detail: React.FC<DetailProps> = ({ isOpen, onClose, company, loadCompany }) => {
  const { addToast } = CustomToast();
  const { fetchApi } = useFetch(addToast);

  const [industryTypes, setIndustryTypes] = useState<IIndustryTypeOption[]>([]);

  const schema = yup.object({
    companyName: yup.string().required('Company Name is required'),
    industryTypeID: yup
      .number()
      .typeError('Industry Type is required')
      .moreThan(0, 'Industry Type is required')
      .required(),
    companyPhoneCode: yup.string().required('Phone country code is required'),
    companyPhone: yup.string().required('Company Phone is required'),
    companyEmail: yup
      .string()
      .email('Invalid email format')
      .required('Company Email is required'),
    websiteUrl: yup
      .string()
      .url('Invalid Website URL')
      .required('Website URL is required'),
    countryCode: yup.string().required('Country Code is required'),
    feidOrGst: yup.string().required('FEID / GST is required'),
    companyAddress: yup.string().required('Company Address is required'),
  });

  type FormSchema = yup.InferType<typeof schema>;

  const {  handleSubmit,  control,  reset,  setValue,  watch,  formState: { errors },
  } = useForm<FormSchema>({
    defaultValues: {
      ...(defaultCompany as any),
      companyPhoneCode: '+91',
      companyPhone: '',
    },
    resolver: yupResolver(schema) as any,
  });

  const loadIndustryTypes = async () => {
    // const res = await fetchApi('Dropdown/getIndustryTypes', 'GET', null, null, '');
    // if (res) {
    //   setIndustryTypes(res as IIndustryTypeOption[]);
    // }
    setIndustryTypes(DummyIndustryTypeOptions);
  };

  const onSubmit = async (formData: FormSchema) => {
    const { companyPhoneCode, companyPhone, ...rest } = formData;

    const payload: ICompany = {
      ...rest,
      companyPhone: (companyPhone || '').trim(),
      phoneCountryCode: companyPhoneCode || '+91',
    };

    const res = await fetchApi('Company',company ? 'PUT' : 'POST', payload,null,'Submitted' );
    if (res) { onClose();
      loadCompany();
    }
  };

  useEffect(() => {
    loadIndustryTypes();
  }, []);


  const phoneCodeValue = watch('companyPhoneCode') || '+91';
  const selectedPhoneOption =
    countryPhoneOptions.find((opt) => opt.code === phoneCodeValue) ||
    countryPhoneOptions[1]; // default India

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

  return (
    <Box alignContent="center" justifyContent="center">
      <Modal isOpen={isOpen} onClose={onClose} size="3xl" isCentered>
        <ModalOverlay />
        <ModalContent borderRadius="xl" p={2}>
          <ModalHeader textAlign="center">
            <Text className="font-poppins font_dark text_semibold text_2xl">
              {company ? 'Edit Company' : 'Add New Company'}
            </Text>
          </ModalHeader>
          <ModalCloseButton />

          <form id="company-form" onSubmit={handleSubmit(onSubmit)} autoComplete="off">
            <ModalBody>
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} mt={2}>
                <FormInput
                  isRequired
                  control={control}
                  name="companyName"
                  type="string"
                  label="Company Name"
                  placeholder="Enter Company Name"
                  errors={errors}
                />

                {/* 🔹 Industry Type Dropdown */}
                <Controller
                  name="industryTypeID"
                  control={control}
                  render={({ field }) => (
                    <FormControl isInvalid={!!errors.industryTypeID}>
                      <FormLabel>Industry Type</FormLabel>
                      <Select
                        placeholder="Select Industry Type"
                        value={field.value || 0}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      >
                        {industryTypes.map((item) => (
                          <option key={item.id} value={item.id}>
                            {item.name}
                          </option>
                        ))}
                      </Select>
                      <FormErrorMessage>
                        {errors.industryTypeID && errors.industryTypeID.message}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                />

                {/* 🔹 Phone Country Code (with real flag) + Company Phone as two inputs */}
                <FormControl
                  isInvalid={!!errors.companyPhone || !!errors.companyPhoneCode}
                >
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
                              <MenuItem
                                key={opt.code}
                                onClick={() => {
                                  field.onChange(opt.code);
                                }}
                              >
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

                    {/* Company phone number only */}
                    <Controller
                      name="companyPhone"
                      control={control}
                      render={({ field }) => (
                        <Input
                          flex="1"
                          placeholder="Enter phone number"
                          {...field}
                        />
                      )}
                    />
                  </Flex>
                  <FormErrorMessage>
                    {errors.companyPhone?.message || errors.companyPhoneCode?.message}
                  </FormErrorMessage>
                </FormControl>

                <FormInput  isRequired  control={control}  name="companyEmail"  type="string"  label="Company Email"  placeholder="Enter Company Email"  errors={errors}
                />
                 
                <FormInput  isRequired  control={control}  name="websiteUrl"  type="string"  label="Website URL"  placeholder="https://example.com"  errors={errors}
                />

                
                <FormInput  isRequired  control={control}  name="countryCode"  type="string"  label="Country Code"  placeholder="US / IN"  errors={errors}
                />
                <FormInput
                  isRequired
                  control={control}
                  name="feidOrGst"
                  type="string"
                  label="FEID / GST"
                  placeholder="Enter FEID / GST"
                  errors={errors}
                />
                <FormInput
                  isRequired
                  control={control}
                  name="companyAddress"
                  type="string"
                  label="Company Address"
                  placeholder="Address with Postal / Zip Code"
                  errors={errors}
                />
              </SimpleGrid>
            </ModalBody>

            <ModalFooter>
              <Flex justify="center" gap={4} mb={4}>
                <CustomButton title="Cancel" variant="secondary" onClick={onClose} />
                <CustomButton
                  type="submit"
                  title={company ? 'Update' : 'Add'}
                  leftIcon={<AddIcon />}
                />
              </Flex>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Detail;
