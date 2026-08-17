import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QUIZ_QUESTIONS } from '../data/content';
import correctIcon from '../assets/images/icon-correct.jpg';
import wrongIcon from '../assets/images/icon-wrong.jpg';

export default function QuizScreen({ onNext, onPrev, onComplete }) {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  const question = QUIZ_QUESTIONS[currentQ];
  const selectedAnswer = answers[question.id];
  const isAnswered = selectedAnswer !== undefined;
  const isCorrect = selectedAnswer === question.correctAnswer;
  const allAnswered = QUIZ_QUESTIONS.every((q) => answers[q.id] !== undefined);
  const score = QUIZ_QUESTIONS.filter((q) => answers[q.id] === q.correctAnswer).length;

  const handleSelect = (optionId) => {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [question.id]: optionId }));
    setShowExplanation(false);
  };

  const handleCheck = () => {
    setSubmitted(true);
    setShowExplanation(true);
  };

  const handleNext = () => {
    if (currentQ < QUIZ_QUESTIONS.length - 1) {
      setCurrentQ((q) => q + 1);
      setSubmitted(false);
      setShowExplanation(false);
    }
  };

  const handlePrevQ = () => {
    if (currentQ > 0) {
      setCurrentQ((q) => q - 1);
      setSubmitted(!!answers[QUIZ_QUESTIONS[currentQ - 1].id]);
      setShowExplanation(!!answers[QUIZ_QUESTIONS[currentQ - 1].id]);
    }
  };

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
          backgroundColor: '#990000',
          padding: '8px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexShrink: 0,
        }}
      >
        <div style={{ color: '#ffffff', fontSize: 18, fontWeight: 'bold', fontFamily: 'Arial Unicode MS, Arial, sans-serif' }}>
          வினாக்கள் — Comprehension Questions
        </div>
        <div style={{ color: '#ffaaaa', fontSize: 13 }}>
          {currentQ + 1} / {QUIZ_QUESTIONS.length}
          {allAnswered && <span style={{ marginLeft: 12, color: '#ffff88' }}>மதிப்பெண்: {score}/{QUIZ_QUESTIONS.length}</span>}
        </div>
      </div>

      {/* Progress dots */}
      <div
        style={{
          backgroundColor: '#fff0f0',
          padding: '6px 24px',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          flexShrink: 0,
          borderBottom: '1px solid #ffd0d0',
        }}
      >
        {QUIZ_QUESTIONS.map((q, i) => {
          const ans = answers[q.id];
          const done = ans !== undefined;
          const correct = ans === q.correctAnswer;
          return (
            <motion.button
              key={q.id}
              onClick={() => {
                setCurrentQ(i);
                setSubmitted(!!answers[QUIZ_QUESTIONS[i].id]);
                setShowExplanation(!!answers[QUIZ_QUESTIONS[i].id]);
              }}
              whileHover={{ scale: 1.15 }}
              style={{
                width: 28,
                height: 28,
                borderRadius: '50%',
                border: `2px solid ${i === currentQ ? '#990000' : '#dddddd'}`,
                backgroundColor: done ? (correct ? '#00aa00' : '#cc0000') : i === currentQ ? '#fff0f0' : '#f5f5f5',
                color: done ? '#ffffff' : i === currentQ ? '#990000' : '#aaaaaa',
                fontWeight: 'bold',
                fontSize: 12,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {done ? (correct ? '✓' : '✗') : i + 1}
            </motion.button>
          );
        })}
        <div style={{ marginLeft: 8, fontSize: 12, color: '#999' }}>
          {allAnswered ? `மொத்த மதிப்பெண்: ${score} / ${QUIZ_QUESTIONS.length}` : 'Click a number to navigate'}
        </div>
      </div>

      {/* Question area */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          gap: 0,
          overflow: 'hidden',
        }}
      >
        {/* Main question panel */}
        <div
          style={{
            flex: 1,
            padding: '20px 28px',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQ}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.3 }}
            >
              {/* Question text */}
              <div
                style={{
                  backgroundColor: '#fff0f0',
                  border: '1px solid #ffd0d0',
                  borderLeft: '4px solid #990000',
                  borderRadius: 4,
                  padding: '14px 18px',
                  marginBottom: 18,
                }}
              >
                <div
                  style={{
                    fontSize: 12,
                    color: '#990000',
                    fontWeight: 'bold',
                    marginBottom: 6,
                    textTransform: 'uppercase',
                  }}
                >
                  வினா {question.id}
                </div>
                <div
                  style={{
                    fontSize: 18,
                    color: '#000000',
                    fontFamily: 'Arial Unicode MS, Arial, sans-serif',
                    fontWeight: 'bold',
                    lineHeight: 1.6,
                    marginBottom: 6,
                  }}
                >
                  {question.questionTamil}
                </div>
                <div
                  style={{
                    fontSize: 14,
                    color: '#666666',
                    fontStyle: 'italic',
                  }}
                >
                  {question.questionEnglish}
                </div>
              </div>

              {/* Options */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {question.options.map((opt) => {
                  const isSelected = selectedAnswer === opt.id;
                  const isCorrectOpt = opt.id === question.correctAnswer;
                  let bg = '#f8f9ff';
                  let border = '#dde3ff';
                  let textColor = '#000099';
                  if (submitted) {
                    if (isCorrectOpt) {
                      bg = '#e6ffe6';
                      border = '#00aa00';
                      textColor = '#004400';
                    } else if (isSelected && !isCorrectOpt) {
                      bg = '#ffe6e6';
                      border = '#cc0000';
                      textColor = '#660000';
                    }
                  } else if (isSelected) {
                    bg = '#e8f0ff';
                    border = '#003399';
                  }

                  return (
                    <motion.button
                      key={opt.id}
                      onClick={() => handleSelect(opt.id)}
                      whileHover={!submitted ? { x: 4, backgroundColor: '#e8f0ff' } : {}}
                      whileTap={!submitted ? { scale: 0.98 } : {}}
                      style={{
                        backgroundColor: bg,
                        border: `2px solid ${border}`,
                        borderRadius: 4,
                        padding: '10px 16px',
                        textAlign: 'left',
                        cursor: submitted ? 'default' : 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 12,
                        transition: 'all 0.15s',
                      }}
                    >
                      <span
                        style={{
                          width: 26,
                          height: 26,
                          borderRadius: '50%',
                          border: `2px solid ${border}`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: 13,
                          fontWeight: 'bold',
                          color: textColor,
                          flexShrink: 0,
                          backgroundColor: isSelected ? border : 'transparent',
                          color: isSelected ? '#fff' : textColor,
                        }}
                      >
                        {opt.id.toUpperCase()}
                      </span>
                      <div>
                        <div
                          style={{
                            fontSize: 16,
                            color: textColor,
                            fontFamily: 'Arial Unicode MS, Arial, sans-serif',
                            fontWeight: isSelected ? 'bold' : 'normal',
                          }}
                        >
                          {opt.textTamil}
                        </div>
                        <div style={{ fontSize: 12, color: textColor, opacity: 0.75 }}>
                          {opt.text}
                        </div>
                      </div>

                      {/* Correct/Wrong icon — matches Flash green ✓ and red ✗ */}
                      {submitted && isCorrectOpt && (
                        <img src={correctIcon} alt="correct" style={{ width: 20, height: 20, marginLeft: 'auto', objectFit: 'contain' }} />
                      )}
                      {submitted && isSelected && !isCorrectOpt && (
                        <img src={wrongIcon} alt="wrong" style={{ width: 20, height: 20, marginLeft: 'auto', objectFit: 'contain' }} />
                      )}
                    </motion.button>
                  );
                })}
              </div>

              {/* Explanation */}
              <AnimatePresence>
                {showExplanation && submitted && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    style={{
                      marginTop: 16,
                      backgroundColor: isCorrect ? '#e6ffe6' : '#fff0f0',
                      border: `1px solid ${isCorrect ? '#00aa00' : '#cc0000'}`,
                      borderRadius: 4,
                      padding: '12px 16px',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                      <img
                        src={isCorrect ? correctIcon : wrongIcon}
                        alt=""
                        style={{ width: 22, height: 22, objectFit: 'contain' }}
                      />
                      <span
                        style={{
                          fontWeight: 'bold',
                          color: isCorrect ? '#004400' : '#660000',
                          fontSize: 15,
                        }}
                      >
                        {isCorrect ? 'சரியான விடை! (Correct!)' : 'தவறான விடை (Incorrect)'}
                      </span>
                    </div>
                    <div
                      style={{
                        fontSize: 15,
                        color: '#333333',
                        fontFamily: 'Arial Unicode MS, Arial, sans-serif',
                        lineHeight: 1.6,
                        marginBottom: 4,
                      }}
                    >
                      {question.explanationTamil}
                    </div>
                    <div style={{ fontSize: 13, color: '#555555', fontStyle: 'italic' }}>
                      {question.explanationEnglish}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Action buttons */}
              <div style={{ marginTop: 16, display: 'flex', gap: 10 }}>
                {!submitted && isAnswered && (
                  <motion.button
                    onClick={handleCheck}
                    whileHover={{ backgroundColor: '#006600' }}
                    whileTap={{ scale: 0.97 }}
                    style={{
                      backgroundColor: '#008800',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: 4,
                      padding: '9px 24px',
                      fontSize: 15,
                      fontWeight: 'bold',
                      cursor: 'pointer',
                    }}
                  >
                    சரிபார் (Check)
                  </motion.button>
                )}
                {submitted && currentQ < QUIZ_QUESTIONS.length - 1 && (
                  <motion.button
                    onClick={handleNext}
                    whileHover={{ backgroundColor: '#002277' }}
                    whileTap={{ scale: 0.97 }}
                    style={{
                      backgroundColor: '#003399',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: 4,
                      padding: '9px 24px',
                      fontSize: 15,
                      fontWeight: 'bold',
                      cursor: 'pointer',
                    }}
                  >
                    அடுத்த வினா →
                  </motion.button>
                )}
                {submitted && currentQ === QUIZ_QUESTIONS.length - 1 && (
                  <motion.button
                    onClick={() => onComplete(answers)}
                    whileHover={{ backgroundColor: '#660000' }}
                    whileTap={{ scale: 0.97 }}
                    style={{
                      backgroundColor: '#990000',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: 4,
                      padding: '9px 24px',
                      fontSize: 15,
                      fontWeight: 'bold',
                      cursor: 'pointer',
                    }}
                  >
                    முடிவு காண் →
                  </motion.button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Score sidebar */}
        <div
          style={{
            width: 180,
            backgroundColor: '#fff0f0',
            borderLeft: '1px solid #ffd0d0',
            padding: '20px 14px',
            flexShrink: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: 14,
          }}
        >
          <div
            style={{
              fontSize: 13,
              fontWeight: 'bold',
              color: '#990000',
              borderBottom: '2px solid #990000',
              paddingBottom: 6,
            }}
          >
            மதிப்பெண்
          </div>
          <div
            style={{
              textAlign: 'center',
              backgroundColor: '#ffffff',
              border: '1px solid #ffd0d0',
              borderRadius: 4,
              padding: '12px',
            }}
          >
            <div style={{ fontSize: 36, fontWeight: 'bold', color: '#990000' }}>
              {score}
            </div>
            <div style={{ fontSize: 12, color: '#999' }}>
              out of {QUIZ_QUESTIONS.length}
            </div>
          </div>
          <div style={{ fontSize: 12, color: '#666', lineHeight: 1.6 }}>
            {QUIZ_QUESTIONS.map((q, i) => {
              const ans = answers[q.id];
              return (
                <div
                  key={q.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    marginBottom: 4,
                    color: ans === q.correctAnswer ? '#008800' : ans ? '#cc0000' : '#aaaaaa',
                  }}
                >
                  <span>{i + 1}.</span>
                  <span>
                    {ans
                      ? (ans === q.correctAnswer ? '✓ சரி' : '✗ தவறு')
                      : 'விடையில்லை'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom nav */}
      <div
        style={{
          backgroundColor: '#fff0f0',
          borderTop: '1px solid #ffd0d0',
          padding: '8px 24px',
          display: 'flex',
          justifyContent: 'space-between',
          flexShrink: 0,
        }}
      >
        <NavBtn onClick={onPrev} color="#990000">← முந்தைய</NavBtn>
        <div style={{ display: 'flex', gap: 8 }}>
          {currentQ > 0 && <NavBtn onClick={handlePrevQ} color="#990000">← முந்தைய வினா</NavBtn>}
          {currentQ < QUIZ_QUESTIONS.length - 1 && isAnswered && (
            <NavBtn onClick={handleNext} color="#990000">அடுத்த வினா →</NavBtn>
          )}
        </div>
      </div>
    </div>
  );
}

function NavBtn({ onClick, children, color = '#003399' }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ backgroundColor: color, color: '#ffffff' }}
      whileTap={{ scale: 0.96 }}
      style={{
        backgroundColor: '#ffffff',
        color: color,
        border: `1px solid ${color}`,
        borderRadius: 4,
        padding: '7px 18px',
        fontSize: 13,
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
