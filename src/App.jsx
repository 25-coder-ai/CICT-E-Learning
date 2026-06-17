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
import AcknowledgementPage from "./pages/AcknowledgementPage";
import LoginPage from "./pages/LoginPage";

const pageComponents = {
  home: HomePage,
  about: AboutPage,
  creation: CreationPage,
  "video-lectures": VideoLecturesPage,
  learners: LearnersPage,
  attachments: AttachmentsPage,
  contact: ContactPage,
  acknowledgement: AcknowledgementPage,
  login: LoginPage,
};

const pageTitles = {
  home: "Central Institute of Classical Tamil",
  about: "எங்களைப் பற்றி",
  creation: "உருவாக்கம்",
  "video-lectures": "Video Lectures",
  learners: "கற்போர்",
  attachments: "இணைப்புகள்",
  contact: "தொடர்புக்கு",
  acknowledgement: "நன்றி – Acknowledgement",
  login: "Login",
};

const App = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState("home");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const id = window.requestAnimationFrame(() => setIsVisible(true));
    return () => window.cancelAnimationFrame(id);
  }, []);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setCurrentPage("video-lectures");
  };

  const ActivePage = pageComponents[currentPage] || HomePage;
  const pageTitle = pageTitles[currentPage] || pageTitles.home;
  const isVideoLectures = currentPage === 'video-lectures';
  const isHome = currentPage === 'home';
  const isCreation = currentPage === 'creation';
  const isLearners = currentPage === 'learners';
  const isAttachments = currentPage === 'attachments';
  const isContact = currentPage === 'contact';
  const useImageBg = !isVideoLectures;
  const bgImage = isHome ? '/home-bg.jpg'
    : isCreation ? '/creation-bg.jpg'
    : isLearners ? '/learners-bg.jpg'
    : isAttachments ? '/attachments-bg.jpg'
    : isContact ? '/contact-bg.jpg'
    : '/pallava-relief.jpg';

  return (
    <div
      className="relative isolate min-h-screen overflow-x-hidden text-slate-900"
      style={{ fontFamily: '"Tiro Tamil", serif' }}
    >
      {/* All pages except video-lectures: pallava relief background */}
      {useImageBg && (
        <img
          src={bgImage}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full object-cover object-top select-none -z-10"
          style={{ opacity: 0.45 }}
        />
      )}

      {/* Video Lectures: solid background */}
      {isVideoLectures && (
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 -z-20"
          style={{ backgroundColor: '#E5E1DD' }}
        />
      )}

      <Header
        isMenuOpen={isMenuOpen}
        onMenuToggle={() => setIsMenuOpen((previous) => !previous)}
        isGlass={useImageBg}
        isLoggedIn={isLoggedIn}
        onLoginClick={() => setCurrentPage("login")}
        onLogoutClick={() => {
          setIsLoggedIn(false);
          setCurrentPage("home");
        }}
      />
      <Navbar
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        currentPage={currentPage}
        onNavigate={(page) => setCurrentPage(page)}
        isLoggedIn={isLoggedIn}
      />

      <section className="relative z-10 mx-auto max-w-7xl px-6 pt-10">
        <h2
          className="text-center text-3xl font-bold leading-[1.6] tracking-[0.03em] overflow-visible sm:text-4xl md:text-5xl"
          style={{ fontFamily: '"Tiro Tamil", serif' }}
        >
          <span className={useImageBg
            ? 'text-[#E8ECEF] [text-shadow:0_2px_8px_rgba(8,31,28,0.9),0_1px_3px_rgba(8,31,28,0.8)]'
            : 'bg-linear-to-r from-[#083A4F] via-[#407E8C] to-[#083A4F] bg-clip-text text-transparent'
          }>
            {pageTitle}
          </span>
        </h2>
        <div className={`mt-3 h-px w-full ${useImageBg ? 'bg-[#E8ECEF]/30' : 'bg-[#131936]/25'}`} />
      </section>

      <main
        className={`mx-auto max-w-7xl space-y-6 px-6 py-10 transition-all duration-700 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
        }`}
      >
        <ActivePage onNavigate={setCurrentPage} onLoginSuccess={handleLoginSuccess} />
      </main>

      <Footer />
    </div>
  );
};

export default App;
