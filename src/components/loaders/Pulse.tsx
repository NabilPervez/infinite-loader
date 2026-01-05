import React from 'react';
import { useProgress } from '../../hooks/useProgress';

interface LoaderProps {
    onComplete: () => void;
}

export const Pulse: React.FC<LoaderProps> = ({ onComplete }) => {
    const progress = useProgress(onComplete);

    return (
        <div className="relative flex items-center justify-center w-64 h-64">
            {/* Central Pulsating Orb */}
            <div
                className="absolute w-16 h-16 bg-white rounded-full shadow-[0_0_20px_rgba(255,255,255,0.8)] animate-pulse"
            ></div>

            {/* Expanding Ring indicating progress */}
            <div
                className="absolute rounded-full border-4 border-white/50"
                style={{
                    width: `${32 + (progress * 2)}px`, // Starts slightly larger than orb, expands
                    height: `${32 + (progress * 2)}px`,
                    opacity: 1 - (progress / 100), // Fades out as it expands? Or maybe stays visible? 
                    // Re-reading PRD: "ring expanding outward to indicate progress". 
                    // Let's keep it visible but maybe growing.
                    borderWidth: '2px',
                    borderColor: `rgba(255, 255, 255, ${0.8 - (progress / 200)})`
                }}
            />

            {/* Progress Ring */}
            <svg className="absolute w-full h-full transform -rotate-90">
                <circle
                    cx="128"
                    cy="128"
                    r="60"
                    stroke="rgba(255,255,255,0.1)"
                    strokeWidth="2"
                    fill="none"
                />
                <circle
                    cx="128"
                    cy="128"
                    r="60"
                    stroke="white"
                    strokeWidth="4"
                    fill="none"
                    strokeDasharray={2 * Math.PI * 60}
                    strokeDashoffset={(2 * Math.PI * 60) * (1 - progress / 100)}
                    strokeLinecap="round"
                    className="transition-all duration-75 ease-linear drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]"
                />
            </svg>
        </div>
    );
};
