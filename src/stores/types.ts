// Shared types for analytics stores
export type TimePeriod =
    | "24-hours"
    | "7-days"
    | "30-days"
    | "3-months"
    | "6-months";

export interface MetricData {
    value: number | null;
    change: number | null; // percentage change
}

export interface ChartDataPoint {
    date: string;
    value: number;
}

export interface TrendMetricData {
    value: number | null;
    change: string | null; // e.g., "+5%", "-2.3ms", "+3 days"
    changeType: "positive" | "neutral" | "negative";
    trendType: "up" | "neutral" | "down";
}
