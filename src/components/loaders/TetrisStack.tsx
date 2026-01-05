import React from 'react';
import { useProgress } from '../../hooks/useProgress';
import { motion } from 'framer-motion';

interface LoaderProps {
    onComplete: () => void;
}

export const TetrisStack: React.FC<LoaderProps> = ({ onComplete }) => {
    const progress = useProgress(onComplete);

    // 10x10 Grid
    const totalCells = 100;
    const blocksToFill = Math.floor(progress); // 0-100 matches progress exactly

    // We want to fill from bottom up. 
    // Grid is 10 cols, 10 rows.
    // Cell index 0 is top left? No, let's flex wrap or grid.
    // Visual index: 90-99 is row 10 (bottom).
    // We want to verify if a cell is "filled".
    // progress=1 => fill cell 90? Or just simply 0-100?
    // Let's standard row-fill: bottom row first.

    return (
        <div className="relative p-2 border-4 border-slate-700 bg-slate-900 rounded shadow-2xl">
            <div className="grid grid-cols-10 gap-px w-40 h-40">
                {Array.from({ length: totalCells }).map((_, i) => {
                    // Need to map linear index 'i' to "gravity filled" index.
                    // i=0 is top-left. i=99 is bottom-right.
                    // Filler logic: fill 99, 98, 97... 
                    const inverseIndex = 99 - i;
                    const isFilled = inverseIndex < blocksToFill;

                    // "Flashing" animation if this block just got filled?
                    // Simplified: just render state.

                    return (
                        <div
                            key={i}
                            className={`w-full h-full border border-black/20 ${isFilled ? 'bg-gradient-to-br from-blue-400 to-blue-600' : 'bg-slate-800'}`}
                        />
                    );
                })}
            </div>
            <div className="absolute -right-16 top-0 flex flex-col gap-2">
                <div className="bg-slate-800 p-2 border border-slate-600">
                    <div className="text-[8px] text-slate-400">NEXT</div>
                    <div className="w-4 h-4 bg-red-500 mt-1 block mx-auto"></div>
                </div>
                <div className="text-right font-mono text-white text-xs mt-4">
                    LEVEL 1<br />
                    {Math.floor(progress)}%
                </div>
            </div>
        </div>
    );
};
