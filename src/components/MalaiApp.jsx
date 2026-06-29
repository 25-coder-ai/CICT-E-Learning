import './malai-app.css'
import { useState } from 'react'

function NoorPeyarContent() {
  const [showEnglish, setShowEnglish] = useState(false)
  return (
    <div>
      <h3>{showEnglish ? 'Purananuru' : 'புறநானூறு'}</h3>
      <p>புறத்திணை பற்றி பேசும்
நானூறு பாடல்களின் தொகுப்பு.
புறம், புறப்பாட்டு என வேறு
பெயர்களைக் கொண்டுள்ளது.
இந்நூல் 400 பாடல்களை
உடையதாய்த் திகழ்கின்றது.
இப்பாடல்கள் பெரும்பாலும்
ஆசிரியப்பாவினால்
பாடப்பெற்றுள்ளன. பல
பாடல்கள் சிதைந்து
காணப்பெறுகின்றமையால்
அடிவரையறையினை வகுக்க
இயலவில்லை. இப்பாடல்கள்
4 அடி சிற்றெல்லை 40 அடி
பேரெல்லை
கொண்டமைகின்றன.
இந்நூலைத் தொகுத்தார்
தொகுப்பித்தார் யாரெனத்
தெரியவில்லை. இந்நூலின் 400 பாடல்களும் ஏதோ ஓர்
இயைபு கருதி வடிவமைக்கப்
பட்டுள்ளன. முதலில்
முடிமன்னர் மூவர், அடுத்து
குறுநில மன்னர், வேளிர்
ஆகியோர், அடுத்து
போர்ப்பாடல்,
கையறுநிலைப்பாடல், நடுகல்
எனத் தொகுக்கப்பட்டுள்ளன.
ஒவ்வொரு பாடலைத்
தொடர்ந்தும் பாடலுக்குரிய
திணை, துறை விளக்கங்கள்,
அவனை அவர் பாடியதெனப்
பாடிய புலவர், பாடப்பெற்ற
அரசன் ஆகியோர் குறித்த
செய்திகள் இடம்பெற்றுள்ளன.
இந்நூலினுள் காணப்பெறுகின்ற
புலவர்கள் ஒரே காலத்தை, இனத்தை, நாட்டைச்
சேர்ந்தவர்கள் அல்லர்.
டாக்டர் உ.வே.சாமிநாதையர்
இந்நூலைப் பதிப்பித்துள்ளார்.
முதல் 266 பாடல்களுக்குப்
பழைய உரை உள்ளது. பின்னர்
ஔவை.சு.துரைசாமிபிள்ளை
உரை வகுத்துள்ளார்.
தொடித்தலைவிழுத்தண்டினார்,
இரும்பிடர்த்தலையார் எனச்
சொற்றொடரால் பெயர் பெற்ற
புலவர்களைக் காணலாம்.
தமிழரின் சமுதாய வரலாற்றை
எடுத்துரைக்கும் நூலாகப்
புறநானூறு விளங்குகிறது.</p>
      <span className="lang-toggle" onClick={() => setShowEnglish(v => !v)}>
        ஆங்கீலம்
      </span>
      {showEnglish && (
        <p className="english-translation">
          The four hundred (poems) in the genre puram, traditionally the last of the anthologies, historically probably the most valuable and perhaps the latest of the collections; a careful study would no doubt show that it contains stanzas of different chronological levels, covering probably more than 2-3 centuries. It was considered by the redactors of the anthologies as the collection of heroic poetry par excellence; it is also simply called puram, or purappattu, the heroic songs. Of the 400 poems, two 267 and 268, are lost; Some poems are fragmentary. There is an invocatory stanza on Siva by Peruntevanar, so that the anthology as it stands contains 397 pieces. Old anonymous commentary is available up to stanza 266. There is a modern popular commentary by Auvai S. Turaicami Pillai. The anthology was first published by U.V. Swaminatha Aiyar (the excellent introduction is dated September, 1894). 138 poems of the anthology are in praise of 43 kings belonging to the three great dynasties (27 deal with the achievements of 18 Ceral kings, 74 poems praise 13 Cola rulers, and 37 poems laud 12 Pantiya kings). 141 poems are in praise of 48 chieftains, nine of them regarded prominent enough to be treated in more than 4 poems each (e.g. Atiyaman Netuman Anci, Vel Pari, Pekan, Kari etc.). Some kings emerge strikingly as heroes of Puram poems; e.g. Karikalan the Chola or Kutakko Netunceralatan the Chera; clusters of poems in which certain heroes emerge prominently are centered around certain incidents in the heroes' lives. The redactors seem to have tried to group the poems on the basis of the kings or chieftains praised in them, but at the same time, on the basis of many different themes. 121 poems have defective colophons, and owing to this fact their heroes are unknown. More than 100 poems beginning with 248 and ending with 357 have been classified into 30 themes by the colophon writer(s); the heroes are anonymous; this section of Puram may contain a very early strata of Tamil heroic poetry. Thus, e.g., there are poems about widowhood and its hardships (248–56), poems praising the prowess of the warhorse (273, 299, 302–4), elegies (260–1, 264–5, 270, apart from other elegies occurring earlier; all in all, there are 43 elegies in Puram); from 358 to the end of the anthology, the poems again refer to kings and chieftains. 141 poems in the anthology belong to straight panegyric poetry called patan. As Kailasapathy rightly says, "modern attempts to read ethical and moral motivations into the words of the bards are particularly strained, if not irrelevant," at least as far as most of the poems are concerned. But there are a few poems with gnomic content, and there are a few lines in this anthology — probably under the influence of Jainism and Buddhism, and yet specifically Tamil in spirit — which may be regarded as showing elements of that pragmatic approach and practical and universal ethics which underlies the Tirukkural. There are also elements of reflexion, and some of the poems are fully reflexive, the central idea being mostly the impermanence of life in this world. These poems seem to be of later origin than the more ancient, straightforward war and panegyric songs.
        </p>
      )}
    </div>
  )
}

const Q14_CORRECT = [
  'குன்றும் மலையும் பலபின் ஒழிய',
  'வந்தனென் பரிசில் கொண்டனென் செலற்குஎன',
  'காணாது ஈத்த இப்பொருட்கு யான்ஓர்',
  'வாணிகப் பரிசிலன் அல்லேன் பேணித்',
  'தினைஅனைத்து ஆயினும் இனிதுஅவர்',
  'துணைஅளவு அறிந்து நல்கினர் விடினே',
]

const Q14_BANK = [
  'குன்றும் மலையும் பலபின் ஒழிய',
  'வந்தனென் பரிசில் கொண்டனென் செலற்குஎன',
  'நின்ற என்நயந்து அருளி ஈதுகொண்டு',
  'ஈங்கனம் செல்க தான்என என்னை',
  'யாங்கறிந் தனனோ தாங்குஅரும் காவலன்',
  'காணாது ஈத்த இப்பொருட்கு யான்ஓர்',
  'வாணிகப் பரிசிலன் அல்லேன் பேணித்',
  'தினைஅனைத்து ஆயினும் இனிதுஅவர்',
  'துணைஅளவு அறிந்து நல்கினர் விடினே',
]

