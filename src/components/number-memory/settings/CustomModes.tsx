import {
    $nmSettings,
    defaultNMSettings,
} from "@/stores/number-memory/nm-settings";
import { Tab, Tabs } from "@heroui/react";
import { useStore } from "@nanostores/react";
import { BrainIcon } from "lucide-react";
import React, { useEffect } from "react";

const CustomModes = () => {
    const nmsettings = useStore($nmSettings);
    const selected = nmsettings.mode ?? "normal";
    const handleSelectionChange = (key: any) => {
        if (key === "normal") {
            $nmSettings.set({
                ...nmsettings,
                ...(nmsettings.additionalRoundTime === "0"
                    ? defaultNMSettings
                    : {}),
                mode: "normal",
            }); // No changes for normal mode
        } else if (key === "photo") {
            $nmSettings.set({
                ...nmsettings,
                mode: "photo",
                numDispDuration: "300", // Example: shorter display time for photo mode
                additionalRoundTime: "0", // Example: increase display time for photo mode
            });
        }
    };

    useEffect(() => {
        // Here you can handle side effects when the selected tab changes
    }, [selected]);
    return (
        <Tabs
            selectedKey={selected}
            onSelectionChange={handleSelectionChange}
            variant="bordered"
        >
            <Tab
                key="normal"
                title="Normal"
            />
            <Tab
                key="photo"
                title={
                    <div className="flex items-center space-x-2">
                        <BrainIcon />
                        <span>Photo Memory</span>
                    </div>
                }
            />
        </Tabs>
    );
};

export default CustomModes;
