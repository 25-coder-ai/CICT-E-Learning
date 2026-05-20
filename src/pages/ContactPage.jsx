const MAPS_LINK =
  "https://www.google.com/maps?ll=12.905287,80.210781&z=16&t=m&hl=en&gl=IN&mapclient=embed&q=Central+Institute+Of+Classical+Tamil+Sholinganallur+Chennai,+Tamil+Nadu+600100";

const EMBED_SRC =
  "https://maps.google.com/maps?ll=12.905287,80.210781&z=16&t=m&hl=en&gl=IN&mapclient=embed&q=Central+Institute+Of+Classical+Tamil+Sholinganallur+Chennai,+Tamil+Nadu+600100&output=embed";

const ContactPage = () => {
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
        தொடர்புக்கு
      </h3>

      {/* Divider */}
      <div className="mt-4 h-px w-full bg-[#b98a53]/40" />

      {/* Two-column layout */}
      <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-2">

        {/* ── Left: Contact Details ── */}
        <div className="space-y-6">

          {/* CONTACT label */}
          <p
            className="text-xs font-bold uppercase tracking-widest text-[#b98a53]"
            style={{ fontFamily: '"Cinzel", serif' }}
          >
            Contact
          </p>

          {/* Tamil address block */}
          <div>
            <p className="font-semibold text-[#3f2310] text-[15px] leading-7">
              செம்மொழித் தமிழாய்வு மத்திய நிறுவனம்
            </p>
            <p className="text-[14px] leading-7 text-[#3f2f20]">
              செம்மொழிச் சாலை
              <br />
              பெரும்பாக்கம்
              <br />
              சென்னை 600 100, தமிழ்நாடு, இந்தியா.
            </p>
          </div>

          {/* English address block */}
          <div>
            <p className="font-semibold text-[#3f2310] text-[15px] leading-7">
              Central Institute Classical Tamil
            </p>
            <p className="text-[14px] leading-7 text-[#3f2f20]">
              Chemmozhi Salai
              <br />
              Perumbakkam
              <br />
              Chennai 600 100, Tamilnadu, India.
            </p>
          </div>

          {/* Divider */}
          <div className="h-px w-full bg-[#b98a53]/30" />

          {/* Phone / Fax / Email */}
          <div>
            <p className="font-semibold text-[#3f2310] text-[15px] mb-2">
              தொலைபேசி
            </p>
            <table className="text-[14px] leading-7 text-[#3f2f20] w-full">
              <tbody>
                <tr>
                  <td className="pr-3 font-medium whitespace-nowrap">இயக்குநர் :</td>
                  <td>+91-44- 22540124</td>
                </tr>
                <tr>
                  <td className="pr-3 font-medium whitespace-nowrap">
                    அலுவலகம் :
                  </td>
                  <td>+91-44-22540125(நேரிடை)</td>
                </tr>
                <tr>
                  <td className="pr-3 font-medium whitespace-nowrap">
                    தொலை நகல் :
                  </td>
                  <td>+91 - 44 - 22540125</td>
                </tr>
                <tr>
                  <td className="pr-3 font-medium whitespace-nowrap">
                    மின்னஞ்சல்:
                  </td>
                  <td>
                    <a
                      href="mailto:ctol@cict.in"
                      className="text-[#1a5276] underline underline-offset-2 hover:text-[#154360] transition-colors duration-200"
                    >
                      ctol@cict.in
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* ── Right: Interactive Google Map ── */}
        <div className="flex flex-col gap-2">
          <p
            className="text-xs font-bold uppercase tracking-widest text-[#b98a53]"
            style={{ fontFamily: '"Cinzel", serif' }}
          >
            வரைபடம்
          </p>

          {/* Clickable map wrapper */}
          <a
            href={MAPS_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative block overflow-hidden rounded-xl border border-[#b98a53]/40 shadow-md transition-all duration-300 hover:shadow-[0_6px_24px_rgba(86,52,22,0.25)] hover:border-[#b98a53]/70"
            aria-label="Open location in Google Maps"
            title="Click to open in Google Maps"
          >
            {/* Embedded map iframe — non-interactive, clicks bubble to the <a> */}
            <iframe
              src={EMBED_SRC}
              width="100%"
              height="300"
              style={{ border: 0, display: "block", pointerEvents: "none" }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="CICT Location Map"
              className="rounded-xl"
            />

            {/* Hover overlay */}
            <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-[#3f2310]/0 transition-all duration-300 group-hover:bg-[#3f2310]/10">
              <span className="translate-y-2 rounded-full bg-[#3f2310]/80 px-4 py-2 text-xs font-semibold text-[#f5e6c8] opacity-0 shadow-lg transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                📍 Google Maps-ல் திற
              </span>
            </div>
          </a>

          {/* "Open in Maps" helper link */}
          <a
            href={MAPS_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 self-start text-xs font-semibold text-[#1a5276] underline underline-offset-2 hover:text-[#154360] transition-colors duration-200"
          >
            ↗ Google Maps-ல் திற
          </a>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;
