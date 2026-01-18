import React from "react";

interface FAQProps {
    children: React.ReactNode;
}

const FAQ: React.FC<FAQProps> = ({ children }) => {
    return (
        <div className="mx-auto flex w-full max-w-4xl flex-col items-center gap-6">
            <div
                className="px-2 flex flex-col w-full gap-3"
                data-orientation="vertical"
            >
                {children}
            </div>
        </div>
    );
};

export default FAQ;
