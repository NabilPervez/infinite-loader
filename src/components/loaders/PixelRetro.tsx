import React from 'react';
import { useProgress } from '../../hooks/useProgress';

interface LoaderProps {
    onComplete: () => void;
}

export const PixelRetro: React.FC<LoaderProps> = ({ onComplete }) => {
    const progress = useProgress(onComplete);
    const totalBlocks = 20;
    const activeBlocks = Math.floor((progress / 100) * totalBlocks);

    return (
        <div className="flex flex-col items-center gap-4">
            <div className="flex gap-1 p-2 border-4 border-white bg-black/50 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)]">
                {Array.from({ length: totalBlocks }).map((_, i) => (
                    <div
                        key={i}
                        className={`w-3 h-8 transition-colors duration-75 ${i < activeBlocks ? 'bg-white' : 'bg-white/10'
                            }`}
                    />
                ))}
            </div>
            <div className="font-mono text-xl text-white tracking-widest drop-shadow-md">
                LOADING... {Math.floor(progress)}%
            </div>
        </div>
    );
};
