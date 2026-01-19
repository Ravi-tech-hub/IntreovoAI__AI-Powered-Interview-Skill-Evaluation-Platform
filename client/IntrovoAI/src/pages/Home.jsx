import HeroSection from "../components/Landing/HeroSection";
import FeatureSection from "../components/Landing/FeatureSection";
import HowItWorkSection from "../components/Landing/HowItWorkSection";
import CTASection from "../components/Landing/CTASection";

const Home = () => {
  return (
    <div className="bg-gray-50">
      <HeroSection />
      <FeatureSection />
      <HowItWorkSection />
      <CTASection />
    </div>
  );
};

export default Home;
