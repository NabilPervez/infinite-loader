import React from 'react';
import { useProgress } from '../../hooks/useProgress';
import { motion } from 'framer-motion';

interface LoaderProps {
    onComplete: () => void;
}

export const PipBoy: React.FC<LoaderProps> = ({ onComplete }) => {
    const progress = useProgress(onComplete);

    // Create limbs for "Vault Boy" stick figure simple representation
    return (
        <div className="w-64 h-48 bg-green-900/20 border-4 border-green-800 rounded-xl p-4 flex flex-col items-center justify-between shadow-[0_0_20px_rgba(20,83,45,0.5)] relative overflow-hidden">
            {/* CRT Scanline Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,255,18,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_2px,3px_100%] pointer-events-none" />

            <div className="flex-1 flex items-center justify-center">
                <motion.div
                    className="w-16 h-24 border-2 border-green-500 relative"
                    animate={{ rotate: [0, 5, -5, 0] }} // simple walk cycle wobble
                    transition={{ duration: 0.5, repeat: Infinity }}
                >
                    {/* Head */}
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-8 h-8 border-2 border-green-500 rounded-full" />
                    {/* Arm Wave */}
                    <motion.div
                        className="absolute top-2 -right-4 w-8 h-1 bg-green-500 origin-left"
                        animate={{ rotate: [0, -45, 0] }}
                        transition={{ duration: 1, repeat: Infinity }}
                    />
                </motion.div>
            </div>

            <div className="w-full font-mono text-green-500 text-xs">
                <div>HP {Math.floor(progress)}/100</div>
                <div className="w-full h-2 border border-green-700 mt-1 p-0.5">
                    <div className="h-full bg-green-500" style={{ width: `${progress}%` }} />
                </div>
            </div>
        </div>
    );
};
