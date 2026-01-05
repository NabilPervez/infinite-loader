import React from 'react';
import { useProgress } from '../../hooks/useProgress';
import { motion } from 'framer-motion';

interface LoaderProps {
    onComplete: () => void;
}

export const D20Roll: React.FC<LoaderProps> = ({ onComplete }) => {
    const progress = useProgress(onComplete);

    // Fake "landing" numbers
    const currentRoll = Math.floor(Math.random() * 20) + 1;
    const isDone = progress >= 99;

    return (
        <div className="flex flex-col items-center justify-center perspective-[800px]">
            <div className="relative w-32 h-32 flex items-center justify-center transform-style-3d">
                <motion.div
                    className="relative w-full h-full transform-style-3d text-white"
                    animate={isDone ? { rotateX: 0, rotateY: 0, rotateZ: 0 } : { rotateX: 360, rotateY: 720, rotateZ: 360 }}
                    transition={{ duration: 0.5, repeat: isDone ? 0 : Infinity, ease: "linear" }}
                >
                    {/* SVG Icosahedron Representation */}
                    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_10px_white]">
                        <polygon points="50,5 95,30 50,95 5,30" className="fill-white/10 stroke-white stroke-2" />
                        <line x1="50" y1="5" x2="50" y2="95" className="stroke-white stroke-2" />
                        <line x1="5" y1="30" x2="95" y2="30" className="stroke-white stroke-2" />
                        <line x1="50" y1="50" x2="5" y2="30" className="stroke-white stroke-2" />
                        <line x1="50" y1="50" x2="95" y2="30" className="stroke-white stroke-2" />
                        <line x1="50" y1="50" x2="50" y2="95" className="stroke-white stroke-2" />
                    </svg>

                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-3xl font-bold font-serif">{isDone ? 20 : (currentRoll)}</span>
                    </div>
                </motion.div>
            </div>

            <div className="mt-8 font-serif italic text-white/70">
                {isDone ? "CRITICAL SUCCESS" : "Rolling initiative..."}
            </div>
        </div>
    );
};
