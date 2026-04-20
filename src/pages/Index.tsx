import { useEffect } from "react";
import { CustomCursor } from "@/lib/cursor";
import { GrainOverlay } from "@/lib/grain";
import { ScrollProgress } from "@/lib/scrollProgress";
import { LoadSequence } from "@/components/portfolio/LoadSequence";
import { Navbar } from "@/components/portfolio/Navbar";
import { Hero } from "@/components/portfolio/Hero";
import { About } from "@/components/portfolio/About";
import { Skills } from "@/components/portfolio/Skills";
import { Experience } from "@/components/portfolio/Experience";
import { Projects } from "@/components/portfolio/Projects";
import { Resume } from "@/components/portfolio/Resume";
import { Contact } from "@/components/portfolio/Contact";

const Index = () => {
  useEffect(() => {
    document.title = "Jay Shah — Full-Stack Developer & Product Builder";
  }, []);

  return (
    <main className="relative min-h-screen w-full overflow-x-hidden bg-bg-primary text-text-primary">
      <LoadSequence />
      <GrainOverlay />
      <ScrollProgress />
      <CustomCursor />
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Resume />
      <Contact />
    </main>
  );
};

export default Index;
