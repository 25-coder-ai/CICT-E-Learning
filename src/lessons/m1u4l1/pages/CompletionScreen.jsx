import { motion } from 'framer-motion';
import { QUIZ_QUESTIONS, LESSON, POEM } from '../data/content';
import bgCollage from '../assets/images/background-collage.jpg';
import correctIcon from '../assets/images/icon-correct.jpg';

export default function CompletionScreen({ answers, onRestart }) {
  const score = QUIZ_QUESTIONS.filter((q) => answers[q.id] === q.correctAnswer).length;
  const total = QUIZ_QUESTIONS.length;
  const pct = Math.round((score / total) * 100);

  const grade =
    pct >= 80 ? { label: 'மிகவும் நல்லது', en: 'Excellent!', color: '#008800' }
    : pct >= 60 ? { label: 'நல்லது', en: 'Good!', color: '#0044cc' }
    : { label: 'மேலும் படிக்கவும்', en: 'Keep trying!', color: '#cc6600' };

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Background image */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.08,
          overflow: 'hidden',
        }}
      >
        <img
          src={bgCollage}
          alt=""
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>

      <div style={{ position: 'relative', zIndex: 1, flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <div
          style={{
            backgroundColor: '#003399',
            padding: '8px 24px',
            flexShrink: 0,
          }}
        >
          <div style={{ color: '#ffffff', fontSize: 18, fontWeight: 'bold', fontFamily: 'Arial Unicode MS, Arial, sans-serif' }}>
            பாடம் முடிந்தது — Lesson Complete
          </div>
          <div style={{ color: '#aabbff', fontSize: 12 }}>
            {LESSON.title} — பகுதி {LESSON.unit}, பாடம் {LESSON.lesson}
          </div>
        </div>

        {/* Content */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
            gap: 20,
          }}
        >
          {/* Score card */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            style={{
              backgroundColor: grade.color,
              borderRadius: 8,
              padding: '28px 48px',
              textAlign: 'center',
              boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
              color: '#ffffff',
              minWidth: 300,
            }}
          >
            <div style={{ fontSize: 64, fontWeight: 'bold', lineHeight: 1 }}>
              {score}/{total}
            </div>
            <div style={{ fontSize: 20, marginTop: 8 }}>{pct}%</div>
            <div
              style={{
                fontSize: 22,
                fontWeight: 'bold',
                marginTop: 12,
                fontFamily: 'Arial Unicode MS, Arial, sans-serif',
              }}
            >
              {grade.label}
            </div>
            <div style={{ fontSize: 15, opacity: 0.85 }}>{grade.en}</div>
          </motion.div>

          {/* Answers review */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            style={{
              backgroundColor: '#f0f4ff',
              border: '1px solid #ccd6ff',
              borderRadius: 6,
              padding: '16px 20px',
              width: '100%',
              maxWidth: 600,
            }}
          >
            <div
              style={{
                fontSize: 14,
                fontWeight: 'bold',
                color: '#003399',
                marginBottom: 12,
                borderBottom: '1px solid #ccd6ff',
                paddingBottom: 8,
              }}
            >
              விடை சுருக்கம் (Answer Summary)
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {QUIZ_QUESTIONS.map((q) => {
                const ans = answers[q.id];
                const correct = ans === q.correctAnswer;
                return (
                  <div
                    key={q.id}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 10,
                      padding: '6px 0',
                      borderBottom: '1px dashed #dde3ff',
                    }}
                  >
                    <img
                      src={correct ? correctIcon : '/icon-wrong.jpg'}
                      alt={correct ? 'correct' : 'wrong'}
                      style={{ width: 18, height: 18, objectFit: 'contain', marginTop: 2, flexShrink: 0 }}
                    />
                    <div>
                      <div
                        style={{
                          fontSize: 14,
                          color: '#333',
                          fontFamily: 'Arial Unicode MS, Arial, sans-serif',
                        }}
                      >
                        {q.id}. {q.questionTamil}
                      </div>
                      <div style={{ fontSize: 12, color: correct ? '#008800' : '#cc0000', marginTop: 2 }}>
                        {correct ? '✓ சரியான விடை' : `✗ சரியான விடை: ${q.options.find((o) => o.id === q.correctAnswer)?.textTamil}`}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Action buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            style={{ display: 'flex', gap: 16 }}
          >
            <motion.button
              onClick={onRestart}
              whileHover={{ backgroundColor: '#002277' }}
              whileTap={{ scale: 0.97 }}
              style={{
                backgroundColor: '#003399',
                color: '#ffffff',
                border: 'none',
                borderRadius: 4,
                padding: '12px 32px',
                fontSize: 16,
                fontWeight: 'bold',
                cursor: 'pointer',
                fontFamily: 'Arial Unicode MS, Arial, sans-serif',
              }}
            >
              மீண்டும் படி (Restart)
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
