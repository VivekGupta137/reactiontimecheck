import React, { useState } from "react";

interface FAQItemProps {
    question: string;
    children: React.ReactNode;
    defaultOpen?: boolean;
}

const FAQItem: React.FC<FAQItemProps> = ({
    question,
    children,
    defaultOpen = false,
}) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <div
            data-slot="base"
            className={`bg-content1 shadow-medium rounded-medium px-6 bg-transparent hover:bg-default-100 shadow-none ${
                isOpen ? "bg-default-100" : ""
            }`}
        >
            <h2 data-slot="heading">
                <button
                    data-slot="trigger"
                    className="flex w-full h-full gap-3 items-center tap-highlight-transparent outline-solid outline-transparent data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 transition-opacity py-4 md:py-6"
                    type="button"
                    onClick={() => {
                        console.log("clicked");
                        setIsOpen(!isOpen);
                    }}
                    aria-expanded={isOpen}
                >
                    <div className="flex-1 flex flex-col text-start">
                        <span
                            data-slot="title"
                            className="text-foreground text-medium font-medium"
                        >
                            {question}
                        </span>
                    </div>
                    <span
                        aria-hidden="true"
                        data-slot="indicator"
                        className={`text-default-400 transition-transform ${
                            isOpen ? "rotate-180" : "rotate-0"
                        }`}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="m19 9l-7 6l-7-6"></path>
                        </svg>
                    </span>
                </button>
            </h2>
            <section
                style={{
                    willChange: "opacity",
                    opacity: isOpen ? 1 : 0,
                    height: isOpen ? "auto" : 0,
                    overflowY: isOpen ? "visible" : "hidden",
                }}
                className="transition-all duration-300 ease-in-out"
            >
                <div
                    data-slot="content"
                    className="py-2 pt-0 pb-6 text-base text-default-500"
                    role="region"
                >
                    {children}
                </div>
            </section>
        </div>
    );
};

export default FAQItem;
