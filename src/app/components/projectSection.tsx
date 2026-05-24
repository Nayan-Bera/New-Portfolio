'use client';
import { useMemo, useState } from "react";
import { PROJECTS } from "@/src/constant/data";
import { ProjectCard } from "./projectCard";

const DEFAULT_PROJECT_COUNT = 4;

export const ProjectsSection = () => {
  const [showAllProjects, setShowAllProjects] = useState(false);

  const orderedProjects = useMemo(
    () =>
      [...PROJECTS].sort(
        (a, b) => (a.displayIndex ?? 999) - (b.displayIndex ?? 999)
      ),
    []
  );

  const visibleProjects = showAllProjects
    ? orderedProjects
    : orderedProjects.slice(0, DEFAULT_PROJECT_COUNT);

  const hasMoreProjects = orderedProjects.length > DEFAULT_PROJECT_COUNT;

  return (
    <section
      id="projects"
      className="relative py-20 sm:py-24 px-4 sm:px-6 lg:px-8 bg-slate-950/55 overflow-hidden"
    >
      <div className="pointer-events-none absolute left-1/2 top-10 h-80 w-[min(70vw,48rem)] -translate-x-1/2 rounded-full bg-cyan-400/10 blur-3xl" />
      <div className="relative max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-5 sm:mb-6">
          <div className="h-px flex-1 bg-linear-to-r from-transparent via-slate-700 to-transparent" />
          <h2 className="text-xs sm:text-sm font-semibold text-slate-400 uppercase tracking-wider">
            Selected Projects
          </h2>
          <div className="h-px flex-1 bg-linear-to-r from-transparent via-slate-700 to-transparent" />
        </div>

        <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-14">
          <p className="text-2xl font-bold tracking-tight text-white sm:text-4xl">
            Product-minded builds with live systems, data flows, and rollout controls.
          </p>
        </div>

        <div className="grid gap-6 sm:gap-8 lg:grid-cols-2">
          {visibleProjects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>

        {hasMoreProjects && (
          <div className="mt-8 sm:mt-10 flex justify-center">
            <button
              type="button"
              onClick={() => setShowAllProjects((current) => !current)}
              className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg border border-slate-700 bg-slate-900/60 text-sm sm:text-base font-medium text-slate-200 transition-all hover:border-cyan-500/70 hover:bg-slate-800 hover:text-white hover:shadow-lg hover:shadow-cyan-500/10"
            >
              {showAllProjects ? "Show Less" : "View More"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
