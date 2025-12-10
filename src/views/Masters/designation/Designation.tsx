import React, { useEffect, useState } from 'react';
import { Badge, Box, Flex, Input, Text } from "@chakra-ui/react";
import DesignationDiv from './designation.style';
import Detail from './Details';
import { AddIcon, EditIcon } from '@chakra-ui/icons';
import CustomTable from '../../../components/customTable';
import { Column } from '../../../components/customTable/CustomTable';
import CustomButton from '../../../components/CustomButton';
import { CustomToast } from '../../../components';
import { useFetch } from '../../../hooks/useFetch';
import { IDesignation, IDesignationTable } from './model';
import useDebounce from '../../../hooks/useDebounce'


const Designation = () => {
    const [designationsData, setDesignationsData] = useState<IDesignationTable>({ designations: [], totalCount: 0 });
    const [search, setSearch] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [selectedDesignations, setSelectedDesignations] = useState<any | null>(null);
    const [pagination, setPagination] = useState({ skip: 0, limit: 10 });
    const { addToast } = CustomToast();
    const { fetchApi } = useFetch(addToast);
    const debounceSearch = useDebounce(search, 700);

    const handleEdit = (row: any) => {
        setSelectedDesignations(row);
        setShowForm(true);
    };

    const handleAddNew = () => {
        setSelectedDesignations(null);
        setShowForm(true);
    }

    function pageChangeFunction(e: { skip: number; limit: number }) {
        setPagination(e);
    }

    const loadDesignation = async () => {
        const res = await fetchApi("Designation", "GET", null, `skip=${pagination.skip}&limit=${pagination.limit}&search=${search}`, "");
        if (res) {
            setDesignationsData(res);
        }
    }

    const handelEditStatus = async (row: any) => {
        const res = await fetchApi(`Designation/toggleStatus/${row.id}`, "PUT", { id: row.id, status: !row.status }, null, "Status Changed");
        if (res) {
            loadDesignation();
        }
    }

    useEffect(() => {
        loadDesignation();
    }, [pagination, debounceSearch]);

    return (
        <DesignationDiv>
            <Flex justify="space-between">
                <Box className="top-section">
                    <Text className='font-poppins text_xxl text_semibold'>Designation List</Text>

                </Box>
                <Box display="flex" gap={3}>

                    <Box className="search-box">

                        <Input bg="#fff" type="text" placeholder="Search Designation..." value={search} onChange={(e) => setSearch(e.target.value)} />
                    </Box>
                    <CustomButton title="Add New Designation " onClick={handleAddNew} leftIcon={<AddIcon />} className='btn_theme' />

                </Box>
            </Flex>

            <Flex justify="flex-end" align="center" mr={4}>
            </Flex>

            <CustomTable value={designationsData.designations}
                onPageChange={pageChangeFunction}
                rowsPerPage={pagination.limit}
                totalRecords={designationsData.totalCount}

                headerBg='#E6F0FF'
                headerTextColor='#1A202C'
                emptyMessage='No Data Found'
            >
                <Column header="S.No" body={(_, index) => index + 1} />
                <Column header="Designation" field='designationName' />
                <Column
                    header="Status"
                    body={(row: any) => (
                        <span onClick={() => handelEditStatus(row)} style={{ cursor: "pointer" }}>
                            {row.status ? (
                                <Badge colorScheme="green" px={2} py={1} borderRadius={4}>Active</Badge>
                            ) : (
                                <Badge colorScheme="red" px={2} py={1} borderRadius={4}>Inactive</Badge>
                            )}
                        </span>
                    )}
                />


                <Column header="Action" body={(row: any) => (<EditIcon cursor="pointer" color="blue.500" onClick={() => handleEdit(row)} />)} />
            </CustomTable>

            <Detail isOpen={showForm} onClose={() => setShowForm(false)} designations={selectedDesignations} loadDesignation={loadDesignation} />
        </DesignationDiv>
    );
};

export default Designation;