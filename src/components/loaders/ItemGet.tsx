import React from 'react';
import { useProgress } from '../../hooks/useProgress';
import { motion } from 'framer-motion';

interface LoaderProps {
    onComplete: () => void;
}

export const ItemGet: React.FC<LoaderProps> = ({ onComplete }) => {
    const progress = useProgress(onComplete);
    const isComplete = progress >= 99;

    return (
        <div className="flex flex-col items-center">
            <div className="w-64 h-48 flex items-center justify-center">
                {/* Wireframe Object */}
                <motion.div
                    className="w-24 h-24 border-2 border-green-400 flex items-center justify-center relative shadow-[0_0_15px_rgba(74,222,128,0.5)]"
                    animate={{ rotateY: 360, rotateZ: [0, 5, -5, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    style={{ transformStyle: 'preserve-3d' }}
                >
                    <div className="absolute inset-0 border border-green-400/30 rotate-45" />
                    <div className="absolute w-12 h-12 bg-green-900/40 backdrop-blur-sm" />

                    {/* Scanlines Effect */}
                    <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,255,0,0.1)_50%)] bg-[length:100%_4px]" />
                </motion.div>
            </div>

            <div className="flex flex-col items-center gap-1">
                <div className="text-green-400 font-bold tracking-widest text-xl uppercase">
                    {isComplete ? "ITEM ACQUIRED" : "ANALYZING..."}
                </div>
                <div className="w-48 h-1 bg-green-900 rounded-full">
                    <div className="h-full bg-green-400" style={{ width: `${progress}%` }} />
                </div>
            </div>
        </div>
    );
};
