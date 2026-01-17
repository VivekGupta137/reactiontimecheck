import { transitionStateTo } from "@/stores/reaction-state";
import { Button } from "@heroui/react";
import React from "react";

const RIdle = () => {
    return (
        <div className="flex flex-col my-20">
            <h1 className="text-3xl font-bold text-center">
                Test your reaction time
            </h1>
            <p className="text-center">Click "Start Test" to begin.</p>
            <div className="self-center">
                <Button
                    disableRipple
                    color="primary"
                    className="mt-8 mb-0"
                    onPress={() => transitionStateTo("started")}
                >
                    Start Test
                </Button>
            </div>
        </div>
    );
};

export default RIdle;
