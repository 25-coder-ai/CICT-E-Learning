import { motion } from 'framer-motion';
import bgCollage from '../assets/images/background-collage.jpg';
import { LESSON, ABOUT_KURUNTOKAI } from '../data/content';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.5 },
  }),
};

export default function IntroScreen({ onNext }) {
  return (
    <div
      className="flex"
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: '#ffffff',
        overflow: 'hidden',
      }}
    >
      {/* Left: Background collage panel */}
      <div
        style={{
          width: 240,
          height: '100%',
          flexShrink: 0,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <img
          src={bgCollage}
          alt="Kuruntokai imagery"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
          }}
        />
        {/* Overlay gradient */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to right, transparent 60%, rgba(255,255,255,0.9) 100%)',
          }}
        />
        {/* Title overlay on image */}
        <div
          style={{
            position: 'absolute',
            bottom: 24,
            left: 0,
            right: 0,
            textAlign: 'center',
          }}
        >
          <div
            style={{
              color: '#ffffff',
              fontSize: 22,
              fontWeight: 'bold',
              textShadow: '1px 1px 4px rgba(0,0,0,0.9)',
              fontFamily: 'Arial Unicode MS, Arial, sans-serif',
            }}
          >
            {LESSON.title}
          </div>
          <div
            style={{
              color: '#ffeeaa',
              fontSize: 13,
              textShadow: '1px 1px 3px rgba(0,0,0,0.8)',
            }}
          >
            {LESSON.subtitle}
          </div>
        </div>
      </div>

      {/* Right: Content panel */}
      <div
        style={{
          flex: 1,
          padding: '28px 32px',
          display: 'flex',
          flexDirection: 'column',
          gap: 18,
          overflowY: 'auto',
        }}
      >
        {/* Unit/Lesson heading */}
        <motion.div
          custom={0}
          variants={fadeIn}
          initial="hidden"
          animate="visible"
        >
          <div
            style={{
              fontSize: 13,
              color: '#666666',
              fontWeight: 'bold',
              letterSpacing: 1,
              textTransform: 'uppercase',
              marginBottom: 4,
            }}
          >
            பகுதி {LESSON.unit} — பாடம் {LESSON.lesson}
          </div>
          <div
            style={{
              fontSize: 28,
              fontWeight: 'bold',
              color: '#003399',
              fontFamily: 'Arial Unicode MS, Arial, sans-serif',
              borderBottom: '3px solid #003399',
              paddingBottom: 8,
            }}
          >
            {LESSON.title}
          </div>
          <div
            style={{
              fontSize: 16,
              color: '#666666',
              marginTop: 4,
            }}
          >
            {LESSON.titleRoman} — {LESSON.subtitleEnglish}
          </div>
        </motion.div>

        {/* About Kuruntokai section */}
        <motion.div
          custom={1}
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          style={{
            backgroundColor: '#f0f4ff',
            border: '1px solid #ccd6ff',
            borderRadius: 4,
            padding: '14px 18px',
          }}
        >
          <div
            style={{
              fontSize: 16,
              fontWeight: 'bold',
              color: '#003399',
              marginBottom: 8,
              fontFamily: 'Arial Unicode MS, Arial, sans-serif',
            }}
          >
            {ABOUT_KURUNTOKAI.heading}
          </div>
          <div
            style={{
              fontSize: 16,
              color: '#000099',
              lineHeight: 1.7,
              fontFamily: 'Arial Unicode MS, Arial, sans-serif',
              marginBottom: 10,
            }}
          >
            {ABOUT_KURUNTOKAI.tamil}
          </div>
          <div
            style={{
              fontSize: 14,
              color: '#444444',
              lineHeight: 1.6,
              borderTop: '1px solid #ccd6ff',
              paddingTop: 8,
            }}
          >
            {ABOUT_KURUNTOKAI.english}
          </div>
        </motion.div>

        {/* References */}
        <motion.div
          custom={2}
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
          }}
        >
          <div
            style={{
              fontSize: 13,
              color: '#666666',
            }}
          >
            உசாத்துணை (References):
          </div>
          <div
            style={{
              fontSize: 13,
              color: '#003399',
              fontWeight: 'bold',
            }}
          >
            {ABOUT_KURUNTOKAI.references}
          </div>
        </motion.div>

        {/* Info boxes */}
        <motion.div
          custom={3}
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          style={{ display: 'flex', gap: 12 }}
        >
          {[
            { label: 'நூல் (Collection)', value: 'குறுந்தொகை' },
            { label: 'பாடல்கள் (Poems)', value: '401' },
            { label: 'வகை (Type)', value: 'அகம் (Love poetry)' },
          ].map((item) => (
            <div
              key={item.label}
              style={{
                flex: 1,
                backgroundColor: '#003399',
                color: '#ffffff',
                borderRadius: 4,
                padding: '10px 12px',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: 11, opacity: 0.75, marginBottom: 4 }}>
                {item.label}
              </div>
              <div
                style={{
                  fontSize: 15,
                  fontWeight: 'bold',
                  fontFamily: 'Arial Unicode MS, Arial, sans-serif',
                }}
              >
                {item.value}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Next button */}
        <motion.div
          custom={4}
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          style={{ marginTop: 'auto', display: 'flex', justifyContent: 'flex-end' }}
        >
          <motion.button
            onClick={onNext}
            whileHover={{ backgroundColor: '#002277', scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            style={{
              backgroundColor: '#003399',
              color: '#ffffff',
              border: 'none',
              borderRadius: 4,
              padding: '10px 28px',
              fontSize: 15,
              fontWeight: 'bold',
              cursor: 'pointer',
              fontFamily: 'Arial Unicode MS, Arial, sans-serif',
              boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
            }}
          >
            தொடர் →
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
