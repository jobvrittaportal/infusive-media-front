import React, { useEffect, useState } from "react";
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, VStack, Switch, FormControl, FormLabel, useToast, Flex,
} from "@chakra-ui/react";
import { useMutation } from "@apollo/client/react";
import { IRole, defaultIRole, schema } from "./helpers";
import PermissionTree from "./permissions"; 
import { UPDATE_ROLE, UPSERT_ROLE } from "./graphql/mutation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormInput } from "../../common/components/formElements";
import { removeTypeNameFromformData } from "../../common/utils/common";
import CustomButton from "../../common/components/customButton";

interface RoleModalProps {
  isOpen: boolean;
  onClose: () => void;
  role: IRole | null;
}

const RoleModal: React.FC<RoleModalProps> = ({ isOpen, onClose, role }) => {
  const toast = useToast();
  const [upsertRole, { loading : creating }] = useMutation(UPSERT_ROLE,{
    onCompleted: () =>{
      reset(defaultIRole);
    },
    onError: (err) => alert(err.message),
  });

  const [updateRole, {loading : updating}] = useMutation(UPDATE_ROLE, {
    onCompleted: () =>{
      reset(defaultIRole)
    },
    onError: (err) => alert(err.message),
  });

  const [permissions, setPermissions] = useState(role?.permissions || []);

  const { handleSubmit, control, reset, watch, setValue, formState: { errors },} = useForm<IRole>({
    resolver: yupResolver(schema),
    defaultValues: defaultIRole,
  });

  // Watchers for live updates
  const active = watch("active");

  //  Reset when modal opens or role changes
  useEffect(() => {
    if (isOpen) {
      if (role) {
        reset(removeTypeNameFromformData(role));
        setPermissions(role.permissions || []);
      } else {
        reset(defaultIRole);
        setPermissions([]);
      }
    }
  }, [isOpen, role, reset]);

  const onSubmit = async (data: IRole) => {
    try {
      if(role?.id){
        await updateRole({
          variables:{
            id: role?.id,
            input:{
                ...removeTypeNameFromformData(data),
                permissions
            },
          },
        });
      }
      else{
        // const {id , ...rest} = removeTypeNameFromformData(data);
        await upsertRole({
          variables: {
            input: {
              ...removeTypeNameFromformData(data),
              permissions
            },
          },
        });
      }

      toast({ title: "Role saved successfully", status: "success" });
      onClose();
      reset(defaultIRole);
    } catch (err: any) {
      toast({
        title: err?.message || "Error saving role",
        status: "error",
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="3xl">
      <ModalOverlay />
      <ModalContent borderRadius="xl">
        <ModalHeader>{role ? "Edit Role" : "Add Role"}</ModalHeader>
        <ModalCloseButton />

        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalBody overflowY="auto" maxH="400px">
            <VStack spacing={4} align="stretch">
              <Flex justify="space-between" align="center" gap={5}>
                <FormInput name="name" control={control} type="string" label="Name" placeholder="Enter the Role name" errors={errors}/>

                <FormControl display="flex" alignItems="center" width="fit-content">
                  <FormLabel mb="0">Active</FormLabel>
                  <Switch
                    isChecked={active}
                    onChange={(e) => setValue("active", e.target.checked)}
                  />
                </FormControl>
              </Flex>

              <PermissionTree value={permissions} onChange={setPermissions} />
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Flex justify="center" gap={4} mb={4}>
              <CustomButton label="Close" variantType="secondary" onClick={onClose} />
              <CustomButton type="submit" label={role ? "Update" : "Add"} loading={creating || updating} />
            </Flex>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default RoleModal;
