import { Button, useDisclosure } from "@heroui/react";
import { CogIcon } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import CModal from "@/components/settings/CModal";
import type z from "zod";

const CSettings = ({
    children,
    defaultValues,
    onSubmit,
    loadedValues,
    schema,
}: {
    children: React.ReactNode;
    defaultValues: any;
    onSubmit: (data: any) => void;
    loadedValues: any;
    schema: z.AnyZodObject;
}) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <>
            {" "}
            <Button
                endContent={<CogIcon size={16} />}
                color="warning"
                variant="flat"
                onPress={onOpen}
                disableRipple
            >
                Settings
            </Button>
            <CModal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                onSubmit={onSubmit}
                defaultValues={defaultValues}
                loadedValues={loadedValues}
                schema={schema}
            >
                {children}
            </CModal>
        </>
    );
};

export default CSettings;
