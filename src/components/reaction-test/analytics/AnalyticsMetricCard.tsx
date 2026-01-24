import React from "react";
import { Card, CardBody, Chip, Tooltip } from "@heroui/react";
import { TrendingUp, TrendingDown, ArrowRight } from "lucide-react";
import type { MetricData } from "@/stores/reaction-analytics";

interface AnalyticsMetricCardProps {
    title: string;
    data: MetricData;
    isActive?: boolean;
    formatValue?: (value: number | null) => string | null;
    onClick?: () => void;
    description?: string;
}

const getTrendIcon = (change: number) => {
    if (change === 0) return <ArrowRight size={16} />;
    return change > 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />;
};

const getTrendColor = (change: number) => {
    if (change === 0) return "default";
    return change > 0 ? "success" : "danger";
};

const AnalyticsMetricCard: React.FC<AnalyticsMetricCardProps> = ({
    title,
    data,
    isActive = false,
    formatValue = (val) => (val !== null ? val.toLocaleString() : null),
    onClick,
    description,
}) => {
    const hasData = data.value !== null && data.change !== null;
    const formattedValue = hasData ? formatValue(data.value) : null;

    return (
        <Card
            isPressable={hasData}
            onPress={hasData ? onClick : undefined}
            className={`transition-all duration-200 ${isActive ? "bg-primary-50 border-2 border-primary shadow-md" : "hover:shadow-md hover:border-default-300"}`}
        >
            <CardBody className="flex flex-col gap-3 p-4">
                {description ? (
                    <Tooltip
                        content={description}
                        placement="top"
                    >
                        <span
                            className={`text-small font-medium transition-colors cursor-help border-b border-dashed border-default-400 w-fit ${
                                isActive ? "text-primary" : "text-default-500"
                            }`}
                        >
                            {title}
                        </span>
                    </Tooltip>
                ) : (
                    <span
                        className={`text-small font-medium transition-colors ${
                            isActive ? "text-primary" : "text-default-500"
                        }`}
                    >
                        {title}
                    </span>
                )}
                {hasData && formattedValue ? (
                    <div className="flex items-baseline gap-x-2">
                        <span className="text-foreground text-2xl font-bold">
                            {formattedValue}
                        </span>
                        <Chip
                            color={getTrendColor(data.change!)}
                            variant="flat"
                            size="sm"
                            startContent={getTrendIcon(data.change!)}
                            classNames={{
                                base: "h-5",
                                content: "px-1 pl-0.5 font-semibold text-tiny",
                            }}
                        >
                            {Math.abs(data.change!).toFixed(1)}%
                        </Chip>
                    </div>
                ) : (
                    <div className="flex items-center gap-x-2">
                        <span className="text-default-400 text-lg font-medium">
                            No data
                        </span>
                    </div>
                )}
            </CardBody>
        </Card>
    );
};

export default AnalyticsMetricCard;
