import React from "react";
import AnalyticsMetricCard from "./AnalyticsMetricCard";
import type { AnalyticsData } from "@/stores/reaction-analytics";
import { METRICS, type MetricKey } from "./constants";

interface AnalyticsMetricsProps {
    data: AnalyticsData;
    activeMetric?: string;
    onMetricClick?: (metric: string) => void;
}

const AnalyticsMetrics: React.FC<AnalyticsMetricsProps> = ({
    data,
    activeMetric,
    onMetricClick,
}) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 w-full gap-4">
            {Object.entries(METRICS).map(([key, config]) => (
                <AnalyticsMetricCard
                    key={key}
                    title={config.title}
                    data={data[key as MetricKey]}
                    isActive={activeMetric === key}
                    formatValue={config.format}
                    onClick={() => onMetricClick?.(key)}
                    description={config.description}
                />
            ))}
        </div>
    );
};

export default AnalyticsMetrics;
