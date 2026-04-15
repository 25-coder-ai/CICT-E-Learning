import { useState } from "react";

const navItems = ["Home", "About", "Creation","Video Lectures" , "Learners", "Attachments", "Contact"];

const pageByItem = {
  Home: "home",
  About: "about",
  Creation: "creation",
  "Video Lectures": "video-lectures",
  Learners: "learners",
  Attachments: "attachments",
  Contact: "contact",
};

const Navbar = ({ isOpen, onClose, currentPage = "home", onNavigate }) => {
  const [activeItem, setActiveItem] = useState("Home");

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
        className={`absolute inset-0 bg-[#261508]/45 backdrop-blur-[1px] transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      />

      <nav
        className={`absolute left-0 top-0 h-full w-[min(86vw,360px)] border-r border-[#8f612d]/80 bg-linear-to-b from-[#e2bf87]/95 via-[#d5ab73]/94 to-[#c99861]/95 p-4 shadow-[inset_0_1px_0_rgba(255,235,194,0.4),16px_0_34px_rgba(77,48,20,0.28)] backdrop-blur-lg transition-all duration-300 ${
          isOpen ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"
        }`}
      >
        <div className="mb-4 flex items-center justify-between px-2">
          <p
            className="text-sm font-bold tracking-[0.12em] text-[#4a2a13]"
            style={{ fontFamily: '"Cinzel", "Noto Serif Tamil", serif' }}
          >
            PORTAL MENU
          </p>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-[#875a29]/85 bg-[#f2dfbc] px-3 py-1 text-xs font-semibold text-[#4f2f15] transition-all duration-200 hover:bg-[#e9cea0]"
          >
            Close
          </button>
        </div>

        <div className="pointer-events-none absolute inset-x-4 top-0 h-px bg-linear-to-r from-transparent via-[#f6e8ca] to-transparent" />
        <ul className="grid grid-cols-1 gap-2">
          {navItems.map((item) => (
            <li key={item}>
              <a
                href="#"
                onClick={(event) => {
                  event.preventDefault();
                  setActiveItem(item);
                  onNavigate?.(getPageFromItem(item));
                  onClose();
                }}
                className={`group relative inline-flex w-full items-center justify-start gap-2 overflow-hidden rounded-xl border px-4 py-3 text-sm font-bold tracking-[0.025em] transition-all duration-300 hover:translate-x-1 hover:shadow-lg ${
                  currentPage === getPageFromItem(item) ||
                  activeItem === item
                    ? "border-[#825226] bg-linear-to-r from-[#d6a467] via-[#c99255] to-[#d8a96f] text-[#3d220e] shadow-[inset_0_1px_0_rgba(255,233,189,0.42),0_8px_18px_rgba(94,58,25,0.3)]"
                    : "border-[#b4824e]/70 bg-[#f2ddba]/45 text-[#4e2e17] [text-shadow:0_1px_0_rgba(255,255,255,0.24)] hover:border-[#915f2e] hover:bg-[#edd1a0]/85 hover:text-[#3e220f]"
                }`}
              >
                <span className="absolute inset-0 bg-linear-to-r from-[#ffffff00] via-[#fff0d3] to-[#ffffff00] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <span className="absolute -left-14 top-0 h-full w-8 rotate-12 bg-[#fff8e8]/60 opacity-0 blur-[1px] transition-all duration-500 group-hover:left-[105%] group-hover:opacity-75" />
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
                <span className="relative drop-shadow-[0_1px_0_rgba(255,255,255,0.25)]">{item}</span>
                <span
                  className={`absolute bottom-0 left-4 h-0.5 rounded-full transition-all duration-300 ${
                    currentPage === getPageFromItem(item) ||
                    activeItem === item
                      ? "w-16 bg-[#6f3f19] shadow-[0_0_10px_rgba(111,63,25,0.5)]"
                      : "w-0 bg-[#7d4d24] group-hover:w-14"
                  }`}
                />
              </a>
            </li>
          ))}
        </ul>

        <div className="pointer-events-none mt-4 h-px w-full bg-linear-to-r from-transparent via-[#cfa36d] to-transparent motion-safe:animate-pulse" />
      </nav>
    </div>
  );
};

export default Navbar;
