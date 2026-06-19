import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, Pause, SkipForward, SkipBack, 
  Volume2, VolumeX, Maximize2, Minimize2, Music, Disc 
} from 'lucide-react';
import { useAudio } from '../context/AudioContext';

const AudioPlayer = () => {
  const {
    currentTrack,
    isPlaying,
    volume,
    isMuted,
    progress,
    duration,
    togglePlay,
    seek,
    changeVolume,
    toggleMute,
    nextTrack,
    prevTrack,
    formatTime,
  } = useAudio();

  const [isExpanded, setIsExpanded] = useState(true);

  if (!currentTrack) return null;

  const progressPercent = duration > 0 ? (progress / duration) * 100 : 0;

  const handleProgressBarChange = (e) => {
    const time = parseFloat(e.target.value);
    seek(time);
  };

  const handleVolumeSliderChange = (e) => {
    const vol = parseFloat(e.target.value);
    changeVolume(vol);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 150, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 150, opacity: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 120 }}
        className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-4"
      >
        <div className="max-w-7xl mx-auto bg-zinc-900/90 border border-zinc-800 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden shadow-purple-500/5">
          {/* Header toggle for mobile collapse */}
          <div className="flex md:hidden justify-end px-4 pt-2">
            <button 
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-zinc-500 hover:text-white"
            >
              {isExpanded ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
            </button>
          </div>

          <div className={`p-4 flex flex-col md:flex-row gap-4 items-center justify-between ${
            !isExpanded ? 'hidden md:flex' : 'flex'
          }`}>
            
            {/* Left Zone: Details */}
            <div className="flex items-center gap-3 w-full md:w-1/3">
              <div className="relative w-12 h-12 rounded-lg bg-zinc-950 border border-zinc-800 overflow-hidden flex-shrink-0 flex items-center justify-center">
                {currentTrack.imageUrl ? (
                  <img 
                    src={currentTrack.imageUrl} 
                    alt={currentTrack.title} 
                    className={`w-full h-full object-cover ${isPlaying ? 'animate-pulse-slow' : ''}`}
                  />
                ) : (
                  <div className="text-purple-400">
                    <Disc className={`w-6 h-6 ${isPlaying ? 'animate-spin' : ''}`} />
                  </div>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="text-sm font-semibold text-white truncate">{currentTrack.title}</h4>
                <p className="text-xs text-zinc-400 truncate">{currentTrack.genre || 'SoundFolio original'}</p>
              </div>
            </div>

            {/* Center Zone: Control Bar */}
            <div className="flex flex-col items-center gap-2 w-full md:w-1/3 max-w-lg">
              <div className="flex items-center gap-5">
                <button
                  onClick={prevTrack}
                  className="text-zinc-400 hover:text-white transition-colors"
                  aria-label="Previous track"
                >
                  <SkipBack size={18} fill="currentColor" />
                </button>
                <button
                  onClick={togglePlay}
                  className="w-10 h-10 rounded-full bg-white text-zinc-950 flex items-center justify-center hover:scale-105 transition-transform"
                  aria-label={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" className="ml-0.5" />}
                </button>
                <button
                  onClick={nextTrack}
                  className="text-zinc-400 hover:text-white transition-colors"
                  aria-label="Next track"
                >
                  <SkipForward size={18} fill="currentColor" />
                </button>
              </div>

              {/* Progress Slider */}
              <div className="flex items-center gap-3 w-full">
                <span className="text-[10px] font-mono text-zinc-500 w-8 text-right">
                  {formatTime(progress)}
                </span>
                <div className="relative flex-1 group py-2">
                  <input
                    type="range"
                    min={0}
                    max={duration || 100}
                    value={progress}
                    onChange={handleProgressBarChange}
                    className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-purple-500 hover:accent-purple-400 focus:outline-none"
                    style={{
                      background: `linear-gradient(to right, #8b5cf6 0%, #8b5cf6 ${progressPercent}%, #27272a ${progressPercent}%, #27272a 100%)`
                    }}
                  />
                </div>
                <span className="text-[10px] font-mono text-zinc-500 w-8">
                  {formatTime(duration)}
                </span>
              </div>
            </div>

            {/* Right Zone: Extra Controls (Mute/Volume) */}
            <div className="hidden md:flex items-center justify-end gap-3 w-1/3">
              <button
                onClick={toggleMute}
                className="text-zinc-400 hover:text-white transition-colors"
                aria-label="Mute toggle"
              >
                {isMuted || volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
              </button>
              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={isMuted ? 0 : volume}
                onChange={handleVolumeSliderChange}
                className="w-20 h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-purple-500 hover:accent-purple-400 focus:outline-none"
                style={{
                  background: `linear-gradient(to right, #8b5cf6 0%, #8b5cf6 ${isMuted ? 0 : volume * 100}%, #27272a ${isMuted ? 0 : volume * 100}%, #27272a 100%)`
                }}
              />
            </div>

          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AudioPlayer;
