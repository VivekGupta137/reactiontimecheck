import { atom, computed, onSet } from "nanostores";
import { $rtConfig } from "./reaction-settings";
import { addTestResult } from "./reaction-test-results";

export type ReactionState =
    | "idle" // didn't click start button yet
    | "started" // game started
    | "waiting" // waiting for green
    | "tooSoon" // clicked too soon
    | "green" // green, click now!
    | "complete"; // clicked, showing final result

// flow : idle -> started -> waiting -> (tooSoon | green) -> (waiting | complete)

export const $reactionState = atom<ReactionState>("idle");
export const $currentRound = atom<number>(0);
export const $reactionTimes = atom<number[]>([]);
export const $attemptTimes = atom<
    {
        rt: number;
        type: "tooSoon" | "valid";
    }[]
>([]); // Track times for all attempts
export const $sessionStartTime = atom<number | null>(null); // Track session start timestamp

// Computed statistics
export const $statistics = computed([$attemptTimes], (attemptTimes) => {
    if (attemptTimes.length === 0) {
        return {
            average: 0,
            best: 0,
            worst: 0,
            validCount: 0,
            attemptCount: 0,
            missCount: 0,
        };
    }

    const times = attemptTimes
        .filter((attempt) => attempt.type === "valid")
        .map((attempt) => attempt.rt);

    const average = Math.round(times.reduce((a, b) => a + b, 0) / times.length);
    const best = Math.min(...times);
    const worst = Math.max(...times);
    const miss = attemptTimes.filter(
        (attempt) => attempt.type === "tooSoon",
    ).length;

    return {
        average,
        best,
        worst,
        validCount: times.length,
        attemptCount: attemptTimes.length,
        missCount: miss,
    };
});

export function transitionStateTo(nextState: ReactionState) {
    $reactionState.set(nextState);
}

export function recordReactionTime(time: number) {
    const times = $reactionTimes.get();
    $reactionTimes.set([...times, time]);
    $currentRound.set($currentRound.get() + 1);
}

export function incrementAttempt({
    rt,
    type = "valid",
}: {
    rt: number;
    type?: "tooSoon" | "valid";
}) {
    const attemptTimes = $attemptTimes.get();
    // $attemptCount.set($attemptCount.get() + 1);
    $attemptTimes.set([...attemptTimes, { rt, type }]);
}

export function saveSessionResults() {
    console.log("saveSessionResults");

    const statistics = $statistics.get();
    const sessionStartTime = $sessionStartTime.get();
    const config = $rtConfig.get();

    if (statistics.validCount === 0) {
        return;
    }

    const sessionEndTime = Date.now();
    let totalDuration: number;

    if (sessionStartTime) {
        // Use actual session duration if available
        totalDuration = sessionEndTime - sessionStartTime;
    } else {
        // Calculate estimate using config delays and reaction times
        const minDelay = parseInt(config.minDelayMS);
        const maxDelay = parseInt(config.maxDelayMS);
        const avgWaitTime = (minDelay + maxDelay) / 2;
        totalDuration =
            statistics.attemptCount * (avgWaitTime + statistics.average);
    }

    addTestResult({
        avgReactionTime: statistics.average,
        bestReactionTime: statistics.best,
        missCount: statistics.missCount,
        totalAttempts: statistics.attemptCount,
        totalDuration: Math.round(totalDuration),
    });
}

export function resetGame() {
    $reactionState.set("idle");
    $currentRound.set(0);
    $reactionTimes.set([]);
    $attemptTimes.set([]);
    $sessionStartTime.set(null);
}

// Reset counters when starting a new game
onSet($reactionState, ({ newValue }) => {
    if (newValue === "started") {
        $currentRound.set(0);
        $reactionTimes.set([]);
        $attemptTimes.set([]);
        $sessionStartTime.set(Date.now());
    }
});
