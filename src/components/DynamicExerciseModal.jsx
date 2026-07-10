import './dynamic-exercise.css';
import './malai-app.css';
import { useState, useEffect, createContext, useContext } from 'react';
import { createPortal } from 'react-dom';

const ThemeCtx = createContext('akam');

const THEMES = {
  akam: {
    scopeClass: 'dynamic-scope',
    box: { background:'rgba(219,234,254,0.45)', color:'#0d2a80', borderLeft:'3px solid #1a4cc8', padding:'8px 12px', borderRadius:'0 6px 6px 0', marginBottom:8, fontSize:'0.83rem', lineHeight:1.7 },
    dotChecked: { background:'#1a4cc8', border:'4px solid #1a4cc8' },
    dotUnchecked: { background:'#fff', border:'2px solid #8ab0e0' },
    closeBg: '#0d2a80', closeColor: '#fff', closeBorder: '1px solid rgba(26,76,200,0.5)',
    listenQColor: '#b91c1c',
    qaNumColor: '#0d2a80',
    dragTextColor: '#0d2a80',
  },
  puram: {
    scopeClass: 'malai-scope',
    box: { background:'rgba(60,30,2,0.12)', color:'#4d2c03', borderLeft:'3px solid #734501', padding:'8px 12px', borderRadius:'0 6px 6px 0', marginBottom:8, fontSize:'0.83rem', lineHeight:1.7 },
    dotChecked: { background:'#734501', border:'4px solid #734501' },
    dotUnchecked: { background:'#fff', border:'2px solid #a0785c' },
    closeBg: '#4d2c03', closeColor: '#f5ecd8', closeBorder: '1px solid rgba(77,44,3,0.5)',
    listenQColor: '#f5ecd8',
    qaNumColor: '#5c3317',
    dragTextColor: '#f5ecd8',
  },
};

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

function WrongPopup({ onRetry, message }) {
  return (
    <div className="popup-overlay">
      <div className="popup-box">
        <div className="popup-header">தவறு</div>
        <div className="popup-body">
          <div className="popup-wrong-content">
            <svg className="cross-icon" viewBox="0 0 82 82">
              <circle cx="41" cy="41" r="38" fill="none" stroke="#cc0000" strokeWidth="5"/>
              <line x1="24" y1="24" x2="58" y2="58" stroke="#cc0000" strokeWidth="6" strokeLinecap="round"/>
              <line x1="58" y1="24" x2="24" y2="58" stroke="#cc0000" strokeWidth="6" strokeLinecap="round"/>
            </svg>
            <p>{message || 'இனி நீங்கள் ஏன் அருஞ்சொற்பொருள் குமிழைப் பயன்படுத்திச் சரியான பாடலடியை அடையாளம் காணக்கூடாது? அருஞ்சொற்பொருள் குமிழைத் தேர்வு செய்யுங்கள்.'}</p>
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

const BlueBox = ({ text }) => {
  const t = THEMES[useContext(ThemeCtx)];
  return <div style={t.box}>{text}</div>;
};

const LeftBorderPoem = ({ text }) => (
  <div className="q5-paadal-snippet" style={{ whiteSpace:'pre-line' }}>{text}</div>
);

function RadioDot({ checked }) {
  const t = THEMES[useContext(ThemeCtx)];
  return (
    <span className="q2-radio-dot" style={checked ? t.dotChecked : t.dotUnchecked} />
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
              <span style={{ whiteSpace:'pre-line' }}>{opt}</span>
            </div>
          ))}
        </div>
      </div>
      {popup === 'correct' && <CorrectPopup onNext={() => { setPopup(null); setSelected(null); onNext(); }} />}
      {popup === 'wrong' && <WrongPopup onRetry={() => { setPopup(null); setSelected(null); }} />}
    </div>
  );
}

/* First-question progressive MCQ: each wrong answer advances to the next
   "stage" (a fresh option set + hint message shown in the wrong popup). The
   final stage repeats until the learner picks the correct option. Driven by
   q.stages = [{ options, answer, wrongMessage }, ...]. */
