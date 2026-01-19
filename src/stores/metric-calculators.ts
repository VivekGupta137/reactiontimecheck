import { computed } from "nanostores";
import type {
    TimePeriod,
    MetricData,
    TrendMetricData,
    ChartDataPoint,
} from "@/stores/types";
import {
    getResultsForPeriod,
    getTestStatistics,
    $testResults,
} from "@/stores/reaction-test-results";
import { $selectedPeriod } from "@/stores/analytics-period";
import {
    getPeriodMs,
    generateChartBuckets,
    calculateAverageTimeBucket,
    calculateBestTimeBucket,
    calculateTotalAttemptsBucket,
    calculateSuccessRateBucket,
} from "@/components/utils/chart-helpers";

// ===== COMPUTED STORES FOR PERIOD DATA =====

/**
 * Computed store for current period results
 * Automatically updates when $selectedPeriod or $testResults changes
 *
 * Note: This store provides raw data that can be used by components to generate
 * charts using the generateChartBuckets() helper from chart-helpers.ts.
 * This decouples chart generation from stores, allowing multiple chart types
 * to be created from the same data source.
 */
export const $currentPeriodResults = computed(
    [$selectedPeriod, $testResults],
    (period) => getResultsForPeriod(period),
);

/**
 * Computed store for current period statistics
 * Automatically updates when $currentPeriodResults changes
 */
export const $currentPeriodStats = computed($currentPeriodResults, (results) =>
    getTestStatistics(results),
);

/**
 * Computed store for previous period results
 * Used for calculating change percentages
 */
export const $previousPeriodResults = computed(
    [$selectedPeriod, $testResults],
    (period) => {
        const now = Date.now();
        const periodMs = getPeriodMs(period);
        const allResults = getResultsForPeriod(period);
        return allResults.filter(
            (r) =>
                r.timestamp < now - periodMs &&
                r.timestamp >= now - periodMs * 2,
        );
    },
);

/**
 * Computed store for previous period statistics
 * Used for calculating change percentages
 */
export const $previousPeriodStats = computed(
    $previousPeriodResults,
    (results) => getTestStatistics(results),
);

// ===== PRIMARY METRICS =====

/**
 * Computed stores for primary metrics
 * Automatically update when period or test results change
 */
export const $averageTime = computed(
    [$selectedPeriod, $currentPeriodStats, $previousPeriodStats],
    (period, stats, previousStats) => {
        if (!stats) return { value: null, change: null };

        const change = previousStats
            ? ((stats.average - previousStats.average) /
                  previousStats.average) *
              100
            : 0;

        return {
            value: Math.round(stats.average),
            change: Math.round(change * 10) / 10,
        };
    },
);

export const $bestTime = computed(
    [$selectedPeriod, $currentPeriodStats, $previousPeriodStats],
    (period, stats, previousStats) => {
        if (!stats) return { value: null, change: null };

        const change = previousStats
            ? ((stats.best - previousStats.best) / previousStats.best) * 100
            : 0;

        return {
            value: Math.round(stats.best),
            change: Math.round(change * 10) / 10,
        };
    },
);

export const $totalAttempts = computed(
    [$selectedPeriod, $currentPeriodResults, $previousPeriodResults],
    (period, results, previousResults) => {
        if (results.length === 0) return { value: null, change: null };

        const totalAttempts = results.reduce(
            (sum, r) => sum + r.totalAttempts,
            0,
        );
        const previousTotalAttempts = previousResults.reduce(
            (sum, r) => sum + r.totalAttempts,
            0,
        );

        const change =
            previousTotalAttempts > 0
                ? ((totalAttempts - previousTotalAttempts) /
                      previousTotalAttempts) *
                  100
                : 0;

        return {
            value: totalAttempts,
            change: Math.round(change * 10) / 10,
        };
    },
);

export const $successRate = computed(
    [$selectedPeriod, $currentPeriodStats, $previousPeriodStats],
    (period, stats, previousStats) => {
        if (!stats) return { value: null, change: null };

        const change = previousStats
            ? stats.successRate - previousStats.successRate
            : 0;

        return {
            value: Math.round(stats.successRate * 10) / 10,
            change: Math.round(change * 10) / 10,
        };
    },
);

