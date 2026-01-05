import React, { useMemo } from 'react';
import { useProgress } from '../../hooks/useProgress';

interface LoaderProps {
    onComplete: () => void;
}

const LOG_LINES = [
    "Initializing core...",
    "Loading assets...",
    "Connecting to server...",
    "Downloading resources...",
    "Optimizing graphics...",
    "Compiling shaders...",
    "Verifying integrity...",
    "Finalizing setup...",
    "System ready."
];

export const TypingTerminal: React.FC<LoaderProps> = ({ onComplete }) => {
    const progress = useProgress(onComplete);

    // Calculate how many lines to show based on progress
    const lineCount = Math.floor((progress / 100) * LOG_LINES.length);
    const visibleLines = LOG_LINES.slice(0, Math.max(1, lineCount));

    return (
        <div className="w-80 h-64 bg-black border-2 border-green-500 rounded p-4 font-mono text-xs overflow-hidden shadow-[0_0_20px_rgba(34,197,94,0.3)]">
            <div className="flex flex-col gap-1 text-green-500">
                {visibleLines.map((line, i) => (
                    <div key={i} className="flex">
                        <span className="mr-2 opacity-50">root@sys:~#</span>
                        <span className="typing-effect">{line} {i === visibleLines.length - 1 && <span className="animate-pulse">_</span>}</span>
                    </div>
                ))}
            </div>
            <div className="mt-4 w-full h-1 bg-green-900 rounded-full overflow-hidden">
                <div
                    className="h-full bg-green-500"
                    style={{ width: `${progress}%` }}
                />
            </div>
        </div>
    );
};
