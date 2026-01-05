import React from 'react';
import { useProgress } from '../../hooks/useProgress';
import { motion } from 'framer-motion';

interface LoaderProps {
    onComplete: () => void;
}

export const AnimusFragment: React.FC<LoaderProps> = ({ onComplete }) => {
    const progress = useProgress(onComplete);

    // Generate shards
    const shards = Array.from({ length: 12 });

    return (
        <div className="relative w-64 h-64 flex items-center justify-center perspective-[1000px]">
            <motion.div
                className="relative w-full h-full transform-style-3d"
                animate={{ rotateY: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            >
                {shards.map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute top-1/2 left-1/2 w-8 h-16 bg-white/20 border border-white/40 backdrop-blur-md"
                        style={{
                            clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)',
                            transformOrigin: 'center center',
                        }}
                        initial={{
                            x: (Math.random() - 0.5) * 200,
                            y: (Math.random() - 0.5) * 200,
                            z: (Math.random() - 0.5) * 300,
                            rotateX: Math.random() * 360,
                            rotateY: Math.random() * 360,
                            opacity: 0
                        }}
                        animate={{
                            x: 0,
                            y: 0,
                            z: 0,
                            rotateX: 0,
                            rotateY: 0,
                            opacity: 1,
                            scale: [1, 0] // Disappear into center? or Form a shape? Let's Form a shape then fade out
                        }}
                        transition={{
                            duration: 3 + Math.random() * 2,
                            repeat: Infinity,
                            repeatType: "reverse",
                            ease: "easeInOut"
                        }}
                    />
                ))}

                <div className="absolute inset-0 flex items-center justify-center transform-style-3d">
                    <div className="text-white font-mono text-sm tracking-[0.3em] bg-black/50 px-2">
                        SYNCHRONIZING {Math.floor(progress)}%
                    </div>
                </div>
            </motion.div>
        </div>
    );
};
