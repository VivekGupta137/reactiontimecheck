import React from "react";
import { Card, Chip, Tooltip } from "@heroui/react";
import { ArrowUpRight, ArrowDownRight, ArrowRight } from "lucide-react";
import { cn } from "@heroui/react";

type ChangeType = "positive" | "neutral" | "negative";
type TrendType = "up" | "neutral" | "down";
type TrendChipPosition = "top" | "bottom";
type TrendChipVariant =
    | "light"
    | "solid"
    | "flat"
    | "bordered"
    | "faded"
    | "shadow";

interface TrendCardProps {
    title: string;
    value: string | number | null;
    change: string | null;
    changeType: ChangeType;
    trendType: TrendType;
    trendChipPosition?: TrendChipPosition;
    trendChipVariant?: TrendChipVariant;
    description?: string;
}

const getTrendIcon = (trendType: TrendType) => {
    switch (trendType) {
        case "up":
            return <ArrowUpRight size={12} />;
        case "down":
            return <ArrowDownRight size={12} />;
        default:
            return <ArrowRight size={12} />;
    }
};

const getChipColor = (changeType: ChangeType) => {
    switch (changeType) {
        case "positive":
            return "success";
        case "negative":
            return "danger";
        default:
            return "warning";
    }
};

const TrendCard: React.FC<TrendCardProps> = ({
    title,
    value,
    change,
    changeType,
    trendType,
    trendChipPosition = "top",
    trendChipVariant = "light",
    description,
}) => {
    const hasData = value !== null;
    const hasChange = change !== null;

    return (
        <Card className="dark:border-default-100 border border-transparent">
            <div className="flex p-4">
                <div className="flex flex-col gap-y-2">
                    <dt className="text-small text-default-500 font-medium flex items-center gap-1">
                        {description ? (
                            <Tooltip
                                content={description}
                                placement="top"
                            >
                                <span className="cursor-help border-b border-dashed border-default-400">
                                    {title}
                                </span>
                            </Tooltip>
                        ) : (
                            title
                        )}
                    </dt>
                    {hasData ? (
                        <>
                            <dd className="text-default-700 text-2xl font-semibold">
                                {value}
                            </dd>
                            {hasChange && (
                                <Chip
                                    className={cn("absolute right-4", {
                                        "top-4": trendChipPosition === "top",
                                        "bottom-4":
                                            trendChipPosition === "bottom",
                                    })}
                                    classNames={{
                                        content: "font-medium text-[0.65rem]",
                                    }}
                                    color={getChipColor(changeType)}
                                    radius="sm"
                                    size="sm"
                                    startContent={getTrendIcon(trendType)}
                                    variant={trendChipVariant}
                                >
                                    {change}
                                </Chip>
                            )}
                        </>
                    ) : (
                        <dd className="text-default-400 text-lg font-medium">
                            No data
                        </dd>
                    )}
                </div>
            </div>
        </Card>
    );
};

export default TrendCard;
