import React from 'react';
import { useProgress } from '../../hooks/useProgress';

interface LoaderProps {
    onComplete: () => void;
}

export const BlueprintBuild: React.FC<LoaderProps> = ({ onComplete }) => {
    const progress = useProgress(onComplete);

    // Simulate building a house/structure.
    // 3 segments: Base, Walls, Roof.
    const stage = progress < 33 ? 0 : progress < 66 ? 1 : 2;

    return (
        <div className="relative w-64 h-64 border-2 border-blue-500/50 bg-blue-900/20 grid place-items-center p-4">
            <div className="absolute top-2 left-2 text-xs text-blue-300 font-mono">
                BLUEPRINT_ID: #8842
            </div>

            <div className="relative w-32 h-32 flex flex-col justify-end">
                {/* Roof */}
                <div
                    className={`w-0 h-0 border-l-[64px] border-l-transparent border-r-[64px] border-r-transparent border-b-[40px] border-b-blue-400 transition-opacity duration-500 ${stage >= 2 ? 'opacity-100' : 'opacity-10 border-dashed'}`}
                />
                {/* Walls */}
                <div className="flex w-full h-16">
                    <div className={`flex-1 border-2 border-blue-400 bg-blue-500/20 transition-all ${stage >= 1 ? 'opacity-100' : 'opacity-10 scale-y-0 origin-bottom'}`} />
                    <div className="w-8" /> {/* Door gap */}
                    <div className={`flex-1 border-2 border-blue-400 bg-blue-500/20 transition-all ${stage >= 1 ? 'opacity-100' : 'opacity-10 scale-y-0 origin-bottom'}`} />
                </div>
                {/* Base */}
                <div className={`w-full h-4 bg-blue-600 transition-all ${stage >= 0 ? 'opacity-100' : 'opacity-0'}`} />
            </div>

            <div className="absolute bottom-2 right-2 text-blue-400 font-bold text-xl">
                {Math.floor(progress)}%
            </div>
        </div>
    );
};
