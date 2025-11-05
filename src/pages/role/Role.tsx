import React, { useState } from "react";
import { Box, Button, Flex, Heading, Switch, useDisclosure, Spinner, } from "@chakra-ui/react";
import { useFetch } from "../../common/hooks";
import { IRole } from "./helpers";
import { GET_ROLES } from "./graphql/query";
import RoleModal from "./RoleModal";
import { AddIcon, EditIcon } from "@chakra-ui/icons";
import CustomTable from "../../common/components/customTable";
import { Column } from "../../common/components/customTable/CustomTable";

const RoleList: React.FC = () => {
  const {
    data,
    loading,
    refetch,
  }: { data: any; loading: boolean; refetch: any } = useFetch(GET_ROLES);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedRole, setSelectedRole] = useState<IRole | null>(null);

  if (loading) return <Spinner size="xl" />;

  function callOpenFunction(role: IRole) {
    setSelectedRole(role);
    if (role) {
      onOpen();
    }
  }

  return (
    <Box p={6}>
      <Flex justify="space-between" align="center" mb={4}>
        <Heading size="lg">Roles</Heading>
        <Button gap={2}
          bg="#0052CC" color="white"
          onClick={() => {
            setSelectedRole(null);
            onOpen();
          }}
        >
          <AddIcon/>
          Add Role
        </Button>
      </Flex>

      <CustomTable value={data?.roles || []}>
        <Column header="S.No" body={(_, index) => index + 1} />
        <Column header="Name" field="name" />
        <Column
          header="Active" body={(row: IRole) => <Switch isChecked={row.active} isReadOnly />}
        />
        <Column
          header="Actions" body = {(row: IRole) => (<EditIcon cursor="pointer" color="blue.700" onClick={() => callOpenFunction(row)}/>)}
        />
         </CustomTable>

      <RoleModal
        isOpen={isOpen}
        onClose={() => {
          onClose();
          refetch();
        }}
        role={selectedRole}
      />
    </Box>
  );
};

export default RoleList;
