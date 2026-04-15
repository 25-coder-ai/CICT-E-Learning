const CreationPage = () => {
  return (
    <section className="rounded-2xl border border-[#b98a53]/50 bg-linear-to-b from-[#f1d4a2]/34 to-[#e1b985]/26 p-6 shadow-[inset_0_1px_0_rgba(255,244,219,0.52),0_14px_30px_rgba(86,52,22,0.16)] backdrop-blur-md sm:p-8">
      <h3
        className="text-2xl font-bold tracking-[0.02em] text-[#3f2310] sm:text-3xl"
        style={{ fontFamily: '"Cinzel", "Noto Serif Tamil", serif' }}
      >
        Creation
      </h3>
      <p className="mt-4 text-base leading-8 text-[#3f2f20] sm:text-lg">
        This page is reserved for Creation content and follows your current UI theme.
      </p>
    </section>
  );
};

export default CreationPage;
