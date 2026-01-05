import React from 'react';
import { useProgress } from '../../hooks/useProgress';

interface LoaderProps {
    onComplete: () => void;
}

export const BouncingBall: React.FC<LoaderProps> = ({ onComplete }) => {
    const progress = useProgress(onComplete);

    // Calculate bounce physics simulation based on progress (0-100)
    // X moves linearly from left to right
    // Y uses absolute sin wave to simulate bounce, with decaying height maybe? 
    // Let's just do consistent bounces for infinite feel.

    const bounces = 5;
    const progressNormalized = progress / 100;

    // Determine current bounce cycle
    const currentBounce = Math.floor(progressNormalized * bounces);
    const bounceProgress = (progressNormalized * bounces) % 1;

    // Parabolic arc for bounce: y = 4 * h * x * (1-x)
    // We want it to hit floor (y=0) at start/end of bounce
    const height = 100; // max height in px
    const y = Math.abs(Math.sin(progressNormalized * Math.PI * bounces)) * height;

    const x = progressNormalized * 100; // 0% to 100% of container width

    return (
        <div className="relative w-full max-w-md h-48 border-b-2 border-white/30 px-4">
            {/* Ball */}
            <div
                className="absolute w-8 h-8 bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.8)] bottom-0"
                style={{
                    left: `calc(${x}% - 16px)`,
                    bottom: `${y}px`,
                    transform: `scaleY(${1 - (y / height) * 0.2 + (y < 10 ? 0.3 : 0)}) scaleX(${1 + (y / height) * 0.1 - (y < 10 ? 0.2 : 0)})` // Squash and stretch
                }}
            />

            {/* Trajectory dots (optional visual) */}
            <div className="absolute bottom-0 w-full h-full pointer-events-none opacity-20">
                <svg width="100%" height="100%">
                    {/* Could render path here but maybe overkill */}
                </svg>
            </div>

            <div className="float-right mt-2 text-xs font-mono text-right text-white/70">
                BOUNCE_COUNT: {currentBounce}/{bounces} <br />
                PROGRESS: {Math.floor(progress)}%
            </div>
        </div>
    );
};
