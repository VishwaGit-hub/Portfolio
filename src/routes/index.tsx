import { createFileRoute } from "@tanstack/react-router";
import { CustomCursor } from "@/components/portfolio/CustomCursor";
import { Navbar } from "@/components/portfolio/Navbar";
import { NeuralHero } from "@/components/portfolio/NeuralHero";
import { SectionDivider } from "@/components/portfolio/SectionTitle";
import { Projects } from "@/components/portfolio/Projects";
import { Hackathon } from "@/components/portfolio/Hackathon";
import { Games } from "@/components/portfolio/Games";
import { Skills } from "@/components/portfolio/Skills";
import { Experience, Education } from "@/components/portfolio/Timeline";
import { Contact, Footer } from "@/components/portfolio/Contact";
import { SparkLayer } from "@/components/portfolio/SparkLayer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Vishwa B. Dhola — AI Engineer · Software Developer · Automation Builder" },
      {
        name: "description",
        content:
          "Portfolio of Vishwa B. Dhola — navigating the intersection of intelligence, automation, and code. AI engineer, software developer, automation builder.",
      },
      { property: "og:title", content: "Vishwa B. Dhola — Neural Cosmos Portfolio" },
      {
        property: "og:description",
        content:
          "AI engineer, software developer, and automation builder. Explore projects, hackathon work, skills, and experience.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="relative min-h-screen" style={{ background: "#050508" }}>
      <CustomCursor />
      <SparkLayer />
      <Navbar />
      <main>
        <NeuralHero />
        <SectionDivider />
        <Projects />
        <SectionDivider />
        <Hackathon />
        <SectionDivider />
        <Games />
        <SectionDivider />
        <Skills />
        <SectionDivider />
        <Experience />
        <SectionDivider />
        <Education />
        <SectionDivider />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
