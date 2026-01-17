import React from "react";
import { Zap } from "lucide-react";
import RContent from "../RContent";

const RGreen = ({ handleClick }: { handleClick: () => void }) => {
    return (
        <RContent
            handleClick={handleClick}
            className="bg-green-600"
            aria-label="Green signal! Click now!"
        >
            <div className="flex flex-col h-full items-center gap-4 text-white">
                <Zap
                    size={48}
                    className="animate-pulse"
                />
                <h2 className="text-3xl font-bold">CLICK!</h2>
                <p className="text-xl opacity-90">React as fast as you can</p>
            </div>
        </RContent>
    );
};

export default RGreen;
