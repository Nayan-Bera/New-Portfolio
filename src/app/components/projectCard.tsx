'use client';
import { PROJECTS } from "@/src/constant/data";
import Link from "next/link";
import { motion } from "framer-motion";
export const ProjectCard = ({
  project,
  index,
}: {
  project: (typeof PROJECTS)[0];
  index: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ delay: index * 0.1 }}
    className="group relative"
  >
    <div className="absolute inset-0 bg-linear-to-br from-blue-500/10 to-cyan-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    <Link
      href={project.link}
      className="relative block p-6 sm:p-7 lg:p-8 rounded-2xl bg-slate-800/30 border border-slate-700/50 hover:border-slate-600 transition-all"
    >
      <div className="flex items-start justify-between gap-4 mb-3 sm:mb-4">
        <h3 className="text-lg sm:text-xl font-semibold text-white group-hover:text-cyan-400 transition-colors">
          {project.title}
        </h3>
        <svg
          className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400 group-hover:text-cyan-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all shrink-0 "
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
      </div>

      <p className="text-sm sm:text-base text-slate-400 leading-relaxed mb-4 sm:mb-6">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-2">
        {project.technologies.map((tech) => (
          <span
            key={tech}
            className="px-2.5 sm:px-3 py-1 rounded-md bg-slate-700/30 border border-slate-700/50 text-[11px] sm:text-xs font-medium text-slate-300"
          >
            {tech}
          </span>
        ))}
      </div>
    </Link>
  </motion.div>
);


