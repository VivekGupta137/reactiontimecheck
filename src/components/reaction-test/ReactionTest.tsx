import {
    $reactionState,
    resetGame,
    $statistics,
} from "@/stores/reaction-state";
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Divider,
} from "@heroui/react";
import { useStore } from "@nanostores/react";
import React from "react";
import RIdle from "./state-cards/RIdle";
import RStarted from "./state-cards/RStarted";
import { RotateCcw, Timer, Trophy, TrendingUp, CogIcon } from "lucide-react";
import RFooter from "./RFooter";

const ReactionTest = () => {
    const reactionState = useStore($reactionState);

    return (
        <Card
            data-reaction-state={reactionState}
            className="max-w-4xl mx-4 lg:mx-auto  shadow-xl"
        >
            <CardHeader className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <Timer
                        className="text-primary"
                        size={24}
                    />
                    <h1 className="text-xl font-bold">Reaction Time Test</h1>
                </div>
                <div className="flex gap-2">
                    {reactionState !== "idle" && (
                        <Button
                            size="sm"
                            color="danger"
                            variant="flat"
                            startContent={<RotateCcw size={16} />}
                            onPress={resetGame}
                            aria-label="Restart test"
                        >
                            Restart
                        </Button>
                    )}
                    <Button
                        startContent={<CogIcon size={16} />}
                        size="sm"
                        color="warning"
                        variant="flat"
                    >
                        Settings
                    </Button>
                </div>
            </CardHeader>
            <Divider />
            <CardBody className="p-0 h-full items-stretch">
                {reactionState === "idle" && <RIdle />}
                {reactionState !== "idle" && <RStarted />}
            </CardBody>
            <Divider />
            <CardFooter className="justify-center">
                <RFooter />
            </CardFooter>
        </Card>
    );
};

export default ReactionTest;
