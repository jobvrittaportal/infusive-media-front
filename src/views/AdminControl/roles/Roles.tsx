import { Box, Flex, Image, Text, Table, Thead, Tr, Th, Tbody, Td, Button, Tooltip, TableContainer, Center, Spinner, } from '@chakra-ui/react';
import { Search2Icon, DeleteIcon } from '@chakra-ui/icons';
import MyDiv from './roles.style';
import { ActionEditIcon, AlertCard, CustomButton, CustomToast } from '../../../components';
import PlusIcon from '../../../assets/Images/Vector.svg';
import { useNavigate } from 'react-router-dom';
import * as routesNames from '../../../constant/routes';
import { useEffect, useState } from 'react';
import { head, IData, IRole } from './model';
import { useFetch } from '../../../hooks/useFetch';

const Roles = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<IData>({ roles: [], count: 0 });
  const [roleToDelete, setRoleToDelete] = useState<number | null>(null);
  const [deleteAlert, setDeleteAlert] = useState(false);
  const { addToast } = CustomToast();
  const { fetchApi, loading } = useFetch(addToast);

  const loadRoles = async () => {
    const pages = await fetchApi<IData>('role', 'GET');
    if (pages) setData(pages);
  }

  useEffect(() => {
    loadRoles();
  }, []);

  const handleClick = () => {
    navigate(routesNames.NEWROLE)
  };

  const handleDelete = (id: number) => {
    setRoleToDelete(id);
    setDeleteAlert(true);
  };

  const confirmDelete = () => {
    if (roleToDelete) {
      fetchApi(`role/${roleToDelete}`, 'DELETE', null, null, 'Role deleted successfully')
      setDeleteAlert(false);
    }
  };

  const handleEdit = (role: IRole) => {
    navigate(routesNames.NEWROLE, {
      state: {
        role: role,
        isEditing: true
      }
    });
  };

  return (
    <MyDiv>
      <Box className="page_wrapper">
        <Flex className="page_heading flex_header" >
          <Text className="font-poppins text_semibold text_3xl">Roles List </Text>
          <Flex gap={2}>
            {/* <InputGroup width="197px" height="37px">
              <InputLeftElement pointerEvents="none">
                <Search2Icon color="rgba(102, 112, 133, 1)" />
              </InputLeftElement>
              <Input type="text" className='font-poppins text_regular text_md' placeholder="Search Role Name...." maxW="400px" />
            </InputGroup> */}
            <CustomButton title="Add New Role" className=' btn font-poppins text_sm text_medium' rightIcon={<Image src={PlusIcon} className='logo' />} onClick={handleClick} />
          </Flex>
        </Flex>

        <Box mt={4} overflowX="auto" borderRadius="md" boxShadow="sm" bg="#fff">
          <Box position="relative" minH="300px">
            {loading ? (
              <Center position="absolute" top={0} left={0} right={0} bottom={0}>
                <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="#006838" size="xl" />
              </Center>) : (
              <>
                <TableContainer borderRadius="md" boxShadow="sm" bg="#fff" w="auto">
                  <Table variant='striped' colorScheme='gray'>
                    <Thead  >
                      <Tr>
                        {head.map((data, index) => (
                          <Th textAlign='center' className='font-poppins text_medium text_sm'>{data.header}</Th>
                        ))}
                      </Tr>
                    </Thead>
                    <Tbody>
                      {data.roles.map((role, index) => (
                        <Tr key={role.id} >
                          <Td textAlign='center' className='font-poppins text_regular text_sm'>{index + 1}</Td>
                          <Td textAlign='center' className='font-poppins text_regular text_sm' maxWidth="9vw" isTruncated>{role.name}</Td>
                          <Td textAlign='center' className='font-poppins text_regular text_sm' maxWidth="9vw" isTruncated>
                            <Tooltip label={role.description} aria-label="Full reason" bg="gray.700" color="white" placement="bottom-start" maxW="300px" hasArrow>
                              <Box as="span" display="inline-block" w="100%" isTruncated>
                                <Text >{role.description}</Text>
                              </Box>
                            </Tooltip>
                          </Td>
                          <Td textAlign='center' >
                            <ActionEditIcon onClick={() => handleEdit(role)} />
                          </Td>
                          <Td textAlign='center' >
                            <Button size="sm" className='del font-poppins text_regular text_sm' onClick={() => handleDelete(role.id)} leftIcon={<DeleteIcon />} >Delete</Button>
                          </Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </TableContainer>
              </>)}
          </Box>
        </Box>
      </Box>

      {<AlertCard
        isOpen={deleteAlert}
        onClose={() => {
          setRoleToDelete(null);
          setDeleteAlert(false);
        }}
        onConfirm={confirmDelete}
        title="Confirm Delete"
        description="Are you sure you want to delete this role?"
        confirmLabel="Delete"
        cancelLabel="Cancel"
        colorScheme="red"
      />}
    </MyDiv>
  );
};

export default Roles;
