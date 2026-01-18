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
        format: (value: number) => `${value}ms`,
    },
    bestTime: {
        title: "Best Time",
        format: (value: number) => `${value}ms`,
    },
    totalAttempts: {
        title: "Total Attempts",
        format: (value: number) => {
            if (value >= 1000) return `${(value / 1000).toFixed(1)}k`;
            return value.toLocaleString();
        },
    },
    successRate: {
        title: "Success Rate",
        format: (value: number) => `${value.toFixed(1)}%`,
    },
} as const;

export type MetricKey = keyof typeof METRICS;

// Additional KPI metrics using TrendCard
export const TREND_METRICS = {
    // Performance Metrics
    consistencyScore: {
        title: "Consistency Score",
        format: (value: number) => `${value.toFixed(1)}%`,
        description:
            "Standard deviation - lower variance means more consistent",
    },
    medianTime: {
        title: "Median Reaction Time",
        format: (value: number) => `${value}ms`,
        description: "Better than average for skewed data",
    },
    falseStartRate: {
        title: "False Start Rate",
        format: (value: number) => `${value.toFixed(1)}%`,
        description: "Percentage of premature clicks",
    },

    // Progress Tracking
    personalRecord: {
        title: "Personal Record",
        format: (value: number) => `${value}ms`,
        description: "All-time best reaction time",
    },
    longestWinStreak: {
        title: "Longest Win Streak",
        format: (value: number) => `${value}`,
        description: "Consecutive attempts under target",
    },
    practiceStreak: {
        title: "Practice Streak",
        format: (value: number) => `${value} days`,
        description: "Consecutive days of practice",
    },

    // Comparative Metrics
    percentileRank: {
        title: "Percentile Ranking",
        format: (value: number) => `Top ${value}%`,
        description: "Where you stand among users",
    },

    // Training Insights
    totalPracticeTime: {
        title: "Total Practice Time",
        format: (value: number) => {
            const hours = Math.floor(value / 60);
            const minutes = Math.round(value % 60);
            if (hours > 0) return `${hours}h ${minutes}m`;
            return `${minutes}m`;
        },
        description: "Cumulative time spent training",
    },
} as const;

export type TrendMetricKey = keyof typeof TREND_METRICS;
