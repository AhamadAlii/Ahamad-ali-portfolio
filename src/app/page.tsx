import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { LiveStats } from "@/components/sections/live-stats";
import { Skills } from "@/components/sections/skills";
import { Experience } from "@/components/sections/experience";
import { Projects } from "@/components/sections/projects";
import { Achievements } from "@/components/sections/achievements";
import { Education } from "@/components/sections/education";
import { Recruiter } from "@/components/sections/recruiter";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex flex-col">
        <Hero />
        <About />
        <LiveStats />
        <Skills />
        <Experience />
        <Projects />
        <Achievements />
        <Education />
        <Recruiter />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
