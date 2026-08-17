import { motion } from 'framer-motion';
import { POEM } from '../data/content';

export default function TranslationScreen({ onNext, onPrev }) {
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
          backgroundColor: '#000099',
          padding: '8px 24px',
          flexShrink: 0,
        }}
      >
        <div style={{ color: '#ffffff', fontSize: 18, fontWeight: 'bold', fontFamily: 'Arial Unicode MS, Arial, sans-serif' }}>
          மொழிபெயர்ப்பு — Translation
        </div>
        <div style={{ color: '#aabbff', fontSize: 12 }}>
          Kuruntokai {POEM.number} — {POEM.poetEnglish}
        </div>
      </div>

      {/* Content */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          padding: '20px 24px',
          gap: 24,
          overflow: 'hidden',
        }}
      >
        {/* Tamil column */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            flex: 1,
            backgroundColor: '#f0f4ff',
            border: '1px solid #ccd6ff',
            borderRadius: 4,
            padding: '16px 20px',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div
            style={{
              fontSize: 13,
              fontWeight: 'bold',
              color: '#666',
              marginBottom: 12,
              textTransform: 'uppercase',
              letterSpacing: 1,
              borderBottom: '2px solid #003399',
              paddingBottom: 6,
            }}
          >
            தமிழ் மூலம் (Tamil Original)
          </div>
          <div style={{ flex: 1 }}>
            {POEM.tamilLines.map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                style={{
                  fontSize: 18,
                  color: '#000099',
                  fontFamily: 'Arial Unicode MS, Arial, sans-serif',
                  lineHeight: 2,
                  borderBottom: i < POEM.tamilLines.length - 1 ? '1px dashed #dde' : 'none',
                  padding: '4px 0',
                }}
              >
                {line}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* English column */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          style={{
            flex: 1,
            backgroundColor: '#fff8f0',
            border: '1px solid #ffd9b3',
            borderRadius: 4,
            padding: '16px 20px',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div
            style={{
              fontSize: 13,
              fontWeight: 'bold',
              color: '#666',
              marginBottom: 12,
              textTransform: 'uppercase',
              letterSpacing: 1,
              borderBottom: '2px solid #990000',
              paddingBottom: 6,
            }}
          >
            English Translation
          </div>
          <div style={{ flex: 1 }}>
            {POEM.englishLines.map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 + 0.2 }}
                style={{
                  fontSize: 16,
                  color: '#550000',
                  lineHeight: 2,
                  borderBottom: i < POEM.englishLines.length - 1 ? '1px dashed #ffd9b3' : 'none',
                  padding: '4px 0',
                  fontStyle: 'italic',
                }}
              >
                "{line}"
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Roman column */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={{
            width: 200,
            backgroundColor: '#f4f4f4',
            border: '1px solid #dddddd',
            borderRadius: 4,
            padding: '16px 14px',
            flexShrink: 0,
          }}
        >
          <div
            style={{
              fontSize: 12,
              fontWeight: 'bold',
              color: '#666',
              marginBottom: 12,
              textTransform: 'uppercase',
              letterSpacing: 1,
              borderBottom: '2px solid #666',
              paddingBottom: 6,
            }}
          >
            Transliteration
          </div>
          {POEM.transliterationLines.map((line, i) => (
            <div
              key={i}
              style={{
                fontSize: 12,
                color: '#555555',
                lineHeight: 1.8,
                fontStyle: 'italic',
                borderBottom: i < POEM.transliterationLines.length - 1 ? '1px dashed #ddd' : 'none',
                padding: '3px 0',
              }}
            >
              {line}
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom nav */}
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
      <NavBtn onClick={onPrev}>← முந்தைய</NavBtn>
      <NavBtn onClick={onNext}>அடுத்தது →</NavBtn>
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
