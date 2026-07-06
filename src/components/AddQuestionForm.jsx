import { useState } from "react";

const LEFT_BUTTONS_ALL = [
  'கொண்டுகூட்டு','அருஞ்சொற்பொருள்','பதவுரை','பொழிப்புரை',
  'எழுத்துப்பெயர்ப்பு','மொழிபெயர்ப்பு','திணை','துறை',
  'பாடலாசிரியர்','நூற்பெயர்',
];

const QTYPES = [
  { id: 'title',         label: '1. Title Page' },
  { id: 'truefalse',     label: '2. True or False' },
  { id: 'mcq',           label: '3. MCQ' },
  { id: 'listen-answer', label: '4. Listen and Answer' },
  { id: 'mcq-paadal',   label: '5. MCQ with Paadal' },
  { id: 'listen-repeat', label: '6. Listen and Repeat' },
  { id: 'qa',            label: '7. Question & Answer' },
  { id: 'dragdrop',      label: '8. Drag and Drop' },
];

/* Remove consecutive duplicate spaces recursively through strings, arrays, objects */
function deepClean(val) {
  if (typeof val === 'string') return val.replace(/ {2,}/g, ' ');
  if (Array.isArray(val)) return val.map(deepClean);
  if (val && typeof val === 'object') {
    const out = {};
    for (const k of Object.keys(val)) out[k] = deepClean(val[k]);
    return out;
  }
  return val;
}

const emptyQ = (type) => {
  const base = { type };
  switch (type) {
    case 'title':         return { ...base, primaryTitle:'', primaryInstruction:'', secondaryTitle:'', paadal:'', secondaryInstruction:'' };
    case 'truefalse':     return { ...base, primaryTitle:'', paadal:'', primaryInstruction:'', secondaryInstruction:'', tertiaryInstruction:'', question:'', answer:'ஆம்' };
    case 'mcq':           return { ...base, primaryTitle:'', paadal:'', primaryInstruction:'', secondaryInstruction:'', tertiaryInstruction:'', question:'', options:[''], answer:0 };
    case 'listen-answer': return { ...base, primaryTitle:'', paadal:'', primaryInstruction:'', secondaryInstruction:'', tertiaryInstruction:'', paadal2:'', question:'', options:[''], answer:0 };
    case 'mcq-paadal':   return { ...base, primaryTitle:'', paadal:'', primaryInstruction:'', question:'', paadal2:'', secondaryInstruction:'', tertiaryInstruction:'', options:[''], answer:0 };
    case 'listen-repeat': return { ...base, primaryTitle:'', paadal:'', primaryInstruction:'', secondaryInstruction:'', paadal2:'', tertiaryInstruction:'', question:'' };
    case 'qa':            return { ...base, primaryTitle:'', paadal:'', primaryInstruction:'', secondaryInstruction:'', tertiaryInstruction:'', qas:[{ question:'', answer:'' }] };
    case 'dragdrop':      return { ...base, primaryTitle:'', paadal:'', primaryInstruction:'', secondaryInstruction:'', tertiaryInstruction:'', sentences:[''], shuffledSentences:[] };
    default:              return base;
  }
};

/* ── colour palette (blue, matches Video Lectures) ── */
const C = {
  panel:       'rgba(192,213,214,0.22)',
  panelBorder: 'rgba(64,126,140,0.35)',
  panelInner:  'rgba(255,255,255,0.55)',
  input:       'rgba(255,255,255,0.92)',
  inputText:   '#083A4F',
  label:       '#407E8C',
  sectionHead: '#083A4F',
  textMain:    '#083A4F',
  textLight:   '#E5E1DD',
  btnPrimary:  '#083A4F',
  btnTeal:     '#407E8C',
  chipBorder:  'rgba(64,126,140,0.45)',
  chipActiveBg:'#083A4F',
  chipActiveText:'#E5E1DD',
  chipText:    '#083A4F',
  noteBg:      'rgba(64,126,140,0.12)',
  noteBorder:  'rgba(64,126,140,0.4)',
  noteText:    '#407E8C',
  infoBg:      'rgba(8,58,79,0.08)',
  infoBorder:  'rgba(8,58,79,0.25)',
  stepActive:  '#083A4F',
  stepDone:    '#407E8C',
  stepInactive:'transparent',
};

