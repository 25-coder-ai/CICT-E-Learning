import './malai-app.css';
import { useState } from 'react';

/* ── Reusable popup overlays ── */
function CorrectPopup({ onNext }) {
  return (
    <div className="popup-overlay">
      <div className="popup-box">
        <div className="popup-header">சரியான பதில்</div>
        <div className="popup-body">
          <div className="popup-correct-content">
            <svg className="check-icon" viewBox="0 0 82 82">
              <circle cx="41" cy="41" r="38" fill="none" stroke="#22bb33" strokeWidth="5"/>
              <polyline points="20,42 34,56 62,28" fill="none" stroke="#22bb33" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="popup-success-text">வாழ்த்துகள், மேலே செல்க</span>
          </div>
          <div className="popup-footer">
            <button className="popup-action-btn" onClick={onNext}>அடுத்து</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function WrongPopup({ onRetry }) {
  return (
    <div className="popup-overlay">
      <div className="popup-box">
        <div className="popup-header">இது தவறு</div>
        <div className="popup-body">
          <div className="popup-wrong-content">
            <svg className="cross-icon" viewBox="0 0 82 82">
              <circle cx="41" cy="41" r="38" fill="none" stroke="#cc0000" strokeWidth="5"/>
              <line x1="24" y1="24" x2="58" y2="58" stroke="#cc0000" strokeWidth="6" strokeLinecap="round"/>
              <line x1="58" y1="24" x2="24" y2="58" stroke="#cc0000" strokeWidth="6" strokeLinecap="round"/>
            </svg>
            <p>இனி நீங்கள் ஏன் அருஞ்சொற்பொருள் குமிழைப் பயன்படுத்திச் சரியான பாடலடிகடையாளம் காணக்கூடாது? அருஞ்சொற்பொள் குமிழைத் தேர்வு செய்யுங்கள்.</p>
          </div>
          <div className="popup-footer">
            <button className="popup-action-btn" onClick={onRetry}>செல்க</button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Shared UI primitives ── */
const MediaBar = () => (
  <div className="q2-divider">
    <div className="q2-media-controls">
      {['◀','▶','⏸','■'].map(sym => <button key={sym} className="media-btn">{sym}</button>)}
    </div>
  </div>
);

const BrownBox = ({ text }) => (
  <div style={{ background:'#5c3317', color:'#f5ecd8', padding:'8px 12px', borderRadius:3, marginBottom:8, fontSize:'0.83rem', lineHeight:1.7 }}>{text}</div>
);

const LeftBorderPoem = ({ text }) => (
  <div className="q5-paadal-snippet" style={{ whiteSpace:'pre-line' }}>{text}</div>
);

function RadioDot({ checked }) {
  return (
    <span className="q2-radio-dot" style={{ background: checked ? '#734501' : '#fff', border: checked ? '4px solid #734501' : '2px solid #555' }} />
  );
}

/* ── Question renderers ── */
function TitleQuestion({ q, onNext }) {
  return (
    <div className="question-body" style={{ display:'flex', flexDirection:'column', gap:8 }}>
      {q.primaryTitle && <h3>{q.primaryTitle}</h3>}
      {q.primaryInstruction && <p>{q.primaryInstruction}</p>}
      {q.secondaryTitle && <p style={{ fontWeight:700 }}>{q.secondaryTitle}</p>}
      {q.paadal && <div className="q5-paadal-snippet" style={{ whiteSpace:'pre-line' }}>{q.paadal}</div>}
      {q.secondaryInstruction && <p>{q.secondaryInstruction}</p>}
    </div>
  );
}

function TrueFalseQuestion({ q, onNext }) {
  const [selected, setSelected] = useState(null);
  const [popup, setPopup] = useState(null);

  const check = (opt) => {
    setSelected(opt);
    setPopup(opt === q.answer ? 'correct' : 'wrong');
  };

  return (
    <div className="q2-wrap">
      <div className="q2-paadal" style={{ whiteSpace:'pre-line' }}>{q.paadal}</div>
      <MediaBar />
      <div className="q2-question-area">
        {q.primaryInstruction && <p>{q.primaryInstruction}</p>}
        {q.secondaryInstruction && <p>{q.secondaryInstruction}</p>}
        {q.tertiaryInstruction && <p>{q.tertiaryInstruction}</p>}
        {q.question && <p className="q2-prompt">{q.question}</p>}
        <div className="q2-options">
          {['ஆம்','இல்லை'].map(opt => (
            <div key={opt} className="q2-option" onClick={() => check(opt)}>
              <RadioDot checked={selected===opt} />
              <span>{opt}</span>
            </div>
          ))}
        </div>
      </div>
      {popup === 'correct' && <CorrectPopup onNext={() => { setPopup(null); setSelected(null); onNext(); }} />}
      {popup === 'wrong' && <WrongPopup onRetry={() => { setPopup(null); setSelected(null); }} />}
    </div>
  );
}

function MCQQuestion({ q, onNext }) {
  const [selected, setSelected] = useState(null);
  const [popup, setPopup] = useState(null);

  const check = (i) => {
    setSelected(i);
    setPopup(i === q.answer ? 'correct' : 'wrong');
  };

  return (
    <div className="q2-wrap">
      <div className="q2-paadal" style={{ whiteSpace:'pre-line' }}>{q.paadal}</div>
      <MediaBar />
      <div className="q2-question-area">
        {q.primaryInstruction && <p>{q.primaryInstruction}</p>}
        {q.secondaryInstruction && <p>{q.secondaryInstruction}</p>}
        {q.tertiaryInstruction && <p>{q.tertiaryInstruction}</p>}
        {q.question && <p className="q2-prompt">{q.question}</p>}
        <div className="q3-options">
          {(q.options||[]).map((opt,i) => (
            <div key={i} className="q2-option q3-option" onClick={() => check(i)}>
              <RadioDot checked={selected===i} />
              <span>{opt}</span>
            </div>
          ))}
        </div>
      </div>
      {popup === 'correct' && <CorrectPopup onNext={() => { setPopup(null); setSelected(null); onNext(); }} />}
      {popup === 'wrong' && <WrongPopup onRetry={() => { setPopup(null); setSelected(null); }} />}
    </div>
  );
}

function ListenAnswerQuestion({ q, onNext }) {
  const [showOptions, setShowOptions] = useState(false);
  const [selected, setSelected] = useState(null);
  const [popup, setPopup] = useState(null);

  const check = (i) => {
    setSelected(i);
    setPopup(i === q.answer ? 'correct' : 'wrong');
  };

  if (showOptions) {
    return (
      <div className="q4-options-page">
        <p style={{ color:'#f5ecd8', fontSize:'0.85rem', marginBottom:12 }}>{q.question}</p>
        {(q.options||[]).map((opt,i) => (
          <div key={i} className="q4-option-item" onClick={() => check(i)}>
            <RadioDot checked={selected===i} />
            <span className="q4-option-text">{opt}</span>
          </div>
        ))}
        {popup === 'correct' && <CorrectPopup onNext={() => { setPopup(null); setSelected(null); setShowOptions(false); onNext(); }} />}
        {popup === 'wrong' && <WrongPopup onRetry={() => { setPopup(null); setSelected(null); }} />}
      </div>
    );
  }

  return (
    <div className="q2-wrap">
      <div className="q2-paadal" style={{ whiteSpace:'pre-line' }}>{q.paadal}</div>
      <MediaBar />
      <div className="q2-question-area">
        {q.primaryInstruction && <BrownBox text={q.primaryInstruction} />}
        {q.secondaryInstruction && <p>{q.secondaryInstruction}</p>}
        {q.tertiaryInstruction && <p>{q.tertiaryInstruction}</p>}
        {q.paadal2 && <LeftBorderPoem text={q.paadal2} />}
        {q.question && <p className="q2-prompt">{q.question}</p>}
        <div className="q4-btn-center">
          <button className="q4-click-btn" onClick={() => setShowOptions(true)}>இங்கே சொடுக்கவும்</button>
        </div>
      </div>
    </div>
  );
}

function MCQPaadalQuestion({ q, onNext }) {
  const [selected, setSelected] = useState(null);
  const [popup, setPopup] = useState(null);

  const check = (i) => {
    setSelected(i);
    setPopup(i === q.answer ? 'correct' : 'wrong');
  };

  return (
    <div className="q2-wrap">
      <div className="q2-paadal" style={{ whiteSpace:'pre-line' }}>{q.paadal}</div>
      <MediaBar />
      <div className="q2-question-area">
        {q.primaryInstruction && <BrownBox text={q.primaryInstruction} />}
        {q.question && <p className="q2-prompt">{q.question}</p>}
        {q.paadal2 && <LeftBorderPoem text={q.paadal2} />}
        {q.secondaryInstruction && <p>{q.secondaryInstruction}</p>}
        {q.tertiaryInstruction && <p>{q.tertiaryInstruction}</p>}
        <div className="q3-options">
          {(q.options||[]).map((opt,i) => (
            <div key={i} className="q2-option q3-option" onClick={() => check(i)}>
              <RadioDot checked={selected===i} />
              <span>{opt}</span>
            </div>
          ))}
        </div>
      </div>
      {popup === 'correct' && <CorrectPopup onNext={() => { setPopup(null); setSelected(null); onNext(); }} />}
      {popup === 'wrong' && <WrongPopup onRetry={() => { setPopup(null); setSelected(null); }} />}
    </div>
  );
}

function ListenRepeatQuestion({ q, onNext }) {
  return (
    <div className="q2-wrap">
      <div className="q2-paadal" style={{ whiteSpace:'pre-line' }}>{q.paadal}</div>
      <MediaBar />
      <div className="q2-question-area">
        {q.primaryInstruction && <BrownBox text={q.primaryInstruction} />}
        {q.secondaryInstruction && <p>{q.secondaryInstruction}</p>}
        {q.paadal2 && <LeftBorderPoem text={q.paadal2} />}
        {q.tertiaryInstruction && <p>{q.tertiaryInstruction}</p>}
        {q.question && <p className="q2-prompt">{q.question}</p>}
      </div>
    </div>
  );
}

function QAQuestion({ q, onNext }) {
  const [showQA, setShowQA] = useState(false);
  const [qaPopup, setQaPopup] = useState(null);

  return (
    <div className="q2-wrap">
      <div className="q2-paadal" style={{ whiteSpace:'pre-line' }}>{q.paadal}</div>
      <MediaBar />
      <div className="q2-question-area q12-question-area">
        {q.primaryInstruction && <BrownBox text={q.primaryInstruction} />}
        {q.secondaryInstruction && <p>{q.secondaryInstruction}</p>}
        {q.tertiaryInstruction && <p>{q.tertiaryInstruction}</p>}

        {!showQA && (
          <div className="q12-footer-left">
            <button className="q12-next-btn" onClick={() => setShowQA(true)}>அடுத்து &gt;&gt;</button>
          </div>
        )}

        {showQA && (
          <>
            <ul className="q12-questions" style={{ listStyle:'none', paddingLeft:0 }}>
              {(q.qas||[]).map((qa,i) => (
                <li key={i} className="q12-question-item">
                  <span style={{ color:'#5c3317', fontWeight:700, fontSize:'0.78rem', minWidth:18 }}>{i+1}.</span>
                  <span className="q12-question-text">{qa.question}</span>
                  <button className="q12-vidai-btn" onClick={() => setQaPopup({ index:i+1, question:qa.question, answer:qa.answer })}>விடை</button>
                </li>
              ))}
            </ul>
            <div className="q12-footer-right">
              <button className="q12-next-btn" onClick={onNext}>அடுத்து &gt;&gt;</button>
            </div>
          </>
        )}
      </div>

      {qaPopup && (
        <div className="popup-overlay" onClick={e => e.target===e.currentTarget && setQaPopup(null)}>
          <div className="q12-popup">
            <div className="q12-popup-header">
              {qaPopup.index}. {qaPopup.question}
              <button className="q12-popup-close" onClick={() => setQaPopup(null)}>✕</button>
            </div>
            <div className="q12-popup-body"><p>{qaPopup.answer}</p></div>
          </div>
        </div>
      )}
    </div>
  );
}

function DragDropQuestion({ q, onNext }) {
  const correct = q.sentences || [];
  const [shuffled] = useState(() => {
    const arr = [...correct];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  });
  const [slots, setSlots] = useState(Array(correct.length).fill(null));
  const [dragItem, setDragItem] = useState(null);
  const [dragOver, setDragOver] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const placed = new Set(slots.filter(Boolean));
  const bank = shuffled.filter(s => !placed.has(s));

  const handleDrop = (slotIdx) => {
    setDragOver(null);
    if (dragItem == null || slots[slotIdx] != null) return;
    if (dragItem === correct[slotIdx]) {
      const next = [...slots];
      next[slotIdx] = dragItem;
      setSlots(next);
      if (next.every((s, i) => s === correct[i])) setShowSuccess(true);
    }
    setDragItem(null);
  };

  return (
    <div className="q4-options-page q10-drag-page">
      <div className="q2-question-area" style={{ background:'transparent', padding:'0 0 8px', overflow:'visible', flex:'none' }}>
        {q.primaryInstruction && <BrownBox text={q.primaryInstruction} />}
        {q.secondaryInstruction && <p style={{ color:'#f5ecd8', fontSize:'0.82rem', marginBottom:4 }}>{q.secondaryInstruction}</p>}
        {q.tertiaryInstruction && <p style={{ color:'#f5ecd8', fontSize:'0.82rem', marginBottom:8 }}>{q.tertiaryInstruction}</p>}
      </div>
      <div className="q10-slots">
        {correct.map((_, i) => (
          <div
            key={i}
            className={`q10-slot ${slots[i] ? 'q10-slot-filled' : ''} ${dragOver===i && !slots[i] ? 'q10-slot-hover' : ''}`}
            onDragOver={e => { e.preventDefault(); setDragOver(i); }}
            onDragLeave={() => setDragOver(null)}
            onDrop={() => handleDrop(i)}
          >
            {slots[i] || ''}
          </div>
        ))}
      </div>
      <div className="q10-bank">
        {bank.map((s, i) => (
          <div
            key={i}
            className="q10-bank-item"
            draggable
            onDragStart={() => setDragItem(s)}
            onDragEnd={() => setDragItem(null)}
          >
            {s}
          </div>
        ))}
      </div>
      {showSuccess && <CorrectPopup onNext={() => { setShowSuccess(false); onNext(); }} />}
    </div>
  );
}

function renderQuestion(q, onNext) {
  switch (q.type) {
    case 'title':         return <TitleQuestion q={q} onNext={onNext} />;
    case 'truefalse':     return <TrueFalseQuestion key={Math.random()} q={q} onNext={onNext} />;
    case 'mcq':           return <MCQQuestion key={Math.random()} q={q} onNext={onNext} />;
    case 'listen-answer': return <ListenAnswerQuestion key={Math.random()} q={q} onNext={onNext} />;
    case 'mcq-paadal':   return <MCQPaadalQuestion key={Math.random()} q={q} onNext={onNext} />;
    case 'listen-repeat': return <ListenRepeatQuestion q={q} onNext={onNext} />;
    case 'qa':            return <QAQuestion key={Math.random()} q={q} onNext={onNext} />;
    case 'dragdrop':      return <DragDropQuestion key={Math.random()} q={q} onNext={onNext} />;
    default:              return <div className="question-body"><p>Unknown question type: {q.type}</p></div>;
  }
}

const STATIC_TYPES = new Set(['title','listen-repeat']);

export default function DynamicExerciseModal({ exercise, title, onClose }) {
  const { leftButtons = [], rightContent = {}, questions = [] } = exercise;
  const [activeLeft, setActiveLeft] = useState(leftButtons[0] || '');
  const [currentQ, setCurrentQ] = useState(0);
  const [qKey, setQKey] = useState(0);

  const q = questions[currentQ];
  const isStatic = q && STATIC_TYPES.has(q.type);

  const handleNext = () => {
    setCurrentQ(prev => (prev + 1) % questions.length);
    setQKey(k => k + 1);
  };

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/65 backdrop-blur-sm"
      style={{ position:'fixed', inset:0, zIndex:200, display:'flex', alignItems:'center', justifyContent:'center', background:'rgba(0,0,0,0.65)', backdropFilter:'blur(4px)' }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div style={{ position:'relative' }}>
        <button
          onClick={onClose}
          style={{ position:'absolute', top:-12, right:-12, zIndex:10, width:28, height:28, borderRadius:'50%', background:'#4d2c03', color:'#f5ecd8', border:'none', cursor:'pointer', fontWeight:700, fontSize:'0.85rem', display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'0 2px 6px rgba(0,0,0,0.5)' }}
          aria-label="Close"
        >✕</button>

        <div className="malai-scope">
          <div className="app-container">
            {/* LEFT SIDEBAR */}
            <aside className="left-sidebar">
              <nav className="sidebar-nav">
                {leftButtons.map(btn => (
                  <div key={btn} className="flip-wrapper">
                    <button
                      className={`flip-btn ${activeLeft === btn ? 'active' : ''}`}
                      onClick={() => setActiveLeft(btn)}
                    >
                      <span className="flip-front">{btn}</span>
                      <span className="flip-back">{btn}</span>
                    </button>
                  </div>
                ))}
              </nav>
            </aside>

            {/* CENTRE COLUMN */}
            <main className="centre-column">
              <div className="centre-header">{title || 'பயிற்சி'}</div>
              <div className="centre-content">
                {q ? (
                  <div key={qKey} style={{ height:'100%' }}>
                    {renderQuestion(q, handleNext)}
                  </div>
                ) : (
                  <p style={{ color:'#555' }}>No questions added.</p>
                )}
              </div>
              {(isStatic) && (
                <div className="centre-footer">
                  <div className="flip-wrapper next-btn-wrapper">
                    <button className="flip-btn" onClick={handleNext}>
                      <span className="flip-front">அடுத்து &gt;&gt;</span>
                      <span className="flip-back">அடுத்து &gt;&gt;</span>
                    </button>
                  </div>
                </div>
              )}
            </main>

            {/* RIGHT COLUMN */}
            <aside className="right-column">
              <div className="right-header">{title || 'பயிற்சி'}</div>
              <div className="right-content">
                {activeLeft && rightContent[activeLeft]
                  ? <p style={{ whiteSpace:'pre-line' }}>{rightContent[activeLeft]}</p>
                  : <p style={{ color:'#aaa', fontStyle:'italic', fontSize:'0.8rem' }}>Select a topic from the left.</p>
                }
              </div>
              <div className="question-nav">
                {questions.map((_, i) => (
                  <button
                    key={i}
                    className={`q-nav-btn ${currentQ === i ? 'q-active' : ''}`}
                    onClick={() => { setCurrentQ(i); setQKey(k => k + 1); }}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}
