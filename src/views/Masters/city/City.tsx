import React, { useEffect, useState } from 'react';
import { Badge, Box, Flex, Input } from "@chakra-ui/react";
import { AddIcon, EditIcon } from '@chakra-ui/icons';
import Detail from './Details';
import { CustomButton, CustomTable, CustomToast } from '../../../components';
import { useFetch } from '../../../hooks/useFetch';
import useDebounce from '../../../hooks/useDebounce';
import { Column } from '../../../components/customTable/CustomTable';
import { ICityTable } from './model';
import CityDiv from './city.style';


const City = () => {
    const [citiesData, setcountrieData] = useState<ICityTable>({ cities: [], totalCount: 0 });
    const [search, setSearch] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [selectedCities, setSelectedCities] = useState<any | null>(null);
    const [pagination, setPagination] = useState({ skip: 0, limit: 10 });
    const { addToast } = CustomToast();
    const { fetchApi } = useFetch(addToast);
    const debounceSearch = useDebounce(search, 700);

    const handleEdit = (row: any) => {
        setSelectedCities(row);
        setShowForm(true);
    };

    const handleAddNew = () => {
        setSelectedCities(null);
        setShowForm(true);
    }

    function pageChangeFunction(e: { skip: number; limit: number }) {
        setPagination(e);
    }

    const loadCities = async () => {
        const res = await fetchApi("City", "GET", null, `skip=${pagination.skip}&limit=${pagination.limit}&search=${search}`, "");
        if (res) {
            setcountrieData(res);
        }
    }

    const handelEditStatus = async (row: any) => {
        const res = await fetchApi(`Country/toggleStatus/${row.id}`, "PUT", { id: row.id, status: !row.status }, null, "Status Changed");
        if (res) {
            loadCities();
        }
    }

    useEffect(() => {
        loadCities();
    }, [pagination, debounceSearch]);

    return (
        <CityDiv>
            <div className="top-section">
                <Box className="search-box">
                    <Input bg="#fff" type="text" placeholder="Search Cities..." value={search} onChange={(e) => setSearch(e.target.value)} />
                </Box>
                <CustomButton title='Add New City' onClick={handleAddNew} leftIcon={<AddIcon />} />
            </div>

            <Flex justify="flex-end" align="center" mr={4}>
            </Flex>

            <CustomTable value={citiesData.cities}
                onPageChange={pageChangeFunction}
                rowsPerPage={pagination.limit}
                totalRecords={citiesData.totalCount}
                title='City'
                headerBg='#E6F0FF'
                headerTextColor='#1A202C'
                emptyMessage='No Data Found'
            >
                <Column header="S.No" body={(_, index) => index + 1} />
                <Column header="City Name" field='name' />
                <Column header="State" field='stateName' />
                <Column header="Country" field='countryName' />
                <Column header="Action" body={(row: any) => (<EditIcon cursor="pointer" color="blue.500" onClick={() => handleEdit(row)} />)} />
            </CustomTable>
            <Detail isOpen={showForm} onClose={() => setShowForm(false)} cities={selectedCities} loadcities={loadCities} />
        </CityDiv>
    );
};

export default City;