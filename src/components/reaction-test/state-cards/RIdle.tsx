import { transitionStateTo } from "@/stores/reaction-state";
import { Button } from "@heroui/react";
import { Mouse, MousePointer2, MousePointerClick } from "lucide-react";
import React from "react";
import RCSettings from "../settings/RCSettings";

const RIdle = () => {
    return (
        <div className="flex flex-col">
            <h2 className="text-3xl font-bold text-center">
                Test Your Reaction Speed
            </h2>
            <h3 className="text-center">
                Click when the screen turns green. Results in milliseconds.
            </h3>

            <div className="self-center mt-8 mb-0">
                <div className="flex gap-2">
                    <Button
                        disableRipple
                        color="primary"
                        variant="shadow"
                        onPress={() => transitionStateTo("started")}
                        endContent={
                            <Mouse
                                size={16}
                                className="animate-blink"
                            />
                        }
                    >
                        Start Test
                    </Button>
                    <RCSettings />
                </div>
            </div>
        </div>
    );
};

export default RIdle;
