import { atom, effect, onSet } from "nanostores";

export type NMState =
    | "idle" // didn't click start button yet
    | "started" // game started
    | "seq-disp" // displaying sequence
    | "seq-inp" // sequence input by user
    | "complete"; // clicked, showing final result (when incorrect sequence entered | max seq reached )

// flow : idle -> started -> seq-disp -> seq-inp -> complete

export const $nmState = atom<NMState>("idle");
export const $currentRound = atom<number>(1); // Current round number
export const $currentSequence = atom<string>(""); // Current number sequence to remember
export const $userInput = atom<string>(""); // User's input for the sequence
export const $maxCurrentRound = atom<number>(3); // Maximum rounds reached in current session
export const $nmDisplayDuration = atom<number>(1000); // Duration to display each number in ms

export function nmsTransitionTo(nextState: NMState) {
    $nmState.set(nextState);
}

export function nmsGenerateNewSequence(round: number) {
    let newSequence = $currentSequence.get();
    if (round === 1) {
        newSequence = "";
    }

    let randomDigit = Math.floor(Math.random() * 10).toString();
    newSequence += randomDigit;
    $currentSequence.set(newSequence);
}

export function nmsNextRound() {
    const nextRound = $currentRound.get() + 1;
    $currentRound.set(nextRound);
}

effect($currentRound, (round) => {
    // Increase display duration by 500ms each round, capped at 5000ms
    const newDuration = Math.min(1500 + (round - 1) * 500, 5000);
    $nmDisplayDuration.set(newDuration);
    nmsGenerateNewSequence(round);
});

effect($nmState, (state) => {
    if (state === "idle") {
        $currentRound.set(1);
        $userInput.set("");
    }
});
