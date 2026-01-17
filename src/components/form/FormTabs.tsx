import { Tabs, type TabsProps } from "@heroui/react";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

const FormTabs = (props: { name: string } & TabsProps) => {
    const { control } = useFormContext();

    return (
        <Controller
            name={props.name}
            control={control}
            render={({
                field: { onChange, onBlur, value, disabled },
                fieldState: { invalid, error },
            }) => (
                <Tabs
                    className="w-full"
                    variant="bordered"
                    selectedKey={value}
                    onSelectionChange={onChange}
                    onBlur={onBlur}
                    isDisabled={disabled}
                    {...props}
                />
            )}
        />
    );
};

export default FormTabs;
