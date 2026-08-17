import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GLOSSARY } from '../data/content';

export default function GlossaryScreen({ onNext, onPrev }) {
  const [selected, setSelected] = useState(null);

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
          சொல்லகராதி — Glossary
        </div>
        <div style={{ color: '#aabbff', fontSize: 12 }}>
          Click on a word to see its full meaning
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
        {/* Glossary list */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '16px 20px',
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 10,
            }}
          >
            {GLOSSARY.map((item, i) => (
              <motion.div
                key={item.tamil}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                onClick={() => setSelected(selected === i ? null : i)}
                whileHover={{ boxShadow: '0 2px 8px rgba(0,51,153,0.2)', y: -1 }}
                style={{
                  backgroundColor: selected === i ? '#003399' : '#f0f4ff',
                  border: `1px solid ${selected === i ? '#003399' : '#ccd6ff'}`,
                  borderRadius: 4,
                  padding: '10px 14px',
                  cursor: 'pointer',
                  transition: 'background-color 0.15s, border-color 0.15s',
                }}
              >
                <div
                  style={{
                    fontSize: 17,
                    fontWeight: 'bold',
                    color: selected === i ? '#ffffff' : '#000099',
                    fontFamily: 'Arial Unicode MS, Arial, sans-serif',
                    marginBottom: 3,
                  }}
                >
                  {item.tamil}
                </div>
                <div
                  style={{
                    fontSize: 12,
                    color: selected === i ? '#aabbff' : '#888888',
                    fontStyle: 'italic',
                  }}
                >
                  {item.roman}
                </div>
                <AnimatePresence>
                  {selected === i && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div
                        style={{
                          marginTop: 8,
                          paddingTop: 8,
                          borderTop: '1px solid rgba(255,255,255,0.3)',
                          fontSize: 14,
                          color: '#ffffff',
                          lineHeight: 1.5,
                        }}
                      >
                        <div style={{ marginBottom: 3 }}>{item.meaning}</div>
                        <div
                          style={{
                            fontSize: 13,
                            color: '#ccddff',
                            fontFamily: 'Arial Unicode MS, Arial, sans-serif',
                          }}
                        >
                          {item.meaningTamil}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right panel — selected word detail */}
        <div
          style={{
            width: 220,
            backgroundColor: '#f8f9ff',
            borderLeft: '1px solid #dde3ff',
            padding: '20px 16px',
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
            flexShrink: 0,
            overflowY: 'auto',
          }}
        >
          <div
            style={{
              fontSize: 13,
              fontWeight: 'bold',
              color: '#003399',
              borderBottom: '2px solid #003399',
              paddingBottom: 6,
            }}
          >
            சொல் விளக்கம்
          </div>

          <AnimatePresence mode="wait">
            {selected !== null ? (
              <motion.div
                key={selected}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                style={{ display: 'flex', flexDirection: 'column', gap: 10 }}
              >
                <div
                  style={{
                    fontSize: 24,
                    fontWeight: 'bold',
                    color: '#003399',
                    fontFamily: 'Arial Unicode MS, Arial, sans-serif',
                  }}
                >
                  {GLOSSARY[selected].tamil}
                </div>
                <div
                  style={{
                    fontSize: 14,
                    color: '#666',
                    fontStyle: 'italic',
                  }}
                >
                  {GLOSSARY[selected].roman}
                </div>
                <div
                  style={{
                    backgroundColor: '#003399',
                    color: '#ffffff',
                    borderRadius: 4,
                    padding: '10px 12px',
                    fontSize: 14,
                    lineHeight: 1.6,
                  }}
                >
                  <div style={{ fontWeight: 'bold', marginBottom: 4, fontSize: 11, opacity: 0.8 }}>
                    English:
                  </div>
                  {GLOSSARY[selected].meaning}
                </div>
                <div
                  style={{
                    backgroundColor: '#f0f4ff',
                    border: '1px solid #ccd6ff',
                    borderRadius: 4,
                    padding: '10px 12px',
                    fontSize: 14,
                    color: '#000099',
                    fontFamily: 'Arial Unicode MS, Arial, sans-serif',
                    lineHeight: 1.6,
                  }}
                >
                  <div style={{ fontWeight: 'bold', marginBottom: 4, fontSize: 11, color: '#666' }}>
                    தமிழ் விளக்கம்:
                  </div>
                  {GLOSSARY[selected].meaningTamil}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{
                  fontSize: 13,
                  color: '#aaaaaa',
                  textAlign: 'center',
                  marginTop: 20,
                  lineHeight: 1.6,
                }}
              >
                ஒரு சொல்லை கிளிக் செய்யுங்கள்
                <br />
                <br />
                Click a word on the left to see its meaning here
              </motion.div>
            )}
          </AnimatePresence>
        </div>
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
        <NavBtn onClick={onNext}>அடுத்தது →</NavBtn>
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
