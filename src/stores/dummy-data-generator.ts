import type { TimePeriod } from "@/stores/types";
import { $testResults } from "@/stores/reaction-test-results";

/**
 * Generate dummy test results for development/testing
 * Creates realistic fake data distributed randomly across days
 */
export const generateDummyData = (period: TimePeriod = "6-months") => {
    const now = Date.now();
    const results = [];

    const periodMs: Record<TimePeriod, number> = {
        "24-hours": 24 * 60 * 60 * 1000,
        "7-days": 7 * 24 * 60 * 60 * 1000,
        "30-days": 30 * 24 * 60 * 60 * 1000,
        "3-months": 90 * 24 * 60 * 60 * 1000,
        "6-months": 180 * 24 * 60 * 60 * 1000,
    };

    const sessionsPerPeriod: Record<TimePeriod, number> = {
        "24-hours": 3,
        "7-days": 15,
        "30-days": 45,
        "3-months": 120,
        "6-months": 250,
    };

    const numSessions = sessionsPerPeriod[period];
    const timeRange = periodMs[period];
    const daysInPeriod = Math.floor(timeRange / (24 * 60 * 60 * 1000));

    // Generate random practice days (40-70% of days have practice)
    const practiceDays = new Set<number>();
    const numPracticeDays = Math.floor(
        daysInPeriod * (0.4 + Math.random() * 0.3),
    );

    while (practiceDays.size < numPracticeDays) {
        practiceDays.add(Math.floor(Math.random() * daysInPeriod));
    }

    const practiceDaysArray = Array.from(practiceDays).sort((a, b) => a - b);

    // Distribute sessions randomly across practice days
    for (let i = 0; i < numSessions; i++) {
        // Pick a random practice day
        const dayIndex =
            practiceDaysArray[
                Math.floor(Math.random() * practiceDaysArray.length)
            ];

        // Random time within that day (distributed throughout the day)
        const hour = Math.floor(Math.random() * 24);
        const minute = Math.floor(Math.random() * 60);
        const second = Math.floor(Math.random() * 60);

        const dayOffset = dayIndex * 24 * 60 * 60 * 1000;
        const timeOffset = (hour * 60 * 60 + minute * 60 + second) * 1000;
        const timestamp = now - timeRange + dayOffset + timeOffset;

        // Progress for improvement trend (based on overall position in time)
        const progress = i / numSessions;

        // Highly varied base times per session (180-450ms range)
        const sessionBaseTime = 180 + Math.floor(Math.random() * 270);

        // Gradual improvement over time with very non-linear scaling
        const improvementFactor = Math.pow(progress, 0.8); // Even slower improvement curve
        const improvement = improvementFactor * (40 + Math.random() * 50); // Variable improvement 40-90ms

        // Very large random variance for extreme variation (±80ms)
        const variance = Math.floor(Math.random() * 160) - 80;

        // Add occasional "bad sessions" with much slower times
        const badSessionMultiplier =
            Math.random() < 0.15 ? 1.3 + Math.random() * 0.3 : 1;

        const avgReactionTime = Math.max(
            150,
            Math.min(
                500,
                Math.round(
                    (sessionBaseTime - improvement + variance) *
                        badSessionMultiplier,
                ),
            ),
        );

        // Best time in session varies greatly (10-60ms faster than average)
        const bestDelta = 10 + Math.floor(Math.random() * 50);
        const bestReactionTime = Math.max(130, avgReactionTime - bestDelta);

        // Session attempts vary widely (3-15 attempts)
        const totalAttempts = 3 + Math.floor(Math.random() * 13);

        // Success rate improves over time with high variance (starts at ~65%, reaches ~97%)
        const baseSuccessRate = 0.65;
        const successImprovement = progress * 0.32;
        const randomVariance = Math.random() * 0.25 - 0.125; // ±12.5% variance
        // Occasional really bad sessions (5% chance)
        const badSessionPenalty = Math.random() < 0.05 ? -0.3 : 0;
        const sessionSuccessRate = Math.min(
            0.98,
            Math.max(
                0.4,
                baseSuccessRate +
                    successImprovement +
                    randomVariance +
                    badSessionPenalty,
            ),
        );

        // Calculate counts
        const successfulAttempts = Math.floor(
            totalAttempts * sessionSuccessRate,
        );
        const missCount = totalAttempts - successfulAttempts;

        // Calculate total session duration
        // Each attempt takes reaction time + wait time (1-3 seconds between attempts)
        const avgWaitTime = 1500 + Math.random() * 1500; // 1.5-3 seconds
        const totalDuration = Math.round(
            totalAttempts * (avgReactionTime + avgWaitTime),
        );

        results.push({
            id: crypto.randomUUID(),
            avgReactionTime,
            bestReactionTime,
            missCount: Math.max(0, missCount),
            totalAttempts,
            totalDuration,
            timestamp: Math.round(timestamp),
        });
    }

    // Sort by timestamp for chronological order
    results.sort((a, b) => a.timestamp - b.timestamp);

    // Set all dummy data at once
    $testResults.set(results);

    return results;
};

/**
 * Clear all dummy data
 */
export const clearDummyData = () => {
    $testResults.set([]);
};

/**
 * Check if dummy data should be generated
 * Only for development/testing
 */
export const shouldGenerateDummyData = (): boolean => {
    // Enable in development or when explicitly requested
    return (
        import.meta.env.DEV || localStorage.getItem("use-dummy-data") === "true"
    );
};

/**
 * Initialize dummy data if needed
 * Call this once on app startup for development
 */
export const initializeDummyData = () => {
    if (shouldGenerateDummyData() && $testResults.get().length === 0) {
        generateDummyData("6-months");
    }
};
