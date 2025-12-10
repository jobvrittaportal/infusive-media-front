import React, { useEffect, useState } from 'react';
import { Badge, Box, Flex, Input } from "@chakra-ui/react";
import { ICountryTable } from './model';
import { AddIcon, EditIcon } from '@chakra-ui/icons';
import Detail from './Details';
import { CustomButton, CustomTable, CustomToast } from '../../../components';
import { useFetch } from '../../../hooks/useFetch';
import useDebounce from '../../../hooks/useDebounce';
import CountryDiv from './country.style';
import { Column } from '../../../components/customTable/CustomTable';


const Country = () => {
    const [countriesData, setcountrieData] = useState<ICountryTable>({ countries: [], totalCount: 0 });
    const [search, setSearch] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [selectedCountries, setSelectedCountries] = useState<any | null>(null);
    const [pagination, setPagination] = useState({ skip: 0, limit: 10 });
    const { addToast } = CustomToast();
    const { fetchApi } = useFetch(addToast);
    const debounceSearch = useDebounce(search, 700);

    const handleEdit = (row: any) => {
        setSelectedCountries(row);
        setShowForm(true);
    };

    const handleAddNew = () => {
        setSelectedCountries(null);
        setShowForm(true);
    }

    function pageChangeFunction(e: { skip: number; limit: number }) {
        setPagination(e);
    }

    const loadCountries = async () => {
        const res = await fetchApi("Country", "GET", null, `skip=${pagination.skip}&limit=${pagination.limit}&search=${search}`, "");
        if (res) {
            setcountrieData(res);
        }
    }

    const handelEditStatus = async (row: any) => {
        const res = await fetchApi(`Country/toggleStatus/${row.id}`, "PUT", { id: row.id, status: !row.status }, null, "Status Changed");
        if (res) {
            loadCountries();
        }
    }

    useEffect(() => {
        loadCountries();
    }, [pagination, debounceSearch]);

    return (
        <CountryDiv>
            <div className="top-section">
                <Box className="search-box">
                    <Input bg="#fff" type="text" placeholder="Search Countries..." value={search} onChange={(e) => setSearch(e.target.value)} />
                </Box>
                <CustomButton title='Add New Country' onClick={handleAddNew} leftIcon={<AddIcon />} />
            </div>

            <Flex justify="flex-end" align="center" mr={4}>
            </Flex>

            <CustomTable value={countriesData.countries}
                onPageChange={pageChangeFunction}
                rowsPerPage={pagination.limit}
                totalRecords={countriesData.totalCount}
                title='Country'
                headerBg='#E6F0FF'
                headerTextColor='#1A202C'
                emptyMessage='No Data Found'
            >
                <Column header="S.No" body={(_, index) => index + 1} />
                <Column header="Country Name" field='name' />
                <Column header="Code" field='code' />
                <Column header="Dial Code" field='dialCode' />
                <Column header="Action" body={(row: any) => (<EditIcon cursor="pointer" color="blue.500" onClick={() => handleEdit(row)} />)} />
            </CustomTable>

            <Detail isOpen={showForm} onClose={() => setShowForm(false)} countries={selectedCountries} loadCountries={loadCountries} />
        </CountryDiv>
    );
};

export default Country;