import { ClockCheck } from "lucide-react";
import React from "react";

const Brand = () => {
    return (
        <a
            href="/"
            className="flex items-center justify-center"
        >
            <img
                src="/favicon.svg"
                alt="Logo"
                className="h-6 w-6 "
            />
            <span className="text-medium font-bold ml-2">
                CheckReactionTime
            </span>
        </a>
    );
};

export default Brand;
