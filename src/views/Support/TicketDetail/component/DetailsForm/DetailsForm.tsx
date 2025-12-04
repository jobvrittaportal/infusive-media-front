import { Box, Button, FormLabel, Grid, GridItem, Input } from '@chakra-ui/react'
import { Dropdown } from '../../../../../components/DropDown/DropDown'
import { Controller, useForm, useWatch } from 'react-hook-form'
import SunEditor from 'suneditor-react'
import 'suneditor/dist/css/suneditor.min.css';
import { yupResolver } from '@hookform/resolvers/yup'
import { impactOptions, ISupportForm, priorityOptions, schema } from '../../../RaiseTicket/modal'
import { useState, useEffect, useMemo } from 'react' // Import useMemo
import { useFetch } from '../../../../../hooks/useFetch'
import { CustomToast, FormInput } from '../../../../../components'

interface DetailsFormProps {
    ticketDetail?: any;
    type?: string,
    activeTab: boolean
}

// Define status IDs for clarity
const CLOSED_STATUS_ID = 5;
const REOPEN_STATUS_ID = 6;
const PENDING_STATUS_ID = 4; // Assuming PENDING is the last status before CLOSED/REOPEN

export default function DetailsForm({ ticketDetail, activeTab, type }: DetailsFormProps) {
    const { addToast } = CustomToast();
    const { fetchApi } = useFetch();
    const [applicationGroup, setApplicationGroup] = useState<any[]>([]);
    const [assignGroups, setAssignGroups] = useState<any[]>([]);
    const [allSupportStatuses, setAllSupportStatuses] = useState<any[]>([]); // Store all statuses
    const [status, setStatus] = useState<number | null>(null);
    const [remark, setRemark] = useState("");
    const [updateStatusLoading, setUpdateStatusLoading] = useState(false);
    const [updateChanges, setUpdateChanges] = useState(false);
    const [originalData, setOriginalData] = useState<Partial<ISupportForm> | null>(null);

    const { control, formState: { errors }, reset } = useForm<ISupportForm>({
        resolver: yupResolver(schema),
        defaultValues: {},
        mode: "onBlur",
    });

    const watchedValues = (useWatch({ control }) ?? {}) as Partial<ISupportForm>;

    // Load form data
    useEffect(() => {
        if (ticketDetail) {
            const initValues = {
                application_Id: ticketDetail.application_Group_Id,
                priority: ticketDetail.priority,
                impact: ticketDetail.impact,
                assign_group_Id: ticketDetail.assigned_Group_Id,
                subject: ticketDetail.subject,
                desc: ticketDetail.description
            };

            reset(initValues);
            setOriginalData(initValues);
            setStatus(ticketDetail.status); // Set the initial status here
        }
    }, [ticketDetail, reset]);

    const loadApplicationGroup = async () => {
        const response = await fetchApi("Support/ApplicationGroup", "GET");
        if (response) setApplicationGroup(response);
    };

    const loadAssignGroups = async () => {
        const response = await fetchApi("Support/supportAssignGroup", "GET");
        if (response) setAssignGroups(response);
    };

    const loadSupportStatus = async () => {
        const response = await fetchApi("Support/supportStatus", "GET");
        if (!response) return;

        // Store all available statuses
        setAllSupportStatuses(response);

        // NOTE: We no longer filter here. The filtering is done in the useMemo below
        // to determine what options the user can *select* as a change.
        // The current status is set in the useEffect above.
    };

    // Filter available status options based on the current status
    const supportStatusOptions = useMemo(() => {
        if (!ticketDetail || allSupportStatuses.length === 0) return [];

        const currentStatus = ticketDetail.status; // number (1..6)
        
        // Find the "Closed" and "Reopen" objects for filtering
        const closedStatus = allSupportStatuses.find((item: any) => item.status_Id === CLOSED_STATUS_ID);
        const reopenStatus = allSupportStatuses.find((item: any) => item.status_Id === REOPEN_STATUS_ID);

        let filteredOptions: any = [];

        // Already Closed (5) — show only Reopen (6)
        if (currentStatus === CLOSED_STATUS_ID && reopenStatus) {
            filteredOptions = [reopenStatus];
        }
        // Already Reopen (6) — show only Closed (5)
        else if (currentStatus === REOPEN_STATUS_ID && closedStatus) {
            filteredOptions = [closedStatus];
        }
        // Other statuses (1, 2, 3, 4) — allow only Closed (5)
        else if (currentStatus && currentStatus !== CLOSED_STATUS_ID && currentStatus !== REOPEN_STATUS_ID && closedStatus) {
            filteredOptions = [closedStatus];
        } 
        
        // This logic seems to imply that for new tickets (no status) or other specific flows, 
        // no status change is allowed, or it defaults to some other logic. 
        // Based on the original code, only 'Closed' or 'Reopen' were ever added to `supportStatus`.

        return filteredOptions;
    }, [ticketDetail, allSupportStatuses]);


    useEffect(() => {
        if (activeTab && ticketDetail) {
            loadApplicationGroup();
            loadAssignGroups();
            loadSupportStatus(); // Load all statuses
        }
    }, [activeTab, ticketDetail]);

    // Track changed fields
    const getChangedFields = () => {
        if (!originalData) return [];

        let changed: Array<{ field_Name: string; old_Value: any; new_Value: any }> = [];
        // FULL ACCESS

        // CREATOR FIELDS

        (["priority", "impact", "subject", "desc"] as Array<keyof ISupportForm>).forEach(field => {
            if (watchedValues[field] !== originalData[field]) {
                changed.push({
                    field_Name: String(field),
                    old_Value: originalData[field] ?? "",
                    new_Value: watchedValues[field] ?? ""
                });
            }
        });


        // STATUS
        if (status !== ticketDetail.status) {
            // Find the object for the new status ID to get the name for the change log
            const newStatusObj = allSupportStatuses.find(s => s.status_Id === status);
            const oldStatusObj = allSupportStatuses.find(s => s.status_Id === ticketDetail.status);

            changed.push({
                field_Name: "status",
                old_Value: oldStatusObj?.status || ticketDetail.status, // Use status name if available
                new_Value: newStatusObj?.status || status // Use status name if available
            });
        }

        return changed;
    };


    // USER UPDATE API CALL
    const handleUserUpdate = async () => {
        const changes = getChangedFields();
        const subject = watchedValues.subject;
        const desc = watchedValues.desc;

        if (!subject || subject.trim() === "") {
            return addToast({ message: "Subject is required", status: "error" });
        }

        // Clean up HTML content for validation
        const cleanedDesc = desc?.replace(/<[^>]+>/g, "")?.replace(/&nbsp;/g, " ")?.trim();

        if (!cleanedDesc) {
            return addToast({ message: "Description is required", status: "error" });
        }
        if (changes?.length === 0) {
            addToast({ message: "No changes found", status: "warning" });
            return;
        }
        
        // Check if only status was changed, it should be handled by handleStatusUpdate
        const onlyStatusChange = changes.every(c => c.field_Name === "status");
        if (onlyStatusChange && status !== ticketDetail.status) {
             return addToast({ message: "Status change should be done via Update Status button.", status: "warning" });
        }

        setUpdateChanges(true);

        const payload = {
            ticket_Id: ticketDetail.ticket_Number,
            ...watchedValues,
            // Only send the fields that can be updated by the user in this form (priority, impact, subject, desc)
            // Status is handled separately, but included in the changes log
            application_Id: watchedValues.application_Id, 
            priority: watchedValues.priority,
            impact: watchedValues.impact,
            subject: watchedValues.subject,
            desc: watchedValues.desc,
            changes: changes.filter(c => c.field_Name !== 'status'), // Don't send status change here
        };

        const res = await fetchApi("Support/updateTicket", "PUT", payload);
        if (res) {
            addToast({ message: "Ticket updated", status: 'success' });
            // Manually update original data to prevent 'No changes found' immediately after update
            const updatedOriginalData = {
                application_Id: watchedValues.application_Id,
                priority: watchedValues.priority,
                impact: watchedValues.impact,
                assign_group_Id: watchedValues.assign_group_Id,
                subject: watchedValues.subject,
                desc: watchedValues.desc
            };
            setOriginalData(updatedOriginalData);
        }
        setUpdateChanges(false);
    };

    // AGENT UPDATE STATUS ONLY
    const handleStatusUpdate = async () => {
        if (!status) return addToast({ message: "Select a status", status: "warning" });
        if (status === ticketDetail.status) return addToast({ message: "Status is already selected value.", status: "warning" });
        if (!remark.trim()) return addToast({ message: "Remark required", status: "warning" });

        // Ensure the selected status is a valid option for change
        if (!supportStatusOptions.some((s: any) => s.status_Id === status)) {
            return addToast({ message: "Invalid status selection for current ticket state.", status: "error" });
        }

        setUpdateStatusLoading(true);
        // Only get the status change for the status update API
        const statusChange = getChangedFields().find(c => c.field_Name === "status");

        if (!statusChange) {
            // Should not happen if `status !== ticketDetail.status` is checked
            setUpdateStatusLoading(false);
            return addToast({ message: "No status change detected.", status: "warning" });
        }

        const payload = {
            ticket_Id: ticketDetail.ticket_Number,
            status, // The new status ID
            remark,
            changes: [statusChange] // Only send the status change
        };

        const res = await fetchApi("Support/changeTicketStatus", "PUT", payload);

        if (res) {
            addToast({ message: "Status updated", status: "success" });
            // Update the local state and ticketDetail to reflect the change
            ticketDetail.status = status; 
            setStatus(status);
            setRemark("");
            loadSupportStatus(); // Re-run to update the dropdown options for the new status
        }
        setUpdateStatusLoading(false);
    };

    // Find the current status object for display
    const currentStatusObject = allSupportStatuses.find(s => s.status_Id === ticketDetail?.status);


    return (
        <Box>
            <Grid templateColumns="repeat(2, 1fr)" rowGap={3} columnGap={6}>
                <GridItem>
                    <Dropdown disable={true} isRequired label='Application' name='application_Id' control={control} options={applicationGroup} labelKey='application_Name' valueKey='support_Application_Id' errors={errors} />
                </GridItem>
                <GridItem>
                    <Dropdown disable={true} isRequired label='Assign Group' name='assign_group_Id' control={control} options={assignGroups} labelKey='assign_Group_Name' valueKey='assign_Group_Id' errors={errors} />
                </GridItem>
                <GridItem>
                    <Dropdown isRequired label='Priority' name='priority' control={control} options={priorityOptions} labelKey='label' valueKey='value' errors={errors} />
                </GridItem>
                <GridItem>
                    <Dropdown isRequired label='Impact' name='impact' control={control} options={impactOptions} labelKey='label' valueKey='value' errors={errors} />
                </GridItem>

                <>
                    <GridItem>
                        <FormLabel>Status </FormLabel>
                        <select value={status ?? ""} onChange={(e) => setStatus(Number(e.target.value))} style={{ width: "100%", padding: "7px", borderRadius: "6px", border: "1px solid #ccc" }} >
                            <option value="">Select Status</option>
                            {/* The current status is the first option for display */}
                            {currentStatusObject && (
                                <option key={currentStatusObject.status_Id} value={currentStatusObject.status_Id} disabled>
                                    {currentStatusObject.status}
                                </option>
                            )}
                            {/* Filtered options for status change */}
                            {supportStatusOptions?.map((s: any) => (
                                <option key={s?.status_Id} value={s?.status_Id}>
                                    {s?.status}
                                </option>
                            ))}
                        </select>
                    </GridItem>


                    {status !== ticketDetail?.status && status !== null && (
                        <GridItem>
                            <FormLabel>Remark</FormLabel>
                            <Input value={remark} onChange={(e) => setRemark(e.target.value)} placeholder="Enter remark" />
                            <Box textAlign="right" mt={3}>
                                <Button isLoading={updateStatusLoading} colorScheme="blue" size="sm" onClick={handleStatusUpdate}>
                                    Update Status
                                </Button>
                            </Box>
                        </GridItem>
                    )}
                </>

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
                            setOptions={{ buttonList: [['bold', 'italic', 'underline', 'list', 'align', 'fontColor', 'link']] }}
                            placeholder="Enter detailed description..."
                        />
                    )} />
                </GridItem>
                <GridItem colSpan={2} textAlign="right">
                    <Button isLoading={updateChanges} colorScheme="blue" onClick={handleUserUpdate}>Update Changes</Button>
                </GridItem>


            </Grid>
        </Box>
    )
}