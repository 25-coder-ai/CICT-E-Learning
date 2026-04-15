import ContentSection from "../components/ContentSection";
import AboutCard from "../components/AboutCard";
import CictScrollSection from "../components/CictScrollSection";

const HomePage = () => {
  return (
    <div className="space-y-6">
      <ContentSection />
      <div className="grid items-stretch gap-6 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
        <div className="h-full">
          <AboutCard />
        </div>
        <div className="h-full">
          <CictScrollSection />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
