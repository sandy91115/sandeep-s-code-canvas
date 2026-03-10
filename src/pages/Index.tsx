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
import SectionTransition from "@/components/animations/SectionTransition";
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
        <SectionTransition><AboutSection /></SectionTransition>
        <SectionTransition><SkillsSection /></SectionTransition>
        <SectionTransition><ExperienceSection /></SectionTransition>
        <SectionTransition><ProjectsSection /></SectionTransition>
        <SectionTransition><TechStackSection /></SectionTransition>
        <SectionTransition><RoadmapSection /></SectionTransition>
        <SectionTransition><ContactSection /></SectionTransition>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
