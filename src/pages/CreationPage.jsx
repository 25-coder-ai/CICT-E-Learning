/* ─────────────────────────────────────────────
   CreationPage – உருவாக்கம் / Credits
   ───────────────────────────────────────────── */

/** Inline SVG placeholder for missing photos */
const AvatarPlaceholder = ({ female = false }) => (
  <svg
    viewBox="0 0 80 80"
    xmlns="http://www.w3.org/2000/svg"
    className="h-full w-full rounded-md object-cover"
  >
    <rect width="80" height="80" fill={female ? "#d4b8a0" : "#b0bec5"} />
    <circle cx="40" cy="30" r="16" fill={female ? "#8d6e63" : "#78909c"} />
    <ellipse cx="40" cy="70" rx="24" ry="18" fill={female ? "#8d6e63" : "#78909c"} />
  </svg>
);

/** Single person card */
const PersonCard = ({ tamilName, englishName, imgSrc, female = false }) => (
  <div className="flex items-center gap-4 py-2">
    {/* Photo */}
    <div className="h-16 w-16 shrink-0 overflow-hidden rounded-md border border-[#b98a53]/40 shadow-sm">
      {imgSrc ? (
        <img
          src={imgSrc}
          alt={englishName}
          className="h-full w-full rounded-md object-cover"
          onError={(e) => { e.currentTarget.style.display = "none"; }}
        />
      ) : (
        <AvatarPlaceholder female={female} />
      )}
    </div>
    {/* Names */}
    <div>
      <p
        className="font-semibold text-[#0e8aad] text-[14px] leading-6"
        style={{ fontFamily: '"Noto Serif Tamil", serif' }}
      >
        {tamilName}
      </p>
      <p className="text-[13px] text-[#3f2f20] leading-5">{englishName}</p>
    </div>
  </div>
);

/** Section label block */
const SectionLabel = ({ tamil, english }) => (
  <div className="mt-7 mb-2">
    <p
      className="text-[13px] text-[#b98a53] leading-5"
      style={{ fontFamily: '"Noto Serif Tamil", serif' }}
    >
      {tamil}
    </p>
    <p
      className="text-[15px] font-bold text-[#3f2310] tracking-wide"
      style={{ fontFamily: '"Cinzel", serif' }}
    >
      {english}
    </p>
  </div>
);

/* ── Data ── */

const director = {
  tamilName: "பேராசிரியர் இரா. சந்திரசேகரன்",
  englishName: "Prof. R. Chandrasekaran",
  imgSrc: "/profile.jpg",
};

const courseDesign = [
  {
    tamilName: "பேராசிரியர் சு.இராசாராம்",
    englishName: "Prof. S. Rajaram",
    imgSrc: "/profile.jpg",
  },
];

const contentDevelopment = [
  {
    tamilName: "பேராசிரியர் அன்னி தாமசு",
    englishName: "Prof. Annie Thomas",
    imgSrc: null,
    female: true,
  },
  {
    tamilName: "பேராசிரியர் சு.இராசாராம்",
    englishName: "Prof. S. Rajaram",
    imgSrc: "/profile.jpg",
  },
  {
    tamilName: "முனைவர் ந.தேவி",
    englishName: "Dr. N. Devi",
    imgSrc: null,
    female: true,
  },
];

const webDevelopment = [
  {
    tamilName: "திரு சு. கார்த்திகேயன்",
    englishName: "Mr. S. Karthikeyan",
    imgSrc: "/profile.jpg",
  },
];

const faculty = [
  {
    tamilName: "முனைவர் ந.தேவி",
    englishName: "Dr. N. Devi",
    imgSrc: null,
    female: true,
  },
  {
    tamilName: "முனைவர் ந.பெரியசாமி",
    englishName: "Dr. N. Periasamy",
    imgSrc: "/profile.jpg",
  },
  {
    tamilName: "திரு சு. கார்த்திகேயன்",
    englishName: "Mr. S. Karthikeyan",
    imgSrc: "/profile.jpg",
  },
  {
    tamilName: "முனைவர் இரா. அகிலன்",
    englishName: "Dr. R. Akilan",
    imgSrc: "/profile.jpg",
  },
];

