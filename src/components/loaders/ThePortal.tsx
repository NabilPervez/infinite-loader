import React from 'react';
import { useProgress } from '../../hooks/useProgress';
import { motion } from 'framer-motion';

interface LoaderProps {
    onComplete: () => void;
}

export const ThePortal: React.FC<LoaderProps> = ({ onComplete }) => {
    const progress = useProgress(onComplete);

    return (
        <div className="relative w-64 h-32 flex justify-between items-center px-4">
            {/* Blue Portal (Entrance) */}
            <div className="w-8 h-24 bg-cyan-500 rounded-[50%] blur-sm border-2 border-white shadow-[0_0_20px_cyan]" />

            {/* Orange Portal (Exit) */}
            <div className="w-8 h-24 bg-orange-500 rounded-[50%] blur-sm border-2 border-white shadow-[0_0_20px_orange]" />

            {/* Moving Object (The Cube) */}
            <motion.div
                className="absolute w-8 h-8 bg-gray-200 border border-gray-400 flex items-center justify-center"
                initial={{ x: 20 }}
                animate={{ x: 180, rotate: 360 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            >
                <div className="text-[8px]">♥</div>
            </motion.div>

            <div className="absolute bottom-[-20px] left-1/2 -translate-x-1/2 text-white/50 text-xs font-mono">
                TESTING: {Math.floor(progress)}%
            </div>
        </div>
    );
};
