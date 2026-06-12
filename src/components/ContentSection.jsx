const ContentSection = () => {
  return (
    <section
      aria-labelledby="classical-tamil-online-title"
      style={{ fontFamily: '"Tiro Tamil", serif' }}
    >
      <h3
        id="classical-tamil-online-title"
        className="text-3xl font-normal tracking-[0.02em] text-[#E8ECEF] [text-shadow:0_2px_8px_rgba(8,31,28,0.9),0_1px_3px_rgba(8,31,28,0.8)] sm:text-4xl"
        style={{ fontFamily: '"Tiro Tamil", serif' }}
      >
        Classical Tamil Online
      </h3>
      <p className="mt-2 text-lg font-normal text-[#E8ECEF] [text-shadow:0_2px_8px_rgba(8,31,28,0.9),0_1px_3px_rgba(8,31,28,0.8)] sm:text-xl">
        அன்புடன் வரவேற்கிறோம்
      </p>

      <div className="mt-5 space-y-4 text-lg font-normal leading-10 text-[#E8ECEF] [text-shadow:0_2px_8px_rgba(8,31,28,0.9),0_1px_3px_rgba(8,31,28,0.8)] sm:text-xl">
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
