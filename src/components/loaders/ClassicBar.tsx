import React from 'react';
import { useProgress } from '../../hooks/useProgress';

interface LoaderProps {
    onComplete: () => void;
}

export const ClassicBar: React.FC<LoaderProps> = ({ onComplete }) => {
    const progress = useProgress(onComplete);

    return (
        <div className="w-64 md:w-96 h-4 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm border border-white/10 shadow-lg">
            <div
                className="h-full bg-white transition-all duration-75 ease-linear shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                style={{ width: `${progress}%` }}
            />
        </div>
    );
};
