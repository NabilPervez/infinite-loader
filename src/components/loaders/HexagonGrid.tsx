import React, { useMemo } from 'react';
import { useProgress } from '../../hooks/useProgress';

interface LoaderProps {
    onComplete: () => void;
}

export const HexagonGrid: React.FC<LoaderProps> = ({ onComplete }) => {
    const progress = useProgress(onComplete);

    // Create a grid of hexagons
    const hexagons = useMemo(() => Array.from({ length: 19 }), []); // 19 fits nicely in a hex shape
    const activeCount = Math.floor((progress / 100) * hexagons.length);

    return (
        <div className="relative w-64 h-64 flex flex-wrap content-center justify-center gap-1">
            <div className="grid grid-cols-3 gap-2 [&>*:nth-child(even)]:translate-y-6">
                {hexagons.map((_, i) => (
                    <div
                        key={i}
                        className="w-10 h-10 transition-all duration-300 transform"
                        style={{
                            clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                            backgroundColor: i < activeCount ? 'white' : 'rgba(255,255,255,0.1)',
                            transform: i < activeCount ? 'scale(1)' : 'scale(0.9)',
                            opacity: i < activeCount ? 1 : 0.4
                        }}
                    />
                ))}
            </div>
            <div className="absolute -bottom-8 font-mono text-white text-sm tracking-widest">
                ACTIVATING CELLS... {Math.floor(progress)}%
            </div>
        </div>
    );
};
