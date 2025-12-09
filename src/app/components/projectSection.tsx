'use client';
import { PROJECTS } from "@/src/constant/data";
import { ProjectCard } from "./projectCard";

export const ProjectsSection = () => (
  <section
    id="projects"
    className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-slate-900/30"
  >
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center gap-3 mb-8 sm:mb-12">
        <div className="h-px flex-1 bg-linear-to-r from-transparent via-slate-700 to-transparent" />
        <h2 className="text-xs sm:text-sm font-semibold text-slate-400 uppercase tracking-wider">
          Selected Projects
        </h2>
        <div className="h-px flex-1 bg-linear-to-r from-transparent via-slate-700 to-transparent" />
      </div>

      <div className="grid gap-6 sm:gap-8 lg:grid-cols-2">
        {PROJECTS.map((project, i) => (
          <ProjectCard key={project.title} project={project} index={i} />
        ))}
      </div>
    </div>
  </section>
);