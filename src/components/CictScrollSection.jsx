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
      ? "left-0 bg-linear-to-r from-[#3B1F0E] via-[#7A4520] to-[#A87355]"
      : "right-0 bg-linear-to-l from-[#3B1F0E] via-[#7A4520] to-[#A87355]";

  return (
    <motion.div
      aria-hidden="true"
      animate={{ x: isOpen ? (side === "left" ? -14 : 14) : 0, scale: isOpen ? 1.02 : 1 }}
      transition={{ ...springTransition, stiffness: 110, damping: 24 }}
      className={`absolute bottom-4 top-4 z-30 w-11 rounded-full border border-[#3B1F0E]/60 ${sideClass} shadow-[inset_6px_0_10px_rgba(59,31,14,0.42),inset_-5px_0_9px_rgba(168,115,85,0.3),0_5px_12px_rgba(59,31,14,0.35)]`}
    >
      <div className="absolute -top-2 left-1/2 h-7 w-7 -translate-x-1/2 rounded-full border border-[#3B1F0E]/65 bg-radial from-[#E5E1DD] via-[#A87355] to-[#3B1F0E]" />
      <div className="absolute -bottom-2 left-1/2 h-7 w-7 -translate-x-1/2 rounded-full border border-[#3B1F0E]/65 bg-radial from-[#E5E1DD] via-[#A87355] to-[#3B1F0E]" />
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
        className="text-left text-2xl font-normal tracking-[0.02em] text-[#E8ECEF] [text-shadow:0_2px_8px_rgba(8,31,28,0.9),0_1px_3px_rgba(8,31,28,0.8)] sm:text-3xl"
        style={{ fontFamily: '"Tiro Tamil", serif' }}
      >

      </h3>

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
        <div className="pointer-events-none absolute -bottom-4 inset-x-8 h-7 rounded-full bg-[#3B1F0E]/25 blur-md" aria-hidden="true" />

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
          className="absolute bottom-6 left-7 right-7 top-6 overflow-hidden rounded-[14px] border border-[#A58D66]/70 bg-[#E5E1DD]"
        >
          <div className="absolute inset-0 bg-linear-to-b from-[#E5E1DD] to-[#C0D5D6]" />
          <div className="pointer-events-none absolute inset-0 shadow-[inset_0_1px_1px_rgba(229,225,221,0.9),inset_0_-10px_20px_rgba(8,58,79,0.15),inset_10px_0_16px_rgba(8,58,79,0.1),inset_-10px_0_16px_rgba(8,58,79,0.1)]" />

          <div className="relative flex h-full items-center p-3 sm:p-4">
            {showVideo ? (
              <div className="w-full overflow-hidden rounded-xl border border-[#A58D66] bg-[#C0D5D6] shadow-[0_8px_16px_rgba(8,58,79,0.2)]">
                <div className="relative mx-auto aspect-video w-full">
                  <iframe
                    title="YouTube video player"
                    className="absolute inset-0 h-full w-full"
                    src="https://www.youtube.com/embed/DYfZdQI2Zcs?si=WtaU4I2ywA2ltgKP"
                    frameBorder="0"
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
