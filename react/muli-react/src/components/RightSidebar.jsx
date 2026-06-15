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

export default function RightSidebar({ activePanel, fullWidth = false, narrow = false }) {
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
      {/* Default fallback */}
      {!['kondukoottu','vocabulary','commentary','explanation',
         'transliteration','translation','author','book'].includes(panel) &&
        <KondukoottuPanel data={lesson} />}
    </div>
  );
}
