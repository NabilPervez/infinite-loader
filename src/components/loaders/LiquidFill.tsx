import React from 'react';
import { useProgress } from '../../hooks/useProgress';

interface LoaderProps {
    onComplete: () => void;
}

export const LiquidFill: React.FC<LoaderProps> = ({ onComplete }) => {
    const progress = useProgress(onComplete);

    return (
        <div className="relative w-48 h-48 rounded-full border-4 border-white/30 overflow-hidden backdrop-blur-sm bg-white/5 mx-auto">
            {/* Liquid Wave */}
            <div
                className="absolute bottom-0 left-0 right-0 bg-white transition-all duration-200 ease-linear shadow-[0_0_20px_rgba(255,255,255,0.4)]"
                style={{ height: `${progress}%` }}
            >
                <div className="absolute top-0 w-[200%] h-4 bg-white opacity-50 animate-[wave_2s_linear_infinite] -translate-y-1/2 left-[-50%]"
                    style={{ borderRadius: '40%' }}></div>
                <div className="absolute top-0 w-[200%] h-4 bg-white opacity-30 animate-[wave_3s_linear_infinite] -translate-y-1/2 left-[-30%]"
                    style={{ borderRadius: '35%' }}></div>
            </div>

            {/* Text overlay */}
            <div className="absolute inset-0 flex items-center justify-center mix-blend-difference">
                <span className="text-3xl font-bold font-mono text-white/90">
                    {Math.floor(progress)}%
                </span>
            </div>
        </div>
    );
};
