import { useEffect, useRef } from "react";

const useStopwatch = ({
    containerRef,
    target = null,
    cb,
}: {
    containerRef?: React.RefObject<HTMLDivElement | null>;
    target?: number | null;
    cb?: (elapsed: number, reset: () => void) => void;
}) => {
    const startTime = useRef(0);
    const animationRef = useRef<number | null>(null);
    const isRunning = useRef(false);
    const targetRef = useRef(target);
    const elapsedRef = useRef(0);
    const cbRef = useRef(cb);

    useEffect(() => {
        cbRef.current = cb;
    }, [cb]);

    useEffect(() => {
        targetRef.current = target;
    }, [target]);

    const step = (timestamp: number) => {
        if (!isRunning.current) return;

        if (startTime.current === 0) {
            startTime.current = timestamp;
        }

        const elapsed = Math.round(timestamp - startTime.current);
        elapsedRef.current = elapsed;

        if (containerRef?.current) {
            // containerRef.current.dataset.elapsed = elapsed.toString();
        }

        if (targetRef.current !== null && elapsed >= targetRef.current) {
            stop();

            return;
        }

        animationRef.current = requestAnimationFrame(step);
    };

    const reset = (targetTime?: number | null) => {
        isRunning.current = true;
        startTime.current = 0;

        if (targetTime !== undefined) {
            // to unset target, pass null
            targetRef.current = targetTime;
        }

        if (containerRef?.current) {
            containerRef.current.dataset.elapsed = "0";
        }

        animationRef.current = requestAnimationFrame(step);
    };

    const stop = () => {
        isRunning.current = false;

        if (animationRef.current) {
            cancelAnimationFrame(animationRef.current);
        }
        cbRef.current?.(elapsedRef.current, reset);
    };

    useEffect(() => {
        reset();
    }, []);

    return { stop, reset };
};

export default useStopwatch;
