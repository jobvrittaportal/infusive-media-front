import React, { useEffect, useState } from 'react';
import {
  Text, SimpleGrid, Flex, Box, FormControl, FormLabel, FormErrorMessage, Input, Select, Image, HStack, Button, Menu, MenuButton, MenuList, MenuItem, DrawerFooter, DrawerContent, Drawer, DrawerBody,
  DrawerHeader, DrawerCloseButton,
} from '@chakra-ui/react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { ICompany, defaultCompany, IIndustryTypeOption } from './model';
import { AddIcon } from '@chakra-ui/icons';
import CustomButton from '../../../components/CustomButton';
import FormInput from '../../../components/FormInput/FormInput';
import { useFetch } from '../../../hooks/useFetch';
import { CustomToast, Dropdown } from '../../../components';
import { FlagDropdown } from '../../../components/flagPhoneDropdown/FlagPhoneDropdown';

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
  const [countryData, setCountryData] = useState<[]>([]);
  const [stateData, setStateTypes] = useState<[]>([]);
  const [cityData, setCityData] = useState<[]>([]);
  const [dailcode, setDailcode] = useState<any[]>([]);

  const schema = yup.object({
    companyName: yup.string().required('Company Name is required'),
    industryTypeID: yup.number().typeError('Industry Type is required').moreThan(0, 'Industry Type is required').required(),
    phoneCountryCode: yup.string().required('Phone country code is required'),
    companyPhone: yup.string().required('Company Phone is required'),
    companyEmail: yup.string().email('Invalid email format').required('Company Email is required'),
    websiteUrl: yup.string().url('Invalid Website URL').required('Website URL is required'),
    postalZipCode: yup.string().required('Postal Code is required'),
    feid: yup.string().required('FEID / GST is required'),
    countryId: yup.number().typeError('Country is required').moreThan(0, 'Country is required').required(),
    stateId: yup.number().typeError('State is required').moreThan(0, 'State is required').required(),
    cityId: yup.number().typeError('City is required').moreThan(0, 'City is required').required(),
  });

  type FormSchema = yup.InferType<typeof schema>;

  const { handleSubmit, control, reset, setValue, watch, formState: { errors }, } = useForm<FormSchema>({
    defaultValues: {
      ...defaultCompany
    },
    resolver: yupResolver(schema) as any,
  });

  const countryIdWatch = watch('countryId');
  const stateIDWatch = watch('stateId');

  const onSubmit = async (formData: FormSchema) => {
    setLoading(true);

    const res = await fetchApi('Company', company ? 'PUT' : 'POST', formData, null, 'Submitted');
    setLoading(false);
    if (res) {
      onClose();
      loadCompany();
    }
  };

  const loadIndustryTypes = async () => {
    const res = await fetchApi('Dropdown/IndustryType', 'GET');
    if (res) {
      setIndustryTypes(res);
    }
  };

  const loadCountryDropDown = async () => {
    const res = await fetchApi('Dropdown/country', 'GET');
    if (res) {
      setCountryData(res);
    }
  };

  const loadStateDropDown = async (countryId: number) => {
    const res = await fetchApi(`Dropdown/state/${countryId}`, 'GET');
    if (res) {
      setStateTypes(res);
    }
  };

  const loadCityDropDown = async (stateId: number) => {
    const res = await fetchApi(`Dropdown/city/${stateId}`, 'GET');
    if (res) {
      setCityData(res);
    }
  };

  const LoadCompanyCode = async () => {
    const res = await fetchApi("Dropdown/countrycodedropdown", "GET");

    if (res) {
      const formatted = (res as any[]).map((x) => ({
        ...x,
        companyCountrycode: `${x.code} (${x.dialCode})`,
        displayOnlyFlagCode: `${x.dialCode}`,
      }));

      setDailcode(formatted);
    }
  };

  useEffect(() => {
    if (!company || !isOpen) return;

    reset(company);
    if (company.countryId) {
      loadStateDropDown(company.countryId).then((res) => {
        setValue("stateId", company.stateId);
        if (company.stateId) {
          loadCityDropDown(company.stateId).then(() => {
            setValue("cityId", company.cityId);
          });
        }
      });
    }
  }, [company, isOpen]);

  useEffect(() => {
    loadIndustryTypes();
    loadCountryDropDown();
    LoadCompanyCode();
  }, []);

  useEffect(() => {
    if (!countryIdWatch) return;

    setValue("stateId", 0);
    setValue("cityId", 0);
    setStateTypes([]);
    setCityData([]);

    loadStateDropDown(countryIdWatch);

  }, [countryIdWatch]);

  useEffect(() => {
    if (!stateIDWatch) return;

    setValue('cityId', 0);
    setCityData([]);
    loadCityDropDown(stateIDWatch);

  }, [stateIDWatch]);

  useEffect(() => {
    if (!isOpen) return;

    if (company) {
      reset(company);
    } else {
      reset(defaultCompany);
    }
  }, [isOpen, company, reset]);


  return (
    <Drawer isOpen={isOpen} onClose={onClose} placement="right" size="md">
      <DrawerContent borderRadius="xl" p={2}>
        <DrawerCloseButton />

        <DrawerHeader textAlign="center">
          <Text className="font-poppins font_dark text_semibold text_2xl">
            {company ? "Edit Company" : "Add New Company"}
          </Text>
        </DrawerHeader>

        <form id="company-form" onSubmit={handleSubmit(onSubmit)} >
          <DrawerBody overflowY="auto" maxH="80vh" pr={2}>
            <SimpleGrid columns={1} spacing={6} mt={2}>
              <FormInput isRequired control={control} name="companyName" type="string" label="Company Name" placeholder="Enter Company Name" errors={errors} />

              <Dropdown isRequired control={control} name='industryTypeID' label="Industry Type" options={industryTypes} valueKey='industryId' labelKey='industryName' errors={errors} />
              <Flex gap={3}>
                <Box flex="0.4" mb="-6px">
                  <FlagDropdown isRequired name="phoneCountryCode" label='Phone No.' control={control} errors={errors} options={dailcode} placeholder="Select Code"  />
                </Box>
                <Box flex="1" mt="24px">
                  <FormInput  control={control} name="companyPhone" type="string" label="" placeholder="Enter Phone" errors={errors} />
                </Box>
              </Flex>
              <FormInput isRequired control={control} name="companyEmail" type="string" label="Company Email" placeholder="Enter Company Email" errors={errors} />

              <FormInput isRequired control={control} name="websiteUrl" type="string" label="Website URL" placeholder="https://example.com" errors={errors} />

              <FormInput isRequired control={control} name="postalZipCode" type="string" label="Postal Code" placeholder="Enter Postal Code" errors={errors} />

              <FormInput isRequired control={control} name="feid" type="string" label="FEID / GST" placeholder="Enter FEID / GST" errors={errors} />

              <Dropdown isRequired control={control} name='countryId' label='Country' options={countryData} valueKey='countryId' labelKey='countryName' errors={errors} />

              <Dropdown isRequired control={control} name='stateId' label='State' options={stateData} valueKey='stateId' labelKey='stateName' errors={errors} />

              <Dropdown isRequired control={control} name='cityId' label='City' options={cityData} valueKey='cityId' labelKey='cityName' errors={errors} />
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
