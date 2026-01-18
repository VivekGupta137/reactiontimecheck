import type {
    TimePeriod,
    MetricData,
    ChartDataPoint,
    TrendMetricData,
} from "@/stores/types";

// Helper to get date labels based on period
export const getDateLabel = (period: TimePeriod, index: number): string => {
    const now = new Date();

    if (period === "24-hours") {
        const hour = now.getHours() - (23 - index);
        return `${hour < 0 ? hour + 24 : hour}:00`;
    }

    if (period === "7-days") {
        const date = new Date(now);
        date.setDate(date.getDate() - (6 - index));
        return date.toLocaleDateString("en-US", { weekday: "short" });
    }

    if (period === "30-days") {
        const date = new Date(now);
        date.setDate(date.getDate() - (29 - index));
        const day = date.getDate();
        const month = date.toLocaleDateString("en-US", { month: "short" });
        return `${day} ${month}`;
    }

    if (period === "3-months") {
        const date = new Date(now);
        date.setMonth(date.getMonth() - (2 - index));
        return date.toLocaleDateString("en-US", { month: "short" });
    }

    if (period === "6-months") {
        const date = new Date(now);
        date.setMonth(date.getMonth() - (5 - index));
        return date.toLocaleDateString("en-US", { month: "short" });
    }

    return "";
};

// Helper to get data points count based on period
export const getDataPointsCount = (period: TimePeriod): number => {
    switch (period) {
        case "24-hours":
            return 24;
        case "7-days":
            return 7;
        case "30-days":
            return 30;
        case "3-months":
            return 3;
        case "6-months":
            return 6;
    }
};

// Helper to get period multiplier for improvement over time
export const getPeriodMultiplier = (period: TimePeriod): number => {
    switch (period) {
        case "24-hours":
            return 1;
        case "7-days":
            return 0.98;
        case "30-days":
            return 0.95;
        case "3-months":
            return 0.92;
        case "6-months":
            return 0.88;
    }
};

// ===== CHART DATA CALCULATORS =====

export const calculateAverageTimeChart = (
    period: TimePeriod,
): ChartDataPoint[] => {
    const dataPoints = getDataPointsCount(period);
    return Array.from({ length: dataPoints }, (_, i) => {
        const baseTime = 280;
        const improvement = (i / dataPoints) * 40;
        const variance = ((i * 7 + 13) % 20) - 10;
        return {
            date: getDateLabel(period, i),
            value: Math.round(baseTime - improvement + variance),
        };
    });
};

export const calculateBestTimeChart = (
    period: TimePeriod,
): ChartDataPoint[] => {
    const dataPoints = getDataPointsCount(period);
    return Array.from({ length: dataPoints }, (_, i) => {
        const baseTime = 210;
        const improvement = (i / dataPoints) * 30;
        const variance = ((i * 11 + 7) % 15) - 7;
        return {
            date: getDateLabel(period, i),
            value: Math.round(baseTime - improvement + variance),
        };
    });
};

export const calculateTotalAttemptsChart = (
    period: TimePeriod,
): ChartDataPoint[] => {
    const dataPoints = getDataPointsCount(period);
    const baseAttempts = {
        "24-hours": 1,
        "7-days": 20,
        "30-days": 20,
        "3-months": 150,
        "6-months": 300,
    }[period];

    return Array.from({ length: dataPoints }, (_, i) => {
        const growth = (i / dataPoints) * baseAttempts * 0.5;
        const variance = (i * 13 + 5) % Math.floor(baseAttempts * 0.2);
        return {
            date: getDateLabel(period, i),
            value: Math.round(baseAttempts + growth + variance),
        };
    });
};

export const calculateSuccessRateChart = (
    period: TimePeriod,
): ChartDataPoint[] => {
    const dataPoints = getDataPointsCount(period);
    return Array.from({ length: dataPoints }, (_, i) => {
        const baseRate = 82;
        const improvement = (i / dataPoints) * 10;
        const variance = ((i * 17 + 3) % 30) / 10 - 1.5;
        return {
            date: getDateLabel(period, i),
            value: Math.round((baseRate + improvement + variance) * 10) / 10,
        };
    });
};

// ===== METRIC DATA CALCULATORS =====

