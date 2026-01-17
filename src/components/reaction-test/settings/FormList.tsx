import React from "react";
import { Card, CardBody } from "@heroui/react";

const FormList = ({
    title,
    children,
    description,
    error,
}: {
    title?: string;
    children: React.ReactNode;
    description?: string;
    error?: string;
}) => {
    return (
        <Card>
            <CardBody className="flex flex-wrap flex-row justify-between items-center">
                {title && <h2 className=" mb-2">{title}</h2>}
                {description && (
                    <p className="text-sm text-primary-foreground">
                        {description}
                    </p>
                )}
                {children}
                {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
            </CardBody>
        </Card>
    );
};

export default FormList;
