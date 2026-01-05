import { useState, useEffect, useRef } from 'react';

export const useProgress = (onComplete: () => void) => {
    const [progress, setProgress] = useState(0);
    const completedRef = useRef(false);

    useEffect(() => {
        // Random duration between 3s (3000ms) and 7s (7000ms)
        // Using performance.now() for smooth animation
        const duration = Math.floor(Math.random() * 4000) + 3000;
        const startTime = performance.now();
        let animationFrameId: number;

        const animate = (currentTime: number) => {
            if (completedRef.current) return;

            const elapsed = currentTime - startTime;
            const newProgress = Math.min((elapsed / duration) * 100, 100);

            setProgress(newProgress);

            if (newProgress < 100) {
                animationFrameId = requestAnimationFrame(animate);
            } else {
                completedRef.current = true;
                onComplete();
            }
        };

        animationFrameId = requestAnimationFrame(animate);

        return () => {
            cancelAnimationFrame(animationFrameId);
        };
    }, []); // Run once on mount

    return progress;
};
