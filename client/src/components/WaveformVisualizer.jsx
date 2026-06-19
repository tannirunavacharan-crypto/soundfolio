import React from 'react';
import { motion } from 'framer-motion';

const WaveformVisualizer = ({ isPlaying = false, barCount = 15, color = 'purple' }) => {
  const bars = Array.from({ length: barCount }, (_, i) => i);
  
  // Set heights for bars when active vs idle
  const activeDurations = [0.8, 1.1, 0.9, 1.3, 0.7, 1.2, 1.0, 0.85, 1.4, 0.75, 1.1, 0.95, 1.25, 0.8, 1.05];
  const activeHeights = [80, 50, 95, 40, 75, 90, 60, 85, 45, 70, 85, 50, 95, 65, 80];

  const getColorClasses = () => {
    if (color === 'gold') {
      return 'bg-gradient-to-t from-amber-600 to-yellow-400 shadow-[0_0_8px_rgba(251,191,36,0.5)]';
    }
    return 'bg-gradient-to-t from-purple-700 to-purple-400 shadow-[0_0_8px_rgba(139,92,246,0.6)]';
  };

  return (
    <div className="flex items-end justify-center gap-[3px] h-12 px-2 overflow-hidden w-fit">
      {bars.map((bar, index) => {
        const duration = activeDurations[index % activeDurations.length];
        const activeHeight = activeHeights[index % activeHeights.length];

        return (
          <motion.div
            key={bar}
            className={`w-[3px] rounded-full ${getColorClasses()}`}
            initial={{ height: '15%' }}
            animate={
              isPlaying
                ? {
                    height: [`15%`, `${activeHeight}%`, `15%`],
                  }
                : {
                    height: '15%',
                  }
            }
            transition={
              isPlaying
                ? {
                    duration: duration,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: index * 0.04,
                  }
                : {
                    duration: 0.5,
                  }
            }
          />
        );
      })}
    </div>
  );
};

export default WaveformVisualizer;
