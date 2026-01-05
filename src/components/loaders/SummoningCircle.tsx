import React from 'react';
import { useProgress } from '../../hooks/useProgress';

interface LoaderProps {
    onComplete: () => void;
}

export const SummoningCircle: React.FC<LoaderProps> = ({ onComplete }) => {
    const progress = useProgress(onComplete);
    const runes = 8;
    const activeRunes = Math.floor((progress / 100) * runes);

    return (
        <div className="perspective-[800px] w-64 h-64 flex items-center justify-center">
            <div className="transform rotate-x-[60deg] w-48 h-48 relative border-4 border-red-900 rounded-full flex items-center justify-center bg-black/50 shadow-[0_0_50px_rgba(153,27,27,0.5)]">
                {/* Inner Pentagram-ish lines */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-32 h-32 border-2 border-red-800 rotate-45" />
                    <div className="w-32 h-32 border-2 border-red-800 rotate-12 absolute" />
                </div>

                {/* Runes on Perimeter */}
                {Array.from({ length: runes }).map((_, i) => {
                    const angle = (i / runes) * 2 * Math.PI;
                    const x = Math.cos(angle) * 80; // Radius 80 (px)
                    const y = Math.sin(angle) * 80;
                    const isActive = i <= activeRunes;

                    return (
                        <div
                            key={i}
                            className={`absolute w-6 h-6 flex items-center justify-center text-[10px] transition-all duration-500 ${isActive ? 'text-red-500 drop-shadow-[0_0_5px_red]' : 'text-red-900/30'}`}
                            style={{ transform: `translate(${x}px, ${y}px) rotateX(-60deg)` }} // Counter-rotate to face cam
                        >
                            <span>ᚦ</span>
                        </div>
                    )
                })}

                <div className="absolute text-red-500 font-serif text-sm animate-pulse" style={{ transform: 'rotateX(-60deg)' }}>
                    {Math.floor(progress)}%
                </div>
            </div>
        </div>
    );
};
