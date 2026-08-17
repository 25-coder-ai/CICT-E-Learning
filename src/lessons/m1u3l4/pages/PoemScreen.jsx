import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { POEM } from '../data/content';

const LINE_COLORS = [
  '#000099',
  '#000099',
  '#000099',
  '#000099',
  '#003399',
  '#003399',
  '#003399',
];

export default function PoemScreen({ onNext, onPrev }) {
  const [highlightLine, setHighlightLine] = useState(null);
  const [showTranslit, setShowTranslit] = useState(false);

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
      {/* Header strip */}
      <div
        style={{
          backgroundColor: '#003399',
          padding: '8px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexShrink: 0,
        }}
      >
        <div style={{ color: '#ffffff', fontSize: 18, fontWeight: 'bold', fontFamily: 'Arial Unicode MS, Arial, sans-serif' }}>
          குறுந்தொகை — பாடல் {POEM.number}
        </div>
        <div style={{ color: '#ffeeaa', fontSize: 13 }}>
          திணை: {POEM.tinai} ({POEM.tinaiEnglish}) &nbsp;|&nbsp; பாடியவர்: {POEM.poet}
        </div>
      </div>

      {/* Main content */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          gap: 0,
          overflow: 'hidden',
        }}
      >
        {/* Left decorative panel */}
        <div
          style={{
            width: 12,
            backgroundColor: '#003399',
            flexShrink: 0,
          }}
        />

        {/* Poem lines */}
        <div
          style={{
            flex: 1,
            padding: '24px 32px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: 6,
          }}
        >
          {/* Toggle transliteration */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
            <div style={{ fontSize: 13, color: '#666', fontStyle: 'italic' }}>
              Click a line to highlight •
            </div>
            <button
              onClick={() => setShowTranslit((s) => !s)}
              style={{
                fontSize: 12,
                color: '#003399',
                background: 'none',
                border: '1px solid #003399',
                borderRadius: 3,
                padding: '2px 8px',
                cursor: 'pointer',
              }}
            >
              {showTranslit ? 'Hide' : 'Show'} Transliteration
            </button>
          </div>

          {POEM.tamilLines.map((line, i) => (
            <motion.div
              key={i}
              onClick={() => setHighlightLine(highlightLine === i ? null : i)}
              whileHover={{ x: 4 }}
              style={{
                cursor: 'pointer',
                borderRadius: 3,
                padding: '4px 10px',
                backgroundColor: highlightLine === i ? '#e8f0ff' : 'transparent',
                borderLeft: highlightLine === i ? '4px solid #003399' : '4px solid transparent',
                transition: 'background-color 0.15s',
              }}
            >
              <div
                style={{
                  fontSize: 18,
                  color: LINE_COLORS[i] || '#000099',
                  fontFamily: 'Arial Unicode MS, Arial, sans-serif',
                  letterSpacing: 0.3,
                  lineHeight: 1.6,
                }}
              >
                {line}
              </div>
              <AnimatePresence>
                {showTranslit && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    style={{
                      fontSize: 13,
                      color: '#888888',
                      fontStyle: 'italic',
                      paddingTop: 2,
                    }}
                  >
                    {POEM.transliterationLines[i]}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}

          {/* Poem metadata */}
          <div
            style={{
              marginTop: 16,
              paddingTop: 12,
              borderTop: '1px solid #cccccc',
              fontSize: 13,
              color: '#999999',
              fontStyle: 'italic',
            }}
          >
            குறுந்தொகை {POEM.number} — {POEM.poet} — {POEM.tinaiEnglish}
          </div>
        </div>

        {/* Right sidebar info */}
        <div
          style={{
            width: 200,
            backgroundColor: '#f0f4ff',
            borderLeft: '1px solid #ccd6ff',
            padding: '20px 14px',
            flexShrink: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: 14,
          }}
        >
          <div style={{ fontSize: 13, fontWeight: 'bold', color: '#003399' }}>
            பாடல் விவரம்
          </div>

          {[
            ['பாடல் எண்', String(POEM.number)],
            ['பாடியவர்', POEM.poet],
            ['திணை', POEM.tinai],
            ['வகை', 'அகப்பொருள்'],
          ].map(([k, v]) => (
            <div key={k}>
              <div style={{ fontSize: 11, color: '#999999', marginBottom: 2 }}>{k}</div>
              <div
                style={{
                  fontSize: 14,
                  color: '#000099',
                  fontWeight: 'bold',
                  fontFamily: 'Arial Unicode MS, Arial, sans-serif',
                }}
              >
                {v}
              </div>
            </div>
          ))}

          {/* Highlighted line meaning */}
          <AnimatePresence>
            {highlightLine !== null && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                style={{
                  marginTop: 8,
                  backgroundColor: '#003399',
                  color: '#ffffff',
                  borderRadius: 4,
                  padding: '10px 12px',
                  fontSize: 13,
                  lineHeight: 1.5,
                }}
              >
                <div style={{ fontWeight: 'bold', marginBottom: 4, fontSize: 11, opacity: 0.8 }}>
                  வரி {highlightLine + 1} — English:
                </div>
                {POEM.englishLines[highlightLine]}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom navigation */}
      <BottomNav onNext={onNext} onPrev={onPrev} />
    </div>
  );
}

function BottomNav({ onNext, onPrev }) {
  return (
    <div
      style={{
        backgroundColor: '#eef2ff',
        borderTop: '1px solid #ccd6ff',
        padding: '8px 24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexShrink: 0,
      }}
    >
      <NavBtn onClick={onPrev} dir="prev">← முந்தைய</NavBtn>
      <NavBtn onClick={onNext} dir="next">அடுத்தது →</NavBtn>
    </div>
  );
}

function NavBtn({ onClick, children, dir }) {
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
        transition: 'background-color 0.15s, color 0.15s',
      }}
    >
      {children}
    </motion.button>
  );
}
