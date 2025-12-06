import MyDiv from './pages.style'
import { Box, Flex, Input, InputGroup, InputLeftElement, Text, Image, TableContainer, Table, Th, Thead, Tr, Tbody, Td, Button, Tooltip, Grid, GridItem, Center, Spinner } from '@chakra-ui/react';
import { DeleteIcon, Search2Icon } from '@chakra-ui/icons';
import { ActionEditIcon, CustomButton, CustomToast } from "../../../components";
import PlusIcon from '../../../assets/Images/Vector.svg';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as routesNames from '../../../constant/routes';
import AlertCard from '../../../components/AlertCard/alertCard'
import { useFetch } from '../../../hooks/useFetch';
import { Header, IPage } from './model';


const Pages = () => {
    const [data, setData] = useState<IPage[]>([]);
    const [deleteId, setDeleteId] = useState<number[]>([]);
    const [deleteAlert, setDeleteAlert] = useState(false);
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const { addToast } = CustomToast();
    const { fetchApi, loading } = useFetch(addToast);
    const [lazyParams, setLazyParams] = useState({ first: 0, rows: 20, page: 0, sortField: '', sortOrder: 1, });


    const loadPages = async (filterValue = '') => {
        const query = new URLSearchParams({
            lazyParams: JSON.stringify(lazyParams),
            search: filterValue,
        }).toString();

        const endpoint = query ? `page?${query}` : 'page';
        const pages = await fetchApi<any>(endpoint, "GET", null, null, '');
        if (pages) setData(pages.pages);
        // setTotalCount(pages.totalcount);
    };


    useEffect(() => {
        loadPages(searchQuery);
    }, [lazyParams, searchQuery]);

    const handleDelete = (id: any) => {
        setDeleteId([...deleteId, id])
        setDeleteAlert(true)
    };
    const confirmDelete = () => {
        fetchApi(`page/${deleteId[0]}`, 'DELETE', null, null, 'Page deleted successfully')
        setDeleteAlert(false)
    };

    const handleEdit = (page: IPage) => {
        page.features?.forEach((feature) => {
            feature.state = 'update';
        });
        navigate(routesNames.NEWPAGE, {
            state: {
                data: page,
                isEditing: true
            }
        });
    };

    return (
        <MyDiv>
            <Box className="page_wrapper">
                <Flex className="page_heading flex_header" >
                    <Text className="font-poppins text_semibold text_3xl">Pages</Text>
                    <Flex gap={2}>
                        <InputGroup width="197px" height="37px">
                            <InputLeftElement pointerEvents="none">
                                <Search2Icon color="rgba(102, 112, 133, 1)" />
                            </InputLeftElement>
                            <Input type="text" className='font-poppins text_regular text_md' placeholder="Search Page Name...." maxW="400px" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                        </InputGroup>
                        <CustomButton onClick={() => navigate(routesNames.NEWPAGE)} title="Add New" className=' btn font-poppins text_sm text_medium' rightIcon={<Image src={PlusIcon} className='logo' />} />
                    </Flex>
                </Flex>
                <Box mt={4} overflowX="auto" borderRadius="md" boxShadow="sm" bg="#fff">
                    <Grid className='grid_container'>
                        <GridItem colSpan={12}>
                            <Box position="relative" minH="300px">
                                {loading ? (
                                    <Center position="absolute" top={0} left={0} right={0} bottom={0}>
                                        <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="#2E90FA" size="xl" />
                                    </Center>) : (
                                    <>
                                        <TableContainer>
                                            <Table border={'1px solid #EAECF0solid'} variant='striped' colorScheme='gray'>
                                                <Thead>
                                                    <Tr>
                                                        {Header.map((item, index) => (
                                                            <Th key={index} className='font-poppins text_medium text_sm' color={'#000000'}>{item.name}</Th>
                                                        ))}
                                                    </Tr>
                                                </Thead>
                                                <Tbody> {data.map((page, index) => (
                                                    <Tr key={page.id}>
                                                        <Td className='font-poppins text_regular text_md' color={'#42526D'}>{index + 1}</Td>
                                                        <Td className='font-poppins text_regular text_md' color={'#42526D'}>{page.name}</Td>
                                                        <Td className='font-poppins text_regular text_md' color={'#42526D'}>{page.label}</Td>
                                                        <Td textAlign='center' className='font-poppins text_regular text_sm' maxWidth="9vw" isTruncated>
                                                            <Tooltip label={page.description} aria-label="Full reason" bg="gray.700" color="white" placement="bottom-start" maxW="300px" hasArrow>
                                                                <Box as="span" display="inline-block" w="100%" isTruncated>
                                                                    <Text >{page.description}</Text>
                                                                </Box>
                                                            </Tooltip>
                                                        </Td>
                                                        <Td className='font-poppins text_regular text_md' color={'#42526D'} maxWidth="9vw" isTruncated
                                                        >{page.url}</Td>
                                                        <Td  ><ActionEditIcon onClick={() => handleEdit(page)} /></Td>
                                                        <Td className='font-poppins text_regular text_md' color={'#42526D'}>
                                                            <Button size="sm" className='del font-poppins text_regular text_sm' leftIcon={<DeleteIcon />} onClick={() => handleDelete(page.id)}>Delete</Button>
                                                        </Td>
                                                    </Tr>))}
                                                </Tbody>
                                            </Table>
                                        </TableContainer>
                                    </>)}
                            </Box>
                        </GridItem>
                    </Grid>
                </Box>
                <AlertCard onClose={() => setDeleteAlert(false)} onConfirm={confirmDelete} isOpen={deleteAlert} title="Confirm Delete" description="Are you sure you want to delete this role?" confirmLabel="Delete" cancelLabel="Cancel" colorScheme="red" />
            </Box>
        </MyDiv>
    )
}
export default Pages;