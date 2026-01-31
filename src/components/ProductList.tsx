import { Brain, KeyboardIcon, Zap } from "lucide-react";
import React from "react";
import ProductCard from "./ProductCard";

const ProductList = () => {
    const products = [
        {
            name: "Reaction Time Checker",
            description:
                "Test and improve your reaction time with our interactive Reaction Time Checker. Challenge yourself and track your progress over time.",
            link: "/reaction-time-checker",
            Icon: (
                <Zap
                    size={80}
                    className="group-hover:text-primary mx-2 transition-colors "
                />
            ),
        },
        {
            name: "Number Memory Test",
            description:
                "Enhance your memory skills with our Number Memory Test. Remember and recall sequences of numbers to boost your cognitive abilities.",
            link: "/number-memory-test",
            Icon: (
                <Brain
                    size={80}
                    className="group-hover:text-primary mx-2 transition-colors "
                />
            ),
        },
        {
            name: "Typing Speed Test",
            description:
                "Measure and improve your typing speed with our Typing Speed Test. Compete against yourself and others to achieve the highest words per minute.",
            link: "https://ninjatype.com",
            Icon: (
                <KeyboardIcon
                    size={80}
                    className="group-hover:text-primary mx-2 transition-colors "
                />
            ),
        },
    ];
    return (
        <div>
            <div className="flex gap-2 justify-center my-10 flex-wrap px-4">
                {products.map((product) => (
                    <ProductCard
                        key={product.name}
                        icon={product.Icon}
                        href={product.link}
                        heading={product.name}
                    >
                        {product.description}
                    </ProductCard>
                ))}
            </div>
        </div>
    );
};

export default ProductList;
