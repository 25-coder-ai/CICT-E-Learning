const AboutCard = () => {
  return (
    <section className="h-full" style={{ fontFamily: '"Tiro Tamil", serif' }}>
      <h3
        className="text-left text-2xl font-normal tracking-[0.02em] text-[#E8ECEF] [text-shadow:0_2px_8px_rgba(8,31,28,0.9),0_1px_3px_rgba(8,31,28,0.8)] sm:text-3xl"
        style={{ fontFamily: '"Tiro Tamil", serif' }}
      >
        About CICT
      </h3>
      <p className="mt-3 text-left text-lg font-normal leading-10 text-[#E8ECEF] [text-shadow:0_2px_8px_rgba(8,31,28,0.9),0_1px_3px_rgba(8,31,28,0.8)] sm:text-xl">
        The Central Institute of Classical Tamil (CICT) advances research, learning,
        and preservation of Classical Tamil through publications, digital resources,
        and academic initiatives.
      </p>
    </section>
  );
};

export default AboutCard;
