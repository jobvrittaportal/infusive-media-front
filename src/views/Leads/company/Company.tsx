import React, { useEffect, useState } from 'react';
import { Box, Flex, Grid, GridItem, Input, InputGroup, Text } from "@chakra-ui/react";
import UserDiv from './company.style';
import Detail from './Detail';
import { AddIcon, EditIcon } from '@chakra-ui/icons';
import CustomTable from '../../../components/customTable';
import { Column } from '../../../components/customTable/CustomTable';
import CustomButton from '../../../components/CustomButton';
import { CustomToast } from '../../../components';
import { useFetch } from '../../../hooks/useFetch';
import { ICompanyInfo, ICompany, cards } from './model';
import useDebounce from '../../../hooks/useDebounce'

const Company = () => {
  const [companyData, setCompanyData] = useState<ICompanyInfo>({ company: [], totalCount: 0 });
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<ICompany | null>(null);
  const [pagination, setPagination] = useState({ skip: 0, limit: 10 });
  const { addToast } = CustomToast();
  const { fetchApi } = useFetch(addToast);
  const debounceSearch = useDebounce(search, 700);

  const handleEdit = (row: ICompany) => {
    setSelectedCompany(row);
    setShowForm(true);
  };

  const handleAddNew = () => {
    setSelectedCompany(null);
    setShowForm(true);

  };

  function pageChangeFunction(e: { skip: number; limit: number }) {
    setPagination(e);
  }

  const loadCompany = async () => {
    const res = await fetchApi("Company", "GET", null, `skip=${pagination.skip}&limit=${pagination.limit}&search=${search}`, "");
    if (res) {
      setCompanyData(res);
    }
  }

  const companyAddress = (rowData: any) => {
    return (
      rowData.cityName ?
        <span>{rowData.cityName}, {rowData.stateName}, {rowData.countryName}</span> :
        rowData.stateName ?
          <span>{rowData.stateName}, {rowData.countryName}</span> :
          <span>{rowData.countryName}</span>
    );
  }

  useEffect(() => {
    loadCompany();
  }, [pagination, debounceSearch]);

  return (
    <UserDiv>
      <Box className="top-section">
        <Text className='font-poppins text_xxl text_semibold'>Company</Text>
        <CustomButton title="Add New Company" onClick={handleAddNew} leftIcon={<AddIcon />} className='btn_theme' />
      </Box>
      <Grid className="grid_container grid_gap_sm" p={4}>
        {cards.map((card, index) => (
          <GridItem
            key={index}
            colSpan={{ base: 12, sm: 6, md: 3 }}
            className="card_box"
          >
            <Flex align="center" gap={3} mb={3}>
              <Text className="font-poppins text_md text_semibold">
                {card.label}
              </Text>
            </Flex>

            <Flex align="center" gap={2}>
              <Text className="font-poppins text_xxl text_bold">{card.value}
              </Text>
            </Flex>

            <Flex align="center" gap={2}>
              <Text fontSize="sm" color="green.500">
                {card.percent} <Text as="span" style={{ color: "#667085" }}>since last month</Text>
              </Text>
            </Flex>
          </GridItem>
        ))}
      </Grid>

      <Flex justify='space-between' mt={6}>
        <Text className='font-poppins text_xxl text_semibold'>Company List</Text>
        <Box className="search-box" >
          <InputGroup>
            <Input type="text" placeholder="Search companies..." value={search} onChange={(e) => setSearch(e.target.value)} />
          </InputGroup>
        </Box>
      </Flex>

      <CustomTable
        value={companyData.company}
        onPageChange={pageChangeFunction}
        rowsPerPage={pagination.limit}
        totalRecords={companyData.totalCount}
        headerBg="#0050C826"
        headerTextColor="#1A202C"
        emptyMessage="No Data Found"
      >
        <Column header="S.No" body={(_, index: number) => index + 1} />
        <Column header="Company Name" field="companyName" />
        <Column header="Industry Type" field="industryTypeName" />
        <Column header="Phone" field="companyPhone" />
        <Column header="Email" field="companyEmail" />
        <Column header="Country" field="countryName" />
        <Column header="Address" field="countryCode" body={companyAddress} />
        <Column header="FEID / GST" field="feid" />
        <Column
          header="Action"
          body={(row: ICompany) => (
            <EditIcon cursor="pointer" color="blue.500"
              onClick={() => handleEdit(row)}
            />
          )}
        />
      </CustomTable>

      <Detail isOpen={showForm} onClose={() => { setShowForm(false); setSelectedCompany(null); }} company={selectedCompany} loadCompany={loadCompany} />
    </UserDiv>
  );
};

export default Company;
