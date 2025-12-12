import React, { useEffect, useState } from 'react';
import { Badge, Box, Flex, Input, Text } from "@chakra-ui/react";
import { ICountryTable } from './model';
import { AddIcon, EditIcon } from '@chakra-ui/icons';
import Detail from './Details';
import { CustomButton, CustomTable, CustomToast } from '../../../components';
import { useFetch } from '../../../hooks/useFetch';
import useDebounce from '../../../hooks/useDebounce';
import CountryDiv from './country.style';
import { Column } from '../../../components/customTable/CustomTable';

const Country = () => {
    const [countriesData, setCountriesData] = useState<ICountryTable>({
        countries: [],
        totalCount: 0
    });
    const [search, setSearch] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [selectedCountries, setSelectedCountries] = useState<any | null>(null);
    const [pagination, setPagination] = useState({ skip: 0, limit: 10 });
    const { addToast } = CustomToast();
    const { fetchApi } = useFetch(addToast);
    const debounceSearch = useDebounce(search, 700);
    const [loading, setLoading] = useState(false);

    const handleEdit = (row: any) => {
        setSelectedCountries(row);
        setShowForm(true);
    };

    const handleAddNew = () => {
        setSelectedCountries(null);
        setShowForm(true);
    };

    function pageChangeFunction(e: { skip: number; limit: number }) {
        setPagination(e);
    }

    const loadCountries = async () => {
        setLoading(true);

        const res = await fetchApi(
            "Country",
            "GET",
            null,
            `skip=${pagination.skip}&limit=${pagination.limit}&search=${search}`,
            ""
        );

        if (res) {
            setCountriesData(res);
        }

        setLoading(false);
    };

    useEffect(() => {
        loadCountries();
    }, [pagination, debounceSearch]);

    return (
        <CountryDiv>
            <Flex justify="space-between">
                <Box className="top-section">
                    <Text className='font-poppins text_xxl text_semibold'>Country</Text>
                </Box>

                <Box display="flex" gap={3}>
                    <Box className="search-box">
                        <Input
                            bg="#fff"
                            type="text"
                            placeholder="Search Country..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </Box>

                    <CustomButton
                        title="Add New Country"
                        onClick={handleAddNew}
                        leftIcon={<AddIcon />}
                        className='btn_theme'
                    />
                </Box>
            </Flex>

            <CustomTable
                value={countriesData.countries}
                onPageChange={pageChangeFunction}
                rowsPerPage={pagination.limit}
                totalRecords={countriesData.totalCount}
                headerBg='#E6F0FF'
                headerTextColor='#1A202C'
                emptyMessage='No Data Found'
                loading={loading}
            >
                <Column header="S.No" body={(_, index) => index + 1} />
                <Column header="Country Name" field='name' />
                <Column header="Code" field='code' />
                <Column header="Dial Code" field='dialCode' />
                <Column
                    header="Action"
                    body={(row: any) => (
                        <EditIcon
                            cursor="pointer"
                            color="blue.500"
                            onClick={() => handleEdit(row)}
                        />
                    )}
                />
            </CustomTable>

            <Detail
                isOpen={showForm}
                onClose={() => setShowForm(false)}
                countries={selectedCountries}
                loadCountries={loadCountries}
            />
        </CountryDiv>
    );
};

export default Country;
