import { useAllLessonContent } from '../hooks/useLessonData';

const FONT = 'Arial Unicode MS, Arial, sans-serif';

const LABEL_STYLE = {
  display: 'block',
  textAlign: 'center',
  background: 'linear-gradient(to right,#1a3ab8,#2a5ad0)',
  color: '#fff',
  fontSize: 14,
  fontWeight: 'bold',
  padding: '6px 8px',
  marginBottom: 10,
  fontFamily: FONT,
};

const BODY_STYLE = {
  padding: '0 12px',
  fontSize: 13,
  fontFamily: FONT,
  color: '#000080',
  lineHeight: 1.7,
  overflowY: 'auto',
  flex: 1,
};

function LoadingPanel() {
  return (
    <div style={{ ...BODY_STYLE, display:'flex', alignItems:'center', justifyContent:'center', color:'#1a4cc8', fontStyle:'italic' }}>
      ஏற்றுகிறது...
    </div>
  );
}

function KondukoottuPanel({ data }) {
  return (
    <>
      <span style={LABEL_STYLE}>கொண்டுகூட்டு</span>
      <div style={BODY_STYLE}>
        <p style={{ lineHeight: 2 }}>{data.kondukoottu}</p>
      </div>
    </>
  );
}

function VocabularyPanel({ data }) {
  return (
    <>
      <span style={LABEL_STYLE}>{data.heading}</span>
      <div style={BODY_STYLE}>
        {data.entries.map((entry, i) => (
          <p key={i} style={{ marginBottom: 5 }}>
            <strong style={{ color: '#000080' }}>{entry.word}</strong>
            {' — '}
            <span>{entry.meaning}</span>
          </p>
        ))}
      </div>
    </>
  );
}

function CommentaryPanel({ data }) {
  return (
    <>
      <span style={LABEL_STYLE}>{data.heading}</span>
      <div style={BODY_STYLE}>
        {data.entries.map((entry, i) => (
          <p key={i} style={{ marginBottom: 5 }}>
            <strong>{entry.phrase}</strong>
            {' – '}
            <span>{entry.explanation}</span>
            {i < data.entries.length - 1 ? ';' : '.'}
          </p>
        ))}
      </div>
    </>
  );
}

function ExplanationPanel({ data }) {
  return (
    <>
      <span style={LABEL_STYLE}>{data.heading}</span>
      <div style={BODY_STYLE}>
        <p style={{ lineHeight: 1.9 }}>{data.text}</p>
      </div>
    </>
  );
}

function TransliterationPanel({ data }) {
  return (
    <>
      <span style={LABEL_STYLE}>{data.heading}</span>
      <div style={{ ...BODY_STYLE, fontStyle: 'italic' }}>
        {data.lines.map((line, i) => (
          <p key={i} style={{ marginBottom: 3 }}>{line}</p>
        ))}
      </div>
    </>
  );
}

function TranslationPanel({ data }) {
  return (
    <>
      <span style={LABEL_STYLE}>{data.heading}</span>
      <div style={BODY_STYLE}>
        {data.lines.map((line, i) => (
          <p key={i} style={{ marginBottom: 3 }}>{line}</p>
        ))}
        {data.translator && (
          <p style={{ marginTop: 14, fontStyle: 'italic', color: '#336' }}>
            — {data.translator}
          </p>
        )}
      </div>
    </>
  );
}

function AuthorPanel({ data }) {
  return (
    <>
      <span style={LABEL_STYLE}>{data.heading}</span>
      <div style={BODY_STYLE}>
        <p style={{ fontWeight: 'bold', textAlign: 'center', marginBottom: 10, fontSize: 14 }}>
          {data.name}
        </p>
        <p style={{ lineHeight: 1.8 }}>{data.biography}</p>
      </div>
    </>
  );
}

