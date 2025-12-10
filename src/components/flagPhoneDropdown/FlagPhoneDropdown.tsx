import { Controller } from "react-hook-form";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  HStack,
  Image,
  Text,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
 
interface FlagDropdownProps {
  name: string;
  label?: string;
  control: any;
  errors?: any;
  options: any[];
  placeholder?: string;
  isRequired?: boolean;
}
 
export const FlagDropdown = ({
  name,
  label,
  control,
  errors,
  options,
  placeholder,
  isRequired
}: FlagDropdownProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        // 🔥 Find by dialCode instead of countryId
        const selected = options.find((x) => x.dialCode === field.value);
 
        return (
          <FormControl isInvalid={!!errors?.[name]}>
            {label && (
              <FormLabel>
                {label}{" "}
                {isRequired && <Text as="span" color="red.500">*</Text>}
              </FormLabel>
            )}
 
            <Menu>
              <MenuButton
                as={Button}
                w="100%"
                variant="outline"
                textAlign="left"
              >
                {selected ? (
                  <HStack>
                    <Image src={selected.flag} width="25px" borderRadius="3px" />
                    <Text>{selected.code} ({selected.dialCode})</Text>
                  </HStack>
                ) : (
                  <Text color="gray.400">{placeholder || "Select Code"}</Text>
                )}
              </MenuButton>
 
              <MenuList maxH="260px" overflowY="auto">
                {options.map((opt) => (
                  <MenuItem
                    key={opt.countryId}
                    // 🔥 Save ONLY dialCode (not countryId)
                    onClick={() => field.onChange(opt.dialCode)}
                  >
                    <HStack>
                      <Image src={opt.flag} width="25px" borderRadius="3px" />
                      <Text>{opt.code} ({opt.dialCode})</Text>
                    </HStack>
                  </MenuItem>
                ))}
              </MenuList>
            </Menu>
 
            <Text color="red.500">{errors?.[name]?.message}</Text>
          </FormControl>
        );
      }}
    />
  );
};