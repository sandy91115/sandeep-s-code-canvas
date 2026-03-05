import { useState } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ExperienceSection from "@/components/ExperienceSection";
import ProjectsSection from "@/components/ProjectsSection";
import TechStackSection from "@/components/TechStackSection";
import RoadmapSection from "@/components/RoadmapSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import ParallaxSection from "@/components/animations/ParallaxSection";
import useSmoothScroll from "@/hooks/useSmoothScroll";

const Index = () => {
  const [loading, setLoading] = useState(true);
  useSmoothScroll();

  return (
    <div className="bg-background text-foreground min-h-screen">
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      <CustomCursor />
      <Navbar />
      <main>
        <HeroSection />
        <ParallaxSection speed={0.2}>
          <AboutSection />
        </ParallaxSection>
        <ParallaxSection speed={0.15}>
          <SkillsSection />
        </ParallaxSection>
        <ParallaxSection speed={0.25}>
          <ExperienceSection />
        </ParallaxSection>
        <ParallaxSection speed={0.1}>
          <ProjectsSection />
        </ParallaxSection>
        <ParallaxSection speed={0.2}>
          <TechStackSection />
        </ParallaxSection>
        <ParallaxSection speed={0.15}>
          <RoadmapSection />
        </ParallaxSection>
        <ParallaxSection speed={0.1}>
          <ContactSection />
        </ParallaxSection>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
