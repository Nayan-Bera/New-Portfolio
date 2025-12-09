"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaDocker, FaNodeJs, FaPython } from "react-icons/fa6";
import { RiNextjsFill, RiReactjsLine, RiTwitterXLine } from "react-icons/ri";
import {
  SiGraphql,
  SiMongodb,
  SiPostgresql,
  SiTypescript,
} from "react-icons/si";
import { Contact } from "./components/contactUs";
import Earth3D from "./components/earth3D";

// Mock data
export const HERO_CONTENT =
  "I design and build full-stack applications that blend seamless user experiences with powerful backend systems. Specialized in modern web development, API architecture, real-time features, and cloud-ready deployments.";

export const ABOUT_TEXT =
  "With 1+ years of backend and full-stack development experience, I build scalable application architectures, design modular service layers, and develop reliable APIs that integrate seamlessly across systems. I focus on clean, maintainable code and engineering practices that ensure performance, security, and long-term stability.";

export const techs = [
  { name: "Node.js", icon: <FaNodeJs className="text-green-400" /> },
  { name: "TypeScript", icon: <SiTypescript className="text-blue-400" /> },
  { name: "Python", icon: <FaPython className="text-yellow-300" /> },
  { name: "PostgreSQL", icon: <SiPostgresql className="text-sky-400" /> },
  { name: "MongoDB", icon: <SiMongodb className="text-green-500" /> },
  // { name: "Redis", icon: <SiRedis className="text-red-400" /> },
  { name: "Docker", icon: <FaDocker className="text-blue-300" /> },
  { name: "React.js", icon: <RiReactjsLine className="text-blue-500" /> },
  { name: "Next.js", icon: <RiNextjsFill className="text-gray-300" /> },
  // { name: "Kubernetes", icon: <SiKubernetes className="text-blue-500" /> },
  // { name: "AWS", icon: <FaAws className="text-orange-400" /> },
  { name: "GraphQL", icon: <SiGraphql className="text-pink-500" /> },
];

export const PROJECTS = [
  {
    title: "Tripzy — Smart Hotel Booking System",
    description:
      "A full hotel booking platform with automated document verification, secure JWT-based access, digital check-ins, and integrated Razorpay payment workflows.",
    technologies: [
      "Node.js",
      "TypeScript",
      "React.js",
      "JWT",
      "Razorpay",
      "REST API",
    ],
    link: "#",
  },
  {
    title: "ProctorLive — Online Exam & Monitoring System",
    description:
      "A secure examination platform with live monitoring, keyboard lock, candidate event tracking, quick results, and real-time updates powered by WebSockets and JWT.",
    technologies: [
      "Node.js",
      "TypeScript",
      "React.js",
      "WebSockets",
      "JWT",
      "REST API",
    ],
    link: "#",
  },
  {
    title: "StaySphere — PG & Hostel Finder Platform",
    description:
      "A property discovery and management platform enabling PG/hostel providers to manage listings while users search, filter, and book stays with secure payments and reCAPTCHA-protected authentication.",
    technologies: [
      "Node.js",
      "TypeScript",
      "React.js",
      "RTK Query",
      "Razorpay",
      "reCAPTCHA",
      "JWT",
    ],
    link: "#",
  },
  {
    title: "NexaFlow CRM — Role-Based Operations & Workflow Manager",
    description:
      "A modular CRM solution featuring role-based access control, task pipelines, team collaboration tools, and automated workflow management with scalable backend architecture.",
    technologies: ["Next.js", "TypeScript", "RBAC", "REST API"],
    link: "#",
  },
];

const EXPERIENCE = [
  {
    role: "Full-Stack Web Developer",
    company: "Maity Innovations Pvt Ltd",
    period: "2025 — Present",
    color: "cyan",
    description: [
      "Built multiple full-stack applications, handling both frontend and backend modules.",
      "Designed and implemented a multi-tenant SaaS platform with role-based access control and modular architecture.",
      "Managed Docker containers, created project-specific images, and monitored deployments on Dokploy.",
      "Integrated Razorpay, optimized CI/CD flows, and improved environment setups for production stability.",
      "Reviewed and merged branches, mentored teammates on backend fundamentals, and improved project workflows.",
    ],
  },
  {
    role: "Web Developer Intern",
    company: "Maity Innovations Pvt Ltd",
    period: "2024 — 2025",
    color: "blue",
    description: [
      "Built dynamic Laravel applications including admin dashboards and CMS modules.",
      "Developed backend services in Node.js using JWT and reCAPTCHA with optimized search endpoints and scalable API design.",
      "Delivered responsive UI pages using HTML, CSS, and JavaScript.",
      "Collaborated with senior developers to refine architecture and improve maintainability.",
    ],
  },
];

