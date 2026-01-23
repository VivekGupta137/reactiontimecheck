import { $rtConfig } from "@/stores/reaction-settings";
import { useStore } from "@nanostores/react";
import React, { use, type HTMLAttributes } from "react";

const RContent = (
    props: {
        children: React.ReactNode;
        handleClick: () => void;
    } & HTMLAttributes<HTMLDivElement>,
) => {
    const rtConfig = useStore($rtConfig);
    const {
        handleClick,
        children,
        "aria-label": ariaLabel,
        ...htmlprops
    } = props;

    const handleMouseClick =
        rtConfig.mouseClick === "onpress"
            ? { onMouseDown: handleClick }
            : { onClick: handleClick };

    return (
        <div
            onKeyDown={(e) => {
                if (e.key === " " || e.key === "Enter") {
                    e.preventDefault();
                    handleClick();
                }
            }}
            role="button"
            tabIndex={0}
            aria-label={ariaLabel || "Reaction test area"}
            {...htmlprops}
            {...handleMouseClick}
            className={
                "h-full flex justify-center items-center cursor-pointer select-none " +
                props.className
            }
        >
            {children}
        </div>
    );
};

export default RContent;
