const Sidebar = () => {
  return (
    <aside className="rounded-2xl border border-[#A58D66]/75 bg-linear-to-b from-[#C0D5D6]/84 to-[#E5E1DD]/78 p-6 shadow-[inset_0_1px_0_rgba(192,213,214,0.45),0_12px_28px_rgba(8,58,79,0.2)] backdrop-blur-sm">
      <h3
        className="text-xl font-bold tracking-[0.02em] text-[#083A4F]"
        style={{ fontFamily: '"Cinzel", "Noto Serif Tamil", serif' }}
      >
        About CICT
      </h3>

      <div className="mt-4 overflow-hidden rounded-xl border border-[#A58D66] bg-[#C0D5D6] shadow-sm">
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
              <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-2xl text-[#407E8C] shadow-md">
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
        className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#407E8C] transition-all duration-300 hover:underline"
      >
        Explore Video Lecture Library
        <span aria-hidden="true">→</span>
      </a>
    </aside>
  );
};

export default Sidebar;
