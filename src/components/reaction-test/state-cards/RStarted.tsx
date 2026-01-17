import {
    $reactionState,
    transitionStateTo,
    recordReactionTime,
    incrementAttempt,
    $currentRound,
    MAX_ROUNDS,
} from "@/stores/reaction-state";
import { useStore } from "@nanostores/react";
import React, { useEffect, useRef, useCallback } from "react";
import RWaiting from "./RWaiting";
import RTooSoon from "./RTooSoon";
import RGreen from "./RGreen";
import RComplete from "./RComplete";

const RStarted = () => {
    const reactionState = useStore($reactionState);
    const currentRound = useStore($currentRound);
    const startTimeRef = useRef<number | null>(null);
    const timeoutRef = useRef<number | null>(null);
    const [reactionTime, setReactionTime] = React.useState<number | null>(null);

    const startNewRound = useCallback(() => {
        transitionStateTo("waiting");

        // Random delay between 1-4 seconds for better unpredictability
        const delay = 0 + Math.random() * 1000;
        console.log({
            delay,
        });

        timeoutRef.current = window.setTimeout(() => {
            console.log("Screen is green now!");
            startTimeRef.current = performance.now();
            transitionStateTo("green");
        }, delay);
    }, []);

    const waitRandomly = () => {};

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
        console.log({ tout: timeoutRef.current });
        if (reactionState === "waiting") {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
            incrementAttempt();
            transitionStateTo("tooSoon");
        } else if (reactionState === "green" && startTimeRef.current) {
            const endTime = performance.now();
            const rt = Math.round(endTime - startTimeRef.current);
            setReactionTime(rt);
            recordReactionTime(rt);
            incrementAttempt();
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
