import { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuizData } from '../hooks/useLessonData';

const FONT      = 'Arial Unicode MS, Arial, sans-serif';
const BLUE_DARK = '#0d2a80';
const BLUE_MID  = '#1a4cc8';
const GREEN     = '#16a34a';
const RED       = '#dc2626';

/* ─────────────────────────────────────────
   Sparkle burst (correct answer celebration)
───────────────────────────────────────────*/
const SPARK_COLORS = ['#FFD700','#FF6B6B','#4ECDC4','#A78BFA','#34D399','#F59E0B'];

function SparkBurst() {
  return (
    <div style={{ position:'absolute', left:'50%', top:'50%', pointerEvents:'none', zIndex:10 }}>
      {SPARK_COLORS.map((color, i) => {
        const angle  = (i / SPARK_COLORS.length) * 360;
        const rad    = (angle * Math.PI) / 180;
        const dist   = 40;
        return (
          <motion.div key={i}
            initial={{ x:0, y:0, scale:1, opacity:1 }}
            animate={{ x: Math.cos(rad)*dist, y: Math.sin(rad)*dist, scale:0, opacity:0 }}
            transition={{ duration:0.55, ease:'easeOut', delay: i*0.03 }}
            style={{ position:'absolute', width:8, height:8, borderRadius:'50%', background:color, transform:'translate(-50%,-50%)' }}
          />
        );
      })}
    </div>
  );
}

