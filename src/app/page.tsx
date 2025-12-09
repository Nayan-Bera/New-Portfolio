'use client';
import { About } from "./components/about";
import { Contact } from "./components/contactUs";
import { Experiences } from "./components/experience";
import { Hero } from "./components/hero";
import { Nav } from "./components/nav";
import { ProjectsSection } from "./components/projectSection";
import { Technologies } from "./components/technologies";

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Nav />
      <main>
        <Hero />
        <About />
        <Technologies />
        <ProjectsSection />
        <Experiences />
        <Contact />
      </main>

      <footer className="border-t border-slate-800 py-6 sm:py-8 px-4 sm:px-6 lg:px-8">
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
