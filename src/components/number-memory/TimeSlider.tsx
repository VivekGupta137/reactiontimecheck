import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";

interface TimeSliderProps {
    duration: number; // Duration in milliseconds
    onComplete?: () => void;
    className?: string;
}

const TimeSlider: React.FC<TimeSliderProps> = ({
    duration,
    onComplete,
    className = "",
}) => {
    const [key, setKey] = useState(0);

    useEffect(() => {
        // Reset animation when duration changes
        setKey((prev) => prev + 1);
    }, [duration]);

    return (
        <div
            className={`relative w-full h-1 bg-default-200 rounded-full overflow-hidden ${className}`}
        >
            <motion.div
                key={key}
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary-400 to-primary-600 rounded-none"
                initial={{ width: "100%" }}
                animate={{ width: "0%" }}
                transition={{
                    duration: duration / 1000,
                    ease: "linear",
                }}
                onAnimationComplete={() => {
                    if (onComplete) {
                        onComplete();
                    }
                }}
            />
        </div>
    );
};

export default TimeSlider;
