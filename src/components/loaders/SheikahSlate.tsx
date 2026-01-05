import React, { useEffect, useState } from 'react';
import { useProgress } from '../../hooks/useProgress';
import { motion, AnimatePresence } from 'framer-motion';

interface LoaderProps {
    onComplete: () => void;
}

export const SheikahSlate: React.FC<LoaderProps> = ({ onComplete }) => {
    const progress = useProgress(onComplete);
    const [ripples, setRipples] = useState<{ id: number }[]>([]);

    // Trigger ripples periodically based on progress
    useEffect(() => {
        if (progress % 20 < 1 && progress > 0) {
            const id = Date.now();
            setRipples(prev => [...prev, { id }].slice(-3)); // Keep last 3
        }
    }, [progress]);

    return (
        <div className="flex flex-col items-center gap-8">
            <div className="relative w-32 h-32 flex items-center justify-center">
                {/* Rune Circle */}
                <div className="absolute inset-0 border-2 border-cyan-300/50 rounded-full" />
                <div className="absolute inset-0 border border-cyan-300/30 rounded-full scale-90 rotate-45" />

                {/* Center */}
                <div className="w-16 h-16 rounded-full bg-cyan-900/40 border border-cyan-400 flex items-center justify-center overflow-hidden">
                    {/* Droplet logic simulation */}
                    <div className="absolute top-0 w-[2px] h-1/2 bg-cyan-200 origin-top animate-pulse" />

                    {/* Fill */}
                    <div
                        className="absolute bottom-0 w-full bg-cyan-400 shadow-[0_0_15px_cyan]"
                        style={{ height: `${progress}%`, transition: 'height 0.1s linear' }}
                    />
                </div>

                {/* Ripples */}
                <AnimatePresence>
                    {ripples.map(r => (
                        <motion.div
                            key={r.id}
                            className="absolute border border-cyan-300 rounded-full"
                            initial={{ width: 64, height: 64, opacity: 1 }}
                            animate={{ width: 140, height: 140, opacity: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1 }}
                        />
                    ))}
                </AnimatePresence>
            </div>

            <div className="text-cyan-300 font-mono tracking-widest text-sm drop-shadow-[0_0_5px_cyan]">
                UPDATING RUNE... {Math.floor(progress)}%
            </div>
        </div>
    );
};
