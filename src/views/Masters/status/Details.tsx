import React, { useEffect } from "react";
import {
  Drawer, DrawerOverlay, DrawerContent, DrawerHeader, DrawerBody,
  DrawerCloseButton, DrawerFooter, Text, Flex
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { AddIcon } from "@chakra-ui/icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { CustomButton, FormInput, CustomToast } from "../../../components";
import { useFetch } from "../../../hooks/useFetch";
import { IStatus, defaultStatus } from "./model";

interface DetailProps {
  isOpen: boolean;
  onClose: () => void;
  status: IStatus | null;
  loadStatuses: () => void;
}

const Detail: React.FC<DetailProps> = ({
  isOpen,
  onClose,
  status,
  loadStatuses
}) => {

  const { addToast } = CustomToast();
  const { fetchApi } = useFetch(addToast);

  const schema = yup.object({
    name: yup.string().required("Status Name is required"),
  });

  const { handleSubmit, control, reset, formState: { errors } } =
    useForm<IStatus>({
      defaultValues: defaultStatus,
      resolver: yupResolver(schema),
    });

  const onSubmit = async (formData: IStatus) => {
    const method = status?.id ? "PUT" : "POST";

    const res = await fetchApi(
      "Status",
      method,
      { ...formData, id: status?.id },
      null,
      "Submitted"
    );

    if (res) {
      loadStatuses();
      onClose();
    }
  };

  useEffect(() => {
    if (status) reset(status);
    else reset(defaultStatus);
  }, [isOpen]);

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="md">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>
          <Text className="font-poppins text_2xl text_semibold">
            {status?.id ? "Edit Status" : "Add New Status"}
          </Text>
        </DrawerHeader>

        <DrawerBody as="form" onSubmit={handleSubmit(onSubmit)}>
          <FormInput
            isRequired
            control={control}
            name="name"
            label="Status Name"
            placeholder="Enter Status Name"
            errors={errors}
          />
        </DrawerBody>

        <DrawerFooter>
          <Flex justify="right" gap={4} w="100%">
            <CustomButton title="Cancel" variant="secondary" onClick={onClose} />
            <CustomButton
              type="submit"
              title={status?.id ? "Update" : "Add"}
              leftIcon={<AddIcon />}
              className="btn_theme"
            />
          </Flex>
        </DrawerFooter>

      </DrawerContent>
    </Drawer>
  );
};

export default Detail;
