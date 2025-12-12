import React, { useEffect, useState } from 'react';
import {Text, SimpleGrid, Flex, Box,DrawerFooter, DrawerContent, Drawer, DrawerBody,DrawerHeader, DrawerCloseButton,} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { ICompany, ICompanyPOC, IDesignationDropDown, defaultCompanyPOC } from './model';
import { AddIcon } from '@chakra-ui/icons';
import CustomButton from '../../../components/CustomButton';
import FormInput from '../../../components/FormInput/FormInput';
import { useFetch } from '../../../hooks/useFetch';
import { CustomToast, Dropdown } from '../../../components';
import { FlagDropdown } from '../../../components/flagPhoneDropdown/FlagPhoneDropdown';


interface DetailProps {
    isOpen: boolean;
    onClose: () => void;
    companyPOC?: ICompanyPOC | null;
    loadCompanyPOC: () => void;
    selectedCompany: number | undefined;
}

const DetailPOC: React.FC<DetailProps> = ({ isOpen, onClose, companyPOC, selectedCompany,loadCompanyPOC }) => {
    const { addToast } = CustomToast();
    const { fetchApi } = useFetch(addToast);
    const [loading, setLoading] = useState(false);
    const [designationDropDown, setDesignationDropDown] = useState<IDesignationDropDown[]>([]);
    const [companyDropDown, setCompanyDropDown] = useState<[]>([]);
    const [dailcode, setDailcode] = useState<any[]>([]);

    const schema = yup.object({
        name: yup.string().required('Name is required'),
        companyId: yup.number().typeError('Company is required').moreThan(0, 'Company is required').required(),
        phoneCountryCode: yup.string().required('Phone country code is required'),
        phoneNumber: yup.string().required('Phone is required'),
        email: yup.string().email('Invalid email format').required('Email is required'),
        designationId: yup.number().typeError('Designation is required').moreThan(0, 'Designation is required').required(),
        whatsapp: yup.string().required('Whatsapp is required'),
    });

    // type FormSchema = yup.InferType<typeof schema>;

    const { handleSubmit, control, reset, formState: { errors }, } = useForm<ICompanyPOC>({
        defaultValues: defaultCompanyPOC,
        resolver: yupResolver(schema) as any,
    });

    const onSubmit = async (formData: ICompanyPOC) => {
        setLoading(true);
        console.log("POC formData", formData);
        const res = await fetchApi('CompanyPoc', companyPOC ? 'PUT' : 'POST', formData, null, 'Submitted');
        setLoading(false);
        if (res) {
            onClose();
            loadCompanyPOC();
        }
    };

    const loadDesignationDropDown = async () => {
        const res = await fetchApi('Dropdown/designations', 'GET');
        if (res) {
            setDesignationDropDown(res);
        }
    };

    const loadCompanyDropDown = async () => {
        const res = await fetchApi('Dropdown/company', 'GET');
        if (res) {
            setCompanyDropDown(res);
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
        loadDesignationDropDown();
        loadCompanyDropDown();
        LoadCompanyCode();
    }, []);

    useEffect(() => {
        if (!isOpen) return;

        if (companyPOC) {
            reset(companyPOC);
        } else {
            reset({
                ...defaultCompanyPOC,
                companyId: selectedCompany || 0,
            });
        }
    }, [isOpen, companyPOC, reset]);


    return (
        <Drawer isOpen={isOpen} onClose={onClose} placement="right" size="md">
            <DrawerContent borderRadius="xl" p={2}>
                <DrawerCloseButton />

                <DrawerHeader textAlign="center">
                    <Text className="font-poppins font_dark text_semibold text_2xl">
                        {companyPOC ? "Edit POC" : "Add POC"}
                    </Text>
                </DrawerHeader>

                <form id="company-form" onSubmit={handleSubmit(onSubmit)} >
                    <DrawerBody overflowY="auto" maxH="80vh" pr={2}>
                        <SimpleGrid columns={1} spacing={6} mt={2}>
                            <FormInput isRequired control={control} name="name" type="string" label="POC Name" placeholder="Enter POC Name" errors={errors} />

                            <Dropdown isRequired control={control} name='companyId' label="Company" options={companyDropDown} valueKey='companyId' labelKey='companyName' errors={errors} disable={true}/>

                            <FormInput isRequired control={control} name="email" type="string" label="Email" placeholder="Enter Email" errors={errors} />

                            <Flex gap={3}>
                                <Box flex="0.4" mb="-6px">
                                    <FlagDropdown isRequired name="phoneCountryCode" label='Phone No.' control={control} errors={errors} options={dailcode} placeholder="Select Code" />
                                </Box>
                                <Box flex="1" mt="24px">
                                    <FormInput control={control} name="phoneNumber" type="string" label="" placeholder="Enter Phone" errors={errors} />
                                </Box>
                            </Flex>

                            <Dropdown isRequired control={control} name='designationId' label='Designation' options={designationDropDown} valueKey='designationId' labelKey='designationName' errors={errors} />

                            <FormInput isRequired control={control} name="whatsapp" type="string" label="WhatsApp" placeholder="Enter Whatsapp" errors={errors} />
                            
                            <FormInput  control={control} name="linkedinUrl" type="string" label="Linkedin Url" placeholder="Enter linkedin Url" errors={errors} />
                        </SimpleGrid>
                    </DrawerBody>

                    <DrawerFooter>
                        <Flex justify="center" gap={4} mb={4}>
                            <CustomButton title="Cancel" variant="secondary" onClick={onClose} bg='red' color='white' />
                            <CustomButton type="submit" title={companyPOC ? "Update" : "Add"} leftIcon={<AddIcon />} className='btn_theme' isLoading={loading} />
                        </Flex>
                    </DrawerFooter>
                </form>
            </DrawerContent>
        </Drawer>
    );
};

export default DetailPOC;
