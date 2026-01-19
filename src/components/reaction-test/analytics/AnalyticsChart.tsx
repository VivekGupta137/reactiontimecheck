import React from "react";
import {
    AreaChart,
    Area,
    XAxis,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
} from "recharts";
import type { ChartDataPoint } from "@/stores/types";

interface AnalyticsChartProps {
    data: ChartDataPoint[];
    metricType?: "time" | "attempts" | "percentage";
}

const CustomTooltip = ({ active, payload, metricType }: any) => {
    if (active && payload && payload.length) {
        const value = payload[0].value;
        let formattedValue: string;

        // Format based on metric type
        switch (metricType) {
            case "percentage":
                formattedValue = `${value}%`;
                break;
            case "attempts":
                formattedValue = value.toLocaleString();
                break;
            case "time":
            default:
                formattedValue = `${value}ms`;
                break;
        }

        return (
            <div className="rounded-medium bg-foreground text-tiny shadow-small flex h-auto min-w-30 items-center gap-x-2 p-2">
                <div className="flex w-full flex-col gap-y-0">
                    <span className="text-small text-foreground-400 font-medium">
                        {payload[0].payload.date}
                    </span>
                    <span className="text-small text-background font-medium">
                        {formattedValue}
                    </span>
                </div>
            </div>
        );
    }
    return null;
};

const AnalyticsChart: React.FC<AnalyticsChartProps> = ({
    data,
    metricType = "time",
}) => {
    if (!data || data.length === 0) {
        return (
            <div
                className="flex items-center justify-center min-h-75 bg-default-50 rounded-medium mx-4"
                style={{ height: 300 }}
            >
                <div className="text-center">
                    <p className="text-default-400 text-lg font-medium">
                        No data available
                    </p>
                    <p className="text-default-300 text-sm mt-2">
                        Complete some reaction tests to see your analytics
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div
            className="recharts-responsive-container min-h-75"
            style={{ width: "100%", height: "100%" }}
        >
            <ResponsiveContainer
                width="100%"
                height={300}
            >
                <AreaChart
                    data={data}
                    margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
                >
                    <defs>
                        <linearGradient
                            id="colorGradient"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                        >
                            <stop
                                offset="10%"
                                stopColor="hsl(var(--heroui-success-500))"
                                stopOpacity={0.3}
                            />
                            <stop
                                offset="100%"
                                stopColor="hsl(var(--heroui-success-100))"
                                stopOpacity={0.1}
                            />
                        </linearGradient>
                    </defs>
                    <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="hsl(var(--heroui-default-200))"
                        vertical={false}
                    />
                    <XAxis
                        dataKey="date"
                        axisLine={false}
                        tickLine={false}
                        tick={{
                            fill: "#666",
                            fontSize: 12,
                        }}
                        angle={-30}
                        textAnchor="end"
                        height={60}
                    />
                    <Tooltip
                        content={<CustomTooltip metricType={metricType} />}
                    />
                    <Area
                        type="monotone"
                        dataKey="value"
                        stroke="hsl(var(--heroui-success))"
                        strokeWidth={2}
                        fill="url(#colorGradient)"
                        fillOpacity={0.6}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

export default AnalyticsChart;
