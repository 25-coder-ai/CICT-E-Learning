const webLinks = [
  { label: "சென்னைப்பல்கலைக்கழகப் பேரகராதி", href: "#" },
  { label: "தமிழ் மொழி அகராதி", href: "#" },
  { label: "டேவிட் டபிள்யூ.மெக் அல்பின் தமிழ்ச் சொற்களஞ்சியம்", href: "#" },
  { label: "தமிழ் இணையக் கல்விக்கழகம்", href: "#" },
  { label: "மதுரைத் திட்டம்", href: "#" },
  { label: "உலகத் தமிழாராய்ச்சி நிறுவனம்", href: "#" },
  { label: "நூலகம்", href: "#" },
  { label: "பத்துப்பாட்டு-பன்முக ஆய்வு", href: "#" },
  { label: "பிரெஞ்சு நிறுவன நூலகம்", href: "#" },
  { label: "புறம்400", href: "#" },
  { label: "தமிழம்.வலை", href: "#" },
  { label: "சங்கத் தமிழ் கற்க", href: "#" },
  { label: "classicaltamil.org", href: "https://classicaltamil.org" },
  { label: "கற்க... நிற்க ...", href: "#" },
  { label: "தமிழ் இலக்கியம்", href: "#" },
  { label: "Sangam Poems in English", href: "#" },
  { label: "Sangam Tamil Literature", href: "#" },
];

const AttachmentsPage = () => {
  return (
    <section
      className="rounded-2xl border border-[#b98a53]/50 bg-linear-to-b from-[#f1d4a2]/34 to-[#e1b985]/26 p-6 shadow-[inset_0_1px_0_rgba(255,244,219,0.52),0_14px_30px_rgba(86,52,22,0.16)] backdrop-blur-md sm:p-8"
      style={{ fontFamily: '"Noto Serif Tamil", "Cormorant Garamond", serif' }}
    >
      {/* Page title */}
      <h3
        className="text-2xl font-bold tracking-[0.02em] text-[#3f2310] sm:text-3xl"
        style={{ fontFamily: '"Cinzel", "Noto Serif Tamil", serif' }}
      > 
        இணைப்புகள்
      </h3>

      {/* Section subtitle */}
      <p className="mt-3 text-sm font-bold tracking-widest text-[#7a4e22] sm:text-base">
        WEB LINKS
      </p>

      {/* Divider */}
      <div className="mt-3 h-px w-full bg-[#b98a53]/40" />

      {/* Links list */}
      <ul className="mt-4 space-y-2.5">
        {webLinks.map((link, index) => (
          <li key={index}>
            <a
              href={link.href}
              target={link.href !== "#" ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="group flex items-center gap-3 transition-colors duration-200"
            >
              {/* Arrow bullet icon */}
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#8B6240] shadow-sm transition-colors duration-200 group-hover:bg-[#6B3F1A]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-3.5 w-3.5 text-[#f5e6c8]"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>

              {/* Link label */}
              <span className="text-[15px] leading-7 text-[#4b2f17] underline-offset-2 group-hover:text-[#6B3F1A] group-hover:underline sm:text-base">
                {link.label}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default AttachmentsPage;
