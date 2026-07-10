import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import bgCollage from '../assets/images/background-collage.jpg';

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [bytesLoaded, setBytesLoaded] = useState(0);
  const [bytesTotal] = useState(627569);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        const next = Math.min(p + Math.random() * 8 + 2, 100);
        setBytesLoaded(Math.floor((next / 100) * bytesTotal));
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => onComplete(), 600);
        }
        return next;
      });
    }, 80);
    return () => clearInterval(interval);
  }, [onComplete, bytesTotal]);

  return (
    <div
      className="relative flex flex-col items-center justify-center overflow-hidden"
      style={{ width: 954, height: 600, backgroundColor: '#ffffff' }}
    >
      {/* Background collage, faded */}
      <div className="absolute inset-0 opacity-20">
        <img
          src={bgCollage}
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      {/* Centered loading panel */}
      <motion.div
        className="relative z-10 flex flex-col items-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Title */}
        <div
          className="mb-8 text-center"
          style={{ fontFamily: 'Arial Unicode MS, Arial, sans-serif' }}
        >
          <div
            className="text-4xl font-bold mb-1"
            style={{ color: '#003399', letterSpacing: 2 }}
          >
            குறுந்தொகை
          </div>
          <div
            className="text-lg font-semibold"
            style={{ color: '#000099' }}
          >
            Kuruntokai — Sangam Literature
          </div>
        </div>

        {/* Loading bar container */}
        <div
          className="relative mb-3"
          style={{ width: 400 }}
        >
          {/* Track */}
          <div
            className="w-full rounded"
            style={{
              height: 18,
              backgroundColor: '#cccccc',
              border: '1px solid #999999',
            }}
          >
            {/* Fill — the "loadingBar" / "_xscale" animation */}
            <motion.div
              className="h-full rounded"
              style={{
                background: 'linear-gradient(to right, #003399, #0066cc)',
                width: `${progress}%`,
              }}
              transition={{ ease: 'linear' }}
            />
          </div>

          {/* Percentage label — "percentDisplay" */}
          <div
            className="absolute right-0 top-0 flex items-center justify-center h-full"
            style={{
              right: -48,
              width: 44,
              fontSize: 13,
              fontWeight: 'bold',
              color: '#003399',
            }}
          >
            {Math.round(progress)}%
          </div>
        </div>

        {/* Bytes display — "bytesDisplay": "loaded X of Y bytes" */}
        <div
          style={{
            fontSize: 12,
            color: '#666666',
            fontFamily: 'Arial, sans-serif',
          }}
        >
          loaded {bytesLoaded.toLocaleString()} of {bytesTotal.toLocaleString()} bytes
        </div>

        {/* Loading text */}
        <motion.div
          className="mt-6"
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 1.2, repeat: Infinity }}
          style={{ fontSize: 14, color: '#003399' }}
        >
          Loading...
        </motion.div>
      </motion.div>
    </div>
  );
}
