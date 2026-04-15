import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const CLOSED_WIDTH = 120;
const MOBILE_OPEN_HEIGHT = 280;
const DESKTOP_OPEN_HEIGHT = 430;
const OPEN_DELAY = 1300;
const VIDEO_MOUNT_DELAY = 620;

const springTransition = {
  type: "spring",
  stiffness: 120,
  damping: 26,
  mass: 1,
};

const Roll = ({ side, isOpen }) => {
  const sideClass =
    side === "left"
      ? "left-0 bg-linear-to-r from-[#5e3616] via-[#9e6531] to-[#d8b277]"
      : "right-0 bg-linear-to-l from-[#5e3616] via-[#9e6531] to-[#d8b277]";

  return (
    <motion.div
      aria-hidden="true"
      animate={{ x: isOpen ? (side === "left" ? -14 : 14) : 0, scale: isOpen ? 1.02 : 1 }}
      transition={{ ...springTransition, stiffness: 110, damping: 24 }}
      className={`absolute bottom-4 top-4 z-30 w-11 rounded-full border border-[#6e431f]/60 ${sideClass} shadow-[inset_6px_0_10px_rgba(56,30,10,0.42),inset_-5px_0_9px_rgba(255,223,168,0.3),0_5px_12px_rgba(56,30,10,0.35)]`}
    >
      <div className="absolute -top-2 left-1/2 h-7 w-7 -translate-x-1/2 rounded-full border border-[#5e3616]/65 bg-radial from-[#f3d5a3] via-[#a96d35] to-[#673813]" />
      <div className="absolute -bottom-2 left-1/2 h-7 w-7 -translate-x-1/2 rounded-full border border-[#5e3616]/65 bg-radial from-[#f3d5a3] via-[#a96d35] to-[#673813]" />
    </motion.div>
  );
};

const CictScrollSection = () => {
  const sectionRef = useRef(null);
  const openTimerRef = useRef(null);
  const videoTimerRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [openHeight, setOpenHeight] = useState(DESKTOP_OPEN_HEIGHT);

  useEffect(() => {
    const updateHeight = () => {
      setOpenHeight(window.innerWidth < 640 ? MOBILE_OPEN_HEIGHT : DESKTOP_OPEN_HEIGHT);
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);

    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node || isOpen) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          openTimerRef.current = window.setTimeout(() => {
            setIsOpen(true);
          }, OPEN_DELAY);
          observer.disconnect();
        }
      },
      { threshold: 0.35 }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
      if (openTimerRef.current) {
        window.clearTimeout(openTimerRef.current);
      }
      if (videoTimerRef.current) {
        window.clearTimeout(videoTimerRef.current);
      }
    };
  }, [isOpen]);

  useEffect(() => {
    if (videoTimerRef.current) {
      window.clearTimeout(videoTimerRef.current);
    }

    if (isOpen) {
      videoTimerRef.current = window.setTimeout(() => {
        setShowVideo(true);
      }, VIDEO_MOUNT_DELAY);
    } else {
      setShowVideo(false);
    }

    return () => {
      if (videoTimerRef.current) {
        window.clearTimeout(videoTimerRef.current);
      }
    };
  }, [isOpen]);

  return (
    <section
      ref={sectionRef}
      aria-label="Video scroll"
      className="h-full"
    >
      <h3
        className="text-left text-2xl font-bold tracking-[0.02em] text-[#3f2310] sm:text-3xl"
        style={{ fontFamily: '"Cinzel", "Noto Serif Tamil", serif' }}
      >
        
      </h3>

      <p className="mt-2 text-left text-sm text-[#6d4118]"></p>

      <motion.div
        className="relative mx-auto mt-5"
        animate={{ width: isOpen ? "100%" : CLOSED_WIDTH, height: openHeight }}
        transition={{
          type: "tween",
          duration: isOpen ? 0.82 : 0.45,
          ease: [0.22, 1, 0.36, 1],
          delay: isOpen ? 0.12 : 0,
        }}
      >
        <div className="pointer-events-none absolute -bottom-4 inset-x-8 h-7 rounded-full bg-[#5e3616]/25 blur-md" aria-hidden="true" />

        <Roll side="left" isOpen={isOpen} />
        <Roll side="right" isOpen={isOpen} />

        <motion.div
          animate={{
            scaleX: isOpen ? 1 : 0.08,
            opacity: isOpen ? 1 : 0.85,
            clipPath: isOpen
              ? "inset(0% 0% 0% 0% round 14px)"
              : "inset(0% 48% 0% 48% round 14px)",
          }}
          transition={{
            scaleX: {
              type: "tween",
              duration: isOpen ? 0.88 : 0.35,
              ease: [0.2, 0.9, 0.24, 1],
              delay: isOpen ? 0.24 : 0,
            },
            opacity: { duration: 0.44, delay: isOpen ? 0.24 : 0, ease: "easeOut" },
            clipPath: {
              duration: isOpen ? 0.92 : 0.36,
              delay: isOpen ? 0.24 : 0,
              ease: [0.33, 1, 0.68, 1],
            },
          }}
          style={{ transformOrigin: "center center" }}
          className="absolute bottom-6 left-7 right-7 top-6 overflow-hidden rounded-[14px] border border-[#9e7142]/70 bg-[#f5deb3]"
        >
          <div className="absolute inset-0 bg-linear-to-b from-[#f5deb3] to-[#e6cfa7]" />
          <div className="pointer-events-none absolute inset-0 shadow-[inset_0_1px_1px_rgba(255,248,229,0.9),inset_0_-10px_20px_rgba(90,52,20,0.2),inset_10px_0_16px_rgba(98,56,24,0.16),inset_-10px_0_16px_rgba(98,56,24,0.16)]" />

          <div className="relative flex h-full items-center p-3 sm:p-4">
            {showVideo ? (
              <div className="w-full overflow-hidden rounded-xl border border-[#ac7b46] bg-[#efd7ad] shadow-[0_8px_16px_rgba(90,52,20,0.2)]">
                <div className="relative mx-auto aspect-video w-full">
                  <iframe
                    title="CICT YouTube Video"
                    className="absolute inset-0 h-full w-full"
                    src="https://www.youtube.com/embed/DYfZdQI2Zcs?autoplay=1&rel=0"
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                </div>
              </div>
            ) : null}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default CictScrollSection;
