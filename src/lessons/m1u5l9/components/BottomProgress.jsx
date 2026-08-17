import { motion } from 'framer-motion';

const NAV_IDS = [
  'kondukoottu','vocabulary','commentary','explanation',
  'transliteration','translation','author','book',
];

const LABELS = ['கொண்டு','அருஞ்சொல்','பதவுரை','பொழிப்பு',
                'எழுத்து','மொழிபெயர்','ஆசிரியர்','நூல்'];

export default function BottomProgress({ active, compact = false }) {
  const activeIndex = NAV_IDS.indexOf(active);
  const barH  = compact ? 24 : 32;
  const wrapH = compact ? 38 : 52;
  const px    = compact ? 8  : 12;
  const gap   = compact ? 2  : 3;
  const fs    = compact ? 7.5 : 8.5;

  return (
    <div style={{
      height: wrapH, flexShrink: 0,
      background: 'linear-gradient(to bottom,#e0e8f4,#d0d8ee)',
      borderTop: '1px solid #b0bed8',
      display: 'flex', alignItems: 'center',
      padding: `0 ${px}px`, gap,
    }}>
      {NAV_IDS.map((id, i) => (
        <motion.div
          key={id}
          animate={{
            background: i === activeIndex
              ? 'linear-gradient(to top,#1a4cc8,#3a7af0)'
              : i < activeIndex
              ? 'linear-gradient(to top,#28a745,#4cca68)'
              : 'linear-gradient(to top,#b8c8e0,#d0ddf0)',
            boxShadow: i === activeIndex ? '0 0 6px rgba(40,100,240,0.5)' : 'none',
          }}
          transition={{ duration: 0.3 }}
          style={{
            flex: 1, height: barH, borderRadius: 3,
            border: '1px solid rgba(0,0,0,0.12)',
            display: 'flex', alignItems: 'flex-end',
            justifyContent: 'center', paddingBottom: 2,
            overflow: 'hidden',
          }}
          title={LABELS[i]}
        >
          <span style={{
            fontSize: fs,
            color: i <= activeIndex ? 'rgba(255,255,255,0.85)' : 'rgba(80,100,140,0.7)',
            fontFamily: 'Arial Unicode MS, Arial, sans-serif',
            whiteSpace: 'nowrap',
          }}>
            {LABELS[i]}
          </span>
        </motion.div>
      ))}
    </div>
  );
}
