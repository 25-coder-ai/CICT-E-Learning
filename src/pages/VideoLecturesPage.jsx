import { useMemo, useState } from "react";

const lectureConstituents = [
  "அறிமுகம்",
  "திட்ட வரலாறு",
  "இணைய வகுப்புரைகள்",
  "செம்மொழித் தமிழ்",
  "அகஇலக்கியம்",
  "புறஇலக்கியம்",
  "திட்ட வரலாறு",
  "கருத்தலகு-அகம்",
  "கருத்தலகு-புறம்",
];

const introDrawerItems = [
  "முன்னுரை",
  "நோக்கங்கள்",
  "காலம்",
  "கற்றல் விளைவுகள்",
  "பாடப்பொருள்",
  "கற்றல் கோட்பாடும் அணுகுமுறையும்",
  "இணைய வகுப்பு அமைப்பு",
  "மதிப்பீடு",
];

const introWelcomeContent = [
  "இணையவழிச் செம்மொழித் தமிழ், உங்களை அன்புடன் வரவேற்கிறது.",
  "தமிழ், உலகிலுள்ள ஏழு செம்மொழிகளுள் ஒன்று. இதன் செவ்வியற் பண்பு இரண்டாயிரம் ஆண்டுப் பழமையது. இதன் இலக்கியங்கள் பிற செவ்வியல் மொழிகளின் இலக்கியங்களுக்கு நிகரானவை. இவற்றில் பயன் கொள்ளும் மொழியின் அமைப்பு, தற்கால மொழியிலிருந்து பெரிதும் வேறுபட்டது. எனவே, தமிழ் செவ்விலக்கியங்களைப் படித்து இன்புறச் செம்மொழித் தமிழில் தனிப் பயிற்சி தேவை.",
  "இணையவழிச் செம்மொழித் தமிழ் என்னும் இவ்விணைய வகுப்பு இப்பயிற்சியை முக்கிய நோக்கமாகக் கொண்டது.",
  "இவ்விணைய வகுப்பில் இணைந்து கற்கச் செம்மொழித் தமிழாய்வு மத்திய நிறுவனம் உங்களை அன்புடன் அழைக்கிறது.",
  "வாழ்த்துக்கள்.",
];

const introDrawerContent = {
  "அறிமுகம்": introWelcomeContent,
  "முன்னுரை": [
    "1. அறிமுகம்",
    "தொழில்நுட்பம் முனைப்புடன் வளர்ந்து வரும் இன்றைய சூழலில் பல்வேறு மொழி கற்றல் செயல்பாடுகளைச் செயற்படுத்தும் வகையில் திட்டமிட்ட இணைய மொழிப் பாட வகுப்புகள் இன்று பெருகி வருகின்றன. இந்நிலையில் தமிழ்ச் செவ்விலக்கியப் பனுவல்களில் (literary texts) பயன் கொள்ளும் மொழி வகையைப் புரிந்து கொள்ள விருப்புவோர்க்குச் செவ்விலக்கிய மொழித்திறனை அடைய உதவுவது இணையவழிச் செம்மொழித் தமிழ் என்னும் இவ்விணைய வகுப்பின் முதன்மை நோக்கமாகும்.",
    "தமிழ்ச் செவ்விலக்கியப் பனுவல் பற்றிய",
    "அ. இலக்கண அறிவு (Grammatical Knowledge)"
],
  "நோக்கங்கள்": [
    "2. நோக்கங்கள்", 
    "செவ்விலக்கிய மொழித்திறன் (Classical Literary competence) பெறுதல்.",
    "மாணவர்கள் வாசிப்பு, பொருள் புரிதல், மற்றும் விமர்சன அணுகுமுறை திறன்களை வளர்த்துக்கொள்ள உதவுதல்.",
  ],
  "காலம்": [
    "இப்பாடநெறி தொகுதிவாரியாக அமைக்கப்பட்டதால், கற்றவர் தமக்கேற்ற வேகத்தில் முன்னேற முடியும்.",
    "ஒவ்வொரு பகுதிக்கும் பரிந்துரைக்கப்பட்ட கற்பு நேரம் மற்றும் மீள்பார்வு நேரம் வழங்கப்படுகிறது.",
  ],
  "கற்றல் விளைவுகள்": [
    "செம்மொழித் தமிழின் அடிப்படை கருத்துக்களைப் புரிந்துகொண்டு, உரை வாசிப்பில் தன்னம்பிக்கை பெறுதல்.",
    "இலக்கிய சூழல், மொழியியல் பண்பு, மற்றும் கருத்தியல் அணுகுமுறைகளை ஒப்பீட்டாக பார்க்கும் திறன் வளர்தல்.",
  ],
  "பாடப்பொருள்": [
    "பாடப்பொருள் அலகுகள் அகம், புறம், இலக்கணம், மற்றும் இலக்கியப் பார்வை போன்ற கூறுகளாக ஒழுங்கமைக்கப்பட்டுள்ளன.",
    "ஒவ்வொரு அலகிலும் விளக்க உரை, எடுத்துக்காட்டுகள், மற்றும் பயிற்சி ஆதாரங்கள் இணைக்கப்பட்டுள்ளன.",
  ],
  "கற்றல் கோட்பாடும் அணுகுமுறையும்": [
    "கற்றவர் மையப்படுத்தப்பட்ட அணுகுமுறையுடன் வாசிப்பு, விவாதம், மற்றும் செயல்பாட்டு பயிற்சி இணைந்து செல்கிறது.",
    "தொடர்ச்சியான உள்ளடக்கத் தொடர்பு மற்றும் தன்னிலை மதிப்பீடு மூலம் கற்றல் ஆழப்படுத்தப்படுகிறது.",
  ],
  "இணைய வகுப்பு அமைப்பு": [
    "இணைய வகுப்பு வீடியோ, உரை, மற்றும் செயற்பாட்டு தொகுதிகளின் ஒருங்கிணைப்பாக அமைக்கப்பட்டுள்ளது.",
    "மெனு வழிசெலுத்தல், அலகு முன்னேற்றம், மற்றும் தொடர்ச்சியான கற்றல் அனுபவம் எளிமையாக வடிவமைக்கப்பட்டுள்ளது.",
  ],
  "மதிப்பீடு": [
    "ஒவ்வொரு அலகின் முடிவிலும் சுயமதிப்பீட்டு கேள்விகள் மூலம் கற்றல் நிலை அளவிடப்படுகிறது.",
    "பயிற்சி மற்றும் பின்னூட்டத்தின் மூலம் அடுத்த கட்ட கற்றல் திட்டமிட உதவும் வழிகாட்டி வழங்கப்படுகிறது.",
  ],
};

