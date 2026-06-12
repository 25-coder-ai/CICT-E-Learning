const AboutPage = () => {
  const activities = [
    "புழந்தமிழ் நூல்களின் செம்பதிப்பு",
    "புழந்தமிழ் நூல்களை மொழிபெயர்த்தல்",
    "வரலாற்று முறை தமிழ் இலக்கணம் வகுத்தல்",
    "தமிழின் தொன்மை – பன்முக ஆய்வு",
    "தமிழ் வழக்காற்றாய்வு",
    "தமிழியும் பிறமொழிகளும்",
    "புழந்தமிழ் ஆய்வுக்கான மின்னுலகம்",
    "இணையவழி செம்மொழித் தமிழ்க் கல்வி",
    "புழந்தமிழ் நூல்களுக்கான தரவகம்",
    "புழந்தமிழ்க் காட்சிக் குறும்படங்கள்",
  ];

  return (
    <div style={{ fontFamily: '"Tiro Tamil", serif' }}>
      <h3
        className="text-3xl font-normal tracking-[0.02em] text-[#E8ECEF] [text-shadow:0_2px_8px_rgba(8,31,28,0.9),0_1px_3px_rgba(8,31,28,0.8)] sm:text-4xl"
        style={{ fontFamily: '"Tiro Tamil", serif' }}
      >
        நிறுவனத்தைப் பற்றி
      </h3>

      <p className="mt-2 text-lg font-normal text-[#E8ECEF] [text-shadow:0_2px_8px_rgba(8,31,28,0.9),0_1px_3px_rgba(8,31,28,0.8)] sm:text-xl">
        செம்மொழித் தமிழாய்வு மத்திய நிறுவனம்
      </p>

      <p className="mt-5 text-lg font-normal leading-10 text-[#E8ECEF] [text-shadow:0_2px_8px_rgba(8,31,28,0.9),0_1px_3px_rgba(8,31,28,0.8)] sm:text-xl">
        செம்மொழித் தமிழாய்வு மத்திய நிறுவனம், இந்திய அரசின் கல்வி
        அமைச்சகத்தின் கீழ் இயங்கும் ஒரு தன்னாட்சி ஆய்வு நிறுவனம். இது
        உலகளவில் செம்மொழித் தமிழ்க்கென்று திறப்பு பெற்றுள்ள உயராய்வு
        மையமாக விளங்குகிறது. 2006 மார்ச் முதல் 2008 மே 18 வரை மைசூரிலுள்ள
        இந்திய மொழிகளின் தேசிய நிறுவனத்தில் செம்மொழித் தமிழ் உயராய்வு மையம்
        என்னும் பெயரில் செயற்பட்டுவந்தது. 2012ஆம் ஆண்டு இல்லஸ்தில் இயங்கி
        வந்த செம்மொழி தமிழாய்வு மத்திய நிறுவனம் இட மாற்றம் செய்யப்பட்டு,
        தரமணியில் உள்ள காலைப் போக்குவரத்து நிறுவன வளாகத்தில் தொடர்ந்து
        செயல்பட்டு வந்தது.
      </p>c

      <p className="mt-4 text-lg font-normal leading-10 text-[#E8ECEF] [text-shadow:0_2px_8px_rgba(8,31,28,0.9),0_1px_3px_rgba(8,31,28,0.8)] sm:text-xl">
        இந்நிறுவனத்தின் புதிய வளாகம் (பெரும்பாக்கம், சென்னை) 12.01.2022
        அன்று மாண்புமிகு பாரத பிரதமர் நரேந்திரமோடி அவர்களால், மாண்புமிகு
        தமிழக முதலவர் அவர்கள் முன்னிலையில் திறந்து வைக்கப்பட்டு சிறப்பாக
        செயல்படுகிறது.
      </p>

      <p className="mt-4 text-lg font-normal leading-10 text-[#E8ECEF] [text-shadow:0_2px_8px_rgba(8,31,28,0.9),0_1px_3px_rgba(8,31,28,0.8)] sm:text-xl">
        தமிழின் தொன்மையையும் தனித்தன்மையையும் உலகுணர் செய்யும் வகையில்
        பல்வேறு பணிகளை இந்நிறுவனம் மேற்கொண்டு வருகிறது. ஆர்வலர்களின்
        ஒருமித்த கருத்திற்கிணங்க செம்மொழித் தமிழ் திட்டப் பணிகள்
        மேற்கொள்ளப்பற்று வழங்கப்படுகிறது. தொன்மை காலம் தொடங்கி கி.பி. 6 ஆம்
        நூற்றாண்டு வரையுள்ள செம்மொழித் தமிழ மையப்படுத்தி செம்மொழி தமிழின்
        தொன்மையையும் தனித்தன்மையையும் உலகுக்கு எடுத்துரைக்கும் நோக்கில்,
        உடனடியாக செயற்படுத்த வேண்டிய பத்து முன்னுரிமை திட்டப்பணிகள்
        வகுக்கப்பட்டுள்ளன.
      </p>

      <ul className="mt-5 space-y-3">
        {activities.map((item, index) => (
          <li key={index} className="flex items-start gap-3">
            <span className="mt-2.5 h-3 w-3 shrink-0 rounded-full bg-[#457472]" />
            <span className="text-lg font-normal leading-9 text-[#E8ECEF] [text-shadow:0_2px_8px_rgba(8,31,28,0.9),0_1px_3px_rgba(8,31,28,0.8)] sm:text-xl">
              {item}
            </span>
          </li>
        ))}
      </ul>

      <p className="mt-6 text-lg font-normal text-[#E8ECEF] [text-shadow:0_2px_8px_rgba(8,31,28,0.9),0_1px_3px_rgba(8,31,28,0.8)] sm:text-xl">
        மேலும் &gt;&gt;{" "}
        <a
          href="https://www.cict.in"
          target="_blank"
          rel="noopener noreferrer"
          className="font-normal text-[#E8ECEF] underline underline-offset-2 transition-colors duration-200 hover:text-[#E8ECEF]/70"
        >
          www.cict.in
        </a>
      </p>
    </div>
  );
};

export default AboutPage;