export const CONTACT = {
  email: "nayanberaofficial@gmail.com",
};

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top row */}
        <div className="flex items-center justify-between h-16">
          <Link
            href="#home"
            className="flex items-center gap-2 group"
            onClick={closeMenu}
          >
            <div className="w-8 h-8 rounded-lg bg-linear-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
              <span className="text-white font-bold text-sm">NB</span>
            </div>
            <span className="font-semibold text-base tracking-tight">
              Nayan Bera
            </span>
          </Link>

          {/* Desktop nav links */}
          <ul className="hidden md:flex items-center gap-8 text-sm font-medium">
            <li>
              <Link
                href="#about"
                className="text-slate-400 hover:text-white transition-colors"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="#projects"
                className="text-slate-400 hover:text-white transition-colors"
              >
                Projects
              </Link>
            </li>
            <li>
              <Link
                href="#experience"
                className="text-slate-400 hover:text-white transition-colors"
              >
                Experience
              </Link>
            </li>
            <li>
              <Link
                href="#contact"
                className="px-4 py-2 rounded-lg bg-white text-slate-950 hover:bg-slate-200 transition-colors"
              >
                Contact
              </Link>
            </li>
          </ul>

          {/* Desktop social icons */}
          <div className="hidden md:flex items-center gap-4 text-xl text-slate-400">
            <Link
              href="#"
              aria-label="twitter"
              className="hover:text-white transition-colors"
            >
              <RiTwitterXLine />
            </Link>
            <Link
              href="#"
              aria-label="linkedin"
              className="hover:text-white transition-colors"
            >
              <FaLinkedin />
            </Link>
            <Link
              href="#"
              aria-label="github"
              className="hover:text-white transition-colors"
            >
              <FaGithub />
            </Link>
            <Link
              href="#"
              aria-label="instagram"
              className="hover:text-white transition-colors"
            >
              <FaInstagram />
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-slate-400"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label="Toggle navigation menu"
          >
            {isOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile dropdown */}
        {isOpen && (
          <div className="md:hidden border-t border-slate-800 pb-4">
            <ul className="flex flex-col gap-3 pt-4 text-sm font-medium">
              <li>
                <Link
                  href="#about"
                  onClick={closeMenu}
                  className="block text-slate-300 hover:text-white transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="#projects"
                  onClick={closeMenu}
                  className="block text-slate-300 hover:text-white transition-colors"
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link
                  href="#experience"
                  onClick={closeMenu}
                  className="block text-slate-300 hover:text-white transition-colors"
                >
                  Experience
                </Link>
              </li>
              <li>
                <Link
                  href="#contact"
                  onClick={closeMenu}
                  className="inline-flex items-center justify-center w-full px-4 py-2 rounded-lg bg-white text-slate-950 hover:bg-slate-200 transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>

            <div className="flex items-center gap-4 pt-4 text-xl text-slate-400">
              <Link
                href="#"
                aria-label="twitter"
                className="hover:text-white transition-colors"
              >
                <RiTwitterXLine />
              </Link>
              <Link
                href="#"
                aria-label="linkedin"
                className="hover:text-white transition-colors"
              >
                <FaLinkedin />
              </Link>
              <Link
                href="#"
                aria-label="github"
                className="hover:text-white transition-colors"
              >
                <FaGithub />
              </Link>
              <Link
                href="#"
                aria-label="instagram"
                className="hover:text-white transition-colors"
              >
                <FaInstagram />
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
const Hero = () => (
  <header
    id="home"
    className="relative pt-28 sm:pt-32 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
  >
    {/* Responsive 3D Earth background */}
    <div className="pointer-events-none absolute inset-0">
      <div className="hidden sm:block absolute top-1/2 -translate-y-1/2 left-[5%] md:left-[10%] w-[420px] h-[260px] md:w-[640px] md:h-[380px] lg:w-[900px] lg:h-[540px] opacity-35">
        <Earth3D />
      </div>
      {/* Smaller earth for extra small devices, placed at bottom */}
      <div className="sm:hidden absolute bottom-1/2 left-1/2 -translate-x-1/2 w-[320px] h-[220px] opacity-40">
        <Earth3D />
      </div>
    </div>

    <div className="relative max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="order-1"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/60 border border-slate-700/60 text-[11px] sm:text-xs font-medium text-slate-300 mb-5 sm:mb-6">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            Available for new opportunities
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight mb-4 sm:mb-6">
            Full-Stack Developer
            <br />
            <span className=" bg-linear-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
              & System Architect
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-400 leading-relaxed mb-6 sm:mb-8 max-w-xl">
            {HERO_CONTENT}
          </p>

          <div className="flex flex-wrap gap-3 sm:gap-4">
            <Link
              href="/resume.pdf"
              className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg bg-white text-slate-950 text-sm sm:text-base font-medium hover:bg-slate-200 transition-all hover:shadow-lg hover:shadow-white/20"
            >
              View Resume
            </Link>
            <Link
              href="#contact"
              className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg border border-slate-700 text-slate-300 text-sm sm:text-base font-medium hover:bg-slate-800 hover:border-slate-600 transition-all"
            >
              Get in Touch
            </Link>
          </div>
        </motion.div>

        {/* Right column cards */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative order-2"
        >
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {[
              {
                label: "Real-Time Systems",
                desc: "WebSockets, Live Updates, Event Workflows",
              },
              {
                label: "Payments & Integrations",
                desc: "Razorpay, reCAPTCHA, Third-Party APIs",
              },
              { label: "API Architecture", desc: "REST, GraphQL, Auth Flows" },
              {
                label: "Data Engineering",
                desc: "SQL, NoSQL, Performance Optimization",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="p-3 sm:p-4 md:p-5 rounded-xl bg-slate-800/50 border border-slate-700/50 hover:border-slate-600 transition-all group cursor-default backdrop-blur"
              >
                <h3 className="text-xs sm:text-sm md:text-base font-semibold text-white mb-1.5 sm:mb-2 group-hover:text-cyan-400 transition-colors">
                  {item.label}
                </h3>
                <p className="text-[11px] sm:text-xs md:text-sm text-slate-400 leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  </header>
);

const About = () => (
  <section
    id="about"
    className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-slate-900/30"
  >
    <div className="max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center gap-3 mb-8 sm:mb-12">
          <div className="h-px flex-1 bg-linear-to-r from-transparent via-slate-700 to-transparent" />
          <h2 className="text-xs sm:text-sm font-semibold text-slate-400 uppercase tracking-wider">
            About
          </h2>
          <div className="h-px flex-1 bg-linear-to-r from-transparent via-slate-700 to-transparent" />
        </div>

        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          <div className="lg:col-span-2 space-y-6">
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              {ABOUT_TEXT}
            </p>

            <div className="grid md:grid-cols-2 gap-6 mt-6 sm:mt-8">
              {/* Core Expertise */}
              <div className="space-y-4">
                <h3 className="font-semibold text-white flex items-center gap-2 text-sm sm:text-base">
                  <div className="w-1 h-4 bg-cyan-400 rounded-full" />
                  Core Expertise
                </h3>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-400">
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400 mt-1">▸</span>
                    Backend API development and structured workflow engineering
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400 mt-1">▸</span>
                    System architecture, module design, and schema modeling
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400 mt-1">▸</span>
                    Secure integrations including authentication and payment
                    services
                  </li>
                </ul>
              </div>

              {/* Focus Areas */}
              <div className="space-y-4">
                <h3 className="font-semibold text-white flex items-center gap-2 text-sm sm:text-base">
                  <div className="w-1 h-4 bg-blue-400 rounded-full" />
                  Focus Areas
                </h3>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-400">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1">▸</span>
                    Real-time features built with WebSockets and event workflows
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1">▸</span>
                    SQL/NoSQL data modeling, optimization, and performance
                    tuning
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1">▸</span>
                    DevOps processes with Docker, Dokploy, and Nixpacks
                    deployments
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="p-5 sm:p-6 rounded-xl bg-slate-800/30 border border-slate-700/50">
              <h4 className="font-semibold text-white mb-4 text-sm sm:text-base">
                Quick Info
              </h4>
              <dl className="space-y-3 text-xs sm:text-sm">
                <div className="flex justify-between items-center gap-4">
                  <dt className="text-slate-400">Location</dt>
                  <dd className="text-white font-medium text-right">
                    Remote / India
                  </dd>
                </div>
                <div className="flex justify-between items-center gap-4">
                  <dt className="text-slate-400">Experience</dt>
                  <dd className="text-white font-medium text-right">
                    1+ Years
                  </dd>
                </div>
                <div className="flex justify-between items-center gap-4">
                  <dt className="text-slate-400">Role</dt>
                  <dd className="text-white font-medium text-right">
                    Web Developer
                  </dd>
                </div>
                <div className="pt-3 border-t border-slate-700/50">
                  <Link
                    href={`mailto:${CONTACT.email}`}
                    className="break-all text-cyan-400 hover:text-cyan-300 transition-colors text-xs sm:text-sm font-medium"
                  >
                    {CONTACT.email}
                  </Link>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

const Technologies = () => {
  return (
    <section
      id="technologies"
      className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-slate-950"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-8 sm:mb-10">
          <div className="h-px flex-1 bg-linear-to-r from-transparent via-slate-800 to-transparent" />
          <h2 className="text-xs sm:text-sm font-semibold text-slate-400 uppercase tracking-wider">
            Technology Stack
          </h2>
          <div className="h-px flex-1 bg-linear-to-r from-transparent via-slate-800 to-transparent" />
        </div>

        <div className="relative w-full overflow-hidden">
          <motion.div
            className="flex gap-4 sm:gap-6 py-3 sm:py-4"
            initial={{ x: 0 }}
            animate={{ x: "-100%" }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {[...techs, ...techs].map((tech, i) => (
              <div
                key={i}
                className="flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl
                           bg-slate-900/60 border border-slate-800
                           shadow-sm shadow-black/40
                           hover:shadow-md hover:shadow-cyan-400/20
                           backdrop-blur-sm cursor-default
                           transition-all duration-300
                           hover:scale-[1.03]"
              >
                <span className="text-lg sm:text-xl">{tech.icon}</span>
                <span className="text-xs sm:text-sm md:text-base text-slate-100 font-medium">
                  {tech.name}
                </span>
              </div>
            ))}
          </motion.div>

          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-20 bg-linear-to-r from-slate-950 to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-20 bg-linear-to-l from-slate-950 to-transparent" />
        </div>
      </div>
    </section>
  );
};

const ProjectCard = ({
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

const ProjectsSection = () => (
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

const Experience = () => (
  <section
    id="experience"
    className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-slate-950"
  >
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center gap-3 mb-8 sm:mb-10">
        <div className="h-px flex-1 bg-linear-to-r from-transparent via-slate-700 to-transparent" />
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
          Experience
        </h2>
        <div className="h-px flex-1 bg-linear-to-r from-transparent via-slate-700 to-transparent" />
      </div>

      <div className="space-y-8">
        {EXPERIENCE.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: i * 0.1 }}
            className="relative pl-6 sm:pl-8 border-l-2 border-slate-700"
          >
            <div
              className={`absolute -left-2 sm:left-[-9px] top-0 w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-${item.color}-400 border-[3px] sm:border-4 border-slate-950`}
            />

            <div className="pb-6 sm:pb-8">
              <div className="flex flex-wrap items-center justify-between gap-2 sm:gap-4 mb-2 sm:mb-3">
                <h4 className="text-lg sm:text-xl font-semibold text-white">
                  {item.role}
                </h4>
                <span className="px-3 py-1 rounded-full bg-slate-800 text-[11px] sm:text-xs font-medium text-slate-300">
                  {item.period}
                </span>
              </div>

              <p
                className={`text-xs sm:text-sm text-${item.color}-400 font-medium mb-3 sm:mb-4`}
              >
                {item.company}
              </p>

              {item.description.map((line, idx) => (
                <p
                  key={idx}
                  className="text-sm sm:text-base text-slate-400 leading-relaxed"
                >
                  {line}
                </p>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Nav />
      <main>
        <Hero />
        <About />
        <Technologies />
        <ProjectsSection />
        <Experience />
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
