import { transitionStateTo } from "@/stores/reaction-state";
import { Button } from "@heroui/react";
import { Mouse, MousePointer2, MousePointerClick } from "lucide-react";
import React from "react";

const RIdle = () => {
    return (
        <div className="flex flex-col my-20">
            <h1 className="text-3xl font-bold text-center">
                Test Your Reaction Speed
            </h1>
            <p className="text-center">
                Click when the screen turns green. Results in milliseconds.
            </p>
            <p className="text-center">Click "Start Test" to begin.</p>

            <div className="self-center mt-8 mb-0">
                <p className="text-center mb-2">👇</p>
                <Button
                    disableRipple
                    color="primary"
                    variant="shadow"
                    onPress={() => transitionStateTo("started")}
                    endContent={<Mouse size={16} />}
                >
                    Start Test
                </Button>
            </div>
        </div>
    );
};

export default RIdle;
