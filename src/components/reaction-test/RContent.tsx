import { $rtConfig } from "@/stores/reaction-settings";
import { useStore } from "@nanostores/react";
import React, { use, type HTMLAttributes } from "react";

const RContent = (
    props: {
        children: React.ReactNode;
        handleClick: () => void;
    } & HTMLAttributes<HTMLDivElement>
) => {
    const rtConfig = useStore($rtConfig);
    const handleMouseClick =
        rtConfig.mouseClick === "onpress"
            ? { onMouseDown: props.handleClick }
            : { onClick: props.handleClick };
    return (
        <div
            onKeyDown={(e) => {
                if (e.key === " " || e.key === "Enter") {
                    e.preventDefault();
                    props.handleClick();
                }
            }}
            role="button"
            tabIndex={0}
            className={
                "h-full flex justify-center items-center py-20 px-8 cursor-pointer select-none " +
                props.className
            }
            {...handleMouseClick}
        >
            {props.children}
        </div>
    );
};

export default RContent;
