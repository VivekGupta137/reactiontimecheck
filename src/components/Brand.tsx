import { ClockCheck } from "lucide-react";
import React from "react";

const Brand = () => {
    return (
        <a
            href="/"
            className="flex items-center justify-center"
        >
            <ClockCheck size={25} />
            <span className="text-medium font-bold ml-2">
                ReactionTimeCheck
            </span>
        </a>
    );
};

export default Brand;
