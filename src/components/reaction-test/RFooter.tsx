import { $reactionState, $statistics } from "@/stores/reaction-state";
import { Button, Link } from "@heroui/react";
import { useStore } from "@nanostores/react";
import { HistoryIcon, TrendingUp, Trophy, XIcon } from "lucide-react";
import React from "react";

const RFooter = () => {
    const reactionState = useStore($reactionState);

    const statistics = useStore($statistics);
    const hasData = statistics.attemptCount > 0 && reactionState !== "idle";

    return (
        <div className="grow flex justify-between flex-wrap gap-2">
            <div className="">
                {hasData ? (
                    <div className="flex gap-8 text-sm">
                        <div className="flex items-center gap-2">
                            <Trophy
                                size={16}
                                className="text-yellow-600"
                            />
                            <span className="text-gray-300">Best:</span>
                            <span className="font-semibold text-gray-300">
                                {statistics.best}ms
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <TrendingUp
                                size={16}
                                className="text-blue-600"
                            />
                            <span className="text-gray-300">Avg:</span>
                            <span className="font-semibold text-gray-300">
                                {statistics.average}ms
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <XIcon
                                size={16}
                                className="text-red-600"
                            />
                            <span className="text-gray-300">Miss:</span>
                            <span className="font-semibold text-gray-300">
                                {statistics.missCount}
                            </span>
                        </div>
                    </div>
                ) : (
                    <p className="text-sm text-slate-300">
                        Your data is never stored on any server. No Signups
                        needed.
                    </p>
                )}
            </div>
            <Button
                size="sm"
                className="shrink-0"
                startContent={
                    <HistoryIcon
                        className="shrink-0"
                        size={16}
                    />
                }
                as={"a"}
                href="/reaction-time-test/history"
            >
                History
            </Button>
        </div>
    );
};

export default RFooter;
