import React, { useState, useEffect } from 'react';
import { useProgress } from '../../hooks/useProgress';

interface LoaderProps {
    onComplete: () => void;
}

export const GlitchText: React.FC<LoaderProps> = ({ onComplete }) => {
    const progress = useProgress(onComplete);
    const [glitchFactor, setGlitchFactor] = useState(0);

    useEffect(() => {
        // Random glitch spikes
        const interval = setInterval(() => {
            if (Math.random() > 0.8) {
                setGlitchFactor(Math.random() * 5);
                setTimeout(() => setGlitchFactor(0), 100);
            }
        }, 200);
        return () => clearInterval(interval);
    }, []);

    const text = `SYSTEM_OVERRIDE: ${Math.floor(progress)}%`;

    return (
        <div className="relative font-mono font-bold text-4xl tracking-tighter">
            {/* Main Text */}
            <div className="text-white relative z-10">{text}</div>

            {/* RGB Split Layers */}
            <div
                className="absolute top-0 left-0 text-red-500 opacity-70 caller"
                style={{ transform: `translate(${glitchFactor}px, ${-glitchFactor}px)` }}
            >
                {text}
            </div>
            <div
                className="absolute top-0 left-0 text-cyan-500 opacity-70"
                style={{ transform: `translate(${-glitchFactor}px, ${glitchFactor}px)` }}
            >
                {text}
            </div>

            {/* Glitch Rects */}
            {glitchFactor > 0 && (
                <div className="absolute top-0 w-full h-full bg-white/10 mix-blend-overlay" style={{ clipPath: 'inset(40% 0 45% 0)' }}></div>
            )}
        </div>
    );
};