function BookPanel({ data }) {
  return (
    <>
      <span style={LABEL_STYLE}>{data.heading}</span>
      <div style={{ ...BODY_STYLE, position: 'relative' }}>
        <p style={{ fontWeight: 'bold', textAlign: 'center', marginBottom: 10, fontSize: 14 }}>
          {data.bookName}
        </p>
        <p style={{ lineHeight: 1.8 }}>{data.description}</p>
        {data.englishLinkLabel && (
          <p style={{
            marginTop: 12,
            color: '#0000cc',
            textDecoration: 'underline',
            cursor: 'pointer',
            fontSize: 12,
            textAlign: 'right',
          }}>
            {data.englishLinkLabel}
          </p>
        )}
      </div>
    </>
  );
}

function VideoLecturesPanel({ onPlay }) {
  const FONT = 'Arial Unicode MS, Arial, sans-serif';
  return (
    <>
      <span style={LABEL_STYLE}>வீடியோ விரிவுரை</span>
      <div style={{ ...BODY_STYLE, padding: '10px 12px' }}>
        {/* அகம் group */}
        <div style={{ marginBottom: 8 }}>
          <div style={{
            fontWeight: 'bold', fontSize: 13, color: '#0d2a80',
            padding: '4px 6px', background: 'rgba(26,76,200,0.1)',
            borderRadius: 4, marginBottom: 4, fontFamily: FONT,
          }}>
            அகம்
          </div>
          {/* item 1 — முல்லை (placeholder/locked) */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '5px 10px', borderRadius: 4, marginBottom: 3,
            color: '#aaa', fontSize: 12, fontFamily: FONT,
          }}>
            <span style={{ fontSize: 10 }}>🔒</span>
            <span>முல்லை — பாடம் 1</span>
          </div>
          {/* item 2 — குறிஞ்சி (active) */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '6px 10px', borderRadius: 4, marginBottom: 3,
            background: 'rgba(26,76,200,0.08)', border: '1px solid rgba(26,76,200,0.2)',
            fontFamily: FONT,
          }}>
            <div style={{ fontSize: 12, color: '#0d2a80', fontWeight: 'bold' }}>
              குறிஞ்சி — பாடம் 2
            </div>
            <button
              onClick={onPlay}
              style={{
                background: 'linear-gradient(to bottom,#1a4cc8,#0d2a80)',
                color: '#fff', border: 'none', borderRadius: 4,
                padding: '3px 10px', fontSize: 11, cursor: 'pointer',
                fontFamily: FONT, fontWeight: 'bold', display: 'flex',
                alignItems: 'center', gap: 4, flexShrink: 0,
              }}
            >
              ▶ Play
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default function RightSidebar({ activePanel, fullWidth = false, narrow = false, onOpenVideoLecture }) {
  const {
    lesson, glossary, commentary, explanation,
    transliteration, english, author, book,
    loading,
  } = useAllLessonContent();

  const width = fullWidth ? '100%' : narrow ? 190 : 250;

  const containerStyle = {
    width,
    flexShrink: 0,
    display: 'flex',
    flexDirection: 'column',
    background: 'linear-gradient(to bottom,#c8daf5,#b0c8f0)',
    borderLeft: fullWidth ? 'none' : '1px solid #8ab0e0',
    overflow: 'hidden',
  };

  if (loading) {
    return <div style={containerStyle}><LoadingPanel /></div>;
  }

  const panel = activePanel || 'kondukoottu';

  return (
    <div style={containerStyle}>
      {panel === 'kondukoottu'    && <KondukoottuPanel     data={lesson} />}
      {panel === 'vocabulary'     && <VocabularyPanel      data={glossary} />}
      {panel === 'commentary'     && <CommentaryPanel      data={commentary} />}
      {panel === 'explanation'    && <ExplanationPanel     data={explanation} />}
      {panel === 'transliteration'&& <TransliterationPanel data={transliteration} />}
      {panel === 'translation'    && <TranslationPanel     data={english} />}
      {panel === 'author'         && <AuthorPanel          data={author} />}
      {panel === 'book'           && <BookPanel            data={book} />}
      {panel === 'videoLectures'  && <VideoLecturesPanel   onPlay={onOpenVideoLecture} />}
      {/* Default fallback */}
      {!['kondukoottu','vocabulary','commentary','explanation',
         'transliteration','translation','author','book','videoLectures'].includes(panel) &&
        <KondukoottuPanel data={lesson} />}
    </div>
  );
}
