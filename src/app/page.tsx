'use client';
import { About } from "./components/about";
import { Contact } from "./components/contactUs";
import { Experiences } from "./components/experience";
import { Hero } from "./components/hero";
import { Nav } from "./components/nav";
import { ProjectsSection } from "./components/projectSection";
import { AssistantWidget } from "./components/assistantPortal";
import { Technologies } from "./components/technologies";
import { CinematicLayer } from "./components/cinematicLayer";

export default function Portfolio() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      <CinematicLayer />
      <Nav />
      <main className="relative z-10">
        <Hero />
        <About />
        <Technologies />
        <ProjectsSection />
        <Experiences />
        <Contact />
      </main>

      <AssistantWidget />

      <footer className="relative z-10 border-t border-slate-800/70 bg-slate-950/70 py-6 sm:py-8 px-4 sm:px-6 lg:px-8 backdrop-blur">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 md:gap-4">
            <div className="text-xs sm:text-sm text-slate-400 text-center md:text-left">
              © {new Date().getFullYear()} Nayan Kr Bera. All rights reserved.
            </div>
            <div className="flex flex-wrap items-center justify-center md:justify-end gap-2 sm:gap-3 text-[11px] sm:text-sm text-slate-500">
              <span>Built with Next.js</span>
              <span>•</span>
              <span>Tailwind CSS</span>
              <span>•</span>
              <span>Framer Motion</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
