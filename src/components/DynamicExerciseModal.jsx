import './dynamic-exercise.css';
import './malai-app.css';
import './malai-app-aram.css';
import { useState, useEffect, useLayoutEffect, useRef, createContext, useContext } from 'react';
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
  // அறம் — green replica of the puram (.malai-scope) theme, anchored on #2D5128.
  // Mirrors puram's inline props with the brown palette remapped to green.
  aram: {
    scopeClass: 'aram-scope',
    box: { background:'rgba(45,81,40,0.12)', color:'#2D5128', borderLeft:'3px solid #2D5128', padding:'8px 12px', borderRadius:'0 6px 6px 0', marginBottom:8, fontSize:'0.83rem', lineHeight:1.7 },
    dotChecked: { background:'#2D5128', border:'4px solid #2D5128' },
    dotUnchecked: { background:'#fff', border:'2px solid #7d9e6f' },
    closeBg: '#1f3a1b', closeColor: '#eef5e3', closeBorder: '1px solid rgba(45,81,40,0.5)',
    listenQColor: '#eef5e3',
    qaNumColor: '#2D5128',
    dragTextColor: '#eef5e3',
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

const BlueBox = ({ text, color }) => {
  const t = THEMES[useContext(ThemeCtx)];
  return <div style={color ? { ...t.box, color } : t.box}>{text}</div>;
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
        {q.primaryInstruction && <p style={{ whiteSpace:'pre-line' }}>{q.primaryInstruction}</p>}
        {q.secondaryInstruction && <p style={{ whiteSpace:'pre-line' }}>{q.secondaryInstruction}</p>}
        {q.tertiaryInstruction && <p style={{ whiteSpace:'pre-line' }}>{q.tertiaryInstruction}</p>}
        {q.question && <p className="q2-prompt" style={q.redQuestion ? { color:'#d00000', fontWeight:700 } : undefined}>{q.question}</p>}
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
      {popup === 'wrong' && <WrongPopup message={q.wrongMessage} onRetry={() => { setPopup(null); setSelected(null); }} />}
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
  const [selected, setSelected] = useState(null);   // tap-to-place selection
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [showSuccess, setShowSuccess] = useState(false);
  const pageRef = useRef(null);
  const t = THEMES[useContext(ThemeCtx)];

  // While a line is armed, a translucent ghost of it follows the cursor
  // (mirroring the native drag image) so the learner sees what they picked.
  useEffect(() => {
    if (!selected) return;
    const onMove = (e) => setCursor({ x: e.clientX, y: e.clientY });
    window.addEventListener('pointermove', onMove);
    return () => window.removeEventListener('pointermove', onMove);
  }, [selected]);

  const placed = new Set(slots.filter(Boolean));
  const bank = shuffled.filter(s => !placed.has(s));

  // Place `item` into slotIdx if it is the correct line for that slot.
  const place = (item, slotIdx) => {
    if (item == null || slots[slotIdx] != null) return false;
    if (item === correct[slotIdx]) {
      const next = [...slots];
      next[slotIdx] = item;
      setSlots(next);
      if (next.every((s, i) => s === correct[i])) setShowSuccess(true);
      return true;
    }
    return false;
  };

  const handleDrop = (slotIdx) => {
    setDragOver(null);
    place(dragItem, slotIdx);
    setDragItem(null);
  };

  // Tap a bank item to arm it, then tap a slot to drop it there — removes the
  // need to drag across a scrolling page. Arming scrolls the slots into view so
  // a line grabbed at the bottom can be placed in a line near the top.
  const pickBank = (s, e) => {
    const next = selected === s ? null : s;
    setSelected(next);
    if (next && e) setCursor({ x: e.clientX, y: e.clientY });
    if (next && pageRef.current) pageRef.current.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const tapSlot = (slotIdx) => {
    if (selected == null) return;
    place(selected, slotIdx);   // stays only if it's the correct slot
    setSelected(null);          // wrong tap: release it back to the bank
  };

  return (
    <div className="q4-options-page q10-drag-page" ref={pageRef}>
      <div className="q2-question-area" style={{ background:'transparent', padding:'0 0 8px', overflow:'visible', flex:'none' }}>
        {q.primaryInstruction && <BlueBox text={q.primaryInstruction} color={t.dragTextColor} />}
        {q.secondaryInstruction && <p style={{ color:t.dragTextColor, fontSize:'0.82rem', marginBottom:4 }}>{q.secondaryInstruction}</p>}
        {q.tertiaryInstruction && <p style={{ color:t.dragTextColor, fontSize:'0.82rem', marginBottom:8 }}>{q.tertiaryInstruction}</p>}
        <p style={{ color:t.dragTextColor, opacity:0.75, fontSize:'0.72rem', margin:'2px 0 0' }}>
          வரியைச் சொடுக்கி, பின் அதை இட வேண்டிய இடத்தில் சொடுக்கவும். (இழுத்தும் இடலாம்)
        </p>
      </div>
      <div className="q10-slots">
        {correct.map((_, i) => (
          <div
            key={i}
            className={`q10-slot ${slots[i] ? 'q10-slot-filled' : ''} ${dragOver===i && !slots[i] ? 'q10-slot-hover' : ''} ${selected && !slots[i] ? 'q10-slot-armed' : ''}`}
            onDragOver={e => { e.preventDefault(); setDragOver(i); }}
            onDragLeave={() => setDragOver(null)}
            onDrop={() => handleDrop(i)}
            onClick={() => tapSlot(i)}
          >
            {slots[i] || ''}
          </div>
        ))}
      </div>
      <div className="q10-bank">
        {bank.map((s, i) => (
          <div
            key={i}
            className={`q10-bank-item ${selected === s ? 'q10-bank-item-selected' : ''}`}
            draggable
            onDragStart={() => { setDragItem(s); setSelected(null); }}
            onDragEnd={() => setDragItem(null)}
            onClick={(e) => pickBank(s, e)}
          >
            {s}
          </div>
        ))}
      </div>
      {selected && (
        <div className="q10-tap-ghost" style={{ left: cursor.x + 4, top: cursor.y + 4 }}>
          {selected}
        </div>
      )}
      {showSuccess && <CorrectPopup onNext={() => { setShowSuccess(false); onNext(); }} />}
    </div>
  );
}

/* Word-level drag-and-drop: the scrambled சீர்கள் are broken into single-word
   tiles (kept in the exact given order), and the learner rebuilds the poem on a
   grid of blank lines — 4 lines in the first row, 3 in the second. A two-word
   line is split into a LEFT half and a RIGHT half (each a separate drop target,
   with a centre tick shown while placing): படை goes on the left half, குடி on
   the right → படைகுடி. A tile sticks only if it is the exact word that half
   expects — otherwise it is released back to the bank, like the line dragdrop. */
function DragDropWordsQuestion({ q, onNext }) {
  const rows = q.rows || [];
  // Flatten the row/slot grid into a flat slot list, each keeping its ordered
  // list of expected words (one per half) and its (row, col) position.
  const slotSpec = [];
  rows.forEach((row, r) => row.forEach((words, c) => slotSpec.push({ row: r, col: c, words })));
  const bankOrder = q.bank || [];

  // placed[slotIdx][pos] = the word dropped on that half (or null). Each line
  // has one cell per expected word, so a two-word line has a left+right cell.
  const [placed, setPlaced] = useState(() => slotSpec.map(s => s.words.map(() => null)));
  const [usedIdx, setUsedIdx] = useState(() => new Set());   // consumed bank tiles
  const [dragItem, setDragItem] = useState(null);            // bank index being dragged
  const [dragOver, setDragOver] = useState(null);            // { slot, pos } under the pointer
  const [selIdx, setSelIdx] = useState(null);                // armed bank tile (tap-to-place)
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [showSuccess, setShowSuccess] = useState(false);
  const pageRef = useRef(null);
  const t = THEMES[useContext(ThemeCtx)];

  useEffect(() => {
    if (selIdx == null) return;
    const onMove = (e) => setCursor({ x: e.clientX, y: e.clientY });
    window.addEventListener('pointermove', onMove);
    return () => window.removeEventListener('pointermove', onMove);
  }, [selIdx]);

  // Place bank tile `bankIdx` onto half `pos` of line `slotIdx` iff that half is
  // empty and expects exactly that word. Returns whether it stuck.
  const tryPlace = (bankIdx, slotIdx, pos) => {
    if (bankIdx == null || slotIdx == null || pos == null || usedIdx.has(bankIdx)) return false;
    const spec = slotSpec[slotIdx];
    if (placed[slotIdx][pos] != null) return false;                 // half already taken
    if (bankOrder[bankIdx] !== spec.words[pos]) return false;       // wrong word for this half
    const nextPlaced = placed.map((arr, i) =>
      i === slotIdx ? arr.map((w, p) => (p === pos ? bankOrder[bankIdx] : w)) : arr);
    const nextUsed = new Set(usedIdx); nextUsed.add(bankIdx);
    setPlaced(nextPlaced);
    setUsedIdx(nextUsed);
    if (nextPlaced.every(arr => arr.every(w => w != null))) setShowSuccess(true);
    return true;
  };

  const handleDrop = (slotIdx, pos) => { setDragOver(null); tryPlace(dragItem, slotIdx, pos); setDragItem(null); };

  const pickBank = (i, e) => {
    const next = selIdx === i ? null : i;
    setSelIdx(next);
    if (next != null && e) setCursor({ x: e.clientX, y: e.clientY });
    if (next != null && pageRef.current) pageRef.current.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const tapCell = (slotIdx, pos) => {
    if (selIdx == null) return;
    tryPlace(selIdx, slotIdx, pos);   // sticks only if it is the correct word for this half
    setSelIdx(null);                  // wrong tap: release it back to the bank
  };

  return (
    <div className="q4-options-page q10-drag-page" ref={pageRef}>
      <div className="q2-question-area" style={{ background:'transparent', padding:'0 0 8px', overflow:'visible', flex:'none' }}>
        {q.primaryInstruction && <BlueBox text={q.primaryInstruction} color={t.dragTextColor} />}
        {q.secondaryInstruction && <p style={{ color:t.dragTextColor, fontSize:'0.82rem', marginBottom:4 }}>{q.secondaryInstruction}</p>}
        {q.tertiaryInstruction && <p style={{ color:t.dragTextColor, fontSize:'0.82rem', marginBottom:8 }}>{q.tertiaryInstruction}</p>}
        <p style={{ color:t.dragTextColor, opacity:0.75, fontSize:'0.72rem', margin:'2px 0 0' }}>
          சொல்லைச் சொடுக்கி, பின் அதை இட வேண்டிய கோட்டின்மேல் சொடுக்கவும். (இழுத்தும் இடலாம்)
        </p>
      </div>
      <div className="q10w-rows">
        {rows.map((row, r) => (
          <div className="q10w-row" key={r}>
            {row.map((_, c) => {
              const slotIdx = slotSpec.findIndex(s => s.row === r && s.col === c);
              const spec = slotSpec[slotIdx];
              const cells = placed[slotIdx];
              const full = cells.every(w => w != null);
              const armed = selIdx != null || dragItem != null;   // a tile is in hand
              return (
                <div key={c} className={`q10w-slot ${full ? 'q10w-slot-filled' : ''}`}>
                  <div className={`q10w-cells ${spec.words.length > 1 ? 'q10w-cells-multi' : ''} ${armed ? 'q10w-cells-armed' : ''} ${full ? 'q10w-cells-full' : ''}`}>
                    {spec.words.map((_, p) => {
                      const cellFilled = cells[p] != null;
                      const isOver = dragOver && dragOver.slot === slotIdx && dragOver.pos === p;
                      return (
                        <div
                          key={p}
                          className={`q10w-cell ${cellFilled ? 'q10w-cell-filled' : ''} ${isOver && !cellFilled ? 'q10w-cell-hover' : ''} ${armed && !cellFilled ? 'q10w-cell-armed' : ''}`}
                          onDragOver={e => { e.preventDefault(); setDragOver({ slot: slotIdx, pos: p }); }}
                          onDragLeave={() => setDragOver(null)}
                          onDrop={() => handleDrop(slotIdx, p)}
                          onClick={() => tapCell(slotIdx, p)}
                        >
                          <span className="q10w-word">{cells[p] || ''}</span>
                        </div>
                      );
                    })}
                  </div>
                  <div className="q10w-line" />
                </div>
              );
            })}
          </div>
        ))}
      </div>
      <div className="q10-bank q10w-bank">
        {bankOrder.map((w, i) => usedIdx.has(i) ? null : (
          <div
            key={i}
            className={`q10-bank-item ${selIdx === i ? 'q10-bank-item-selected' : ''}`}
            draggable
            onDragStart={() => { setDragItem(i); setSelIdx(null); }}
            onDragEnd={() => setDragItem(null)}
            onClick={(e) => pickBank(i, e)}
          >
            {w}
          </div>
        ))}
      </div>
      {selIdx != null && (
        <div className="q10-tap-ghost" style={{ left: cursor.x + 4, top: cursor.y + 4 }}>
          {bankOrder[selIdx]}
        </div>
      )}
      {showSuccess && <CorrectPopup onNext={() => { setShowSuccess(false); onNext(); }} />}
    </div>
  );
}

/* ── Tamil text helpers (for the fill-in-the-blanks assessment) ── */
// A Tamil "letter" is a grapheme cluster: a base char plus any following
// combining vowel signs / pulli. These code points attach to the base.
const isTamilCombining = (cp) =>
  (cp >= 0x0bbe && cp <= 0x0bcd) || cp === 0x0bd7 || cp === 0x200d;

// Split a string into visual letters (clusters). Spaces are their own cluster.
function splitClusters(str) {
  const out = [];
  for (const ch of (str || '').normalize('NFC')) {
    const cp = ch.codePointAt(0);
    if (out.length && isTamilCombining(cp)) out[out.length - 1] += ch;
    else out.push(ch);
  }
  return out;
}

// Normalise for comparison: NFC, trim, collapse internal whitespace.
const normAns = (s) => (s || '').normalize('NFC').trim().replace(/\s+/g, ' ');

// On-screen Tamil keyboard layout. Every key simply appends its character(s)
// to the active field — vowel signs are combining chars that visually merge
// with the preceding consonant, so plain concatenation renders correct uyirmei.
const KB_UYIR = ['அ','ஆ','இ','ஈ','உ','ஊ','எ','ஏ','ஐ','ஒ','ஓ','ஔ','ஃ'];
const KB_MEI = ['க','ங','ச','ஞ','ட','ண','த','ந','ப','ம','ய','ர','ல','வ','ழ','ள','ற','ன','ஜ','ஷ','ஸ','ஹ'];
// [char to insert, glyph shown on the key] — ◌ (U+25CC) makes the sign visible.
const KB_MATRA = [
  ['்','◌்'],['ா','◌ா'],['ி','◌ி'],['ீ','◌ீ'],['ு','◌ு'],['ூ','◌ூ'],
  ['ெ','◌ெ'],['ே','◌ே'],['ை','◌ை'],['ொ','◌ொ'],['ோ','◌ோ'],['ௌ','◌ௌ'],
];

/* ── Romanised-Tamil transliteration (physical-keyboard input, page 4 test) ──
   Greedy longest-match phonetic scheme, à la Google Input Tools: the learner
   types Latin on their real keyboard and Tamil letters form live. Vowel signs
   (matras) attach to a pending consonant; a consonant with no vowel gets pulli.
   Uppercase N/L/R/T = retroflex; doubled vowels = long; zh→ழ, ng→ங, nj→ஞ. */
const PULLI = '்';
const TL_VOWELS = [
  ['aa','ஆ','ா'],['ai','ஐ','ை'],['au','ஔ','ௌ'],['ae','ஏ','ே'],
  ['ee','ஈ','ீ'],['ii','ஈ','ீ'],['oo','ஓ','ோ'],['ou','ஔ','ௌ'],['uu','ஊ','ூ'],
  ['A','ஆ','ா'],['E','ஏ','ே'],['I','ஈ','ீ'],['O','ஓ','ோ'],['U','ஊ','ூ'],
  ['a','அ',''],['e','எ','ெ'],['i','இ','ி'],['o','ஒ','ொ'],['u','உ','ு'],
];
const TL_CONS_BASE = [
  ['zh','ழ'],['ng','ங'],['nj','ஞ'],['ch','ச'],['sh','ஷ'],['th','த'],['dh','த'],
  ['R','ற'],['N','ண'],['L','ள'],['T','ட'],['D','ட'],
  ['k','க'],['g','க'],['c','ச'],['s','ச'],['j','ஜ'],['t','த'],['d','த'],
  ['n','ந'],['p','ப'],['b','ப'],['m','ம'],['y','ய'],['r','ர'],['l','ல'],
  ['v','வ'],['w','வ'],['h','ஹ'],['f','ப'],
];
// Alternate consonant readings → drive the candidate suggestions.
const withOverrides = (base, ov) => base.map(([k, v]) => [k, ov[k] || v]);
const TL_ALT_A = withOverrides(TL_CONS_BASE, { n:'ன', r:'ற', l:'ள' });
const TL_ALT_B = withOverrides(TL_CONS_BASE, { t:'ட', d:'ட', n:'ண', s:'ஸ' });

function transliterate(latin, cons = TL_CONS_BASE) {
  const s = latin || '';
  let out = '', pending = false, i = 0;
  const match = (arr) => { for (const e of arr) if (s.startsWith(e[0], i)) return e; return null; };
  while (i < s.length) {
    const c = match(cons);
    if (c) { if (pending) out += PULLI; out += c[1]; pending = true; i += c[0].length; continue; }
    const v = match(TL_VOWELS);
    if (v) { if (pending) { out += v[2]; pending = false; } else { out += v[1]; } i += v[0].length; continue; }
    if (pending) { out += PULLI; pending = false; }
    out += s[i]; i += 1;
  }
  if (pending) out += PULLI;
  return out;
}

// Several consonant-reading profiles → drive richer, letter-related candidates.
const TL_PROFILES = [
  TL_CONS_BASE,
  withOverrides(TL_CONS_BASE, { n:'ன', r:'ற', l:'ள' }),
  withOverrides(TL_CONS_BASE, { t:'ட', d:'ட', n:'ண' }),
  withOverrides(TL_CONS_BASE, { s:'ஷ', c:'ச' }),
  withOverrides(TL_CONS_BASE, { l:'ழ', r:'ற' }),
  withOverrides(TL_CONS_BASE, { n:'ன', l:'ல', t:'ட', s:'ஸ' }),
];
const isLatinVowel = (ch) => 'aeiouAEIOU'.includes(ch);

// Distinct Tamil spellings for one Latin buffer: every profile, plus
// "dropped dangling final consonant" forms (like Google trimming a stray 'l').
function tlVariants(buffer) {
  if (!buffer) return [];
  const seen = new Set(), out = [];
  const push = (s) => { if (s && !seen.has(s)) { seen.add(s); out.push(s); } };
  for (const p of TL_PROFILES) push(transliterate(buffer, p));
  const last = buffer[buffer.length - 1];
  if (last && /[a-zA-Z]/.test(last) && !isLatinVowel(last)) {
    push(transliterate(buffer.slice(0, -1)));
    push(transliterate(buffer.slice(0, -1), TL_PROFILES[1]));
  }
  return out;
}

// Word-scoped suggestions: variants of ONLY the word being composed (`roman`),
// re-inserted between the untouched prefix/suffix. So alternate spellings never
// rewrite letters in words the learner already finished typing.
function wordSuggestions(prefix, roman, suffix) {
  if (!roman) return [];
  const seen = new Set(), out = [];
  const push = (s) => { if (s && !seen.has(s)) { seen.add(s); out.push(s); } };
  for (const v of tlVariants(roman)) push(prefix + v + suffix);
  push(prefix + roman + suffix);          // keep-English fallback
  return out.slice(0, 6);
}

// A native, fully-editable <input> holding the live-transliterated Tamil.
// Only Latin letters are intercepted (to transliterate the current word at the
// caret); Backspace, Delete, arrows, Home/End, click, Ctrl+A and selection are
// all left to the browser — so mid-word edits, replace, and select-all-then-erase
// behave exactly like a normal text box. A word is "committed" (transliteration
// state cleared) on space, caret move, or any native edit, so the word before
// the caret is never rewritten. ↑/↓ move through the suggestion list; Enter picks
// the highlighted one, otherwise it advances to the next blank.
function TransliterateField({ value, active, onFocus, onChange, onEnterAdvance }) {
  const ref = useRef(null);
  const roman = useRef('');        // Latin letters of the word being composed
  const anchor = useRef(0);        // index in `value` where that word starts
  const tail = useRef(0);          // index in `value` where that word ends
  const caretWant = useRef(null);  // caret to restore after a controlled update
  const wasActive = useRef(false);
  const [hi, setHi] = useState(-1);

  // Restore the caret after React re-renders the controlled value.
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || !active) return;
    if (document.activeElement !== el) el.focus();
    if (caretWant.current != null) {
      const p = Math.max(0, Math.min(caretWant.current, el.value.length));
      try { el.setSelectionRange(p, p); } catch { /* noop */ }
      caretWant.current = null;
    }
  });

  // On first becoming active, drop any composition and place caret at the end.
  useEffect(() => {
    if (active && !wasActive.current) {
      roman.current = ''; anchor.current = (value || '').length; tail.current = (value || '').length;
      setHi(-1); caretWant.current = (value || '').length;
    }
    wasActive.current = active;
  }, [active, value]);

  const resetComposition = () => { roman.current = ''; setHi(-1); };

  const suggestions = active && roman.current
    ? wordSuggestions(value.slice(0, anchor.current), roman.current, value.slice(tail.current))
    : [];

  const pick = (word) => {
    const suffix = value.slice(tail.current);
    caretWant.current = word.length - suffix.length;
    resetComposition();
    onChange(word);
  };

  const onKeyDown = (e) => {
    const el = ref.current;
    const list = suggestions;
    if (list.length) {
      if (e.key === 'ArrowDown') { e.preventDefault(); setHi(h => (h + 1) % list.length); return; }
      if (e.key === 'ArrowUp')   { e.preventDefault(); setHi(h => (h - 1 + list.length) % list.length); return; }
      if (e.key === 'Enter' && hi >= 0) { e.preventDefault(); pick(list[hi]); return; }
      if (e.key === 'Escape')    { e.preventDefault(); resetComposition(); return; }
    }
    if (e.key === 'Enter') { e.preventDefault(); resetComposition(); onEnterAdvance(); return; }
    // Let the browser handle copy / paste / select-all and every editing/navigation
    // key natively; just end the current word so the next letter starts fresh.
    if (e.ctrlKey || e.metaKey || e.altKey) { resetComposition(); return; }
    if (!/^[a-zA-Z]$/.test(e.key)) { resetComposition(); return; }

    // A Latin letter → transliterate the active word in place.
    e.preventDefault();
    const start = el.selectionStart, end = el.selectionEnd;
    const continuing = roman.current && start === end && start === tail.current;
    if (continuing) {
      roman.current += e.key;
      const prefix = value.slice(0, anchor.current), suffix = value.slice(tail.current);
      const tamil = transliterate(roman.current);
      tail.current = anchor.current + tamil.length;
      caretWant.current = tail.current;
      onChange(prefix + tamil + suffix);
    } else {
      // start a new word at the caret, replacing any selection
      anchor.current = start;
      roman.current = e.key;
      const tamil = transliterate(e.key);
      tail.current = start + tamil.length;
      caretWant.current = tail.current;
      onChange(value.slice(0, start) + tamil + value.slice(end));
    }
    setHi(-1);
  };

  // Native edits (backspace, delete, cut, drag, select-all-then-delete, Tamil paste)
  // fire React's onChange; the browser has already applied them, so just sync up.
  const handleNativeChange = (e) => {
    resetComposition();
    caretWant.current = e.target.selectionStart;
    onChange(e.target.value);
  };

  // ASCII paste → transliterate; Tamil paste falls through to handleInput.
  const handlePaste = (e) => {
    const txt = (e.clipboardData || window.clipboardData)?.getData('text') || '';
    if (!/^[\x00-\x7F]+$/.test(txt)) return;
    e.preventDefault();
    const el = ref.current, s = el.selectionStart, en = el.selectionEnd;
    const tamil = transliterate(txt);
    resetComposition();
    caretWant.current = s + tamil.length;
    onChange(value.slice(0, s) + tamil + value.slice(en));
  };

  return (
    <>
      <input
        ref={ref}
        className="fib-tl-input"
        value={value}
        onFocus={onFocus}
        onMouseDown={resetComposition}
        onKeyDown={onKeyDown}
        onChange={handleNativeChange}
        onPaste={handlePaste}
        placeholder="Type in English to see the Tamil Translation"
        spellCheck={false}
        autoComplete="off"
      />
      {active && suggestions.length > 0 && (
        <div className="fib-suggest">
          {suggestions.map((w, k) => (
            <button
              type="button"
              key={w}
              className={`fib-suggest-item ${k === hi ? 'fib-suggest-active' : ''}`}
              onMouseEnter={() => setHi(k)}
              onMouseDown={(e) => { e.preventDefault(); pick(w); }}
            >
              {w}
            </button>
          ))}
        </div>
      )}
    </>
  );
}

