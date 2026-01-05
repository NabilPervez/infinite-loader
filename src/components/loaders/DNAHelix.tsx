import React from 'react';
import { useProgress } from '../../hooks/useProgress';
import { motion } from 'framer-motion';

interface LoaderProps {
    onComplete: () => void;
}

export const DNAHelix: React.FC<LoaderProps> = ({ onComplete }) => {
    const progress = useProgress(onComplete);
    const dots = 20;

    return (
        <div className="relative h-48 w-32 flex items-center justify-center">
            {Array.from({ length: dots }).map((_, i) => {
                // Calculate vertical position
                const y = (i / dots) * 200 - 100;

                // Progress determines speed of rotation
                const speed = 1 + (progress / 50);

                return (
                    <React.Fragment key={i}>
                        {/* Strand 1 */}
                        <motion.div
                            className="absolute w-3 h-3 bg-red-500 rounded-full shadow-[0_0_5px_red]"
                            animate={{
                                x: [-30, 30, -30],
                                scale: [0.8, 1.2, 0.8],
                                opacity: [0.5, 1, 0.5],
                                zIndex: [0, 10, 0]
                            }}
                            transition={{
                                duration: 2 / speed,
                                repeat: Infinity,
                                ease: "linear",
                                delay: i * 0.1
                            }}
                            style={{ top: `calc(50% + ${y}px)` }}
                        />
                        {/* Strand 2 (Offset) */}
                        <motion.div
                            className="absolute w-3 h-3 bg-blue-500 rounded-full shadow-[0_0_5px_blue]"
                            animate={{
                                x: [30, -30, 30],
                                scale: [0.8, 1.2, 0.8],
                                opacity: [0.5, 1, 0.5],
                                zIndex: [10, 0, 10]
                            }}
                            transition={{
                                duration: 2 / speed,
                                repeat: Infinity,
                                ease: "linear",
                                delay: i * 0.1
                            }}
                            style={{ top: `calc(50% + ${y}px)` }}
                        />

                        {/* Connector Lines (optional) */}
                        <motion.div
                            className="absolute h-[1px] bg-white/20"
                            style={{ top: `calc(50% + ${y + 6}px)` }}
                            animate={{ width: [0, 60, 0], x: [-30, 0, 30], opacity: [0, 0.5, 0] }} // Simplified visually
                        // Actually connecting moving dots is hard without SVG. Skipping connectors for clearer visual.
                        />
                    </React.Fragment>
                );
            })}

            <div className="absolute -bottom-12 font-mono text-xs text-white/50 tracking-widest">
                SEQUENCING GENOME... {Math.floor(progress)}%
            </div>
        </div>
    );
};
