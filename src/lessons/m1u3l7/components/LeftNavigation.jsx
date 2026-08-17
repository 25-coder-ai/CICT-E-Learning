import { motion } from 'framer-motion';

const NAV_ITEMS = [
  { id: 'kondukoottu',     label: 'கொண்டுகூட்டு' },
  { id: 'vocabulary',      label: 'அருஞ்சொற்பொருள்' },
  { id: 'commentary',      label: 'பதவுரை' },
  { id: 'explanation',     label: 'பொழிப்புரை' },
  { id: 'transliteration', label: 'எழுத்துப்பெயர்ப்பு' },
  { id: 'translation',     label: 'மொழிபெயர்ப்பு' },
  { id: 'author',          label: 'பாடலாசிரியர்' },
  { id: 'book',            label: 'நூற்பெயர்' },
];

const FONT = 'Arial Unicode MS, Arial, sans-serif';
const BG   = 'linear-gradient(to bottom,#162060,#0b1540)';

/* Mobile: horizontal scrollable tabs */
function HorizontalNav({ active, onSelect }) {
  return (
    <div style={{
      display: 'flex',
      overflowX: 'auto',
      background: BG,
      borderBottom: '2px solid #080f30',
      flexShrink: 0,
      WebkitOverflowScrolling: 'touch',
      scrollbarWidth: 'thin',
    }}>
      {NAV_ITEMS.map((item) => {
        const isActive = active === item.id;
        return (
          <button
            key={item.id}
            onClick={() => onSelect(item.id)}
            style={{
              flexShrink: 0,
              padding: '12px 15px',
              fontSize: 13,
              fontFamily: FONT,
              color: isActive ? '#fff' : 'rgba(200,220,255,0.8)',
              background: isActive ? 'rgba(60,110,230,0.45)' : 'transparent',
              border: 'none',
              borderBottom: isActive ? '3px solid #6699ff' : '3px solid transparent',
              cursor: 'pointer',
              fontWeight: isActive ? 'bold' : 'normal',
              whiteSpace: 'nowrap',
              transition: 'all 0.15s',
            }}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}

/* Tablet: narrow vertical sidebar */
function NarrowNav({ active, onSelect }) {
  return (
    <div style={{
      width: 130,
      flexShrink: 0,
      display: 'flex',
      flexDirection: 'column',
      background: BG,
      borderRight: '1px solid #080f30',
    }}>
      {NAV_ITEMS.map((item) => {
        const isActive = active === item.id;
        return (
          <motion.button
            key={item.id}
            onClick={() => onSelect(item.id)}
            whileHover={{ backgroundColor: 'rgba(80,120,220,0.3)' }}
            style={{
              display: 'block', width: '100%',
              padding: '8px 6px', textAlign: 'center',
              fontSize: 11.5, fontFamily: FONT,
              color: isActive ? '#fff' : 'rgba(200,220,255,0.82)',
              border: 'none',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
              borderLeft: isActive ? '3px solid #6699ff' : '3px solid transparent',
              background: isActive
                ? 'linear-gradient(to right,rgba(60,110,230,0.55),rgba(30,70,180,0.3))'
                : 'transparent',
              cursor: 'pointer',
              fontWeight: isActive ? 'bold' : 'normal',
              outline: 'none',
              transition: 'color 0.2s',
            }}
          >
            {item.label}
          </motion.button>
        );
      })}
    </div>
  );
}

/* Desktop: full-width vertical sidebar */
export default function LeftNavigation({ active, onSelect, horizontal = false, narrow = false }) {
  if (horizontal) return <HorizontalNav active={active} onSelect={onSelect} />;
  if (narrow)     return <NarrowNav     active={active} onSelect={onSelect} />;

  return (
    <div style={{
      width: 165,
      flexShrink: 0,
      display: 'flex',
      flexDirection: 'column',
      background: BG,
      borderRight: '1px solid #080f30',
    }}>
      {NAV_ITEMS.map((item) => {
        const isActive = active === item.id;
        return (
          <motion.button
            key={item.id}
            onClick={() => onSelect(item.id)}
            whileHover={{ backgroundColor: 'rgba(80,120,220,0.35)' }}
            animate={{
              background: isActive
                ? 'linear-gradient(to right,rgba(60,110,230,0.55),rgba(30,70,180,0.3))'
                : 'transparent',
            }}
            style={{
              display: 'block', width: '100%',
              padding: '9px 8px', textAlign: 'center',
              fontSize: 12.5, fontFamily: FONT,
              color: isActive ? '#fff' : 'rgba(200,220,255,0.85)',
              border: 'none',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
              borderLeft: isActive ? '3px solid #6699ff' : '3px solid transparent',
              cursor: 'pointer',
              fontWeight: isActive ? 'bold' : 'normal',
              outline: 'none',
              transition: 'color 0.2s',
            }}
          >
            {item.label}
          </motion.button>
        );
      })}
    </div>
  );
}