const sectionContent = {
  "திட்ட வரலாறு": [
    "செம்மொழித் தமிழாய்வு மத்திய நிறுவனத்தின் பத்து முதன்மைத் திட்டங்களுள் ஒன்று இணையவழிச் செம்மொழித் தமிழ். தமிழ்ச் செவ்விலக்கியங்களில் பயின்றுவரும் மொழியாட்சியைப் புரிந்துகொள்ளுதல், விளக்குதல், நயம்பாராட்டுதல் ஆகிய திறன்களைக் கற்போர் அடைய உதவுவது இவ்விணையவழி வகுப்பின் நோக்கமாகும்.",
    "தமிழுக்குச் 'செம்மொழி / செவ்வியல் மொழி' என்னும் அங்கீகாரம் இந்திய அரசால் 2004 ஆம் ஆண்டு செப்டம்பர் 17ஆம் நாள் வழங்கப்பட்டது. இவ்வங்கீகாரத்தைத் தொடர்ந்து செம்மொழி வளர்ச்சித் திட்டத்தைச் செயற்படுத்தும் மிகப் பெரிய பணி மைசூரிலுள்ள இந்திய மொழிகள் நடுவண் நிறுவனத்திற்கு 2005ஆம் ஆண்டு சூலைத் திங்கள் அளிக்கப்பட்டது.",
    "தமிழ்மொழி வளர்ச்சி வாரியத் (Tamil Language Promotion Board) தலைவரும் உறுப்பினர்களும், இந்திய நாட்டின் எல்லாப் பகுதிகளிலிருந்தும் அழைக்கப்பெற்ற மொழி வல்லுநர்களும் பேராசிரியர்களும் இணைந்து இதற்கான செயல்திட்டம் ஒன்றைத் தீட்டினர். இத்திட்டத்தின்படி, கி.மு. 300 முதல் கி.பி. 600 வரையிலான தமிழ்மொழி வரலாற்றின் பல்வேறு பரிமாணங்கள் தொடர்பான ஆய்வுகளை மேற்கொள்வது இச் செயல்திட்டத்தின் முதன்மைப் பணியாக இருக்கவேண்டும் என்னும் கருத்து ஒருமனதாக ஏற்றுக்கொள்ளப்பட்டது.",
    "இச்செயல்திட்டத்தின் ஒரு பகுதியாக 2006ஆம் ஆண்டு மார்ச் திங்கள் செம்மொழித் தமிழ் உயராய்வு மையம் (Centre of Excellence for Classical Tamil) மைசூரிலுள்ள இந்திய மொழிகள் நடுவண் நிறுவனத்தில் நிறுவப்பட்டது.",
    "இவ்வுயராய்வு மையம் பல்வேறு ஆய்வுத்திட்டங்களை மேற்கொண்டது. செம்மொழித் தமிழை இணையம் வழிக் கற்பிப்பதென்னும் திட்டம் பத்து முதன்மை ஆய்வுத்திட்டங்களுள் ஒன்றாக ஏற்கப்பட்டது. பேராசிரியர் சாம் மோகன்லால் (இணை இயக்குநர், இந்திய மொழிகள் நடுவண் நிறுவனம்) அவர்களை ஒருங்கிணைப்பாளராகக் கொண்டு, பேராசிரியர் க. முருகையன், பேராசிரியர் கே. நாராயணமூர்த்தி, பேராசிரியர் சு. இராசாராம், பேராசிரியர் வி. சங்கரநாராயணன், பேராசிரியர் கி. நாச்சிமுத்து ஆகியோர் அடங்கிய திட்ட ஆலோசனைக்குழு அமைக்கப்பட்டது. இக்குழு இணையவழிச் செம்மொழித் தமிழ் என்னும் இணைய வகுப்பை நடத்துவது குறித்துத் திட்டம் வகுத்தது. இந்திய மொழிகள் நடுவண் நிறுவனம், மைசூர், கேரளப் பல்கலைக்கழகம், திருவனந்தபுரம், தெ.தி.இந்துக்கல்லூரி, நாகர்கோவில் ஆகிய நிறுவனங்களில் பயிலரங்குகள் நடத்தப்பட்டன. தமிழ்மொழியிலும் இலக்கியத்திலும் புலமை மிக்கப் பேராசிரியர்கள் இப்பயிலரங்குகளில் பங்கேற்று இத்திட்டத்திற்கான பாட உருவாக்கத்திற்குக் கருத்தாழமிக்கக் கருத்துரைகளை வழங்கினர். கூடுதலாக, ஆறு பயிலரங்குகள் தொடக்கத்தில் நடத்தப்பட்டன.",
    "இம்மையம் செம்மொழித் தமிழாய்வு மத்திய நிறுவனம் (Central Institute of Classical Tamil) என்னும் பெயரில் 2008ஆம் ஆண்டு மே திங்கள் சென்னையில் நிறுவப்பட்டது. இணையவழிச் செம்மொழித் தமிழ் என்னும் இத்திட்டம் மொழிகள் மற்றும் மொழிக்கல்வி (Dept. of School of Languages and Language Education) புலத்தின்கீழ்ச் செயற்பட்டு வருகின்றது.",
    "இதுவரை 13 பயிலரங்குகள் இத்திட்டத்தின் பொருட்டு நடத்தப் பெற்றுள்ளன. இணையவழிச் செம்மொழித் தமிழ் என்னும் வகுப்புக்கான பாடத்திட்டமும், கணினிவழிச் செலுத்துவதற்கான பாடங்களும் பேராசிரியர் சு. இராசாராம் வழிகாட்டுதலில் பேராசிரியர் அன்னி தாமசு, முனைவர் ந.தேவி, திரு. சு. கார்த்திகேயன் ஆகியோரால் உருவாக்கப்பட்டன. இப்பயிலரங்குகளில் இணையவழிச் செம்மொழித் தமிழ் என்னும் இவ்விணைய வகுப்பின் அமைப்பும் (Online Course Structure) கருத்தலகுப் பகுப்பாய்வும் 2010 ஆம் ஆண்டு நடைபெற்ற இரு திட்ட ஆலோசனைக் குழுக் கூட்டங்களில் விரிவாக விவாதிக்கப் பட்டன. இணைய பாடத்தின் மாதிரியும் விவாதிக்கப்பட்டு ஒப்புதல் பெறப்பட்டது.",
    "இணையவழிச் செம்மொழித் தமிழ் என்னும் இவ் வகுப்பில் இணைய வகுப்பறை (Virtual Classroom) முக்கியப் பங்கு பெறுகிறது. இவ்வகுப்புகளில் அகப்பொருள் தொடர்பான விரிவுரைகள் ஆற்ற அவ்வத் துறைபோகிய பேராசிரியர்கள் கேட்டுக்கொள்ளப்பெற்றனர். 6 பேராசிரியர்களின் 16 இணைய வகுப்பறை விரிவுரைகள் இவ்விணைய வகுப்பில் இடம்பெறுகின்றன. இவ்விரிவுரைகள் அனைத்தும் NITTTR, IIT Madras ஆகிய நிறுவனங்களில் ஒளிப்பதிவு செய்யப்பட்டன. செவ்விலக்கியப் பாடல்களுக்கான ஒலிப்பதிவு மைசூர் இந்திய மொழிகள் நடுவண் நிறுவனத்தில் மேற்கொள்ளப்பட்டது.",
    "இலக்கியப் பொருள் புரிதலை மேம்படுத்தும் வகையில், காட்சிப்பட நறுக்குகள் (Video Clippings) ஆங்காங்கே தரப்பட்டுள்ளன. இப்படங்கள் இந்நிறுவனம் தயாரித்துள்ள காட்சிக் குறும்படங்களிலிருந்து தொகுத்துத் தரப்பட்டுள்ளன.",
    "செம்மொழித் தமிழ் என்னும் இணைய வகுப்பில் ஐந்து கருத்தலகுகளுள் அகப்பொருள், புறப்பொருள் பற்றிய முதலிரு கருத்தலகுகள் பதிவேற்றம் செய்யப்பட்டுள்ளன. ஏனைய கருத்தலகுகள் செயலாக்கத்திலும் மதிப்பீட்டு நிலையிலும் உள்ளன. இவை ஒவ்வொன்றாக விரைவில் பதிவேற்றம் செய்யப்பெறும். கருத்தலகு (அகம்) 1, கருத்தலகு (புறம்) 2 ஆகியவற்றை கற்க விரும்புவோர் கற்று முடிந்தபின் ctol@cict.in என்னும் மின்னஞ்சல் முகவரியில் தங்கள் கருத்துகளைப் பதிவு செய்யலாம்.",
  ],
  "இணைய வகுப்புரைகள்": [
    "இணைய வகுப்புரைகள் பாட அலகுகளுடன் ஒத்திசைவாக அமைக்கப்பட்டு, காட்சி-ஒலி உதவியுடன் கற்றலை வலுப்படுத்துகின்றன.",
  ],
  "செம்மொழித் தமிழ்": [
    "செம்மொழித் தமிழ் பகுதி, தமிழின் தொன்மை, இலக்கியப் பெருமை, மற்றும் மொழியியல் தனித்தன்மைகளை மையமாகக் கொண்டது.",
  ],
  "அகஇலக்கியம்": [
    "அகஇலக்கியப் பகுதி காதல், உணர்வு, மற்றும் மனித உள்ளுணர்வை பிரதிபலிக்கும் பாடல்களை விளக்குகிறது.",
  ],
  "புறஇலக்கியம்": [
    "புறஇலக்கியம் வீரியம், சமூக வாழ்க்கை, அரசியல், மற்றும் பண்பாட்டு வெளிப்பாடுகளின் பரப்பை அறிமுகப்படுத்துகிறது.",
  ],
  "கருத்தலகு-அகம்": [
    "கருத்தலகு-அகம் பகுதியில் அகப்பாடல்களின் கருத்தமைப்பு, குறியீடுகள், மற்றும் உரைப் பகுப்பாய்வு அணுகுமுறைகள் கொடுக்கப்படுகின்றன.",
  ],
  "கருத்தலகு-புறம்": [
    "கருத்தலகு-புறம் பகுதியில் புறப்பாடல்களின் கருத்தியல் வடிவங்கள் மற்றும் பொருளடக்கத் தொடர்புகள் விளக்கப்படுகின்றன.",
  ],
};

