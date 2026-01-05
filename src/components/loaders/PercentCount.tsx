import React from 'react';
import { useProgress } from '../../hooks/useProgress';

interface LoaderProps {
    onComplete: () => void;
}

export const PercentCount: React.FC<LoaderProps> = ({ onComplete }) => {
    const progress = useProgress(onComplete);

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="text-9xl font-bold font-mono text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">
                {Math.floor(progress)}%
            </div>
            <div className="mt-4 text-sm font-light tracking-widest uppercase opacity-70">
                Loading System
            </div>
        </div>
    );
};
