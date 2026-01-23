import { $rtConfig } from "@/stores/reaction-settings";
import {
    $reactionState,
    $reactionTimes,
    $statistics,
} from "@/stores/reaction-state";
import { Slider } from "@heroui/react";
import { useStore } from "@nanostores/react";
import React, { useEffect, useState } from "react";

const RSlider = () => {
    const reactionState = useStore($reactionState);
    const statistics = useStore($statistics);
    const rtConfig = useStore($rtConfig);
    const [isClient, setIsClient] = useState(false);

    // Ensure consistent values between SSR and client
    useEffect(() => {
        setIsClient(true);
    }, []);

    const MAX_ROUNDS = parseInt(rtConfig.maxRounds, 10);

    return (
        <Slider
            hideThumb
            size="sm"
            className="-mt-2"
            minValue={0}
            maxValue={isClient ? MAX_ROUNDS : 5}
            value={statistics.validCount}
            showTooltip
            isDisabled={reactionState === "idle"}
            color="foreground"
            step={1}
            aria-label="Test progress"
        />
    );
};

export default RSlider;
