import {
    Autocomplete,
    Select,
    type AutocompleteProps,
    type SelectProps,
} from "@heroui/react";
import { Controller, useFormContext } from "react-hook-form";

const FormAutoComplete = (props: AutocompleteProps) => {
    const { control } = useFormContext();

    return (
        <Controller
            control={control}
            name={props.name as string}
            render={({ field: { onChange, onBlur, value, ref } }) => (
                <Autocomplete
                    onSelectionChange={(key) => onChange(key)}
                    onBlur={onBlur}
                    selectedKey={value}
                    showScrollIndicators
                    {...props}
                    className={`not-content ${props.className || ""}`}
                />
            )}
        />
    );
};

export default FormAutoComplete;
