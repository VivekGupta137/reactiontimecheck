import { atom, computed } from "nanostores";
import { persistentAtom } from "@nanostores/persistent";
import type {
    TimePeriod,
    MetricData,
    ChartDataPoint,
    TrendMetricData,
} from "@/stores/types";
import {
    calculateAverageTime,
    calculateAverageTimeChart,
    calculateBestTime,
    calculateBestTimeChart,
    calculateConsistencyScore,
    calculateFalseStartRate,
    calculateLongestWinStreak,
    calculateMedianTime,
    calculatePercentileRank,
    calculatePersonalRecord,
    calculatePracticeStreak,
    calculateSuccessRate,
    calculateSuccessRateChart,
    calculateTotalAttempts,
    calculateTotalAttemptsChart,
    calculateTotalPracticeTime,
} from "@/stores/metric-calculators";

// Re-export types for convenience
export type { TimePeriod, MetricData, ChartDataPoint, TrendMetricData };

export interface AnalyticsData {
    averageTime: MetricData;
    bestTime: MetricData;
    totalAttempts: MetricData;
    successRate: MetricData;
    chartData: {
        averageTime: ChartDataPoint[];
        bestTime: ChartDataPoint[];
        totalAttempts: ChartDataPoint[];
        successRate: ChartDataPoint[];
    };
    trendMetrics: {
        consistencyScore: TrendMetricData;
        medianTime: TrendMetricData;
        falseStartRate: TrendMetricData;
        personalRecord: TrendMetricData;
        longestWinStreak: TrendMetricData;
        practiceStreak: TrendMetricData;
        percentileRank: TrendMetricData;
        totalPracticeTime: TrendMetricData;
    };
}

// Atomic store for selected period
export const $selectedPeriod = persistentAtom<TimePeriod>(
    "analytics-period",
    "6-months",
);

// Generate analytics data for a specific period
const generatePeriodData = (period: TimePeriod): AnalyticsData => {
    return {
        // Primary metrics
        averageTime: calculateAverageTime(period),
        bestTime: calculateBestTime(period),
        totalAttempts: calculateTotalAttempts(period),
        successRate: calculateSuccessRate(period),

        // Chart data
        chartData: {
            averageTime: calculateAverageTimeChart(period),
            bestTime: calculateBestTimeChart(period),
            totalAttempts: calculateTotalAttemptsChart(period),
            successRate: calculateSuccessRateChart(period),
        },

        // Trend metrics
        trendMetrics: {
            consistencyScore: calculateConsistencyScore(period),
            medianTime: calculateMedianTime(period),
            falseStartRate: calculateFalseStartRate(period),
            personalRecord: calculatePersonalRecord(period),
            longestWinStreak: calculateLongestWinStreak(period),
            practiceStreak: calculatePracticeStreak(period),
            percentileRank: calculatePercentileRank(period),
            totalPracticeTime: calculateTotalPracticeTime(period),
        },
    };
};

// Computed store for current period data - recalculates only when period changes
export const $currentPeriodData = computed($selectedPeriod, (period) => {
    return generatePeriodData(period);
});

// Computed stores for individual metrics - lazy evaluation
export const $averageTime = computed(
    $currentPeriodData,
    (data) => data.averageTime,
);
export const $bestTime = computed($currentPeriodData, (data) => data.bestTime);
export const $totalAttempts = computed(
    $currentPeriodData,
    (data) => data.totalAttempts,
);
export const $successRate = computed(
    $currentPeriodData,
    (data) => data.successRate,
);

// Computed stores for chart data
export const $averageTimeChart = computed(
    $currentPeriodData,
    (data) => data.chartData.averageTime,
);
export const $bestTimeChart = computed(
    $currentPeriodData,
    (data) => data.chartData.bestTime,
);
export const $totalAttemptsChart = computed(
    $currentPeriodData,
    (data) => data.chartData.totalAttempts,
);
export const $successRateChart = computed(
    $currentPeriodData,
    (data) => data.chartData.successRate,
);

// Computed stores for trend metrics
export const $consistencyScore = computed(
    $currentPeriodData,
    (data) => data.trendMetrics.consistencyScore,
);
export const $medianTime = computed(
    $currentPeriodData,
    (data) => data.trendMetrics.medianTime,
);
export const $falseStartRate = computed(
    $currentPeriodData,
    (data) => data.trendMetrics.falseStartRate,
);
export const $personalRecord = computed(
    $currentPeriodData,
    (data) => data.trendMetrics.personalRecord,
);
export const $longestWinStreak = computed(
    $currentPeriodData,
    (data) => data.trendMetrics.longestWinStreak,
);
export const $practiceStreak = computed(
    $currentPeriodData,
    (data) => data.trendMetrics.practiceStreak,
);
export const $percentileRank = computed(
    $currentPeriodData,
    (data) => data.trendMetrics.percentileRank,
);
export const $totalPracticeTime = computed(
    $currentPeriodData,
    (data) => data.trendMetrics.totalPracticeTime,
);

// Helper action to reset analytics (regenerates data)
export const resetAnalyticsData = () => {
    // Simply reset the period to trigger recalculation
    const current = $selectedPeriod.get();
    $selectedPeriod.set("6-months");
    if (current === "6-months") {
        // Force update if already at default
        $selectedPeriod.set("24-hours");
        $selectedPeriod.set("6-months");
    }
};
