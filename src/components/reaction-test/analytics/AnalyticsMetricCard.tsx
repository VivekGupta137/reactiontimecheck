import React from "react";
import { Card, CardBody, Chip } from "@heroui/react";
import { TrendingUp, TrendingDown, ArrowRight } from "lucide-react";
import type { MetricData } from "@/stores/reaction-analytics";

interface AnalyticsMetricCardProps {
    title: string;
    data: MetricData;
    isActive?: boolean;
    formatValue?: (value: number) => string;
    onClick?: () => void;
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
    formatValue = (val) => val.toLocaleString(),
    onClick,
}) => {
    return (
        <Card
            isPressable
            onPress={onClick}
            className={`transition-colors ${isActive ? "bg-default-100" : ""}`}
        >
            <CardBody className="flex flex-col gap-2 p-3">
                <span
                    className={`text-small font-medium transition-colors ${
                        isActive ? "text-primary" : "text-default-500"
                    }`}
                >
                    {title}
                </span>
                <div className="flex items-center gap-x-3">
                    <span className="text-foreground text-3xl font-bold">
                        {formatValue(data.value)}
                    </span>
                    <Chip
                        color={getTrendColor(data.change)}
                        variant="flat"
                        size="sm"
                        startContent={getTrendIcon(data.change)}
                        classNames={{
                            base: "h-6",
                            content: "px-1 pl-0.5 font-medium text-tiny",
                        }}
                    >
                        {Math.abs(data.change).toFixed(1)}%
                    </Chip>
                </div>
            </CardBody>
        </Card>
    );
};

export default AnalyticsMetricCard;
