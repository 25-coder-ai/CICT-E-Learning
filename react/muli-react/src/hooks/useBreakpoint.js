import { useState, useEffect } from 'react';

function getBp(w) {
  if (w < 640) return 'mobile';
  if (w < 920) return 'tablet';
  return 'desktop';
}

export function useBreakpoint() {
  const [bp, setBp] = useState(() => getBp(window.innerWidth));
  useEffect(() => {
    const h = () => setBp(getBp(window.innerWidth));
    window.addEventListener('resize', h);
    return () => window.removeEventListener('resize', h);
  }, []);
  return bp;
}
