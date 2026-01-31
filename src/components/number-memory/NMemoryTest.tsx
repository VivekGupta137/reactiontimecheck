import { $nmState, resetNMGame } from "@/stores/number-memory/nm-state";
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    cn,
    Divider,
    HeroUIProvider,
    ToastProvider,
} from "@heroui/react";
import { useStore } from "@nanostores/react";
import React from "react";
import NMActiveState from "./NMActiveState";
import { RotateCcw, ShieldCheck } from "lucide-react";
import CustomModes from "./settings/CustomModes";

const NMemoryTest = () => {
    const nmState = useStore($nmState);

    return (
        <HeroUIProvider>
            <ToastProvider />
            <Card
                className={cn(
                    "max-w-4xl mx-4 lg:mx-auto  shadow-[0_0_120px_rgba(0,0,0,0)]",
                    nmState === "idle" ? "bg-black " : "bg-content1 ",
                )}
            >
                <CardHeader
                    className={cn(
                        "flex justify-between items-center flex-wrap gap-2",
                        nmState === "idle" ? "invisible" : "visible",
                    )}
                >
                    <div>
                        <h1 className="text-3xl font-bold ">
                            Number Memory Test
                        </h1>
                        <h2 className="text-default-500">
                            Remember and recall increasingly long sequences of
                            numbers.
                        </h2>
                    </div>
                    <Button
                        size="sm"
                        color="danger"
                        variant="flat"
                        startContent={<RotateCcw size={16} />}
                        onPress={() => resetNMGame()}
                        aria-label="Restart test"
                    >
                        Restart
                    </Button>
                </CardHeader>
                <CardBody className="p-0 h-100 flex items-center justify-center overflow-y-auto">
                    <NMActiveState />
                </CardBody>
                <Divider />
                <CardFooter className="flex justify-between flex-wrap">
                    <p className="text-sm text-slate-300 ">
                        <ShieldCheck
                            className="inline-block text-success"
                            size={18}
                        />
                        <span>
                            &nbsp; Your data is never stored on any server.
                        </span>
                    </p>
                    <CustomModes />
                </CardFooter>
            </Card>
        </HeroUIProvider>
    );
};

export default NMemoryTest;