const S = {
  wrap:   { fontFamily:'"Tiro Tamil", serif', color:C.textMain, minHeight:'100%' },
  panel:  { background:C.panel, borderRadius:8, padding:'22px 26px', marginBottom:18, border:`1px solid ${C.panelBorder}`, backdropFilter:'blur(6px)' },
  label:  { display:'block', fontSize:'0.82rem', fontWeight:600, color:C.label, marginBottom:4 },
  input:  { width:'100%', padding:'7px 10px', borderRadius:4, border:`1px solid ${C.chipBorder}`, background:C.input, color:C.inputText, fontSize:'0.85rem', fontFamily:'inherit', marginBottom:10, outline:'none', resize:'vertical' },
  btn:    { background:C.btnPrimary, color:C.textLight, border:'none', padding:'8px 22px', borderRadius:4, fontFamily:'inherit', fontSize:'0.85rem', fontWeight:600, cursor:'pointer' },
  btnTeal:{ background:C.btnTeal, color:'#fff', border:'none', padding:'8px 22px', borderRadius:4, fontFamily:'inherit', fontSize:'0.85rem', fontWeight:600, cursor:'pointer' },
  btnSec: { background:'transparent', color:C.textMain, border:`1px solid ${C.chipBorder}`, padding:'8px 22px', borderRadius:4, fontFamily:'inherit', fontSize:'0.85rem', cursor:'pointer' },
  btnSm:  { background:C.btnTeal, color:'#fff', border:'none', padding:'5px 14px', borderRadius:3, fontFamily:'inherit', fontSize:'0.78rem', cursor:'pointer' },
  section:{ marginBottom:14 },
  secHd:  { fontSize:'0.72rem', fontWeight:700, color:C.label, textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:8 },
  chip:   (active) => ({
    display:'flex', alignItems:'center', gap:8, padding:'8px 13px', borderRadius:5,
    border: `2px solid ${active ? C.btnPrimary : C.chipBorder}`,
    background: active ? C.chipActiveBg : C.panelInner,
    color: active ? C.chipActiveText : C.chipText,
    cursor:'pointer', fontSize:'0.83rem', marginBottom:6, transition:'all 0.15s',
    fontWeight: active ? 600 : 400,
  }),
};

