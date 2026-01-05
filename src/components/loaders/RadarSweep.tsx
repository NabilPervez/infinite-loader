import React from 'react';
import { useProgress } from '../../hooks/useProgress';

interface LoaderProps {
    onComplete: () => void;
}

export const RadarSweep: React.FC<LoaderProps> = ({ onComplete }) => {
    const progress = useProgress(onComplete);

    // Calculate blip positions based on random "enemies" detected
    const blips = [
        { top: 20, right: 30, delay: 0 },
        { top: 60, right: 20, delay: 1000 },
        { top: 40, right: 70, delay: 2500 }
    ];

    return (
        <div className="relative w-48 h-48 rounded-full border-2 border-white/50 bg-black/40 shadow-[0_0_20px_rgba(0,255,0,0.2)] overflow-hidden">
            {/* Grid Lines */}
            <div className="absolute inset-0 border border-white/20 rounded-full scale-50" />
            <div className="absolute inset-0 border border-white/20 rounded-full scale-75" />
            <div className="absolute top-1/2 left-0 w-full h-px bg-white/20" />
            <div className="absolute top-0 left-1/2 w-px h-full bg-white/20" />

            {/* Sweep */}
            <div className="absolute inset-0 animate-spin origin-center duration-[3s] ease-linear">
                <div className="w-full h-1/2 bg-gradient-to-l from-transparent via-green-500/20 to-transparent transform rotate-90 origin-bottom-right"
                    style={{ background: 'conic-gradient(from 180deg, transparent 0deg, rgba(34, 197, 94, 0.4) 60deg, transparent 60deg)' }}
                />
            </div>

            {/* Blips */}
            {blips.map((blip, i) => (
                <div
                    key={i}
                    className="absolute w-2 h-2 rounded-full bg-green-400 animate-ping"
                    style={{
                        top: `${blip.top}%`,
                        right: `${blip.right}%`,
                        animationDuration: '2s',
                        animationDelay: `${blip.delay}ms`
                    }}
                />
            ))}

            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] text-green-400 font-mono">
                SCANNING... {Math.floor(progress)}%
            </div>
        </div>
    );
};
