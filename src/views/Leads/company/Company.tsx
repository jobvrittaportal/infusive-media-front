import React, { useEffect, useState } from 'react';
import { Box, Flex, Input } from "@chakra-ui/react";
import UserDiv from './company.style';
import Detail from './Detail';
import { AddIcon, EditIcon } from '@chakra-ui/icons';
import CustomTable from '../../../components/customTable';
import { Column } from '../../../components/customTable/CustomTable';
import CustomButton from '../../../components/CustomButton';
import { CustomToast } from '../../../components';
import { useFetch } from '../../../hooks/useFetch';
import { ICompanyInfo, ICompany, IIndustryTypeOption } from './model';
import useDebounce from '../../../hooks/useDebounce'

const data: ICompany[] = [
  {
    companyName: "ABC Pvt Ltd",
    industryTypeID: 2,
    industryTypeName: "IT Services",
    phoneCountryCode: "+91",
    companyPhone: "+91-9999999999",
    companyEmail: "info@abc.com",
    websiteUrl: "https://abc.com",
    countryCode: "IN",
    feidOrGst: "22AAAAA0000A1Z5",
    companyAddress: "Some Street, Some City, 123456",
  },
];

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
    // const res = await fetchApi("User", "GET", null, `skip=${pagination.skip}&limit=${pagination.limit}&search=${search}`, "");
    // if (res) {
    //     setUsersData(res);
    // }
    setCompanyData({ company: data, totalCount: data.length });
  }

  useEffect(() => {
    loadCompany();
  }, [pagination, debounceSearch]);

  return (
    <UserDiv>
      <div className="top-section">
        <Box className="search-box">
          <Input bg="#fff" type="text" placeholder="Search companies..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </Box>
        <CustomButton title="Add New Company" onClick={handleAddNew} leftIcon={<AddIcon />} bg='#317fedff' color='white'/>
      </div>

      <CustomTable
        value={companyData.company}
        onPageChange={pageChangeFunction}
        rowsPerPage={pagination.limit}
        totalRecords={companyData.totalCount}
        title="Company List"
        headerBg="#E6F0FF"
        headerTextColor="#1A202C"
        emptyMessage="No Data Found"
      >
        <Column header="S.No" body={(_, index: number) => index + 1} />
        <Column header="Company Name" field="companyName" />
        <Column header="Industry Type" field="industryTypeName" />
        <Column header="Phone" field="companyPhone" />
        <Column header="Email" field="companyEmail" />
        <Column header="Country" field="countryCode" />
        <Column header="FEID / GST" field="feidOrGst" />
        <Column
          header="Action"
          body={(row: ICompany) => (
            <EditIcon cursor="pointer" color="blue.500"
              onClick={() => handleEdit(row)}
            />
          )}
        />
      </CustomTable>

      <Detail isOpen={showForm} onClose={() => setShowForm(false)} company={selectedCompany} loadCompany={loadCompany} />
    </UserDiv>
  );
};

export default Company;