/* ── shared field renderers ── */
function QFields({ data, onChange }) {
  const set = (key, val) => onChange({ ...data, [key]: val });

  const setOpt  = (i, val) => { const o = [...(data.options||[])]; o[i]=val; set('options',o); };
  const addOpt  = () => set('options', [...(data.options||[]), '']);
  const setQA   = (i, key, val) => { const q=[...(data.qas||[])]; q[i]={...q[i],[key]:val}; set('qas',q); };
  const addQA   = () => set('qas', [...(data.qas||[]), { question:'', answer:'' }]);
  const setSent = (i, val) => { const s=[...(data.sentences||[])]; s[i]=val; set('sentences',s); };
  const addSent = () => set('sentences', [...(data.sentences||[]), '']);
  const setShuf = (i, val) => { const s=[...(data.shuffledSentences||[])]; s[i]=val; set('shuffledSentences',s); };

  const tf = (label, key, rows=2) => (
    <div key={key}>
      <label style={S.label}>{label}</label>
      <textarea rows={rows} value={data[key]||''} onChange={e=>set(key,e.target.value)} style={S.input} />
    </div>
  );

  const mediaNote = (
    <div style={{ background:C.noteBg, border:`1px solid ${C.noteBorder}`, borderRadius:4, padding:'7px 12px', marginBottom:10, fontSize:'0.78rem', color:C.noteText, fontWeight:600 }}>
      ▸ Action Bar [◀ ▶ ⏸ ■] appears automatically — no input needed.
    </div>
  );

  const brownBoxNote = (label) => (
    <div style={{ background:C.infoBg, border:`1px solid ${C.infoBorder}`, borderRadius:4, padding:'7px 12px', marginBottom:10, fontSize:'0.78rem', color:C.label }}>
      ↳ The following field appears inside a brown highlight box: <strong>{label}</strong>
    </div>
  );

  const OptionsBlock = () => (
    <div style={S.section}>
      <div style={S.secHd}>Options</div>
      {(data.options||[]).map((opt,i) => (
        <div key={i} style={{ display:'flex', gap:8, alignItems:'flex-start', marginBottom:8 }}>
          <input type="radio" name={`ans-${data.type}-${i}`} checked={data.answer===i} onChange={()=>set('answer',i)} style={{ accentColor:C.btnTeal, flexShrink:0, marginTop:9 }} />
          <textarea rows={2} value={opt} onChange={e=>setOpt(i,e.target.value)} placeholder={`Option ${i+1} — press Enter for a new line if the option is a multi-line paadal`} style={{ ...S.input, marginBottom:0, flex:1 }} />
        </div>
      ))}
      <button type="button" onClick={addOpt} style={S.btnSm}>+ Add Option</button>
      <div style={{ fontSize:'0.73rem', color:C.label, marginTop:5 }}>Select the radio button beside the correct answer.</div>
    </div>
  );

  switch (data.type) {
    case 'title':
      return (<>{tf('Primary Title','primaryTitle')}{tf('Primary Instruction','primaryInstruction')}{tf('Secondary Title','secondaryTitle')}{tf('Paadal (poem text)','paadal',3)}{tf('Secondary Instruction','secondaryInstruction')}</>);

    case 'truefalse':
      return (<>
        {tf('Primary Title','primaryTitle')}{tf('Paadal','paadal',3)}{mediaNote}
        {tf('Primary Instruction','primaryInstruction')}{tf('Secondary Instruction','secondaryInstruction')}{tf('Tertiary Instruction','tertiaryInstruction')}
        {tf('Question (shown in red)','question')}
        <div style={S.section}>
          <div style={S.secHd}>Correct Answer</div>
          {['ஆம்','இல்லை'].map(opt => (
            <label key={opt} style={{ display:'flex', gap:8, alignItems:'center', marginBottom:8, cursor:'pointer', fontSize:'0.85rem', color:C.textMain }}>
              <input type="radio" name="tf-ans" checked={data.answer===opt} onChange={()=>set('answer',opt)} style={{ accentColor:C.btnTeal }} />
              {opt}
            </label>
          ))}
        </div>
      </>);

    case 'mcq':
      return (<>{tf('Primary Title','primaryTitle')}{tf('Paadal','paadal',3)}{mediaNote}{tf('Primary Instruction','primaryInstruction')}{tf('Secondary Instruction','secondaryInstruction')}{tf('Tertiary Instruction','tertiaryInstruction')}{tf('Question','question')}<OptionsBlock /></>);

    case 'listen-answer':
      return (<>
        {tf('Primary Title','primaryTitle')}{tf('Paadal','paadal',3)}{mediaNote}
        {brownBoxNote('Primary Instruction')}{tf('Primary Instruction','primaryInstruction')}
        {tf('Secondary Instruction','secondaryInstruction')}{tf('Tertiary Instruction','tertiaryInstruction')}
        {tf('Paadal 2 (left-border poem)','paadal2',3)}{tf('Question','question')}
        <OptionsBlock />
      </>);

    case 'mcq-paadal':
      return (<>
        {tf('Primary Title','primaryTitle')}{tf('Paadal','paadal',3)}{mediaNote}
        {brownBoxNote('Primary Instruction')}{tf('Primary Instruction','primaryInstruction')}
        {tf('Question','question')}{tf('Paadal 2 (left-border poem)','paadal2',3)}
        {tf('Secondary Instruction','secondaryInstruction')}{tf('Tertiary Instruction','tertiaryInstruction')}
        <OptionsBlock />
      </>);

    case 'listen-repeat':
      return (<>
        {tf('Primary Title','primaryTitle')}{tf('Paadal','paadal',3)}{mediaNote}
        {brownBoxNote('Primary Instruction')}{tf('Primary Instruction','primaryInstruction')}
        {tf('Secondary Instruction','secondaryInstruction')}{tf('Paadal 2 (left-border poem)','paadal2',3)}
        {tf('Tertiary Instruction','tertiaryInstruction')}{tf('Question','question')}
      </>);

    case 'qa':
      return (<>
        {tf('Primary Title','primaryTitle')}{tf('Paadal','paadal',3)}{mediaNote}
        {brownBoxNote('Primary Instruction')}{tf('Primary Instruction','primaryInstruction')}
        {tf('Secondary Instruction','secondaryInstruction')}{tf('Tertiary Instruction','tertiaryInstruction')}
        <div style={S.section}>
          <div style={S.secHd}>Questions & Answers</div>
          {(data.qas||[]).map((qa,i) => (
            <div key={i} style={{ background:C.panelInner, borderRadius:4, padding:'10px 12px', marginBottom:8, border:`1px solid ${C.chipBorder}` }}>
              <label style={{...S.label, color:C.sectionHead}}>Q{i+1} — Question</label>
              <textarea rows={2} value={qa.question} onChange={e=>setQA(i,'question',e.target.value)} style={S.input} />
              <label style={{...S.label, color:C.sectionHead}}>Q{i+1} — Answer</label>
              <textarea rows={2} value={qa.answer} onChange={e=>setQA(i,'answer',e.target.value)} style={S.input} />
            </div>
          ))}
          <button type="button" onClick={addQA} style={S.btnSm}>+ Add Q&A pair</button>
        </div>
      </>);

    case 'dragdrop':
      return (<>
        {tf('Primary Title','primaryTitle')}{tf('Paadal','paadal',3)}{mediaNote}
        {brownBoxNote('Primary Instruction')}{tf('Primary Instruction','primaryInstruction')}
        {tf('Secondary Instruction','secondaryInstruction')}{tf('Tertiary Instruction','tertiaryInstruction')}
        <div style={S.section}>
          <div style={S.secHd}>Sentences — enter in CORRECT order (this is the answer key)</div>
          {(data.sentences||[]).map((s,i) => (
            <div key={i} style={{ display:'flex', gap:8, alignItems:'center', marginBottom:8 }}>
              <span style={{ color:C.label, fontSize:'0.78rem', minWidth:20, fontWeight:600 }}>{i+1}.</span>
              <input value={s} onChange={e=>setSent(i,e.target.value)} placeholder={`Sentence ${i+1}`} style={{ ...S.input, marginBottom:0, flex:1 }} />
            </div>
          ))}
          <button type="button" onClick={addSent} style={S.btnSm}>+ Add Sentence</button>
        </div>
        <div style={S.section}>
          <div style={S.secHd}>Shuffled Display Order — optional</div>
          <div style={{ background:C.noteBg, border:`1px solid ${C.noteBorder}`, borderRadius:4, padding:'7px 12px', marginBottom:8, fontSize:'0.78rem', color:C.noteText }}>
            If left empty, sentences are shuffled automatically for the user. Click below to set a specific display order instead.
          </div>
          {(data.shuffledSentences||[]).length === 0 ? (
            <button type="button" onClick={() => set('shuffledSentences', [...(data.sentences||[])])} style={S.btnSm}>
              Set custom shuffle order
            </button>
          ) : (
            <>
              {(data.shuffledSentences||[]).map((s,i) => (
                <div key={i} style={{ display:'flex', gap:8, alignItems:'center', marginBottom:8 }}>
                  <span style={{ color:C.label, fontSize:'0.78rem', minWidth:20, fontWeight:600 }}>{i+1}.</span>
                  <input value={s} onChange={e=>setShuf(i,e.target.value)} placeholder={`Shuffled position ${i+1}`} style={{ ...S.input, marginBottom:0, flex:1 }} />
                </div>
              ))}
              <button type="button" onClick={() => set('shuffledSentences',[])} style={{ ...S.btnSm, background:'#b22222' }}>
                Remove custom order (revert to auto-shuffle)
              </button>
            </>
          )}
        </div>
      </>);

    default: return null;
  }
}

