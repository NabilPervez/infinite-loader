import React from 'react';
import { useProgress } from '../../hooks/useProgress';
import { motion } from 'framer-motion';

interface LoaderProps {
    onComplete: () => void;
}

export const TheLoom: React.FC<LoaderProps> = ({ onComplete }) => {
    const progress = useProgress(onComplete);
    const threads = 12;

    return (
        <div className="relative w-64 h-64 flex items-center justify-center">
            {Array.from({ length: threads }).map((_, i) => {
                const rotation = (i / threads) * 360;
                return (
                    <motion.div
                        key={i}
                        className="absolute h-32 w-0.5 origin-bottom bg-gradient-to-t from-transparent via-cyan-400 to-transparent"
                        style={{ rotate: rotation, bottom: '50%' }}
                        animate={{
                            height: ['0%', '50%', '0%'],
                            opacity: [0, 1, 0]
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: i * 0.1,
                            ease: "easeInOut"
                        }}
                    />
                );
            })}

            {/* Central Weaver */}
            <div className="absolute w-12 h-12 border-2 border-cyan-500 rotate-45 flex items-center justify-center">
                <div className="w-8 h-8 bg-cyan-900 border border-cyan-300 rotate-45" />
            </div>

            <div className="absolute top-full mt-4 text-cyan-200 font-serif text-xs tracking-[0.2em] uppercase">
                Weaving Reality {Math.floor(progress)}%
            </div>
        </div>
    );
};
