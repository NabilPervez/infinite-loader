import { useState, useEffect, useRef, useCallback } from 'react';

export const useLongPressExit = (duration: number = 10000) => {
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [isHolding, setIsHolding] = useState(false);
    const [holdProgress, setHoldProgress] = useState(0);

    const timerRef = useRef<number | null>(null);
    const startTimeRef = useRef<number | null>(null);
    const animationFrameRef = useRef<number | null>(null);

    // Handle Fullscreen changes
    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
            // Reset hold state if we exit fullscreen
            if (!document.fullscreenElement) {
                cancelHold();
            }
        };

        document.addEventListener('fullscreenchange', handleFullscreenChange);
        return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
    }, []);

    const enterFullscreen = async () => {
        try {
            if (document.documentElement.requestFullscreen) {
                await document.documentElement.requestFullscreen();
            }
        } catch (e) {
            console.error("Fullscreen request failed", e);
        }
    };

    const exitFullscreen = async () => {
        try {
            if (document.exitFullscreen) {
                await document.exitFullscreen();
            }
        } catch (e) {
            console.error("Exit fullscreen failed", e);
        }
    };

    const updateProgress = () => {
        if (!startTimeRef.current) return;

        const elapsed = Date.now() - startTimeRef.current;
        const progress = Math.min((elapsed / duration) * 100, 100);

        setHoldProgress(progress);

        if (progress < 100) {
            animationFrameRef.current = requestAnimationFrame(updateProgress);
        } else {
            // Completed!
            exitFullscreen();
            cancelHold();
        }
    };

    const startHold = useCallback(() => {
        if (!isFullscreen) return; // Only enable long press exit when in fullscreen

        setIsHolding(true);
        startTimeRef.current = Date.now();
        animationFrameRef.current = requestAnimationFrame(updateProgress);
    }, [isFullscreen]);

    const cancelHold = useCallback(() => {
        setIsHolding(false);
        setHoldProgress(0);
        startTimeRef.current = null;
        if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current);
            animationFrameRef.current = null;
        }
    }, []);

    return {
        isFullscreen,
        isHolding,
        holdProgress,
        enterFullscreen,
        startHold,
        cancelHold
    };
};
