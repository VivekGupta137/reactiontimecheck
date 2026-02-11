/**
 * Reading time calculator for blog posts
 * Uses reading-time package to estimate reading duration
 */
import readingTime from "reading-time";

export function getReadingTime(content: string) {
    const stats = readingTime(content);
    return {
        text: stats.text,
        minutes: Math.ceil(stats.minutes),
        words: stats.words,
    };
}
