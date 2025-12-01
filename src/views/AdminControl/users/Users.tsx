import React, { useEffect, useState } from 'react';
import { Badge, Box, Flex, Input } from "@chakra-ui/react";
import UserDiv from './users.style';
import Detail from './Detail';
import { AddIcon, EditIcon } from '@chakra-ui/icons';
import CustomTable from '../../../components/customTable';
import { Column } from '../../../components/customTable/CustomTable';
import CustomButton from '../../../components/CustomButton';
import { CustomToast } from '../../../components';
import { useFetch } from '../../../hooks/useFetch';

const roleColors = [
  "#3182CE", // Blue
  "#38A169", // Green
  "#D69E2E", // Yellow
  "#E53E3E", // Red
  "#805AD5", // Purple
  "#DD6B20", // Orange
];


const Users = () => {
    const [users, setUsers] = useState<any[]>([]);
    const [search, setSearch] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [selectedUser, setSelectedUser] = useState<any | null>(null)
    const [pagination, setPagination] = useState({ skip: 0, limit: 10 });
    const { addToast } = CustomToast();
    const { fetchApi } = useFetch(addToast);

    const handleEdit = (row: any) => {
        setSelectedUser(row);
        setShowForm(true);
    };

    const handleAddNew = () => {
        setSelectedUser(null);
        setShowForm(true);
    }

    function pageChangeFunction(e: { skip: number; limit: number }) {
        setPagination(e);
    }

    const loadUser = async () => {
        const res = await fetchApi("User", "GET", null, null, "");
        if (res) {
            setUsers(res);
        }
    }

    useEffect(() => {
        loadUser();
    }, []);

    return (
        <UserDiv>
            <div className="top-section">
                <Box className="search-box">
                    <Input bg="#fff"
                        type="text"
                        placeholder="Search users..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </Box>
                <CustomButton title='Add New User' onClick={handleAddNew} leftIcon={<AddIcon />} />
            </div>

            <Flex justify="flex-end" align="center" mr={4}>
            </Flex>

            <CustomTable value={users}
                onPageChange={pageChangeFunction}
                rowsPerPage={pagination.limit}
                totalRecords={10}
                title='Users'
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

                <Column header="Action" body={(row: any) => (<EditIcon cursor="pointer" color="blue.500" onClick={() => handleEdit(row)} />)} />
            </CustomTable>

            <Detail isOpen={showForm} onClose={() => setShowForm(false)} user={selectedUser} loadUser={loadUser} />
        </UserDiv>
    );
};

export default Users;