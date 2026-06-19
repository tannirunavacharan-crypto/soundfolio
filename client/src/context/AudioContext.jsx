import React, { createContext, useState, useEffect, useRef, useContext } from 'react';

const AudioContext = createContext();

export const AudioProvider = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playlist, setPlaylist] = useState([]);
  
  const audioRef = useRef(null);

  // Initialize Audio instance
  useEffect(() => {
    audioRef.current = new Audio();
    
    // Set volume default
    audioRef.current.volume = volume;

    // Listeners for audio state
    const onTimeUpdate = () => {
      setProgress(audioRef.current.currentTime);
    };

    const onLoadedMetadata = () => {
      setDuration(audioRef.current.duration);
    };

    const onEnded = () => {
      handleNextTrack();
    };

    const onPlay = () => {
      setIsPlaying(true);
    };

    const onPause = () => {
      setIsPlaying(false);
    };

    // Attach listeners
    audioRef.current.addEventListener('timeupdate', onTimeUpdate);
    audioRef.current.addEventListener('loadedmetadata', onLoadedMetadata);
    audioRef.current.addEventListener('ended', onEnded);
    audioRef.current.addEventListener('play', onPlay);
    audioRef.current.addEventListener('pause', onPause);

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.removeEventListener('timeupdate', onTimeUpdate);
        audioRef.current.removeEventListener('loadedmetadata', onLoadedMetadata);
        audioRef.current.removeEventListener('ended', onEnded);
        audioRef.current.removeEventListener('play', onPlay);
        audioRef.current.removeEventListener('pause', onPause);
      }
    };
  }, []);

  // Handle track URL changes
  useEffect(() => {
    if (!audioRef.current || !currentTrack) return;

    const wasPlaying = isPlaying;
    audioRef.current.src = currentTrack.audioUrl;
    audioRef.current.load();
    
    // Play automatically if selected
    audioRef.current.play()
      .then(() => {
        setIsPlaying(true);
      })
      .catch((err) => {
        console.error('Audio playback failed:', err.message);
        setIsPlaying(false);
      });
  }, [currentTrack]);

  // Adjust volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const handlePlayTrack = (track, newPlaylist = []) => {
    if (newPlaylist.length > 0) {
      setPlaylist(newPlaylist);
    }
    setCurrentTrack(track);
  };

  const handleTogglePlay = () => {
    if (!audioRef.current || !currentTrack) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          console.error('Playback resume failed:', err);
        });
    }
  };

  const handleSeek = (timeInSeconds) => {
    if (audioRef.current) {
      audioRef.current.currentTime = timeInSeconds;
      setProgress(timeInSeconds);
    }
  };

  const handleVolumeChange = (newVal) => {
    const parsedVal = Math.max(0, Math.min(1, newVal));
    setVolume(parsedVal);
    if (parsedVal > 0) {
      setIsMuted(false);
    }
  };

  const handleToggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleNextTrack = () => {
    if (playlist.length === 0 || !currentTrack) return;

    const currentIndex = playlist.findIndex((t) => t._id === currentTrack._id);
    if (currentIndex !== -1 && currentIndex < playlist.length - 1) {
      setCurrentTrack(playlist[currentIndex + 1]);
    } else if (playlist.length > 0) {
      // Loop back to first track
      setCurrentTrack(playlist[0]);
    }
  };

  const handlePrevTrack = () => {
    if (playlist.length === 0 || !currentTrack) return;

    const currentIndex = playlist.findIndex((t) => t._id === currentTrack._id);
    if (currentIndex > 0) {
      setCurrentTrack(playlist[currentIndex - 1]);
    } else if (playlist.length > 0) {
      // Go to last track
      setCurrentTrack(playlist[playlist.length - 1]);
    }
  };

  const formatTime = (timeInSeconds) => {
    if (isNaN(timeInSeconds)) return '0:00';
    const mins = Math.floor(timeInSeconds / 60);
    const secs = Math.floor(timeInSeconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <AudioContext.Provider
      value={{
        currentTrack,
        isPlaying,
        volume,
        isMuted,
        progress,
        duration,
        playlist,
        playTrack: handlePlayTrack,
        togglePlay: handleTogglePlay,
        seek: handleSeek,
        changeVolume: handleVolumeChange,
        toggleMute: handleToggleMute,
        nextTrack: handleNextTrack,
        prevTrack: handlePrevTrack,
        formatTime,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => useContext(AudioContext);
export default AudioContext;
