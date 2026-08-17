import { useState, useRef } from 'react';
import { motion } from 'framer-motion';

// Styled to match the Flash FLVPlayback component appearance
// Audio/Video files should be placed in public/ folder for browser playback
export default function VideoPlayer({ src, title }) {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(80);
  const [muted, setMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const handlePlayPause = () => {
    if (!videoRef.current) return;
    if (playing) {
      videoRef.current.pause();
    } else {
      videoRef.current.play().catch(() => {});
    }
    setPlaying(!playing);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const pct = (videoRef.current.currentTime / videoRef.current.duration) * 100 || 0;
    setProgress(pct);
    setCurrentTime(videoRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) setDuration(videoRef.current.duration);
  };

  const handleSeek = (e) => {
    if (!videoRef.current || !videoRef.current.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    videoRef.current.currentTime = pct * videoRef.current.duration;
  };

  const handleVolumeChange = (e) => {
    const val = Number(e.target.value);
    setVolume(val);
    if (videoRef.current) videoRef.current.volume = val / 100;
  };

  const handleMute = () => {
    setMuted((m) => {
      if (videoRef.current) videoRef.current.muted = !m;
      return !m;
    });
  };

  const formatTime = (s) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, '0')}`;
  };

  return (
    <div
      style={{
        backgroundColor: '#000000',
        border: '1px solid #333',
        borderRadius: 2,
        overflow: 'hidden',
        width: '100%',
      }}
    >
      {/* Video area */}
      <div
        style={{
          backgroundColor: '#000000',
          height: 220,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        {src ? (
          <video
            ref={videoRef}
            src={src}
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onEnded={() => setPlaying(false)}
          />
        ) : (
          <div className="flex flex-col items-center gap-2">
            <div style={{ fontSize: 36, color: '#555' }}>▶</div>
            <div style={{ fontSize: 11, color: '#555', textAlign: 'center' }}>
              Audio recitation
              <br />
              {title}
            </div>
          </div>
        )}

        {/* Play overlay on click */}
        {!src && (
          <motion.button
            onClick={handlePlayPause}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            style={{
              position: 'absolute',
              width: 52,
              height: 52,
              borderRadius: '50%',
              backgroundColor: 'rgba(0,51,153,0.85)',
              border: '2px solid #4488ff',
              color: '#ffffff',
              fontSize: 20,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {playing ? '⏸' : '▶'}
          </motion.button>
        )}
      </div>

      {/* Controls bar — matches Flash MediaController */}
      <div
        style={{
          backgroundColor: '#1a1a3e',
          padding: '4px 8px',
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
        }}
      >
        {/* Seek / progress bar */}
        <div
          onClick={handleSeek}
          style={{
            height: 8,
            backgroundColor: '#333355',
            borderRadius: 4,
            cursor: 'pointer',
            position: 'relative',
          }}
        >
          {/* Load bar (always full for local files) */}
          <div
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              height: '100%',
              width: '100%',
              backgroundColor: '#224',
              borderRadius: 4,
            }}
          />
          {/* Play progress */}
          <div
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              height: '100%',
              width: `${progress}%`,
              background: 'linear-gradient(to right, #003399, #0066ff)',
              borderRadius: 4,
              transition: 'width 0.1s linear',
            }}
          />
          {/* Thumb */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: `${progress}%`,
              transform: 'translate(-50%, -50%)',
              width: 12,
              height: 12,
              backgroundColor: '#aaccff',
              borderRadius: '50%',
              border: '1px solid #003399',
            }}
          />
        </div>

        {/* Button row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          {/* To Start */}
          <ControlBtn onClick={() => { if (videoRef.current) { videoRef.current.currentTime = 0; } }} title="To Start">
            ⏮
          </ControlBtn>

          {/* Play/Pause */}
          <ControlBtn onClick={handlePlayPause} title={playing ? 'Pause' : 'Play'} active>
            {playing ? '⏸' : '▶'}
          </ControlBtn>

          {/* To End */}
          <ControlBtn onClick={() => { if (videoRef.current) videoRef.current.currentTime = videoRef.current.duration; }} title="To End">
            ⏭
          </ControlBtn>

          {/* Time display */}
          <div
            style={{
              flex: 1,
              color: '#aaaacc',
              fontSize: 11,
              paddingLeft: 4,
              fontFamily: 'monospace',
            }}
          >
            {formatTime(currentTime)} / {formatTime(duration)}
          </div>

          {/* Mute button */}
          <ControlBtn onClick={handleMute} title={muted ? 'Unmute' : 'Mute'}>
            {muted ? '🔇' : '🔊'}
          </ControlBtn>

          {/* Volume bar */}
          <input
            type="range"
            min="0"
            max="100"
            value={muted ? 0 : volume}
            onChange={handleVolumeChange}
            style={{
              width: 60,
              accentColor: '#003399',
              cursor: 'pointer',
            }}
          />
        </div>
      </div>
    </div>
  );
}

function ControlBtn({ children, onClick, title, active }) {
  return (
    <motion.button
      onClick={onClick}
      title={title}
      whileHover={{ backgroundColor: '#003399' }}
      whileTap={{ scale: 0.9 }}
      style={{
        background: active ? 'linear-gradient(to bottom, #002288, #001155)' : 'transparent',
        border: '1px solid #334466',
        borderRadius: 3,
        color: '#aaccff',
        cursor: 'pointer',
        fontSize: 13,
        width: 26,
        height: 22,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 0,
      }}
    >
      {children}
    </motion.button>
  );
}
