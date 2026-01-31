import { atom, effect, onSet } from "nanostores";
import { $nmSettings } from "./nm-settings";
import {
    genRandomNumberSequence,
    genSerialNumberSequence,
} from "@/components/number-memory/utils/genSequence";

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

export function nmsTransitionTo(nextState: NMState) {
    $nmState.set(nextState);
}

export function nmsGenerateNewSequence(round: number) {
    if (round == 1) {
        $currentSequence.set("");
    }

    let curSequence = $currentSequence.get();
    let newSequence = "";

    const settings = $nmSettings.get();
    const numberType = settings.numberType || "serial";

    if (numberType === "serial") {
        newSequence = genSerialNumberSequence(curSequence);
    } else if (numberType === "random") {
        newSequence = genRandomNumberSequence(curSequence.length + 1);
    }

    $currentSequence.set(newSequence);
}

export function nmsNextRound() {
    const nextRound = $currentRound.get() + 1;
    $currentRound.set(nextRound);
}

export function resetNMGame() {
    $nmState.set("idle");
}

effect($currentRound, (round) => {
    nmsGenerateNewSequence(round);
});

effect($nmState, (state) => {
    if (state === "idle") {
        $currentRound.set(1);
        $userInput.set("");
    }
});
