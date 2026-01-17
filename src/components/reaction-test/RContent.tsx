import React, { type HTMLAttributes } from "react";

const RContent = (
    props: {
        children: React.ReactNode;
        handleClick: () => void;
    } & HTMLAttributes<HTMLDivElement>
) => {
    return (
        <div
            onClick={props.handleClick}
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
        >
            {props.children}
        </div>
    );
};

export default RContent;
