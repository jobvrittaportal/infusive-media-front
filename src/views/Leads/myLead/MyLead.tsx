import { Box, Flex, Grid, GridItem, Image, Input, InputGroup, Text } from '@chakra-ui/react';
import MyDiv from '../lead/lead.style';
import CustomToast from '../../../components/CustomToast';
import { useFetch } from '../../../hooks/useFetch';
import { useEffect, useState } from 'react';
import { CustomButton, CustomTable } from '../../../components';
import { ILead, ILeadTable, cards, defaultLead } from '../lead/model';
import { Column } from '../../../components/customTable/CustomTable';
import { AddIcon, EditIcon } from '@chakra-ui/icons';
import { number } from 'framer-motion';
// import Details from './Details';
import useDebounce from '../../../hooks/useDebounce';

const MyLead = () => {
    const { addToast } = CustomToast();
    const { fetchApi } = useFetch(addToast);
    const [leadData, setLeadData] = useState<ILeadTable>({ leads: [], totalCount: 0 });
    const [selectedLeads, setSelectedLeads] = useState<ILead | null>(null);
    const [loading, setLoading] = useState(false);
    const [showForm, setShowForm] = useState<boolean>(false);
    const [search, setSearch] = useState('');
    const [pagination, setPagination] = useState({ skip: 0, limit: 10 });
    const debounceSearch = useDebounce(search, 700);

    function pageChangeFunction(e: { skip: number; limit: number }) {
        setPagination(e);
    }

    const handleAddLead = () => {
        setSelectedLeads(null);
        setShowForm(true);
    };

    const handleEditLead = (row: ILead) => {
        setSelectedLeads(row);
        setShowForm(true);
    }

    const loadMyLeads = async () => {
        const res = await fetchApi("Lead/MyLeads", "GET", null, `skip=${pagination.skip}&limit=${pagination.limit}&search=${search}`, '');
        if (res) {
            setLeadData(res);
        }
    };

    useEffect(() => {
        loadMyLeads();
    }, [pagination, debounceSearch]);

    return (
        <MyDiv>
            <Box className="top-section">
                <Text className='font-poppins text_xxl text_semibold'>My Lead</Text>
                {/* <CustomButton title="Add New Lead" leftIcon={<AddIcon />} className='btn_theme' onClick={handleAddLead} /> */}
            </Box>

            <Grid className="grid_container grid_gap_sm" p={4}>
                {cards.map((card, index) => (
                    <GridItem key={index} colSpan={{ base: 12, sm: 6, md: 3 }} className="card_box">
                        <Flex align="center" gap={3} mb={3}>
                            <Text className="font-poppins text_md text_semibold">{card.label}</Text>
                        </Flex>
                        <Flex align="center" gap={2}>
                            <Text className="font-poppins text_xxl text_bold">{card.value}</Text>
                        </Flex>
                        <Flex align="center" gap={2}>
                            <Text fontSize="sm" color="green.500">
                                {card.percent} <Text as="span" color="#667085">since last month</Text>
                            </Text>
                        </Flex>
                    </GridItem>
                ))}
            </Grid>

            <Flex justify='space-between' mt={6}>
                <Text className='font-poppins text_xxl text_semibold'>My Lead List</Text>

                <Flex align="center" gap={3}>
                    {/* <CustomButton title="Generate Lead" onClick={() => setIsAssignModalOpen(true)} leftIcon={<AddIcon />} className='btn_theme' isDisabled={selectedPOCs.length === 0} /> */}

                    <Box className="search-box">
                        <InputGroup>
                            <Input placeholder="Search by comp/poc name..." value={search} onChange={(e) => setSearch(e.target.value)} />
                        </InputGroup>
                    </Box>
                </Flex>
            </Flex>

            <CustomTable
                value={leadData.leads}
                onPageChange={pageChangeFunction}
                rowsPerPage={pagination.limit}
                totalRecords={leadData.totalCount}
                loading={loading}
                headerBg="#E6F0FF"
                headerTextColor="#1A202C"
                emptyMessage="No POC Found"
            >
                <Column header="S.No" body={(_, index) => index + 1} />
                <Column header="Company" field="companyName" />
                <Column header="POC" field="pocName" />
                <Column header="Contact" body={(row: any) => `${row.countryCode} ${row.contact}`} />
                <Column header="Email" field="email" />
                {/* <Column header="Designation" field="designation" /> */}
                <Column header="Assigned To" field="assignedToUser" />
                <Column header="Source" field="source" />
                <Column header="Status" field="status" />
                <Column header="Assigned By" field="createdBy" />
                <Column header="Assigned At" body={(row: any) =>
                    new Date(row.createdAt).toLocaleString("en-IN", { year: "numeric", month: "short", day: "2-digit", hour: "2-digit", minute: "2-digit", hour12: true,
                    })
                } />
                <Column header="Action" body={(row: ILead) => (
                    <EditIcon cursor="pointer" color="blue" onClick={() => handleEditLead(row)} />
                )} />

            </CustomTable>

            {/* <Details isOpen={showForm} onClose={() => setShowForm(false)} leads={selectedLeads} loadLead={loadLeads}/> */}

        </MyDiv>
    );
};

export default MyLead;