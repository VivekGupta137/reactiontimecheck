import React from "react";
import { useStore } from "@nanostores/react";
import { $statistics } from "@/stores/reaction-state";
import { Link } from "@heroui/react";
import { Timer, Github, Twitter, Linkedin, ClockCheck } from "lucide-react";
import Brand from "./Brand";

const Footer = () => {
    const statistics = useStore($statistics);
    const hasData = statistics.count > 0;

    return (
        <footer className="flex w-full flex-col border-t border-default-200 mt-4">
            <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-center px-6 py-12 lg:px-8">
                {/* Logo/Brand */}
                <Brand />

                {/* Spacer */}
                <span
                    aria-hidden="true"
                    className="w-px h-px block mt-4"
                />

                {/* Analytics Section (conditional) */}
                {hasData && (
                    <>
                        <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 mt-4">
                            <div className="text-center">
                                <p className="text-xs text-default-500 uppercase tracking-wide">
                                    Best Time
                                </p>
                                <p className="text-2xl font-bold text-default-700">
                                    {statistics.best}
                                    <span className="text-sm text-default-500 ml-1">
                                        ms
                                    </span>
                                </p>
                            </div>
                            <div className="text-center">
                                <p className="text-xs text-default-500 uppercase tracking-wide">
                                    Average
                                </p>
                                <p className="text-2xl font-bold text-default-700">
                                    {statistics.average}
                                    <span className="text-sm text-default-500 ml-1">
                                        ms
                                    </span>
                                </p>
                            </div>
                            <div className="text-center">
                                <p className="text-xs text-default-500 uppercase tracking-wide">
                                    Completed
                                </p>
                                <p className="text-2xl font-bold text-default-700">
                                    {statistics?.validCount ?? 0}
                                    <span className="text-sm text-default-500 ml-1">
                                        rounds
                                    </span>
                                </p>
                            </div>
                        </div>
                        <span
                            aria-hidden="true"
                            className="w-px h-px block mt-6"
                        />
                    </>
                )}

                {/* Navigation Links */}
                <div className="flex flex-wrap justify-center gap-x-4 gap-y-1">
                    <Link
                        className="text-small text-default-500"
                        href="/"
                    >
                        Home
                    </Link>
                    <Link
                        className="text-small text-default-500"
                        href="/about"
                    >
                        About
                    </Link>
                    <Link
                        className="text-small text-default-500"
                        href="/tips"
                    >
                        Tips
                    </Link>
                    <Link
                        className="text-small text-default-500"
                        href="/blogs"
                    >
                        Blog
                    </Link>
                </div>

                {/* Spacer */}
                <span
                    aria-hidden="true"
                    className="w-px h-px block mt-6"
                />

                {/* Social Media Icons */}
                <div className="flex justify-center gap-x-4">
                    <Link
                        className="text-medium text-default-400"
                        href="https://github.com/VivekGupta137/reactiontimecheck"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub"
                    >
                        <Github className="w-5 h-5" />
                    </Link>
                    <Link
                        className="text-medium text-default-400"
                        href="https://twitter.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Twitter"
                    >
                        <Twitter className="w-5 h-5" />
                    </Link>
                    <Link
                        className="text-medium text-default-400"
                        href="https://www.linkedin.com/in/vivek-gupta-visa/"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="LinkedIn"
                    >
                        <Linkedin className="w-5 h-5" />
                    </Link>
                </div>

                {/* Spacer */}
                <span
                    aria-hidden="true"
                    className="w-px h-px block mt-4"
                />

                {/* Copyright */}
                <p
                    className="text-small text-default-400 mt-1 text-center"
                    suppressHydrationWarning
                >
                    © {new Date().getFullYear()} Check Reaction Time. All rights
                    reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
