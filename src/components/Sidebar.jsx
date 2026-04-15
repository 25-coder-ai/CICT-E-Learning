const Sidebar = () => {
  return (
    <aside className="rounded-2xl border border-[#97612f]/75 bg-linear-to-b from-[#f1d4a2]/84 to-[#e1b985]/78 p-6 shadow-[inset_0_1px_0_rgba(255,232,188,0.45),0_12px_28px_rgba(86,52,22,0.2)] backdrop-blur-sm">
      <h3
        className="text-xl font-bold tracking-[0.02em] text-[#3f2310]"
        style={{ fontFamily: '"Cinzel", "Noto Serif Tamil", serif' }}
      >
        About CICT
      </h3>

      <div className="mt-4 overflow-hidden rounded-xl border border-[#ac7b46] bg-[#efd7ad] shadow-sm">
        {!isVideoPlaying ? (
          <button
            type="button"
            onClick={() => setIsVideoPlaying(true)}
            className="group relative block w-full"
            aria-label="Play video lecture"
          >
            <img
              src={`https://img.youtube.com/vi/DYfZdQI2Zcs/hqdefault.jpg`}
              alt="Video lecture preview"
              className="h-44 w-full object-cover transition-all duration-300 group-hover:scale-105"
              loading="lazy"
            />
            <span className="absolute inset-0 bg-black/25 transition-colors duration-300 group-hover:bg-black/35" />
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-2xl text-[#6d4118] shadow-md">
                ▶
              </span>
            </span>
          </button>
        ) : (
          <div className="relative w-full pt-[56.25%]">
            <iframe
              title="YouTube Video Lecture"
              className="absolute inset-0 h-full w-full"
              src={`https://www.youtube.com/embed/DYfZdQI2Zcs?autoplay=1&rel=0`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        )}
      </div>

      <a
        href="https://youtu.be/DYfZdQI2Zcs?si=g69RAMfhzTivMUsh"
        target="_blank"
        rel="noreferrer"
        className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#6d4118] transition-all duration-300 hover:underline"
      >
        Explore Video Lecture Library
        <span aria-hidden="true">→</span>
      </a>
    </aside>
  );
};

export default Sidebar;
