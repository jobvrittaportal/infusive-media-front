import {
    Box, Grid, GridItem, Input, Button, Drawer, DrawerOverlay,
    DrawerContent, DrawerHeader, DrawerBody, DrawerFooter, FormLabel,
    DrawerCloseButton
} from '@chakra-ui/react'

import { Dropdown } from '../../../components/DropDown/DropDown';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';
import { CustomToast, FormInput } from '../../../components';
import { useFetch } from '../../../hooks/useFetch';
import { useState, useEffect } from 'react';
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { impactOptions, ISupportForm, priorityOptions, schema } from './modal';


interface ISupportFormProps {
    drawerOpen: boolean,
    close: () => void;
    reload: boolean,
    setReload: (is: boolean) => void
}

export default function Form({ drawerOpen, close, reload, setReload }: ISupportFormProps) {

    const { addToast } = CustomToast();
    const { fetchApi, loading } = useFetch(addToast);
    const [applicationGroup, setApplicationGroup] = useState<any[]>([]);
    const [assignGroups, setAssignGroups] = useState<any[]>([]);
    const [file, setFile] = useState<File | null>(null);

    const { handleSubmit, control, formState: { errors }, reset, setValue } = useForm<ISupportForm>({
        resolver: yupResolver(schema),
        defaultValues: {},
        mode: "onBlur",
    });

    const loadApplicationGroup = async () => {
        const response = await fetchApi("Support/ApplicationGroup", "GET");
        if (response) setApplicationGroup(response);
    };

    const loadAssignGroups = async () => {
        const response = await fetchApi("Support/supportAssignGroup", "GET");
        if (response) setAssignGroups(response);
    };


    useEffect(() => {
        loadApplicationGroup();
        loadAssignGroups();
    }, []);



    const handleEditorChange = (content: string) => {
        setValue("desc", content, { shouldValidate: true });
    };

    const handleFileChange = (e: any) => {
        setFile(e.target.files[0]);
    };

    const handleAddTicket = handleSubmit(async (data) => {
        const formData = new FormData();
        formData.append("application_Id", data.application_Id.toString());
        formData.append("priority", data.priority);
        formData.append("impact", data.impact);
        formData.append("assign_group_Id", data.assign_group_Id.toString());
        formData.append("subject", data.subject);
        formData.append("desc", data.desc || "");

        if (file) formData.append("screenshot", file);
        const response = await fetchApi("Support/CreateTicket", "POST", formData, "", "", true);
        if (response) {
            addToast({ message: "Ticket created successfully!", status: "success" });
            reset();
            setReload(!reload);
            close();
            setFile(null);
        }
    });

    useEffect(() => {
        if (!drawerOpen) {
            reset();
            setFile(null);
        }
    }, [drawerOpen]);

    return (
        <Drawer isOpen={drawerOpen} placement="right" onClose={close} size="lg">
            <DrawerOverlay />
            <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader borderBottomWidth="1px">Create Support Ticket</DrawerHeader>

                <DrawerBody>
                    <Box>
                        <Grid templateColumns="repeat(2, 1fr)" rowGap={3} columnGap={6}>

                            <GridItem>
                                <Dropdown isRequired label='Application' name='application_Id' control={control} options={applicationGroup} labelKey='application_Name' valueKey='support_Application_Id' errors={errors} />
                            </GridItem>

                            <GridItem>
                                <Dropdown isRequired label='Priority' name='priority' control={control} options={priorityOptions} labelKey='label' valueKey='value' errors={errors} />
                            </GridItem>

                            <GridItem>
                                <Dropdown isRequired label='Impact' name='impact' control={control} options={impactOptions} labelKey='label' valueKey='value' errors={errors} />
                            </GridItem>

                            <GridItem>
                                <Dropdown isRequired label='Assign Group' name='assign_group_Id' control={control} options={assignGroups} labelKey='assign_Group_Name' valueKey='assign_Group_Id' errors={errors} />
                            </GridItem>

                            <GridItem colSpan={2}>
                                <FormLabel mb="4px" fontSize="sm" fontWeight="500">Upload Screenshot</FormLabel>
                                <Input size="sm" type="file" accept="image/*" onChange={handleFileChange} />
                            </GridItem>

                            <GridItem colSpan={2}>
                                <FormInput isRequired label='Subject' name="subject" control={control} placeholder="Enter Subject" errors={errors} />
                            </GridItem>

                            <GridItem colSpan={2}>
                                <FormLabel>Description <span style={{ color: "red" }}>*</span></FormLabel>
                                <Controller name="desc" control={control} render={({ field }) => (
                                    <SunEditor
                                        height="250px"
                                        setContents={field.value}
                                        onChange={(content) => field.onChange(content)}
                                        setOptions={{
                                            buttonList: [['bold', 'italic', 'underline', 'list', 'align', 'fontColor', 'link']],
                                        }}
                                        placeholder="Enter detailed description..."
                                    />
                                )}
                                />
                                {errors.desc && <p style={{ color: "red", fontSize: "12px" }}>{errors.desc.message}</p>}
                            </GridItem>

                        </Grid>
                    </Box>
                </DrawerBody>

                <DrawerFooter>
                    <Button isLoading={loading} colorScheme="blue" onClick={handleAddTicket}>Submit</Button>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}
