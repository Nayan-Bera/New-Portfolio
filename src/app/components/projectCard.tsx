"use client";
import { PROJECTS } from "@/src/constant/data";
import Link from "next/link";
import { motion } from "framer-motion";

/* ----------------------------------------
   Status color system
----------------------------------------- */
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
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      className="group relative"
    >
      {/* 🔥 SOFT BACKGROUND GLOW (THIS IS THE ONE YOU WANT) */}
      <div
        className="
          pointer-events-none absolute inset-0 rounded-2xl
          bg-gradient-to-br from-cyan-500/10 via-blue-500/5 to-transparent
          opacity-0 blur-xl
          group-hover:opacity-100
          transition-opacity duration-500
        "
      />

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
  <div
    className="
      relative h-full p-6 sm:p-7 lg:p-8 rounded-2xl
      bg-slate-900/40
      border border-slate-800/60
      backdrop-blur-xl
      transition-all duration-300
      group-hover:-translate-y-1
      group-hover:border-cyan-700
      group-hover:shadow-[0_16px_48px_-20px_rgba(0,0,0,0.7)]
    "
  >
    {/* Header */}
    <div className="mb-4">
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-lg sm:text-xl font-semibold text-white leading-snug">
          {project.title}
        </h3>

        {/* Live arrow */}
        {isLive && (
          <svg
            className="
              w-4 h-4 text-slate-500
              group-hover:text-cyan-400
              group-hover:translate-x-0.5
              group-hover:-translate-y-0.5
              transition-all
            "
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
        <div
          className="
            mt-1 flex items-center gap-2 text-xs
            opacity-0 translate-y-1
            group-hover:opacity-100 group-hover:translate-y-0
            transition-all duration-300
          "
        >
          <span
            className={`
              w-2 h-2 rounded-full
              ${status.dot}
              shadow-[0_0_0_0]
              group-hover:shadow-[0_0_10px_2px]
              ${status.glow}
            `}
          />
          <span className={`${status.text}`}>
            {project.status}
          </span>
        </div>
      )}
    </div>

    {/* Description */}
    <p className="text-sm sm:text-base text-slate-400 leading-relaxed mb-6">
      {project.description}
    </p>

    {/* Tech stack */}
    <div className="flex flex-wrap gap-2">
      {project.technologies.map((tech) => (
        <span
          key={tech}
          className="
            px-2.5 py-1 rounded-md text-[11px] sm:text-xs
            bg-slate-800/60
            border border-slate-700/60
            text-slate-300
          "
        >
          {tech}
        </span>
      ))}
    </div>
  </div>
);
