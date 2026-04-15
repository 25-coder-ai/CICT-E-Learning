const ContentSection = () => {
  return (
    <section
      aria-labelledby="classical-tamil-online-title"
      className="rounded-2xl border border-[#b98a53]/50 bg-linear-to-b from-[#f1d4a2]/38 to-[#e1b985]/30 p-6 text-center shadow-[inset_0_1px_0_rgba(255,244,219,0.52),0_14px_30px_rgba(86,52,22,0.18)] backdrop-blur-md sm:p-8"
    >
      <h3
        id="classical-tamil-online-title"
        className="text-2xl font-bold tracking-[0.02em] text-[#3f2310] sm:text-3xl"
        style={{ fontFamily: '"Cinzel", "Noto Serif Tamil", serif' }}
      >
        Classical Tamil Online
      </h3>
      <p className="mt-3 text-lg font-medium text-[#6d4118]">அன்புடன் வரவேற்கிறோம்</p>

      <div className="mx-auto mt-6 max-w-5xl space-y-4 text-[15px] leading-8 text-[#3f2f20] sm:text-base">
        <p>
          செம்மொழித் தமிழாய்வு மத்திய நிறுவனம் வழங்கும் Classical Tamil Online தளம்,
          உலகம் முழுவதும் உள்ள தமிழ் மாணவர்கள், ஆராய்ச்சியாளர்கள் மற்றும் தமிழ் ஆர்வலர்களுக்காக
          உருவாக்கப்பட்ட ஒழுங்கமைக்கப்பட்ட மின்கற்றல் சூழல் ஆகும்.
        </p>
        <p>
          பாடத்திட்ட அடிப்படையிலான உள்ளடக்கம், காட்சி-ஒலி வளங்கள், மற்றும் வழிகாட்டும் கற்றல்
          கருவிகள் ஆகியவை ஒருங்கிணைந்து, தரமான தமிழ்க் கல்வியை எப்போதும் எங்கும் அடைய உதவுகிறது.
        </p>
      </div>
    </section>
  );
};

export default ContentSection;
