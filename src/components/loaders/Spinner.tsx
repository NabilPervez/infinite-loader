import React from 'react';
import { useProgress } from '../../hooks/useProgress';

interface LoaderProps {
    onComplete: () => void;
}

export const Spinner: React.FC<LoaderProps> = ({ onComplete }) => {
    const progress = useProgress(onComplete);
    const radius = 40;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (progress / 100) * circumference;

    return (
        <div className="relative w-32 h-32 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
                {/* Background Circle */}
                <circle
                    cx="64"
                    cy="64"
                    r={radius}
                    stroke="rgba(255,255,255,0.1)"
                    strokeWidth="8"
                    fill="none"
                />
                {/* Progress Circle */}
                <circle
                    cx="64"
                    cy="64"
                    r={radius}
                    stroke="white"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    className="transition-all duration-75 ease-linear"
                />
            </svg>
        </div>
    );
};
