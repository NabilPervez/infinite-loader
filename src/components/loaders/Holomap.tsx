import React from 'react';
import { useProgress } from '../../hooks/useProgress';
import { motion } from 'framer-motion';

interface LoaderProps {
    onComplete: () => void;
}

export const Holomap: React.FC<LoaderProps> = ({ onComplete }) => {
    const progress = useProgress(onComplete);

    return (
        <div className="perspective-[1000px] w-64 h-64 flex items-center justify-center">
            <motion.div
                className="relative w-48 h-48 transform-style-3d border border-blue-500/30 rounded-full"
                animate={{ rotateX: 60, rotateZ: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            >
                {/* Hologram Base */}
                <div className="absolute inset-0 rounded-full bg-blue-500/10 shadow-[0_0_30px_rgba(0,0,255,0.2)]" />

                {/* Projected Elements */}
                <div className="absolute top-1/2 left-1/2 w-32 h-32 -translate-x-1/2 -translate-y-1/2 border border-blue-400 rounded-full flex items-center justify-center">
                    <div className="w-16 h-16 border border-blue-300 rounded-full" />
                </div>

                {/* Scanning Plane */}
                <motion.div
                    className="absolute inset-0 bg-blue-400/20"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                />
            </motion.div>

            <div className="absolute bottom-0 text-blue-400 font-mono text-xs animate-pulse">
                TRANSMISSION_INCOMING:: {Math.floor(progress)}%
            </div>
        </div>
    );
};
