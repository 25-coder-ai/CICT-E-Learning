const LearnersPage = () => {
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
        கற்போர்
      </h3>

      {/* LEARNER label */}
      <p
        className="mt-1 text-xs font-bold uppercase tracking-widest text-[#b98a53]"
        style={{ fontFamily: '"Cinzel", serif' }}
      >
        Learner
      </p>

      {/* Divider */}
      <div className="mt-4 h-px w-full bg-[#b98a53]/40" />

      {/* Paragraph 1 */}
      <p className="mt-5 text-[15px] leading-8 text-[#3f2f20] sm:text-base">
        <strong className="font-bold text-[#3f2310]">
          இணையவழிச் செம்மொழித் தமிழ்,
        </strong>{" "}
        கற்க விழைவோர் அனைவருக்கும் இலவசமாக வழங்கப் படுகிறது. இப்பாடவதுபில்
        இணைந்து கற்க விரும்புவோர் வயது வந்தவராகவும், செம்மொழித் தமிழ்
        இலக்கியங்கள் பற்றிய பொது அறிவை தகுதியாகக் கொண்டவராகவும் இருத்தல்
        நல்லது. தமிழ்ச் செம்மொழி இலக்கியங்களை அடிப்படை மிகுந்த ஆர்வமுடையவராகவும்,
        தமிழ் பண்பாடு குறித்த நேர் சிந்தனை மனப்பாங்கு கொண்டவராகவும் இருத்தல்
        வேண்டும். இக்கல்வி குறைவு மற்றும் எதிர் மனப்பாங்கு கொண்டவருக்கு
        இவ்வினையவழிக் கற்றல் உதவ தகுதியாகாது.
      </p>

      {/* Paragraph 2 */}
      <p className="mt-5 text-[15px] leading-8 text-[#3f2f20] sm:text-base">
        <strong className="font-bold text-[#3f2310]">
          இணையவழிச் செம்மொழித் தமிழ்,
        </strong>{" "}
        கற்போரை மையமாகக் கொண்ட தனிப் பயிற்சி. கற்போர் நாம் கற்க இயலும்
        நேரத்தறையும் நம் அடிவயிற்று நோக்கமும் தடையின்றி வழங்குவோம். கற்போர்
        அனைவரும் இவ்வினையவழிக் கல்வியில் நம்பிக்கை நிலையை ஆய்ந்து திறனடையாரை
        திறனடைத்துப் பயிற்றி பெற மாணவர் நிறுவனத்தை தொடர்பு கொள்ளலாம்.
        இவ்வினையவழிக் கல்வித் திட்டத்தின் இலக்குகள் மற்றும் குறிகோள்களை
        அடையவும், கற்போர் அனைவரும் சம வாய்ப்பு பெறுவதை உறுதி செய்யவும்
        கற்றல் குறைவை நிரப்பும் பயிற்சித் தடங்களை உருவாக்கச் செம்மொழித்
        தமிழாய்வு மத்திய நிறுவனம் திட்டமிட்டுள்ளது.
      </p>
    </section>
  );
};

export default LearnersPage;
