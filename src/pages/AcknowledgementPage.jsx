/* ─────────────────────────────────────────────
   AcknowledgementPage – நன்றி
   ───────────────────────────────────────────── */

const Red = ({ children, italic = false, bold = false }) => (
  <span
    className={`text-[#407E8C] ${italic ? "italic" : ""} ${bold ? "font-bold" : ""}`}
    style={{ fontFamily: '"Noto Serif Tamil", serif' }}
  >
    {children}
  </span>
);

const SectionHead = ({ children, italic = false }) => (
  <p className={`mt-5 mb-1 font-bold text-[14px] text-[#407E8C] leading-6 ${italic ? "italic" : ""}`}
    style={{ fontFamily: '"Noto Serif Tamil", serif' }}>
    {children}
  </p>
);

const SubHead = ({ children }) => (
  <p className="mt-3 mb-0.5 font-bold text-[14px] text-[#083A4F] leading-6"
    style={{ fontFamily: '"Noto Serif Tamil", serif' }}>
    {children}
  </p>
);

const Line = ({ children }) => (
  <p className="text-[13.5px] leading-7 text-[#083A4F] pl-4"
    style={{ fontFamily: '"Noto Serif Tamil", serif' }}>
    {children}
  </p>
);

const Rule = () => <div className="my-4 h-px w-full bg-[#A58D66]/30" />;

