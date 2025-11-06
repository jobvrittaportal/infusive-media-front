import React, { useEffect, useState } from 'react';
import { Box, Flex, Input } from "@chakra-ui/react";
import UserDiv from './users.style';
import { GetAllUsersData } from './model';
import { useQuery } from '@apollo/client/react';
import { GET_ALL_USERS } from './graphql/query';
import Detail from './Detail';
import CustomTable from '../../common/components/customTable';
import { Column } from '../../common/components/customTable/CustomTable';
import { AddIcon, EditIcon } from '@chakra-ui/icons';
import CustomButton from '../../common/components/customButton';

const List = () => {
    const [search, setSearch] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [selectedUser, setSelectedUser] = useState<any | null>(null)
    const [pagination, setPagination] = useState({ skip: 0, limit: 10});

    const { data, loading, refetch } = useQuery<GetAllUsersData>(GET_ALL_USERS, {
        variables: {...pagination, search},              // $skip and $limit are GraphQL variables
        fetchPolicy: 'cache-only'             
    });

    const users = data?.users || [];
    const totalRecords = data?.totalUsersCount || 0;

    const handleEdit = (row: any) => {
        setSelectedUser(row);
        setShowForm(true);
    };

    const handleAddNew = () => {
        setSelectedUser(null);
        setShowForm(true);
    }

    function pageChangeFunction(e: { skip: number; limit: number }) {
        setPagination(e);    // updates state, so the UI knows what page we are on
        refetch(e);          // triggers an immediate API call to get fresh data for that page
    }

    useEffect(() =>{
        const delayDebounce = setTimeout(() =>{
            refetch({...pagination, search});
        }, 1000);
        return () => clearTimeout(delayDebounce);
    },[search]);

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
                <CustomButton label='Add New User' onClick={handleAddNew} leftIcon={<AddIcon/>}/>
            </div>

            <Flex justify="flex-end" align="center" mr={4}>
            </Flex>

            <CustomTable value={users}
                onPageChange={pageChangeFunction}
                rowsPerPage={pagination.limit}
                loading={loading}
                totalRecords={totalRecords}
                title='Users'
                headerBg='#E6F0FF'
                headerTextColor='#1A202C'
            >
                <Column header="S.No" body={(_, index) => index + 1} />
                <Column header="Full Name" body={(row: any) => `${row.firstName} ${row.lastName}`} />
                <Column header="Email" field="email" />
                <Column header="Mobile" field="mobile" />
                <Column header="Alt Email" field="altEmail" />
                <Column header="Alt Mobile" field="altMobile" />
                <Column header="Action" body={(row: any) => (<EditIcon cursor="pointer" color="blue.500" onClick={() => handleEdit(row)} />)} />
            </CustomTable>

            <Detail isOpen={showForm} onClose={() => setShowForm(false)} refetch={refetch} user={selectedUser} />
        </UserDiv>
    );
};

export default List;