// ===== CHART DATA =====

export const $averageTimeChartData = computed(
    [$selectedPeriod, $currentPeriodResults],
    (period, results) =>
        generateChartBuckets(period, results, calculateAverageTimeBucket),
);

export const $bestTimeChartData = computed(
    [$selectedPeriod, $currentPeriodResults],
    (period, results) =>
        generateChartBuckets(period, results, calculateBestTimeBucket),
);

export const $totalAttemptsChartData = computed(
    [$selectedPeriod, $currentPeriodResults],
    (period, results) =>
        generateChartBuckets(period, results, calculateTotalAttemptsBucket),
);

export const $successRateChartData = computed(
    [$selectedPeriod, $currentPeriodResults],
    (period, results) =>
        generateChartBuckets(period, results, calculateSuccessRateBucket),
);

// ===== TREND METRICS =====

/**
 * Consistency Score: Measures variability in reaction times
 * Lower coefficient of variation = higher consistency score (0-100)
 */
export const $consistencyScore = computed(
    [$selectedPeriod, $currentPeriodResults],
    (period, results) => {
        if (results.length === 0) {
            return {
                value: null,
                change: null,
                changeType: "neutral",
                trendType: "neutral",
            } as const;
        }

        const sessionTimes: number[] = [];
        results.forEach((session) => {
            const successfulAttempts =
                session.totalAttempts - session.missCount;
            if (successfulAttempts > 0) {
                sessionTimes.push(session.avgReactionTime);
            }
        });

        if (sessionTimes.length === 0) {
            return {
                value: null,
                change: null,
                changeType: "neutral",
                trendType: "neutral",
            } as const;
        }

        if (sessionTimes.length === 1) {
            return {
                value: 75.0,
                change: null,
                changeType: "neutral",
                trendType: "neutral",
            } as const;
        }

        const mean =
            sessionTimes.reduce((a, b) => a + b, 0) / sessionTimes.length;
        const variance =
            sessionTimes.reduce(
                (sum, time) => sum + Math.pow(time - mean, 2),
                0,
            ) / sessionTimes.length;
        const stdDev = Math.sqrt(variance);
        const cv = (stdDev / mean) * 100;
        const score = Math.max(0, Math.min(100, 100 * Math.exp(-cv / 20)));

        return {
            value: Math.round(score * 10) / 10,
            change: null,
            changeType: "neutral",
            trendType: "neutral",
        } as const;
    },
);

export const $medianTime = computed(
    [$selectedPeriod, $currentPeriodStats],
    (period, stats) => {
        if (!stats) {
            return {
                value: null,
                change: null,
                changeType: "neutral",
                trendType: "neutral",
            } as const;
        }

        return {
            value: Math.round(stats.median),
            change: null,
            changeType: "neutral",
            trendType: "neutral",
        } as const;
    },
);

export const $personalRecord = computed(
    [$selectedPeriod, $currentPeriodStats],
    (period, stats) => {
        if (!stats) {
            return {
                value: null,
                change: null,
                changeType: "neutral",
                trendType: "neutral",
            } as const;
        }

        return {
            value: stats.best,
            change: null,
            changeType: "neutral",
            trendType: "neutral",
        } as const;
    },
);

export const $longestWinStreak = computed(
    [$selectedPeriod, $currentPeriodResults],
    (period, results) => {
        if (results.length === 0) {
            return {
                value: null,
                change: null,
                changeType: "neutral",
                trendType: "neutral",
            } as const;
        }

        const sortedSessions = [...results].sort(
            (a, b) => a.timestamp - b.timestamp,
        );

        let currentStreak = 0;
        let longestStreak = 0;

        for (const session of sortedSessions) {
            const successfulAttempts =
                session.totalAttempts - session.missCount;

            if (successfulAttempts > 0) {
                currentStreak += successfulAttempts;
                longestStreak = Math.max(longestStreak, currentStreak);
            }

            if (session.missCount > 0) {
                currentStreak = 0;
            }
        }

        return {
            value: longestStreak,
            change: null,
            changeType: "neutral",
            trendType: "neutral",
        } as const;
    },
);

