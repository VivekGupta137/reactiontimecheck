import { $reactionState, $statistics } from "@/stores/reaction-state";
import { useStore } from "@nanostores/react";
import { TrendingUp, Trophy } from "lucide-react";
import React from "react";

const RFooter = () => {
    const reactionState = useStore($reactionState);

    const statistics = useStore($statistics);
    const hasData = statistics.count > 0 && reactionState !== "idle";

    return (
        <div className="flex justify-center">
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
                </div>
            ) : (
                <p className="text-sm text-slate-300">
                    Test your reflexes • Track your progress • Improve your
                    reaction time
                </p>
            )}
        </div>
    );
};

export default RFooter;
