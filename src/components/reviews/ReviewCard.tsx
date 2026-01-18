import React from "react";
import StarRating from "./StarRating";

interface ReviewCardProps {
    name: string;
    date: string;
    avatar: string;
    rating: number;
    title: string;
    children: React.ReactNode;
}

const ReviewCard: React.FC<ReviewCardProps> = ({
    name,
    date,
    avatar,
    rating,
    title,
    children,
}) => {
    return (
        <div className="rounded-medium bg-content1 shadow-small p-5">
            <div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div
                            tabIndex={-1}
                            className="inline-flex items-center justify-center gap-2 rounded-small outline-solid outline-transparent data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2"
                        >
                            <span
                                tabIndex={-1}
                                className="flex relative justify-center items-center box-border overflow-hidden align-middle z-0 outline-solid outline-transparent data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 w-10 h-10 text-tiny bg-default text-default-foreground rounded-full"
                            >
                                <img
                                    className="flex object-cover w-full h-full transition-opacity !duration-500 opacity-0 data-[loaded=true]:opacity-100"
                                    alt="avatar"
                                    src={avatar}
                                    data-loaded="true"
                                />
                            </span>
                            <div className="inline-flex flex-col items-start">
                                <span className="text-small text-inherit font-medium">
                                    {name}
                                </span>
                                <span className="text-foreground-400 text-small">
                                    {date}
                                </span>
                            </div>
                        </div>
                    </div>
                    <StarRating rating={rating} />
                </div>
                <div className="mt-4 w-full">
                    <p className="text-default-900 font-medium">{title}</p>
                    <p className="text-default-500 mt-2">{children}</p>
                </div>
            </div>
        </div>
    );
};

export default ReviewCard;
