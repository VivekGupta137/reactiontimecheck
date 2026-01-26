import {
    type InputOtpProps,
    type InputProps,
    Input,
    InputOtp,
} from "@heroui/react";
import React from "react";
import { useFormContext, Controller } from "react-hook-form";

const FormInputOtp = (props: InputOtpProps & { name: string }) => {
    const { control } = useFormContext();

    return (
        <Controller
            name={props.name}
            control={control}
            render={({
                field: { onChange, onBlur, value, disabled },
                fieldState: { invalid, error },
            }) => (
                <InputOtp
                    className="w-full"
                    variant="bordered"
                    placeholder="Enter your text here..."
                    onValueChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    isDisabled={disabled}
                    isInvalid={invalid}
                    errorMessage={error?.message}
                    {...props}
                />
            )}
        />
    );
};

export default FormInputOtp;
