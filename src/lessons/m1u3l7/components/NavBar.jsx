import { motion } from 'framer-motion';

const SECTIONS = [
  { id: 'intro', label: 'அறிமுகம்', labelEn: 'Intro' },
  { id: 'poem', label: 'பாடல்', labelEn: 'Poem' },
  { id: 'translation', label: 'மொழிபெயர்ப்பு', labelEn: 'Translation' },
  { id: 'glossary', label: 'சொல்லகராதி', labelEn: 'Glossary' },
  { id: 'video', label: 'ஒலிப்பதிவு', labelEn: 'Audio' },
  { id: 'quiz', label: 'வினாக்கள்', labelEn: 'Quiz' },
];

export default function NavBar({ current, onNavigate, completed }) {
  return (
    <div
      className="flex items-center justify-between px-2"
      style={{
        backgroundColor: '#003399',
        height: 36,
        borderBottom: '2px solid #002266',
      }}
    >
      {/* Unit / Lesson label */}
      <div
        style={{
          color: '#ffffff',
          fontSize: 13,
          fontWeight: 'bold',
          paddingLeft: 8,
          whiteSpace: 'nowrap',
        }}
      >
        பகுதி 1 : பாடம் 3
      </div>

      {/* Section tabs */}
      <div className="flex items-center gap-0.5">
        {SECTIONS.map((s) => {
          const isActive = current === s.id;
          const isDone = completed.includes(s.id);
          return (
            <motion.button
              key={s.id}
              onClick={() => onNavigate(s.id)}
              whileHover={{ backgroundColor: isActive ? '#cc9900' : '#0044bb' }}
              style={{
                backgroundColor: isActive ? '#cc9900' : 'transparent',
                color: '#ffffff',
                border: 'none',
                cursor: 'pointer',
                padding: '4px 10px',
                fontSize: 12,
                fontFamily: 'Arial Unicode MS, Arial, sans-serif',
                borderRadius: 2,
                position: 'relative',
                fontWeight: isActive ? 'bold' : 'normal',
              }}
            >
              {s.label}
              {isDone && !isActive && (
                <span
                  style={{
                    position: 'absolute',
                    top: 2,
                    right: 2,
                    width: 5,
                    height: 5,
                    borderRadius: '50%',
                    backgroundColor: '#66ff66',
                  }}
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
