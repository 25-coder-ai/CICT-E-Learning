const MAPS_LINK =
  "https://www.google.com/maps?ll=12.905287,80.210781&z=16&t=m&hl=en&gl=IN&mapclient=embed&q=Central+Institute+Of+Classical+Tamil+Sholinganallur+Chennai,+Tamil+Nadu+600100";

const EMBED_SRC =
  "https://maps.google.com/maps?ll=12.905287,80.210781&z=16&t=m&hl=en&gl=IN&mapclient=embed&q=Central+Institute+Of+Classical+Tamil+Sholinganallur+Chennai,+Tamil+Nadu+600100&output=embed";

const textCls = "text-[#E8ECEF] [text-shadow:0_2px_8px_rgba(8,31,28,0.9),0_1px_3px_rgba(8,31,28,0.8)]";

const ContactPage = () => {
  return (
    <div style={{ fontFamily: '"Tiro Tamil", serif' }}>
      <h3
        className={`text-3xl font-normal tracking-[0.02em] sm:text-4xl ${textCls}`}
        style={{ fontFamily: '"Tiro Tamil", serif' }}
      >
        தொடர்புக்கு
      </h3>

      <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-2">

        {/* ── Left: Contact Details ── */}
        <div className="space-y-6">
          <p className={`text-sm font-bold uppercase tracking-widest ${textCls}`}>Contact</p>

          <div>
            <p className={`font-semibold text-[15px] leading-7 ${textCls}`}>
              செம்மொழித் தமிழாய்வு மத்திய நிறுவனம்
            </p>
            <p className={`text-[14px] leading-7 ${textCls}`}>
              செம்மொழிச் சாலை<br />
              பெரும்பாக்கம்<br />
              சென்னை 600 100, தமிழ்நாடு, இந்தியா.
            </p>
          </div>

          <div>
            <p className={`font-semibold text-[15px] leading-7 ${textCls}`}>
              Central Institute Classical Tamil
            </p>
            <p className={`text-[14px] leading-7 ${textCls}`}>
              Chemmozhi Salai<br />
              Perumbakkam<br />
              Chennai 600 100, Tamilnadu, India.
            </p>
          </div>

          <div className="h-px w-full bg-[#E8ECEF]/20" />

          <div>
            <p className={`font-semibold text-[15px] mb-2 ${textCls}`}>தொலைபேசி</p>
            <table className={`text-[14px] leading-7 w-full ${textCls}`}>
              <tbody>
                <tr>
                  <td className="pr-3 font-medium whitespace-nowrap">இயக்குநர் :</td>
                  <td>+91-44- 22540124</td>
                </tr>
                <tr>
                  <td className="pr-3 font-medium whitespace-nowrap">அலுவலகம் :</td>
                  <td>+91-44-22540125(நேரிடை)</td>
                </tr>
                <tr>
                  <td className="pr-3 font-medium whitespace-nowrap">தொலை நகல் :</td>
                  <td>+91 - 44 - 22540125</td>
                </tr>
                <tr>
                  <td className="pr-3 font-medium whitespace-nowrap">மின்னஞ்சல்:</td>
                  <td>
                    <a
                      href="mailto:ctol@cict.in"
                      className={`underline underline-offset-2 transition-colors duration-200 hover:opacity-70 ${textCls}`}
                    >
                      ctol@cict.in
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* ── Right: Google Map ── */}
        <div className="flex flex-col gap-2">
          <p className={`text-sm font-bold uppercase tracking-widest ${textCls}`}>வரைபடம்</p>

          <a
            href={MAPS_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative block overflow-hidden rounded-xl border border-[#E8ECEF]/30 shadow-md transition-all duration-300 hover:border-[#E8ECEF]/60"
            aria-label="Open location in Google Maps"
            title="Click to open in Google Maps"
          >
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
            <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-[#083A4F]/0 transition-all duration-300 group-hover:bg-[#083A4F]/10">
              <span className="translate-y-2 rounded-full bg-[#083A4F]/80 px-4 py-2 text-xs font-semibold text-[#E5E1DD] opacity-0 shadow-lg transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                📍 Google Maps-ல் திற
              </span>
            </div>
          </a>

          <a
            href={MAPS_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className={`mt-1 self-start text-xs font-semibold underline underline-offset-2 transition-colors duration-200 hover:opacity-70 ${textCls}`}
          >
            ↗ Google Maps-ல் திற
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
