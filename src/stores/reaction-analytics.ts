import { computed } from "nanostores";
import { $selectedPeriod } from "@/stores/analytics-period";
import type { TimePeriod, MetricData, TrendMetricData } from "@/stores/types";
import {
    $averageTime,
    $bestTime,
    $totalAttempts,
    $successRate,
    $consistencyScore,
    $medianTime,
    $personalRecord,
    $longestWinStreak,
    $practiceStreak,
    $percentileRank,
    $totalPracticeTime,
} from "@/stores/metric-calculators";
import { $hasTestResults } from "@/stores/reaction-test-results";

// Re-export types for convenience
export type { TimePeriod, MetricData, TrendMetricData };

// Re-export $selectedPeriod for convenience
export { $selectedPeriod } from "@/stores/analytics-period";

/**
 * Analytics data structure containing all metrics
 */
export interface AnalyticsData {
    averageTime: MetricData;
    bestTime: MetricData;
    totalAttempts: MetricData;
    successRate: MetricData;
    trendMetrics: {
        consistencyScore: TrendMetricData;
        medianTime: TrendMetricData;
        personalRecord: TrendMetricData;
        longestWinStreak: TrendMetricData;
        practiceStreak: TrendMetricData;
        percentileRank: TrendMetricData;
        totalPracticeTime: TrendMetricData;
    };
}

/**
 * Computed store that recalculates data when period or test results change
 * Lazy evaluation ensures data is only generated when needed
 */
export const $currentPeriodData = computed(
    [$selectedPeriod, $hasTestResults],
    (period, hasData) => {
        if (!hasData) {
            // Return empty state when no data exists
            return {
                averageTime: { value: null, change: null },
                bestTime: { value: null, change: null },
                totalAttempts: { value: null, change: null },
                successRate: { value: null, change: null },
                trendMetrics: {
                    consistencyScore: {
                        value: null,
                        change: null,
                        changeType: "neutral" as const,
                        trendType: "neutral" as const,
                    },
                    medianTime: {
                        value: null,
                        change: null,
                        changeType: "neutral" as const,
                        trendType: "neutral" as const,
                    },
                    personalRecord: {
                        value: null,
                        change: null,
                        changeType: "neutral" as const,
                        trendType: "neutral" as const,
                    },
                    longestWinStreak: {
                        value: null,
                        change: null,
                        changeType: "neutral" as const,
                        trendType: "neutral" as const,
                    },
                    practiceStreak: {
                        value: null,
                        change: null,
                        changeType: "neutral" as const,
                        trendType: "neutral" as const,
                    },
                    percentileRank: {
                        value: null,
                        change: null,
                        changeType: "neutral" as const,
                        trendType: "neutral" as const,
                    },
                    totalPracticeTime: {
                        value: null,
                        change: null,
                        changeType: "neutral" as const,
                        trendType: "neutral" as const,
                    },
                },
            } as AnalyticsData;
        }

        // Use computed stores to get reactive data
        return {
            averageTime: $averageTime.get(),
            bestTime: $bestTime.get(),
            totalAttempts: $totalAttempts.get(),
            successRate: $successRate.get(),
            trendMetrics: {
                consistencyScore: $consistencyScore.get(),
                medianTime: $medianTime.get(),
                personalRecord: $personalRecord.get(),
                longestWinStreak: $longestWinStreak.get(),
                practiceStreak: $practiceStreak.get(),
                percentileRank: $percentileRank.get(),
                totalPracticeTime: $totalPracticeTime.get(),
            },
        } as AnalyticsData;
    },
);
