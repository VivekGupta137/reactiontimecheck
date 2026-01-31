import { nmsTransitionTo } from "@/stores/number-memory/nm-state";
import { Button } from "@heroui/react";
import { Mouse } from "lucide-react";
import React from "react";
import NMSettings from "../settings/NMSettings";
import { useStore } from "@nanostores/react";
import { $nmSettings } from "@/stores/number-memory/nm-settings";

const NMIdle = () => {
    const settings = useStore($nmSettings);
    const mode = settings.mode || "normal";

    return (
        <div className="flex flex-col">
            <h2 className="text-3xl font-bold text-center">
                {mode === "normal"
                    ? "Test Your Number Memory"
                    : "Test Your Photographic Memory"}
            </h2>
            <h3 className="text-center">
                Remember and recall increasingly long sequences of numbers.
            </h3>

            <div className="self-center mt-8 mb-0">
                <div className="flex gap-2">
                    <Button
                        disableRipple
                        color="primary"
                        variant="shadow"
                        onPress={() => nmsTransitionTo("started")}
                        endContent={
                            <Mouse
                                size={16}
                                className="animate-blink"
                            />
                        }
                    >
                        Start Test
                    </Button>
                    <NMSettings />
                </div>
            </div>
        </div>
    );
};

export default NMIdle;