/* ── Main form component ── */
export default function AddQuestionForm({ onSubmit, onCancel, initialData = null }) {
  const isEditing = !!initialData;
  const [step, setStep]                         = useState(1);
  const [selectedBtns, setSelectedBtns]         = useState(initialData?.leftButtons || []);
  const [rightContent, setRightContent]         = useState(initialData?.rightContent || {});
  const [rightContentEnglish, setRightContentEnglish] = useState(initialData?.rightContentEnglish || {});
  const [questions, setQuestions]               = useState(initialData?.questions || []);
  const [addingQ, setAddingQ]                   = useState(false);
  const [editingIdx, setEditingIdx]             = useState(null);
  const [qType, setQType]                       = useState(null);
  const [qData, setQData]                       = useState({});
  const [lastCommon, setLastCommon]             = useState({ primaryInstruction:'', paadal:'', primaryTitle:'' });
  const [lastMcqPaadalQ, setLastMcqPaadalQ]     = useState('');
  const [showImport, setShowImport]             = useState(false);
  const [importText, setImportText]             = useState('');
  const [importError, setImportError]           = useState('');

  /* Load a full exercise set from JSON (parsed from an admin's Word document)
     and create it directly — the bridge for auto-filling questions/options/answers. */
  const doImport = () => {
    setImportError('');
    let parsed;
    try { parsed = JSON.parse(importText); }
    catch (e) { setImportError('Invalid JSON — ' + e.message); return; }
    if (!parsed || typeof parsed !== 'object') { setImportError('JSON must be an object.'); return; }
    if (!Array.isArray(parsed.questions) || parsed.questions.length === 0) {
      setImportError('JSON must include a non-empty "questions" array.'); return;
    }
    onSubmit(deepClean({
      leftButtons:         Array.isArray(parsed.leftButtons) ? parsed.leftButtons : [],
      rightContent:        (parsed.rightContent && typeof parsed.rightContent === 'object') ? parsed.rightContent : {},
      rightContentEnglish: (parsed.rightContentEnglish && typeof parsed.rightContentEnglish === 'object') ? parsed.rightContentEnglish : {},
      questions:           parsed.questions,
    }));
  };

  const toggleBtn = (btn) =>
    setSelectedBtns(prev => prev.includes(btn) ? prev.filter(b=>b!==btn) : [...prev, btn]);

  const startAddQ = () => { setQType(null); setQData({}); setEditingIdx(null); setAddingQ(true); };

  const selectType = (id) => {
    const base = emptyQ(id);
    if (id === 'title') { setQData(base); setQType(id); return; }
    const merged = {
      ...base,
      primaryInstruction: lastCommon.primaryInstruction,
      paadal:             lastCommon.paadal,
      primaryTitle:       lastCommon.primaryTitle,
      ...(id === 'mcq-paadal' ? { question: lastMcqPaadalQ } : {}),
    };
    setQData(merged);
    setQType(id);
  };

  const saveQ = () => {
    const cleaned = deepClean(qData);
    if (cleaned.primaryInstruction || cleaned.paadal || cleaned.primaryTitle) {
      setLastCommon({
        primaryInstruction: cleaned.primaryInstruction || lastCommon.primaryInstruction,
        paadal:             cleaned.paadal             || lastCommon.paadal,
        primaryTitle:       cleaned.primaryTitle       || lastCommon.primaryTitle,
      });
    }
    if (cleaned.type === 'mcq-paadal' && cleaned.question) {
      setLastMcqPaadalQ(cleaned.question);
    }
    if (editingIdx !== null) {
      setQuestions(prev => prev.map((q, i) => i === editingIdx ? cleaned : q));
      setEditingIdx(null);
    } else {
      setQuestions(prev => [...prev, cleaned]);
    }
    setAddingQ(false);
    setQType(null);
    setQData({});
  };

  const editQ = (i) => {
    const q = questions[i];
    setQType(q.type);
    setQData({ ...q });
    setEditingIdx(i);
    setAddingQ(true);
  };

  const removeQ = (i) => setQuestions(prev => prev.filter((_,idx)=>idx!==i));

  const cancelAdding = () => { setAddingQ(false); setQType(null); setEditingIdx(null); };

  const handleSubmit = () => onSubmit({ leftButtons:selectedBtns, rightContent, rightContentEnglish, questions: deepClean(questions) });

  const STEPS = ['Left Column','Right Column','Questions'];

  return (
    <div style={S.wrap}>
      {isEditing && (
        <div style={{ background:C.infoBg, border:`1px solid ${C.infoBorder}`, borderRadius:6, padding:'10px 14px', marginBottom:16, fontSize:'0.85rem', color:C.sectionHead, fontWeight:600 }}>
          ✎ Editing an existing exercise set — make your changes across the steps, then click <strong>Save Changes</strong> on the final step.
        </div>
      )}
      {/* Step indicator */}
      <div style={{ display:'flex', gap:6, marginBottom:20, alignItems:'center', flexWrap:'wrap' }}>
        {[1,2,3].map(n => (
          <div key={n} style={{ display:'flex', alignItems:'center', gap:6 }}>
            <div style={{ width:28, height:28, borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center',
              background: step===n ? C.stepActive : step>n ? C.stepDone : C.stepInactive,
              border: `2px solid ${step>=n ? (step===n ? C.stepActive : C.stepDone) : C.chipBorder}`,
              color: step>=n ? C.textLight : C.label, fontSize:'0.8rem', fontWeight:700 }}>
              {n}
            </div>
            <span style={{ fontSize:'0.8rem', color: step===n ? C.textMain : C.label, fontWeight: step===n ? 600 : 400 }}>
              {STEPS[n-1]}
            </span>
            {n<3 && <span style={{ color:C.chipBorder, margin:'0 2px' }}>›</span>}
          </div>
        ))}
      </div>

      {/* ── Import panel (admin auto-fill from Word document → JSON) ── */}
      {step === 1 && !isEditing && (
        <div style={{ ...S.panel, borderStyle:'dashed' }}>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', gap:10, cursor:'pointer' }}
               onClick={()=>setShowImport(s=>!s)}>
            <div>
              <div style={{ fontSize:'1rem', fontWeight:700, color:C.textMain, marginBottom:3 }}>📥 Import from document (JSON)</div>
              <div style={{ fontSize:'0.8rem', color:C.label }}>Paste the exercise-set JSON generated from a Word document to auto-fill every field. Skip this to build manually below.</div>
            </div>
            <span style={{ fontSize:'1.1rem', color:C.label }}>{showImport ? '▲' : '▼'}</span>
          </div>
          {showImport && (
            <div style={{ marginTop:14 }}>
              <textarea
                rows={8}
                value={importText}
                onChange={e=>{ setImportText(e.target.value); setImportError(''); }}
                placeholder='Paste JSON here — e.g. { "leftButtons": [...], "rightContent": {...}, "questions": [...] }'
                style={{ ...S.input, fontFamily:'monospace', fontSize:'0.78rem' }}
              />
              {importError && (
                <div style={{ background:'rgba(178,34,34,0.1)', border:'1px solid rgba(178,34,34,0.4)', borderRadius:4, padding:'7px 12px', marginBottom:10, fontSize:'0.8rem', color:'#b22222', fontWeight:600 }}>
                  ⚠ {importError}
                </div>
              )}
              <div style={{ display:'flex', justifyContent:'flex-end', gap:10 }}>
                <button type="button" onClick={doImport} disabled={!importText.trim()}
                  style={{ ...S.btnTeal, opacity: importText.trim() ? 1 : 0.4, cursor: importText.trim() ? 'pointer' : 'not-allowed' }}>
                  Load &amp; Create Set ✓
                </button>
              </div>
              <div style={{ fontSize:'0.73rem', color:C.label, marginTop:8 }}>
                The set is created immediately for this unit. You can then use <strong>✎ Edit</strong> to review or adjust any field.
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── Step 1 ── */}
      {step === 1 && (
        <div style={S.panel}>
          <div style={{ fontSize:'1rem', fontWeight:700, color:C.textMain, marginBottom:3 }}>இடது பகுதி — Left Column</div>
          <div style={{ fontSize:'0.8rem', color:C.label, marginBottom:16 }}>Select the buttons to include in the left sidebar of the exercise.</div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:7 }}>
            {LEFT_BUTTONS_ALL.map(btn => (
              <div key={btn} onClick={()=>toggleBtn(btn)} style={S.chip(selectedBtns.includes(btn))}>
                <span style={{ width:16, height:16, borderRadius:3,
                  border:`2px solid ${selectedBtns.includes(btn) ? C.textLight : C.chipBorder}`,
                  background: selectedBtns.includes(btn) ? C.btnTeal : 'transparent',
                  flexShrink:0, display:'flex', alignItems:'center', justifyContent:'center' }}>
                  {selectedBtns.includes(btn) && <span style={{ color:'#fff', fontSize:10, fontWeight:700 }}>✓</span>}
                </span>
                {btn}
              </div>
            ))}
          </div>
          <div style={{ display:'flex', justifyContent:'flex-end', marginTop:18, gap:10 }}>
            <button type="button" onClick={onCancel} style={S.btnSec}>Cancel</button>
            <button type="button" onClick={()=>setStep(2)} disabled={!selectedBtns.length}
              style={{ ...S.btn, opacity: selectedBtns.length ? 1 : 0.4, cursor: selectedBtns.length ? 'pointer' : 'not-allowed' }}>
              Next →
            </button>
          </div>
        </div>
      )}

      {/* ── Step 2 ── */}
      {step === 2 && (
        <div style={S.panel}>
          <div style={{ fontSize:'1rem', fontWeight:700, color:C.textMain, marginBottom:3 }}>வலது பகுதி — Right Column</div>
          <div style={{ fontSize:'0.8rem', color:C.label, marginBottom:16 }}>Enter the content displayed in the right panel when each button is clicked.</div>
          {selectedBtns.map(btn => (
            <div key={btn} style={S.section}>
              <label style={S.label}>{btn}</label>
              <textarea rows={4} value={rightContent[btn]||''} onChange={e=>setRightContent({...rightContent,[btn]:e.target.value})} style={S.input} placeholder={`Content for ${btn}…`} />
              {btn === 'நூற்பெயர்' && (
                <div style={{ marginTop:2 }}>
                  <label style={{ ...S.label, color:C.noteText }}>ஆங்கில உள்ளடக்கம் (English content — optional)</label>
                  <div style={{ background:C.noteBg, border:`1px solid ${C.noteBorder}`, borderRadius:4, padding:'6px 10px', marginBottom:6, fontSize:'0.75rem', color:C.noteText }}>
                    If provided, an <strong>ஆங்கீலம்</strong> button will appear in the exercise when நூற்பெயர் is selected.
                  </div>
                  <textarea rows={3} value={rightContentEnglish['நூற்பெயர்']||''} onChange={e=>setRightContentEnglish({...rightContentEnglish,'நூற்பெயர்':e.target.value})} style={{ ...S.input, marginBottom:0 }} placeholder="English translation (optional)…" />
                </div>
              )}
            </div>
          ))}
          <div style={{ display:'flex', justifyContent:'flex-end', marginTop:8, gap:10 }}>
            <button type="button" onClick={()=>setStep(1)} style={S.btnSec}>← Back</button>
            <button type="button" onClick={()=>setStep(3)} style={S.btn}>Next →</button>
          </div>
        </div>
      )}

      {/* ── Step 3 ── */}
      {step === 3 && (
        <div>
          <div style={S.panel}>
            <div style={{ fontSize:'1rem', fontWeight:700, color:C.textMain, marginBottom:3 }}>மையப் பகுதி — Questions</div>
            <div style={{ fontSize:'0.8rem', color:C.label, marginBottom:16 }}>Add one or more questions. Each becomes a slide in the exercise popup. Primary Title, Paadal and Primary Instruction are auto-filled from the previous question.</div>

            {/* Added questions list — hidden while adding/editing a single question,
                so the editor for that question is what the user sees */}
            {!addingQ && questions.length > 0 && (
              <div style={{ marginBottom:16 }}>
                <div style={S.secHd}>Added Questions ({questions.length})</div>
                {questions.map((q,i) => (
                  <div key={i} style={{ display:'flex', alignItems:'center', gap:8, padding:'8px 12px', background:C.panelInner, borderRadius:4, marginBottom:6, border:`1px solid ${C.chipBorder}` }}>
                    <span style={{ color:C.btnTeal, fontWeight:700, fontSize:'0.82rem' }}>{i+1}.</span>
                    <span style={{ flex:1, fontSize:'0.82rem', color:C.textMain }}>{QTYPES.find(t=>t.id===q.type)?.label}{q.primaryTitle ? ` — "${q.primaryTitle}"` : ''}</span>
                    <button
                      type="button"
                      onClick={() => editQ(i)}
                      style={{ background:'none', border:`1px solid ${C.chipBorder}`, color:C.btnTeal, cursor:'pointer', fontSize:'0.75rem', fontWeight:700, padding:'2px 8px', borderRadius:3 }}
                      title="Edit question"
                    >✎ Edit</button>
                    <button
                      type="button"
                      onClick={() => removeQ(i)}
                      style={{ background:'none', border:'none', color:'#cc3333', cursor:'pointer', fontSize:'0.9rem', fontWeight:700 }}
                      title="Remove question"
                    >✕</button>
                  </div>
                ))}
              </div>
            )}

            {/* Question builder */}
            {addingQ ? (
              <div style={{ background:C.panelInner, borderRadius:6, padding:'16px', border:`1px solid ${C.chipBorder}` }}>
                {editingIdx !== null && (
                  <div style={{ fontSize:'0.76rem', color:C.btnTeal, fontWeight:600, marginBottom:8, padding:'4px 8px', background:C.noteBg, borderRadius:3, border:`1px solid ${C.noteBorder}` }}>
                    Editing question {editingIdx + 1}
                  </div>
                )}
                <div style={S.secHd}>Select Question Type</div>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:6, marginBottom:16 }}>
                  {QTYPES.map(t => (
                    <div key={t.id} onClick={()=>selectType(t.id)} style={S.chip(qType===t.id)}>{t.label}</div>
                  ))}
                </div>

                {qType && (
                  <>
                    <div style={{ borderTop:`1px solid ${C.chipBorder}`, paddingTop:14, marginBottom:14 }}>
                      <QFields data={qData} onChange={setQData} />
                    </div>
                    <div style={{ display:'flex', gap:10 }}>
                      <button type="button" onClick={cancelAdding} style={S.btnSec}>Cancel</button>
                      <button type="button" onClick={saveQ} style={S.btnTeal}>
                        {editingIdx !== null ? 'Save Changes ✓' : 'Add Question ✓'}
                      </button>
                    </div>
                  </>
                )}
                {!qType && <button type="button" onClick={cancelAdding} style={S.btnSec}>Cancel</button>}
              </div>
            ) : (
              <button type="button" onClick={startAddQ} style={{ ...S.btnTeal, width:'100%', padding:'10px' }}>
                + Add a Question
              </button>
            )}
          </div>

          <div style={{ display:'flex', justifyContent:'space-between', gap:10 }}>
            <button type="button" onClick={()=>setStep(2)} style={S.btnSec}>← Back</button>
            <button type="button" onClick={handleSubmit} disabled={!questions.length}
              style={{ ...S.btn, opacity: questions.length ? 1 : 0.4, cursor: questions.length ? 'pointer' : 'not-allowed' }}>
              {isEditing ? 'Save Changes ✓' : 'Create Exercise Set ✓'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
