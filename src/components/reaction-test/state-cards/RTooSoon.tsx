import React from "react";
import { XCircle } from "lucide-react";
import RContent from "../RContent";

const RTooSoon = ({ handleClick }: { handleClick: () => void }) => {
    return (
        <RContent
            handleClick={handleClick}
            className="bg-yellow-500"
            aria-label="Clicked too soon. Click to try again."
        >
            <div className="flex flex-col h-full items-center gap-4 text-gray-800">
                <XCircle
                    size={48}
                    className="animate-shake"
                />
                <h2 className="text-3xl font-bold">Too Soon!</h2>
                <p className="text-lg">You clicked before it turned green</p>
                <p className="text-sm opacity-80 mt-2">Click to try again</p>
            </div>
        </RContent>
    );
};

export default RTooSoon;
