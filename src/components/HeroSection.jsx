const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-linear-to-r from-[#083A4F] via-[#083A4F] to-[#407E8C] text-white">
      <img
        src="/world.svg"
        alt="Abstract world map"
        className="pointer-events-none absolute inset-y-0 right-0 hidden h-full w-1/2 object-cover opacity-35 lg:block"
      />

      <div className="relative mx-auto grid max-w-7xl gap-10 px-6 py-12 md:grid-cols-2 md:items-center md:py-16">
        <div className="space-y-5">
          <img
            src="/emblem.svg"
            alt="Institute emblem"
            className="h-20 w-20 rounded-full bg-white/10 p-1 shadow-lg"
          />
          <h2 className="text-2xl font-extralight leading-tight sm:text-3xl md:text-4xl">
            Central Institute of Classical Tamil
          </h2>
          <p className="text-base text-[#E5E1DD] sm:text-lg">
            உலகத் தமிழர்களுக்கான டிஜிட்டல் கற்றல் வாயில்
          </p>
        </div>

        <div className="justify-self-start rounded-2xl border border-[#C0D5D6]/20 bg-[#C0D5D6]/10 p-6 shadow-xl backdrop-blur md:justify-self-end">
          <p className="text-sm uppercase tracking-[0.22em] text-[#C0D5D6]">CTO 24x7</p>
          <p className="mt-2 text-3xl font-bold text-white sm:text-4xl">E-Learning</p>
          <p className="mt-2 text-sm text-[#E5E1DD]">Government Academic Knowledge Portal</p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