const VideoLecturesPage = () => {
  const [isIntroDrawerOpen, setIsIntroDrawerOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("அறிமுகம்");
  const [activeIntroItem, setActiveIntroItem] = useState("அறிமுகம்");

  const currentContent = useMemo(() => {
    if (activeItem === "அறிமுகம்") {
      return introDrawerContent[activeIntroItem] || [];
    }
    return sectionContent[activeItem] || [];
  }, [activeItem, activeIntroItem]);

  const isMunnuraiView = activeItem === "அறிமுகம்" && activeIntroItem === "முன்னுரை";
  const isNokkangalView = activeItem === "அறிமுகம்" && activeIntroItem === "நோக்கங்கள்";
  const isKaalamView = activeItem === "அறிமுகம்" && activeIntroItem === "காலம்";
  const isLearningOutcomesView =
    activeItem === "அறிமுகம்" && activeIntroItem === "கற்றல் விளைவுகள்";
  const isPaadaporulView = activeItem === "அறிமுகம்" && activeIntroItem === "பாடப்பொருள்";
  const isLearningApproachView =
    activeItem === "அறிமுகம்" && activeIntroItem === "கற்றல் கோட்பாடும் அணுகுமுறையும்";
  const isOnlineClassStructureView =
    activeItem === "அறிமுகம்" && activeIntroItem === "இணைய வகுப்பு அமைப்பு";
  const isAssessmentView = activeItem === "அறிமுகம்" && activeIntroItem === "மதிப்பீடு";
  const emphasisClass = "font-bold text-[17px] text-[#2a1b10] sm:text-[19px]";

  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-2xl border border-[#b98a53]/50 bg-linear-to-b from-[#f1d4a2]/34 to-[#e1b985]/26 shadow-[inset_0_1px_0_rgba(255,244,219,0.52),0_14px_30px_rgba(86,52,22,0.16)] backdrop-blur-md">
        <div className="grid items-start md:grid-cols-[minmax(0,300px)_minmax(0,1fr)]">
          <aside className="h-fit self-start border-r border-[#6f4421]/65 bg-linear-to-b from-[#c79258]/88 via-[#b8824b]/86 to-[#a66f3f]/84 backdrop-blur-sm">
            <ul className="divide-y divide-[#f2d7ad]/65">
              {lectureConstituents.map((item, index) => (
                <li key={`${item}-${index}`}>
                  {item === "அறிமுகம்" ? (
                    <div>
                      <button
                        type="button"
                        onClick={() => {
                          setIsIntroDrawerOpen((previous) => !previous);
                          setActiveItem("அறிமுகம்");
                          setActiveIntroItem("அறிமுகம்");
                        }}
                        className={`flex w-full items-center justify-between border-b border-[#f1d4a9]/35 px-4 py-3 text-left text-lg leading-tight transition ${
                          activeItem === "அறிமுகம்"
                            ? "bg-[#dba66d]/75 text-[#2f1b0d]"
                            : "text-[#2f1b0d] hover:bg-[#d39a5d]/65"
                        }`}
                        style={{ fontFamily: '"Noto Serif Tamil", "Cormorant Garamond", serif' }}
                        aria-expanded={isIntroDrawerOpen}
                      >
                        <span>{item}</span>
                        <span className="text-sm">{isIntroDrawerOpen ? "▾" : "▸"}</span>
                      </button>

                      <div
                        className={`overflow-hidden transition-all duration-300 ${
                          isIntroDrawerOpen ? "max-h-160" : "max-h-0"
                        }`}
                      >
                        <ul className="divide-y divide-[#c99a67]/70 border-t border-[#8f6033]/55 bg-linear-to-b from-[#f2dfc1]/90 to-[#ebd0a8]/85">
                          {introDrawerItems.map((drawerItem) => (
                            <li key={drawerItem}>
                              <button
                                type="button"
                                onClick={() => {
                                  setActiveItem("அறிமுகம்");
                                  setActiveIntroItem(drawerItem);
                                }}
                                className={`w-full px-5 py-2.5 text-left text-base leading-tight transition ${
                                  activeItem === "அறிமுகம்" && activeIntroItem === drawerItem
                                    ? "bg-[#e4bf8b]/85 text-[#2f1b0d]"
                                    : "text-[#51321a] hover:bg-[#f2dcc0]/80"
                                }`}
                                style={{ fontFamily: '"Noto Serif Tamil", "Cormorant Garamond", serif' }}
                              >
                                {drawerItem}
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        setActiveItem(item);
                        setIsIntroDrawerOpen(false);
                      }}
                      className={`w-full border-b border-[#f1d4a9]/35 px-4 py-3 text-left text-lg leading-tight transition ${
                        activeItem === item
                          ? "bg-[#dba66d]/75 text-[#2f1b0d]"
                          : "text-[#2f1b0d] hover:bg-[#d39a5d]/65"
                      }`}
                      style={{ fontFamily: '"Noto Serif Tamil", "Cormorant Garamond", serif' }}
                    >
                      {item}
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </aside>

          <div className="bg-[#fff8e8]/30 p-6 sm:p-8">
            <h3
              className="text-3xl font-bold tracking-[0.01em] text-[#2f1d10] sm:text-4xl"
              style={{ fontFamily: '"Noto Serif Tamil", "Cinzel", serif' }}
            >
              {activeItem === "அறிமுகம்"
                ? "இணையவழிச் செம்மொழித் தமிழ்"
                : activeItem}
            </h3>
            <p
              className={`mt-3 text-3xl font-bold tracking-wide text-[#5a3417] sm:text-4xl ${
                activeItem === "திட்ட வரலாறு" ? "" : "uppercase"
              }`}
            >
              {activeItem === "திட்ட வரலாறு" ? "Project History" : "Classical Tamil Online"}
            </p>

            <div
              className="mt-5 text-left text-[15px] leading-[1.8] text-[#2f241b] sm:text-base"
              style={{ fontFamily: '"Noto Serif Tamil", "Cormorant Garamond", serif' }}
            >
              {isMunnuraiView ? (
                <div className="space-y-5">
                  <p className={emphasisClass}>1. அறிமுகம்</p>

                  <p className="text-justify">
                    தொழில்நுட்பம் முனைப்புடன் வளர்ந்து வரும் இன்றைய சூழலில் பல்வேறு மொழி கற்றல்
                    செயல்பாடுகளைச் செயற்படுத்தும் வகையில் திட்டமிட்ட இணைய மொழிப் பாட வகுப்புகள்
                    இன்று பெருகி வருகின்றன. இந்நிலையில் தமிழ்ச் செவ்விலக்கியப் பனுவல்களில்
                    (literary texts) பயன் கொள்ளும் மொழி வகையைப் புரிந்து கொள்ள விருப்புவோர்க்குச்
                    செவ்விலக்கிய மொழித்திறனை அடைய உதவுவது
                    <span className={emphasisClass}> இணையவழிச் செம்மொழித் தமிழ்</span>
                    <span className={emphasisClass}> என்னும் இவ்விணைய வகுப்பின்</span>
                    முதன்மை நோக்கமாகும்.
                  </p>

                  <p className="text-justify">தமிழ்ச் செவ்விலக்கியப் பனுவல் பற்றிய</p>

                  <div className="space-y-2">
                    <p>
                      <span className={emphasisClass}>அ. இலக்கண அறிவு</span>
                      <span className={emphasisClass}> (Grammatical Knowledge)</span>
                    </p>
                    <p className="pl-4 text-justify text-[#3b2a1e]">
                      (ஒலியனியல், உருவனியல், தொடரியல், சொற்களஞ்சியம், செம்மொழித் தமிழின்
                      அமைப்பு பற்றிய செய்திகள் இதில் அடங்கும்)
                    </p>

                    <p>
                      <span className={emphasisClass}>ஆ. பனுவல் அறிவு</span>
                      <span className={emphasisClass}> (Textual Knowledge)</span>
                    </p>

                    <p>
                      <span className={emphasisClass}>இ. பயனாட்டு அறிவு</span>
                      <span className={emphasisClass}> (Functional Knowledge)</span>
                    </p>
                    <p className="pl-4 text-justify text-[#3b2a1e]">
                      (மொழியைக் கையாளும் திறன், கருத்தை ஆழியவனில் அதில் அடங்கும்)
                    </p>

                    <p>
                      <span className={emphasisClass}>ஈ. சமூக மொழியியல் அறிவு</span>
                      <span className={emphasisClass}> (Sociolinguistic Knowledge)</span>
                    </p>
                    <p className="pl-4 text-justify text-[#3b2a1e]">
                      (குறை வழக்குகள், மொழிமாற்றங்கள், பன்மாட்டு செய்திகள் இதில் அடங்கும்)
                    </p>

                    <p>
                      <span className={emphasisClass}>உ. இலக்கிய அறிவு</span>
                      <span className={emphasisClass}> (Literary Knowledge)</span>
                    </p>
                    <p className="pl-4 text-justify text-[#3b2a1e]">
                      (இலக்கிய வகைமை, கவிதையியல், நடை பற்றிய அறிவு இதில் அடங்கும்)
                    </p>
                  </div>

                  <p className="text-justify">
                    ஆகிய ஐவை செவ்விலக்கிய மொழித்திறனின் முதன்மைக் கூறுகளாகும். இவற்றின்
                    ஊடாட்டமே செவ்விலக்கியங்களின் தனி மொழியாட்சி வகையை உருவாக்குகிறது.
                    இவ்வூடாட்டத் திறனே செவ்விலக்கிய மொழித்திறன் (Classical literary competence).
                    செவ்விலக்கியங்களைக் கற்பவா் இதனைக் கையாண்டிட
                    <span className={emphasisClass}> இணையவழிச் செம்மொழித் தமிழ்</span>
                    உதவுகிறது.
                  </p>
                </div>
              ) : isNokkangalView ? (
                <div className="space-y-5">
                  <p className={emphasisClass}>2. நோக்கங்கள்</p>

                  <p className="text-justify">
                    செவ்விலக்கிய மொழித்திறன் (Classical Literary competence) பெறுதல்
                  </p>

                  <div className="space-y-2">
                    <p>செவ்வியல் இலக்கிய மொழியைப் புரிந்துகொள்ளுதல்</p>
                    <p>செவ்வியல் இலக்கியங்களை நயம்பாராட்டும் திறன் பெறுதல்</p>
                    <p>செவ்வியல் இலக்கியங்களுக்குக் கருத்துவிளக்கம் தரும் திறன் பெறுதல்</p>
                  </div>

                  <p className="text-justify">
                    நேர்நோக்கங்களை அடைய, செவ்விலக்கிய முதன்மைக் கூறுகளின் அடிப்படையில்
                    கற்றல் விளைவுகள் (Learning outcomes) இங்காணப் பட்டுள்ளன.
                  </p>
                </div>
              ) : isKaalamView ? (
                <div className="space-y-5">
                  <p className={emphasisClass}>3. காலம் : 300 மணி</p>

                  <p className="text-justify">
                    300 மணி நேர கால அளவில் 250 மணி நேரம் கற்றலுக்கும், 50 மணி நேரம்
                    மதிப்பீட்டிற்கும் ஒப்படைப்பிற்கும் ஒதுக்கப்படும்.
                    கருத்தலகுரியாயாக மணி நேரம் கீழுமாறு ஒதுக்கீடு செய்யப்பட்டுள்ளது.
                  </p>

                  <div className="space-y-1">
                    <div className="grid grid-cols-[1fr_auto] gap-6">
                      <p>கருத்தலகு 1</p>
                      <p>50 மணி</p>
                    </div>
                    <div className="grid grid-cols-[1fr_auto] gap-6">
                      <p>கருத்தலகு 2</p>
                      <p>50 மணி</p>
                    </div>
                    <div className="grid grid-cols-[1fr_auto] gap-6">
                      <p>கருத்தலகு 3</p>
                      <p>50 மணி</p>
                    </div>
                    <div className="grid grid-cols-[1fr_auto] gap-6">
                      <p>கருத்தலகு 4</p>
                      <p>50 மணி</p>
                    </div>
                    <div className="grid grid-cols-[1fr_auto] gap-6">
                      <p>கருத்தலகு 5</p>
                      <p>50 மணி</p>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="grid grid-cols-[1fr_auto_auto] gap-6">
                      <p></p>
                      <p>=</p>
                      <p>250 மணி</p>
                    </div>
                    <div className="grid grid-cols-[1fr_auto_auto] gap-6">
                      <p>மதிப்பீடு</p>
                      <p>=</p>
                      <p>25 மணி</p>
                    </div>
                    <div className="grid grid-cols-[1fr_auto_auto] gap-6">
                      <p>ஒப்படைப்பு</p>
                      <p>=</p>
                      <p>25 மணி</p>
                    </div>
                    <div className="mt-2 border-t border-[#7d5a34]/60 pt-2">
                      <div className="grid grid-cols-[1fr_auto_auto] gap-6">
                        <p></p>
                        <p></p>
                        <p className={emphasisClass}>300 மணி</p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : isLearningOutcomesView ? (
                <div className="space-y-5">
                  <p className={emphasisClass}>4. கற்றல் விளைவுகள்</p>
                  <p>பின்வருவனவற்றை அறிந்து கொள்ளுதல்</p>

                  <div className="space-y-2 pl-2">
                    <p>• செம்மொழித் தமிழ்</p>
                    <p>• அக இலக்கியங்கள்</p>
                    <p>• புற இலக்கியங்கள்</p>
                    <p>• அற இலக்கியங்கள்</p>
                    <p>• காப்பிய இலக்கியங்கள்</p>
                    <p>• செவ்வியல் இலக்கணம்</p>
                    <p>• செவ்வியல் மொழிமைப்பு</p>
                    <p className="pl-5">→ ஒலியனையப்பு</p>
                    <p className="pl-5">→ புணர்ச்சி அமைப்பு</p>
                    <p className="pl-5">→ உருவனமைப்பு</p>
                    <p className="pl-5">→ தொடரமைப்பு</p>
                    <p>• திணை</p>
                    <p className="pl-5">→ அகத்திணை</p>
                    <p className="pl-10 font-semibold">முல்லை</p>
                    <p className="pl-10 font-semibold">குறிஞ்சி</p>
                    <p className="pl-10 font-semibold">மருதம்</p>
                    <p className="pl-10 font-semibold">நெய்தல்</p>
                    <p className="pl-10 font-semibold">பாலை</p>
                    <p className="pl-10 font-semibold">கைக்கிளை</p>
                    <p className="pl-10 font-semibold">பெருந்திணை</p>
                    <p className="pl-5">→ புறத்திணை</p>
                    <p className="pl-10">வெட்சி</p>
                    <p className="pl-10">வஞ்சி</p>
                    <p className="pl-10">உழிஞை</p>
                    <p className="pl-10">தும்பை</p>
                    <p className="pl-10">வாகை</p>
                    <p className="pl-10">காஞ்சி</p>
                    <p className="pl-10">பாடாண்</p>
                    <p className="pl-5">→ அறம்</p>
                    <p className="pl-10 font-semibold">புறம்</p>
                    <p className="pl-10">அரசு, அமைச்சர், குடி, துறவு</p>
                    <p className="pl-10 font-semibold">அகம்</p>
                    <p className="pl-10">இல்லாழ்வு</p>
                    <p className="pl-10 font-semibold">அறம்</p>
                    <p className="pl-10">நல்லொழுக்கம், தீயொழுக்கம்</p>
                    <p className="pl-5">→ காப்பியம்</p>
                    <p className="pl-10">சிலப்பதிகாரம்</p>
                    <p className="pl-10">மணிமேகலை</p>
                    <p className="pl-5">→ இலக்கணம்</p>
                    <p className="pl-10 font-semibold">கற்று</p>
                    <p className="pl-10">கற்று, கைகோள், நிகழ்துவோர், கேட்போர், காலம்</p>
                    <p className="pl-10 font-semibold">திணை (அகம்)</p>
                    <p className="pl-10">முல்லை</p>
                    <p className="pl-10">குறிஞ்சி</p>
                    <p className="pl-10">மருதம்</p>
                    <p className="pl-10">நெய்தல்</p>
                    <p className="pl-10">பாலை</p>
                    <p className="pl-10">கைக்கிளை</p>
                    <p className="pl-10">பெருந்திணை</p>
                    <p className="pl-10 font-semibold">திணை (புறம்)</p>
                    <p className="pl-10">துறை</p>
                    <p className="pl-10">வெட்சி</p>
                    <p className="pl-10">வஞ்சி</p>
                    <p className="pl-10">உழிஞை</p>
                    <p className="pl-10">தும்பை</p>
                    <p className="pl-10">வாகை</p>
                    <p className="pl-10">காஞ்சி</p>
                    <p className="pl-10">பாடாண்</p>
                    <p className="pl-10 font-semibold">யாப்பு</p>
                    <p className="pl-10">யாப்பு, பா, அசை, சீர், அடி, தொடை, அளவு</p>
                    <p className="pl-10 font-semibold">செய்யுள் மொழி</p>
                    <p className="pl-10">தூக்கு, நோக்கு, பயன், மெய்ப்பாடு, எச்சம், பொருள், வண்ணம், அம்மை, அழகு</p>
                    <p className="pl-10 font-semibold">பொருள்மொழி</p>
                    <p className="pl-10">எழுத்து, மாத்திரை, மரபு, மாட்டு, முன்னம், தொன்மை, தோல், விருந்து, இயைபு, புலன், இழைபு</p>
                    <p className="pl-10 font-semibold">நயம்பாராட்டல்</p>
                    <p className="pl-10">பொருள், யாப்பு, உவமை, உள்ளுறை, இறைச்சி, சொல்லாட்சி, பொருத்தகருத்து</p>
                  </div>
                </div>
              ) : isPaadaporulView ? (
                <div className="space-y-5">
                  <p className={emphasisClass}>5. பாடப்பொருள்</p>

                  <p className="text-justify">
                    இவ்விணைய வகுப்பின் பாடப்பொருள், செவ்விலக்கிய மொழித்திறனை படிப்படியாக
                    வளர்க்கும் வகையில் கருத்தலகு அடிப்படையில் அமைக்கப்பட்டுள்ளது.
                  </p>

                  <div className="space-y-2 pl-2">
                    <p>• கருத்தலகு 1 : செம்மொழித் தமிழ் - அடிப்படைப் புரிதல்கள்</p>
                    <p>• கருத்தலகு 2 : அக இலக்கியங்கள் - திணை, உணர்ச்சி, உரைப்பண்பு</p>
                    <p>• கருத்தலகு 3 : புற இலக்கியங்கள் - பொருளாதாரம், சமூகப் பின்னணி, வீர மரபு</p>
                    <p>• கருத்தலகு 4 : அறம் மற்றும் காப்பியப் பார்வை - கருத்தியல் விரிவாக்கம்</p>
                    <p>• கருத்தலகு 5 : இலக்கணம், யாப்பு, செய்யுள் மொழி, நயம்பாராட்டல்</p>
                  </div>

                  <p className="text-justify">
                    ஒவ்வொரு கருத்தலகிலும்
                    <span className={emphasisClass}> விளக்க உரை</span>,
                    <span className={emphasisClass}> எடுத்துக்காட்டு வாசிப்பு</span>,
                    <span className={emphasisClass}> செயல்பாட்டு பயிற்சி</span> மற்றும்
                    <span className={emphasisClass}> மீளாய்வு வழிகாட்டி</span> இணைக்கப்பட்டுள்ளன.
                  </p>
                </div>
              ) : isLearningApproachView ? (
                <div className="space-y-5">
                  <p className={emphasisClass}>6. கற்றல் கோட்பாடும் அணுகுமுறையும்</p>

                  <p className="text-justify">
                    இவ்விணைய வகுப்பு கற்றவர்-மையக் கற்றல் முறையை முன்னிறுத்துகிறது.
                    கற்றல் செயல்முறை வாசிப்பு, புரிதல், பகுப்பாய்வு, நடைமுறைப் பயன்பாடு
                    ஆகிய நான்கு அடுக்குகளில் முன்னெடுக்கப்படுகிறது.
                  </p>

                  <div className="space-y-2 pl-2">
                    <p>• தன்னிச்சை கற்றல் (Self-paced learning) முறையில் அலகு முன்னேற்றம்</p>
                    <p>• வழிநடத்தப்பட்ட உரை வாசிப்பு மற்றும் கருத்துப் பகுப்பாய்வு</p>
                    <p>• எடுத்துக்காட்டு மைய விளக்கங்கள் மூலம் இலக்கண-இலக்கிய இணைப்பு</p>
                    <p>• செயற்பாட்டு பயிற்சிகள் மூலம் கருத்தை நடைமுறைக்கு மாற்றுதல்</p>
                    <p>• தொடர்ச்சியான சுயமதிப்பீடு மூலம் கற்றல் ஆழத்தை உறுதிசெய்தல்</p>
                  </div>

                  <p className="text-justify">
                    இந்த அணுகுமுறை மூலம் கற்றவர்
                    <span className={emphasisClass}> வாசிப்புத் திறன்</span>,
                    <span className={emphasisClass}> பொருள் உணர்தல் திறன்</span>,
                    <span className={emphasisClass}> உரை விளக்கத் திறன்</span> மற்றும்
                    <span className={emphasisClass}> நயம்பாராட்டும் திறன்</span>
                    ஆகியவற்றை ஒருங்கிணைந்து வளர்த்துக் கொள்கிறார்.
                  </p>
                </div>
              ) : isOnlineClassStructureView ? (
                <div className="space-y-6">
                  <p className={emphasisClass}>7. இணைய வகுப்பு அமைப்பு (Online course structure)</p>

                  <p className="text-justify">
                    செவ்விலக்கிய மொழியில் மேற்தர நோக்கங்களை அடையும் வகையில் இவ்விணைய வகுப்பு
                    நான்கு தலைப்புகளில் அமைக்கப்பட்டுள்ளது.
                  </p>

                  <div className="space-y-1 pl-2">
                    <p>• செவ்விலக்கியக் கூறுகள் (Classical literary components)</p>
                    <p>• செவ்விலக்கிய மொழித்திறன்கள் (Classical language skills)</p>
                    <p>• செவ்விலக்கிய மொழியமைப்பு (Structure of Classical language)</p>
                    <p>• செவ்விலக்கியத் திறன்கள் (Classical literary skills)</p>
                  </div>

                  <p className="text-justify">
                    செவ்விலக்கியக் கூறுகள் முதன்மைக் கூறுகளின் அடிப்படையில் கருத்தலகுகளாகவும்,
                    துணைக்கூறுகளின் அடிப்படையில் அலகுகளாகவும் பாடங்களாகவும் வகுக்கப்பட்டுள்ளன.
                    மொத்தம் ஐந்து கருத்தலகுகள் இதில் அடங்கும். இவற்றுள் முதல் நான்கு கருத்தலகுகள்
                    அலகுகளாகவும், ஒவ்வொரு அலகும் செவ்வியல் கூறுகளின் அடிப்படையில் பாடங்களாகவும்
                    (Lessons) பிரிக்கப்பட்டுள்ளன. இவ்வமைப்பை என வரைபடத்தில் காட்டலாம். எ.கா.

                  </p>

                  <div className="overflow-hidden rounded-xl bg-[#edd1a6]">
                    <img
                      src="/course-structure-diagram.svg"
                      alt="கருத்தலகு, அலகு, பாடம் அமைப்பைக் காட்டும் வரைபடம்"
                      className="block w-full object-contain"
                      loading="lazy"
                    />
                  </div>

                  <div className="rounded-xl border border-[#8f6033]/45 bg-[#fdf3df]/75 p-4">
                    <p className="font-semibold text-[#3b2718]">கருத்தலகு 1 : அக இலக்கியம்</p>

                    <div className="mt-2 space-y-1 pl-2">
                      <p>
                        <span className="font-semibold">அலகு 1</span> : முல்லைத் திணை
                      </p>
                      <p className="pl-5">பாடம் 1 : முதற்பொருள்</p>
                      <p className="pl-5">பாடம் 2 : கருப்பொருள்</p>
                      <p className="pl-5">பாடம் 3 : உரிப்பொருள்</p>
                      <p className="pl-5">பாடம் 4 : திணைமயக்கம்</p>
                    </div>

                    <div className="mt-3 space-y-1 pl-2">
                      <p>
                        <span className="font-semibold">அலகு 2</span> : குறிஞ்சித் திணை
                      </p>
                      <p className="pl-5">பாடம் 1 : முதற்பொருள்</p>
                      <p className="pl-5">பாடம் 2 : கருப்பொருள்</p>
                      <p className="pl-5">...</p>
                    </div>
                  </div>

                  <div className="overflow-x-auto rounded-xl border border-[#8f6033]/45 bg-[#fff9ee]/78">
                    <table className="min-w-245 w-full border-collapse text-sm sm:text-base">
                      <thead>
                        <tr className="bg-[#edd1a6]/75 text-[#2f1f13]">
                          <th className="border border-[#b2875b]/70 px-2 py-2 text-left">அலகு 1 - முல்லை</th>
                          <th className="border border-[#b2875b]/70 px-2 py-2 text-left">அலகு 2 - குறிஞ்சி</th>
                          <th className="border border-[#b2875b]/70 px-2 py-2 text-left">அலகு 3 - மருதம்</th>
                          <th className="border border-[#b2875b]/70 px-2 py-2 text-left">அலகு 4 - நெய்தல்</th>
                          <th className="border border-[#b2875b]/70 px-2 py-2 text-left">அலகு 5 - பாலை</th>
                          <th className="border border-[#b2875b]/70 px-2 py-2 text-left">அலகு 6 - கைக்கிளை</th>
                          <th className="border border-[#b2875b]/70 px-2 py-2 text-left">அலகு 7 - பெருந்திணை</th>
                        </tr>
                      </thead>
                      <tbody className="text-[#2f241b]">
                        <tr>
                          <td className="border border-[#c69a6f]/70 px-2 py-2">பாடம்:1 முதற்பொருள்</td>
                          <td className="border border-[#c69a6f]/70 px-2 py-2">பாடம்:1 முதற்பொருள்</td>
                          <td className="border border-[#c69a6f]/70 px-2 py-2">பாடம்:1 முதற்பொருள்</td>
                          <td className="border border-[#c69a6f]/70 px-2 py-2">பாடம்:1 முதற்பொருள்</td>
                          <td className="border border-[#c69a6f]/70 px-2 py-2">பாடம்:1 முதற்பொருள்</td>
                          <td className="border border-[#c69a6f]/70 px-2 py-2">பாடம்:1</td>
                          <td className="border border-[#c69a6f]/70 px-2 py-2">பாடம்:1</td>
                        </tr>
                        <tr>
                          <td className="border border-[#c69a6f]/70 px-2 py-2">பாடம்:2 கருப்பொருள்</td>
                          <td className="border border-[#c69a6f]/70 px-2 py-2">பாடம்:2 கருப்பொருள்</td>
                          <td className="border border-[#c69a6f]/70 px-2 py-2">பாடம்:2 கருப்பொருள்</td>
                          <td className="border border-[#c69a6f]/70 px-2 py-2">பாடம்:2 கருப்பொருள்</td>
                          <td className="border border-[#c69a6f]/70 px-2 py-2">பாடம்:2 கருப்பொருள்</td>
                          <td className="border border-[#c69a6f]/70 px-2 py-2"></td>
                          <td className="border border-[#c69a6f]/70 px-2 py-2"></td>
                        </tr>
                        <tr>
                          <td className="border border-[#c69a6f]/70 px-2 py-2">பாடம்:3 உரிப்பொருள்</td>
                          <td className="border border-[#c69a6f]/70 px-2 py-2">பாடம்:3 உரிப்பொருள்</td>
                          <td className="border border-[#c69a6f]/70 px-2 py-2">பாடம்:3 உரிப்பொருள்</td>
                          <td className="border border-[#c69a6f]/70 px-2 py-2">பாடம்:3 உரிப்பொருள்</td>
                          <td className="border border-[#c69a6f]/70 px-2 py-2">பாடம்:3 உரிப்பொருள்</td>
                          <td className="border border-[#c69a6f]/70 px-2 py-2"></td>
                          <td className="border border-[#c69a6f]/70 px-2 py-2"></td>
                        </tr>
                        <tr>
                          <td className="border border-[#c69a6f]/70 px-2 py-2">பாடம்:4 திணைமயக்கம்</td>
                          <td className="border border-[#c69a6f]/70 px-2 py-2">பாடம்:4 திணைமயக்கம்</td>
                          <td className="border border-[#c69a6f]/70 px-2 py-2">பாடம்:4 திணைமயக்கம்</td>
                          <td className="border border-[#c69a6f]/70 px-2 py-2">பாடம்:4 திணைமயக்கம்</td>
                          <td className="border border-[#c69a6f]/70 px-2 py-2">பாடம்:4 திணைமயக்கம்</td>
                          <td className="border border-[#c69a6f]/70 px-2 py-2"></td>
                          <td className="border border-[#c69a6f]/70 px-2 py-2"></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <p className="text-justify">
                    ஒவ்வொரு பாடமும் ஏற்கனவே குறிக்கப்பட்ட ஒரு துணைக்கூறைக் கொண்டு உருவாக்கப்பட்டுள்ளது.
                    இத் துணைக்கூறு அப்பாடத்தின் கற்றல் விளைவு.
                  </p>

                  <div className="space-y-2">
                    <p className="font-semibold text-[#3b2718]">
                      கருத்தலகு 1 (அக இலக்கியம்) - அலகு 1 : பாடம் 1
                    </p>
                    <p className="font-semibold">செவ்விலக்கியக் கூறுகள்:</p>
                    <ol className="list-decimal space-y-1 pl-6">
                      <li>அகத்திணை அறிதல்</li>
                      <li>முல்லைத்திணை அறிதல்</li>
                      <li>முதற்பொருள் அறிதல்</li>
                      <li>கருப்பொருள் அறிதல்</li>
                      <li>உரிப்பொருள் அறிதல்</li>
                      <li>திணைமயக்கம் அறிதல்</li>
                    </ol>
                  </div>

                  <p className="text-justify">
                    இக்கற்றல் விளைவை கற்போர் அடையும் வகையில் ஒன்றோ இரண்டோ பாடல்கள் செவ்வியல்
                    இலக்கியங்களிலிருந்து தெரிவு செய்யப்படுகின்றன. அப்பாடல்களில் அமைந்துள்ள
                    செவ்வியல் மொழியை கேட்பது (Listening), வாசித்துப் பொருணர்தல் (Reading),
                    எழுதுதல் (Writing) ஆகிய செவ்விலக்கிய மொழித்திறன்களைப் பெறத் துணைக் கற்றல் விளைவுகள் இனங்காணப்படுகின்றன. எ.கா.
                  </p>

                  <div className="space-y-4 rounded-xl border border-[#8f6033]/45 bg-[#fdf3df]/75 p-4">
                    <p className="font-semibold text-[#3b2718]">
                      கருத்தலகு 1 - அலகு 1 : பாடம் 1 (எ.கா. குறுந். 188)
                    </p>

                    <div className="space-y-1">
                      <p className="font-semibold">கேட்புப் பொருணர்தல் (Listening)</p>
                      <p>• பாடலின் மையக் கருத்து அறிதல்</p>
                      <p>• பாடலின் திணைக் கருத்து அறிதல்</p>
                      <p>• பாடலின் நோக்கப்பொருள் அறிதல்</p>
                      <p>• பொருள் உணர்த்தும் பாடல் அமைப்பு அறிதல்</p>
                    </div>

                    <div className="space-y-1">
                      <p className="font-semibold">வாசித்தல் (Reading)</p>
                      <p>• பாடலை உரக்க வாசிக்க அறிதல்</p>
                      <p>• மென்குரலில் வாசித்துப் பொருள் அறிதல்</p>
                      <p>• பழந்தமிழ் இயைபுடன் வாசிக்க அறிதல்</p>
                      <p>• பாடலை இனிசையுடன் பாட அறிதல்</p>
                    </div>

                    <div className="space-y-1">
                      <p className="font-semibold">எழுதுதல் (Writing)</p>
                      <p>• பொருள் அறிந்து தொடர்பான வினாக்களுக்கு பதில் எழுதுதல்</p>
                      <p>• பாடலின் மையக்கருத்து எழுதுதல்</p>
                      <p>• பாடலின் திணைப்பிரிவு எழுதுதல்</p>
                      <p>• கருப்பொருளை விளக்கமாக எழுதுதல்</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <p className="font-semibold">மதிப்பீடு (Assessment)</p>
                    <p className="text-justify">
                      இக்கற்றல் விளைவுகளை கற்போர் அடையும் வகையில் தன்முறைப் பயிற்சி
                      உத்திமுறைகள் (tutorial strategies) வகுக்கப்பட்டுள்ளன.
                    </p>

                    <div className="space-y-1 pl-2">
                      <p>• கருத்துக் கட்டம்</p>
                      <p>• அருஞ்சொற்பொருள்கள்</p>
                      <p>• பொழிப்புரை</p>
                      <p>• பகுப்புரை</p>
                      <p>• மொழிபெயர்ப்பு</p>
                    </div>

                    <p className="text-justify">
                      ஆகிய நிரல்பட்டி (User Interface) தரப்பட்டுள்ளது. ஒரு செவ்வியல் பாடலை
                      வாசித்தலுடன் புரிந்துகொள்ளும் திறனை இத்துணைமுறைப் பயிற்சி மூலம் கற்போர்
                      அடைவது மதிப்பீடு செய்யப்படுகிறது. தொடர்ந்து செவ்விலக்கிய மொழியமைப்பை
                      புரிந்துகொள்ள உதவும் அகப்பொருள் இலக்கணக் கூறுகள் தேர்வுகள் வழியாகவும்
                      மதிப்பீடு செய்யப்படுகின்றன.
                    </p>
                  </div>

                  <div className="overflow-x-auto rounded-xl border border-[#8f6033]/45 bg-[#fff9ee]/78">
                    <table className="min-w-90 w-full border-collapse text-sm sm:text-base">
                      <thead>
                        <tr className="bg-[#edd1a6]/75 text-[#2f1f13]">
                          <th className="border border-[#b2875b]/70 px-3 py-2 text-left">கூற்று (அகம்)</th>
                          <th className="border border-[#b2875b]/70 px-3 py-2 text-left">திணை (அகம்)</th>
                        </tr>
                      </thead>
                      <tbody className="text-[#2f241b]">
                        <tr>
                          <td className="border border-[#c69a6f]/70 px-3 py-2">களவு</td>
                          <td className="border border-[#c69a6f]/70 px-3 py-2">அகத்திணை</td>
                        </tr>
                        <tr>
                          <td className="border border-[#c69a6f]/70 px-3 py-2">கற்பு</td>
                          <td className="border border-[#c69a6f]/70 px-3 py-2">முதற்பொருள்</td>
                        </tr>
                        <tr>
                          <td className="border border-[#c69a6f]/70 px-3 py-2"></td>
                          <td className="border border-[#c69a6f]/70 px-3 py-2">கருப்பொருள்</td>
                        </tr>
                        <tr>
                          <td className="border border-[#c69a6f]/70 px-3 py-2"></td>
                          <td className="border border-[#c69a6f]/70 px-3 py-2">உரிப்பொருள்</td>
                        </tr>
                        <tr>
                          <td className="border border-[#c69a6f]/70 px-3 py-2"></td>
                          <td className="border border-[#c69a6f]/70 px-3 py-2">திணைமயக்கம்</td>
                        </tr>
                        <tr>
                          <td className="border border-[#c69a6f]/70 px-3 py-2"></td>
                          <td className="border border-[#c69a6f]/70 px-3 py-2">கைகோள்</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <p className="text-justify">
                    இக்கற்றல் விளைவுகளை மாணவர் அடைவதற்கு ஏற்ப இக் கருத்தலகின் துணைமுறைப் பயிற்சி
                    உத்திமுறைகள் வகுக்கப்பட்டுள்ளன.
                  </p>

                  <p className="text-justify">
                    இணையவழிச் செம்மொழித் தமிழ் என்னும் இவ்விணைய வகுப்பின் அகம், புறம் ஆகிய
                    இரண்டு கருத்தலகுகள் மட்டுமே தற்போது பதிவேற்றம் செய்யப்பட்டுள்ளன என்பது
                    குறிப்பிடத்தக்கது. பிற கருத்தலகுகள் மதிப்பீட்டு நிலையில் உள்ளன.
                  </p>
                </div>
              ) : isAssessmentView ? (
                <div className="space-y-5">
                  <p className={emphasisClass}>8. மதிப்பீடு</p>

                  <p className="text-justify">
                    கற்றல் விளைவுகளை அளவிடவும், கற்றவர் முன்னேற்றத்தை கண்காணிக்கவும்,
                    இவ்விணைய வகுப்பில் படிநிலை மதிப்பீட்டு முறை பின்பற்றப்படுகிறது.
                  </p>

                  <div className="space-y-2 pl-2">
                    <p>• அலகு முடிவு சுயமதிப்பீட்டு வினாக்கள்</p>
                    <p>• கருத்து புரிதல் அடிப்படையிலான குறுந்தேர்வுகள்</p>
                    <p>• உரை வாசிப்பு மற்றும் விளக்க செயல்பாடுகள்</p>
                    <p>• தொகுதி வாரியான பயன்பாட்டு பணிகள் (Assignments)</p>
                    <p>• முழுமைப் பரிசோதனை வழியாக மொத்த திறன் மதிப்பீடு</p>
                  </div>

                  <div className="space-y-1">
                    <div className="grid grid-cols-[1fr_auto_auto] gap-6">
                      <p>தொடர்ச்சியான மதிப்பீடு</p>
                      <p>=</p>
                      <p>25 மணி</p>
                    </div>
                    <div className="grid grid-cols-[1fr_auto_auto] gap-6">
                      <p>ஒப்படைப்பு / செயல்பாட்டு மதிப்பீடு</p>
                      <p>=</p>
                      <p>25 மணி</p>
                    </div>
                    <div className="mt-2 border-t border-[#7d5a34]/60 pt-2">
                      <div className="grid grid-cols-[1fr_auto_auto] gap-6">
                        <p></p>
                        <p></p>
                        <p className={emphasisClass}>50 மணி</p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : currentContent.length > 0 ? (
                <div className="space-y-5">
                  {currentContent.map((line, index) => (
                    <p
                      key={`${activeItem}-${index}`}
                      className={index > 0 ? "text-justify" : ""}
                    >
                      {line}
                    </p>
                  ))}
                </div>
              ) : (
                <p>இந்தப் பிரிவுக்கான உள்ளடக்கம் விரைவில் சேர்க்கப்படும்.</p>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default VideoLecturesPage;
