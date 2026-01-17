import {
    Input,
    Slider,
    type InputProps,
    type SliderProps,
} from "@heroui/react";
import { Controller, useFormContext } from "react-hook-form";

const FormSlider = (props: SliderProps & { name: string }) => {
    const { control } = useFormContext();

    return (
        <Controller
            name={props.name}
            control={control}
            render={({
                field: { onChange, onBlur, value, disabled },
                fieldState: { invalid, error },
            }) => (
                <Slider
                    className="w-full"
                    onChange={onChange}
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

export default FormSlider;
