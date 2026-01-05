import React from 'react';
import { useProgress } from '../../hooks/useProgress';

interface LoaderProps {
    onComplete: () => void;
}

export const BreathBar: React.FC<LoaderProps> = ({ onComplete }) => {
    const progress = useProgress(onComplete);

    return (
        <div className="w-80">
            {/* Gothic Ornament Frame */}
            <div className="border-x-8 border-y-2 border-double border-yellow-700/50 bg-black/80 p-1 relative">
                <div className="absolute -left-4 -top-4 text-4xl text-yellow-600">⚜</div>
                <div className="absolute -right-4 -top-4 text-4xl text-yellow-600">⚜</div>

                <div className="h-6 w-full bg-red-900/30 relative overflow-hidden">
                    {/* The Stamina/Health Fill */}
                    <div
                        className="h-full bg-gradient-to-r from-yellow-600 to-yellow-200 transition-all duration-100 ease-out"
                        style={{
                            width: `${progress}%`,
                            boxShadow: '0 0 15px rgba(234, 179, 8, 0.5)'
                        }}
                    />
                    {/* Burn effect overlay */}
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
                </div>
            </div>

            <div className="text-center mt-2 font-serif text-yellow-700 tracking-widest text-xs uppercase">
                Restoring Humanity
            </div>
        </div>
    );
};