// When a blank accepts alternates, colour against whichever accepted answer
// shares the longest leading run of letters with what the learner typed.
function pickBestTarget(user, accepted) {
  const u = splitClusters(normAns(user));
  let best = accepted[0], bestScore = -1;
  for (const tgt of accepted) {
    const a = splitClusters(normAns(tgt));
    let s = 0; while (s < u.length && u[s] === a[s]) s += 1;
    if (s > bestScore) { bestScore = s; best = tgt; }
  }
  return best;
}

// Per-letter colouring of a typed answer against the correct answer.
function ColouredAnswer({ user, answer }) {
  const u = splitClusters(normAns(user));
  const a = splitClusters(normAns(answer));
  if (u.length === 0) return <span style={{ color:'#cc0000' }}>—</span>;
  return (
    <span>
      {u.map((c, i) => (
        <span key={i} style={{ color: c === a[i] ? '#188a3b' : '#cc0000', fontWeight:600 }}>{c}</span>
      ))}
    </span>
  );
}

function FillBlanksQuestion({ q, onNext }) {
  const t = THEMES[useContext(ThemeCtx)];
  const blanks = q.blanks || [];
  const isTL = q.keyboardMode === 'transliterate';   // page 4 test: physical keyboard
  const [values, setValues] = useState(() => blanks.map(() => ''));      // typed Tamil (used for checking)
  const [active, setActive] = useState(0);
  const [checked, setChecked] = useState(false);
  const setValueAt = (i, nv) => setValues(v => v.map((val, j) => (j === i ? nv : val)));

  // First Enter (on the last blank) checks the answers → results page. A SECOND,
  // separate Enter press then advances to the next page — same as clicking
  // "அடுத்துப் பக்கம் »". We only advance once we've seen an Enter *release*
  // (keyup) after checking, so the very keypress that produced the results page
  // can never also skip past it (and a held Enter can't run through pages).
  useEffect(() => {
    if (!checked) return;
    let armed = false;
    const arm = (e) => { if (e.key === 'Enter') armed = true; };
    const advance = (e) => {
      if (e.key !== 'Enter' || !armed) return;
      e.preventDefault();
      onNext();
    };
    window.addEventListener('keyup', arm);
    window.addEventListener('keydown', advance);
    return () => {
      window.removeEventListener('keyup', arm);
      window.removeEventListener('keydown', advance);
    };
  }, [checked, onNext]);

  // ── on-screen keyboard (page 3, unused by தேர்வு) editing ──
  const insert = (chunk) => setValues(v => v.map((val, i) => (i === active ? val + chunk : val)));
  const backspace = () => setValues(v => v.map((val, i) => {
    if (i !== active) return val;
    const cl = splitClusters(val); cl.pop(); return cl.join('');
  }));
  const clearActive = () => setValues(v => v.map((val, i) => (i === active ? '' : val)));

  // Enter → move to the next blank; on the last blank, trigger the அடுத்து check.
  const handleEnter = () => {
    if (active >= blanks.length - 1) setChecked(true);
    else setActive(active + 1);
  };

  // A blank is correct if the typed answer matches its answer or any accepted alternate.
  const acceptedFor = (b) => [b.answer, ...(b.accept || [])];
  const results = blanks.map((b, i) => acceptedFor(b).some(a => normAns(values[i]) === normAns(a)));
  const accent = t.dotChecked.background;

  // On-screen (non-TL) suggestions: prefix match against the answer pool. TL-mode
  // suggestions are computed and rendered inside TransliterateField itself.
  const activeLabel = blanks[active]?.label;
  const onscreenSugg = (() => {
    const pool = (q.suggestions && q.suggestions[activeLabel]) || [];
    const typed = values[active] || '';
    return typed ? pool.filter(w => w !== typed && w.startsWith(typed)).slice(0, 3) : [];
  })();
  const suggestions = checked ? [] : onscreenSugg;
  const pickSuggestion = (i, tamil) => setValueAt(i, tamil);

  return (
    <div className="q2-wrap">
      <div className="q2-paadal" style={{ whiteSpace:'pre-line' }}>{q.paadal}</div>
      <MediaBar />
      <div className="fib-lower">
        {q.question && <p className="fib-prompt">{q.question}</p>}

        <div className="fib-list">
          {blanks.map((b, i) => {
           const colourTarget = checked ? pickBestTarget(values[i], acceptedFor(b)) : b.answer;
           return (
            <div className="fib-row" key={i}>
              <span className="fib-num">{(q.startNumber || 1) + i}.</span>
              <span className="fib-label">{b.label}</span>
              <span className="fib-colon">:</span>
              {checked ? (
                <span className="fib-field-wrap" style={{ flex:'none' }}>
                  <span className="fib-mark">
                    <ColouredAnswer user={values[i]} answer={colourTarget} />
                    {results[i] ? (
                      <svg viewBox="0 0 24 24" fill="none" stroke="#188a3b" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                    ) : (
                      <>
                        <svg viewBox="0 0 24 24" fill="none" stroke="#cc0000" strokeWidth="3" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                        <span className="fib-correct-answer">சரியான விடை : {b.answer}</span>
                      </>
                    )}
                  </span>
                </span>
              ) : isTL ? (
                <span className="fib-field-wrap">
                  <TransliterateField
                    value={values[i]}
                    active={active === i}
                    onFocus={() => setActive(i)}
                    onChange={(nv) => setValueAt(i, nv)}
                    onEnterAdvance={handleEnter}
                  />
                </span>
              ) : (
                <span className="fib-field-wrap">
                  <div
                    className={`fib-field ${active === i ? 'fib-active' : ''} ${values[i] ? '' : 'fib-empty'}`}
                    onClick={() => setActive(i)}
                    style={active === i ? { color: accent } : undefined}
                  >
                    {active === i ? (
                      <>
                        {values[i] && <span className="fib-typed">{values[i]}</span>}
                        <span className="fib-caret" />
                      </>
                    ) : (
                      values[i] ? <span className="fib-typed">{values[i]}</span> : <span className="fib-ph">இங்கே தட்டச்சு செய்க…</span>
                    )}
                  </div>
                  {active === i && suggestions.length > 0 && (
                    <div className="fib-suggest">
                      {suggestions.map(w => (
                        <button type="button" key={w} className="fib-suggest-item" onClick={() => pickSuggestion(i, w)}>{w}</button>
                      ))}
                    </div>
                  )}
                </span>
              )}
            </div>
           );
          })}
        </div>

        {!checked && !isTL && (
          <div className="fib-keyboard" aria-label="தமிழ் விசைப்பலகை">
            <div className="fib-kb-row">
              {KB_UYIR.map(ch => <button type="button" key={ch} className="fib-key" onClick={() => insert(ch)}>{ch}</button>)}
            </div>
            <div className="fib-kb-row">
              {KB_MEI.map(ch => <button type="button" key={ch} className="fib-key" onClick={() => insert(ch)}>{ch}</button>)}
            </div>
            <div className="fib-kb-row">
              {KB_MATRA.map(([ins, glyph]) => <button type="button" key={ins} className="fib-key" onClick={() => insert(ins)}>{glyph}</button>)}
              <button type="button" className="fib-key fib-key-wide" onClick={() => insert(' ')}>இடைவெளி</button>
              <button type="button" className="fib-key fib-key-util" onClick={backspace}>⌫</button>
              <button type="button" className="fib-key fib-key-util" onClick={clearActive}>அழி</button>
            </div>
          </div>
        )}

        {!checked && isTL && (
          <p className="fib-hint">
            உங்கள் விசைப்பலகையில் ஆங்கில எழுத்துகளால் ஒலிபெயர்த்து எழுதுங்கள் — தமிழ் எழுத்துகள் தானாக உருவாகும்.
            எ.கா. <b>ka</b>→க, <b>koo</b>→கோ, <b>N L R T</b> (பெரிய எழுத்து)→ண ள ற ட, <b>zh</b>→ழ, <b>ng</b>→ங, <b>nj</b>→ஞ.
            கீழே தோன்றும் பரிந்துரைகளில் ஒன்றைச் சொடுக்கியும் தேர்ந்தெடுக்கலாம்.
          </p>
        )}

        <div className="fib-actions">
          <button
            type="button"
            className="fib-next-btn"
            style={{ background: accent }}
            onClick={() => (checked ? onNext() : setChecked(true))}
          >
            {checked ? 'அடுத்துப் பக்கம் »' : 'அடுத்து »'}
          </button>
        </div>
      </div>
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
    case 'dragdrop-words': return <DragDropWordsQuestion key={Math.random()} q={q} onNext={onNext} />;
    case 'fillblanks':    return <FillBlanksQuestion key={Math.random()} q={q} onNext={onNext} />;
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
  const rightContentRef = useRef(null);
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
                <div className="right-header">{activeLeft || title || 'பயிற்சி'}</div>
                <div className="right-content" ref={rightContentRef}>
                  {activeLeft && rightContent[activeLeft] ? (
                    <>
                      <p style={{ whiteSpace:'pre-line' }}>
                        {showEnglish ? rightContentEnglish[activeLeft] : rightContent[activeLeft]}
                      </p>
                      {(activeLeft === 'நூற்பெயர்' || activeLeft === 'நூல்') && rightContentEnglish[activeLeft] && (
                        <button
                          onClick={() => { setShowEnglish(v => !v); if (rightContentRef.current) rightContentRef.current.scrollTop = 0; }}
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
                          {showEnglish ? 'தமிழ்' : 'ஆங்கீலம்'}
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
