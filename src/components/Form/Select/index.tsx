import { forwardRef, ForwardRefRenderFunction, useMemo } from 'react';
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    Select,
    SelectProps,
} from '@chakra-ui/react';
import { FieldError } from 'react-hook-form';

export interface OptionsData {
    value: string | number;
    label: string;
}

interface FormSelectProps extends SelectProps {
    name: string;
    options: OptionsData[];
    label?: string;
    error?: FieldError;
}

const SelectBase: ForwardRefRenderFunction<HTMLSelectElement, FormSelectProps> =
    ({ name, options, label, error = null, ...rest }, ref) => {
        const commonInputProps = useMemo(
            () => ({
                id: name,
                name,
                variant: 'filled',
                borderColor: 'tlgp.variants.inputBorderGrey',
                focusBorderColor: 'tlgp.variants.grey',
                bgColor: 'white',
                _hover: {
                    bgColor: 'white',
                    borderColor: 'tlgp.variants.grey',
                },
                _focus: {
                    bgColor: 'white',
                    borderColor: 'tlgp.variants.grey',
                },
                height: '42px',
                fontWeight: 'light',
                fontSize: '0.875rem',
                ref,
                'data-testid': `form-input-${name}`,
                borderWidth: 1,
            }),
            [name, ref],
        );

        return (
            <FormControl isInvalid={!!error} data-testid="form-control-input">
                {!!label && (
                    <FormLabel
                        htmlFor={name}
                        fontWeight="normal"
                        fontSize="0.875rem">
                        {label}
                    </FormLabel>
                )}
                <Select {...commonInputProps} {...rest}>
                    {options &&
                        options.map((option) => (
                            <option
                                key={`select-option-${option.value}`}
                                value={option.value}>
                                {option.label}
                            </option>
                        ))}
                </Select>
                {!!error && (
                    <FormErrorMessage>{error.message}</FormErrorMessage>
                )}
            </FormControl>
        );
    };

export const FormSelect = forwardRef(SelectBase);
