import { Box, Button, Checkbox, FormControl, FormLabel, Menu, MenuButton, MenuItem, MenuList, Tag, TagCloseButton, TagLabel, Text,} from '@chakra-ui/react';

type MultiSelectMenuProps<T> = {
  label?: string;
  options: T[];
  selectedValues: number[];
  setSelectedValues: (val: number[]) => void;
  labelKey: keyof T;
  valueKey: keyof T;
  isRequired?: boolean;
  placeholder?: string;
  colorScheme?: string;
  overflow?:boolean
  ShowNumberOfTiles?:number; 
};

export function MultiSelectMenu<T extends Record<string, any>>({
  label,
  options = [], //default empty array
  selectedValues,
  setSelectedValues,
  labelKey,
  valueKey,
  placeholder = '',
  isRequired = false,
  colorScheme = 'blue',
  overflow = false,
  ShowNumberOfTiles,
}: MultiSelectMenuProps<T> ) {
  const safeOptions = Array.isArray(options) ? options : []; //  ensure always array

  const handleSelectionChange = (id: number) => {
  let newSelected: number[] = [];

  if (id === 0) {
    if (!selectedValues?.includes(0)) {
      newSelected = safeOptions.map((opt) => opt[valueKey] as number);
    } else {
      newSelected = [];
    }
  } else {
    if (selectedValues?.includes(id)) {
      newSelected = selectedValues.filter((val) => val !== id);
    } else {
      newSelected = [...selectedValues, id];
    }

    // remove "0" if not all selected
    if (newSelected.includes(0)) {
      const allIds = safeOptions.map((opt) => opt[valueKey] as number);
      if (newSelected.length !== allIds.length) {
        newSelected = newSelected.filter((val) => val !== 0);
      }
    }
  }

  setSelectedValues(newSelected);
};


  return (
    <FormControl mb={4} isRequired={isRequired}>
      <FormLabel>{label}</FormLabel>
      <Menu closeOnSelect={false}>
        <MenuButton as={Button} variant="outline" w="100%" textAlign="left">
          {selectedValues?.length === 0 ? (
            <Text color="gray.400">{placeholder}</Text>
          ) : (
            `${selectedValues?.length} selected`
          )}
        </MenuButton>
        <MenuList maxH="200px" overflowY="auto">
          {safeOptions.map((item) => {
            const id = item[valueKey] as number;
            const name = item[labelKey];
            return (
              <MenuItem key={id} closeOnSelect={false}>
                <Checkbox
                  isChecked={selectedValues?.includes(id)}
                  onChange={() => handleSelectionChange(id)}
                >
                  {name}
                </Checkbox>
              </MenuItem>
            );
          })}
        </MenuList>
      </Menu>

      {selectedValues?.length > 0 && (
        <Box mt={2} display="flex" flexWrap="wrap" gap={2}>
          { selectedValues.slice(0, overflow ? ShowNumberOfTiles : selectedValues.length ).map((id) => {
            const labelItem = safeOptions.find((item) => item[valueKey] === id);
            const name = labelItem?.[labelKey] ?? id;
            return (
              <Tag key={id} size="md" variant="subtle" colorScheme={colorScheme}>
                <TagLabel>{name}</TagLabel>
                <TagCloseButton onClick={() => handleSelectionChange(id)} />
              </Tag>
            );
          })}
          {ShowNumberOfTiles && selectedValues.length > ShowNumberOfTiles && overflow && <p>....</p>}
        </Box>
      )}
    </FormControl>
  );
}
