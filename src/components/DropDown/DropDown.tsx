import { Controller } from "react-hook-form";
import {
    FormControl,
    FormLabel,
    Select,
    Text
} from "@chakra-ui/react";

interface DropdownProps {
    name: string;
    label?: string;
    control: any;
    errors?: any;
    options: any[];
    valueKey: string;
    labelKey: string;
    placeholder?: string;
    isRequired?: boolean;
    disable?: boolean
}

export const Dropdown = ({ name, label, control, errors, options, valueKey, labelKey, placeholder, isRequired, disable }: DropdownProps) => {
    const parseValue = (val: any) => {
        if (val === "true") return true;
        if (val === "false") return false;
        if (!isNaN(val) && val.trim() !== "") return Number(val);
        return val;
    };


    return (
        <Controller name={name} control={control} render={({ field }) => (
            <FormControl isInvalid={!!errors[name]} mt={2}>
                {label && <FormLabel className='font-poppins'>
                    {label}{" "}
                    {isRequired && <Text as="span" color="red.500">*</Text>}
                </FormLabel>}
                <Select
                    {...field}
                    placeholder={placeholder || `Select ${label}`}
                    onChange={(e) => field.onChange(parseValue(e.target.value))} disabled={disable}
                >
                    {options?.map((opt, idx) => (
                        <option key={idx} value={opt[valueKey]}>
                            {opt[labelKey]}
                        </option>
                    ))}
                </Select>
                <Text color="red.500">{errors && errors[name]?.message}</Text>
            </FormControl>
        )}
        />
    );
};