function Q14Content({ onNext, onCorrect }) {
  const [showOptions, setShowOptions] = useState(false)
  const [slots, setSlots]             = useState(Array(6).fill(null))
  const [dragItem, setDragItem]       = useState(null)
  const [dragOver, setDragOver]       = useState(null)
  const [showSuccess, setShowSuccess] = useState(false)

  const placed    = new Set(slots.filter(Boolean))
  const bankItems = Q14_BANK.filter(item => !placed.has(item))

  const handleDrop = (slotIndex) => {
    setDragOver(null)
    if (dragItem === null || slots[slotIndex] !== null) return
    if (dragItem === Q14_CORRECT[slotIndex]) {
      const newSlots = [...slots]
      newSlots[slotIndex] = dragItem
      setSlots(newSlots)
      if (newSlots.every((s, i) => s === Q14_CORRECT[i])) { setShowSuccess(true); onCorrect() }
    }
    setDragItem(null)
  }

  if (showOptions) {
    return (
      <div className="q4-options-page q10-drag-page">
        <div className="q10-slots">
          {slots.map((slot, i) => (
            <div
              key={i}
              className={`q10-slot${slot ? ' q10-slot-filled' : ''}${dragOver === i ? ' q10-slot-hover' : ''}`}
              onDragOver={e => { e.preventDefault(); setDragOver(i) }}
              onDragLeave={() => setDragOver(null)}
              onDrop={() => handleDrop(i)}
            >
              {slot}
            </div>
          ))}
        </div>
        <div className="q10-bank">
          {bankItems.map((item) => (
            <div
              key={item}
              className="q10-bank-item"
              draggable
              onDragStart={() => setDragItem(item)}
              onDragEnd={() => setDragItem(null)}
            >
              {item}
            </div>
          ))}
        </div>

        {showSuccess && (
          <div className="popup-overlay">
            <div className="popup-box">
              <div className="popup-header">சரியான பதில்</div>
              <div className="popup-body">
                <div className="popup-correct-content">
                  <svg viewBox="0 0 100 100" className="check-icon" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <linearGradient id="checkGrad14" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%"   stopColor="#66ee66" />
                        <stop offset="50%"  stopColor="#22bb22" />
                        <stop offset="100%" stopColor="#0d7a0d" />
                      </linearGradient>
                      <filter id="checkShadow14" x="-25%" y="-25%" width="150%" height="150%">
                        <feDropShadow dx="2" dy="3" stdDeviation="3" floodColor="#000" floodOpacity="0.45" />
                      </filter>
                    </defs>
                    <polyline points="10,54 38,82 90,16" stroke="url(#checkGrad14)"
                      strokeWidth="20" strokeLinecap="round" strokeLinejoin="round"
                      fill="none" filter="url(#checkShadow14)" />
                  </svg>
                  <p className="popup-success-text">வாழ்த்துகள், மேலே செல்க</p>
                </div>
                <div className="popup-footer">
                  <button className="popup-action-btn"
                    onClick={() => { setShowSuccess(false); onNext() }}>
                    அடுத்து
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="q2-wrap">
      <div className="q2-paadal">
        <p>
          குன்றும் மலையும் பலபின் ஒழிய<br />
          வந்தனென் பரிசில் கொண்டனென் செலற்குஎன<br />
          நின்ற என்நயந்து அருளி ஈதுகொண்டு<br />
          ஈங்கனம் செல்க தான்என என்னை<br />
          யாங்கறிந் தனனோ தாங்குஅரும் காவலன்<br />
          காணாது ஈத்த இப்பொருட்கு யான்ஓர்<br />
          வாணிகப் பரிசிலன் அல்லேன் பேணித்<br />
          தினைஅனைத்து ஆயினும் இனிதுஅவர்<br />
          துணைஅளவு அறிந்து நல்கினர் விடினே
        </p>
      </div>
      <div className="q2-divider">
        <div className="q2-media-controls">
          <button className="media-btn">◀</button>
          <button className="media-btn">▶</button>
          <button className="media-btn">⏸</button>
          <button className="media-btn">■</button>
        </div>
      </div>
      <div className="q2-question-area">
        <p className="q-recall">மீண்டும் ஒருமுறை இப்பாடலை மனத்திற்குள் வாசித்துக் கொள்ளுங்கள்.</p>
        <p>இப்பாடலின் துறை விளக்கம் தரப்பட்டுள்ளது. துறைக் குமிழைத் தேர்வு செய்யுங்கள். இப்பாடலின் சரியான துறை விளக்கத்திற்குரிய அடிகளை எடுத்து இடவும்.</p>
        <div className="q4-btn-center">
          <button className="q4-click-btn" onClick={() => setShowOptions(true)}>
            இங்கே சொடுக்கவும்
          </button>
        </div>
      </div>
    </div>
  )
}

const Q13_CORRECT = [
  'குன்றும் மலையும் பலபின் ஒழிய',
  'வந்தனென் பரிசில் கொண்டனென் செலற்குஎன',
  'நின்ற என்நயந்து அருளி ஈதுகொண்டு',
  'ஈங்கனம் செல்க தான்என என்னை',
  'யாங்கறிந் தனனோ தாங்குஅரும் காவலன்',
]

const Q13_BANK = [
  'குன்றும் மலையும் பலபின் ஒழிய',
  'வந்தனென் பரிசில் கொண்டனென் செலற்குஎன',
  'நின்ற என்நயந்து அருளி ஈதுகொண்டு',
  'ஈங்கனம் செல்க தான்என என்னை',
  'யாங்கறிந் தனனோ தாங்குஅரும் காவலன்',
  'காணாது ஈத்த இப்பொருட்கு யான்ஓர்',
  'வாணிகப் பரிசிலன் அல்லேன் பேணித்',
  'தினைஅனைத்து ஆயினும் இனிதுஅவர்',
  'துணைஅளவு அறிந்து நல்கினர் விடினே',
]

function Q13Content({ onNext, onCorrect }) {
  const [showOptions, setShowOptions] = useState(false)
  const [slots, setSlots]             = useState(Array(5).fill(null))
  const [dragItem, setDragItem]       = useState(null)
  const [dragOver, setDragOver]       = useState(null)
  const [showSuccess, setShowSuccess] = useState(false)

  const placed    = new Set(slots.filter(Boolean))
  const bankItems = Q13_BANK.filter(item => !placed.has(item))

  const handleDrop = (slotIndex) => {
    setDragOver(null)
    if (dragItem === null || slots[slotIndex] !== null) return
    if (dragItem === Q13_CORRECT[slotIndex]) {
      const newSlots = [...slots]
      newSlots[slotIndex] = dragItem
      setSlots(newSlots)
      if (newSlots.every((s, i) => s === Q13_CORRECT[i])) { setShowSuccess(true); onCorrect() }
    }
    setDragItem(null)
  }

  if (showOptions) {
    return (
      <div className="q4-options-page q10-drag-page">
        <div className="q10-slots">
          {slots.map((slot, i) => (
            <div
              key={i}
              className={`q10-slot${slot ? ' q10-slot-filled' : ''}${dragOver === i ? ' q10-slot-hover' : ''}`}
              onDragOver={e => { e.preventDefault(); setDragOver(i) }}
              onDragLeave={() => setDragOver(null)}
              onDrop={() => handleDrop(i)}
            >
              {slot}
            </div>
          ))}
        </div>
        <div className="q10-bank">
          {bankItems.map((item) => (
            <div
              key={item}
              className="q10-bank-item"
              draggable
              onDragStart={() => setDragItem(item)}
              onDragEnd={() => setDragItem(null)}
            >
              {item}
            </div>
          ))}
        </div>

        {showSuccess && (
          <div className="popup-overlay">
            <div className="popup-box">
              <div className="popup-header">சரியான பதில்</div>
              <div className="popup-body">
                <div className="popup-correct-content">
                  <svg viewBox="0 0 100 100" className="check-icon" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <linearGradient id="checkGrad13" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%"   stopColor="#66ee66" />
                        <stop offset="50%"  stopColor="#22bb22" />
                        <stop offset="100%" stopColor="#0d7a0d" />
                      </linearGradient>
                      <filter id="checkShadow13" x="-25%" y="-25%" width="150%" height="150%">
                        <feDropShadow dx="2" dy="3" stdDeviation="3" floodColor="#000" floodOpacity="0.45" />
                      </filter>
                    </defs>
                    <polyline points="10,54 38,82 90,16" stroke="url(#checkGrad13)"
                      strokeWidth="20" strokeLinecap="round" strokeLinejoin="round"
                      fill="none" filter="url(#checkShadow13)" />
                  </svg>
                  <p className="popup-success-text">வாழ்த்துகள், மேலே செல்க</p>
                </div>
                <div className="popup-footer">
                  <button className="popup-action-btn"
                    onClick={() => { setShowSuccess(false); onNext() }}>
                    அடுத்து
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="q2-wrap">
      <div className="q2-paadal">
        <p>
          குன்றும் மலையும் பலபின் ஒழிய<br />
          வந்தனென் பரிசில் கொண்டனென் செலற்குஎன<br />
          நின்ற என்நயந்து அருளி ஈதுகொண்டு<br />
          ஈங்கனம் செல்க தான்என என்னை<br />
          யாங்கறிந் தனனோ தாங்குஅரும் காவலன்<br />
          காணாது ஈத்த இப்பொருட்கு யான்ஓர்<br />
          வாணிகப் பரிசிலன் அல்லேன் பேணித்<br />
          தினைஅனைத்து ஆயினும் இனிதுஅவர்<br />
          துணைஅளவு அறிந்து நல்கினர் விடினே
        </p>
      </div>
      <div className="q2-divider">
        <div className="q2-media-controls">
          <button className="media-btn">◀</button>
          <button className="media-btn">▶</button>
          <button className="media-btn">⏸</button>
          <button className="media-btn">■</button>
        </div>
      </div>
      <div className="q2-question-area">
        <p className="q-recall">மீண்டும் ஒருமுறை இப்பாடலை மனத்திற்குள் வாசித்துக் கொள்ளுங்கள்.</p>
        <p>இப்பாடலின் திணை விளக்கம் தரப்பட்டுள்ளது. திணைக் குமிழைத் தேர்வு செய்யுங்கள். இப்பாடலின் சரியான திணை விளக்கத்திற்குரிய அடிகளை எடுத்து இடவும்.</p>
        <div className="q4-btn-center">
          <button className="q4-click-btn" onClick={() => setShowOptions(true)}>
            இங்கே சொடுக்கவும்
          </button>
        </div>
      </div>
    </div>
  )
}

const Q12_QA = [
  {
    num: 1,
    question: 'இப்பாடலின் மையக்கருத்தென்ன?',
    answer: 'தகுதி அறிந்து கண்டு புலவருக்குப் பரிசில் அளித்தல் வேண்டும் என்பதே இப்பாடலின் மையக்கருத்து.',
  },
  {
    num: 2,
    question: 'இப்பாடலைப் பாடிய புலவர் யார்? யாரைக் குறித்துப் பாடியுள்ளார்?',
    answer: 'இப்பாடலைப் பாடிய புலவர் பெருஞ்சித்திரனார். இவர் இப்பாடலில் அதியமான் நெடுமானஞ்சியைக் குறித்துப் பாடியுள்ளார்.',
  },
  {
    num: 3,
    question: 'இப்பாடலின் துறை என்ன? திணை என்ன?',
    answer: 'இப்பாடலின் துறை பரிசில் கடைஇய கடைக்கூட்டு நிலை. இப்பாடலின் திணை பாடாண்.',
  },
  {
    num: 4,
    question: 'கீழ்வரும் சொற்களுக்குப் பொருள் தருக.\n(அ) நயந்து (ஆ) தாங்கரும் (இ) துணை (ஈ) காவலன்',
    answer: '(அ)நயந்து - அன்புற்று\n(ஆ)தாங்கரும் - தடுத்தற்கரிய\n(இ)துணை - தகுதி\n(ஈ)காவலன் - வேந்தன்',
  },
  {
    num: 5,
    question: 'இப்பாடலின் பொழிப்புரை தருக.',
    answer: 'சிறிய குன்றும் பெரு மலையும் பல பின்னே பிற்பட வந்தேன் யான், பரிசில் கொண்டவனாய்ப் போவதற்கு எனச் சொல்லிநின்ற என்னை, அன்புற்று அருளி இப்பொருளைக் கொண்டு இவ்வாறு செல்க எனக் கூற, என் தகுதியை எங்ஙனம் அறிந்தனன் தடுத்தற்கு அரிய வேந்தன்? காணாமல் கொடுத்த இப்பரிசுப்பொருளுக்கு யான் ஓர் ஊதியமே கருதும் பரிசிலன் இல்லை. விரும்பி அவருடைய தகுதியளவு அறிந்து அளித்துவிடின், அது தினையளவாயினும் இனியது என்பது இப்பாடலின் பொழிப்புரை.',
  },
  {
    num: 6,
    question: 'இப்பாடலின் மையக்கருத்தை அடிப்படையாகக் கொண்டு குறுங்கட்டுரை வரைக.',
    answer: 'இப்பாடல் புறநானூற்றின் 208ஆம் பாடலாக அமைகின்றது. இப்பாடலின் ஆசிரியர் பெருஞ்சித்திரனார். இவர் அதியமான் நெடுமானஞ்சியிடம் பரிசில் பெறச் சென்றபோது, அவன் புலவரைக் காணாது பரிசில் ஈந்தான். அதனை வாங்க மறுத்து நேரில் கண்டு தகுதியறிந்து திணையளவு பரிசில் தரினும் அதனைப் பெறுதலே தமக்குப் பெருமையென அஞ்சாது எடுத்துரைத்தார். இந்நிகழ்வே இப்பாடலாகப் புறநானூற்றில் அமைந்திருக்கின்றது.',
  },
]

function Q12Content({ onNext, onCorrect }) {
  const [showPage2, setShowPage2] = useState(false)
  const [activePopup, setActivePopup] = useState(null)

  const paadalBlock = (
    <div className="q2-paadal">
      <p>
        குன்றும் மலையும் பலபின் ஒழிய<br />
        வந்தனென் பரிசில் கொண்டனென் செலற்குஎன<br />
        நின்ற என்நயந்து அருளி ஈதுகொண்டு<br />
        ஈங்கனம் செல்க தான்என என்னை<br />
        யாங்கறிந் தனனோ தாங்குஅரும் காவலன்<br />
        காணாது ஈத்த இப்பொருட்கு யான்ஓர்<br />
        வாணிகப் பரிசிலன் அல்லேன் பேணித்<br />
        தினைஅனைத்து ஆயினும் இனிதுஅவர்<br />
        துணைஅளவு அறிந்து நல்கினர் விடினே
      </p>
    </div>
  )

  const dividerBlock = (
    <div className="q2-divider">
      <div className="q2-media-controls">
        <button className="media-btn">◀</button>
        <button className="media-btn">▶</button>
        <button className="media-btn">⏸</button>
        <button className="media-btn">■</button>
      </div>
    </div>
  )

  if (!showPage2) {
    return (
      <div className="q2-wrap">
        {paadalBlock}
        {dividerBlock}
        <div className="q2-question-area q12-question-area">
          <p className="q-recall">மீண்டும் ஒருமுறை இப்பாடலை மனத்திற்குள் வாசித்துக்கொள்ளுங்கள்.</p>
          <p>இனி, கீழ்வரும் வினாக்களுக்கு விடை எழுதுக. உங்கள் ஒவ்வொரு
விடையையும் கொடுக்கப்பட்டிருக்கும் விடையோடு ஒப்பிட்டு
மதிப்பீடு செய்க.</p>  
          <div className="q12-footer-left">
            <button className="q12-next-btn" onClick={() => { setShowPage2(true); onCorrect() }}>அடுத்து</button>
          </div>
        </div>
      </div>
    )
  }

  const activeQA = Q12_QA.find(q => q.num === activePopup)

  return (
    <div className="q2-wrap">
      {paadalBlock}
      {dividerBlock}
      <div className="q2-question-area q12-question-area">
        <p className="q-recall">மீண்டும் ஒருமுறை இப்பாடலை மனத்திற்குள் வாசித்துக்கொள்ளுங்கள்.</p>
        <p>இனி, கீழ்வரும் வினாக்களுக்கு விடை எழுதுக. உங்கள் ஒவ்வொரு விடையையும் கொடுக்கப்பட்டிருக்கும் விடையோடு ஒப்பிட்டு மதிப்பீடு செய்க.</p>
        <ol className="q12-questions">
          {Q12_QA.map((qa) => (
            <li key={qa.num} className="q12-question-item">
              <span className="q12-question-text">
                {qa.question.split('\n').map((line, i) => (
                  <span key={i}>{line}{i < qa.question.split('\n').length - 1 && <br />}</span>
                ))}
              </span>
              <button className="q12-vidai-btn" onClick={() => setActivePopup(qa.num)}>விடை</button>
            </li>
          ))}
        </ol>
        <div className="q12-footer-right">
          <button className="q12-next-btn" onClick={onNext}>அடுத்து</button>
        </div>
      </div>

      {activePopup !== null && activeQA && (
        <div className="popup-overlay">
          <div className="q12-popup">
            <div className="q12-popup-header">
              <span>{activeQA.num}. {activeQA.question.split('\n').map((line, i) => (
                <span key={i}>{line}{i < activeQA.question.split('\n').length - 1 && <br />}</span>
              ))}</span>
              <button className="q12-popup-close" onClick={() => setActivePopup(null)}>✕</button>
            </div>
            <div className="q12-popup-body">
              {activeQA.answer.split('\n').map((line, i) => <p key={i}>{line}</p>)}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function Q11Content() {
  return (
    <div className="q2-wrap">
      <div className="q2-paadal">
        <p>
          குன்றும் மலையும் பலபின் ஒழிய<br />
          வந்தனென் பரிசில் கொண்டனென் செலற்குஎன<br />
          நின்ற என்நயந்து அருளி ஈதுகொண்டு<br />
          ஈங்கனம் செல்க தான்என என்னை<br />
          யாங்கறிந் தனனோ தாங்குஅரும் காவலன்<br />
          காணாது ஈத்த இப்பொருட்கு யான்ஓர்<br />
          வாணிகப் பரிசிலன் அல்லேன் பேணித்<br />
          தினைஅனைத்து ஆயினும் இனிதுஅவர்<br />
          துணைஅளவு அறிந்து நல்கினர் விடினே
        </p>
      </div>
      <div className="q2-divider">
        <div className="q2-media-controls">
          <button className="media-btn">◀</button>
          <button className="media-btn">▶</button>
          <button className="media-btn">⏸</button>
          <button className="media-btn">■</button>
        </div>
      </div>
      <div className="q2-question-area">
        <p className="q-recall">மீண்டும் ஒருமுறை இப்பாடலை மனத்திற்குள் வாசித்துக்கொள்ளுங்கள்.</p>
        <p>இனி, வாசிக்கப்படும் இப்பாடலைக் கவனமாகக் கேளுங்கள்.</p>
        <div className="q11-poem">
          <p>
            குன்றும் மலையும் பலபின் ஒழிய<br />
            வந்தனென் பரிசில் கொண்டனென் செலற்குஎன<br />
            நின்ற என்நயந்து அருளி ஈதுகொண்டு<br />
            ஈங்கனம் செல்க தான்என என்னை<br />
            யாங்கறிந் தனனோ தாங்குஅரும் காவலன்<br />
            காணாது ஈத்த இப்பொருட்கு யான்ஓர்<br />
            வாணிகப் பரிசிலன் அல்லேன் பேணித்<br />
            தினைஅனைத்து ஆயினும் இனிதுஅவர்<br />
            துணைஅளவு அறிந்து நல்கினர் விடினே
          </p>
        </div>
        <p>கேட்டுவிட்டீர்களா? நீங்களும் செய்யுளை ஒருமுறை வாசிக்க முயற்சி செய்யலாமல்லவா?</p>
      </div>
    </div>
  )
}

const Q10_CORRECT = [
  'குன்றும் மலையும் பலபின் ஒழிய',
  'வந்தனென் பரிசில் கொண்டனென் செலற்குஎன',
  'நின்ற என்நயந்து அருளி ஈதுகொண்டு',
  'ஈங்கனம் செல்க தான்என என்னை',
  'யாங்கறிந் தனனோ தாங்குஅரும் காவலன்',
  'காணாது ஈத்த இப்பொருட்கு யான்ஓர்',
  'வாணிகப் பரிசிலன் அல்லேன் பேணித்',
  'தினைஅனைத்து ஆயினும் இனிதுஅவர்',
  'துணைஅளவு அறிந்து நல்கினர் விடினே',
]

const Q10_SHUFFLED = [
  'துணைஅளவு அறிந்து நல்கினர் விடினே',
  'தினைஅனைத்து ஆயினும் இனிதுஅவர்',
  'நின்ற என்நயந்து அருளி ஈதுகொண்டு',
  'குன்றும் மலையும் பலபின் ஒழிய',
  'யாங்கறிந் தனனோ தாங்குஅரும் காவலன்',
  'ஈங்கனம் செல்க தான்என என்னை',
  'வந்தனென் பரிசில் கொண்டனென் செலற்குஎன',
  'வாணிகப் பரிசிலன் அல்லேன் பேணித்',
  'காணாது ஈத்த இப்பொருட்கு யான்ஓர்',
]

function Q10Content({ onNext, onCorrect }) {
  const [showOptions, setShowOptions] = useState(false)
  const [slots, setSlots] = useState(Array(9).fill(null))
  const [dragItem, setDragItem] = useState(null)
  const [dragOver, setDragOver] = useState(null)
  const [showSuccess, setShowSuccess] = useState(false)

  const placed = new Set(slots.filter(Boolean))
  const bankItems = Q10_SHUFFLED.filter(item => !placed.has(item))

  const handleDrop = (slotIndex) => {
    setDragOver(null)
    if (dragItem === null || slots[slotIndex] !== null) return
    if (dragItem === Q10_CORRECT[slotIndex]) {
      const newSlots = [...slots]
      newSlots[slotIndex] = dragItem
      setSlots(newSlots)
      if (newSlots.every((s, i) => s === Q10_CORRECT[i])) {
        setShowSuccess(true); onCorrect()
      }
    }
    setDragItem(null)
  }

  if (showOptions) {
    return (
      <div className="q4-options-page q10-drag-page">
        <div className="q10-slots">
          {slots.map((slot, i) => (
            <div
              key={i}
              className={`q10-slot${slot ? ' q10-slot-filled' : ''}${dragOver === i ? ' q10-slot-hover' : ''}`}
              onDragOver={e => { e.preventDefault(); setDragOver(i) }}
              onDragLeave={() => setDragOver(null)}
              onDrop={() => handleDrop(i)}
            >
              {slot}
            </div>
          ))}
        </div>
        <div className="q10-bank">
          {bankItems.map((item) => (
            <div
              key={item}
              className="q10-bank-item"
              draggable
              onDragStart={() => setDragItem(item)}
              onDragEnd={() => setDragItem(null)}
            >
              {item}
            </div>
          ))}
        </div>

        {showSuccess && (
          <div className="popup-overlay">
            <div className="popup-box">
              <div className="popup-header">சரியான பதில்</div>
              <div className="popup-body">
                <div className="popup-correct-content">
                  <svg viewBox="0 0 100 100" className="check-icon" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <linearGradient id="checkGrad10" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%"   stopColor="#66ee66" />
                        <stop offset="50%"  stopColor="#22bb22" />
                        <stop offset="100%" stopColor="#0d7a0d" />
                      </linearGradient>
                      <filter id="checkShadow10" x="-25%" y="-25%" width="150%" height="150%">
                        <feDropShadow dx="2" dy="3" stdDeviation="3" floodColor="#000" floodOpacity="0.45" />
                      </filter>
                    </defs>
                    <polyline points="10,54 38,82 90,16" stroke="url(#checkGrad10)"
                      strokeWidth="20" strokeLinecap="round" strokeLinejoin="round"
                      fill="none" filter="url(#checkShadow10)" />
                  </svg>
                  <p className="popup-success-text">வாழ்த்துகள், மேலே செல்க</p>
                </div>
                <div className="popup-footer">
                  <button className="popup-action-btn"
                    onClick={() => { setShowSuccess(false); onNext() }}>
                    அடுத்து
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="q2-wrap">
      <div className="q2-paadal">
        <p>
          குன்றும் மலையும் பலபின் ஒழிய<br />
          வந்தனென் பரிசில் கொண்டனென் செலற்குஎன<br />
          நின்ற என்நயந்து அருளி ஈதுகொண்டு<br />
          ஈங்கனம் செல்க தான்என என்னை<br />
          யாங்கறிந் தனனோ தாங்குஅரும் காவலன்<br />
          காணாது ஈத்த இப்பொருட்கு யான்ஓர்<br />
          வாணிகப் பரிசிலன் அல்லேன் பேணித்<br />
          தினைஅனைத்து ஆயினும் இனிதுஅவர்<br />
          துணைஅளவு அறிந்து நல்கினர் விடினே
        </p>
      </div>
      <div className="q2-divider">
        <div className="q2-media-controls">
          <button className="media-btn">◀</button>
          <button className="media-btn">▶</button>
          <button className="media-btn">⏸</button>
          <button className="media-btn">■</button>
        </div>
      </div>
      <div className="q2-question-area">
        <p className="q-recall">மீண்டும் ஒருமுறை இப்பாடலை மனத்திற்குள் வாசித்துக்கொள்ளுங்கள்</p>
        <p>பொழிப்புரை அடிப்படையில் கீழே கொடுக்கப்பட்டுள்ள அடிமாறி அமைந்த பாடலைச் சரியாக எடுத்து இடுக.</p>
        <div className="q4-btn-center">
          <button className="q4-click-btn" onClick={() => setShowOptions(true)}>
            இங்கே சொடுக்கவும்
          </button>
        </div>
      </div>
    </div>
  )
}

const Q9_OPTIONS = [
  `குன்றும் மலையும் பலபின் ஒழிய\nவந்தனென் பரிசில் கொண்டனென் செலற்குஎன\nநின்ற என்நயந்து அருளி ஈதுகொண்டு\nஈங்கனம் செல்க தான்என என்னை\nயாங்கறிந் தனனோ தாங்குஅரும் காவலன்\nகாணாது ஈத்த இப்பொருட்கு யான்ஓர்\nவாணிகப் பரிசிலன் அல்லேன் பேணித்\nதினைஅனைத்து ஆயினும் இனிதுஅவர்`,
  `குன்றும் மலையும் பலபின் ஒழிய\nவந்தனென் பரிசில் கொண்டனென் செலற்குஎன\nநின்ற என்நயந்து அருளி ஈதுகொண்டு\nயாங்கறிந் தனனோ தாங்குஅரும் காவலன்\nதுணைஅளவு அறிந்து நல்கினர் விடினே\nகாணாது ஈத்த இப்பொருட்கு யான்ஓர்\nஈங்கனம் செல்க தான்என என்னை\nவாணிகப் பரிசிலன் அல்லேன் பேணித்`,
]
const Q9_CORRECT = Q9_OPTIONS[0]

function Q9Content({ onNext, onCorrect }) {
  const [showOptions, setShowOptions] = useState(false)
  const [selected, setSelected]       = useState(null)
  const [showPopup, setShowPopup]     = useState(false)

  const handleSelect = (opt) => { setSelected(opt); setShowPopup(true); if (opt === Q9_CORRECT) onCorrect() }
  const isCorrect = selected === Q9_CORRECT

  if (showOptions) {
    return (
      <div className="q4-options-page">
        {Q9_OPTIONS.map((opt, i) => (
          <label key={i} className="q4-option-item" onClick={() => handleSelect(opt)}>
            <span className="q2-radio-dot q4-radio-dot" />
            <span className="q4-option-text">
              {opt.split('\\n').map((line, j) => <span key={j}>{line}<br /></span>)}
            </span>
          </label>
        ))}

        {showPopup && (
          <div className="popup-overlay">
            <div className="popup-box">
              <div className="popup-header">
                {isCorrect ? 'சரியான பதில்' : 'இது தவறு'}
              </div>
              <div className="popup-body">
                {isCorrect ? (
                  <>
                    <div className="popup-correct-content">
                      <svg viewBox="0 0 100 100" className="check-icon" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                          <linearGradient id="checkGrad9" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%"   stopColor="#66ee66" />
                            <stop offset="50%"  stopColor="#22bb22" />
                            <stop offset="100%" stopColor="#0d7a0d" />
                          </linearGradient>
                          <filter id="checkShadow9" x="-25%" y="-25%" width="150%" height="150%">
                            <feDropShadow dx="2" dy="3" stdDeviation="3" floodColor="#000" floodOpacity="0.45" />
                          </filter>
                        </defs>
                        <polyline points="10,54 38,82 90,16" stroke="url(#checkGrad9)"
                          strokeWidth="20" strokeLinecap="round" strokeLinejoin="round"
                          fill="none" filter="url(#checkShadow9)" />
                      </svg>
                      <p className="popup-success-text">வாழ்த்துகள், மேலே செல்க</p>
                    </div>
                    <div className="popup-footer">
                      <button className="popup-action-btn"
                        onClick={() => { setShowPopup(false); setSelected(null); onNext() }}>
                        அடுத்து
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="popup-wrong-content">
                      <svg viewBox="0 0 100 100" className="cross-icon" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                          <linearGradient id="xGrad9" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%"   stopColor="#ff6644" />
                            <stop offset="50%"  stopColor="#dd1100" />
                            <stop offset="100%" stopColor="#991000" />
                          </linearGradient>
                          <filter id="xShadow9" x="-25%" y="-25%" width="150%" height="150%">
                            <feDropShadow dx="2" dy="3" stdDeviation="3" floodColor="#000" floodOpacity="0.45" />
                          </filter>
                        </defs>
                        <line x1="16" y1="16" x2="84" y2="84" stroke="url(#xGrad9)"
                          strokeWidth="22" strokeLinecap="round" filter="url(#xShadow9)" />
                        <line x1="84" y1="16" x2="16" y2="84" stroke="url(#xGrad9)"
                          strokeWidth="22" strokeLinecap="round" filter="url(#xShadow9)" />
                      </svg>
                      <p>இனி நீங்கள் ஏன் அருஞ்சொற்பொருள் குமிழைப்
                      பயன்படுத்திச் சரியான பாடலடிகடையாளம்
                      காணக்கூடாது ? அருஞ்சொற்பொள் குமிழைத் தேர்வு செய்யுங்கள்.</p>
                    </div>
                    <div className="popup-footer">
                      <button className="popup-action-btn" onClick={() => setShowPopup(false)}>
                        செல்க
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="q2-wrap">
      <div className="q2-paadal">
        <p>
          குன்றும் மலையும் பலபின் ஒழிய<br />
          வந்தனென் பரிசில் கொண்டனென் செலற்குஎன<br />
          நின்ற என்நயந்து அருளி ஈதுகொண்டு<br />
          ஈங்கனம் செல்க தான்என என்னை<br />
          யாங்கறிந் தனனோ தாங்குஅரும் காவலன்<br />
          காணாது ஈத்த இப்பொருட்கு யான்ஓர்<br />
          வாணிகப் பரிசிலன் அல்லேன் பேணித்<br />
          தினைஅனைத்து ஆயினும் இனிதுஅவர்<br />
          துணைஅளவு அறிந்து நல்கினர் விடினே
        </p>
      </div>
      <div className="q2-divider">
        <div className="q2-media-controls">
          <button className="media-btn">◀</button>
          <button className="media-btn">▶</button>
          <button className="media-btn">⏸</button>
          <button className="media-btn">■</button>
        </div>
      </div>
      <div className="q2-question-area">
        <p className="q-recall">மீண்டும் ஒருமுறை இப்பாடலை மனத்திற்குள் வாசித்துக்கொள்ளுங்கள்</p>
        
        <p>கொடுக்கப்பட்டிருக்கும் பொழிப்புரைக்கு ஏற்ப பாடலடிகளை மாற்றினால் எது பொருத்தமானது என்பதைத் தெரிவு செய்யவும்.</p>
        <div className="q4-btn-center">
          <button className="q4-click-btn" onClick={() => setShowOptions(true)}>
            இங்கே சொடுக்கவும்
          </button>
        </div>
      </div>
    </div>
  )
}

const Q8_OPTIONS = [
  `காணாது ஈத்த இப்பொருட்கு யான்ஓர்\nதினையனைத் தாயினும் இனிதுஅவர்\nவாணிகப் பரிசிலன் அல்லேன் பேணித்`,
  `காணாது ஈத்த இப்பொருட்கு யான்ஓர்\nவாணிகப் பரிசிலன் அல்லேன் பேணித்\nதினைஅனைத்து ஆயினும் இனிதுஅவர்`,
  `காணாது ஈத்த இப்பொருட்கு யான்ஓர்\nவாணிகப் பரிசிலன் அல்லேன் பேணித்\nதினைஅனைத்து ஆயினும் இனிதுஅவர்`,
]
const Q8_CORRECT = Q8_OPTIONS[2]

function Q8Content({ onNext, onCorrect }) {
  const [selectedIdx, setSelectedIdx] = useState(null)
  const [showPopup, setShowPopup] = useState(false)

  const handleSelect = (i) => { setSelectedIdx(i); setShowPopup(true); if (i === 2) onCorrect() }
  const isCorrect = selectedIdx === 2

  return (
    <div className="q2-wrap">
      <div className="q2-paadal">
        <p>
          குன்றும் மலையும் பலபின் ஒழிய<br />
          வந்தனென் பரிசில் கொண்டனென் செலற்குஎன<br />
          நின்ற என்நயந்து அருளி ஈதுகொண்டு<br />
          ஈங்கனம் செல்க தான்என என்னை<br />
          யாங்கறிந் தனனோ தாங்குஅரும் காவலன்<br />
          காணாது ஈத்த இப்பொருட்கு யான்ஓர்<br />
          வாணிகப் பரிசிலன் அல்லேன் பேணித்<br />
          தினைஅனைத்து ஆயினும் இனிதுஅவர்<br />
          துணைஅளவு அறிந்து நல்கினர் விடினே
        </p>
      </div>
      <div className="q2-divider">
        <div className="q2-media-controls">
          <button className="media-btn">◀</button>
          <button className="media-btn">▶</button>
          <button className="media-btn">⏸</button>
          <button className="media-btn">■</button>
        </div>
      </div>
      <div className="q2-question-area">
        <p className="q-recall">மீண்டும் ஒருமுறை இப்பாடலை மனத்திற்குள் வாசித்துக்கொள்ளுங்கள்.</p>
        <p>சொல்வரிசை சிதையாமல் இப்பொருள் உணர்த்தும் பாடலடிகளைக் the கீழே கொடுக்கப்பட்டுள்ளவற்றிலிருந்து தெரிவு செய்க.</p>
        <div className="q5-paadal-snippet">
          <p>
            காணாமல் கொடுத்த இப்பரிசுப்பொருளுக்கு யான் ஓர் ஊதியமே<br />
            கருதும் பரிசிலன் இல்லை. விரும்பித் தகுதியளவு அறிந்து
          </p>
        </div>
        <div className="q2-options q3-options">
          {Q8_OPTIONS.map((opt, i) => (
            <label key={i} className="q2-option q3-option" onClick={() => handleSelect(i)}>
              <span className="q2-radio-dot" />
              {opt.split('\\n').map((line, j) => (
                <span key={j} style={{ display: 'block' }}>{line}</span>
              ))}
            </label>
          ))}
        </div>
      </div>

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-box">
            <div className="popup-header">
              {isCorrect ? 'சரியான பதில்' : 'இது தவறு'}
            </div>
            <div className="popup-body">
              {isCorrect ? (
                <>
                  <div className="popup-correct-content">
                    <svg viewBox="0 0 100 100" className="check-icon" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <linearGradient id="checkGrad8" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%"   stopColor="#66ee66" />
                          <stop offset="50%"  stopColor="#22bb22" />
                          <stop offset="100%" stopColor="#0d7a0d" />
                        </linearGradient>
                        <filter id="checkShadow8" x="-25%" y="-25%" width="150%" height="150%">
                          <feDropShadow dx="2" dy="3" stdDeviation="3" floodColor="#000" floodOpacity="0.45" />
                        </filter>
                      </defs>
                      <polyline points="10,54 38,82 90,16" stroke="url(#checkGrad8)"
                        strokeWidth="20" strokeLinecap="round" strokeLinejoin="round"
                        fill="none" filter="url(#checkShadow8)" />
                    </svg>
                    <p className="popup-success-text">வாழ்த்துகள், மேலே செல்க</p>
                  </div>
                  <div className="popup-footer">
                    <button className="popup-action-btn"
                      onClick={() => { setShowPopup(false); setSelectedIdx(null); onNext() }}>
                      அடுத்து
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="popup-wrong-content">
                    <svg viewBox="0 0 100 100" className="cross-icon" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <linearGradient id="xGrad8" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%"   stopColor="#ff6644" />
                          <stop offset="50%"  stopColor="#dd1100" />
                          <stop offset="100%" stopColor="#991000" />
                        </linearGradient>
                        <filter id="xShadow8" x="-25%" y="-25%" width="150%" height="150%">
                          <feDropShadow dx="2" dy="3" stdDeviation="3" floodColor="#000" floodOpacity="0.45" />
                        </filter>
                      </defs>
                      <line x1="16" y1="16" x2="84" y2="84" stroke="url(#xGrad8)"
                        strokeWidth="22" strokeLinecap="round" filter="url(#xShadow8)" />
                      <line x1="84" y1="16" x2="16" y2="84" stroke="url(#xGrad8)"
                        strokeWidth="22" strokeLinecap="round" filter="url(#xShadow8)" />
                    </svg>
                    <p>இனி நீங்கள் ஏன் அருஞ்சொற்பொருள் குமிழைப்
                    பயன்படுத்திச் சரியான பாடலடிகடையாளம்
                    காணக்கூடாது ? அருஞ்சொற்பொள் குமிழைத் தேர்வு செய்யுங்கள்.</p>
                  </div>
                  <div className="popup-footer">
                    <button className="popup-action-btn" onClick={() => setShowPopup(false)}>
                      செல்க
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

const Q7_OPTIONS = [
  `குன்றும் மலையும் பலபின் ஒழிய\nவந்தனென் பரிசில் கொண்டனென் செலற்குஎன\nநின்ற என்நயந்து அருளி ஈதுகொண்டு\nஈங்கனம் செல்க தான்என என்னை`,
  `குன்றும் மலையும் பலபின் ஒழிய\nகொண்டனென் பரிசில் வந்தனென் செலற்குஎன\nநின்ற என்நயந்து அருளி ஈதுகொண்டு\nஈங்கனம் செல்க தான்என என்னை`,
  `குன்றும் மலையும் பலபின் ஒழிய\nவந்தனென் பரிசில் கொண்டனென் செலற்குஎன\nநின்ற என்நயந்து அருளி ஈங்கனம் செல்க\nஈதுகொண்டு தான்என என்னை`,
]
const Q7_CORRECT = Q7_OPTIONS[0]

function Q7Content({ onNext, onCorrect }) {
  const [showOptions, setShowOptions] = useState(false)
  const [selected, setSelected]       = useState(null)
  const [showPopup, setShowPopup]     = useState(false)

  const handleSelect = (opt) => { setSelected(opt); setShowPopup(true); if (opt === Q7_CORRECT) onCorrect() }
  const isCorrect = selected === Q7_CORRECT

  if (showOptions) {
    return (
      <div className="q4-options-page">
        {Q7_OPTIONS.map((opt, i) => (
          <label key={i} className="q4-option-item" onClick={() => handleSelect(opt)}>
            <span className="q2-radio-dot q4-radio-dot" />
            <span className="q4-option-text">
              {opt.split('\\n').map((line, j) => <span key={j}>{line}<br /></span>)}
            </span>
          </label>
        ))}

        {showPopup && (
          <div className="popup-overlay">
            <div className="popup-box">
              <div className="popup-header">
                {isCorrect ? 'சரியான பதில்' : 'இது தவறு'}
              </div>
              <div className="popup-body">
                {isCorrect ? (
                  <>
                    <div className="popup-correct-content">
                      <svg viewBox="0 0 100 100" className="check-icon" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                          <linearGradient id="checkGrad7" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%"   stopColor="#66ee66" />
                            <stop offset="50%"  stopColor="#22bb22" />
                            <stop offset="100%" stopColor="#0d7a0d" />
                          </linearGradient>
                          <filter id="checkShadow7" x="-25%" y="-25%" width="150%" height="150%">
                            <feDropShadow dx="2" dy="3" stdDeviation="3" floodColor="#000" floodOpacity="0.45" />
                          </filter>
                        </defs>
                        <polyline points="10,54 38,82 90,16" stroke="url(#checkGrad7)"
                          strokeWidth="20" strokeLinecap="round" strokeLinejoin="round"
                          fill="none" filter="url(#checkShadow7)" />
                      </svg>
                      <p className="popup-success-text">வாழ்த்துகள், மேலே செல்க</p>
                    </div>
                    <div className="popup-footer">
                      <button className="popup-action-btn"
                        onClick={() => { setShowPopup(false); setSelected(null); onNext() }}>
                        அடுத்து
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="popup-wrong-content">
                      <svg viewBox="0 0 100 100" className="cross-icon" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                          <linearGradient id="xGrad7" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%"   stopColor="#ff6644" />
                            <stop offset="50%"  stopColor="#dd1100" />
                            <stop offset="100%" stopColor="#991000" />
                          </linearGradient>
                          <filter id="xShadow7" x="-25%" y="-25%" width="150%" height="150%">
                            <feDropShadow dx="2" dy="3" stdDeviation="3" floodColor="#000" floodOpacity="0.45" />
                          </filter>
                        </defs>
                        <line x1="16" y1="16" x2="84" y2="84" stroke="url(#xGrad7)"
                          strokeWidth="22" strokeLinecap="round" filter="url(#xShadow7)" />
                        <line x1="84" y1="16" x2="16" y2="84" stroke="url(#xGrad7)"
                          strokeWidth="22" strokeLinecap="round" filter="url(#xShadow7)" />
                      </svg>
                      <p>இனி நீங்கள் ஏன் அருஞ்சொற்பொருள் குமிழைப்
                      பயன்படுத்திச் சரியான பாடலடிகடையாளம்
                      காணக்கூடாது ? அருஞ்சொற்பொள் குமிழைத் தேர்வு செய்யுங்கள்.</p>
                    </div>
                    <div className="popup-footer">
                      <button className="popup-action-btn" onClick={() => setShowPopup(false)}>
                        செல்க
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="q2-wrap">
      <div className="q2-paadal">
        <p>
          குன்றும் மலையும் பலபின் ஒழிய<br />
          வந்தனென் பரிசில் கொண்டனென் செலற்குஎன<br />
          நின்ற என்நயந்து அருளி ஈதுகொண்டு<br />
          ஈங்கனம் செல்க தான்என என்னை<br />
          யாங்கறிந் தனனோ தாங்குஅரும் காவலன்<br />
          காணாது ஈத்த இப்பொருட்கு யான்ஓர்<br />
          வாணிகப் பரிசிலன் அல்லேன் பேணித்<br />
          தினைஅனைத்து ஆயினும் இனிதுஅவர்<br />
          துணைஅளவு அறிந்து நல்கினர் விடினே
        </p>
      </div>
      <div className="q2-divider">
        <div className="q2-media-controls">
          <button className="media-btn">◀</button>
          <button className="media-btn">▶</button>
          <button className="media-btn">⏸</button>
          <button className="media-btn">■</button>
        </div>
      </div>
      <div className="q2-question-area">
        <p className="q-recall">மீண்டும் ஒருமுறை இப்பாடலை மனத்திற்குள் வாசித்துக்கொள்ளுங்கள்</p>
        <p>சொல்வரிசை சிதையாமல் இப்பொருள் உணர்த்தும் பாடலடிகளைக்
கீழே கொடுக்கப்பட்டுள்ளவற்றிலிருந்து தெரிவு செய்க.</p>
        <div className="q5-paadal-snippet">
          <p>
            குன்றும் மலையும் பல பின்னே பிற்படுமாறு வந்தனன் பரிசில்<br />
            கொண்டு செல்வதற்கு என நின்ற என்னை அன்புற்று அருளி<br />
            இப்பொருளைக் கொண்டு இவ்வாறு செல்க எனக் கூற என்<br />
            தகுதியை எங்ஙனம் அறிந்தனன் தடுத்தற்கரிய வேந்தன்
          </p>
        </div>
        <div className="q4-btn-center q5-btn-push">
          <button className="q4-click-btn" onClick={() => setShowOptions(true)}>
            இங்கே சொடுக்கவும்
          </button>
        </div>
      </div>
    </div>
  )
}

const Q6_OPTIONS = [
  `காணாமல் கொடுத்த இப்பரிசுப்பொருளுக்கு யான் ஓர் ஊதியமே\nகருதும் பரிசிலன் இல்லை. போற்றித் தகுதியளவு அறிந்து`,
  `காணாமல் கொடுத்த இப்பரிசுப்பொருளுக்கு யான் ஓர் ஊதியமே\nகருதும் பரிசிலன் இல்லை. விரும்பித் தகுதியளவு அறிந்து`,
  `காணாமல் கொடுத்த இப்பரிசுப்பொருளுக்கு யான் ஓர் ஊதியமே\nகருதும் பரிசிலன் இல்லை. விரும்பி ஒப்பு அறிந்து அளித்துவிடின்`,
]
const Q6_CORRECT = Q6_OPTIONS[1]

function Q6Content({ onNext, onCorrect }) {
  const [selected, setSelected] = useState(null)
  const [showPopup, setShowPopup] = useState(false)

  const handleSelect = (opt) => { setSelected(opt); setShowPopup(true); if (opt === Q6_CORRECT) onCorrect() }
  const isCorrect = selected === Q6_CORRECT

  return (
    <div className="q2-wrap">
      <div className="q2-paadal">
        <p>
          குன்றும் மலையும் பலபின் ஒழிய<br />
          வந்தனென் பரிசில் கொண்டனென் செலற்குஎன<br />
          நின்ற என்நயந்து அருளி ஈதுகொண்டு<br />
          ஈங்கனம் செல்க தான்என என்னை<br />
          யாங்கறிந் தனனோ தாங்குஅரும் காவலன்<br />
          காணாது ஈத்த இப்பொருட்கு யான்ஓர்<br />
          வாணிகப் பரிசிலன் அல்லேன் பேணித்<br />
          தினைஅனைத்து ஆயினும் இனிதுஅவர்<br />
          துணைஅளவு அறிந்து நல்கினர் விடினே
        </p>
      </div>
      <div className="q2-divider">
        <div className="q2-media-controls">
          <button className="media-btn">◀</button>
          <button className="media-btn">▶</button>
          <button className="media-btn">⏸</button>
          <button className="media-btn">■</button>
        </div>
      </div>
      <div className="q2-question-area">
        <p className="q-recall">மீண்டும் ஒருமுறை இப்பாடலை மனத்திற்குள் வாசித்துக்கொள்ளுங்கள்.</p>
        
        <p>இப் பாடல் பகுதியின் நேர்ப்பொருளைத் தெரிவு செய்யுங்கள்.</p>
        <div className="q5-paadal-snippet">
          <p>
            காணாது ஈத்த இப்பொருட்கு யான்ஓர்<br />
            வாணிகப் பரிசிலன் அல்லேன் பேணித்<br />
            தினைஅனைத்து ஆயினும் இனிதுஅவர்
          </p>
        </div>

        <div className="q2-options q3-options">
          {Q6_OPTIONS.map((opt) => (
            <label key={opt} className="q2-option q3-option" onClick={() => handleSelect(opt)}>
              <span className="q2-radio-dot" />
              {opt.split('\\n').map((line, j) => (
                <span key={j} style={{ display: 'block' }}>{line}</span>
              ))}
            </label>
          ))}
        </div>
      </div>

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-box">
            <div className="popup-header">
              {isCorrect ? 'சரியான பதில்' : 'இது தவறு'}
            </div>
            <div className="popup-body">
              {isCorrect ? (
                <>
                  <div className="popup-correct-content">
                    <svg viewBox="0 0 100 100" className="check-icon" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <linearGradient id="checkGrad6" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%"   stopColor="#66ee66" />
                          <stop offset="50%"  stopColor="#22bb22" />
                          <stop offset="100%" stopColor="#0d7a0d" />
                        </linearGradient>
                        <filter id="checkShadow6" x="-25%" y="-25%" width="150%" height="150%">
                          <feDropShadow dx="2" dy="3" stdDeviation="3" floodColor="#000" floodOpacity="0.45" />
                        </filter>
                      </defs>
                      <polyline points="10,54 38,82 90,16" stroke="url(#checkGrad6)"
                        strokeWidth="20" strokeLinecap="round" strokeLinejoin="round"
                        fill="none" filter="url(#checkShadow6)" />
                    </svg>
                    <p className="popup-success-text">வாழ்த்துகள், மேலே செல்க</p>
                  </div>
                  <div className="popup-footer">
                    <button className="popup-action-btn"
                      onClick={() => { setShowPopup(false); setSelected(null); onNext() }}>
                      அடுத்து
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="popup-wrong-content">
                    <svg viewBox="0 0 100 100" className="cross-icon" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <linearGradient id="xGrad6" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%"   stopColor="#ff6644" />
                          <stop offset="50%"  stopColor="#dd1100" />
                          <stop offset="100%" stopColor="#991000" />
                        </linearGradient>
                        <filter id="xShadow6" x="-25%" y="-25%" width="150%" height="150%">
                          <feDropShadow dx="2" dy="3" stdDeviation="3" floodColor="#000" floodOpacity="0.45" />
                        </filter>
                      </defs>
                      <line x1="16" y1="16" x2="84" y2="84" stroke="url(#xGrad6)"
                        strokeWidth="22" strokeLinecap="round" filter="url(#xShadow6)" />
                      <line x1="84" y1="16" x2="16" y2="84" stroke="url(#xGrad6)"
                        strokeWidth="22" strokeLinecap="round" filter="url(#xShadow6)" />
                    </svg>
                    <p>இனி நீங்கள் ஏன் அருஞ்சொற்பொருள் குமிழைப்
                    பயன்படுத்திச் சரியான பாடலடிகடையாளம்
                    காணக்கூடாது ? அருஞ்சொற்பொள் குமிழைத் தேர்வு செய்யுங்கள்.</p>
                  </div>
                  <div className="popup-footer">
                    <button className="popup-action-btn" onClick={() => setShowPopup(false)}>
                      செல்க
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

const Q5_OPTIONS = [
  `குன்றும் மலையும் பல பின்னே பிற்படுமாறு வந்தனன் பரிசில் கொண்டு\nசெல்வதற்கு என நின்ற என்னை அன்புற்று அருளி இப்பொருளைக்\nகொண்டு இவ்வாறு செல்க எனக் கூற என் தகுதியை எங்ஙனம்`,
  `குன்றும் மலையும் பல கெடுமாறு வந்தனன் பரிசில் கொண்டு\nசெல்வதற்கு என நின்ற என்னை அன்புற்று அருளி இப்பொருளைக்\nகொண்டு இவ்வாறு செல்க எனக் கூற என் தகுதியை எங்ஙனம்`,
  `குன்றும் மலையும் பல பின்னே பிற்படுமாறு வந்தனன் பரிசில்\nகொண்டு செல்வதற்கு என நின்ற என்னை அன்புற்று அருளி\nஇப்பொருளைக் கொண்டு இவ்வாறு செல்க எனக் கூற என்`,
]
const Q5_CORRECT = Q5_OPTIONS[2]

function Q5Content({ onNext, onCorrect }) {
  const [showOptions, setShowOptions] = useState(false)
  const [selected, setSelected]       = useState(null)
  const [showPopup, setShowPopup]     = useState(false)

  const handleSelect = (opt) => { setSelected(opt); setShowPopup(true); if (opt === Q5_CORRECT) onCorrect() }
  const isCorrect = selected === Q5_CORRECT

  if (showOptions) {
    return (
      <div className="q4-options-page">
        {Q5_OPTIONS.map((opt, i) => (
          <label key={i} className="q4-option-item" onClick={() => handleSelect(opt)}>
            <span className="q2-radio-dot q4-radio-dot" />
            <span className="q4-option-text">
              {opt.split('\\n').map((line, j) => <span key={j}>{line}<br /></span>)}
            </span>
          </label>
        ))}

        {showPopup && (
          <div className="popup-overlay">
            <div className="popup-box">
              <div className="popup-header">
                {isCorrect ? 'சரியான பதில்' : 'இது தவறு'}
              </div>
              <div className="popup-body">
                {isCorrect ? (
                  <>
                    <div className="popup-correct-content">
                      <svg viewBox="0 0 100 100" className="check-icon" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                          <linearGradient id="checkGrad5" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%"   stopColor="#66ee66" />
                            <stop offset="50%"  stopColor="#22bb22" />
                            <stop offset="100%" stopColor="#0d7a0d" />
                          </linearGradient>
                          <filter id="checkShadow5" x="-25%" y="-25%" width="150%" height="150%">
                            <feDropShadow dx="2" dy="3" stdDeviation="3" floodColor="#000" floodOpacity="0.45" />
                          </filter>
                        </defs>
                        <polyline points="10,54 38,82 90,16" stroke="url(#checkGrad5)"
                          strokeWidth="20" strokeLinecap="round" strokeLinejoin="round"
                          fill="none" filter="url(#checkShadow5)" />
                      </svg>
                      <p className="popup-success-text">வாழ்த்துகள், மேலே செல்க</p>
                    </div>
                    <div className="popup-footer">
                      <button className="popup-action-btn"
                        onClick={() => { setShowPopup(false); setSelected(null); onNext() }}>
                        அடுத்து
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="popup-wrong-content">
                      <svg viewBox="0 0 100 100" className="cross-icon" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                          <linearGradient id="xGrad5" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%"   stopColor="#ff6644" />
                            <stop offset="50%"  stopColor="#dd1100" />
                            <stop offset="100%" stopColor="#991000" />
                          </linearGradient>
                          <filter id="xShadow5" x="-25%" y="-25%" width="150%" height="150%">
                            <feDropShadow dx="2" dy="3" stdDeviation="3" floodColor="#000" floodOpacity="0.45" />
                          </filter>
                        </defs>
                        <line x1="16" y1="16" x2="84" y2="84" stroke="url(#xGrad5)"
                          strokeWidth="22" strokeLinecap="round" filter="url(#xShadow5)" />
                        <line x1="84" y1="16" x2="16" y2="84" stroke="url(#xGrad5)"
                          strokeWidth="22" strokeLinecap="round" filter="url(#xShadow5)" />
                      </svg>
                      <p>இனி நீங்கள் ஏன் அருஞ்சொற்பொருள் குமிழைப்
                      பயன்படுத்திச் சரியான பாடலடிகடையாளம்
                      காணக்கூடாது ? அருஞ்சொற்பொள் குமிழைத் தேர்வு செய்யுங்கள்.</p>
                    </div>
                    <div className="popup-footer">
                      <button className="popup-action-btn" onClick={() => setShowPopup(false)}>
                        செல்க
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="q2-wrap">
      <div className="q2-paadal">
        <p>
          குன்றும் மலையும் பலபின் ஒழிய<br />
          வந்தனென் பரிசில் கொண்டனென் செலற்குஎன<br />
          நின்ற என்நயந்து அருளி ஈதுகொண்டு<br />
          ஈங்கனம் செல்க தான்என என்னை<br />
          யாங்கறிந் தனனோ தாங்குஅரும் காவலன்<br />
          காணாது ஈத்த இப்பொருட்கு யான்ஓர்<br />
          வாணிகப் பரிசிலன் அல்லேன் பேணித்<br />
          தினைஅனைத்து ஆயினும் இனிதுஅவர்<br />
          துணைஅளவு அறிந்து நல்கினர் விடினே
        </p>
      </div>
      <div className="q2-divider">
        <div className="q2-media-controls">
          <button className="media-btn">◀</button>
          <button className="media-btn">▶</button>
          <button className="media-btn">⏸</button>
          <button className="media-btn">■</button>
        </div>
      </div>
      <div className="q2-question-area">
        <p className="q-recall">மீண்டும் ஒருமுறை இப்பாடலை மனத்திற்குள் வாசித்துக்கொள்ளுங்கள்</p>
        <p>இப் பாடல் பகுதியின் நேர்ப்பொருளைத் தெரிவு செய்யுங்கள்.</p>
        <div className="q5-paadal-snippet">
          <p>
            குன்றும் மலையும் பலபின் ஒழிய<br />
            வந்தனென் பரிசில் கொண்டனென் செலற்குஎன<br />
            நின்ற என்நயந்து அருளி ஈதுகொண்டு<br />
            ஈங்கனம் செல்க தான்என என்னை<br />
            யாங்கறிந் தனனோ தாங்குஅரும் காவலன்
          </p>
        </div>
        <div className="q4-btn-center q5-btn-push">
          <button className="q4-click-btn" onClick={() => setShowOptions(true)}>
            இங்கே சொடுக்கவும்
          </button>
        </div>
      </div>
    </div>
  )
}

const Q4_OPTIONS = [
  `குன்றும் மலையும் பின்னே செல்லுமாறு பரிசில் பெறவந்தேன் என\nநின்ற எனக்கு, இப்பொருளைக் கொண்டு செல்க எனக் கூற, என்\nதகுதியை எங்ஙனம் அறிந்தனன் வேந்தன். காணாமல் கொடுத்த\nபரிசிற்கு யான் ஓர் ஊதியம் கருதும் பரிசிலன் அன்று. விரும்பித்`,
  `குன்றும் மலையும் பின்னே செல்லுமாறு பரிசில் பெறவந்தேன் என\nநின்ற எனக்கு, இப்பொருளைக் கொண்டு செல்க எனக் கூற, என்\nதகுதியை எங்ஙனம் அறிந்தனன் வேந்தன். காணாமல் கொடுத்த\nபரிசிற்கு யான் ஓர் ஊதியம் கருதும் பரிசிலன் அன்று. துணையளவு`,
  `குன்றும் மலையும் பல பின்னே செல்லுமாறு பரிசில் பெறவந்தேன்\nென நின்ற எனக்கு, இந்தப் பொருளைக் கொண்டு செல்க எனக் கூற,\nென் தகுதியை எங்ஙனம் அறிந்தனன் வேந்தன். காணாமல் கொடுத்த\nபரிசிற்கு யான் ஓர் ஊதியம் கருதும் பரிசிலன் அன்று. விரும்பி\nதினையளவு தகுதியறிந்து அளித்திடின் பெறுகுவன் இனிது.`,
]
const Q4_CORRECT = Q4_OPTIONS[0]

function Q4Content({ onNext, onCorrect }) {
  const [showOptions, setShowOptions] = useState(false)
  const [selected, setSelected]       = useState(null)
  const [showPopup, setShowPopup]     = useState(false)

  const handleSelect = (opt) => { setSelected(opt); setShowPopup(true); if (opt === Q4_CORRECT) onCorrect() }
  const isCorrect = selected === Q4_CORRECT

  if (showOptions) {
    return (
      <div className="q4-options-page">
        {Q4_OPTIONS.map((opt, i) => (
          <label key={i} className="q4-option-item" onClick={() => handleSelect(opt)}>
            <span className="q2-radio-dot q4-radio-dot" />
            <span className="q4-option-text">{opt.split('\\n').map((line, j) => (
              <span key={j}>{line}<br /></span>
            ))}</span>
          </label>
        ))}

        {showPopup && (
          <div className="popup-overlay">
            <div className="popup-box">
              <div className="popup-header">
                {isCorrect ? 'சரியான பதில்' : 'இது தவறு'}
              </div>
              <div className="popup-body">
                {isCorrect ? (
                  <>
                    <div className="popup-correct-content">
                      <svg viewBox="0 0 100 100" className="check-icon" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                          <linearGradient id="checkGrad4" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%"   stopColor="#66ee66" />
                            <stop offset="50%"  stopColor="#22bb22" />
                            <stop offset="100%" stopColor="#0d7a0d" />
                          </linearGradient>
                          <filter id="checkShadow4" x="-25%" y="-25%" width="150%" height="150%">
                            <feDropShadow dx="2" dy="3" stdDeviation="3" floodColor="#000" floodOpacity="0.45" />
                          </filter>
                        </defs>
                        <polyline points="10,54 38,82 90,16" stroke="url(#checkGrad4)"
                          strokeWidth="20" strokeLinecap="round" strokeLinejoin="round"
                          fill="none" filter="url(#checkShadow4)" />
                      </svg>
                      <p className="popup-success-text">வாழ்த்துகள், மேலே செல்க</p>
                    </div>
                    <div className="popup-footer">
                      <button className="popup-action-btn"
                        onClick={() => { setShowPopup(false); setSelected(null); onNext() }}>
                        அடுத்து
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="popup-wrong-content">
                      <svg viewBox="0 0 100 100" className="cross-icon" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                          <linearGradient id="xGrad4" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%"   stopColor="#ff6644" />
                            <stop offset="50%"  stopColor="#dd1100" />
                            <stop offset="100%" stopColor="#991000" />
                          </linearGradient>
                          <filter id="xShadow4" x="-25%" y="-25%" width="150%" height="150%">
                            <feDropShadow dx="2" dy="3" stdDeviation="3" floodColor="#000" floodOpacity="0.45" />
                          </filter>
                        </defs>
                        <line x1="16" y1="16" x2="84" y2="84" stroke="url(#xGrad4)"
                          strokeWidth="22" strokeLinecap="round" filter="url(#xShadow4)" />
                        <line x1="84" y1="16" x2="16" y2="84" stroke="url(#xGrad4)"
                          strokeWidth="22" strokeLinecap="round" filter="url(#xShadow4)" />
                      </svg>
                      <p>இனி நீங்கள் ஏன் அருஞ்சொற்பொருள் குமிழைப்
                      பயன்படுத்திச் சரியான பாடலடிகடையாளம்
                      காணக்கூடாது ? அருஞ்சொற்பொள் குமிழைத் தேர்வு செய்யுங்கள்.</p>
                    </div>
                    <div className="popup-footer">
                      <button className="popup-action-btn" onClick={() => setShowPopup(false)}>
                        செல்க
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="q2-wrap">
      <div className="q2-paadal">
        <p>
          குன்றும் மலையும் பலபின் ஒழிய<br />
          வந்தனென் பரிசில் கொண்டனென் செலற்குஎன<br />
          நின்ற என்நயந்து அருளி ஈதுகொண்டு<br />
          ஈங்கனம் செல்க தான்என என்னை<br />
          யாங்கறிந் தனனோ தாங்குஅரும் காவலன்<br />
          காணாது ஈத்த இப்பொருட்கு யான்ஓர்<br />
          வாணிகப் பரிசிலன் அல்லேன் பேணித்<br />
          தினைஅனைத்து ஆயினும் இனிதுஅவர்<br />
          துணைஅளவு அறிந்து நல்கினர் விடினே
        </p>
      </div>
      <div className="q2-divider">
        <div className="q2-media-controls">
          <button className="media-btn">◀</button>
          <button className="media-btn">▶</button>
          <button className="media-btn">⏸</button>
          <button className="media-btn">■</button>
        </div>
      </div>
      <div className="q2-question-area">
        <p className="q-recall">மீண்டும் ஒருமுறை இப்பாடலை மனத்திற்குள் வாசித்துக்கொள்ளுங்கள்</p>
        <p>இப்பாடலைப் புரிந்துகொண்டீர்களா?</p>
        <p>இப்பாடலின் திரண்ட கருத்து கீழே கொடுக்கப்பட்டுள்ளனவற்றுள்
          எது எனக் கருதுகிறீர்கள்? பொருத்தமான கருத்தைத் தெரிவு</p>
        <div className="q4-btn-center">
          <button className="q4-click-btn" onClick={() => setShowOptions(true)}>
            இங்கே சொடுக்கவும்
          </button>
        </div>
      </div>
    </div>
  )
}

const Q3_OPTIONS = [
  'தகுதியறிந்தும் காணாது தந்த பரிசில் வேண்டாமெனக் கூறுதல்',
  'தகுதியறிந்து கண்டு பரிசில் தருதல் வேண்டுமெனக் கூறுதல்',
  'தகுதியறிந்து தினைத்துணையாயினும் பரிசில் தருதல் நலம் எனக்',
]
const Q3_CORRECT = Q3_OPTIONS[1]

function Q3Content({ onNext, onCorrect }) {
  const [selected, setSelected] = useState(null)
  const [showPopup, setShowPopup] = useState(false)

  const handleSelect = (option) => {
    setSelected(option)
    setShowPopup(true)
    if (option === Q3_CORRECT) onCorrect()
  }

  const isCorrect = selected === Q3_CORRECT

  return (
    <div className="q2-wrap">
      {/* Paadal */}
      <div className="q2-paadal">
        <p>
          குன்றும் மலையும் பலபின் ஒழிய<br />
          வந்தனென் பரிசில் கொண்டனென் செலற்குஎன<br />
          நின்ற என்நயந்து அருளி ஈதுகொண்டு<br />
          ஈங்கனம் செல்க தான்என என்னை<br />
          யாங்கறிந் தனனோ தாங்குஅரும் காவலன்<br />
          காணாது ஈத்த இப்பொருட்கு யான்ஓர்<br />
          வாணிகப் பரிசிலன் அல்லேன் பேணித்<br />
          தினைஅனைத்து ஆயினும் இனிதுஅவர்<br />
          துணைஅளவு அறிந்து நல்கினர் விடினே
        </p>
      </div>

      {/* Divider */}
      <div className="q2-divider">
        <div className="q2-media-controls">
          <button className="media-btn">◀</button>
          <button className="media-btn">▶</button>
          <button className="media-btn">⏸</button>
          <button className="media-btn">■</button>
        </div>
      </div>

      {/* Question + options */}
      <div className="q2-question-area">
        <p>இப்புறநானூற்றுப் பாடலைக் கவனமாகக் கேளுங்கள்.</p>
        <p>இப்பாடலைப் புரிந்துகொண்டீர்களா?</p>
        <p>இப்பாடலின் மையக்கருத்து கீழே கொடுக்கப்பட்டுள்ளனவற்றுள் எது
          எனக் கருதுகிறீர்கள்? பொருத்தமான கருத்தைத் தெரிவு செய்யுங்கள்.</p>

        <div className="q2-options q3-options">
          {Q3_OPTIONS.map((opt) => (
            <label key={opt} className="q2-option q3-option" onClick={() => handleSelect(opt)}>
              <span className="q2-radio-dot" />
              {opt}
            </label>
          ))}
        </div>
      </div>

      {/* Popup */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-box">
            <div className="popup-header">
              {isCorrect ? 'சரியான பதில்' : 'இது தவறு'}
            </div>
            <div className="popup-body">
              {isCorrect ? (
                <>
                  <div className="popup-correct-content">
                    <svg viewBox="0 0 100 100" className="check-icon" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <linearGradient id="checkGrad3" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%"   stopColor="#66ee66" />
                          <stop offset="50%"  stopColor="#22bb22" />
                          <stop offset="100%" stopColor="#0d7a0d" />
                        </linearGradient>
                        <filter id="checkShadow3" x="-25%" y="-25%" width="150%" height="150%">
                          <feDropShadow dx="2" dy="3" stdDeviation="3" floodColor="#000" floodOpacity="0.45" />
                        </filter>
                      </defs>
                      <polyline points="10,54 38,82 90,16" stroke="url(#checkGrad3)"
                        strokeWidth="20" strokeLinecap="round" strokeLinejoin="round"
                        fill="none" filter="url(#checkShadow3)" />
                    </svg>
                    <p className="popup-success-text">வாழ்த்துகள், மேலே செல்க</p>
                  </div>
                  <div className="popup-footer">
                    <button className="popup-action-btn"
                      onClick={() => { setShowPopup(false); setSelected(null); onNext() }}>
                      அடுத்து
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="popup-wrong-content">
                    <svg viewBox="0 0 100 100" className="cross-icon" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <linearGradient id="xGrad3" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%"   stopColor="#ff6644" />
                          <stop offset="50%"  stopColor="#dd1100" />
                          <stop offset="100%" stopColor="#991000" />
                        </linearGradient>
                        <filter id="xShadow3" x="-25%" y="-25%" width="150%" height="150%">
                          <feDropShadow dx="2" dy="3" stdDeviation="3" floodColor="#000" floodOpacity="0.45" />
                        </filter>
                      </defs>
                      <line x1="16" y1="16" x2="84" y2="84" stroke="url(#xGrad3)"
                        strokeWidth="22" strokeLinecap="round" filter="url(#xShadow3)" />
                      <line x1="84" y1="16" x2="16" y2="84" stroke="url(#xGrad3)"
                        strokeWidth="22" strokeLinecap="round" filter="url(#xShadow3)" />
                    </svg>
                    <p>இனி நீங்கள் ஏன் அருஞ்சொற்பொருள் குமிழைப்
                    பயன்படுத்திச் சரியான பாடலடிகடையாளம்
                    காணக்கூடாது ? அருஞ்சொற்பொள் குமிழைத் தேர்வு செய்யுங்கள்.</p>
                  </div>
                  <div className="popup-footer">
                    <button className="popup-action-btn" onClick={() => setShowPopup(false)}>
                      செல்க
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

const LEFT_BUTTONS = [
  'கொண்டுகூட்டு',
  'அருஞ்சொற்பொருள்‌',
  'பதவுரை',
  'பொழிப்புரை',
  'எழுத்துப்‌பெயர்ப்பு',
  'மொழிபெயர்ப்பு',
  'திணை',
  'துறை',
  'பாடலாசிரியர்‌',
  'நூற்பெயர்‌',
]

const RIGHT_CONTENT = {
  'கொண்டுகூட்டு': (
    <div>
      <p>குன்றும் மலையும் பலபின் ஒழிய வந்தனென் பரிசில் கொண்டனென் செலற்குஎன நின்ற என்நயந்து அருளி ஈதுகொண்டு ஈங்கனம் செல்க தான்என என்னை யாங்கறிந் தனனோ, தாங்குஅரும் காவலன் காணாது ஈத்த இப்பொருட்கு யான்ஓர் வாணிகப் பரிசிலன் அல்லேன் பேணித் தினை அனைத்து ஆயினும் அவர் துணைஅளவு அறிந்து நல்கினர் விடின் இனிது.</p>
    </div>
  ),
  'அருஞ்சொற்பொருள்‌': (
    <div>
      <p>நயந்து - அன்புற்று <br/>
    தாங்கரும் - தடுத்தற்கரிய<br/>
துணை - தகுதி<br/>
காவலன் - வேந்தன்<br/>
பேணி - விரும்பி<br/>

</p>
    </div>
  ),
  'பதவுரை': (
    <div>
      <p>குன்றும் மலையும் பலபின் ஒழி
ய
- சிறிய குன்றும் பெரு மலையு
ம்
பல பின்னே பிற்பட;
வந்தனென் பரிசில்
கொண்டனென் செலற்கு
- வந்தேன் யான் பரிசில்
கொண்டவனாய்ப் போவதற்கு;
எனநின்ற என்னயந் தருளி -
எனச் சொல்லிநின்ற என்னை
அன்புற்று அருளி ; ஈதுகொண்டு
ஈங்கனம் செல்க தான்என -
இப்பொருளைக் கொண்டு
இவ்வாறு செல்க எனக் கூற;
யாங்கறிந் தனனோ,
தாங்குஅரும் காவலன் - என்
தகுதியை எங்ஙனம்
அறிந்தனன் தடுத்தற்கு அரிய
வேந்தன்; காணாது ஈத்த
இப்பொருட்கு - காணாமல்
கொடுத்த இப்பரிசுப்பொருளுக்கு;
யானோர் வாணிகப் பரிசிலன்
அல்லேன் - யான் ஓர் ஊதியமே
கருதும் பரிசிலன் இல்லை;
பேணித் தினையனைத்
தாயினும் இனிது - விரும்பித்
தினையளவு தரினும்
அது இனியது அவரது; அவர்
துணையள வறிந்து நல்கினர்
விடினே - அவருடைய
தகுதியளவு அறிந்து பரிசினை
அளிப்பின்.</p>
    </div>
  ),
  'பொழிப்புரை': (
    <div>
      <p>சிறிய குன்றும் பெரு மலையும்
பல பின்னே பிற்பட வந்தேன்
யான், பரிசில் கொண்டவனாய்ட


போவதற்கு எனச் சொல்லிநின்
ற
என்னை, அன்புற்று அருளி
இப்பொருளைக் கொண்டு
இவ்வாறு செல்க எனக் கூற,
என் தகுதியை எங்ஙனம்
அறிந்தனன் தடுத்தற்கு அரிய
வேந்தன்? காணாமல் கொடுத்த
இப்பரிசுப்பொருளுக்கு யான்
ஓர் ஊதியமே கருதும் பரிசிலன்
இல்லை. விரும்பி அவருடைய
தகுதியளவு அறிந்து
அளித்துவிடின்
தினையளவாயினும் அது
இனியது.</p>
    </div>
  ),
  'எழுத்துப்‌பெயர்ப்பு': (
    <div>
      <p> kuṉṟum malaiyum palapiṉ oḻiya
vantaṉeṉ paricil koṇṭaṉeṉ celaṟkueṉa
niṉṟa eṉṉayan taruḷi ītukoṇṭu
īṅkaṉam celka tāṉeṉa eṉṉai
yāṅkaṟin taṉaṉō, tāṅkuarum kāvalaṉ
kāṇātu ītta ipporuṭku yāṉōr
vāṇikap paricilaṉ allēṉ pēṇit
tiṉaiyaṉait tāyiṉum iṉitavar
tuṇaiyaḷa vaṟintu nalkiṉar viṭiṉē.</p>
    </div>
  ),
  'மொழிபெயர்ப்பு': (
    <div>
      <p>While I was standing there and had said, “I have crossed many hills 
and mountains to come to him and win some reward, “he spoke
with a will to show me love and grace, saying to his men,
“Let him take what I have given him  and go on his way!” But
What did he know of me, this king his enemies cannot withstand?
I am not a man who traffics in gifts, willing to accept
Something he offers without so much as seeing me! If he would give me
no more than a single seed of millet
but with love, and knowledge of my true worth, how sweet that would be!
</p>
    </div>
  ),
  'திணை': (
    <div>
      <h3>பாடாண் </h3>
      <p>பாடப்படும் தலைவனின் புகழ், 
கொடை, வீரம் ஆகியனவற்றைப் 
போற்றுதல்.

‘குன்றும் மலையும் பலபின் 
ஒழிய, வந்தனென் பரிசில் 
கொண்டனென் செலற்குஎன, 
நின்ற என்நயந்து அருளி 
ஈதுகொண்டு, ஈங்கனம் செல்க 
தான்என என்னை, யாங்கறிந் 
தனனோ, தாங்குஅரும் 
காவலன்’ என்னும் 
அடிகளின்வழி அதியமான் 
நெடுமானஞ்சியின் 
கொடைச்சிறப்பு 
விளக்கப்படுதலின் இது 
பாடாண் துறையாயிற்று.</p>
    </div>
  ),
  'துறை': (
    <div>
      <h3>பரிசில் கடைஇய கடைக்கூட்டு</h3>
      <p>பரிசில் கடைஇய கடைக்கூட்டு 
நிலை என்பது பரிசில் வேண்டும் 
நிலையும் பெறும் நிலையும் 
குறித்து அமையும் துறை.

இப்பாடலில் ‘குன்றும் மலையும் 
பலபின் ஒழிய வந்தனென் பரிசில் 
கொண்டனென் செலற்குஎன’ 
எனவரும் அடிகளில் பரிசில் 
வேண்டும் நிலையும், ‘காணாது 
ஈத்த இப்பொருட்கு யான்ஓர் 
வாணிகப் பரிசிலன் அல்லேன் 
பேணித் தினைஅனைத்து 
ஆயினும் இனிதவர் 
துணைஅளவு அறிந்து நல்கினர் 
விடினே’ என்னும் அடிகளின்வழி 
பெறும்நிலையும் 
சுட்டப்பெறுவதால் இப்பாடல் 
பரிசில் கடைஇய 
கடைக்கூட்டுநிலை என்னும் 
துறைபாற்படும்.</p>
    </div>
  ),
  'பாடலாசிரியர்‌': (
    <div>
      <h3>பெருஞ்சித்திரனார்</h3>
      <p>பெருஞ்சித்திரனார் குமணன் 
என்னும் வள்ளலைப் பாடியவர். 
158,159,160,161,162,163,208 
ஆகிய பாடல்கள் இவர் 
பாடியதாகப் புறநானூற்றில் 
காணப்பெறுகின்றன. 
இளவெளிமான், மற்றும் 
அதியமான் இருவரையும் தமது 
பாடலில் இகழ்ந்து பாடியுள்ளார்.  
செய்யுளில் உள்ள 
பொருளமைதிகளை நோக்கியே 
இவருக்கு இப்பெயரை 
இட்டனர் போலும். இங்கு 
இவரது 208ஆம் பாடல் 
பாடமாக 
வைக்கப்பெற்றுள்ளது.</p>
    </div>
  ),
  'நூற்பெயர்‌': <NoorPeyarContent />,
}

function Q2Content({ onNext, onCorrect }) {
  const [selected, setSelected] = useState(null)
  const [showPopup, setShowPopup] = useState(false)

  const handleSelect = (answer) => {
    setSelected(answer)
    setShowPopup(true)
    if (answer === 'ஆம்') onCorrect()
  }

  const isCorrect = selected === 'ஆம்'

  return (
    <div className="q2-wrap">
      {/* Paadal */}
      <div className="q2-paadal">
        <p>
          குன்றும் மலையும் பலபின் ஒழிய<br />
          வந்தனென் பரிசில் கொண்டனென் செலற்குஎன<br />
          நின்ற என்நயந்து அருளி ஈதுகொண்டு<br />
          ஈங்கனம் செல்க தான்என என்னை<br />
          யாங்கறிந் தனனோ தாங்குஅரும் காவலன்<br />
          காணாது ஈத்த இப்பொருட்கு யான்ஓர்<br />
          வாணிகப் பரிசிலன் அல்லேன் பேணித்<br />
          தினைஅனைத்து ஆயினும் இனிதுஅவர்<br />
          துணைஅளவு அறிந்து நல்கினர் விடினே
        </p>
      </div>

      {/* Divider with media controls */}
      <div className="q2-divider">
        <div className="q2-media-controls">
          <button className="media-btn">◀</button>
          <button className="media-btn">▶</button>
          <button className="media-btn">⏸</button>
          <button className="media-btn">■</button>
        </div>
      </div>

      {/* Question + options */}
      <div className="q2-question-area">
        <p>இனி, இப்புறநானூற்றுப் பாடலைக் கவனமாகக் கேளுங்கள்.</p>
        <p>இப்போது இப்பாடலை இணைந்து வாசியுங்கள்.</p>
        <p>இனி இப்பாடலை நீங்கள் தனியாக வாசிக்க இயலுமல்லவா?</p>

        <div className="q2-options">
          <p className="q2-prompt">வாசித்துவிட்டீர்களா?</p>
          <label className="q2-option" onClick={() => handleSelect('ஆம்')}>
            <span className="q2-radio-dot" />
            ஆம்
          </label>
          <label className="q2-option" onClick={() => handleSelect('இல்லை')}>
            <span className="q2-radio-dot" />
            இல்லை
          </label>
        </div>
      </div>

      {/* Popup */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-box">
            <div className="popup-header">
              {isCorrect ? 'சரியான பதில்' : 'இது தவறு'}
            </div>
            <div className="popup-body">
              {isCorrect ? (
                <>
                  <div className="popup-correct-content">
                    <svg viewBox="0 0 100 100" className="check-icon" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <linearGradient id="checkGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%"   stopColor="#66ee66" />
                          <stop offset="50%"  stopColor="#22bb22" />
                          <stop offset="100%" stopColor="#0d7a0d" />
                        </linearGradient>
                        <filter id="checkShadow" x="-25%" y="-25%" width="150%" height="150%">
                          <feDropShadow dx="2" dy="3" stdDeviation="3" floodColor="#000" floodOpacity="0.45" />
                        </filter>
                      </defs>
                      <polyline
                        points="10,54 38,82 90,16"
                        stroke="url(#checkGrad)"
                        strokeWidth="20"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                        filter="url(#checkShadow)"
                      />
                    </svg>
                    <p className="popup-success-text">வாழ்த்துகள், மேலே செல்க</p>
                  </div>
                  <div className="popup-footer">
                    <button
                      className="popup-action-btn"
                      onClick={() => { setShowPopup(false); setSelected(null); onNext() }}
                    >
                      அடுத்து
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="popup-wrong-content">
                    <svg viewBox="0 0 100 100" className="cross-icon" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <linearGradient id="xGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%"   stopColor="#ff6644" />
                          <stop offset="50%"  stopColor="#dd1100" />
                          <stop offset="100%" stopColor="#991000" />
                        </linearGradient>
                        <filter id="xShadow" x="-25%" y="-25%" width="150%" height="150%">
                          <feDropShadow dx="2" dy="3" stdDeviation="3" floodColor="#000" floodOpacity="0.45" />
                        </filter>
                      </defs>
                      <line x1="16" y1="16" x2="84" y2="84"
                            stroke="url(#xGrad)" strokeWidth="22"
                            strokeLinecap="round" filter="url(#xShadow)" />
                      <line x1="84" y1="16" x2="16" y2="84"
                            stroke="url(#xGrad)" strokeWidth="22"
                            strokeLinecap="round" filter="url(#xShadow)" />
                    </svg>
                    <p>இனி நீங்கள் ஏன் அருஞ்சொற்பொருள் குமிழைப்
                    பயன்படுத்திச் சரியான பாடலடிகடையாளம்
                    காணக்கூடாது ? அருஞ்சொற்பொள் குமிழைத் தேர்வு செய்யுங்கள்.</p>
                  </div>
                  <div className="popup-footer">
                    <button
                      className="popup-action-btn"
                      onClick={() => setShowPopup(false)}
                    >
                      செல்க
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

const QUESTIONS = [
  {
    id: 1,
    question: 'புறநானூற்றுப் பாடலின் அறிமுக உரையைக் கவனமாக வாசியுங்கள்',
    content: (
      <div>
        <p style={{ marginBottom: '0.75rem', lineHeight: '1.8' }}>
          புறநானூற்றுப் பாடலின் அறிமுக உரையைக் கவனமாக வாசியுங்கள்'
        </p>
        <h3 style={{ fontWeight: '600', marginBottom: '0.75rem' }}>முன்னுரை</h3>
        <p style={{ lineHeight: '1.8' }}>
         பெருஞ்சித்திரனார் அதியமான் நெடுமான் அஞ்சியிடம் பொருள் பெறுவதற்காகச் சென்றார். அப்பொழுது அதியமான் அவரைக் காணாது பொருள் தந்தான். அப்பொருளை வாங்க மறுத்த பெருஞ்சித்திரனார் இப்பாடலைப் பாடினார் எனப் புறநானூற்றில் பாடலுக்குத் தரப்பெறும் கொளுவின்வழித் தெரியவருகின்றது.
        </p>
        <p style={{ marginTop: '0.75rem', fontStyle: 'italic', fontSize: '0.9rem', color: 'black' }}>
          இனி, இப்புறநானூற்றுப் பாடலைக் கவனமாகக் கேளுங்கள்
        </p>
      </div>
    ),
  },
  {
    id: 2,
    question: 'இனி இப்பாடலை நீங்கள் தனியாக வாசிக்க இயலுமல்லவா?',
    content: ({ onNext }) => <Q2Content onNext={onNext} />,
  },
  {
    id: 3,
    question: 'இப்பாடலின் மையக்கருத்து எது?',
    content: ({ onNext }) => <Q3Content onNext={onNext} />,
  },
  {
    id: 4,
    question: 'இப்பாடலின் திரண்ட கருத்து எது?',
    content: ({ onNext }) => <Q4Content onNext={onNext} />,
  },
  {
    id: 5,
    question: 'இப் பாடல் பகுதியின் நேர்ப்பொருளைத் தெரிவு செய்யுங்கள்.',
    content: ({ onNext }) => <Q5Content onNext={onNext} />,
  },
  {
    id: 6,
    question: 'இப் பாடல் பகுதியின் நேர்ப்பொருளைத் தெரிவு செய்யுங்கள்.',
    content: ({ onNext }) => <Q6Content onNext={onNext} />,
  },
  {
    id: 7,
    question: 'சொல்வரிசை சிதையாமல் இப்பொருள் உணர்த்தும் பாடலடிகளைக்.',
    content: ({ onNext }) => <Q7Content onNext={onNext} />,
  },
  {
    id: 8,
    question: 'சொல்வரிசை சிதையாமல் இப்பொருள் உணர்த்தும் பாடலடிகளைக்.',
    content: ({ onNext }) => <Q8Content onNext={onNext} />,
  },
  {
    id: 9,
    question: 'கொடுக்கப்பட்டிருக்கும் பொழிப்புரைக்கு ஏற்ப பாடலடிகளை',
    content: ({ onNext }) => <Q9Content onNext={onNext} />,
  },
  {
    id: 10,
    question: 'பொழிப்புரை அடிப்படையில் அடிமாறி அமைந்த பாடலைச் சரியாக இடுக.',
    content: ({ onNext }) => <Q10Content onNext={onNext} />,
  },
  {
    id: 11,
    question: 'மீண்டும் ஒருமுறை இப்பாடலை வாசித்துக்கொள்ளுங்கள்.',
    content: <Q11Content />,
  },
  {
    id: 12,
    question: 'வினாக்களுக்கு விடை எழுதுக.',
    content: ({ onNext }) => <Q12Content onNext={onNext} />,
  },
  {
    id: 13,
    question: 'திணை விளக்கத்திற்குரிய அடிகளை எடுத்து இடவும்.',
    content: ({ onNext }) => <Q13Content onNext={onNext} />,
  },
  {
    id: 14,
    question: 'துறை விளக்கத்திற்குரிய அடிகளை எடுத்து இடவும்.',
    content: ({ onNext }) => <Q14Content onNext={onNext} />,
  },
]

function FlipButton({ children, onClick, isActive, className = '' }) {
  return (
    <div className={`flip-wrapper ${className}`}>
      <button
        className={`flip-btn ${isActive ? 'active' : ''}`}
        onClick={onClick}
      >
        <span className="flip-front">{children}</span>
        <span className="flip-back">{children}</span>
      </button>
    </div>
  )
}

export default function MalaiApp() {
  const [activeLeft, setActiveLeft] = useState('கொண்டுகூட்டு')
  const [currentQ, setCurrentQ] = useState(0)
  const [unlocked, setUnlocked] = useState(false)

  const isStatic = typeof QUESTIONS[currentQ].content !== 'function'

  const handleNext = () => {
    setCurrentQ((prev) => (prev + 1) % QUESTIONS.length)
    setUnlocked(false)
  }
  const handleCorrect = () => setUnlocked(true)

  return (
    <div className="malai-scope">
    <div className="app-container">
      {/* LEFT SIDEBAR */}
      <aside className="left-sidebar">
        <nav className="sidebar-nav">
          {LEFT_BUTTONS.map((btn) => (
            <FlipButton
              key={btn}
              isActive={activeLeft === btn}
              onClick={() => setActiveLeft(btn)}
            >
              {btn}
            </FlipButton>
          ))}
        </nav>
      </aside>

      {/* CENTRE COLUMN */}
      <main className="centre-column">
        <div className="centre-header">
          அலகு 7 : பாடம் 9
        </div>
        <div className="centre-content">
          <div className="question-body">
            {typeof QUESTIONS[currentQ].content === 'function'
              ? QUESTIONS[currentQ].content({ onNext: handleNext, onCorrect: handleCorrect })
              : QUESTIONS[currentQ].content}
          </div>
        </div>
        <div className="centre-footer">
          {(isStatic || unlocked) && (
            <FlipButton className="next-btn-wrapper" onClick={handleNext}>
              அடுத்து &gt;&gt;
            </FlipButton>
          )}
        </div>
      </main>

      {/* RIGHT COLUMN */}
      <aside className="right-column">
        <div className="right-header">
          கோவர்கேட்டு 5
        </div>
        <div className="right-content">
          {RIGHT_CONTENT[activeLeft]}
        </div>
        <div className="question-nav">
          {QUESTIONS.map((q, i) => (
            <button
              key={q.id}
              className={`q-nav-btn ${currentQ === i ? 'q-active' : ''}`}
              onClick={() => setCurrentQ(i)}
              title={q.question}
            >
              {q.id}
            </button>
          ))}
        </div>
      </aside>
    </div>
    </div>
  )
}
