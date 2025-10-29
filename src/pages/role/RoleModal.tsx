import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Input,
  VStack,
  Switch,
  FormControl,
  FormLabel,
  useToast,
} from "@chakra-ui/react";
import { useMutation } from "@apollo/client/react";

import { IRole } from "./helpers";
import PermissionTree from "./permissions";
import { UPSERT_ROLE } from "./graphql/mutation";

interface RoleModalProps {
  isOpen: boolean;
  onClose: () => void;
  role: IRole | null;
}

const RoleModal: React.FC<RoleModalProps> = ({ isOpen, onClose, role }) => {
  const [name, setName] = useState(role?.name || "");
  const [active, setActive] = useState(role?.active ?? true);
  const [permissions, setPermissions] = useState(role?.permissions || []);

  // Mutation hook for upserting the role
  const [upsertRole, { loading }] = useMutation(UPSERT_ROLE);
  const toast = useToast();

  // Function to handle saving the role
  const handleSave = async () => {
    try {
      await upsertRole({
        variables: {
          input: {
            id: role?.id,
            name,
            active,
            permissions,
          },
        },
      });
      toast({ title: "Role saved", status: "success" });
      onClose();
    } catch (err: any) {
      toast({ title: err?.message || "Error saving role", status: "error" });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{role ? "Edit Role" : "Add Role"}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4} align="stretch">
            {/* Role Name Input */}
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input value={name} onChange={(e) => setName(e.target.value)} />
            </FormControl>

            {/* Active Toggle */}
            <FormControl display="flex" alignItems="center">
              <FormLabel mb="0">Active</FormLabel>
              <Switch
                isChecked={active}
                onChange={(e) => setActive(e.target.checked)}
              />
            </FormControl>

            {/* Permissions Tree */}
            <PermissionTree value={permissions} onChange={setPermissions} />
          </VStack>
        </ModalBody>

        {/* Modal Footer with Buttons */}
        <ModalFooter>
          <Button onClick={onClose} mr={3}>
            Cancel
          </Button>
          <Button colorScheme="teal" isLoading={loading} onClick={handleSave}>
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default RoleModal;
