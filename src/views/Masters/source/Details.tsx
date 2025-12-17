import React, { useEffect, useState } from "react";
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerCloseButton,
  DrawerFooter,
  Text,
  Flex,
  Box,
} from "@chakra-ui/react";

import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { AddIcon } from "@chakra-ui/icons";
import {
  CustomButton,
  CustomToast,
  Dropdown,
  FormInput,
} from "../../../components";
import { useFetch } from "../../../hooks/useFetch";
import { defaultSource, ISource } from "./model";

interface DetailProps {
  isOpen: boolean;
  onClose: () => void;
  states?: ISource | null;
  loadstates: () => void;
}

const Detail: React.FC<DetailProps> = ({
  isOpen,
  onClose,
  states,
  loadstates,
}) => {

  const { addToast } = CustomToast();
  const { fetchApi } = useFetch(addToast);

  const schema = yup.object({
    SourceName: yup.string().required("Name is required"),

  });

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<ISource>({
    defaultValues: defaultSource,

  });

  const onSubmit = async (formData: ISource) => {
    const method = states?.id ? "PUT" : "POST";

    const res = await fetchApi(
      "Source",
      method,
      formData,
      null,
      states?.id ? "Updated Successfully" : "Added Successfully"
    );

    if (res) {
      onClose();
      loadstates();
    }
  };



  useEffect(() => {
    if (states?.id) reset(states);
    else reset(defaultSource);
  }, [isOpen, states]);


  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="md">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />

        <DrawerHeader>
          <Text className="font-poppins font_dark text_semibold text_2xl">
            {states?.id ? "Edit Source" : "Add New Source"}
          </Text>
        </DrawerHeader>

        <DrawerBody>


          <Box mt={4}>
            <FormInput
              isRequired
              control={control}
              name="sourceName"
              label="Source"
              placeholder="Enter Source"
              errors={errors}
            />
          </Box>
        </DrawerBody>

        {/* Submit form wrapper MUST be here for form submit to work */}
        <DrawerFooter as="form" onSubmit={handleSubmit(onSubmit)}>
          <Flex justify="flex-end" gap={4} w="100%">
            <CustomButton
              title="Cancel"
              variant="secondary"
              onClick={onClose}
              bg="red"
              color="white"
            />
            <CustomButton
              type="submit"
              title={states?.id ? "Update" : "Add"}
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