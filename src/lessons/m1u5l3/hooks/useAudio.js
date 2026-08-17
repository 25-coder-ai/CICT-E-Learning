import { useRef, useState, useCallback } from 'react';

// Audio placeholder hook — audio files not extracted from SWF
// Drop .mp3 files into src/assets/audio/ to enable playback
export function useAudio(src) {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolumeState] = useState(1);

  const play = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.play().then(() => setPlaying(true)).catch(() => {});
    }
  }, []);

  const pause = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      setPlaying(false);
    }
  }, []);

  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setPlaying(false);
    }
  }, []);

  const setVolume = useCallback((v) => {
    setVolumeState(v);
    if (audioRef.current) audioRef.current.volume = v;
  }, []);

  return { audioRef, playing, volume, play, pause, stop, setVolume };
}
