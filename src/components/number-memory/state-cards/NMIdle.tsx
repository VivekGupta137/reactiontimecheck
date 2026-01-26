import { nmsTransitionTo } from "@/stores/number-memory/nm-state";
import { Button } from "@heroui/react";
import { Mouse } from "lucide-react";
import React from "react";

const NMIdle = () => {
    return (
        <div className="flex flex-col">
            <h2 className="text-3xl font-bold text-center">
                Test Your Number Memory
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
                </div>
            </div>
        </div>
    );
};

export default NMIdle;
