import React, { useState, useRef, useEffect, useCallback } from 'react';
import { PlayIcon, PauseIcon, StopIcon } from './icons';

const AudioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handlePlayPause = useCallback(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
  }, [isPlaying]);

  const handleStop = useCallback(() => {
    if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
    }
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onCanPlay = () => setIsReady(true);
    
    if (audio.readyState >= 2) { // HAVE_CURRENT_DATA or more
        setIsReady(true);
    }

    audio.addEventListener('play', onPlay);
    audio.addEventListener('pause', onPause);
    audio.addEventListener('ended', onPause);
    audio.addEventListener('canplay', onCanPlay);

    return () => {
      audio.removeEventListener('play', onPlay);
      audio.removeEventListener('pause', onPause);
      audio.removeEventListener('ended', onPause);
      audio.removeEventListener('canplay', onCanPlay);
    }
  }, []);
  
  const isStopped = !isPlaying && audioRef.current?.currentTime === 0;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 flex items-center space-x-6">
      <audio ref={audioRef} src="/podcast.wav" preload="metadata" style={{ display: 'none' }}></audio>
      <div className="flex-shrink-0">
        <img className="h-24 w-24 rounded-full object-cover" src="https://picsum.photos/seed/dinosaur/200" alt="Dinosaur illustration" />
      </div>
      <div className="flex-1">
        <div className="flex items-center space-x-3">
          <p className="text-xl font-bold text-slate-800">Écouter le podcast</p>
          {isPlaying && <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>}
        </div>
        <p className="text-slate-500">Prêt pour un voyage dans le temps ?</p>
        <div className="mt-4 flex items-center space-x-4">
          <button
            onClick={handlePlayPause}
            disabled={!isReady}
            className="flex items-center justify-center w-12 h-12 bg-teal-500 text-white rounded-full hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-transform transform hover:scale-105 disabled:bg-slate-300 disabled:cursor-not-allowed"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? <PauseIcon className="w-6 h-6" /> : <PlayIcon className="w-6 h-6" />}
          </button>
           <button
            onClick={handleStop}
            disabled={isStopped || !isReady}
            className="flex items-center justify-center w-10 h-10 bg-slate-200 text-slate-600 rounded-full hover:bg-slate-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-400 disabled:bg-slate-100 disabled:text-slate-300 disabled:cursor-not-allowed"
            aria-label="Stop"
          >
            <StopIcon className="w-5 h-5" />
          </button>
        </div>
        {!isReady && <p className="text-xs text-slate-500 mt-2">Chargement de l'audio...</p>}
      </div>
    </div>
  );
};

export default AudioPlayer;
