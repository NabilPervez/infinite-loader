import React from 'react';
import { useProgress } from '../../hooks/useProgress';
import { motion } from 'framer-motion';

interface LoaderProps {
    onComplete: () => void;
}

export const TheLantern: React.FC<LoaderProps> = ({ onComplete }) => {
    const progress = useProgress(onComplete);

    return (
        <div className="relative w-64 h-64 flex flex-col items-center">
            {/* Rope */}
            <div className="w-0.5 h-16 bg-gradient-to-b from-transparent to-amber-900" />

            <motion.div
                className="relative"
                animate={{ rotate: [-10, 10, -10] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                style={{ originY: 0 }}
            >
                {/* Lantern Body */}
                <div className="w-24 h-32 bg-black/80 border-4 border-amber-800 rounded-lg flex items-center justify-center relative overflow-hidden shadow-2xl">
                    <div className="w-16 h-24 bg-orange-900/30 rounded border border-orange-900/50 flex items-center justify-center">
                        {/* Flame/Light */}
                        <div
                            className="w-8 h-12 bg-orange-400 rounded-full blur-md animate-pulse"
                            style={{ opacity: 0.5 + (progress / 200) }}
                        />
                    </div>

                    {/* Light Beam */}
                    <div
                        className="absolute inset-0 bg-yellow-500/10 mix-blend-overlay"
                        style={{ opacity: progress / 100 }}
                    />
                </div>
            </motion.div>

            <div className="mt-8 text-amber-500/50 font-serif italic text-sm">
                Seeking Horizon... {Math.floor(progress)}%
            </div>
        </div>
    );
};
