import { useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ClassicBar,
  Spinner,
  PercentCount,
  Pulse,
  PixelRetro,
  LiquidFill,
  Orbital,
  TypingTerminal,
  HexagonGrid,
  BouncingBall,
  AnimusFragment,
  RadarSweep,
  SheikahSlate,
  WarpDrive,
  TetrisStack,
  DNAHelix,
  D20Roll,
  BreathBar,
  GlitchText,
  NewtonsCradle,
  TheLoom,
  Holomap,
  SummoningCircle,
  ItemGet,
  PipBoy,
  TheLantern,
  BlueprintBuild,
  ComboMeter,
  CardShuffle,
  ThePortal
} from './components/loaders';
import { useLongPressExit } from './hooks/useLongPressExit';
import clsx from 'clsx';

const LOADERS = [
  ClassicBar,
  Spinner,
  PercentCount,
  Pulse,
  PixelRetro,
  LiquidFill,
  Orbital,
  TypingTerminal,
  HexagonGrid,
  BouncingBall,
  AnimusFragment,
  RadarSweep,
  SheikahSlate,
  WarpDrive,
  TetrisStack,
  DNAHelix,
  D20Roll,
  BreathBar,
  GlitchText,
  NewtonsCradle,
  TheLoom,
  Holomap,
  SummoningCircle,
  ItemGet,
  PipBoy,
  TheLantern,
  BlueprintBuild,
  ComboMeter,
  CardShuffle,
  ThePortal
];

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // PRD Requirement: "hold for 10 continuous seconds"
  const longPress = useLongPressExit(10000);

  const handleComplete = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % LOADERS.length);
  }, []);

  const ActiveLoader = LOADERS[currentIndex];

  return (
    <div
      className="relative w-full h-screen overflow-hidden flex items-center justify-center select-none"
      onMouseDown={longPress.startHold}
      onMouseUp={longPress.cancelHold}
      onMouseLeave={longPress.cancelHold}
      onTouchStart={longPress.startHold}
      onTouchEnd={longPress.cancelHold}
    >
      {/* Hold Indicator Overlay */}
      <AnimatePresence>
        {longPress.isHolding && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[2px]"
          >
            <div className="relative flex flex-col items-center">
              <svg className="w-32 h-32 transform -rotate-90">
                <circle
                  cx="64"
                  cy="64"
                  r="60"
                  stroke="rgba(255,255,255,0.2)"
                  strokeWidth="8"
                  fill="none"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="60"
                  stroke="white"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={2 * Math.PI * 60}
                  strokeDashoffset={(2 * Math.PI * 60) * (1 - longPress.holdProgress / 100)}
                  strokeLinecap="round"
                  className="transition-all duration-75 ease-linear"
                />
              </svg>
              <div className="mt-4 font-mono text-white text-sm tracking-widest uppercase animate-pulse">
                Hold to Exit...
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Visual Content */}
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.div
          key={currentIndex}
          initial={{ x: '100%', opacity: 0, scale: 0.9 }}
          animate={{ x: 0, opacity: 1, scale: 1 }}
          exit={{ x: '-100%', opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
          className="absolute inset-0 flex items-center justify-center p-8 pointer-events-none"
        >
          <ActiveLoader onComplete={handleComplete} />
        </motion.div>
      </AnimatePresence>

      {/* Maximize Button - Fade out when fullscreen */}
      <button
        onClick={longPress.enterFullscreen}
        className={clsx(
          "absolute bottom-8 right-8 p-3 text-white/50 hover:text-white cursor-pointer transition-all duration-500 hover:bg-white/10 rounded-full z-40",
          longPress.isFullscreen ? "opacity-0 pointer-events-none translate-y-10" : "opacity-100"
        )}
        title="Enter Fullscreen"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
        </svg>
      </button>

      {/* Helper text for non-fullscreen state */}
      {!longPress.isFullscreen && (
        <div className="absolute bottom-8 left-8 text-white/30 text-xs font-mono">
          V1.0 • PRESS BUTTON FOR IMMERSION
        </div>
      )}
    </div>
  );
}

export default App;
