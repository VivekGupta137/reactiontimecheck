import { atom, computed, onSet } from "nanostores";

export type ReactionState =
    | "idle" // didn't click start button yet
    | "started" // game started
    | "waiting" // waiting for green
    | "tooSoon" // clicked too soon
    | "green" // green, click now!
    | "complete"; // clicked, showing final result

// flow : idle -> started -> waiting -> (tooSoon | green) -> (waiting | complete)

export const MAX_ROUNDS = 5;

export const $reactionState = atom<ReactionState>("idle");
export const $currentRound = atom<number>(0);
export const $reactionTimes = atom<number[]>([]);
export const $attemptCount = atom<number>(0); // Track total attempts including failed ones

// Computed statistics
export const $statistics = computed([$reactionTimes], (times) => {
    if (times.length === 0) {
        return {
            average: 0,
            best: 0,
            worst: 0,
            count: 0,
        };
    }

    const average = Math.round(times.reduce((a, b) => a + b, 0) / times.length);
    const best = Math.min(...times);
    const worst = Math.max(...times);

    return {
        average,
        best,
        worst,
        count: times.length,
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

export function incrementAttempt() {
    $attemptCount.set($attemptCount.get() + 1);
}

export function resetGame() {
    $reactionState.set("idle");
    $currentRound.set(0);
    $reactionTimes.set([]);
    $attemptCount.set(0);
}

// Reset counters when starting a new game
onSet($reactionState, ({ newValue }) => {
    if (newValue === "started") {
        $currentRound.set(0);
        $reactionTimes.set([]);
        $attemptCount.set(0);
    }
});
