import { FormControl, FormLabel, Input, Text } from "@chakra-ui/react";
import { Controller } from "react-hook-form";

interface InputProps {
  name: string;
  control: any;
  errors?: any;
  label: string;
  type?: string;
  placeholder?: string;
  isRequired?: boolean;
  min?: string;
  max?: string;
  maxLength?: number;
  disable?: boolean
  readOnly?: boolean
}

 const FormInput = ({
  name,
  control,
  errors,
  label,
  type = "text",
  placeholder,
  isRequired = false,
  min,
  max,
  maxLength,
  disable,
  readOnly
}: InputProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <FormControl isRequired={isRequired} isInvalid={!!errors?.[name]}>
          <FormLabel className='font-poppins'>
            {label}
          </FormLabel>
          <Input {...field} type={type} placeholder={placeholder} min={min} max={max} maxLength={maxLength} disabled={disable} readOnly={readOnly} />
          {errors?.[name] && (
            <Text color="red.500" textAlign="left">{errors[name].message}</Text>
          )}
        </FormControl>
      )}
    />
  );
};

export default FormInput;