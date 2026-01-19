import React, { useEffect } from "react";
import { useStore } from "@nanostores/react";
import {
    $statistics,
    resetGame,
    saveSessionResults,
} from "@/stores/reaction-state";
import { CheckCircle, RotateCcw } from "lucide-react";
import RContent from "../RContent";
import { $rtConfig } from "@/stores/reaction-settings";
import { cn } from "@heroui/theme";
import { Button } from "@heroui/react";

interface RCompleteProps {
    reactionTime: number | null;
    currentRound: number;
    onNext: () => void;
}

const RComplete = ({ reactionTime, currentRound, onNext }: RCompleteProps) => {
    const statistics = useStore($statistics);
    const rtConfig = useStore($rtConfig);
    const MAX_ROUNDS = parseInt(rtConfig.maxRounds);
    const isGameComplete = currentRound >= MAX_ROUNDS;

    useEffect(() => {
        if (isGameComplete) {
            saveSessionResults();
        }
    }, [isGameComplete]);

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
            className={cn(
                "bg-gradient-to-br from-purple-600 to-purple-800",
                isGameComplete ? "cursor-auto!" : "cursor-pointer",
            )}
            aria-label={
                isGameComplete
                    ? "Click to start new test"
                    : "Click for next round"
            }
            role={isGameComplete ? "div" : "button"}
        >
            <div>
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
                    {!isGameComplete && (
                        <p className="text-sm opacity-80 mt-2">
                            Click for next round
                        </p>
                    )}
                    {isGameComplete && (
                        <Button
                            color="warning"
                            variant="shadow"
                            onPress={handleClick}
                            startContent={<RotateCcw size={16} />}
                        >
                            Start New Test
                        </Button>
                    )}
                </div>
            </div>
        </RContent>
    );
};

export default RComplete;
