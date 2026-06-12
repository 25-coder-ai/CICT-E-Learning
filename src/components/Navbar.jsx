import { useState } from "react";

const navItems = ["Home", "எங்களைப் பற்றி", "உருவாக்கம்", "Video Lectures", "கற்போர்", "இணைப்புகள்", "தொடர்புக்கு"];

const itemColors = ["#091433", "#394f3d", "#9c451b", "#561118"];
const itemColorsTranslucent = ["rgba(9,20,51,0.6)", "rgba(57,79,61,0.6)", "rgba(156,69,27,0.6)", "rgba(86,17,24,0.6)"];

const pageByItem = {
  Home: "home",
  "எங்களைப் பற்றி": "about",
  "உருவாக்கம்": "creation",
  "Video Lectures": "video-lectures",
  "கற்போர்": "learners",
  "இணைப்புகள்": "attachments",
  "தொடர்புக்கு": "contact",
};

const Navbar = ({ isOpen, onClose, currentPage = "home", onNavigate }) => {
  const [activeItem, setActiveItem] = useState("Home");
  const [hoveredItem, setHoveredItem] = useState(null);

  const getPageFromItem = (item) => pageByItem[item] || "home";

  return (
    <div
      className={`fixed inset-0 z-50 transition-all duration-300 ${
        isOpen ? "pointer-events-auto" : "pointer-events-none"
      }`}
      aria-hidden={!isOpen}
    >
      <button
        type="button"
        aria-label="Close menu overlay"
        onClick={onClose}
        className={`absolute inset-0 bg-[#083A4F]/45 backdrop-blur-[1px] transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      />

      <nav
        className={`absolute left-0 top-0 h-full w-[min(86vw,360px)] overflow-hidden border-r border-[#407E8C]/80 bg-[#0f0c09] p-4 shadow-[inset_0_1px_0_rgba(192,213,214,0.4),16px_0_34px_rgba(8,58,79,0.28)] transition-all duration-300 ${
          isOpen ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"
        }`}
      >
        <img
          src="/navbar-bg.jpg"
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center select-none"
          style={{ opacity: 0.60 }}
        />
        <div className="relative flex flex-col h-full">
        <div className="mb-4 flex items-center justify-between px-2">
          <p
            className="text-sm font-bold tracking-[0.12em] text-[#E5E1DD]"
            style={{ fontFamily: '"Cinzel", "Noto Serif Tamil", serif' }}
          >
            PORTAL MENU
          </p>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-[#407E8C]/85 bg-[#407E8C]/20 px-3 py-1 text-xs font-semibold text-[#E5E1DD] transition-all duration-200 hover:bg-[#407E8C]/35"
          >
            Close
          </button>
        </div>

        <ul className="grid grid-cols-1 gap-2">
          {navItems.map((item, index) => {
            const isActive = currentPage === getPageFromItem(item) || activeItem === item;
            const colorIndex = index % itemColors.length;
            const borderColor = itemColors[colorIndex];
            const bgColor = isActive
              ? itemColors[colorIndex]
              : hoveredItem === item
                ? itemColorsTranslucent[colorIndex]
                : "transparent";
            return (
              <li key={item}>
                <a
                  href="#"
                  onClick={(event) => {
                    event.preventDefault();
                    setActiveItem(item);
                    onNavigate?.(getPageFromItem(item));
                    onClose();
                  }}
                  onMouseEnter={() => setHoveredItem(item)}
                  onMouseLeave={() => setHoveredItem(null)}
                  className="group relative inline-flex w-full items-center justify-start gap-2 overflow-hidden rounded-xl border-2 px-4 py-3 text-sm font-bold tracking-[0.025em] text-[#E5E1DD] transition-all duration-300 hover:translate-x-1 hover:shadow-lg"
                  style={{ borderColor, backgroundColor: bgColor }}
                >
                  <span className="absolute inset-0 bg-linear-to-r from-[#ffffff00] via-white/10 to-[#ffffff00] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <span className="absolute -left-14 top-0 h-full w-8 rotate-12 bg-[#E5E1DD]/30 opacity-0 blur-[1px] transition-all duration-500 group-hover:left-[105%] group-hover:opacity-75" />
                  {item === "Home" && (
                    <svg
                      className="relative h-4 w-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M10 2.5l7 5.8V18a1 1 0 01-1 1h-4.5v-5h-3v5H4a1 1 0 01-1-1V8.3l7-5.8z" />
                    </svg>
                  )}
                  <span className="relative drop-shadow-[0_1px_0_rgba(0,0,0,0.4)]">{item}</span>
                  <span
                    className={`absolute bottom-0 left-4 h-0.5 rounded-full transition-all duration-300 ${
                      isActive
                        ? "w-16 bg-[#E5E1DD] shadow-[0_0_10px_rgba(229,225,221,0.5)]"
                        : "w-0 bg-[#E5E1DD]/60 group-hover:w-14"
                    }`}
                  />
                </a>
              </li>
            );
          })}
        </ul>

        </div>
      </nav>
    </div>
  );
};

export default Navbar;
