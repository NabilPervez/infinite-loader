import React from 'react';
import { useProgress } from '../../hooks/useProgress';
import { motion } from 'framer-motion';

interface LoaderProps {
    onComplete: () => void;
}

export const CardShuffle: React.FC<LoaderProps> = ({ onComplete }) => {
    const progress = useProgress(onComplete);

    // Visual representation of a card back
    const CardBack = ({ className }: { className?: string }) => (
        <div className={`w-24 h-36 bg-amber-800 rounded-lg border-4 border-amber-950 flex items-center justify-center shadow-md ${className}`}>
            <div className="w-20 h-32 bg-amber-900 rounded border-2 border-amber-600" />
        </div>
    );

    return (
        <div className="relative w-64 h-48 flex items-center justify-center">
            {/* Deck Stack */}
            <div className="absolute transform -rotate-6">
                <CardBack />
            </div>
            <div className="absolute transform -rotate-3 translate-y-[-2px]">
                <CardBack />
            </div>

            {/* Active Moving Card */}
            <motion.div
                className="absolute z-10"
                animate={{
                    x: [0, 60, 0],
                    y: [0, -20, 0],
                    rotate: [0, 10, 0],
                    scale: [1, 1.1, 1]
                }}
                transition={{ duration: 0.5, repeat: Infinity }}
            >
                <CardBack className="shadow-2xl" />
            </motion.div>

            <div className="absolute bottom-0 bg-black/50 px-3 py-1 rounded-full text-xs text-amber-200 border border-amber-800">
                SHUFFLING DECK... {Math.floor(progress)}%
            </div>
        </div>
    );
};
