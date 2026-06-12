const Header = ({ isMenuOpen, onMenuToggle, isGlass }) => {
  return (
    <header
      className={`relative border-b text-white shadow-[inset_0_-1px_0_rgba(0,0,0,0.3)] backdrop-blur-md ${
        isGlass
          ? 'border-white/10 bg-black/45'
          : 'border-[#7a3f10] bg-[#7a3f10]'
      }`}
    >
      <div className="mx-auto grid max-w-7xl items-center gap-4 px-6 py-5 md:grid-cols-[1fr_auto_1fr]">
        <div className="flex items-center justify-center gap-3 md:justify-self-start">
          <button
            type="button"
            aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            title={isMenuOpen ? "Close Menu" : "Open Menu"}
            onClick={onMenuToggle}
            className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/30 bg-white/15 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_4px_10px_rgba(0,0,0,0.3)] transition-all duration-300 hover:scale-105 hover:bg-white/25"
          >
            <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
              <path
                d="M6 7h12M5 12h14M7 17h10"
                stroke="currentColor"
                strokeWidth="1.9"
                strokeLinecap="round"
              />
              <path
                d="M4 4h16v16H4z"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinejoin="round"
                opacity="0.7"
              />
            </svg>
          </button>

          <img
            src="/logo.png"
            alt="CICT Logo"
            className="h-14 w-14 rounded-full border border-white/40 object-cover shadow-md"
            style={{ mixBlendMode: 'multiply' }}
          />
        </div>

        <div className="text-center md:min-w-135">
          <h1
            className="text-2xl font-bold tracking-[0.03em] text-white sm:text-3xl"
            style={{ fontFamily: '"Tiro Tamil", serif' }}
          >
            செம்மொழித் தமிழாய்வு மத்திய நிறுவனம்
          </h1>
          <p className="mt-1 text-base font-semibold tracking-[0.06em] text-[#E7BC91] sm:text-xl">
            அரசு கல்வி இணையவழி தளம்
          </p>
        </div>

        <div className="flex w-full flex-nowrap items-center justify-center gap-2 whitespace-nowrap sm:gap-3 md:w-auto md:justify-self-end">
          <button
            type="button"
            aria-label="Translate"
            title="Translate"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-white/15 text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)] transition-all duration-300 hover:scale-105 hover:bg-white/25"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="h-5 w-5"
              aria-hidden="true"
            >
              <path
                d="M12 3a9 9 0 100 18 9 9 0 000-18zM3 12h18M12 3c2.8 2.4 2.8 16.6 0 18M12 3c-2.8 2.4-2.8 16.6 0 18"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="sr-only">Translate</span>
          </button>

          <button className="h-10 rounded-full border border-white/40 bg-white/20 px-4 text-sm font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_5px_12px_rgba(0,0,0,0.25)] transition-all duration-300 hover:-translate-y-0.5 hover:scale-105 hover:bg-white/30">
            Login
          </button>
          <button className="h-10 rounded-full border border-white/30 bg-transparent px-4 text-sm font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] transition-all duration-300 hover:-translate-y-0.5 hover:scale-105 hover:bg-white/15">
            Register
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
