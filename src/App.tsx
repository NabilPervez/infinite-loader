import { useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ClassicBar, Spinner, PercentCount } from './components/loaders';

const LOADERS = [
  ClassicBar,
  Spinner,
  PercentCount,
];

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleComplete = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % LOADERS.length);
  }, []);

  const ActiveLoader = LOADERS[currentIndex];

  return (
    <div className="relative w-full h-screen overflow-hidden flex items-center justify-center">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.div
          key={currentIndex}
          initial={{ x: '100%', opacity: 0, scale: 0.9 }}
          animate={{ x: 0, opacity: 1, scale: 1 }}
          exit={{ x: '-100%', opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }} // Smooth ease
          className="absolute inset-0 flex items-center justify-center p-8"
        >
          <ActiveLoader onComplete={handleComplete} />
        </motion.div>
      </AnimatePresence>

      {/* Overlay UI (Maximize button placeholder) */}
      <button
        className="absolute bottom-8 right-8 p-3 text-white/50 hover:text-white cursor-pointer transition-colors hover:bg-white/10 rounded-full"
        title="Fullscreen"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
        </svg>
      </button>
    </div>
  );
}

export default App;
