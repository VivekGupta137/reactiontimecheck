import React, { type ReactNode } from "react";
import type { CardProps } from "@heroui/react";

import { Button, Card, Image, CardBody } from "@heroui/react";
import {
    BrainIcon,
    ExternalLink,
    Icon,
    Keyboard,
    X,
    Zap,
    type LucideIcon,
} from "lucide-react";

const ProductCard = (
    props: CardProps & {
        heading: string;
        children: ReactNode;
        icon?: ReactNode;
        href?: string;
    },
) => {
    const cardProps = {
        ...props,
        heading: undefined,
        children: undefined,
        icon: undefined,
    };

    return (
        <Card
            className="w-full max-w-[520px] not-prose not-content group"
            isPressable
            as={"a"}
            {...cardProps}
        >
            <Button
                isIconOnly
                className="absolute top-2 right-2 z-20 pointer-events-none"
                radius="full"
                size="sm"
                variant="light"
            >
                <ExternalLink
                    className="text-default-400"
                    width={24}
                />
            </Button>
            <CardBody className="flex flex-col sm:flex-row flex-wrap p-0 sm:flex-nowrap ">
                <div className="self-center mt-2">{props.icon}</div>
                <div className="px-4 py-5">
                    <h3 className="text-large font-medium">{props.heading}</h3>
                    <div className="text-small text-default-400 flex flex-col gap-3 pt-2">
                        {props.children}
                    </div>
                </div>
            </CardBody>
        </Card>
    );
};

export default ProductCard;
