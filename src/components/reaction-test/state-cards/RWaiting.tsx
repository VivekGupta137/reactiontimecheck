import React from "react";
import { AlertCircle } from "lucide-react";
import RContent from "../RContent";

const RWaiting = ({ handleClick }: { handleClick: () => void }) => {
    return (
        <RContent
            handleClick={handleClick}
            className="bg-red-600 "
            aria-label="Waiting for green signal. Click when it turns green."
        >
            <div>
                <div className="flex flex-col h-full items-center gap-4 text-white">
                    <AlertCircle size={48} />
                    <h2 className="text-3xl font-bold">Wait for Green...</h2>
                    <p className="text-lg opacity-90">
                        Click as soon as the screen turns green
                    </p>
                </div>
            </div>
        </RContent>
    );
};

export default RWaiting;
