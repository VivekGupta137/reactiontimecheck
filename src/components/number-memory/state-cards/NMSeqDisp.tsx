import {
    $currentRound,
    $currentSequence,
    nmsTransitionTo,
} from "@/stores/number-memory/nm-state";
import { useStore } from "@nanostores/react";
import React, { useEffect } from "react";
import TimeSlider from "../TimeSlider";
import { $nmSettings } from "@/stores/number-memory/nm-settings";

const NMSeqDisp = () => {
    const currentSequence = useStore($currentSequence);
    const currentRound = useStore($currentRound);
    const nmSettings = useStore($nmSettings);
    const nmDisplayDuration = parseInt(nmSettings.numDispDuration);
    const nmAddDisplayPerRound = parseInt(nmSettings.additionalRoundTime);
    const displayDuration =
        nmDisplayDuration + (currentRound - 1) * nmAddDisplayPerRound;

    useEffect(() => {
        // After displaying, transition to the input state
        const timeoutId = setTimeout(() => {
            nmsTransitionTo("seq-inp");
        }, displayDuration); // Display time increases with round

        return () => clearTimeout(timeoutId);
    }, [displayDuration]);

    return (
        <div className="w-full max-w-md mx-auto">
            <div>
                <h1 className="text-3xl text-center atkinson-hyperlegible-bold text-default-500">
                    Remember this sequence
                </h1>
                <h2 className="text-2xl mb-4 text-center text-default-500">
                    Round -{" "}
                    <span className="jetbrains-mono">{currentRound}</span>
                </h2>
                <div className="text-4xl jetbrains-mono-bold tracking-widest text-center mb-6">
                    {currentSequence}
                </div>
                <TimeSlider
                    duration={displayDuration}
                    className="mt-4"
                />
            </div>
        </div>
    );
};

export default NMSeqDisp;
