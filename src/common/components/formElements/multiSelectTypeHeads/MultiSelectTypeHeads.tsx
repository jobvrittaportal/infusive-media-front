import React, { useRef, useState } from 'react';
import { Box, Input, InputGroup, InputRightElement, List, ListItem, Spinner, IconButton, Tag, TagLabel, TagCloseButton, Wrap, useOutsideClick,} from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';
import { Control, Controller } from 'react-hook-form';

type Props = {
  name: string;
  control: Control<any>;
  options: any[];
  onCompletion: (query?: string) => void;
  loading: boolean;
  optionValue?: string;
  optionLabel?: string;
  placeholder?: string;
  disabled?: boolean;
};

const MultiSelectTypeaHeads: React.FC<Props> = ({
  name,
  control,
  options,
  onCompletion,
  loading,
  optionValue = 'id',
  optionLabel = 'name',
  placeholder = 'Search...',
  disabled,
}) => {
  const [input, setInput] = useState<string>('');
  const [showOptions, setShowOptions] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useOutsideClick({
    ref: rootRef,
    handler: () => {
      setShowOptions(false);
      setInput('');
    },
  });

  function handleSelect(_value: any, fieldValue: any[], onChange: (v: any) => void) {
    const exists = fieldValue?.some((v: any) => v[optionValue] === _value[optionValue]);
    if (!exists) {
      onChange([...(fieldValue || []), _value]);
    }
    setInput('');
    setShowOptions(false);
    onCompletion('');
  }

  function handleRemove(item: any, fieldValue: any[], onChange: (v: any) => void) {
    const newValue = fieldValue.filter((v: any) => v[optionValue] !== item[optionValue]);
    onChange(newValue);
  }

  function handleClear(onChange: (v: any) => void) {
    setInput('');
    setShowOptions(false);
    onChange([]);
  }

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        const fieldValue = field.value || [];

        return (
          <Box ref={rootRef} position="relative" w="100%">
            {/* Selected tags */}
            {fieldValue.length > 0 && (
              <Wrap mb={2}>
                {fieldValue.map((item: any) => (
                  <Tag key={item[optionValue]} colorScheme="blue">
                    <TagLabel>{item[optionLabel]}</TagLabel>
                    <TagCloseButton
                      onClick={() => handleRemove(item, fieldValue, field.onChange)}
                    />
                  </Tag>
                ))}
              </Wrap>
            )}

            <InputGroup>
              <Input
                value={input}
                placeholder={placeholder}
                onChange={(e) => {
                  const q = e.target.value;
                  setInput(q);
                  onCompletion(q);
                }}
                onFocus={() => setShowOptions(true)}
                disabled={disabled}
                autoComplete="off"
              />
              <InputRightElement width="3rem">
                {loading ? (
                  <Spinner size="sm" />
                ) : fieldValue.length > 0 ? (
                  <IconButton
                    aria-label="Clear"
                    size="sm"
                    variant="ghost"
                    icon={<CloseIcon boxSize={2.5} />}
                    onClick={() => handleClear(field.onChange)}
                  />
                ) : null}
              </InputRightElement>
            </InputGroup>

            {/* Options */}
            {showOptions && options.length > 0 && (
              <List
                position="absolute"
                top="100%"
                left={0}
                right={0}
                bg="white"
                borderWidth="1px"
                borderRadius="md"
                mt={1}
                maxH="220px"
                overflowY="auto"
                zIndex={10}
                boxShadow="sm"
              >
                {options.map((opt) => (
                  <ListItem
                    key={opt[optionValue]}
                    px={3}
                    py={2}
                    _hover={{ bg: 'gray.100', cursor: 'pointer' }}
                    onClick={() => handleSelect(opt, fieldValue, field.onChange)}
                  >
                    {opt[optionLabel]}
                  </ListItem>
                ))}
              </List>
            )}
          </Box>
        );
      }}
    />
  );
};

export default MultiSelectTypeaHeads;
