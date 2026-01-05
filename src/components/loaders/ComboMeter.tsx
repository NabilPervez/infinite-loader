import React from 'react';
import { useProgress } from '../../hooks/useProgress';
import { motion, AnimatePresence } from 'framer-motion';

interface LoaderProps {
    onComplete: () => void;
}

const RANKS = ['D', 'C', 'B', 'A', 'S', 'SS', 'SSS'];

export const ComboMeter: React.FC<LoaderProps> = ({ onComplete }) => {
    const progress = useProgress(onComplete);

    // Map progress 0-100 to RANKS index
    const rankIndex = Math.floor((progress / 100) * (RANKS.length - 1));
    const currentRank = RANKS[rankIndex];

    // Colors per rank
    const colors: Record<string, string> = {
        'D': 'text-gray-500',
        'C': 'text-purple-500',
        'B': 'text-blue-500',
        'A': 'text-green-500',
        'S': 'text-red-500',
        'SS': 'text-orange-500',
        'SSS': 'text-yellow-400'
    };

    return (
        <div className="font-black italic flex flex-col items-end">
            <div className="text-white text-xl tracking-tighter uppercase mr-2">Style Rank</div>
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentRank}
                    initial={{ scale: 2, opacity: 0, x: -50 }}
                    animate={{ scale: 1, opacity: 1, x: 0 }}
                    exit={{ scale: 0.5, opacity: 0, x: 50 }}
                    className={`text-9xl drop-shadow-[4px_4px_0_rgba(0,0,0,1)] ${colors[currentRank] || 'text-white'}`}
                    style={{
                        textShadow: '0 0 20px currentColor',
                        fontFamily: '"Impact", sans-serif'
                    }}
                >
                    {currentRank}
                </motion.div>
            </AnimatePresence>

            {/* Combo Hits Counter */}
            <div className="text-4xl text-white/80 font-mono mt-2">
                {Math.floor(progress)} <span className="text-sm align-top">HITS</span>
            </div>
        </div>
    );
};
