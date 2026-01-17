import { Input, type InputProps } from "@heroui/react";
import { Controller, useFormContext } from "react-hook-form";

const FormInput = (props: InputProps & { name: string }) => {
    const { control } = useFormContext();

    return (
        <Controller
            name={props.name}
            control={control}
            render={({
                field: { onChange, onBlur, value, disabled },
                fieldState: { invalid, error },
            }) => (
                <Input
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

export default FormInput;