const subjectExperts = [
  {
    tamilName: "பேராசிரியர் சாம் மோகன்லால்",
    englishName: "Prof. Sam Mohan Lal",
    imgSrc: "/profile.jpg",
  },
  {
    tamilName: "பேராசிரியர் எஸ்.சுப்பிரமணியன்",
    englishName: "Prof. S. Subramanian",
    imgSrc: "/profile.jpg",
  },
  {
    tamilName: "முனைவர் ம.நயினார்",
    englishName: "Dr. M. Nainar",
    imgSrc: "/profile.jpg",
  },
  {
    tamilName: "பேராசிரியர் இல.குளோரியா சுந்தரமதி",
    englishName: "Prof. L. Gloria Sundramathi",
    imgSrc: null,
    female: true,
  },
  {
    tamilName: "பேராசிரியர் கி.நாச்சிமுத்து",
    englishName: "Prof. K. Nachimuthu",
    imgSrc: null,
  },
  {
    tamilName: "முனைவர் இந்திரா மனுவேல்",
    englishName: "Dr. Indra Manuel",
    imgSrc: null,
    female: true,
  },
  {
    tamilName: "முனைவர் அரிமளம் சு.பத்மநாபன்",
    englishName: "Dr. Arimalam S. Padmanabhan",
    imgSrc: "/profile.jpg",
  },
  {
    tamilName: "முனைவர் விமலா நடராஜன்",
    englishName: "Dr. Vimala Nadarajan",
    imgSrc: null,
    female: true,
  },
];

/* ── Page Component ── */

const CreationPage = ({ onNavigate }) => {
  return (
    <section
      className="rounded-2xl border border-[#b98a53]/50 bg-linear-to-b from-[#f1d4a2]/34 to-[#e1b985]/26 p-6 shadow-[inset_0_1px_0_rgba(255,244,219,0.52),0_14px_30px_rgba(86,52,22,0.16)] backdrop-blur-md sm:p-8"
      style={{ fontFamily: '"Noto Serif Tamil", "Cormorant Garamond", serif' }}
    >
      {/* Page heading */}
      <h3
        className="text-2xl font-bold tracking-[0.02em] text-[#3f2310] sm:text-3xl"
        style={{ fontFamily: '"Cinzel", "Noto Serif Tamil", serif' }}
      >
        உருவாக்கம்
      </h3>

      {/* CREDITS label */}
      <p
        className="mt-1 text-xs font-bold uppercase tracking-widest text-[#b98a53]"
        style={{ fontFamily: '"Cinzel", serif' }}
      >
        Credits
      </p>

      {/* Divider */}
      <div className="mt-4 h-px w-full bg-[#b98a53]/40" />

      {/* ── DIRECTOR ── */}
      <SectionLabel tamil="இயக்குநர்" english="DIRECTOR" />
      <PersonCard {...director} />

      {/* ── COURSE AND INSTRUCTIONAL DESIGN ── */}
      <SectionLabel tamil="பாடத்திட்டமும் பயிற்சி வடிவமைப்பும்" english="COURSE AND INSTRUCTIONAL DESIGN" />
      {courseDesign.map((p) => (
        <PersonCard key={p.englishName} {...p} />
      ))}

      {/* ── CONTENT DEVELOPMENT ── */}
      <SectionLabel tamil="பாடப்பொருள் உருவாக்கம்" english="CONTENT DEVELOPMENT" />
      {contentDevelopment.map((p) => (
        <PersonCard key={p.englishName + p.tamilName} {...p} />
      ))}

      {/* Thin rule before Web Development */}
      <div className="mt-5 h-px w-full bg-[#b98a53]/25" />

      {/* ── WEB DEVELOPMENT ── */}
      <SectionLabel tamil="இணையவடிவமைப்பு" english="WEB DEVELOPMENT" />
      {webDevelopment.map((p) => (
        <PersonCard key={p.englishName} {...p} />
      ))}

      {/* ── FACULTY ── */}
      <SectionLabel tamil="கல்வியாளர்" english="FACULTY" />
      {faculty.map((p) => (
        <PersonCard key={p.englishName + p.tamilName} {...p} />
      ))}

      {/* ── SUBJECT EXPERTS ── */}
      <SectionLabel tamil="வல்லுநர்" english="SUBJECT EXPERTS" />
      {subjectExperts.map((p) => (
        <PersonCard key={p.englishName} {...p} />
      ))}

      {/* ── ACKNOWLEDGEMENT ── */}
      <button
        type="button"
        onClick={() => onNavigate?.("acknowledgement")}
        className="mt-7 mb-2 block w-full text-left rounded-xl border border-transparent p-3 transition-all hover:border-[#b98a53]/40 hover:bg-[#b98a53]/10 hover:shadow-sm"
      >
        <p
          className="text-[13px] text-[#b98a53] leading-5"
          style={{ fontFamily: '"Noto Serif Tamil", serif' }}
        >
          நன்றி
        </p>
        <p
          className="text-[15px] font-bold text-[#3f2310] tracking-wide"
          style={{ fontFamily: '"Cinzel", serif' }}
        >
          ACKNOWLEDGEMENT
        </p>
      </button>
    </section>
  );
};

export default CreationPage;
