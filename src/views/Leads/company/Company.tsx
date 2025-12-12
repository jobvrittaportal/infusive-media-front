import React, { useEffect, useState } from 'react';
import {
  Box, Flex, Grid, GridItem, HStack, Input, InputGroup,
  Text, Table, Thead, Tbody, Tr, Th, Td, Checkbox
} from "@chakra-ui/react";
import UserDiv from './company.style';
import Detail from './Detail';
import DetailPOC from './DetailPOC';
import CustomButton from '../../../components/CustomButton';
import { CustomToast } from '../../../components';
import { useFetch } from '../../../hooks/useFetch';
import { ICompanyInfo, ICompany, cards, ICompanyPOC } from './model';
import useDebounce from '../../../hooks/useDebounce';
import { AddIcon, EditIcon, ViewIcon } from '@chakra-ui/icons';
import GenerateLeadModal from './GenerateLeadModal';

const Company = () => {
  const { addToast } = CustomToast();
  const { fetchApi } = useFetch(addToast);

  const [search, setSearch] = useState('');
  const [companyData, setCompanyData] = useState<ICompanyInfo>({ company: [], totalCount: 0 });
  const [selectedCompany, setSelectedCompany] = useState<ICompany | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [selectedCompanyPOC, setSelectedCompanyPOC] = useState<ICompanyPOC | null>(null);
  const [companyPOCData, setCompanyPOCData] = useState({ pocs: [], totalCount: 0 });
  const [expandedRowId, setExpandedRowId] = useState<number | null>(null);
  const [showPOCForm, setShowPOCForm] = useState(false);
  const [selectedPOCs, setSelectedPOCs] = useState<number[]>([]);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [selectAllInPOC, setSelectAllInPOC] = useState(false);
  const [pagination] = useState({ skip: 0, limit: 10 });
  const debounceSearch = useDebounce(search, 700);

  const loadCompany = async () => {
    const res = await fetchApi("Company", "GET", null, `skip=${pagination.skip}&limit=${pagination.limit}&search=${search}`, "");
    if (res) setCompanyData(res);
  };

  const loadCompanyPOC = async (companyId: number) => {
    const res = await fetchApi("CompanyPOC", "GET", null, `skip=${pagination.skip}&limit=${pagination.limit}&companyId=${companyId}`, "");
    if (res) setCompanyPOCData(res);

    if (res.totalCount === 0)
      addToast({ message: "No POC found for this company", status: "error" });

    setSelectedPOCs([]);
    setSelectAllInPOC(false);
  };

  const companyAddress = (row: any) => {
    return row.cityName
      ? `${row.cityName}, ${row.stateName}, ${row.countryName}`
      : row.stateName
        ? `${row.stateName}, ${row.countryName}`
        : row.countryName;
  };

  const toggleSelectPoc = (pocId: number) => {
    setSelectedPOCs((prev) => {
      if (prev.includes(pocId)) {
        const next = prev.filter((id) => id !== pocId);
        setSelectAllInPOC(false);
        return next;
      } else {
        const next = [...prev, pocId];
        if (companyPOCData.pocs && next.length === companyPOCData.pocs.length) {
          setSelectAllInPOC(true);
        }
        return next;
      }
    });
  };

  const toggleSelectAllPocs = () => {
    if (!companyPOCData?.pocs) return;
    if (selectAllInPOC) {
      setSelectedPOCs([]);
      setSelectAllInPOC(false);
    } else {
      const allIds = companyPOCData.pocs.map((p: any) => p.id);
      setSelectedPOCs(allIds);
      setSelectAllInPOC(true);
    }
  };

  const handleView = (row : ICompany) => {
    if (expandedRowId === row.id) {
      setExpandedRowId(null);
    } else {
      loadCompanyPOC(row.id ?? 0);
      setExpandedRowId(row.id ?? null);
      setSelectedCompany(row);
    }
  }

  useEffect(() => { loadCompany(); }, [pagination, debounceSearch]);

  return (
    <UserDiv>
      <Box className="top-section">
        <Text className='font-poppins text_xxl text_semibold'>Company</Text>
        <CustomButton title="Add New Company" onClick={() => { setSelectedCompany(null); setShowForm(true); }} leftIcon={<AddIcon />} className='btn_theme' />
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
        <Text className='font-poppins text_xxl text_semibold'>Company List</Text>

        <Flex align="center" gap={3}>
          {/* <CustomButton title="Generate Lead" onClick={() => setIsAssignModalOpen(true)} leftIcon={<AddIcon />} className='btn_theme' isDisabled={selectedPOCs.length === 0} /> */}

          <Box className="search-box">
            <InputGroup>
              <Input placeholder="Search companies..." value={search} onChange={(e) => setSearch(e.target.value)} />
            </InputGroup>
          </Box>
        </Flex>
      </Flex>

      <Box mt={4} border="1px solid #E2E8F0" borderRadius="8px" overflow="hidden">
        <Table variant="simple" size="md">
          <Thead bg="#0050C826">
            <Tr>
              <Th>S.No</Th><Th>Company Name</Th><Th>Industry</Th>
              <Th>Phone</Th><Th>Email</Th><Th>Country</Th>
              <Th>Address</Th><Th>FEID/GST</Th><Th>Action</Th>
            </Tr>
          </Thead>

          <Tbody>
            {companyData.company.map((row, index) => (
              <React.Fragment key={row.id}>
                <Tr>
                  <Td>{index + 1}</Td>
                  <Td>{row.companyName}</Td>
                  <Td>{row.industryTypeName}</Td>
                  <Td>{row.companyPhone}</Td>
                  <Td>{row.companyEmail}</Td>
                  <Td>{row.countryName}</Td>
                  <Td>{companyAddress(row)}</Td>
                  <Td>{row.feid}</Td>

                  <Td>
                    <HStack spacing={4}>
                      <EditIcon color="blue.500" cursor="pointer" onClick={() => { setSelectedCompany(row); setShowForm(true); }} />
                      <AddIcon color="green.500" cursor="pointer" onClick={() => { setSelectedCompany(row); setSelectedCompanyPOC(null); setShowPOCForm(true); }} />
                      <ViewIcon color="purple.500" cursor="pointer" onClick={() => handleView(row)} />
                    </HStack>
                  </Td>
                </Tr>

                {(expandedRowId === row.id && companyPOCData.totalCount > 0) && (
                  <Tr bg="#F8FBFF">
                    <Td colSpan={12}>
                      <Box p={3}>
                        <Flex justify="space-between" align="center" mb={3}>
                          <CustomButton title="Generate Lead" onClick={() => { setIsAssignModalOpen(true); setSelectedCompany(row); }} leftIcon={<AddIcon />} className='btn_theme' isDisabled={selectedPOCs.length === 0} />
                          <Box flex="1" textAlign="center" ml="-100px">
                            <Text className="font-poppins text_xl text_semibold" textAlign="center"> {row.companyName} — POCs List </Text>
                          </Box>
                          <Box width="150px"></Box>
                        </Flex>
                        <Table size="sm">
                          <Thead bg="#DDEAFF">
                            <Tr>
                              <Th><Checkbox isChecked={selectAllInPOC} onChange={toggleSelectAllPocs} /></Th>
                              <Th>Name</Th>
                              <Th>Phone</Th>
                              <Th>Designation</Th>
                              <Th>Whatsapp</Th>
                              <Th>Email</Th>
                              <Th>LinkedIn</Th>
                              <Th>Action</Th>
                            </Tr>
                          </Thead>

                          <Tbody>
                            {companyPOCData.pocs.map((poc: any) => (
                              <Tr key={poc.id}>
                                <Td>
                                  <Checkbox
                                    isChecked={selectedPOCs.includes(poc.id)}
                                    onChange={() => toggleSelectPoc(poc.id)}
                                  />
                                </Td>
                                <Td>{poc.name}</Td>
                                <Td>{poc.phoneNumber}</Td>
                                <Td>{poc.designationName}</Td>
                                <Td>{poc.whatsapp}</Td>
                                <Td>{poc.email}</Td>
                                <Td>{poc.linkedinUrl}</Td>
                                <Td>
                                  <EditIcon color="blue.500" cursor="pointer" onClick={() => { setSelectedCompanyPOC(poc); setShowPOCForm(true); }} />
                                </Td>
                              </Tr>
                            ))}
                          </Tbody>
                        </Table>
                      </Box>
                    </Td>
                  </Tr>
                )}
              </React.Fragment>
            ))}
          </Tbody>
        </Table>
      </Box>

      <Detail isOpen={showForm} company={selectedCompany} loadCompany={loadCompany} onClose={() => { setShowForm(false); setSelectedCompany(null); }} />

      <DetailPOC isOpen={showPOCForm} onClose={() => { setShowPOCForm(false); setSelectedCompanyPOC(null); }} companyPOC={selectedCompanyPOC} selectedCompany={selectedCompany?.id} loadCompanyPOC={() => loadCompanyPOC(selectedCompany?.id || 0)} />

      <GenerateLeadModal isOpen={isAssignModalOpen} onClose={() => setIsAssignModalOpen(false)} selectedPOCs={selectedPOCs} selectedCompany={selectedCompany} />
    </UserDiv>
  );
};

export default Company;
