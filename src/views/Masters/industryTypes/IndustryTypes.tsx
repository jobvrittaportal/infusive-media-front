import React, { useEffect, useState } from 'react';
import { Badge, Box, Flex, Input } from "@chakra-ui/react";
import IndustryDiv from './industry.style';
import Detail from './Details';
import { AddIcon, EditIcon } from '@chakra-ui/icons';
import CustomTable from '../../../components/customTable';
import { Column } from '../../../components/customTable/CustomTable';
import CustomButton from '../../../components/CustomButton';
import { CustomToast } from '../../../components';
import { useFetch } from '../../../hooks/useFetch';
import { IIndustrtyType, IIndustryTable } from './model';
import useDebounce from '../../../hooks/useDebounce'


const IndustryType = () => {
    const [indusrtiesData, setindusrtiesData] = useState<IIndustryTable>({ indusrties: [], totalCount: 0 });
    const [search, setSearch] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [selectedIndusrties, setSelectedIndusrties] = useState<any | null>(null);
    const [pagination, setPagination] = useState({ skip: 0, limit: 10 });
    const { addToast } = CustomToast();
    const { fetchApi } = useFetch(addToast);
    const debounceSearch = useDebounce(search, 700);

    const handleEdit = (row: any) => {
        setSelectedIndusrties(row);
        setShowForm(true);
    };

    const handleAddNew = () => {
        setSelectedIndusrties(null);
        setShowForm(true);
    }

    function pageChangeFunction(e: { skip: number; limit: number }) {
        setPagination(e);
    }

    const loadIndustries = async () => {
        const res = await fetchApi("IndustryType", "GET", null, `skip=${pagination.skip}&limit=${pagination.limit}&search=${search}`, "");
        if (res) {
            setindusrtiesData(res);
        }
    }

    const handelEditStatus = async(row: any) =>{
        const res = await fetchApi(`IndustryType/toggleStatus/${row.id}`, "PUT", {id: row.id, status: !row.status} , null, "Status Changed");
        if(res){
            loadIndustries();
        }
    }

    useEffect(() => {
        loadIndustries();
    }, [pagination, debounceSearch]);

    return (
        <IndustryDiv>
            <div className="top-section">
                <Box className="search-box">
                    <Input bg="#fff" type="text" placeholder="Search industries..." value={search} onChange={(e) => setSearch(e.target.value)} />
                </Box>
                <CustomButton title='Add New Industry Type' onClick={handleAddNew} leftIcon={<AddIcon />} />
            </div>

            <Flex justify="flex-end" align="center" mr={4}>
            </Flex>

            <CustomTable value={indusrtiesData.indusrties}
                onPageChange={pageChangeFunction}
                rowsPerPage={pagination.limit}
                totalRecords={indusrtiesData.totalCount}
                title='Industry Types'
                headerBg='#E6F0FF'
                headerTextColor='#1A202C'
                emptyMessage='No Data Found'
            >
                <Column header="S.No" body={(_, index) => index + 1} />
                <Column header="Industry Type" field='industryName' />
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

            <Detail isOpen={showForm} onClose={() => setShowForm(false)} industries={selectedIndusrties} loadIndustries={loadIndustries} />
        </IndustryDiv>
    );
};

export default IndustryType;