export const calculateAverageTime = (period: TimePeriod): MetricData => {
    const multiplier = getPeriodMultiplier(period);
    return {
        value: Math.round(280 * multiplier),
        change:
            period === "24-hours"
                ? -1.2
                : -Math.abs(((multiplier * 100) % 5) + 2),
    };
};

export const calculateBestTime = (period: TimePeriod): MetricData => {
    const multiplier = getPeriodMultiplier(period);
    return {
        value: Math.round(210 * multiplier),
        change: -Math.abs(((multiplier * 200) % 8) + 3),
    };
};

export const calculateTotalAttempts = (period: TimePeriod): MetricData => {
    const multiplier = getPeriodMultiplier(period);
    const value = {
        "24-hours": 24,
        "7-days": 156,
        "30-days": 680,
        "3-months": 2100,
        "6-months": 4500,
    }[period];

    return {
        value,
        change: ((multiplier * 300) % 20) + 5,
    };
};

export const calculateSuccessRate = (period: TimePeriod): MetricData => {
    const multiplier = getPeriodMultiplier(period);
    return {
        value: 85 + ((multiplier * 400) % 10),
        change: ((multiplier * 500) % 3) + 1,
    };
};

// ===== TREND METRIC CALCULATORS =====

export const calculateConsistencyScore = (
    period: TimePeriod,
): TrendMetricData => {
    const multiplier = getPeriodMultiplier(period);
    const value = 85 + ((multiplier * 400) % 12);
    return {
        value,
        change: `+${(((multiplier * 100) % 5) + 1).toFixed(1)}%`,
        changeType: "positive",
        trendType: "up",
    };
};

export const calculateMedianTime = (period: TimePeriod): TrendMetricData => {
    const multiplier = getPeriodMultiplier(period);
    const value = Math.round(275 * multiplier);
    return {
        value,
        change: `-${Math.round(((multiplier * 50) % 10) + 2)}ms`,
        changeType: "positive",
        trendType: "down",
    };
};

export const calculateFalseStartRate = (
    period: TimePeriod,
): TrendMetricData => {
    const multiplier = getPeriodMultiplier(period);
    const value = 3.5 - multiplier * 1.5;
    return {
        value,
        change: `-${(((multiplier * 100) % 0.8) + 0.2).toFixed(1)}%`,
        changeType: "positive",
        trendType: "down",
    };
};

export const calculatePersonalRecord = (
    period: TimePeriod,
): TrendMetricData => {
    const multiplier = getPeriodMultiplier(period);
    const value = Math.round(180 * multiplier);
    return {
        value,
        change: `-${Math.round(((multiplier * 30) % 8) + 3)}ms`,
        changeType: "positive",
        trendType: "down",
    };
};

export const calculateLongestWinStreak = (
    period: TimePeriod,
): TrendMetricData => {
    const multiplier = getPeriodMultiplier(period);
    const value = Math.round(15 + ((multiplier * 100) % 20));
    return {
        value,
        change: `+${Math.round(((multiplier * 50) % 5) + 1)}`,
        changeType: "positive",
        trendType: "up",
    };
};

export const calculatePracticeStreak = (
    period: TimePeriod,
): TrendMetricData => {
    const multiplier = getPeriodMultiplier(period);
    const value = {
        "24-hours": 1,
        "7-days": 7,
        "30-days": 28,
        "3-months": 75,
        "6-months": 145,
    }[period];

    return {
        value,
        change:
            period === "24-hours"
                ? "New!"
                : `+${Math.round(((multiplier * 20) % 3) + 1)} days`,
        changeType: "positive",
        trendType: "up",
    };
};

export const calculatePercentileRank = (
    period: TimePeriod,
): TrendMetricData => {
    const multiplier = getPeriodMultiplier(period);
    const value = 15 - ((multiplier * 100) % 10);
    return {
        value,
        change: `-${Math.round(((multiplier * 30) % 3) + 1)}%`,
        changeType: "positive",
        trendType: "down",
    };
};

export const calculateTotalPracticeTime = (
    period: TimePeriod,
): TrendMetricData => {
    const multiplier = getPeriodMultiplier(period);
    const value = {
        "24-hours": 45,
        "7-days": 180,
        "30-days": 520,
        "3-months": 1850,
        "6-months": 4200,
    }[period];

    return {
        value,
        change: `+${Math.round(((multiplier * 100) % 30) + 15)}m`,
        changeType: "positive",
        trendType: "up",
    };
};
