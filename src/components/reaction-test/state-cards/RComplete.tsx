import React from "react";
import { useStore } from "@nanostores/react";
import { $statistics, MAX_ROUNDS, resetGame } from "@/stores/reaction-state";
import { CheckCircle } from "lucide-react";
import RContent from "../RContent";

interface RCompleteProps {
    reactionTime: number | null;
    currentRound: number;
    onNext: () => void;
}

const RComplete = ({ reactionTime, currentRound, onNext }: RCompleteProps) => {
    const statistics = useStore($statistics);
    const isGameComplete = currentRound >= MAX_ROUNDS;

    const handleClick = () => {
        if (isGameComplete) {
            resetGame();
        } else {
            onNext();
        }
    };

    return (
        <RContent
            handleClick={handleClick}
            className="bg-gradient-to-br from-purple-600 to-purple-800"
            aria-label={
                isGameComplete
                    ? "Click to start new test"
                    : "Click for next round"
            }
        >
            <div className="flex flex-col h-full items-center gap-4 text-white">
                <CheckCircle size={48} />
                <h2 className="text-6xl font-bold">
                    {reactionTime}
                    <span className="text-2xl opacity-80 ml-2">ms</span>
                </h2>
                <p className="text-lg opacity-90">
                    Round {currentRound} of {MAX_ROUNDS}
                </p>
                {isGameComplete && statistics.average > 0 && (
                    <p className="text-3xl font-bold text-yellow-300 mt-4">
                        Avg: {statistics.average}ms
                    </p>
                )}
                <p className="text-sm opacity-80 mt-2">
                    {isGameComplete
                        ? "Click to restart"
                        : "Click for next round"}
                </p>
            </div>
        </RContent>
    );
};

export default RComplete;
