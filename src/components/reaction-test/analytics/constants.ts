import type { TimePeriod } from "@/stores/types";

export const TIME_PERIODS: Array<{ key: TimePeriod; label: string }> = [
    { key: "6-months", label: "6 Months" },
    { key: "3-months", label: "3 Months" },
    { key: "30-days", label: "30 Days" },
    { key: "7-days", label: "7 Days" },
    { key: "24-hours", label: "24 Hours" },
];

export const METRICS = {
    averageTime: {
        title: "Average Time",
        format: (value: number | null) =>
            value !== null ? `${value}ms` : null,
        description: "Your mean reaction time across all successful attempts",
    },
    bestTime: {
        title: "Best Time",
        format: (value: number | null) =>
            value !== null ? `${value}ms` : null,
        description: "Your fastest reaction time in this period",
    },
    totalAttempts: {
        title: "Total Attempts",
        format: (value: number | null) => {
            if (value === null) return null;
            if (value >= 1000) return `${(value / 1000).toFixed(1)}k`;
            return value.toLocaleString();
        },
        description: "Total number of reaction tests taken",
    },
    successRate: {
        title: "Accuracy",
        format: (value: number | null) =>
            value !== null ? `${value.toFixed(1)}%` : null,
        description: "Percentage of successful attempts (excluding misses)",
    },
} as const;

export type MetricKey = keyof typeof METRICS;

// Additional KPI metrics using TrendCard
export const TREND_METRICS = {
    // Performance Metrics
    consistencyScore: {
        title: "Consistency Score",
        format: (value: number | null) =>
            value !== null ? `${value.toFixed(1)}%` : null,
        description:
            "Measures timing consistency - higher score means less variation in reaction times",
    },
    medianTime: {
        title: "Median Reaction Time",
        format: (value: number | null) =>
            value !== null ? `${value}ms` : null,
        description: "Better than average for skewed data",
    },

    // Progress Tracking
    personalRecord: {
        title: "Personal Record",
        format: (value: number | null) =>
            value !== null ? `${value}ms` : null,
        description: "All-time best reaction time",
    },
    longestWinStreak: {
        title: "Longest Win Streak",
        format: (value: number | null) => (value !== null ? `${value}` : null),
        description: "Consecutive attempts under target",
    },
    practiceStreak: {
        title: "Practice Streak",
        format: (value: number | null) =>
            value !== null ? `${value} days` : null,
        description: "Consecutive days of practice",
    },

    // Comparative Metrics
    percentileRank: {
        title: "Percentile Ranking",
        format: (value: number | null) =>
            value !== null ? `Top ${value}%` : null,
        description: "Where you stand among users",
    },

    // Training Insights
    totalPracticeTime: {
        title: "Total Practice Time",
        format: (value: number | null) => {
            if (value === null) return null;
            const hours = Math.floor(value / 60);
            const minutes = Math.round(value % 60);
            if (hours > 0) return `${hours}h ${minutes}m`;
            return `${minutes}m`;
        },
        description: "Cumulative time spent training",
    },
} as const;

export type TrendMetricKey = keyof typeof TREND_METRICS;
