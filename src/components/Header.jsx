const Header = ({ isMenuOpen, onMenuToggle }) => {
  return (
    <header className="border-b border-[#936531]/85 bg-linear-to-r from-[#ead0a1]/90 via-[#ddb882]/88 to-[#e8cd9f]/90 text-[#4a2c14] shadow-[inset_0_-1px_0_rgba(87,55,24,0.5),0_10px_22px_rgba(84,58,32,0.24)] backdrop-blur-md">
      <div className="mx-auto grid max-w-7xl items-center gap-4 px-6 py-5 md:grid-cols-[1fr_auto_1fr]">
        <div className="flex items-center justify-center gap-3 md:justify-self-start">
          <button
            type="button"
            aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            title={isMenuOpen ? "Close Menu" : "Open Menu"}
            onClick={onMenuToggle}
            className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-[#946837]/90 bg-linear-to-b from-[#b98a4c] to-[#8e5e2c] text-[#fff4dd] shadow-[inset_0_1px_0_rgba(255,233,194,0.35),0_4px_10px_rgba(74,45,19,0.28)] transition-all duration-300 hover:scale-105 hover:from-[#a9783e] hover:to-[#7f5123]"
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
            src="/emblem.svg"
            alt="Government emblem"
            className="h-14 w-14 rounded-full border border-[#d5b888]/80 bg-white/55 p-1 shadow-md"
          />
        </div>

        <div className="text-center md:min-w-135">
          <h1
            className="text-2xl font-bold tracking-[0.03em] text-[#41240f] [text-shadow:0_1px_0_rgba(255,235,199,0.75)] sm:text-3xl"
            style={{ fontFamily: '"Cinzel", "Noto Serif Tamil", serif' }}
          >
            செம்மொழித் தமிழாய்வு மத்திய நிறுவனம்
          </h1>
          <p className="mt-1 text-base font-semibold tracking-[0.06em] text-[#633f1d] sm:text-xl">
            அரசு கல்வி இணையவழி தளம்
          </p>
        </div>

        <div className="flex w-full flex-nowrap items-center justify-center gap-2 whitespace-nowrap sm:gap-3 md:w-auto md:justify-self-end">
          <button
            type="button"
            aria-label="Translate"
            title="Translate"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#aa7d44]/80 bg-[#f8ebd0]/82 text-[#6e4b28] shadow-[inset_0_0_0_1px_rgba(255,244,220,0.5)] transition-all duration-300 hover:scale-105 hover:bg-[#f3dfb6]"
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

          <button className="h-10 rounded-full border border-[#8f652f] bg-linear-to-r from-[#9a6a31] to-[#b5813f] px-4 text-sm font-semibold text-[#fff6e4] shadow-[inset_0_1px_0_rgba(255,239,204,0.35),0_5px_12px_rgba(90,58,27,0.25)] transition-all duration-300 hover:-translate-y-0.5 hover:scale-105 hover:from-[#885b28] hover:to-[#a67335]">
            Login
          </button>
          <button className="h-10 rounded-full border border-[#996d3a] bg-[#f8ecd3]/72 px-4 text-sm font-semibold text-[#623f20] shadow-[inset_0_1px_0_rgba(255,248,231,0.5)] transition-all duration-300 hover:-translate-y-0.5 hover:scale-105 hover:bg-[#f3e1bc]">
            Register
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
