import React, { useEffect } from "react";
import { useStore } from "@nanostores/react";
import {
    $statistics,
    resetGame,
    saveSessionResults,
} from "@/stores/reaction-state";
import { CheckCircle, RotateCcw, Share2 } from "lucide-react";
import RContent from "../RContent";
import { $rtConfig } from "@/stores/reaction-settings";
import { cn } from "@heroui/theme";
import { addToast, Button } from "@heroui/react";

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
            // do nothing, handled by button
            addToast({
                title: "Test Complete! 🎉",
                description:
                    "Great job! Click the 'Start New Test' button below to begin a fresh test.",
                color: "success",
                shouldShowTimeoutProgress: true,
                timeout: 5000,
            });
        } else {
            onNext();
        }
    };

    const handleShare = async () => {
        const shareText = `I just hit ${statistics.average}ms average reaction time on Check Reaction Time! ⚡ Can you beat me? ${window.location.origin}/reaction-time-test`;

        try {
            if (navigator.share) {
                await navigator.share({
                    title: "My Reaction Time Score",
                    text: shareText,
                    url: `${window.location.origin}/reaction-time-test`,
                });
            } else {
                // Fallback: Copy to clipboard
                await navigator.clipboard.writeText(shareText);
            }
            addToast({
                title: "Copied to clipboard!",
                description: "Share your score with friends",
                color: "success",
                timeout: 5000,
                shouldShowTimeoutProgress: true,
            });
        } catch (error) {
            console.error("Error sharing:", error);
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
                        <>
                            <Button
                                color="warning"
                                variant="shadow"
                                onPress={resetGame}
                                startContent={<RotateCcw size={16} />}
                                size="lg"
                            >
                                Start New Test
                            </Button>
                            <Button
                                color="default"
                                variant="ghost"
                                onPress={handleShare}
                                startContent={<Share2 size={16} />}
                                size="lg"
                            >
                                Share My Score
                            </Button>
                        </>
                    )}
                </div>
            </div>
        </RContent>
    );
};

export default RComplete;