/* ─────────────────────────────────────────
   Confetti (completion screen)
───────────────────────────────────────────*/
function Confetti() {
  const pieces = Array.from({ length: 18 }, (_, i) => ({
    id: i, color: SPARK_COLORS[i % SPARK_COLORS.length],
    x: (Math.random() - 0.5) * 260,
    delay: Math.random() * 0.5,
    dur: 1.2 + Math.random() * 0.8,
    rotate: Math.random() * 360,
  }));
  return (
    <div style={{ position:'absolute', top:0, left:'50%', pointerEvents:'none', zIndex:0 }}>
      {pieces.map(p => (
        <motion.div key={p.id}
          initial={{ x:0, y:0, opacity:1, rotate:0, scale:1 }}
          animate={{ x:p.x, y:180, opacity:0, rotate:p.rotate, scale:0.4 }}
          transition={{ duration:p.dur, delay:p.delay, ease:'easeOut' }}
          style={{ position:'absolute', width:8, height:8, borderRadius:2, background:p.color }}
        />
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────
   Audio player
───────────────────────────────────────────*/
function AudioPlayer({ src }) {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [hasAudio, setHasAudio] = useState(true);

  const play   = useCallback(() => { audioRef.current?.play().then(() => setPlaying(true)).catch(() => setHasAudio(false)); }, []);
  const pause  = useCallback(() => { audioRef.current?.pause(); setPlaying(false); }, []);
  const stop   = useCallback(() => { if (audioRef.current) { audioRef.current.pause(); audioRef.current.currentTime = 0; } setPlaying(false); }, []);
  const rewind = useCallback(() => { if (audioRef.current) audioRef.current.currentTime = 0; }, []);
  useEffect(() => { const a = audioRef.current; if (a) a.onended = () => setPlaying(false); }, []);

  const btn = (active) => ({
    background: active ? '#081f60' : 'linear-gradient(135deg,#3a6ae8,#1a3ab0)',
    color:'#fff', border:'none', borderRadius:4,
    width:30, height:26, fontSize:11, cursor:'pointer',
    display:'flex', alignItems:'center', justifyContent:'center',
    boxShadow: active ? 'inset 0 2px 4px rgba(0,0,0,0.4)' : '0 2px 6px rgba(0,30,120,0.35)',
    transition:'all 0.15s',
  });

  return (
    <motion.div whileHover={{ boxShadow:'0 4px 20px rgba(26,60,180,0.45)' }}
      style={{ display:'flex', alignItems:'center', gap:5, background:'linear-gradient(135deg,#1a3090,#0d1f70)', borderRadius:6, padding:'6px 12px', marginBottom:10, width:'fit-content', boxShadow:'0 2px 10px rgba(0,20,100,0.3)' }}
    >
      <audio ref={audioRef} src={src} preload="none" />
      <button style={btn(false)} onClick={rewind} title="Rewind">⏮</button>
      {playing
        ? <button style={btn(true)}  onClick={pause} title="Pause">⏸</button>
        : <button style={btn(false)} onClick={play}  title="Play">▶</button>}
      <button style={btn(false)} onClick={stop} title="Stop">⏹</button>
      {!hasAudio && <span style={{fontSize:10,color:'#ffcc88',marginLeft:6}}>(audio not found)</span>}
      {hasAudio  && <span style={{fontSize:10,color:'rgba(180,200,255,0.85)',marginLeft:8,fontStyle:'italic'}}>{playing ? '🎵 இயங்குகிறது...' : 'கேளுங்கள்'}</span>}
    </motion.div>
  );
}

/* ─────────────────────────────────────────
   Progress dots
───────────────────────────────────────────*/
function ProgressDots({ total, current }) {
  return (
    <div style={{ display:'flex', gap:8, justifyContent:'center', marginBottom:12, alignItems:'center' }}>
      {Array.from({ length: total }).map((_, i) => (
        <motion.div key={i} style={{ position:'relative', display:'flex', alignItems:'center', justifyContent:'center' }}>
          {i === current && (
            <motion.div
              animate={{ scale:[1,1.8,1], opacity:[0.6,0,0.6] }}
              transition={{ duration:1.4, repeat:Infinity, ease:'easeInOut' }}
              style={{ position:'absolute', width:16, height:16, borderRadius:'50%', background:'rgba(26,76,200,0.35)' }}
            />
          )}
          <motion.div
            animate={{
              background: i < current ? GREEN : i === current ? BLUE_MID : '#c0cce8',
              scale: i === current ? 1.25 : 1,
              boxShadow: i === current ? `0 0 8px ${BLUE_MID}` : i < current ? `0 0 6px ${GREEN}` : 'none',
            }}
            transition={{ duration:0.4, type:'spring', stiffness:260 }}
            style={{ width:11, height:11, borderRadius:'50%', position:'relative', zIndex:1 }}
          />
        </motion.div>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────
   Buttons
───────────────────────────────────────────*/
function NextBtn({ onClick, disabled, children }) {
  return (
    <motion.button onClick={onClick} disabled={disabled}
      whileHover={!disabled ? { scale:1.06, boxShadow:'0 6px 20px rgba(26,76,200,0.5)' } : {}}
      whileTap={!disabled ? { scale:0.94 } : {}}
      style={{
        background: disabled ? '#a0b0c8' : `linear-gradient(135deg,${BLUE_MID},${BLUE_DARK})`,
        color:'#fff', border:'none', borderRadius:6, padding:'8px 22px',
        fontSize:13, fontFamily:FONT, cursor: disabled ? 'not-allowed' : 'pointer',
        fontWeight:'bold', boxShadow: disabled ? 'none' : '0 3px 10px rgba(0,40,120,0.35)',
        transition:'box-shadow 0.2s',
      }}
    >{children}</motion.button>
  );
}

function RetryBtn({ onClick, children }) {
  return (
    <motion.button onClick={onClick}
      whileHover={{ scale:1.06, boxShadow:'0 4px 14px rgba(0,0,0,0.25)' }}
      whileTap={{ scale:0.94 }}
      style={{ background:'linear-gradient(135deg,#6b7280,#374151)', color:'#fff', border:'none', borderRadius:6, padding:'8px 20px', fontSize:13, fontFamily:FONT, cursor:'pointer', fontWeight:'bold', boxShadow:'0 2px 8px rgba(0,0,0,0.2)' }}
    >{children}</motion.button>
  );
}

/* ─────────────────────────────────────────
   Feedback banner — correct / wrong
───────────────────────────────────────────*/
function Feedback({ correct }) {
  return (
    <motion.div
      initial={{ opacity:0, y:18, scale:0.88 }}
      animate={{ opacity:1, y:0, scale:1 }}
      exit={{ opacity:0, y:8, scale:0.92 }}
      transition={{ type:'spring', stiffness:380, damping:22 }}
      style={{
        display:'flex', alignItems:'center', gap:12,
        marginBottom:10, padding:'10px 16px', borderRadius:10,
        background: correct
          ? 'linear-gradient(135deg,#dcfce7,#bbf7d0)'
          : 'linear-gradient(135deg,#fee2e2,#fecaca)',
        border:`2px solid ${correct ? '#22c55e' : '#f87171'}`,
        position:'relative', overflow:'hidden',
      }}
    >
      {/* Shimmer sweep on correct */}
      {correct && (
        <motion.div
          initial={{ x:'-110%' }} animate={{ x:'210%' }}
          transition={{ duration:0.75, ease:'easeOut', delay:0.15 }}
          style={{ position:'absolute', inset:0, background:'linear-gradient(90deg,transparent,rgba(255,255,255,0.55),transparent)', pointerEvents:'none' }}
        />
      )}

      {/* Badge */}
      <motion.div
        initial={{ scale:0, rotate: correct ? -90 : 15 }}
        animate={{ scale:[0,1.35,1], rotate:0 }}
        transition={{ type:'spring', stiffness:420, damping:14, delay:0.05 }}
        style={{ position:'relative', width:44, height:44, borderRadius:'50%', flexShrink:0,
          background: correct ? 'linear-gradient(135deg,#22c55e,#16a34a)' : 'linear-gradient(135deg,#ef4444,#b91c1c)',
          display:'flex', alignItems:'center', justifyContent:'center',
          boxShadow: correct ? '0 4px 16px rgba(34,197,94,0.5)' : '0 4px 16px rgba(239,68,68,0.5)',
        }}
      >
        <span style={{ fontSize:22, color:'#fff', fontWeight:'bold', lineHeight:1 }}>
          {correct ? '✓' : '✗'}
        </span>
        {correct && <SparkBurst />}
      </motion.div>

      {/* Text */}
      <div>
        <motion.p
          initial={{ x:-12, opacity:0 }} animate={{ x:0, opacity:1 }}
          transition={{ delay:0.18 }}
          style={{ margin:0, fontSize:14, fontWeight:'bold', color: correct ? '#15803d' : '#b91c1c', fontFamily:FONT }}
        >
          {correct ? 'சரியான விடை!' : 'தவறான விடை!'}
        </motion.p>
        {!correct && (
          <motion.p
            initial={{ x:-12, opacity:0 }} animate={{ x:0, opacity:1 }}
            transition={{ delay:0.28 }}
            style={{ margin:0, marginTop:2, fontSize:12, color:'#991b1b', fontFamily:FONT }}
          >
            மீண்டும் முயற்சிக்கவும்.
          </motion.p>
        )}
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────
   Shared MCQ / word-order option renderer helpers
───────────────────────────────────────────*/
function getOptionStyle(submitted, isSel, isCorrect, answerCorrect) {
  if (!submitted) {
    return {
      bg: isSel ? '#dde8ff' : 'rgba(255,255,255,0.82)',
      border: isSel ? `2px solid ${BLUE_MID}` : '1px solid #c0d0ea',
      color: BLUE_DARK,
      shadow: isSel ? `0 0 0 3px rgba(26,76,200,0.15)` : '0 1px 4px rgba(0,30,100,0.06)',
    };
  }
  if (answerCorrect && isCorrect) return { bg:'#dcfce7', border:'2px solid #22c55e', color:'#14532d', shadow:'0 0 0 3px rgba(34,197,94,0.2)' };
  if (isSel && !isCorrect) return { bg:'#fee2e2', border:'2px solid #ef4444', color:'#7f1d1d', shadow:'0 0 0 3px rgba(239,68,68,0.2)' };
  return { bg:'rgba(240,240,245,0.7)', border:'1px solid #d0d8e8', color:'#94a3b8', shadow:'none' };
}

/* ─────────────────────────────────────────
   Intro screen
───────────────────────────────────────────*/
function IntroScreen({ onNext, poemLines, audioSrc, intro }) {
  const [selected, setSelected]   = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const correct = selected === 'yes';

  const submit = () => { if (!selected) return; setSubmitted(true); if (correct) setTimeout(onNext, 1100); };

  return (
    <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.4}}
      style={{ padding:'14px 18px', fontFamily:FONT, overflowY:'auto', flex:1 }}
    >
      <motion.div
        initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{delay:0.15}}
        style={{ background:'rgba(255,255,255,0.72)', border:'1px solid #c0d4f0', borderRadius:8, padding:'12px 16px', marginBottom:12, backdropFilter:'blur(4px)', boxShadow:'0 2px 12px rgba(0,30,120,0.08)' }}
      >
        {poemLines.map((l, i) => (
          <motion.div key={i} initial={{opacity:0,x:-8}} animate={{opacity:1,x:0}} transition={{delay:0.05*i+0.2}}
            style={{fontSize:13,color:BLUE_DARK,lineHeight:2}}
          >{l}</motion.div>
        ))}
      </motion.div>

      <AudioPlayer src={audioSrc} />

      <p style={{fontSize:13,color:'#334',marginBottom:3}}>{intro.instruction1}</p>
      <p style={{fontSize:13,color:'#334',marginBottom:14}}>{intro.instruction2}</p>
      <p style={{fontSize:14,fontWeight:'bold',color:'#b91c1c',marginBottom:12}}>{intro.question}</p>

      <div style={{ display:'flex', flexDirection:'column', gap:9, marginBottom:16 }}>
        {intro.options.map(opt => {
          const sel = !submitted && selected === opt.id;
          return (
            <motion.label key={opt.id}
              whileHover={{ x:5, boxShadow:'0 3px 12px rgba(26,76,200,0.18)' }}
              whileTap={{ scale:0.98 }}
              style={{ display:'flex', alignItems:'center', gap:10, cursor:'pointer', fontSize:13, color:BLUE_DARK,
                background: sel ? '#dde8ff' : 'rgba(255,255,255,0.82)',
                border: sel ? `2px solid ${BLUE_MID}` : '1px solid #c0d0ea',
                borderRadius:8, padding:'9px 14px', userSelect:'none',
                boxShadow: sel ? `0 0 0 3px rgba(26,76,200,0.12)` : '0 1px 4px rgba(0,30,100,0.06)',
                transition:'background 0.2s, border 0.2s',
              }}
            >
              <input type="radio" checked={sel} onChange={() => setSelected(opt.id)} style={{accentColor:BLUE_MID,width:15,height:15}} />
              <span style={{fontWeight: sel ? 'bold' : 'normal'}}>{opt.label}</span>
            </motion.label>
          );
        })}
      </div>

      <AnimatePresence>
        {submitted && <Feedback correct={correct} />}
      </AnimatePresence>

      {!submitted && (
        <div style={{display:'flex',justifyContent:'flex-end'}}>
          <NextBtn disabled={!selected} onClick={submit}>அடுத்து &gt;&gt;</NextBtn>
        </div>
      )}
    </motion.div>
  );
}

/* ─────────────────────────────────────────
   MCQ screen  (type: "mcq")
───────────────────────────────────────────*/
function McqScreen({ q, index, total, onCorrect, poemLines, audioSrc }) {
  const [selected, setSelected]           = useState(null);
  const [submitted, setSubmitted]         = useState(false);
  const [wrongStageIdx, setWrongStageIdx] = useState(-1);
  const renderMultilineText = (value) => Array.isArray(value) ? value.join('\n') : value;

  const hasWrongStages = Array.isArray(q.wrongStages) && q.wrongStages.length > 0;
  const currentStage   = hasWrongStages && wrongStageIdx >= 0 ? q.wrongStages[wrongStageIdx] : null;
  const activeOptions  = currentStage?.options ?? q.options;
  const isTextOnly     = currentStage && !Array.isArray(currentStage.options);

  const correct = submitted && activeOptions?.find(o => o.id === selected)?.correct;
  const reset   = () => { setSelected(null); setSubmitted(false); };
  const advanceWrongStage = () => {
    const next = wrongStageIdx + 1;
    setWrongStageIdx(hasWrongStages && next < q.wrongStages.length ? next : -1);
    setSelected(null);
    setSubmitted(false);
  };

  return (
    <motion.div key={q.id}
      initial={{x:70,opacity:0,scale:0.97}} animate={{x:0,opacity:1,scale:1}} exit={{x:-70,opacity:0,scale:0.97}}
      transition={{duration:0.35,ease:[0.25,0.46,0.45,0.94]}}
      style={{ padding:'12px 18px', fontFamily:FONT, overflowY:'auto', flex:1, display:'flex', flexDirection:'column' }}
    >
      <ProgressDots total={total} current={index} />

      {/* Poem strip */}
      <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.1}}
        style={{ background:'rgba(255,255,255,0.65)', border:'1px solid #c0d4f0', borderRadius:7, padding:'7px 12px', marginBottom:8, fontSize:11.5, color:BLUE_DARK, lineHeight:1.75, boxShadow:'0 1px 6px rgba(0,30,100,0.07)' }}
      >
        {poemLines.map((l, i) => <span key={i}>{l}{i < poemLines.length-1 ? ' | ' : ''}</span>)}
      </motion.div>

      <AudioPlayer src={audioSrc} />

      {/* Header */}
      <div style={{ background:`linear-gradient(135deg,${BLUE_DARK},${BLUE_MID})`, color:'#fff', borderRadius:'8px 8px 0 0', padding:'8px 14px', fontSize:12, fontWeight:'bold', display:'flex', justifyContent:'space-between', boxShadow:'0 2px 8px rgba(0,20,100,0.2)' }}>
        <span style={{fontFamily:FONT}}>அலகு 1 : பாடம் 6 : முல்லைப்பாட்டு 14-20</span>
        <motion.span key={index} initial={{opacity:0,y:-4}} animate={{opacity:1,y:0}}
          style={{fontFamily:FONT,opacity:0.9}}
        >வினா {index+1} / {total}</motion.span>
      </div>

      <div style={{ background:'rgba(255,255,255,0.85)', border:'1px solid #c0d4f0', borderTop:'none', borderRadius:'0 0 8px 8px', padding:'10px 14px', marginBottom:10, fontSize:13, color:'#1e293b', lineHeight:1.75, whiteSpace:'pre-line' }}>
        {currentStage ? currentStage.instruction : renderMultilineText(q.context)}
      </div>

      {!isTextOnly && q.question && (
        <motion.p initial={{opacity:0,x:-8}} animate={{opacity:1,x:0}} transition={{delay:0.15}}
          style={{ fontSize:14, fontWeight:'bold', color:'#b91c1c', marginBottom:10, paddingLeft:4, lineHeight:1.6, whiteSpace:'pre-line' }}
        >{renderMultilineText(q.question)}</motion.p>
      )}

      {/* Options */}
      {!isTextOnly && (
      <div key={wrongStageIdx} style={{ display:'flex', flexDirection:'column', gap:9, marginBottom:10, flex:1 }}>
        {activeOptions.map((opt, oi) => {
          const isSel     = selected === opt.id;
          const isCorrect = opt.correct;
          const s         = getOptionStyle(submitted, isSel, isCorrect, correct);

          return (
            <motion.label key={opt.id}
              initial={{opacity:0,x:-10}}
              animate={
                submitted && isSel && !isCorrect
                  ? { opacity:1, x:[0,-13,12,-9,7,-4,3,0] }
                  : submitted && correct && isCorrect
                  ? { opacity:1, x:0, scale:[1,1.025,1], boxShadow:['0 0 0px #22c55e','0 0 14px rgba(34,197,94,0.6)','0 0 4px rgba(34,197,94,0.2)'] }
                  : { opacity:1, x:0 }
              }
              transition={
                submitted && isSel && !isCorrect ? { duration:0.5 }
                : submitted && correct && isCorrect ? { duration:0.5, delay:0.05 }
                : { delay:0.08*oi+0.1 }
              }
              whileHover={!submitted ? { x:5, boxShadow:'0 4px 16px rgba(26,76,200,0.2)', y:-1 } : {}}
              style={{ display:'flex', alignItems:'center', gap:10, cursor: submitted ? 'default' : 'pointer',
                fontSize:13, color:s.color, background:s.bg, border:s.border, borderRadius:8,
                padding:'9px 13px', userSelect:'none', boxShadow:s.shadow,
                transition:'background 0.25s, border 0.25s, color 0.25s',
              }}
            >
              <input type="radio" name={`mcq-${q.id}`} checked={isSel}
                onChange={() => !submitted && setSelected(opt.id)}
                style={{accentColor:BLUE_MID,width:15,height:15,flexShrink:0}} />
              <span style={{flex:1}}>{opt.label}</span>
              <AnimatePresence>
                {submitted && ((correct && isCorrect) || (isSel && !isCorrect)) && (
                  <motion.span key="icon"
                    initial={{scale:0,rotate:-20}} animate={{scale:1,rotate:0}} exit={{scale:0}}
                    transition={{type:'spring',stiffness:400,damping:15}}
                    style={{fontSize:17,fontWeight:'bold'}}
                  >{isCorrect ? '✓' : '✗'}</motion.span>
                )}
              </AnimatePresence>
            </motion.label>
          );
        })}
      </div>
      )}

      <AnimatePresence>{submitted && <Feedback correct={correct} />}</AnimatePresence>

      <div style={{display:'flex',justifyContent:'flex-end',gap:8,paddingTop:4}}>
        {!isTextOnly && !submitted && <NextBtn disabled={!selected} onClick={() => setSubmitted(true)}>சரிபார்க்க</NextBtn>}
        {(isTextOnly || (submitted && !correct)) && <RetryBtn onClick={hasWrongStages ? advanceWrongStage : reset}>மீண்டும்</RetryBtn>}
        {submitted && correct  && <NextBtn onClick={onCorrect}>அடுத்து &gt;&gt;</NextBtn>}
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────
   Word-order screen (type: "word-order")
───────────────────────────────────────────*/
function WordOrderScreen({ q, index, total, onCorrect, poemLines }) {
  const [selected, setSelected]   = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const correct = submitted && q.options.find(o => o.id === selected)?.correct;
  const reset = () => { setSelected(null); setSubmitted(false); };

  return (
    <motion.div key={q.id}
      initial={{x:70,opacity:0,scale:0.97}} animate={{x:0,opacity:1,scale:1}} exit={{x:-70,opacity:0,scale:0.97}}
      transition={{duration:0.35,ease:[0.25,0.46,0.45,0.94]}}
      style={{ padding:'12px 18px', fontFamily:FONT, overflowY:'auto', flex:1, display:'flex', flexDirection:'column' }}
    >
      <ProgressDots total={total} current={index} />

      {/* Poem strip */}
      <div style={{ background:'rgba(255,255,255,0.65)', border:'1px solid #c0d4f0', borderRadius:7, padding:'7px 12px', marginBottom:8, fontSize:11.5, color:BLUE_DARK, lineHeight:1.75, boxShadow:'0 1px 6px rgba(0,30,100,0.07)' }}>
        {poemLines.map((l, i) => <span key={i}>{l}{i < poemLines.length-1 ? ' | ' : ''}</span>)}
      </div>

      {/* Header */}
      <div style={{ background:`linear-gradient(135deg,${BLUE_DARK},${BLUE_MID})`, color:'#fff', borderRadius:'8px 8px 0 0', padding:'8px 14px', fontSize:12, fontWeight:'bold', boxShadow:'0 2px 8px rgba(0,20,100,0.2)' }}>
        வினா {index+1} / {total}
      </div>
      <div style={{ background:'rgba(255,255,255,0.85)', border:'1px solid #c0d4f0', borderTop:'none', borderRadius:'0 0 8px 8px', padding:'10px 14px', marginBottom:10, fontSize:13, color:'#1e293b', lineHeight:1.75 }}>
        {q.instruction}
      </div>

      {/* Clue box */}
      {q.clue && (
        <motion.div initial={{opacity:0,y:6}} animate={{opacity:1,y:0}} transition={{delay:0.2}}
          style={{ background:'linear-gradient(135deg,#fffbeb,#fef3c7)', border:'1px solid #f59e0b', borderRadius:8, padding:'10px 14px', marginBottom:12, fontSize:13, color:'#78350f', lineHeight:1.85, boxShadow:'0 2px 8px rgba(245,158,11,0.15)' }}
        >
          <span style={{fontWeight:'bold',marginRight:6,color:'#92400e'}}>பொருள்:</span>{q.clue}
        </motion.div>
      )}

      {/* Options */}
      <div style={{ display:'flex', flexDirection:'column', gap:11, flex:1 }}>
        {q.options.map((opt, oi) => {
          const isSel     = selected === opt.id;
          const isCorrect = opt.correct;
          const s         = getOptionStyle(submitted, isSel, isCorrect, correct);

          return (
            <motion.div key={opt.id}
              initial={{opacity:0,y:8}}
              animate={
                submitted && isSel && !isCorrect
                  ? { opacity:1, y:0, x:[0,-13,12,-9,7,-4,3,0] }
                  : submitted && correct && isCorrect
                  ? { opacity:1, y:0, x:0, scale:[1,1.02,1], boxShadow:['0 0 0px #22c55e','0 0 16px rgba(34,197,94,0.55)','0 0 4px rgba(34,197,94,0.18)'] }
                  : { opacity:1, y:0, x:0 }
              }
              transition={
                submitted && isSel && !isCorrect ? { duration:0.5 }
                : submitted && correct && isCorrect ? { duration:0.55, delay:0.05 }
                : { delay:0.1*oi+0.1 }
              }
              onClick={() => !submitted && setSelected(opt.id)}
              whileHover={!submitted ? { y:-2, boxShadow:'0 6px 20px rgba(26,76,200,0.2)' } : {}}
              style={{ display:'flex', alignItems:'flex-start', gap:10, cursor: submitted ? 'default' : 'pointer',
                background:s.bg, border:s.border, borderRadius:9, padding:'11px 14px',
                boxShadow:s.shadow, transition:'background 0.25s, border 0.25s',
              }}
            >
              <input type="radio" checked={isSel} onChange={() => !submitted && setSelected(opt.id)}
                style={{marginTop:4,accentColor:BLUE_MID,flexShrink:0}} />
              <div style={{flex:1}}>
                {opt.lines.map((line, li) => (
                  <motion.div key={li} initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.05*li+0.15}}
                    style={{fontSize:13,color:s.color,lineHeight:1.95,fontFamily:FONT}}
                  >{line}</motion.div>
                ))}
              </div>
              <AnimatePresence>
                {submitted && ((correct && isCorrect) || (isSel && !isCorrect)) && (
                  <motion.span key="icon"
                    initial={{scale:0,rotate:-20}} animate={{scale:1,rotate:0}} exit={{scale:0}}
                    transition={{type:'spring',stiffness:400,damping:14}}
                    style={{fontSize:18,fontWeight:'bold',alignSelf:'center',color:isCorrect?GREEN:RED}}
                  >{isCorrect ? '✓' : '✗'}</motion.span>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      <AnimatePresence>{submitted && <Feedback correct={correct} />}</AnimatePresence>

      <div style={{display:'flex',justifyContent:'flex-end',gap:8,paddingTop:10}}>
        {!submitted && <NextBtn disabled={!selected} onClick={() => setSubmitted(true)}>சரிபார்க்க</NextBtn>}
        {submitted && !correct && <RetryBtn onClick={reset}>மீண்டும்</RetryBtn>}
        {submitted && correct  && <NextBtn onClick={onCorrect}>அடுத்து &gt;&gt;</NextBtn>}
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────
   Drag-and-drop screen (type: "drag-drop")
───────────────────────────────────────────*/
function DragDropScreen({ q, index, total, onCorrect }) {
  const [placed, setPlaced]       = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [correct, setCorrect]     = useState(false);

  const available = q.wordBank.filter(l => !placed.includes(l));
  const addLine   = l  => { if (!submitted && placed.length < q.correctOrder.length) setPlaced(p => [...p, l]); };
  const removeLine= idx=> { if (!submitted) setPlaced(p => p.filter((_,i) => i !== idx)); };

  const check = () => {
    const ok = placed.length === q.correctOrder.length && placed.every((l,i) => l === q.correctOrder[i]);
    setCorrect(ok); setSubmitted(true);
  };
  const reset = () => { setPlaced([]); setSubmitted(false); setCorrect(false); };

  const left  = q.wordBank.slice(0,4);
  const right = q.wordBank.slice(4);

  return (
    <motion.div key={q.id}
      initial={{x:70,opacity:0,scale:0.97}} animate={{x:0,opacity:1,scale:1}} exit={{x:-70,opacity:0,scale:0.97}}
      transition={{duration:0.35,ease:[0.25,0.46,0.45,0.94]}}
      style={{ padding:'12px 18px', fontFamily:FONT, overflowY:'auto', flex:1, display:'flex', flexDirection:'column' }}
    >
      <ProgressDots total={total} current={index} />

      <div style={{ background:`linear-gradient(135deg,${BLUE_DARK},${BLUE_MID})`, color:'#fff', borderRadius:'8px 8px 0 0', padding:'8px 14px', fontSize:12, fontWeight:'bold' }}>
        வினா {index+1} / {total}
      </div>
      <div style={{ background:'rgba(255,255,255,0.85)', border:'1px solid #c0d4f0', borderTop:'none', borderRadius:'0 0 8px 8px', padding:'10px 14px', marginBottom:10, fontSize:13, color:'#1e293b', lineHeight:1.75 }}>
        {q.instruction}
      </div>

      {/* Drop zone */}
      <p style={{fontSize:11.5,color:'#64748b',marginBottom:5,fontStyle:'italic'}}>அடிகளை வரிசைப்படுத்துக — வைக்கப்பட்ட அடியை நீக்க கிளிக் செய்க</p>
      <div style={{marginBottom:12}}>
        {Array.from({length:q.correctOrder.length}).map((_,i) => {
          const line = placed[i];
          let bg='rgba(200,220,255,0.2)', border='1.5px dashed #93c5fd', color='#94a3b8', glow='none';
          if (submitted && line) {
            const ok = line === q.correctOrder[i];
            bg     = ok ? '#dcfce7' : '#fee2e2';
            border = `2px solid ${ok ? '#22c55e' : '#ef4444'}`;
            color  = ok ? '#14532d' : '#7f1d1d';
            glow   = ok ? '0 0 8px rgba(34,197,94,0.35)' : '0 0 8px rgba(239,68,68,0.35)';
          } else if (line) {
            bg='rgba(255,255,255,0.9)'; border=`1.5px solid #93c5fd`; color=BLUE_DARK; glow='0 2px 8px rgba(26,76,200,0.12)';
          }
          return (
            <motion.div key={i}
              layout
              initial={{opacity:0,x:-8}} animate={{opacity:1,x:0}} transition={{delay:0.04*i}}
              onClick={() => removeLine(i)}
              style={{ display:'flex', alignItems:'center', gap:8, background:bg, border, borderRadius:7, padding:'7px 12px', marginBottom:5, minHeight:35, cursor: line && !submitted ? 'pointer' : 'default', boxShadow:glow, transition:'background 0.2s, border 0.2s, box-shadow 0.2s' }}
            >
              <span style={{fontSize:11,color:'#94a3b8',minWidth:18,fontWeight:'bold'}}>{i+1}.</span>
              <span style={{fontSize:12.5,color,fontFamily:FONT,flex:1,fontWeight:line?'600':'normal'}}>
                {line || <span style={{color:'#cbd5e1',fontStyle:'italic'}}>—</span>}
              </span>
              {submitted && line && (
                <motion.span initial={{scale:0}} animate={{scale:1}} transition={{type:'spring',stiffness:400,damping:14}}
                  style={{fontWeight:'bold',fontSize:15,color: line===q.correctOrder[i] ? GREEN : RED}}
                >{line===q.correctOrder[i] ? '✓' : '✗'}</motion.span>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Word bank */}
      <p style={{fontSize:11.5,color:'#64748b',marginBottom:6,fontStyle:'italic'}}>சொல்திரட்டு — கிளிக் செய்தால் மேலே சேரும்</p>
      <div style={{display:'flex',gap:8,marginBottom:12,alignItems:'flex-start'}}>
        {[left, right].map((col, ci) => (
          <div key={ci} style={{flex:1,display:'flex',flexDirection:'column',gap:6}}>
            <AnimatePresence>
              {col.filter(l => !placed.includes(l)).map(line => (
                <motion.button key={line}
                  layout
                  initial={{opacity:0,scale:0.88}} animate={{opacity:1,scale:1}} exit={{opacity:0,scale:0.85}}
                  whileHover={{scale:1.03,y:-2,boxShadow:'0 6px 18px rgba(26,76,200,0.22)',background:'#eef3ff'}}
                  whileTap={{scale:0.96}}
                  onClick={() => addLine(line)}
                  style={{ background:'rgba(255,255,255,0.88)', border:'1px solid #bfd0ea', borderRadius:7, padding:'8px 10px', fontSize:12, color:BLUE_DARK, cursor:'pointer', fontFamily:FONT, textAlign:'left', width:'100%', boxShadow:'0 1px 5px rgba(0,30,100,0.08)', transition:'background 0.15s' }}
                >{line}</motion.button>
              ))}
            </AnimatePresence>
          </div>
        ))}
      </div>

      <AnimatePresence>{submitted && <Feedback correct={correct} />}</AnimatePresence>

      <div style={{display:'flex',justifyContent:'flex-end',gap:8,paddingTop:4}}>
        {!submitted && <NextBtn disabled={placed.length < q.correctOrder.length} onClick={check}>சரிபார்க்க</NextBtn>}
        {submitted && !correct && <RetryBtn onClick={reset}>மீண்டும்</RetryBtn>}
        {submitted && correct  && <NextBtn onClick={onCorrect}>அடுத்து &gt;&gt;</NextBtn>}
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────
   Helper
───────────────────────────────────────────*/
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/* ─────────────────────────────────────────
   Match-the-following screen (type: "match-following")
   Drag item onto correct slot → snaps; wrong → shakes back
───────────────────────────────────────────*/
function MatchFollowingScreen({ q, index, total, onCorrect }) {
  const [pool, setPool]         = useState(() => shuffle(q.pairs.map(p => p.right)));
  const [matched, setMatched]   = useState({});
  const [wrongZone, setWrongZone] = useState(null);
  const dragging = useRef(null);

  const matchedCount = Object.keys(matched).length;
  const allMatched   = matchedCount === q.pairs.length;

  useEffect(() => {
    if (!allMatched) return;
    const t = setTimeout(onCorrect, 1300);
    return () => clearTimeout(t);
  }, [allMatched, onCorrect]);

  const onDragStart = (e, item) => {
    dragging.current = item;
    e.dataTransfer.setData('text/plain', item);
    e.dataTransfer.effectAllowed = 'move';
  };
  const onDragEnd = () => { dragging.current = null; };

  const onDrop = (pairId, e) => {
    e.preventDefault();
    if (matched[pairId]) return;
    const item = dragging.current || e.dataTransfer.getData('text/plain');
    if (!item) return;
    const pair = q.pairs.find(p => p.id === pairId);
    if (item === pair.right) {
      setMatched(m => ({ ...m, [pairId]: item }));
      setPool(p => p.filter(x => x !== item));
    } else {
      setWrongZone(pairId);
      setTimeout(() => setWrongZone(null), 700);
    }
    dragging.current = null;
  };

  return (
    <motion.div key={q.id}
      initial={{ x:70, opacity:0, scale:0.97 }} animate={{ x:0, opacity:1, scale:1 }} exit={{ x:-70, opacity:0, scale:0.97 }}
      transition={{ duration:0.35, ease:[0.25,0.46,0.45,0.94] }}
      style={{ padding:'12px 18px', fontFamily:FONT, overflowY:'auto', flex:1, display:'flex', flexDirection:'column' }}
    >
      <ProgressDots total={total} current={index} />

      <div style={{ background:`linear-gradient(135deg,${BLUE_DARK},${BLUE_MID})`, color:'#fff', borderRadius:'8px 8px 0 0', padding:'8px 14px', fontSize:12, fontWeight:'bold', display:'flex', justifyContent:'space-between', boxShadow:'0 2px 8px rgba(0,20,100,0.2)' }}>
        <span style={{ fontFamily:FONT }}>பொருத்துக</span>
        <motion.span key={index} initial={{ opacity:0, y:-4 }} animate={{ opacity:1, y:0 }} style={{ fontFamily:FONT, opacity:0.9 }}>
          வினா {index+1} / {total}
        </motion.span>
      </div>
      <div style={{ background:'rgba(255,255,255,0.85)', border:'1px solid #c0d4f0', borderTop:'none', borderRadius:'0 0 8px 8px', padding:'10px 14px', marginBottom:10, fontSize:13, color:'#1e293b', lineHeight:1.75 }}>
        {q.instruction}
      </div>

      <div style={{ textAlign:'center', marginBottom:10 }}>
        <span style={{ background:'#e8f0ff', border:`1px solid ${BLUE_MID}`, borderRadius:20, padding:'3px 14px', fontSize:11.5, color:BLUE_DARK, fontWeight:'bold' }}>
          {matchedCount} / {q.pairs.length} இணைக்கப்பட்டது
        </span>
      </div>

      <div style={{ display:'flex', flexDirection:'column', gap:8, marginBottom:14 }}>
        {q.pairs.map((pair, i) => {
          const isMatched = !!matched[pair.id];
          const isWrong   = wrongZone === pair.id;
          return (
            <motion.div key={pair.id}
              initial={{ opacity:0, x:-10 }} animate={{ opacity:1, x:0 }} transition={{ delay:0.05*i+0.1 }}
              style={{ display:'flex', alignItems:'center', gap:8 }}
            >
              <div style={{
                flex:'0 0 auto', minWidth:100, maxWidth:130,
                background:'linear-gradient(135deg,#e8f0fe,#d0dfff)',
                border:`1.5px solid ${BLUE_MID}`, borderRadius:7,
                padding:'7px 10px', fontSize:12.5, color:BLUE_DARK,
                fontWeight:'bold', textAlign:'center',
                boxShadow:'0 2px 6px rgba(26,76,200,0.12)',
              }}>
                {pair.left}
              </div>

              <span style={{ color:'#94a3b8', fontSize:18, flexShrink:0 }}>→</span>

              <motion.div
                animate={isWrong ? { x:[0,-9,9,-7,7,-4,4,0] } : { x:0 }}
                transition={isWrong ? { duration:0.55 } : {}}
                onDragOver={e => { if (!isMatched) { e.preventDefault(); e.dataTransfer.dropEffect = 'move'; } }}
                onDrop={e => onDrop(pair.id, e)}
                style={{
                  flex:1, minHeight:40,
                  background: isMatched ? 'linear-gradient(135deg,#dcfce7,#bbf7d0)' : isWrong ? 'rgba(254,226,226,0.85)' : 'rgba(219,234,254,0.3)',
                  border: isMatched ? '2px solid #22c55e' : isWrong ? '2px solid #ef4444' : '1.5px dashed #93c5fd',
                  borderRadius:7, padding:'8px 12px',
                  fontSize:13,
                  color: isMatched ? '#14532d' : '#94a3b8',
                  fontStyle: isMatched ? 'normal' : 'italic',
                  display:'flex', alignItems:'center', justifyContent:'space-between', gap:8,
                  boxShadow: isMatched ? '0 0 8px rgba(34,197,94,0.4)' : 'none',
                  transition:'background 0.25s, border 0.25s',
                  cursor: isMatched ? 'default' : 'copy',
                  fontWeight: isMatched ? '600' : 'normal',
                }}
              >
                {isMatched ? (
                  <motion.span initial={{ scale:0, opacity:0 }} animate={{ scale:1, opacity:1 }} transition={{ type:'spring', stiffness:400, damping:14 }}>
                    {matched[pair.id]}
                  </motion.span>
                ) : (
                  <span style={{ fontSize:11, color:'#94a3b8' }}>இங்கே இழுக்கவும்</span>
                )}
                {isMatched && (
                  <motion.span initial={{ scale:0 }} animate={{ scale:1 }} transition={{ type:'spring', stiffness:400, damping:14 }}
                    style={{ color:GREEN, fontWeight:'bold', fontSize:16, flexShrink:0 }}
                  >✓</motion.span>
                )}
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      <AnimatePresence>
        {pool.length > 0 && (
          <motion.div initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0 }}>
            <p style={{ fontSize:11.5, color:'#64748b', marginBottom:6, fontStyle:'italic' }}>
              ✦ விடைகளை இழுத்து இணைக்கவும்
            </p>
            <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
              <AnimatePresence>
                {pool.map(item => (
                  <motion.div
                    key={item}
                    layout
                    initial={{ opacity:0, scale:0.85 }} animate={{ opacity:1, scale:1 }} exit={{ opacity:0, scale:0.8 }}
                    whileHover={{ scale:1.03, y:-2, boxShadow:'0 6px 18px rgba(26,76,200,0.28)' }}
                    whileTap={{ scale:0.97 }}
                    draggable
                    onDragStart={(e) => onDragStart(e, item)}
                    onDragEnd={onDragEnd}
                    style={{
                      background:'linear-gradient(135deg,#fff,#f0f5ff)',
                      border:`1.5px solid #bfd0ea`,
                      borderRadius:8, padding:'9px 14px',
                      fontSize:13, color:BLUE_DARK,
                      cursor:'grab', fontFamily:FONT,
                      boxShadow:'0 2px 8px rgba(26,76,200,0.1)',
                      userSelect:'none',
                      width:'100%',
                      display:'flex', alignItems:'center', gap:8,
                    }}
                  >
                    <span style={{ color:'#94a3b8', flexShrink:0, fontSize:16 }}>⠿</span>
                    {item}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {allMatched && (
          <motion.div
            initial={{ opacity:0, y:14, scale:0.9 }} animate={{ opacity:1, y:0, scale:1 }} exit={{ opacity:0 }}
            transition={{ type:'spring', stiffness:380, damping:22 }}
            style={{
              marginTop:14,
              background:'linear-gradient(135deg,#dcfce7,#bbf7d0)',
              border:'2px solid #22c55e', borderRadius:10,
              padding:'12px 16px', display:'flex', alignItems:'center', gap:12,
              position:'relative', overflow:'hidden',
            }}
          >
            <motion.div
              initial={{ x:'-110%' }} animate={{ x:'210%' }}
              transition={{ duration:0.75, ease:'easeOut', delay:0.15 }}
              style={{ position:'absolute', inset:0, background:'linear-gradient(90deg,transparent,rgba(255,255,255,0.55),transparent)', pointerEvents:'none' }}
            />
            <motion.div
              initial={{ scale:0, rotate:-90 }} animate={{ scale:[0,1.35,1], rotate:0 }}
              transition={{ type:'spring', stiffness:420, damping:14, delay:0.05 }}
              style={{ width:44, height:44, borderRadius:'50%', background:'linear-gradient(135deg,#22c55e,#16a34a)', display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'0 4px 16px rgba(34,197,94,0.5)', flexShrink:0, position:'relative' }}
            >
              <span style={{ fontSize:22, color:'#fff', fontWeight:'bold' }}>✓</span>
              <SparkBurst />
            </motion.div>
            <p style={{ margin:0, fontSize:14, fontWeight:'bold', color:'#15803d', fontFamily:FONT }}>
              அருமை! அனைத்தும் சரியாக பொருத்தப்பட்டது!
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ─────────────────────────────────────────
   Listening screen (type: "listening")
───────────────────────────────────────────*/
function ListeningScreen({ q, onNext, audioSrc, poemLines }) {
  const lines = q.poemLines || poemLines || [];
  return (
    <motion.div initial={{opacity:0,y:18}} animate={{opacity:1,y:0}} transition={{duration:0.4}}
      style={{ padding:'14px 18px', fontFamily:FONT, overflowY:'auto', flex:1, display:'flex', flexDirection:'column' }}
    >
      <motion.p initial={{opacity:0,x:-8}} animate={{opacity:1,x:0}} transition={{delay:0.15}}
        style={{fontSize:13,color:'#1e293b',marginBottom:14,lineHeight:1.75,fontStyle:'italic',borderLeft:`3px solid ${BLUE_MID}`,paddingLeft:12,background:'rgba(219,234,254,0.35)',padding:'8px 12px',borderRadius:'0 6px 6px 0'}}
      >{q.instruction}</motion.p>

      <motion.div initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{delay:0.2}}
        style={{ background:'rgba(255,255,255,0.8)', border:'1px solid #c0d4f0', borderRadius:10, padding:'16px 20px', marginBottom:14, boxShadow:'0 4px 20px rgba(0,30,120,0.1)' }}
      >
        {lines.map((l,i) => (
          <motion.div key={i} initial={{opacity:0,x:-6}} animate={{opacity:1,x:0}} transition={{delay:0.05*i+0.25}}
            style={{fontSize:15,color:BLUE_DARK,lineHeight:2.1,fontWeight:'bold'}}
          >{l}</motion.div>
        ))}
      </motion.div>

      <AudioPlayer src={audioSrc} />

      <motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.4}}
        style={{fontSize:13,color:'#475569',marginTop:10,marginBottom:18,fontStyle:'italic',lineHeight:1.8}}
      >{q.footer}</motion.p>

      <div style={{display:'flex',justifyContent:'flex-end',marginTop:'auto'}}>
        <NextBtn onClick={onNext}>அடுத்து &gt;&gt;</NextBtn>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────
   Read-aloud screen (type: "read-aloud")
───────────────────────────────────────────*/
function ReadAloudScreen({ q, onNext, poemLines }) {
  const lines = q.lines || poemLines || [];
  return (
    <motion.div initial={{opacity:0,y:18}} animate={{opacity:1,y:0}} transition={{duration:0.4}}
      style={{ padding:'14px 18px', fontFamily:FONT, overflowY:'auto', flex:1, display:'flex', flexDirection:'column' }}
    >
      <motion.p initial={{opacity:0,x:-8}} animate={{opacity:1,x:0}} transition={{delay:0.15}}
        style={{fontSize:13,color:'#1e293b',marginBottom:14,lineHeight:1.75,fontStyle:'italic',borderLeft:`3px solid ${BLUE_MID}`,padding:'8px 12px',borderRadius:'0 6px 6px 0',background:'rgba(219,234,254,0.35)'}}
      >{q.instruction}</motion.p>

      <motion.div initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{delay:0.2}}
        style={{ background:'rgba(255,255,255,0.8)', border:'1px solid #c0d4f0', borderRadius:10, padding:'16px 20px', marginBottom:18, boxShadow:'0 4px 20px rgba(0,30,120,0.1)' }}
      >
        {lines.map((l,i) => (
          <motion.div key={i} initial={{opacity:0,x:-6}} animate={{opacity:1,x:0}} transition={{delay:0.05*i+0.25}}
            style={{fontSize:15,color:BLUE_DARK,lineHeight:2.1,letterSpacing:'0.025em'}}
          >{l}</motion.div>
        ))}
      </motion.div>

      <div style={{display:'flex',justifyContent:'flex-end',marginTop:'auto'}}>
        <NextBtn onClick={onNext}>அடுத்து &gt;&gt;</NextBtn>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────
   Next-only screen (type: "next-only")
───────────────────────────────────────────*/
function NextOnlyScreen({ q, onNext }) {
  return (
    <motion.div initial={{opacity:0,y:18}} animate={{opacity:1,y:0}} transition={{duration:0.35}}
      style={{ padding:'14px 18px', fontFamily:FONT, overflowY:'auto', flex:1, display:'flex', flexDirection:'column' }}
    >
      <div style={{ background:'rgba(255,255,255,0.85)', border:'1px solid #c0d4f0', borderRadius:10, padding:'14px 16px', marginBottom:16, fontSize:13, color:'#1e293b', lineHeight:1.8, whiteSpace:'pre-line' }}>
        {q.context}
      </div>

      <div style={{ display:'flex', justifyContent:'flex-end', marginTop:'auto' }}>
        <NextBtn onClick={onNext}>அடுத்து &gt;&gt;</NextBtn>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────
   Short-answer screen (type: "short-answer")
───────────────────────────────────────────*/
function ShortAnswerScreen({ q, onNext }) {
  const [popup, setPopup] = useState(null);

  return (
    <motion.div initial={{opacity:0,y:18}} animate={{opacity:1,y:0}} transition={{duration:0.4}}
      style={{ padding:'14px 18px', fontFamily:FONT, overflowY:'auto', flex:1, display:'flex', flexDirection:'column' }}
    >
      <p style={{fontSize:13,color:'#1e293b',marginBottom:14,lineHeight:1.8,borderLeft:`3px solid ${BLUE_MID}`,padding:'8px 12px',borderRadius:'0 6px 6px 0',background:'rgba(219,234,254,0.35)'}}>{q.instruction}</p>

      <div style={{ display:'flex', flexDirection:'column', gap:9, flex:1 }}>
        {q.subQuestions.map((sq, i) => (
          <motion.div key={i}
            initial={{opacity:0,x:-10}} animate={{opacity:1,x:0}} transition={{delay:0.07*i+0.15}}
            style={{ background:'rgba(255,255,255,0.82)', border:'1px solid #c0d4f0', borderRadius:9, padding:'10px 14px', boxShadow:'0 2px 8px rgba(0,30,100,0.06)' }}
          >
            <p style={{fontSize:13,color:BLUE_DARK,marginBottom:9,lineHeight:1.75}}>
              <span style={{fontWeight:'bold',marginRight:6,color:BLUE_MID}}>{i+1}.</span>{sq.question}
            </p>
            <div style={{display:'flex',justifyContent:'flex-end'}}>
              <motion.button
                whileHover={{scale:1.06,boxShadow:'0 5px 16px rgba(26,76,200,0.4)'}}
                whileTap={{scale:0.94}}
                onClick={() => setPopup(i)}
                style={{ background:`linear-gradient(135deg,${BLUE_MID},${BLUE_DARK})`, color:'#fff', border:'none', borderRadius:6, padding:'5px 18px', fontSize:12, fontFamily:FONT, cursor:'pointer', fontWeight:'bold', boxShadow:'0 2px 8px rgba(26,76,200,0.3)' }}
              >விடை</motion.button>
            </div>
          </motion.div>
        ))}
      </div>

      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', paddingTop:14 }}>
        <motion.button whileHover={{scale:1.05,boxShadow:'0 4px 14px rgba(0,0,0,0.2)'}} whileTap={{scale:0.95}}
          style={{ background:'linear-gradient(135deg,#5a80c0,#3a5aa0)', color:'#fff', border:'none', borderRadius:6, padding:'7px 18px', fontSize:13, fontFamily:FONT, cursor:'pointer', fontWeight:'bold', boxShadow:'0 2px 8px rgba(58,90,160,0.3)' }}
        >ஒலிப்படம்</motion.button>
        <NextBtn onClick={onNext}>அடுத்து &gt;&gt;</NextBtn>
      </div>

      {/* Answer popup */}
      <AnimatePresence>
        {popup !== null && (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
            style={{ position:'fixed', inset:0, background:'rgba(0,15,60,0.55)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:1000, backdropFilter:'blur(3px)' }}
            onClick={() => setPopup(null)}
          >
            <motion.div
              initial={{scale:0.8,opacity:0,y:20}} animate={{scale:1,opacity:1,y:0}} exit={{scale:0.85,opacity:0,y:10}}
              transition={{type:'spring',stiffness:340,damping:24}}
              onClick={e => e.stopPropagation()}
              style={{ background:'#fff', borderRadius:14, padding:'22px 26px', maxWidth:440, width:'90%', boxShadow:'0 16px 48px rgba(0,20,80,0.35)', fontFamily:FONT }}
            >
              {/* Popup header */}
              <div style={{background:`linear-gradient(135deg,${BLUE_DARK},${BLUE_MID})`,borderRadius:9,padding:'10px 14px',marginBottom:14}}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',gap:10}}>
                  <p style={{fontSize:13,color:'#fff',fontWeight:'bold',flex:1,margin:0,lineHeight:1.7}}>{q.subQuestions[popup].question}</p>
                  <motion.button whileHover={{scale:1.15,rotate:90}} whileTap={{scale:0.9}}
                    onClick={() => setPopup(null)}
                    style={{background:'rgba(255,255,255,0.2)',border:'none',cursor:'pointer',fontSize:15,color:'#fff',lineHeight:1,padding:'4px 7px',borderRadius:'50%',flexShrink:0}}
                  >✕</motion.button>
                </div>
              </div>
              <div style={{borderTop:'1px solid #e2e8f0',paddingTop:13}}>
                {q.subQuestions[popup].answer
                  ? <motion.p initial={{opacity:0,y:6}} animate={{opacity:1,y:0}}
                      style={{fontSize:13.5,color:'#1e293b',lineHeight:1.95,margin:0}}
                    >{q.subQuestions[popup].answer}</motion.p>
                  : <p style={{fontSize:13,color:'#94a3b8',fontStyle:'italic',margin:0}}>இவ்வினாவிற்கு நீங்களே விடை எழுதுக.</p>
                }
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ─────────────────────────────────────────
   Completion screen
───────────────────────────────────────────*/
function CompletionScreen({ score, total, onRestart }) {
  const pct     = total > 0 ? Math.round((score/total)*100) : 0;
  const perfect = score === total;

  return (
    <motion.div initial={{opacity:0,scale:0.92}} animate={{opacity:1,scale:1}} transition={{type:'spring',stiffness:260,damping:20}}
      style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'24px 28px', fontFamily:FONT, textAlign:'center', position:'relative', overflow:'hidden' }}
    >
      {perfect && <Confetti />}

      <motion.div
        initial={{scale:0,rotate:-30}} animate={{scale:1,rotate:0}}
        transition={{type:'spring',stiffness:280,damping:16,delay:0.1}}
        style={{ fontSize:52, marginBottom:12, filter:'drop-shadow(0 4px 12px rgba(0,0,0,0.25))' }}
      >
        {perfect ? '🏆' : score >= total*0.6 ? '⭐' : '📖'}
      </motion.div>

      <motion.h2 initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{delay:0.25}}
        style={{color:BLUE_DARK,fontSize:20,marginBottom:6,fontWeight:'bold'}}
      >வினாடி வினா முடிந்தது!</motion.h2>

      <motion.p initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{delay:0.35}}
        style={{fontSize:14,color:'#475569',marginBottom:22}}
      >
        {total} வினாக்களில் <strong style={{color:BLUE_DARK,fontSize:18}}>{score}</strong> சரியான விடைகள் — <strong style={{color: pct===100?GREEN:BLUE_MID}}>{pct}%</strong>
      </motion.p>

      {/* Score bar */}
      <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.4}}
        style={{ width:'85%', height:16, background:'#e2e8f0', borderRadius:10, overflow:'hidden', marginBottom:20, boxShadow:'inset 0 2px 6px rgba(0,0,0,0.1)' }}
      >
        <motion.div
          initial={{width:0}} animate={{width:`${pct}%`}} transition={{duration:1.3,ease:'easeOut',delay:0.5}}
          style={{ height:'100%', borderRadius:10,
            background: pct===100
              ? 'linear-gradient(90deg,#22c55e,#86efac,#22c55e)'
              : 'linear-gradient(90deg,#1a4cc8,#60a5fa)',
            backgroundSize:'200% 100%',
          }}
        />
      </motion.div>

      <motion.p initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{delay:0.65}}
        style={{fontSize:13,color:'#64748b',marginBottom:26,lineHeight:1.7}}
      >
        {perfect
          ? 'அருமை! அனைத்து வினாக்களுக்கும் சரியான விடை அளித்தீர்கள்!'
          : `${total-score} வினாக்களுக்கு தவறான விடை. மீண்டும் படித்து முயற்சியுங்கள்.`}
      </motion.p>

      <motion.div initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{delay:0.75}}>
        <NextBtn onClick={onRestart}>மீண்டும் தொடங்கு</NextBtn>
      </motion.div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────
   Root QuizPage
───────────────────────────────────────────*/
export default function QuizPage() {
  const { data: quizData, loading, error } = useQuizData();

  const [stage, setStage] = useState('intro');
  const [score, setScore] = useState(0);

  if (loading) return (
    <div style={{ flex:1, display:'flex', alignItems:'center', justifyContent:'center', fontFamily:FONT, color:BLUE_MID, fontSize:14 }}>
      வினாடி வினா ஏற்றுகிறது...
    </div>
  );

  if (error || !quizData) return (
    <div style={{ flex:1, display:'flex', alignItems:'center', justifyContent:'center', fontFamily:FONT, color:RED, fontSize:13, padding:20 }}>
      தரவை ஏற்ற முடியவில்லை. தயவுசெய்து மீண்டும் முயற்சிக்கவும்.
    </div>
  );

  const questions     = quizData.questions;
  const scorableCount = questions.filter(q => q.type==='mcq'||q.type==='word-order'||q.type==='drag-drop'||q.type==='match-following'||!q.type).length;

  const goNext = () => {
    setStage(prev => {
      if (prev === 'intro') return 0;
      const next = prev + 1;
      return next >= questions.length ? 'done' : next;
    });
  };

  const handleCorrect = () => { setScore(s => s+1); goNext(); };

  const sharedProps = { poemLines: quizData.poemLines, audioSrc: quizData.audioSrc };

  const renderQuestion = (q, idx) => {
    const scorableIdx = questions.slice(0,idx+1).filter(x => x.type==='mcq'||x.type==='word-order'||x.type==='drag-drop'||x.type==='match-following'||!x.type).length - 1;
    if (q.type==='mcq')             return <McqScreen            q={q} index={scorableIdx} total={scorableCount} onCorrect={handleCorrect} {...sharedProps} />;
    if (q.type==='word-order')      return <WordOrderScreen      q={q} index={scorableIdx} total={scorableCount} onCorrect={handleCorrect} poemLines={quizData.poemLines} />;
    if (q.type==='drag-drop')       return <DragDropScreen       q={q} index={scorableIdx} total={scorableCount} onCorrect={handleCorrect} />;
    if (q.type==='match-following') return <MatchFollowingScreen q={q} index={scorableIdx} total={scorableCount} onCorrect={handleCorrect} />;
    if (q.type==='listening')       return <ListeningScreen      q={q} onNext={goNext} audioSrc={quizData.audioSrc} poemLines={quizData.poemLines} />;
    if (q.type==='read-aloud')      return <ReadAloudScreen      q={q} onNext={goNext} poemLines={quizData.poemLines} />;
    if (q.type==='next-only')       return <NextOnlyScreen       q={q} onNext={goNext} />;
    if (q.type==='short-answer')    return <ShortAnswerScreen    q={q} onNext={goNext} />;
    return null;
  };

  return (
    <div style={{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden' }}>
      <AnimatePresence mode="wait">
        {stage==='intro' && (
          <motion.div key="intro" style={{flex:1,display:'flex',flexDirection:'column',overflow:'auto'}}>
            <IntroScreen onNext={goNext} poemLines={quizData.poemLines} audioSrc={quizData.audioSrc} intro={quizData.intro} />
          </motion.div>
        )}
        {stage==='done' && (
          <motion.div key="done" style={{flex:1,display:'flex',flexDirection:'column'}}>
            <CompletionScreen score={score} total={scorableCount} onRestart={() => { setStage('intro'); setScore(0); }} />
          </motion.div>
        )}
        {typeof stage==='number' && (
          <motion.div key={stage} style={{flex:1,display:'flex',flexDirection:'column',overflow:'auto'}}>
            {renderQuestion(questions[stage], stage)}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
