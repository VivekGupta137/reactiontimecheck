import React from "react";
import { ScrollShadow } from "@heroui/scroll-shadow";

interface ReviewsProps {
    children: React.ReactNode;
}

const Reviews: React.FC<ReviewsProps> = ({ children }) => {
    return (
        <section className="mx-auto w-full max-w-6xl px-2 not-prose my-20 sm:my-32 lg:my-40">
            <div className="mx-auto flex w-full max-w-4xl flex-col items-center gap-6">
                <h2 className="px-2 text-3xl leading-7">Reviews</h2>
            </div>
            <ScrollShadow
                className="h-100 mt-5"
                hideScrollBar
            >
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {children}
                </div>
            </ScrollShadow>
        </section>
    );
};

export default Reviews;
