import { $rtConfig } from "@/stores/reaction-settings";
import {
    $reactionState,
    $reactionTimes,
    $statistics,
} from "@/stores/reaction-state";
import { Slider } from "@heroui/react";
import { useStore } from "@nanostores/react";
import React from "react";

const RSlider = () => {
    const reactionState = useStore($reactionState);
    const statistics = useStore($statistics);
    const rtConfig = useStore($rtConfig);
    const MAX_ROUNDS = parseInt(rtConfig.maxRounds);

    return (
        <Slider
            hideThumb
            size="sm"
            className="-mt-2"
            minValue={0}
            maxValue={MAX_ROUNDS}
            value={statistics.validCount}
            showTooltip
            isDisabled={reactionState === "idle"}
            color="foreground"
        />
    );
};

export default RSlider;
