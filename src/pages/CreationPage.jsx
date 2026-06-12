const AvatarPlaceholder = ({ female = false }) => (
  <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" className="h-full w-full rounded-md object-cover">
    <rect width="80" height="80" fill={female ? "#d4b8a0" : "#b0bec5"} />
    <circle cx="40" cy="30" r="16" fill={female ? "#8d6e63" : "#78909c"} />
    <ellipse cx="40" cy="70" rx="24" ry="18" fill={female ? "#8d6e63" : "#78909c"} />
  </svg>
);

const textStyle = "text-[#E8ECEF] [text-shadow:0_2px_8px_rgba(8,31,28,0.9),0_1px_3px_rgba(8,31,28,0.8)]";

const PersonCard = ({ tamilName, englishName, imgSrc, female = false }) => (
  <div className="flex items-center gap-4 py-2">
    <div className="h-16 w-16 shrink-0 overflow-hidden rounded-md border border-[#E8ECEF]/30 shadow-sm">
      {imgSrc ? (
        <img src={imgSrc} alt={englishName} className="h-full w-full rounded-md object-cover"
          onError={(e) => { e.currentTarget.style.display = "none"; }} />
      ) : (
        <AvatarPlaceholder female={female} />
      )}
    </div>
    <div>
      <p className={`font-semibold text-[14px] leading-6 ${textStyle}`} style={{ fontFamily: '"Tiro Tamil", serif' }}>
        {tamilName}
      </p>
      <p className={`text-[13px] leading-5 ${textStyle}`}>{englishName}</p>
    </div>
  </div>
);

const SectionLabel = ({ tamil, english }) => (
  <div className="mt-7 mb-2">
    <p className={`text-[13px] leading-5 ${textStyle}`} style={{ fontFamily: '"Tiro Tamil", serif' }}>
      {tamil}
    </p>
    <p className={`text-[15px] font-bold tracking-wide ${textStyle}`} style={{ fontFamily: '"Tiro Tamil", serif' }}>
      {english}
    </p>
  </div>
);

const director = { tamilName: "பேராசிரியர் இரா. சந்திரசேகரன்", englishName: "Prof. R. Chandrasekaran", imgSrc: "/profile.jpg" };

const courseDesign = [{ tamilName: "பேராசிரியர் சு.இராசாராம்", englishName: "Prof. S. Rajaram", imgSrc: "/profile.jpg" }];

const contentDevelopment = [
  { tamilName: "பேராசிரியர் அன்னி தாமசு", englishName: "Prof. Annie Thomas", imgSrc: null, female: true },
  { tamilName: "பேராசிரியர் சு.இராசாராம்", englishName: "Prof. S. Rajaram", imgSrc: "/profile.jpg" },
  { tamilName: "முனைவர் ந.தேவி", englishName: "Dr. N. Devi", imgSrc: null, female: true },
];

const webDevelopment = [{ tamilName: "திரு சு. கார்த்திகேயன்", englishName: "Mr. S. Karthikeyan", imgSrc: "/profile.jpg" }];

const faculty = [
  { tamilName: "முனைவர் ந.தேவி", englishName: "Dr. N. Devi", imgSrc: null, female: true },
  { tamilName: "முனைவர் ந.பெரியசாமி", englishName: "Dr. N. Periasamy", imgSrc: "/profile.jpg" },
  { tamilName: "திரு சு. கார்த்திகேயன்", englishName: "Mr. S. Karthikeyan", imgSrc: "/profile.jpg" },
  { tamilName: "முனைவர் இரா. அகிலன்", englishName: "Dr. R. Akilan", imgSrc: "/profile.jpg" },
];

const subjectExperts = [
  { tamilName: "பேராசிரியர் சாம் மோகன்லால்", englishName: "Prof. Sam Mohan Lal", imgSrc: "/profile.jpg" },
  { tamilName: "பேராசிரியர் எஸ்.சுப்பிரமணியன்", englishName: "Prof. S. Subramanian", imgSrc: "/profile.jpg" },
  { tamilName: "முனைவர் ம.நயினார்", englishName: "Dr. M. Nainar", imgSrc: "/profile.jpg" },
  { tamilName: "பேராசிரியர் இல.குளோரியா சுந்தரமதி", englishName: "Prof. L. Gloria Sundramathi", imgSrc: null, female: true },
  { tamilName: "பேராசிரியர் கி.நாச்சிமுத்து", englishName: "Prof. K. Nachimuthu", imgSrc: null },
  { tamilName: "முனைவர் இந்திரா மனுவேல்", englishName: "Dr. Indra Manuel", imgSrc: null, female: true },
  { tamilName: "முனைவர் அரிமளம் சு.பத்மநாபன்", englishName: "Dr. Arimalam S. Padmanabhan", imgSrc: "/profile.jpg" },
  { tamilName: "முனைவர் விமலா நடராஜன்", englishName: "Dr. Vimala Nadarajan", imgSrc: null, female: true },
];

const CreationPage = ({ onNavigate }) => {
  return (
    <div style={{ fontFamily: '"Tiro Tamil", serif' }}>
      <h3 className={`text-3xl font-normal tracking-[0.02em] sm:text-4xl ${textStyle}`} style={{ fontFamily: '"Tiro Tamil", serif' }}>
        உருவாக்கம்
      </h3>
      <p className={`mt-2 text-lg font-normal sm:text-xl ${textStyle}`}>Credits</p>

      <SectionLabel tamil="இயக்குநர்" english="DIRECTOR" />
      <PersonCard {...director} />

      <SectionLabel tamil="பாடத்திட்டமும் பயிற்சி வடிவமைப்பும்" english="COURSE AND INSTRUCTIONAL DESIGN" />
      {courseDesign.map((p) => <PersonCard key={p.englishName} {...p} />)}

      <SectionLabel tamil="பாடப்பொருள் உருவாக்கம்" english="CONTENT DEVELOPMENT" />
      {contentDevelopment.map((p) => <PersonCard key={p.englishName + p.tamilName} {...p} />)}

      <div className="mt-5 h-px w-full bg-[#E8ECEF]/20" />

      <SectionLabel tamil="இணையவடிவமைப்பு" english="WEB DEVELOPMENT" />
      {webDevelopment.map((p) => <PersonCard key={p.englishName} {...p} />)}

      <SectionLabel tamil="கல்வியாளர்" english="FACULTY" />
      {faculty.map((p) => <PersonCard key={p.englishName + p.tamilName} {...p} />)}

      <SectionLabel tamil="வல்லுநர்" english="SUBJECT EXPERTS" />
      {subjectExperts.map((p) => <PersonCard key={p.englishName} {...p} />)}

      <button
        type="button"
        onClick={() => onNavigate?.("acknowledgement")}
        className="mt-7 mb-2 block w-full text-left rounded-xl border border-[#E8ECEF]/20 p-3 transition-all hover:border-[#E8ECEF]/40 hover:bg-[#E8ECEF]/10"
      >
        <p className={`text-[13px] leading-5 ${textStyle}`} style={{ fontFamily: '"Tiro Tamil", serif' }}>நன்றி</p>
        <p className={`text-[15px] font-bold tracking-wide ${textStyle}`} style={{ fontFamily: '"Tiro Tamil", serif' }}>ACKNOWLEDGEMENT</p>
      </button>
    </div>
  );
};

export default CreationPage;
