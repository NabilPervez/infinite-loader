import React from 'react';
import { useProgress } from '../../hooks/useProgress';
import { motion } from 'framer-motion';

interface LoaderProps {
    onComplete: () => void;
}

export const NewtonsCradle: React.FC<LoaderProps> = ({ onComplete }) => {
    const progress = useProgress(onComplete);

    // The cradles swing speed could increase with progress?
    // Let's make balls glow with progress.
    const energy = progress / 100;

    return (
        <div className="flex items-start justify-center gap-1 h-32 pt-8">
            {/* Left Ball (Swings) */}
            <motion.div
                className="origin-top flex flex-col items-center w-8 h-24"
                animate={{ rotate: [0, 25, 0, 0] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "easeOut" }}
            >
                <div className="w-px h-16 bg-white/30" />
                <div
                    className="w-8 h-8 rounded-full bg-white shadow-[inset_-4px_-4px_10px_rgba(0,0,0,0.5)]"
                    style={{ filter: `drop-shadow(0 0 ${10 * energy}px cyan)` }}
                />
            </motion.div>

            {/* Middle Balls (Static) */}
            {[1, 2, 3].map(i => (
                <div key={i} className="flex flex-col items-center w-8 h-24">
                    <div className="w-px h-16 bg-white/30" />
                    <div className="w-8 h-8 rounded-full bg-white shadow-[inset_-4px_-4px_10px_rgba(0,0,0,0.5)]" />
                </div>
            ))}

            {/* Right Ball (Swings) */}
            <motion.div
                className="origin-top flex flex-col items-center w-8 h-24"
                animate={{ rotate: [0, 0, -25, 0] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "easeOut", delay: 0.6 }} // Offset delay to match impact
            >
                <div className="w-px h-16 bg-white/30" />
                <div
                    className="w-8 h-8 rounded-full bg-white shadow-[inset_-4px_-4px_10px_rgba(0,0,0,0.5)]"
                    style={{ filter: `drop-shadow(0 0 ${10 * energy}px pink)` }}
                />
            </motion.div>
        </div>
    );
};
