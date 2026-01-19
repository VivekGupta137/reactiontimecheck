import { computed } from "nanostores";
import { persistentAtom } from "@nanostores/persistent";

/**
 * Interface for a reaction test session result
 * Each entry represents a complete test session with aggregate data
 */
export interface ReactionTestResult {
    id: string;
    avgReactionTime: number; // Average reaction time for successful attempts (ms)
    bestReactionTime: number; // Best reaction time in the session (ms)
    missCount: number; // Number of missed/failed attempts (includes all failures)
    totalAttempts: number; // Total attempts in the session
    totalDuration: number; // Total duration of the test session (ms)
    timestamp: number; // Unix timestamp
}

/**
 * Persistent store for all test results
 * Stores results in localStorage for persistence across sessions
 */
export const $testResults = persistentAtom<ReactionTestResult[]>(
    "reaction-test-results",
    [],
    {
        encode: JSON.stringify,
        decode: JSON.parse,
    },
);

/**
 * Add a new test session result
 * @param result Session data with aggregated statistics
 */
export const addTestResult = (
    result: Omit<ReactionTestResult, "id" | "timestamp">,
) => {
    const newResult: ReactionTestResult = {
        ...result,
        id: crypto.randomUUID(),
        timestamp: Date.now(),
    };

    const current = $testResults.get();
    $testResults.set([...current, newResult]);
};

/**
 * Clear all test results
 */
export const clearTestResults = () => {
    $testResults.set([]);
};

/**
 * Get test results for a specific time period
 */
export const getResultsForPeriod = (period: string): ReactionTestResult[] => {
    const results = $testResults.get();
    const now = Date.now();

    const periodMs: Record<string, number> = {
        "24-hours": 24 * 60 * 60 * 1000,
        "7-days": 7 * 24 * 60 * 60 * 1000,
        "30-days": 30 * 24 * 60 * 60 * 1000,
        "3-months": 90 * 24 * 60 * 60 * 1000,
        "6-months": 180 * 24 * 60 * 60 * 1000,
    };

    const cutoff = now - (periodMs[period] || 0);
    return results.filter((r) => r.timestamp >= cutoff);
};

/**
 * Computed store that checks if there are any test results
 * Automatically updates when $testResults changes
 */
export const $hasTestResults = computed($testResults, (results) => {
    return results.length > 0;
});

/**
 * Get aggregate statistics from test session results
 */
export const getTestStatistics = (results: ReactionTestResult[]) => {
    if (results.length === 0) {
        return null;
    }

    // Aggregate data across all sessions
    const totalAttempts = results.reduce((sum, r) => sum + r.totalAttempts, 0);
    const totalMisses = results.reduce((sum, r) => sum + r.missCount, 0);
    const successfulAttempts = totalAttempts - totalMisses;

    if (successfulAttempts === 0) {
        return null;
    }

    // Weight average reaction times by successful attempts in each session
    let weightedSum = 0;
    results.forEach((r) => {
        const sessionSuccesses = r.totalAttempts - r.missCount;
        if (sessionSuccesses > 0) {
            weightedSum += r.avgReactionTime * sessionSuccesses;
        }
    });
    const average = weightedSum / successfulAttempts;

    // Best time across all sessions
    const best = Math.min(...results.map((r) => r.bestReactionTime));

    // Median from averages (approximation)
    const avgTimes = results
        .filter((r) => r.totalAttempts - r.missCount > 0)
        .map((r) => r.avgReactionTime)
        .sort((a, b) => a - b);

    const median =
        avgTimes.length > 0
            ? avgTimes[Math.floor(avgTimes.length / 2)]
            : average; // Fallback to average if no valid times

    const successRate = (successfulAttempts / totalAttempts) * 100;

    return {
        average,
        best,
        median,
        successRate,
        totalAttempts,
        successfulAttempts,
    };
};
