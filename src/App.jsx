import { useEffect, useState } from "react";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import CreationPage from "./pages/CreationPage";
import VideoLecturesPage from "./pages/VideoLecturesPage";
import LearnersPage from "./pages/LearnersPage";
import AttachmentsPage from "./pages/AttachmentsPage";
import ContactPage from "./pages/ContactPage";

const pageComponents = {
  home: HomePage,
  about: AboutPage,
  creation: CreationPage,
  "video-lectures": VideoLecturesPage,
  learners: LearnersPage,
  attachments: AttachmentsPage,
  contact: ContactPage,
};

const pageTitles = {
  home: "Central Institute of Classical Tamil",
  about: "About",
  creation: "Creation",
  "video-lectures": "Video Lectures",
  learners: "Learners",
  attachments: "Attachments",
  contact: "Contact",
};

const App = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState("home");

  useEffect(() => {
    const id = window.requestAnimationFrame(() => setIsVisible(true));
    return () => window.cancelAnimationFrame(id);
  }, []);

  const ActivePage = pageComponents[currentPage] || HomePage;
  const pageTitle = pageTitles[currentPage] || pageTitles.home;

  return (
    <div
      className="relative isolate min-h-screen overflow-x-hidden text-slate-900"
      style={{ fontFamily: '"Cormorant Garamond", "Noto Serif Tamil", serif' }}
    >
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-20">
        <img
          src="/profile.jpg"
          alt=""
          className="h-full w-full object-cover object-center"
          loading="eager"
          decoding="async"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-linear-to-b from-[#fffaf0]/48 via-[#f7edd4]/42 to-[#efdfbe]/46" />
      </div>

      <Header
        isMenuOpen={isMenuOpen}
        onMenuToggle={() => setIsMenuOpen((previous) => !previous)}
      />
      <Navbar
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        currentPage={currentPage}
        onNavigate={(page) => setCurrentPage(page)}
      />

      <section className="relative z-10 mx-auto max-w-7xl px-6 pt-8">
        <h2
          className="text-center text-3xl font-bold tracking-[0.03em] [text-shadow:0_2px_14px_rgba(52,32,14,0.3)] sm:text-4xl md:text-5xl"
          style={{ fontFamily: '"Cinzel", "Noto Serif Tamil", serif' }}
        >
          <span className="bg-linear-to-r from-[#40210d] via-[#6a3f1a] to-[#7a4e22] bg-clip-text text-transparent">
            {pageTitle}
          </span>
        </h2>
        <div className="mx-auto mt-3 h-1 w-44 rounded-full bg-linear-to-r from-[#4e2c10]/85 via-[#9c6c31]/90 to-[#5c3413]/85 shadow-[0_0_10px_rgba(106,62,27,0.35)]" />
      </section>

      <main
        className={`mx-auto max-w-7xl space-y-6 px-6 py-10 transition-all duration-700 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
        }`}
      >
        <ActivePage />
      </main>

      <Footer />
    </div>
  );
};

export default App;
