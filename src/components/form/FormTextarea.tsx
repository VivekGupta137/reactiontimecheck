import { Textarea, type TextAreaProps } from "@heroui/react";
import { Controller, useFormContext } from "react-hook-form";

const FormTextarea = (props: TextAreaProps & { name: string }) => {
    const { control } = useFormContext();

    return (
        <Controller
            name={props.name}
            control={control}
            render={({
                field: { onChange, onBlur, value, disabled },
                fieldState: { invalid, error },
            }) => (
                <Textarea
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

export default FormTextarea;
