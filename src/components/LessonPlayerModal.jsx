import { useEffect } from "react";

/**
 * LessonPlayerModal
 * ─────────────────────────────────────────────────────────────
 * In-page popup window that plays the standalone Kuruntokai
 * lesson app (built into /public/muli-lesson) inside an iframe.
 *
 * The lesson app is embedded untouched — only loaded when open,
 * so closing the popup fully stops any audio/video playing inside.
 * ─────────────────────────────────────────────────────────────
 */
const LESSON_SRC = "/muli-lesson/index.html";

const LessonPlayerModal = ({ open, onClose, src = LESSON_SRC, title = "குறுந்தொகை — பாடம்" }) => {
  // Close on Escape + lock background scroll while open
  useEffect(() => {
    if (!open) return undefined;

    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose?.();
    };
    document.addEventListener("keydown", onKeyDown);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
        background: "rgba(38, 21, 8, 0.62)",
        backdropFilter: "blur(2px)",
      }}
    >
      {/* Window */}
      <div
        onClick={(event) => event.stopPropagation()}
        style={{
          position: "relative",
          width: "min(1024px, 94vw)",
          height: "min(700px, 88vh)",
          display: "flex",
          flexDirection: "column",
          background: "#1b1b1b",
          borderRadius: "12px",
          overflow: "hidden",
          border: "1px solid rgba(143, 97, 45, 0.85)",
          boxShadow: "0 24px 60px rgba(0,0,0,0.5)",
        }}
      >
        {/* Title bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "12px",
            padding: "10px 14px",
            background: "linear-gradient(to right,#c79258,#a66f3f)",
            color: "#2f1b0d",
            flexShrink: 0,
          }}
        >
          <span
            style={{
              fontWeight: 700,
              fontSize: "15px",
              fontFamily: '"Noto Serif Tamil", "Cormorant Garamond", serif',
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {title}
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="மூடு / Close"
            style={{
              flexShrink: 0,
              width: "30px",
              height: "30px",
              borderRadius: "50%",
              border: "1px solid rgba(79, 47, 21, 0.7)",
              background: "#f2dfbc",
              color: "#4f2f15",
              fontSize: "16px",
              fontWeight: 700,
              lineHeight: 1,
              cursor: "pointer",
            }}
          >
            ×
          </button>
        </div>

        {/* Lesson app */}
        <iframe
          src={src}
          title={title}
          style={{
            flex: 1,
            width: "100%",
            border: "none",
            background: "#fff",
          }}
          allow="autoplay; fullscreen"
        />
      </div>
    </div>
  );
};

export default LessonPlayerModal;
