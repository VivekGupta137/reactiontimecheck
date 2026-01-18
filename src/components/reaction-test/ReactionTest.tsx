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
    cn,
    Divider,
    Link,
    Slider,
} from "@heroui/react";
import { useStore } from "@nanostores/react";
import React from "react";
import RIdle from "./state-cards/RIdle";
import RStarted from "./state-cards/RStarted";
import { RotateCcw, Timer, Trophy, TrendingUp, CogIcon } from "lucide-react";
import RFooter from "./RFooter";
import RSlider from "./RSlider";
import RSettings from "./settings/RSettings";

const ReactionTest = () => {
    const reactionState = useStore($reactionState);

    return (
        <Card
            data-reaction-state={reactionState}
            className={cn(
                "max-w-4xl mx-4 lg:mx-auto  shadow-xl ",
                reactionState === "idle" ? "bg-black" : "bg-content1"
            )}
        >
            <CardHeader
                className={cn(
                    "flex justify-between items-center flex-wrap gap-2",
                    reactionState === "idle" ? "invisible" : "visible"
                )}
            >
                <div className={cn("flex items-center gap-2 ")}>
                    <Timer
                        className="text-primary shrink-0"
                        size={24}
                    />
                    <h1 className="text-xl font-bold">
                        Reaction Time Test{" "}
                        <Link
                            href="/reaction-time-test"
                            showAnchorIcon
                            isBlock
                            size="sm"
                        />
                    </h1>
                </div>
                <div className="flex gap-2">
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
                </div>
            </CardHeader>
            {reactionState !== "idle" && <Divider />}

            <CardBody className="p-0 h-100 flex items-center justify-center">
                {reactionState === "idle" && <RIdle />}
                {reactionState !== "idle" && <RStarted />}
            </CardBody>
            <div>
                <RSlider />
                <CardFooter className="">
                    <RFooter />
                </CardFooter>
            </div>
        </Card>
    );
};

export default ReactionTest;
