import React from 'react';
import { Play, Pause, Music, Disc } from 'lucide-react';
import { useAudio } from '../context/AudioContext';
import WaveformVisualizer from './WaveformVisualizer';

const TrackCard = ({ track, index, playlist = [] }) => {
  const { currentTrack, isPlaying, playTrack, togglePlay } = useAudio();

  const isCurrent = currentTrack?._id === track._id;
  const isThisPlaying = isCurrent && isPlaying;

  const handlePlayClick = () => {
    if (isCurrent) {
      togglePlay();
    } else {
      playTrack(track, playlist);
    }
  };

  return (
    <div 
      className={`glassmorphism rounded-xl p-5 flex flex-col md:flex-row gap-5 items-center justify-between transition-all duration-300 hover:border-purple-500/30 hover:scale-[1.01] hover:shadow-[0_0_20px_rgba(139,92,246,0.08)] group ${
        isCurrent ? 'border-purple-500/40 bg-purple-500/5' : ''
      }`}
    >
      <div className="flex flex-col md:flex-row gap-5 items-center w-full flex-1">
        {/* Cover Art / Icon */}
        <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 bg-zinc-900 border border-zinc-800 flex items-center justify-center group-hover:border-purple-500/20">
          {track.imageUrl ? (
            <img 
              src={track.imageUrl} 
              alt={track.title} 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <div className="text-zinc-700 flex items-center justify-center">
              {isThisPlaying ? (
                <Disc className="w-12 h-12 text-purple-400 animate-spin" />
              ) : (
                <Music className="w-12 h-12 text-zinc-600" />
              )}
            </div>
          )}
          
          {/* Quick Play Overlay */}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
            <button 
              onClick={handlePlayClick}
              className="w-10 h-10 rounded-full bg-purple-500 hover:bg-purple-600 text-white flex items-center justify-center transition-transform duration-300 hover:scale-110 shadow-lg"
              aria-label={isThisPlaying ? 'Pause track' : 'Play track'}
            >
              {isThisPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" className="ml-0.5" />}
            </button>
          </div>
        </div>

        {/* Info Area */}
        <div className="flex-1 w-full text-center md:text-left space-y-1">
          <div className="flex flex-wrap gap-2 justify-center md:justify-start items-center">
            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-purple-950/80 border border-purple-500/30 text-purple-300">
              {track.category}
            </span>
            <span className="text-xs text-zinc-500 font-medium">
              {track.genre}
            </span>
          </div>
          
          <h3 className={`text-lg font-semibold transition-colors duration-300 ${isCurrent ? 'text-purple-400' : 'group-hover:text-purple-300'}`}>
            {track.title}
          </h3>
          
          {track.description && (
            <p className="text-sm text-zinc-400 line-clamp-2 md:line-clamp-1 max-w-xl">
              {track.description}
            </p>
          )}
        </div>
      </div>

      {/* Control / Visualizer Side */}
      <div className="flex items-center gap-6 mt-3 md:mt-0 w-full md:w-auto justify-between md:justify-end border-t border-zinc-800/50 md:border-none pt-3 md:pt-0">
        <div className="flex items-center gap-2">
          {isCurrent && (
            <div className="mr-2">
              <WaveformVisualizer isPlaying={isPlaying} barCount={10} color={isThisPlaying ? 'purple' : 'gold'} />
            </div>
          )}
          <span className="text-sm text-zinc-500 font-mono">
            {track.duration || '0:00'}
          </span>
        </div>

        <button
          onClick={handlePlayClick}
          className={`px-4 py-2 rounded-full border text-xs font-semibold uppercase tracking-wider flex items-center gap-2 transition-all duration-300 ${
            isCurrent
              ? 'bg-purple-600 border-purple-500 text-white shadow-lg shadow-purple-500/20'
              : 'border-zinc-700 text-zinc-300 hover:border-purple-500/50 hover:text-purple-400 hover:bg-purple-500/5'
          }`}
        >
          {isThisPlaying ? (
            <>
              <Pause size={14} fill="currentColor" />
              <span>Playing</span>
            </>
          ) : (
            <>
              <Play size={14} fill="currentColor" className="ml-0.5" />
              <span>{isCurrent ? 'Resume' : 'Play Now'}</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default TrackCard;
