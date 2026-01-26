import {
    $currentRound,
    nmsTransitionTo,
} from "@/stores/number-memory/nm-state";
import { Button } from "@heroui/react";
import { useStore } from "@nanostores/react";
import { RefreshCw, RotateCcw } from "lucide-react";
import React from "react";

const NMComplete = () => {
    const currentRound = useStore($currentRound);
    return (
        <div className="flex flex-col justify-between gap-5">
            <h2 className="text-3xl font-bold text-center">Test Complete!</h2>
            <h3 className="text-center">You reached round {currentRound}.</h3>
            <div className="flex flex-wrap gap-2">
                <Button
                    onPress={() => {
                        nmsTransitionTo("idle");
                    }}
                    variant="shadow"
                    color="primary"
                    endContent={<RotateCcw size={16} />}
                >
                    Restart
                </Button>
                <Button
                    onPress={() => {
                        nmsTransitionTo("started");
                    }}
                    variant="shadow"
                    color="warning"
                    endContent={<RefreshCw size={16} />}
                >
                    Try Again
                </Button>
            </div>
        </div>
    );
};

export default NMComplete;
