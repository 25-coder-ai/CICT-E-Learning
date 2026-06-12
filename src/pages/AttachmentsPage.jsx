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
    <div style={{ fontFamily: '"Tiro Tamil", serif' }}>
      <h3
        className="text-3xl font-normal tracking-[0.02em] text-[#E8ECEF] [text-shadow:0_2px_8px_rgba(8,31,28,0.9),0_1px_3px_rgba(8,31,28,0.8)] sm:text-4xl"
        style={{ fontFamily: '"Tiro Tamil", serif' }}
      >
        இணைப்புகள்
      </h3>

      <p className="mt-2 text-lg font-normal text-[#E8ECEF] [text-shadow:0_2px_8px_rgba(8,31,28,0.9),0_1px_3px_rgba(8,31,28,0.8)] sm:text-xl">
        WEB LINKS
      </p>

      <ul className="mt-5 space-y-3">
        {webLinks.map((link, index) => (
          <li key={index} className="flex items-start gap-3">
            <span className="mt-2.5 h-3 w-3 shrink-0 rounded-full bg-[#457472]" />
            <a
              href={link.href}
              target={link.href !== "#" ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="text-lg font-normal leading-9 text-[#E8ECEF] [text-shadow:0_2px_8px_rgba(8,31,28,0.9),0_1px_3px_rgba(8,31,28,0.8)] underline-offset-2 transition-colors duration-200 hover:text-[#E8ECEF]/70 hover:underline sm:text-xl"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AttachmentsPage;
