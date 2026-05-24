"use client";

import { PROJECTS } from "@/src/constant/data";
import Link from "next/link";
import { motion } from "framer-motion";

const STATUS_COLORS: Record<
  string,
  { dot: string; glow: string; text: string }
> = {
  "In Development": {
    dot: "bg-amber-400",
    glow: "shadow-amber-400/40",
    text: "text-amber-300",
  },
  "Backend Complete": {
    dot: "bg-sky-400",
    glow: "shadow-sky-400/40",
    text: "text-sky-300",
  },
  "Demo on Request": {
    dot: "bg-violet-400",
    glow: "shadow-violet-400/40",
    text: "text-violet-300",
  },
};

export const ProjectCard = ({
  project,
  index,
}: {
  project: (typeof PROJECTS)[0];
  index: number;
}) => {
  const isLive = Boolean(project.link);
  const status = STATUS_COLORS[project.status];

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ delay: index * 0.08 }}
      whileHover={{ y: -10 }}
      className="group relative"
    >
      <div className="pointer-events-none absolute inset-0 rounded-[1.35rem] bg-gradient-to-br from-cyan-500/20 via-blue-500/10 to-transparent opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />

      {isLive ? (
        <Link href={project.link} className="block relative">
          <Card project={project} isLive />
        </Link>
      ) : (
        <div className="relative">
          <Card project={project} isLive={false} status={status} />
        </div>
      )}
    </motion.div>
  );
};

const Card = ({
  project,
  isLive,
  status,
}: {
  project: (typeof PROJECTS)[0];
  isLive: boolean;
  status?: { dot: string; glow: string; text: string };
}) => (
  <div className="cinematic-card scanline relative h-full overflow-hidden rounded-[1.35rem] border border-slate-800/80 bg-slate-950/72 p-6 backdrop-blur-xl transition-all duration-300 group-hover:border-cyan-400/50 group-hover:shadow-[0_30px_80px_-42px_rgba(34,211,238,0.5)] sm:p-7 lg:p-8">
    <div className="pointer-events-none absolute -right-16 -top-20 h-44 w-44 rounded-full bg-cyan-400/10 blur-3xl transition-opacity duration-300 group-hover:opacity-100" />
    <div className="pointer-events-none absolute bottom-0 left-0 h-px w-full bg-linear-to-r from-transparent via-cyan-300/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

    <div className="mb-5 flex items-center justify-between gap-3">
      <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-[11px] font-semibold text-cyan-100">
        PROJECT {String(project.displayIndex ?? 0).padStart(2, "0")}
      </span>
      {isLive && (
        <span className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1 text-[11px] font-semibold text-emerald-200">
          Live
        </span>
      )}
    </div>

    <div className="mb-4">
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-lg font-semibold leading-snug text-white sm:text-xl">
          {project.title}
        </h3>

        {isLive && (
          <svg
            className="mt-1 h-4 w-4 shrink-0 text-slate-500 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-cyan-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 17L17 7M17 7H7M17 7v10"
            />
          </svg>
        )}
      </div>

      {!isLive && status && (
        <div className="mt-2 flex items-center gap-2 text-xs opacity-0 translate-y-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
          <span
            className={`h-2 w-2 rounded-full ${status.dot} ${status.glow} shadow-[0_0_10px_2px]`}
          />
          <span className={`${status.text}`}>{project.status}</span>
        </div>
      )}
    </div>

    <p className="mb-7 text-sm leading-relaxed text-slate-400 sm:text-base">
      {project.description}
    </p>

    <div className="flex flex-wrap gap-2">
      {project.technologies.map((tech) => (
        <span
          key={tech}
          className="rounded-lg border border-slate-700/70 bg-slate-900/70 px-2.5 py-1 text-[11px] text-slate-300 transition-colors group-hover:border-cyan-300/20 sm:text-xs"
        >
          {tech}
        </span>
      ))}
    </div>
  </div>
);
