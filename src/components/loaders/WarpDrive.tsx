import React, { useRef, useEffect } from 'react';
import { useProgress } from '../../hooks/useProgress';

interface LoaderProps {
    onComplete: () => void;
}

export const WarpDrive: React.FC<LoaderProps> = ({ onComplete }) => {
    const progress = useProgress(onComplete);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = canvas.width = 400;
        let height = canvas.height = 400;

        // Star particles
        const stars = Array.from({ length: 150 }).map(() => ({
            x: (Math.random() - 0.5) * width,
            y: (Math.random() - 0.5) * height,
            z: Math.random() * width
        }));

        let animationFrame: number;

        const animate = () => {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.2)'; // Trails
            ctx.fillRect(0, 0, width, height);

            const cx = width / 2;
            const cy = height / 2;

            // Speed increases with progress
            const speed = 2 + (progress / 100) * 20;

            stars.forEach(star => {
                star.z -= speed;
                if (star.z <= 0) {
                    star.x = (Math.random() - 0.5) * width;
                    star.y = (Math.random() - 0.5) * height;
                    star.z = width;
                }

                const x = (star.x / star.z) * 100 + cx;
                const y = (star.y / star.z) * 100 + cy;
                const size = (1 - star.z / width) * 4;

                ctx.fillStyle = `rgba(255, 255, 255, ${1 - star.z / width})`;
                ctx.beginPath();
                ctx.arc(x, y, size, 0, Math.PI * 2);
                ctx.fill();
            });

            animationFrame = requestAnimationFrame(animate);
        };

        animate();

        return () => cancelAnimationFrame(animationFrame);
    }, [progress]);

    return (
        <div className="relative w-[400px] h-[400px] rounded-full overflow-hidden mask-circular">
            <canvas ref={canvasRef} className="w-full h-full" />
            <div className="absolute inset-0 flex items-center justify-center font-mono text-white text-xl font-bold tracking-[0.5em] mix-blend-difference">
                HYPERSPACE
            </div>
        </div>
    );
};
