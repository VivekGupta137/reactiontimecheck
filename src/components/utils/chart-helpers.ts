import type { TimePeriod, ChartDataPoint } from "@/stores/types";
import type { ReactionTestResult } from "@/stores/reaction-test-results";

/**
 * Get number of data points to display for each period
 */
export const getDataPointsCount = (period: TimePeriod): number => {
    const counts: Record<TimePeriod, number> = {
        "24-hours": 24,
        "7-days": 7,
        "30-days": 30,
        "3-months": 3,
        "6-months": 6,
    };
    return counts[period];
};

/**
 * Get period duration in milliseconds
 */
export const getPeriodMs = (period: TimePeriod): number => {
    const periods: Record<TimePeriod, number> = {
        "24-hours": 24 * 60 * 60 * 1000,
        "7-days": 7 * 24 * 60 * 60 * 1000,
        "30-days": 30 * 24 * 60 * 60 * 1000,
        "3-months": 90 * 24 * 60 * 60 * 1000,
        "6-months": 180 * 24 * 60 * 60 * 1000,
    };
    return periods[period];
};

/**
 * Generate date labels for chart X-axis based on period
 * Uses deterministic approach to avoid SSR hydration issues
 */
export const getDateLabel = (period: TimePeriod, index: number): string => {
    const now = new Date();
    const date = new Date(now);

    switch (period) {
        case "24-hours":
            // Show last 24 hours by hour
            const hour = (now.getHours() - (23 - index) + 24) % 24;
            return `${hour}:00`;

        case "7-days":
            // Show last 7 days by weekday name
            date.setDate(date.getDate() - (6 - index));
            return date.toLocaleDateString("en-US", { weekday: "short" });

        case "30-days":
            // Show last 30 days as "Day Mon" format
            date.setDate(date.getDate() - (29 - index));
            const day = date.getDate();
            const month = date.toLocaleDateString("en-US", { month: "short" });
            return `${day} ${month}`;

        case "3-months":
            // Show last 3 months by month name
            date.setMonth(date.getMonth() - (2 - index));
            return date.toLocaleDateString("en-US", { month: "short" });

        case "6-months":
            // Show last 6 months by month name
            date.setMonth(date.getMonth() - (5 - index));
            return date.toLocaleDateString("en-US", { month: "short" });

        default:
            return "";
    }
};

/**
 * Helper function to generate chart buckets
 * Groups test results into time buckets and applies a calculation function to each bucket
 */
export const generateChartBuckets = (
    period: TimePeriod,
    results: ReactionTestResult[],
    bucketCalculator: (
        sessions: ReactionTestResult[],
        period: TimePeriod,
        index: number,
    ) => number,
): ChartDataPoint[] => {
    if (results.length === 0) return [];

    const dataPoints = getDataPointsCount(period);
    const now = Date.now();
    const periodMs = getPeriodMs(period);
    const bucketSize = periodMs / dataPoints;
    const buckets: ChartDataPoint[] = [];

    for (let i = 0; i < dataPoints; i++) {
        const bucketEnd = now - periodMs + (i + 1) * bucketSize;
        const bucketStart = bucketEnd - bucketSize;

        const bucketSessions = results.filter(
            (r) => r.timestamp >= bucketStart && r.timestamp < bucketEnd,
        );

        buckets.push({
            date: getDateLabel(period, i),
            value: bucketCalculator(bucketSessions, period, i),
        });
    }

    return buckets;
};

// ===== CHART BUCKET CALCULATORS =====
// These functions can be used with generateChartBuckets to create different chart types

/**
 * Calculate average reaction time for a bucket of sessions
 */
export const calculateAverageTimeBucket = (
    bucketSessions: ReactionTestResult[],
): number => {
    if (bucketSessions.length === 0) return 0;

    let totalTime = 0;
    let totalSuccessful = 0;

    bucketSessions.forEach((session) => {
        const successfulAttempts = session.totalAttempts - session.missCount;
        if (successfulAttempts > 0) {
            totalTime += session.avgReactionTime * successfulAttempts;
            totalSuccessful += successfulAttempts;
        }
    });

    return totalSuccessful > 0 ? Math.round(totalTime / totalSuccessful) : 0;
};

/**
 * Calculate best reaction time for a bucket of sessions
 */
export const calculateBestTimeBucket = (
    bucketSessions: ReactionTestResult[],
): number => {
    if (bucketSessions.length === 0) return 0;
    return Math.min(...bucketSessions.map((s) => s.bestReactionTime));
};

/**
 * Calculate total attempts for a bucket of sessions
 */
export const calculateTotalAttemptsBucket = (
    bucketSessions: ReactionTestResult[],
): number => {
    return bucketSessions.reduce((sum, s) => sum + s.totalAttempts, 0);
};

/**
 * Calculate success rate for a bucket of sessions
 */
export const calculateSuccessRateBucket = (
    bucketSessions: ReactionTestResult[],
): number => {
    if (bucketSessions.length === 0) return 0;

    let totalAttempts = 0;
    let totalSuccessful = 0;

    bucketSessions.forEach((session) => {
        totalAttempts += session.totalAttempts;
        totalSuccessful += session.totalAttempts - session.missCount;
    });

    return totalAttempts > 0
        ? Math.round((totalSuccessful / totalAttempts) * 100 * 10) / 10
        : 0;
};
