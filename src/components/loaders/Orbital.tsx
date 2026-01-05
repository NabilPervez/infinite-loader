import React from 'react';
import { useProgress } from '../../hooks/useProgress';

interface LoaderProps {
    onComplete: () => void;
}

export const Orbital: React.FC<LoaderProps> = ({ onComplete }) => {
    const progress = useProgress(onComplete);
    const rotation = (progress / 100) * 360;

    return (
        <div className="relative w-48 h-48 flex items-center justify-center">
            {/* Central Planet */}
            <div className="w-16 h-16 bg-white rounded-full shadow-[0_0_30px_rgba(255,255,255,0.6)] z-10" />

            {/* Orbit Path */}
            <div className="absolute w-40 h-40 border border-white/20 rounded-full" />

            {/* Orbiting Moon */}
            <div
                className="absolute w-full h-full flex items-center justify-center"
                style={{ transform: `rotate(${rotation}deg)` }}
            >
                <div className="absolute top-0 flex flex-col items-center">
                    <div className="w-6 h-6 bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.8)] -mt-3" />
                </div>
            </div>

            <div className="absolute -bottom-12 font-mono text-sm tracking-widest text-white/70">
                ORBIT CALC... {Math.floor(progress)}%
            </div>
        </div>
    );
};
