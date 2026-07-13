import { motion } from 'framer-motion';
import { useLessonData } from '../hooks/useLessonData';

const FONT = 'Arial Unicode MS, Arial, sans-serif';

export default function LessonPage({ onNext }) {
  const { data: lessonData, loading, error } = useLessonData();

  if (loading) return (
    <div style={{ flex:1, display:'flex', alignItems:'center', justifyContent:'center', fontFamily:FONT, color:'#1a4cc8', fontSize:14 }}>
      ஏற்றுகிறது...
    </div>
  );

  if (error) return (
    <div style={{ flex:1, display:'flex', alignItems:'center', justifyContent:'center', fontFamily:FONT, color:'#dc2626', fontSize:13, padding:20 }}>
      தரவை ஏற்ற முடியவில்லை. தயவுசெய்து மீண்டும் முயற்சிக்கவும்.
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        padding: '18px 22px',
        overflow: 'hidden',
        fontFamily: FONT,
      }}
    >
      {/* Heading — exact Flash text: "அலகு 1 : பாடம் 1 : பாடல் 3" */}
      <h2 style={{
        fontSize: 20,
        fontWeight: 'bold',
        color: '#0d2a80',
        marginBottom: 4,
        marginTop: 0,
        fontFamily: FONT,
      }}>
        {lessonData.heading}
      </h2>

      {/* Subtitle — "இது முதற்பொருள் பற்றியது" */}
      <h3 style={{
        fontSize: 15,
        color: '#1a4cc8',
        fontWeight: 'normal',
        marginBottom: 18,
        marginTop: 0,
        borderBottom: '1px solid #c0d4f0',
        paddingBottom: 10,
        fontFamily: FONT,
      }}>
        {lessonData.subtitle}
      </h3>

      {/* Prose summary */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        style={{ flex: 1, overflow: 'auto' }}
      >
        <p style={{
          fontSize: 14.5,
          color: '#112',
          lineHeight: 2.1,
          background: 'rgba(255,255,255,0.7)',
          border: '1px solid #c0d4f0',
          borderRadius: 8,
          padding: '16px 20px',
          margin: 0,
          fontFamily: FONT,
        }}>
          {lessonData.proseSummary}
        </p>
      </motion.div>

      {/* Next button — Flash label is "அடுத்து >>" */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: 14 }}>
        <motion.button
          onClick={onNext}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
          style={{
            background: 'linear-gradient(to bottom,#1a4cc8,#0d2a80)',
            color: '#fff',
            border: 'none',
            borderRadius: 5,
            padding: '8px 24px',
            fontSize: 13,
            fontFamily: FONT,
            cursor: 'pointer',
            fontWeight: 'bold',
            boxShadow: '0 2px 8px rgba(0,40,140,0.35)',
          }}
        >
          அடுத்து &gt;&gt;
        </motion.button>
      </div>
    </motion.div>
  );
}
