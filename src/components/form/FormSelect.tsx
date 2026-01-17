import { Select, type SelectProps } from "@heroui/react";
import { Controller, useFormContext } from "react-hook-form";

const FormSelect = (props: SelectProps) => {
    const { control } = useFormContext();
    
    return (
        <Controller
            control={control}
            name={props.name as string}
            render={({ field: { onChange, onBlur, value, ref } }) => (
                <Select
                    onChange={onChange}
                    onBlur={onBlur}
                    selectedKeys={value ? [value] : []}
                    {...props}
                    className={`not-content ${props.className || ''}`}
                />
            )}
        />
    );
}

export default FormSelect;