export const $practiceStreak = computed(
    [$selectedPeriod, $currentPeriodResults],
    (period, results) => {
        if (results.length === 0) {
            return {
                value: null,
                change: null,
                changeType: "neutral",
                trendType: "neutral",
            } as const;
        }

        const dayMap = new Map<string, boolean>();
        results.forEach((r) => {
            const day = new Date(r.timestamp).toDateString();
            dayMap.set(day, true);
        });

        let streak = 0;
        const today = new Date();

        for (let i = 0; i < 365; i++) {
            const checkDate = new Date(today);
            checkDate.setDate(today.getDate() - i);
            const dayStr = checkDate.toDateString();

            if (dayMap.has(dayStr)) {
                streak++;
            } else if (i > 0) {
                break;
            }
        }

        return {
            value: streak,
            change: null,
            changeType: "neutral",
            trendType: "neutral",
        } as const;
    },
);

export const $percentileRank = computed(
    [$selectedPeriod, $currentPeriodStats],
    (period, stats) => {
        if (!stats) {
            return {
                value: null,
                change: null,
                changeType: "neutral",
                trendType: "neutral",
            } as const;
        }

        // Calculate percentile based on normal distribution
        // Using average population distribution: mean=270ms, stdDev=50ms
        // (Same distribution as shown in the line chart)
        const mean = 270;
        const stdDev = 50;
        const userTime = stats.average;

        // Calculate z-score: how many standard deviations away from mean
        const zScore = (userTime - mean) / stdDev;

        // Cumulative Distribution Function (CDF) approximation using error function
        // This gives us the percentage of people SLOWER than the user
        const erfApprox = (x: number): number => {
            // Abramowitz and Stegun approximation
            const sign = x >= 0 ? 1 : -1;
            const absX = Math.abs(x);

            const t = 1 / (1 + 0.3275911 * absX);
            const a1 = 0.254829592;
            const a2 = -0.284496736;
            const a3 = 1.421413741;
            const a4 = -1.453152027;
            const a5 = 1.061405429;

            const erf =
                1 -
                ((((a5 * t + a4) * t + a3) * t + a2) * t + a1) *
                    t *
                    Math.exp(-absX * absX);

            return sign * erf;
        };

        // CDF = 0.5 * (1 + erf(z / sqrt(2)))
        const cdf = 0.5 * (1 + erfApprox(zScore / Math.sqrt(2)));

        // CDF gives us the percentage of people FASTER than user (with time ≤ userTime)
        // For "top X%" display: if 72% are faster than you, you're in the "top 72%" (from slowest end)
        // But we want to show it as percentile rank where lower is better
        const percentileFaster = cdf * 100;

        // Since lower reaction time is better:
        // - If 95% are faster than you (bad), show as 95th percentile or "Top 95%"
        // - If 5% are faster than you (good), show as 5th percentile or "Top 5%"
        const percentile = percentileFaster;

        // Clamp between 0.1 and 99 for realistic display
        const clampedPercentile = Math.max(0.1, Math.min(99, percentile));

        return {
            value: Math.round(clampedPercentile * 10) / 10,
            change: null,
            changeType: "neutral",
            trendType: "neutral",
        } as const;
    },
);

export const $totalPracticeTime = computed(
    [$selectedPeriod, $currentPeriodResults],
    (period, results) => {
        if (results.length === 0) {
            return {
                value: null,
                change: null,
                changeType: "neutral",
                trendType: "neutral",
            } as const;
        }

        const totalMs = results.reduce((sum, r) => sum + r.totalDuration, 0);
        const totalMinutes = Math.round(totalMs / 60000);

        return {
            value: totalMinutes,
            change: null,
            changeType: "neutral",
            trendType: "neutral",
        } as const;
    },
);