const AcknowledgementPage = () => {
  return (
    <section
      className="rounded-2xl border border-[#A58D66]/50 bg-linear-to-b from-[#C0D5D6]/38 to-[#E5E1DD]/50 p-6 shadow-[inset_0_1px_0_rgba(192,213,214,0.52),0_14px_30px_rgba(8,58,79,0.16)] backdrop-blur-md sm:p-8"
      style={{ fontFamily: '"Noto Serif Tamil", "Cormorant Garamond", serif' }}
    >
      {/* Header */}
      <div className="text-center mb-2">
        <p className="font-bold text-[15px] text-[#407E8C] leading-7"
          style={{ fontFamily: '"Noto Serif Tamil", serif' }}>
          செம்மொழித் தமிழாய்வு மத்திய நிறுவனம்
        </p>
        <p className="font-semibold text-[14px] text-[#083A4F] leading-7"
          style={{ fontFamily: '"Noto Serif Tamil", serif' }}>
          இணையவழிச் செம்மொழித் தமிழ்
        </p>
      </div>

      <div className="mt-4 h-px w-full bg-[#A58D66]/40" />

      {/* நன்றி */}
      <p className="mt-4 font-bold text-[15px] text-[#407E8C] underline underline-offset-4"
        style={{ fontFamily: '"Noto Serif Tamil", serif' }}>
        நன்றி
      </p>

      {/* Director block */}
      <div className="mt-3 space-y-0.5">
        <p className="text-[13.5px] font-semibold text-[#083A4F] leading-7"
          style={{ fontFamily: '"Noto Serif Tamil", serif' }}>
          செம்மொழித் தமிழாய்வு மத்திய நிறுவனம், சென்னை
        </p>
        <p className="text-[13.5px] font-bold text-[#083A4F] leading-7"
          style={{ fontFamily: '"Noto Serif Tamil", serif' }}>
          பேராசிரியர் இரா. சந்திரசேகரன்
        </p>
        <p className="text-[13.5px] font-bold text-[#083A4F] leading-7"
          style={{ fontFamily: '"Noto Serif Tamil", serif' }}>
          இயக்குநர்
        </p>
      </div>

      {/* இயக்குநர் பொறுப்பு */}
      <SectionHead>இயக்குநர் பொறுப்பு</SectionHead>
      {[
        "பேராசிரியர் அ. பழனிவேலு, (09.03.2017-14.06.2020)",
        "பேராசிரியர் செ. பெ. தனவேல், (04.04.2016 - 31.12.2016)",
        "பேராசிரியர் மாலதி துரைசாமி, (15.09.2015 – 31.03.2016)",
        "பேராசிரியர் இரா. ஞானமூர்த்தி, (23.04.2015 – 14.09.2015)",
        "திருமதி வீ.கோ. பூமா (01.04.2013 – 31.03.2015)",
        "பேராசிரியர் இரா. ஞானமூர்த்தி, (01.10.2011 - 31.03.2013)",
        "பேராசிரியர் ச. மோகன், (01.05.2009 – 30.09.2011)",
      ].map((t) => <Line key={t}>{t}</Line>)}

      {/* பொறுப்பு அலுவலர் */}
      <SectionHead>பொறுப்பு அலுவலர்</SectionHead>
      <Line>பேராசிரியர் க. இராமசாமி (2004 - 2013)</Line>

      {/* பதிவாளர் */}
      <SectionHead>பதிவாளர்</SectionHead>
      <Line>முனைவர் முகிலை இராச பாண்டியன் (02.03.2016 – 30.04.2018)</Line>
      <Line>முனைவர் மு. முத்துவேல் (08.06.2011 – 31.10.2015)</Line>

      {/* நிதி அலுவலர் */}
      <SectionHead>நிதி அலுவலர்</SectionHead>
      <Line>திரு. கோபால கிருஷ்ணன் (01.12.2014 – 30.04.2018)</Line>
      <Line>திரு. பெ.வை. கருணாகரன் (02.05.2011 – 21.07.2014)</Line>

      <Rule />

      {/* Advisory Committee 2006–2008 */}
      <p className="mt-2 font-bold italic text-[13.5px] text-[#407E8C] leading-7"
        style={{ fontFamily: '"Noto Serif Tamil", serif' }}>
        திட்ட ஆலோசனைக் குழு (2006 - 2008), செம்மொழித் தமிழ் உயராய்வு மையம், இந்திய மொழிகளின் நடுவண் நிறுவனம், மைசூர்.
      </p>
      <SubHead>ஒருங்கிணைப்பாளர்</SubHead>
      <Line>பேராசிரியர். சாம் மோகன் லால்,</Line>
      <SubHead>உறுப்பினர்கள்</SubHead>
      {[
        "பேராசிரியர் கே. முருகையன்",
        "பேராசிரியர் கே. நாராயண மூர்த்தி",
        "பேராசிரியர் சு. இராசாராம்",
        "பேராசிரியர் வி. சங்கரநாராயணன்",
        "பேராசிரியர் கே. நாச்சிமுத்து",
      ].map((t) => <Line key={t}>{t}</Line>)}

      <Rule />

      {/* Advisory Committee 2009–2014 */}
      <p className="mt-2 font-bold italic text-[13.5px] text-[#407E8C] leading-7"
        style={{ fontFamily: '"Noto Serif Tamil", serif' }}>
        திட்ட ஆலோசனைக் குழு (2009 - 2014), செம்மொழித் தமிழாய்வு மத்திய நிறுவனம், சென்னை
      </p>
      <SubHead>தலைவர்</SubHead>
      <Line>பேராசிரியர் ச.மோகன்</Line>
      <SubHead>கூட்ட அமைப்பாளர்</SubHead>
      <Line>பேராசிரியர் க.இராமசாமி</Line>
      <SubHead>ஒருங்கிணைப்பாளர்</SubHead>
      <Line>பேராசிரியர் அன்னி தாமசு</Line>
      <SubHead>உறுப்பினர்கள்</SubHead>
      {[
        "பேராசிரியர் பி.பி.ராஜராஜேஸ்வரி",
        "பேராசிரியர் சு.இராஜாராம்",
        "பேராசிரியர் பி. சிவகுமார்",
        "பேராசிரியர் ப.ரா.நக்கீரன்",
        "பேராசிரியர் வி.பி.தேவத்தா",
        "பேராசிரியர் ச.சிவகாமி",
        "முனைவர் ச.பாலசுப்பிரமணியன்",
      ].map((t) => <Line key={t}>{t}</Line>)}

      <Rule />

      {/* மதிப்பீட்டாளர் */}
      <SectionHead>மதிப்பீட்டாளர்</SectionHead>
      <Line>பேராசிரியர் இ. சுந்தரமூர்த்தி , முதுநிலை ஆய்விஞர்</Line>
      <Line>பேராசிரியர் கா.கோ.வேங்கடராமன், ஆய்விஞர்</Line>

      <Rule />

      {/* இணைய வகுப்புரை வழங்கியோர் */}
      <SectionHead>இணைய வகுப்புரை வழங்கியோர்</SectionHead>
      {[
        "பேராசிரியர் வி.பி. தேவத்தா (அன்னைதெரசா பல்கலைக்கழகம்)",
        "பேராசிரியர் அ.அ.மணவாளன் (சென்னைப்பல்கலைக்கழகம்)",
        "பேராசிரியர் இ. சுந்தரமூர்த்தி (செம்மொழித் தமிழாய்வு மத்திய நிறுவனம்)",
        "பேராசிரியர் அரங்க. இராமலிங்கம் (சென்னைப் பல்கலைக்கழகம்)",
        "முனைவர் அரங்க. மல்லிகா (எத்திராஜ் மகளிர் கல்லூரி)",
        "முனைவர் விஜயலக்ஷ்மி (ஸ்டெல்லா மாரிஸ் கல்லூரி)",
        "முனைவர் த. வசந்தான் (எத்திராஜ் மகளிர் கல்லூரி)",
        "முனைவர் மு. முத்துவேலு (செம்மொழித் தமிழாய்வு மத்திய நிறுவனம்)",
        "முனைவர் பா. உதயகுமார் (புதுக் கல்லூரி, நந்தனம்)",
      ].map((t) => <Line key={t}>{t}</Line>)}

      <Rule />

      {/* தொழில் நுட்ப உதவி */}
      <SectionHead>தொழில் நுட்ப உதவி</SectionHead>
      <p className="text-[13.5px] leading-7 text-[#083A4F]"
        style={{ fontFamily: '"Noto Serif Tamil", serif' }}>
        செம்மொழித் தமிழாய்வு மத்திய நிறுவனம்
      </p>
      <p className="text-[13.5px] leading-7 text-[#083A4F]"
        style={{ fontFamily: '"Noto Serif Tamil", serif' }}>
        பேராசிரியர் ரெ. குமரன், திரு. த. செந்தில்குமார்{" "}
        <span className="font-bold">(குரும்படக் காட்சிகள்)</span>
      </p>
      <div className="mt-1 flex gap-4">
        <div className="space-y-0">
          <Line>திரு. அ. முருகசுவாமிநாதன்</Line>
          <Line>திரு. மு. இராஜசேகர்</Line>
          <Line>திரு. இரா.சந்தரகணபதி</Line>
        </div>
        <div className="flex items-center">
          <span className="text-[13px] font-bold text-[#083A4F]">(வலை வழங்குநர்)</span>
        </div>
      </div>

      <Rule />

      {/* தொழில் நுட்ப உதவி – இணைய வகுப்புரை */}
      <SectionHead>தொழில் நுட்ப உதவி (இணைய வகுப்புரை)</SectionHead>
      <p className="text-[13.5px] font-semibold leading-7 text-[#083A4F]"
        style={{ fontFamily: '"Noto Serif Tamil", serif' }}>
        தேசிய தொழில்நுட்ப ஆசிரியப் பயிற்சி மற்றும் ஆராய்ச்சி நிறுவனம்
      </p>
      <Line>பேராசிரியர் இ. எஸ். எம். சுரேஷ்</Line>
      <Line>திரு. எல்.பி. எல்பின்</Line>
      <Line>திரு. என். சாய்சங்கர்</Line>
      <p className="mt-2 text-[13.5px] font-semibold leading-7 text-[#083A4F]"
        style={{ fontFamily: '"Noto Serif Tamil", serif' }}>
        இந்திய தொழில்நுட்ப கழகம் சென்னை
      </p>
      {[
        "திரு. கண்ணன் கிருஷ்ணமூர்த்தி",
        "திரு. சோஸூவ பிரான்சிஸ்",
        "திரு. கே. ஆர். மகேந்திரபாபு",
        "திருமிகு எஸ். பிரதீபா",
        "திரு. எஸ். சுபாஸ்",
      ].map((t) => <Line key={t}>{t}</Line>)}

      <Rule />

      {/* தொழில் நுட்ப உதவி – செய்யுள் வாசிப்பு */}
      <SectionHead>தொழில் நுட்ப உதவி (செய்யுள் வாசிப்பு)</SectionHead>
      {[
        "முனைவர் விமலா நடராஜன்",
        "முனைவர் ந. தேவி",
        "திருமதி. மு. பி. சித்ரா பாலசுப்பிரமணியன்",
        "திருமதி. காயத்ரி",
      ].map((t) => <Line key={t}>{t}</Line>)}

      <Rule />

      {/* கல்விசார் பணியாளர் */}
      <SectionHead>கல்விசார் பணியாளர்</SectionHead>
      <Line>முனைவர் பா. கண்ணதாசன் <strong>(2008 - 2012)</strong></Line>

      <Rule />

      {/* தரவு உள்ளீட்டாளர்கள் */}
      <SectionHead>தரவு உள்ளீட்டாளர்கள்</SectionHead>
      <Line>திருமதி ரா. நளினா <strong>(2008)</strong></Line>
      <Line>திருமதி. வி. ஜே. சையத் அலி <strong>கீபாத்திமா (2009-2011)</strong></Line>

      <Rule />

      {/* மொழிபெயர்ப்பாளர்கள் */}
      <SectionHead>மொழிபெயர்ப்பாளர்கள்</SectionHead>
      {[
        "திரு. அ.தட்சிணாமூர்த்தி",
        "திரு.எ.கே.இராமானுஜன்",
        "முனைவர் வி. முருகன்",
        "திரு. தெசினி",
        "திரு.எம். பாலகிருஷ்ண முதலியார்",
        "முனைவர். ஜே.ஆர். மார்",
        "திரு.ஜே.வி.செல்லையா",
        "பேரா.கே.ஜி. சேஷாத்திரி",
        "முனைவர் ஆர்.இ.ஆஷர்",
        "திரு. பி. ஜோதிமுத்து",
        "திரு. எம்.பூபதி",
        "முனைவர் .ஜி.யு.போப்",
        "முனைவர் ப.மருதநாயகம்",
        "திரு.எ.வி. சுப்பிரமணியம்",
        "திரு.எஸ்.இராமன்",
      ].map((t) => <Line key={t}>{t}</Line>)}

      <Rule />

      {/* நிறுவனங்கள் */}
      <SectionHead>நிறுவனங்கள்</SectionHead>
      {[
        "பேராசிரியர் & தலைவர், தமிழ்த்துறை, கேரளப் பல்கலைக்கழகம், திருவனந்தபுரம்",
        "முதல்வர், ம.தி. இந்து கல்லூரி, நாகர்கோவில்",
        "இயக்குநர், இந்திய மொழிகளின் நடுவண் நிறுவனம், மைசூர்",
        "இயக்குநர், தேசிய தொழில்நுட்ப ஆசிரியப் பயிற்சி மற்றும் ஆராய்ச்சி நிறுவனம்",
        "இயக்குநர், தமிழ் இணைய பல்கலைக்கழகம்",
        "துணைவேந்தர், தமிழ்நாடு திறந்தவெளிப் பல்கலைக்கழகம்",
        "காட்சிக் குரும்படங்கள், செம்மொழித் தமிழாய்வு மத்திய நிறுவனம்",
      ].map((t) => <Line key={t}>{t}</Line>)}
    </section>
  );
};

export default AcknowledgementPage;
