import React, { useState } from 'react';
import { Box, Input, Text,} from "@chakra-ui/react";
import UserDiv from './users.style';
import { GetAllUsersData } from './model';
import { useQuery } from '@apollo/client/react';
import { GET_ALL_USERS } from './graphql/query';
import Detail from './Detail';
import CustomTable from '../../common/components/customTable';
import { Column } from '../../common/components/customTable/CustomTable';
import { EditIcon, ReactIcon } from '@chakra-ui/icons';
import CustomButton from '../../common/components/customButton';

const List = () => {
    const { data, loading, refetch } = useQuery<GetAllUsersData>(GET_ALL_USERS);
    const [search, setSearch] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [selectedUser, setSelectedUser] = useState<any | null>(null)

    const users = data?.users || [];

    const handleEdit = (row: any) =>{
        setSelectedUser(row);
        setShowForm(true);
    };

    const handleAddNew = () =>{
        setSelectedUser(null);
        setShowForm(true);
    }

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

                <CustomButton label='Add New User' onClick={handleAddNew} />
            </div>

              
            <CustomTable value={users}   title="Users List" >
                <Column header="S.No" body={(_, index) => index + 1} />
                <Column header="Full Name" body={(row: any) => `${row.firstName} ${row.lastName}`} />
                <Column header="Email" field="email" />
                <Column header="Mobile" field="mobile" />
                <Column header="Alt Email" field="altEmail" />
                <Column header="Alt Mobile" field="altMobile" />
                <Column header="Action"  body={(row:any)=> (<EditIcon cursor="pointer" color="blue.500" onClick={() => handleEdit(row)}/>)}/>
            </CustomTable>

            <Detail isOpen={showForm} onClose={() => setShowForm(false)} refetch={refetch} user={selectedUser}/>
        </UserDiv>
    );
};

export default List;