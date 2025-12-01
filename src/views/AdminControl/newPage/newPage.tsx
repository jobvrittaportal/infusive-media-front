import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Text, Flex, FormControl, FormLabel, Input, Textarea, FormErrorMessage, } from "@chakra-ui/react";
import MyDiv from "./newPage.style";
import * as routesNames from "../../../constant/routes"
import { CustomButton, CustomToast } from "../../../components";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useFetch } from "../../../hooks/useFetch";
import { useFieldArray, useForm } from "react-hook-form";
import { DeleteIcon, RepeatIcon } from "@chakra-ui/icons";
import { PageFormData } from "./model";
import { IPage } from "../pages/model";
const NewPage = () => {
    const { addToast } = CustomToast();
    const { fetchApi, loading } = useFetch(addToast);
    const navigate = useNavigate();
    const location = useLocation();
    const { data, isEditing }: { data: IPage, isEditing: boolean } = location.state || {};

    const { control, register, handleSubmit, reset, formState: { errors }, } = useForm<PageFormData>({
        defaultValues: {
            name: "",
            label: "",
            url: "",
            desc: ""
        }
    });

    const { fields, append, remove, update } = useFieldArray({ control, name: "features" });

    useEffect(() => {
        if (isEditing && data) {
            reset({
                id: data.id,
                name: data.name || "",
                label: data.label || "",
                url: data.url || "",
                desc: data.description || "",
                features: data.features?.length && data.features.map(feature => ({
                    name: feature.name || "",
                    desc: feature.description || "",
                    state: feature.state || 'update',
                    featureId: feature.id
                })) || []
            });
        }
    }, [data, isEditing, reset]);

    const onSubmit = async (formData: PageFormData) => {
        const payload = {
            id: formData.id,
            name: formData.name,
            label: formData.label,
            url: formData.url,
            desc: formData.desc,
            features: formData.features?.filter(feature => feature.name.trim() || feature.desc.trim())
        };

        try {
            if (isEditing && formData.id) {
                const response = await fetchApi(`page/${formData.id}`, 'PUT', payload, null, 'Page updated successfully');
                if (response) {
                    navigate(routesNames.PAGES);
                }
            } else {
                const response = await fetchApi('page', 'POST', payload, null, 'Page created successfully');
                if (response) {
                    navigate(routesNames.PAGES);
                }
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    const addFeature = () => {
        append({ name: "", desc: "", state: 'create' });
    };

    const removeFeature = (index: number) => {
        const feature = fields[index];

        if (feature.state === 'update') {
            update(index, { ...feature, state: 'remove' });
        } else if (feature.state === 'create') {
            remove(index);
        } else if (feature.state === 'remove') {
            update(index, { ...feature, state: 'update' });
        }
    };

    return (
        <MyDiv>
            <Flex className=" flex_header" >
                <Breadcrumb spacing='5px' className="font_poppins text_md text_medium" separator=">>">
                    <BreadcrumbItem>
                        <BreadcrumbLink className="font_poppins text_md text_medium" href={routesNames.PAGES} color="gray.500">Pages</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbItem isCurrentPage>
                        <BreadcrumbLink className="font_poppins text_md text_medium" href='#'>{isEditing ? "Edit Page" : "New Page"}</BreadcrumbLink>
                    </BreadcrumbItem>
                </Breadcrumb>
                <Flex gap={4} ml={'auto'}>
                    <CustomButton title='Cancel' className='btn abc font-poppins text_sm text_medium' isDisabled={loading} onClick={() => navigate(routesNames.PAGES)} />
                    <CustomButton title={isEditing ? "Update" : "Save"} onClick={handleSubmit(onSubmit)} isLoading={loading} className='btn_theme abc font-poppins text_sm text_medium' />
                </Flex>
            </Flex>
            <Flex flexDirection='column'>
                <Box mt={8} >
                    <Flex gap={8}>
                        <FormControl isInvalid={!!errors.name}>
                            <FormLabel className="font_poppins text_md text_medium">Page Name</FormLabel>
                            <Input placeholder='Add Name' {...register("name")} />
                            <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={!!errors.label}>
                            <FormLabel className="font_poppins text_md text_medium">Label</FormLabel>
                            <Input placeholder='Enter Label' {...register("label")} />
                            <FormErrorMessage>{errors.label?.message}</FormErrorMessage>
                        </FormControl>
                    </Flex>
                    <Flex gap={8} mt={4}>
                        <FormControl >
                            <FormLabel className="font_poppins text_md text_medium">URL</FormLabel>
                            <Input placeholder='Enter URL' {...register("url")} />
                        </FormControl>
                        <FormControl >
                            <FormLabel className="font_poppins text_md text_medium">Description</FormLabel>
                            <Textarea placeholder="Add Description"  {...register("desc")} className="font_poppins text_regular text_sm" />
                        </FormControl>
                    </Flex>

                </Box>



                <Box mt={4} ml={'auto'}>

                    <CustomButton
                        title="Add New Feature"
                        className='btn_theme abc font-poppins text_sm text_medium'
                        onClick={addFeature}
                        type="button"
                    />
                </Box>
                <Box mt={3} >
                    <Text className="font_poppins text_md text_medium" textAlign="left">Add Features</Text>
                    {fields.map((field, index) => {
                        return <Box key={field.id} bg={field.state === 'remove' ? 'red.50' : 'gray.100'} p={4} borderRadius={'8px'} mt={4}>
                            <Flex gap={8} >
                                <FormControl isDisabled={field.state === 'remove'} isInvalid={!!errors.features?.[index]?.name}>
                                    <FormLabel className="font_poppins text_md text_medium" >Features Name</FormLabel>
                                    <Input placeholder='Enter Feature Name' bg={'white'} {...register(`features.${index}.name`)} />
                                </FormControl>
                                <FormControl isDisabled={field.state === 'remove'} isInvalid={!!errors.features?.[index]?.desc}>
                                    <FormLabel className="font_poppins text_md text_medium">Feature Description</FormLabel>
                                    <Textarea placeholder="Add Description" bg={'white'} className=" font_poppins text_regular text_sm"  {...register(`features.${index}.desc`)} />
                                </FormControl>
                                <CustomButton
                                    title={field.state === 'remove' ? "Restore" : "Delete"}
                                    className={field.state === 'remove' ? 'restore font-poppins text_sm text_medium' : 'del font-poppins text_sm text_medium'}
                                    leftIcon={field.state === 'remove' ? <RepeatIcon /> : <DeleteIcon />}
                                    onClick={() => removeFeature(index)}
                                />
                            </Flex>
                        </Box>
                    })}
                </Box>
            </Flex>
        </MyDiv>
    )
}
export default NewPage;