function StagedMCQQuestion({ q, onNext }) {
  const stages = q.stages || [];
  const [stageIdx, setStageIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [popup, setPopup] = useState(null);
  const stage = stages[stageIdx] || {};

  const check = (i) => {
    setSelected(i);
    setPopup(i === stage.answer ? 'correct' : 'wrong');
  };

  // On wrong: dismiss popup and reveal the next stage's options (last stage
  // stays put and simply re-prompts with the same hint each time).
  const advanceStage = () => {
    setPopup(null);
    setSelected(null);
    setStageIdx(idx => Math.min(idx + 1, stages.length - 1));
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
          {(stage.options||[]).map((opt,i) => (
            <div key={`${stageIdx}-${i}`} className="q2-option q3-option" onClick={() => check(i)}>
              <RadioDot checked={selected===i} />
              <span style={{ whiteSpace:'pre-line' }}>{opt}</span>
            </div>
          ))}
        </div>
      </div>
      {popup === 'correct' && <CorrectPopup onNext={() => { setPopup(null); setSelected(null); onNext(); }} />}
      {popup === 'wrong' && <WrongPopup message={stage.wrongMessage} onRetry={advanceStage} />}
    </div>
  );
}

function ListenAnswerQuestion({ q, onNext }) {
  const [showOptions, setShowOptions] = useState(false);
  const [selected, setSelected] = useState(null);
  const [popup, setPopup] = useState(null);
  const t = THEMES[useContext(ThemeCtx)];

  const check = (i) => {
    setSelected(i);
    setPopup(i === q.answer ? 'correct' : 'wrong');
  };

  if (showOptions) {
    return (
      <div className="q4-options-page">
        <p style={{ color:t.listenQColor, fontWeight:700, fontSize:'0.85rem', marginBottom:12 }}>{q.question}</p>
        {(q.options||[]).map((opt,i) => (
          <div key={i} className="q4-option-item" onClick={() => check(i)}>
            <RadioDot checked={selected===i} />
            <span className="q4-option-text" style={{ whiteSpace:'pre-line' }}>{opt}</span>
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
        {q.primaryInstruction && <BlueBox text={q.primaryInstruction} />}
        {q.secondaryInstruction && <p>{q.secondaryInstruction}</p>}
        {q.tertiaryInstruction && <p>{q.tertiaryInstruction}</p>}
        {q.question && <p className="q2-prompt">{q.question}</p>}
        {q.paadal2 && <LeftBorderPoem text={q.paadal2} />}
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
        {q.primaryInstruction && <BlueBox text={q.primaryInstruction} />}
        {q.question && <p className="q2-prompt">{q.question}</p>}
        {q.paadal2 && <LeftBorderPoem text={q.paadal2} />}
        {q.secondaryInstruction && <p>{q.secondaryInstruction}</p>}
        {q.tertiaryInstruction && <p>{q.tertiaryInstruction}</p>}
        <div className="q3-options">
          {(q.options||[]).map((opt,i) => (
            <div key={i} className="q2-option q3-option" onClick={() => check(i)}>
              <RadioDot checked={selected===i} />
              <span style={{ whiteSpace:'pre-line' }}>{opt}</span>
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
        {q.primaryInstruction && <BlueBox text={q.primaryInstruction} />}
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
  const t = THEMES[useContext(ThemeCtx)];

  return (
    <div className="q2-wrap">
      <div className="q2-paadal" style={{ whiteSpace:'pre-line' }}>{q.paadal}</div>
      <MediaBar />
      <div className="q2-question-area q12-question-area">
        {q.primaryInstruction && <BlueBox text={q.primaryInstruction} />}
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
                  <span style={{ color:t.qaNumColor, fontWeight:700, fontSize:'0.78rem', minWidth:18 }}>{i+1}.</span>
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
    if (q.shuffledSentences && q.shuffledSentences.length === correct.length) {
      return [...q.shuffledSentences];
    }
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
  const t = THEMES[useContext(ThemeCtx)];

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
        {q.primaryInstruction && <BlueBox text={q.primaryInstruction} />}
        {q.secondaryInstruction && <p style={{ color:t.dragTextColor, fontSize:'0.82rem', marginBottom:4 }}>{q.secondaryInstruction}</p>}
        {q.tertiaryInstruction && <p style={{ color:t.dragTextColor, fontSize:'0.82rem', marginBottom:8 }}>{q.tertiaryInstruction}</p>}
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
    case 'mcq':           return q.stages
                            ? <StagedMCQQuestion key={Math.random()} q={q} onNext={onNext} />
                            : <MCQQuestion key={Math.random()} q={q} onNext={onNext} />;
    case 'listen-answer': return <ListenAnswerQuestion key={Math.random()} q={q} onNext={onNext} />;
    case 'mcq-paadal':   return <MCQPaadalQuestion key={Math.random()} q={q} onNext={onNext} />;
    case 'listen-repeat': return <ListenRepeatQuestion q={q} onNext={onNext} />;
    case 'qa':            return <QAQuestion key={Math.random()} q={q} onNext={onNext} />;
    case 'dragdrop':      return <DragDropQuestion key={Math.random()} q={q} onNext={onNext} />;
    default:              return <div className="question-body"><p>Unknown question type: {q.type}</p></div>;
  }
}

const STATIC_TYPES = new Set(['title','listen-repeat']);

export default function DynamicExerciseModal({ exercise, title, onClose, theme = 'akam' }) {
  const { leftButtons = [], rightContent = {}, rightContentEnglish = {}, questions = [] } = exercise;
  const [activeLeft, setActiveLeft] = useState(leftButtons[0] || '');
  const [currentQ, setCurrentQ] = useState(0);
  const [qKey, setQKey] = useState(0);
  const [showEnglish, setShowEnglish] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  // Font-size control: --fs multiplier applied to the whole modal. Starts at a
  // larger-than-original baseline; the A+ button cycles through the levels.
  const FONT_STEPS = [1.2, 1.4, 1.6, 1.85];
  const [fontStep, setFontStep] = useState(0);
  const fontScale = FONT_STEPS[fontStep];
  const t = THEMES[theme];

  useEffect(() => { setShowEnglish(false); }, [activeLeft]);

  const q = questions[currentQ];
  const isStatic = q && STATIC_TYPES.has(q.type);

  // Centre column header shows the exercise's own title (the title page's
  // primaryTitle, e.g. "முன்னுரை"); falls back to the passed title.
  const centreTitle = questions.find(qq => qq.type === 'title' && qq.primaryTitle)?.primaryTitle || title || 'பயிற்சி';

  const handleNext = () => {
    setCurrentQ(prev => (prev + 1) % questions.length);
    setQKey(k => k + 1);
  };

  return createPortal(
    <ThemeCtx.Provider value={theme}>
      <div
        className="fixed inset-0 z-[200] flex items-center justify-center bg-black/65 backdrop-blur-sm"
        style={{ position:'fixed', inset:0, zIndex:200, display:'flex', alignItems:'center', justifyContent:'center', background:'rgba(0,0,0,0.65)', backdropFilter:'blur(4px)' }}
        onClick={e => { if (e.target === e.currentTarget) onClose(); }}
      >
        <div style={fullscreen ? { position:'relative', width:'100vw', height:'100vh' } : { position:'relative' }}>
          {/* Font-size control — cycles the --fs multiplier; sits left of the fullscreen toggle */}
          <button
            onClick={() => setFontStep(s => (s + 1) % FONT_STEPS.length)}
            style={{ position:'absolute', top: fullscreen ? 4 : -12, right: fullscreen ? 84 : 60, zIndex:10, width:28, height:28, borderRadius:'50%', background:t.closeBg, color:t.closeColor, border:t.closeBorder, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'0 2px 8px rgba(0,0,0,0.5)', fontWeight:700, lineHeight:1 }}
            aria-label="Increase font size"
            title={`Font size (${Math.round(fontScale * 100)}%) — click to enlarge`}
          >
            <span style={{ fontSize:'0.62rem' }}>A</span><span style={{ fontSize:'0.9rem' }}>A</span>
          </button>
          {/* Fullscreen / minimize toggle — sits to the LEFT of the close button */}
          <button
            onClick={() => setFullscreen(f => !f)}
            style={{ position:'absolute', top: fullscreen ? 4 : -12, right: fullscreen ? 48 : 24, zIndex:10, width:28, height:28, borderRadius:'50%', background:t.closeBg, color:t.closeColor, border:t.closeBorder, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'0 2px 8px rgba(0,0,0,0.5)' }}
            aria-label={fullscreen ? 'Minimize' : 'Fullscreen'}
            title={fullscreen ? 'Minimize' : 'Fullscreen'}
          >
            {fullscreen ? (
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 3v3a2 2 0 0 1-2 2H3M21 8h-3a2 2 0 0 1-2-2V3M3 16h3a2 2 0 0 1 2 2v3M16 21v-3a2 2 0 0 1 2-2h3" /></svg>
            ) : (
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 3H5a2 2 0 0 0-2 2v3M21 8V5a2 2 0 0 0-2-2h-3M3 16v3a2 2 0 0 0 2 2h3M16 21h3a2 2 0 0 0 2-2v-3" /></svg>
            )}
          </button>
          <button
            onClick={onClose}
            style={{ position:'absolute', top: fullscreen ? 4 : -12, right: fullscreen ? 12 : -12, zIndex:10, width:28, height:28, borderRadius:'50%', background:t.closeBg, color:t.closeColor, border:t.closeBorder, cursor:'pointer', fontWeight:700, fontSize:'0.85rem', display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'0 2px 8px rgba(0,0,0,0.5)' }}
            aria-label="Close"
          >✕</button>

          <div className={t.scopeClass} style={{ '--fs': fontScale, ...(fullscreen ? { width:'100%', height:'100%' } : {}) }}>
            <div className="app-container" style={fullscreen ? { width:'100%', height:'100%', maxWidth:'none', maxHeight:'none', borderRadius:0 } : undefined}>
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
                <div className="centre-header">{centreTitle}</div>
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
                  {activeLeft && rightContent[activeLeft] ? (
                    <>
                      <p style={{ whiteSpace:'pre-line' }}>
                        {showEnglish ? rightContentEnglish[activeLeft] : rightContent[activeLeft]}
                      </p>
                      {activeLeft === 'நூற்பெயர்' && rightContentEnglish[activeLeft] && (
                        <button
                          onClick={() => setShowEnglish(v => !v)}
                          style={{
                            marginTop: 10,
                            background: showEnglish ? '#1a4cc8' : 'transparent',
                            color: showEnglish ? '#fff' : '#1a4cc8',
                            border: '1px solid #1a4cc8',
                            borderRadius: 4,
                            padding: '4px 14px',
                            fontSize: '0.76rem',
                            fontFamily: 'inherit',
                            cursor: 'pointer',
                            fontWeight: 600,
                            transition: 'all 0.15s',
                          }}
                        >
                          ஆங்கீலம்
                        </button>
                      )}
                    </>
                  ) : (
                    <p style={{ color:'#aaa', fontStyle:'italic', fontSize:'0.8rem' }}>Select a topic from the left.</p>
                  )}
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
    </ThemeCtx.Provider>,
    document.body
  );
}
