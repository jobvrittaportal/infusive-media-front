import React, { useEffect, useState } from 'react';
import { Badge, Box, Flex, Input, Text } from "@chakra-ui/react";
import UserDiv from './users.style';
import Detail from './Detail';
import { AddIcon, EditIcon } from '@chakra-ui/icons';
import CustomTable from '../../../components/customTable';
import { Column } from '../../../components/customTable/CustomTable';
import CustomButton from '../../../components/CustomButton';
import { CustomToast } from '../../../components';
import { useFetch } from '../../../hooks/useFetch';
import { roleColors, IUsersTable } from './model';
import useDebounce from '../../../hooks/useDebounce';

const Users = () => {

    const [usersData, setUsersData] = useState<IUsersTable>({
        users: [],
        totalCount: 0
    });

    const [search, setSearch] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [selectedUser, setSelectedUser] = useState<any | null>(null);
    const [pagination, setPagination] = useState({ skip: 0, limit: 10 });

    const { addToast } = CustomToast();
    const { fetchApi } = useFetch(addToast);
    const debounceSearch = useDebounce(search, 700);

    
    const [loading, setLoading] = useState(false);

    const handleEdit = (row: any) => {
        setSelectedUser(row);
        setShowForm(true);
    };

    const handleAddNew = () => {
        setSelectedUser(null);
        setShowForm(true);
    };

    function pageChangeFunction(e: { skip: number; limit: number }) {
        setPagination(e);
    }

   
    const loadUser = async () => {
        setLoading(true);

        const res = await fetchApi(
            "User",
            "GET",
            null,
            `skip=${pagination.skip}&limit=${pagination.limit}&search=${search}`,
            ""
        );

        if (res) {
            setUsersData(res);
        }

        setLoading(false);
    };

    useEffect(() => {
        loadUser();
    }, [pagination, debounceSearch]);

    return (
        <UserDiv>
            <Box className="top-section">
                <Text className="font-poppins text_xxl text_semibold">Users</Text>
                <CustomButton title='Add New User' onClick={handleAddNew} leftIcon={<AddIcon />} className='btn_theme' />
            </Box>

            <CustomTable
                value={usersData.users}
                onPageChange={pageChangeFunction}
                rowsPerPage={pagination.limit}
                totalRecords={usersData.totalCount}
                loading={loading}       
                headerBg='#E6F0FF'
                headerTextColor='#1A202C'
                emptyMessage='No Data Found'
            >
                <Column header="S.No" body={(_, index) => index + 1} />

                <Column header="Full Name" field='name' />

                <Column header="Email" field="email" />

                <Column header="Mobile" field="mobile" />

                <Column
                    header="Role"
                    body={(row: any) => (
                        <Flex gap={2} wrap="wrap">
                            {row.roles?.map((r: any, index: number) => (
                                <Badge
                                    key={index}
                                    px={2}
                                    py={1}
                                    borderRadius="md"
                                    color="white"
                                    fontSize="0.8rem"
                                    bg={roleColors[index % roleColors.length]}
                                >
                                    {r.name}
                                </Badge>
                            ))}
                        </Flex>
                    )}
                />

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
                user={selectedUser}
                loadUser={loadUser}
            />
        </UserDiv>
    );
};

export default Users;
