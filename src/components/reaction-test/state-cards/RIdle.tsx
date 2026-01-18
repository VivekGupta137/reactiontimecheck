import { transitionStateTo } from "@/stores/reaction-state";
import { Button } from "@heroui/react";
import { Mouse, MousePointer2, MousePointerClick } from "lucide-react";
import React from "react";
import RSettings from "../settings/RSettings";

const RIdle = () => {
    return (
        <div className="flex flex-col">
            <h1 className="text-3xl font-bold text-center">
                Test Your Reaction Speed
            </h1>
            <h2 className="text-center">
                Click when the screen turns green. Results in milliseconds.
            </h2>

            <div className="self-center mt-8 mb-0">
                <div className="flex gap-2">
                    <Button
                        disableRipple
                        color="primary"
                        variant="shadow"
                        onPress={() => transitionStateTo("started")}
                        endContent={<Mouse size={16} />}
                    >
                        Start Test
                    </Button>
                    <RSettings />
                </div>
            </div>
        </div>
    );
};

export default RIdle;
