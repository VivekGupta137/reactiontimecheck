import { Card, CardBody, CardFooter, CardHeader, Divider } from "@heroui/react";
import { ExternalLink } from "lucide-react";
import React from "react";

const BlogCard = ({
    heading,
    children,
    href,
    updatedAt,
}: {
    heading: string;
    href: string;
    children: React.ReactNode;
    updatedAt?: Date;
}) => {
    return (
        <Card className="not-prose my-2">
            <CardHeader>
                <a
                    href={href}
                    className="flex items-center group hover:underline"
                    data-astro-prefetch
                >
                    <h2 className="text-xl jetbrains-mono-bold group-hover:text-primary">
                        {heading}
                    </h2>
                    <ExternalLink
                        className="ml-2 inline-block shrink-0"
                        size={16}
                    />
                </a>
            </CardHeader>
            <Divider />
            <CardBody>{children}</CardBody>
            <Divider />
            <CardFooter>
                <a
                    href={href}
                    className="text-sm text-primary hover:underline"
                    data-astro-prefetch
                >
                    Read More &rarr;
                </a>
                {updatedAt && (
                    <span className="ml-auto text-sm text-default-500">
                        Updated: {updatedAt.toDateString()}
                    </span>
                )}
            </CardFooter>
        </Card>
    );
};

export default BlogCard;
