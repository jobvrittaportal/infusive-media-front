import React, { useState } from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  Switch,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
  Spinner,
} from "@chakra-ui/react";
import { useFetch } from "../../common/hooks";
import { IRole } from "./helpers";
import { GET_ROLES } from "./graphql/query";
import RoleModal from "./RoleModal";

const RoleList: React.FC = () => {
  const {
    data,
    loading,
    refetch,
  }: { data: any; loading: boolean; refetch: any } = useFetch(GET_ROLES);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedRole, setSelectedRole] = useState<IRole | null>(null);

  if (loading) return <Spinner size="xl" />;

  return (
    <Box p={6}>
      <Flex justify="space-between" align="center" mb={4}>
        <Heading size="lg">Roles</Heading>
        <Button
          colorScheme="teal"
          onClick={() => {
            setSelectedRole(null);
            onOpen();
          }}
        >
          Add Role
        </Button>
      </Flex>

      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Active</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data?.roles?.map((role: any) => (
            <Tr key={role.id}>
              <Td>{role.name}</Td>
              <Td>
                <Switch isChecked={role.active} isReadOnly />
              </Td>
              <Td>
                <Button
                  size="sm"
                  onClick={() => {
                    setSelectedRole(role);
                    onOpen();
                  }}
                >
                  Edit
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

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
