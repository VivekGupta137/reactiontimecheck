import {
    $reactionState,
    transitionStateTo,
    recordReactionTime,
    incrementAttempt,
    $currentRound,
} from "@/stores/reaction-state";
import { useStore } from "@nanostores/react";
import React, { useEffect, useRef, useCallback } from "react";
import RWaiting from "./RWaiting";
import RTooSoon from "./RTooSoon";
import RGreen from "./RGreen";
import RComplete from "./RComplete";
import { $rtConfig } from "@/stores/reaction-settings";

const RStarted = () => {
    const reactionState = useStore($reactionState);
    const currentRound = useStore($currentRound);
    const startTimeRef = useRef<number | null>(null);
    const timeoutRef = useRef<number | null>(null);
    const [reactionTime, setReactionTime] = React.useState<number | null>(null);
    const rtConfig = useStore($rtConfig);
    const MAX_ROUNDS = parseInt(rtConfig.maxRounds);

    const startNewRound = useCallback(() => {
        transitionStateTo("waiting");

        // Random delay between 1-4 seconds for better unpredictability
        const minDelay = parseInt(rtConfig.minDelayMS);
        const maxDelay = parseInt(rtConfig.maxDelayMS);

        const delay = minDelay + Math.random() * maxDelay;

        timeoutRef.current = window.setTimeout(() => {
            console.log("Screen is green now!");
            startTimeRef.current = performance.now();
            transitionStateTo("green");
        }, delay);
    }, []);

    useEffect(() => {
        if (reactionState === "started") {
            startNewRound();
        }

        // Only cleanup when component unmounts, not on every reactionState change
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    const handleClick = useCallback(() => {
        const endTime = performance.now();
        const rt = Math.round(endTime - (startTimeRef.current ?? 0));

        if (reactionState === "waiting") {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
            incrementAttempt({ rt, type: "tooSoon" });
            transitionStateTo("tooSoon");
        } else if (reactionState === "green" && startTimeRef.current) {
            setReactionTime(rt);
            recordReactionTime(rt);
            incrementAttempt({ rt, type: "valid" });
            transitionStateTo("complete");
        } else if (reactionState === "tooSoon") {
            startNewRound();
        }
    }, [reactionState, startNewRound]);

    const handleNextRound = useCallback(() => {
        if (currentRound < MAX_ROUNDS) {
            startNewRound();
        }
    }, [currentRound]);

    return (
        <div className="w-full h-full">
            {reactionState === "waiting" && (
                <RWaiting handleClick={handleClick} />
            )}
            {reactionState === "green" && <RGreen handleClick={handleClick} />}
            {reactionState === "tooSoon" && (
                <RTooSoon handleClick={handleClick} />
            )}
            {reactionState === "complete" && (
                <RComplete
                    reactionTime={reactionTime}
                    currentRound={currentRound}
                    onNext={handleNextRound}
                />
            )}
        </div>
    );
};

export default RStarted;
