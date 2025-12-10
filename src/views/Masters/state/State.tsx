import React, { useEffect, useState } from 'react';
import { Badge, Box, Flex, Input, Text } from "@chakra-ui/react";
import { AddIcon, EditIcon } from '@chakra-ui/icons';
import Detail from './Details';
import { CustomButton, CustomTable, CustomToast } from '../../../components';
import { useFetch } from '../../../hooks/useFetch';
import useDebounce from '../../../hooks/useDebounce';
import { Column } from '../../../components/customTable/CustomTable';
import { IStateTable } from './model';
import StateDiv from './state.style';


const State = () => {
    const [statesData, setStateData] = useState<IStateTable>({ states: [], totalCount: 0 });
    const [search, setSearch] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [selectedStates, setselectedStates] = useState<any | null>(null);
    const [pagination, setPagination] = useState({ skip: 0, limit: 10 });
    const { addToast } = CustomToast();
    const { fetchApi } = useFetch(addToast);
    const debounceSearch = useDebounce(search, 700);

    const handleEdit = (row: any) => {
        setselectedStates(row);
        setShowForm(true);
    };

    const handleAddNew = () => {
        setselectedStates(null);
        setShowForm(true);
    }

    function pageChangeFunction(e: { skip: number; limit: number }) {
        setPagination(e);
    }

    const loadStates = async () => {
        const res = await fetchApi("State", "GET", null, `skip=${pagination.skip}&limit=${pagination.limit}&search=${search}`, "");
        if (res) {
            setStateData(res);
        }
    }

    const handelEditStatus = async (row: any) => {
        const res = await fetchApi(`State/toggleStatus/${row.id}`, "PUT", { id: row.id, status: !row.status }, null, "Status Changed");
        if (res) {
            loadStates();
        }
    }

    useEffect(() => {
        loadStates();
    }, [pagination, debounceSearch]);

    return (
        <StateDiv>
             <Flex justify="space-between">
                 <Box className="top-section">
                        <Text className='font-poppins text_xxl text_semibold'>State</Text>
                       
                      </Box>
                <Box display="flex" gap={3}>
                    
                <Box className="search-box">
                    
                    <Input bg="#fff" type="text" placeholder="Search State..." value={search} onChange={(e) => setSearch(e.target.value)} />
                </Box>
                <CustomButton title="Add New State " onClick={handleAddNew} leftIcon={<AddIcon />} className='btn_theme'/>
                
                </Box>
                </Flex>
            <Flex justify="flex-end" align="center" mr={4}>
            </Flex>

            <CustomTable value={statesData.states}
                onPageChange={pageChangeFunction}
                rowsPerPage={pagination.limit}
                totalRecords={statesData.totalCount}
                headerBg='#E6F0FF'
                headerTextColor='#1A202C'
                emptyMessage='No Data Found'
            >
                <Column header="S.No" body={(_, index) => index + 1} />
                <Column header="State Name" field='name' />
                <Column header="Country" field='countryName' />
                <Column header="Action" body={(row: any) => (<EditIcon cursor="pointer" color="blue.500" onClick={() => handleEdit(row)} />)} />
            </CustomTable>
            <Detail isOpen={showForm} onClose={() => setShowForm(false)} states={selectedStates} loadstates={loadStates} />
        </StateDiv>
    );
};

export default State;