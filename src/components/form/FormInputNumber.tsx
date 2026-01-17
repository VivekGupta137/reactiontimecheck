import {
    NumberInput,
    type InternalForwardRefRenderFunction,
    type NumberInputProps,
} from "@heroui/react";
import { Controller, useFormContext } from "react-hook-form";

const FormInputNumber = (props: NumberInputProps) => {
    const { control } = useFormContext();

    return (
        <Controller
            control={control}
            name={props.name as string}
            render={({ field: { onChange, onBlur, value, ref } }) => (
                <NumberInput
                    onValueChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    maxLength={50}
                    hideStepper
                    {...props}
                    className={`not-content ${props.className || ""}`}
                />
            )}
        />
    );
};

export default FormInputNumber;
