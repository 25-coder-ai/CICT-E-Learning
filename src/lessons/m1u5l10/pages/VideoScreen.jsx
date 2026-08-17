import { motion } from 'framer-motion';
import VideoPlayer from '../components/VideoPlayer';
import { POEM } from '../data/content';
import bgCollage from '../assets/images/background-collage.jpg';

export default function VideoScreen({ onNext, onPrev }) {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <div
        style={{
          backgroundColor: '#003399',
          padding: '8px 24px',
          flexShrink: 0,
        }}
      >
        <div style={{ color: '#ffffff', fontSize: 18, fontWeight: 'bold', fontFamily: 'Arial Unicode MS, Arial, sans-serif' }}>
          ஒலிப்பதிவு — Audio Recitation
        </div>
        <div style={{ color: '#aabbff', fontSize: 12 }}>
          குறுந்தொகை {POEM.number} — {POEM.poet} ({POEM.tinaiEnglish})
        </div>
      </div>

      {/* Content */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          gap: 20,
          padding: '20px 24px',
          overflow: 'hidden',
        }}
      >
        {/* Left: Video player + poem display */}
        <div style={{ flex: 1.2, display: 'flex', flexDirection: 'column', gap: 14 }}>
          {/* Video/Audio player - styled like Flash FLVPlayback */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <VideoPlayer
              src={null}
              title={`குறுந்தொகை ${POEM.number}`}
            />
          </motion.div>

          {/* Placeholder note */}
          <div
            style={{
              backgroundColor: '#fffbf0',
              border: '1px solid #ffe0a0',
              borderRadius: 4,
              padding: '10px 14px',
              fontSize: 13,
              color: '#886600',
            }}
          >
            <strong>Audio Placeholder:</strong> Place <code>narration-kt-167.mp3</code> in{' '}
            <code>public/audio/</code> to enable audio playback.
          </div>
        </div>

        {/* Right: Poem alongside */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: 14,
          }}
        >
          {/* Background image thumbnail */}
          <div
            style={{
              height: 90,
              borderRadius: 4,
              overflow: 'hidden',
              border: '2px solid #003399',
              position: 'relative',
            }}
          >
            <img
              src={bgCollage}
              alt=""
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to bottom, transparent 30%, rgba(0,0,30,0.7) 100%)',
                display: 'flex',
                alignItems: 'flex-end',
                padding: '8px 12px',
              }}
            >
              <div style={{ color: '#ffffff', fontWeight: 'bold', fontSize: 15, fontFamily: 'Arial Unicode MS, Arial, sans-serif' }}>
                குறுந்தொகை {POEM.number}
              </div>
            </div>
          </div>

          {/* Poem text in sync panel */}
          <div
            style={{
              backgroundColor: '#f0f4ff',
              border: '1px solid #ccd6ff',
              borderRadius: 4,
              padding: '14px 16px',
              flex: 1,
              overflowY: 'auto',
            }}
          >
            <div
              style={{
                fontSize: 13,
                fontWeight: 'bold',
                color: '#666',
                marginBottom: 10,
                borderBottom: '1px solid #ccd6ff',
                paddingBottom: 6,
              }}
            >
              பாடல் (Follow along)
            </div>
            {POEM.tamilLines.map((line, i) => (
              <div
                key={i}
                style={{
                  fontSize: 16,
                  color: '#000099',
                  fontFamily: 'Arial Unicode MS, Arial, sans-serif',
                  lineHeight: 2,
                }}
              >
                {line}
              </div>
            ))}
          </div>

          {/* English translation */}
          <div
            style={{
              backgroundColor: '#fff8f0',
              border: '1px solid #ffd9b3',
              borderRadius: 4,
              padding: '12px 16px',
            }}
          >
            <div
              style={{
                fontSize: 12,
                fontWeight: 'bold',
                color: '#999',
                marginBottom: 6,
                textTransform: 'uppercase',
              }}
            >
              Translation
            </div>
            {POEM.englishLines.slice(0, 4).map((line, i) => (
              <div
                key={i}
                style={{
                  fontSize: 13,
                  color: '#550000',
                  lineHeight: 1.7,
                  fontStyle: 'italic',
                }}
              >
                {line}
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom nav */}
      <div
        style={{
          backgroundColor: '#eef2ff',
          borderTop: '1px solid #ccd6ff',
          padding: '8px 24px',
          display: 'flex',
          justifyContent: 'space-between',
          flexShrink: 0,
        }}
      >
        <NavBtn onClick={onPrev}>← முந்தைய</NavBtn>
        <NavBtn onClick={onNext}>வினாக்களுக்கு செல் →</NavBtn>
      </div>
    </div>
  );
}

function NavBtn({ onClick, children }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ backgroundColor: '#003399', color: '#ffffff' }}
      whileTap={{ scale: 0.96 }}
      style={{
        backgroundColor: '#ffffff',
        color: '#003399',
        border: '1px solid #003399',
        borderRadius: 4,
        padding: '7px 20px',
        fontSize: 14,
        fontWeight: 'bold',
        cursor: 'pointer',
        fontFamily: 'Arial Unicode MS, Arial, sans-serif',
        transition: 'all 0.15s',
      }}
    >
      {children}
    </motion.button>
  );
}
