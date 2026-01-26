import { $nmState } from "@/stores/number-memory/nm-state";
import {
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Divider,
    HeroUIProvider,
    ToastProvider,
} from "@heroui/react";
import { useStore } from "@nanostores/react";
import React from "react";
import NMActiveState from "./NMActiveState";
import { ShieldCheck } from "lucide-react";

const NMemoryTest = () => {
    return (
        <HeroUIProvider>
            <ToastProvider />
            <Card className="max-w-4xl mx-4 lg:mx-auto">
                <CardHeader className="flex justify-between items-center flex-wrap gap-2">
                    <div>
                        <h1 className="text-3xl font-bold ">
                            Number Memory Test
                        </h1>
                        <h2 className="text-default-500">
                            Remember and recall increasingly long sequences of
                            numbers.
                        </h2>
                    </div>
                </CardHeader>
                <Divider />
                <CardBody className="p-0 h-100 flex items-center justify-center overflow-y-auto">
                    <NMActiveState />
                </CardBody>
                <Divider />
                <CardFooter>
                    <p className="text-sm text-slate-300 ">
                        <ShieldCheck
                            className="inline-block text-success"
                            size={18}
                        />
                        <span>
                            &nbsp; Your data is never stored on any server.
                        </span>
                    </p>
                </CardFooter>
            </Card>
        </HeroUIProvider>
    );
};

export default NMemoryTest;
