const AboutCard = () => {
  return (
    <section className="h-full rounded-2xl border border-[#b98a53]/50 bg-linear-to-b from-[#f1d4a2]/36 to-[#e1b985]/28 p-5 shadow-[inset_0_1px_0_rgba(255,244,219,0.5),0_12px_26px_rgba(86,52,22,0.16)] backdrop-blur-md sm:p-6">
      <h3
        className="text-left text-xl font-bold tracking-[0.02em] text-[#3f2310] sm:text-2xl"
        style={{ fontFamily: '"Cinzel", "Noto Serif Tamil", serif' }}
      >
        About CICT
      </h3>
      <p className="mt-3 text-left text-[15px] leading-7 text-[#4b2f17] sm:text-base">
        The Central Institute of Classical Tamil (CICT) advances research, learning,
        and preservation of Classical Tamil through publications, digital resources,
        and academic initiatives.
      </p>
    </section>
  );
};

export default AboutCard;
