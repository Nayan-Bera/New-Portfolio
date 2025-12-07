"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface AsciiEarthProps {
  width?: number;
  height?: number;
  className?: string;
}

interface Project {
  title: string;
  description: string;
  technologies: string[];
  link: string;
}

interface ProjectCardProps {
  project: Project;
  index: number;
}
;

// ASCII Earth Component with theme colors
const AsciiEarth: React.FC<AsciiEarthProps> = ({ width = 80, height = 40, className = "" }) => {
  const preRef = useRef<HTMLPreElement | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const WIDTH = Math.max(40, Math.min(110, width));
    const HEIGHT = Math.max(16, Math.min(60, height));

    const THETA_STEP = 0.07;
    const PHI_STEP = 0.05;

    const LUM = " .·:;+=*#%@";
    const GLITCH_CHARS = "◇◆○●◐◑◒◓";

    let A = 0;
    let B = 0;
    let wobble = 0;

    const xCenter = Math.floor(WIDTH / 2);
    const yCenter = Math.floor(HEIGHT / 2);
    const xScale = (WIDTH / 2) * 0.85;
    const yScale = (HEIGHT / 2) * 0.85;

    const Lx = 0.4, Ly = 0.9, Lz = -0.2;
    const lLen = Math.hypot(Lx, Ly, Lz) || 1;
    const lx = Lx / lLen, ly = Ly / lLen, lz = Lz / lLen;

    function renderFrame() {
      const out = new Array(WIDTH * HEIGHT).fill(" ");
      const zbuf = new Array(WIDTH * HEIGHT).fill(-Infinity);

      const cosA = Math.cos(A), sinA = Math.sin(A);
      const cosB = Math.cos(B), sinB = Math.sin(B);

      for (let theta = 0; theta < Math.PI; theta += THETA_STEP) {
        const cost = Math.cos(theta), sint = Math.sin(theta);
        for (let phi = 0; phi < Math.PI * 2; phi += PHI_STEP) {
          const cosp = Math.cos(phi), sinp = Math.sin(phi);

          let x = cost * cosp;
          let y = sint;
          let z = cost * sinp;

          const y1 = y * cosA - z * sinA;
          const z1 = y * sinA + z * cosA;
          const x1 = x;
          const x2 = x1 * cosB + z1 * sinB;
          const y2 = y1;
          const z2 = -x1 * sinB + z1 * cosB;

          const zproj = z2 + 4;
          if (zproj <= 0) continue;
          const invz = 1 / zproj;

          const xp = Math.floor(xCenter + x2 * xScale * invz);
          const yp = Math.floor(yCenter - y2 * yScale * invz);

          const nx = x2, ny = y2, nz = z2;
          const nlen = Math.hypot(nx, ny, nz) || 1;
          const ndotl = (nx * lx + ny * ly + nz * lz) / nlen;

          const landNoise = Math.sin(phi * 3.1 + theta * 2.7 + A * 0.5) * Math.cos(theta * 2.2 + B * 0.3);
          const isLand = landNoise > 0.15 && Math.abs(theta - Math.PI/2) < 1.1;

          let lumIndex = Math.floor(((ndotl + 1) / 2) * (LUM.length - 1));
          lumIndex = Math.max(0, Math.min(LUM.length - 1, lumIndex));
          let ch = LUM[lumIndex];

          if (isLand) {
            ch = LUM[Math.max(0, Math.min(LUM.length - 1, lumIndex + 2))];
          }

          if (xp >= 0 && xp < WIDTH && yp >= 0 && yp < HEIGHT) {
            const idx = xp + yp * WIDTH;
            if (invz > zbuf[idx]) {
              zbuf[idx] = invz;

              const probGlitch = 0.003 + Math.abs(wobble) * 0.0006;
              if (Math.random() < probGlitch) {
                ch = GLITCH_CHARS[(Math.random() * GLITCH_CHARS.length) | 0];
              }

              out[idx] = ch;
            }
          }
        }
      }

      const lines = [];
      for (let y = 0; y < HEIGHT; y++) {
        const line = out.slice(y * WIDTH, (y + 1) * WIDTH).join("");
        lines.push(line.replace(/\s+$/g, ""));
      }

      if (preRef.current) {
        preRef.current.textContent = lines.join("\n");
      }

      A += 0.008;
      B += 0.025;
      wobble = Math.sin(B * 2.3) * 0.6 + (Math.random() - 0.5) * 0.06;
      rafRef.current = requestAnimationFrame(renderFrame);
    }

    rafRef.current = requestAnimationFrame(renderFrame);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [width, height]);

  return (
    <div className={`ascii-earth-wrapper ${className}`}>
      <style jsx>{`
        .ascii-earth-wrapper {
          position: relative;
          width: 100%;
          height: 100%;
        }
        
        .ascii-earth-wrapper pre {
          color: rgba(34, 211, 238, 0.85);
          background: transparent;
          text-shadow: 
            0 0 12px rgba(34, 211, 238, 0.6),
            0 0 24px rgba(6, 182, 212, 0.35),
            0 0 36px rgba(14, 165, 233, 0.2);
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, "Roboto Mono", "Courier New", monospace;
          font-size: 10px;
          line-height: 0.92;
          padding: 0;
          overflow: hidden;
          display: block;
          white-space: pre;
          user-select: none;
          -webkit-user-select: none;
          position: relative;
          animation: subtleGlow 4s ease-in-out infinite;
          font-weight: 500;
        }

        @keyframes subtleGlow {
          0%, 100% { 
            opacity: 0.85;
            filter: brightness(1.05);
          }
          50% { 
            opacity: 1;
            filter: brightness(1.15);
          }
        }

        .ascii-earth-wrapper:before {
          content: "";
          position: absolute;
          inset: -25%;
          background: radial-gradient(
            ellipse at center,
            rgba(6, 182, 212, 0.2) 0%,
            rgba(14, 165, 233, 0.12) 30%,
            transparent 70%
          );
          animation: pulseGlow 3s ease-in-out infinite;
          pointer-events: none;
          z-index: -1;
        }

        @keyframes pulseGlow {
          0%, 100% { 
            opacity: 0.6;
            transform: scale(1);
          }
          50% { 
            opacity: 0.9;
            transform: scale(1.05);
          }
        }
      `}</style>
      <pre ref={preRef} aria-hidden className="select-none" />
    </div>
  );
};

// Mock data
const HERO_CONTENT = "I design and build scalable backend systems that power modern applications. Specialized in distributed systems, real-time data processing, and cloud infrastructure.";
const ABOUT_TEXT = "With over 8 years of experience in backend development, I've architected and delivered high-performance systems serving millions of users. My focus is on writing clean, maintainable code while solving complex technical challenges.";

const PROJECTS = [
  {
    title: "Real-time Analytics Platform",
    description: "Built a distributed analytics system processing 50M+ events daily with sub-100ms latency using Kafka, Redis, and PostgreSQL.",
    technologies: ["Node.js", "Kafka", "Redis", "PostgreSQL", "Kubernetes"],
    link: "#"
  },
  {
    title: "Microservices Migration",
    description: "Led migration from monolith to microservices architecture, improving deployment velocity by 400% and reducing downtime to near-zero.",
    technologies: ["Docker", "Kubernetes", "gRPC", "PostgreSQL", "Redis"],
    link: "#"
  },
  {
    title: "API Gateway & Auth System",
    description: "Designed OAuth2/JWT authentication system with rate limiting, serving 10M+ requests/day with 99.99% uptime.",
    technologies: ["Node.js", "Redis", "JWT", "OAuth2", "AWS"],
    link: "#"
  },
  {
    title: "Event-Driven Order System",
    description: "Architected event-sourced order processing pipeline handling 100K+ transactions daily with full audit trails.",
    technologies: ["Node.js", "RabbitMQ", "MongoDB", "Redis", "Docker"],
    link: "#"
  }
];

const CONTACT = {
  email: "nayan.bera@example.com"
};

const Nav = () => (
  <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/50">
    <div className="max-w-7xl mx-auto px-6 lg:px-8">
      <div className="flex items-center justify-between h-16">
        <a href="#home" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
            <span className="text-white font-bold text-sm">NB</span>
          </div>
          <span className="font-semibold text-base tracking-tight">Nayan Bera</span>
        </a>

        <ul className="hidden md:flex items-center gap-8 text-sm font-medium">
          <li><a href="#about" className="text-slate-400 hover:text-white transition-colors">About</a></li>
          <li><a href="#projects" className="text-slate-400 hover:text-white transition-colors">Projects</a></li>
          <li><a href="#experience" className="text-slate-400 hover:text-white transition-colors">Experience</a></li>
          <li><a href="#contact" className="px-4 py-2 rounded-lg bg-white text-slate-950 hover:bg-slate-200 transition-colors">Contact</a></li>
        </ul>

        <div className="hidden md:flex items-center gap-4 text-xl text-slate-400">
          <a href="#" aria-label="twitter" className="hover:text-white transition-colors">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </a>
          <a href="#" aria-label="linkedin" className="hover:text-white transition-colors">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
          <a href="#" aria-label="github" className="hover:text-white transition-colors">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
          </a>
          <a href="#" aria-label="instagram" className="hover:text-white transition-colors">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </a>
        </div>

        <button className="md:hidden text-slate-400">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </div>
  </nav>
);

const Hero = () => (
  <header id="home" className="pt-32 pb-20 px-6 lg:px-8 relative overflow-hidden">
    {/* ASCII Earth Background - positioned behind text */}
    <div className="absolute top-0 left-0 right-0 bottom-0 pointer-events-none">
      <div className="absolute top-1/2 -translate-y-1/2 left-[15%] w-[900px] h-[450px] opacity-25">
        <AsciiEarth width={90} height={45} />
      </div>
    </div>

    <div className="max-w-7xl mx-auto relative z-10">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/50 border border-slate-700/50 text-xs font-medium text-slate-300 mb-6">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            Available for new opportunities
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-bold tracking-tight mb-6">
            Backend Engineer<br />
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
              & System Architect
            </span>
          </h1>
          
          <p className="text-lg text-slate-400 leading-relaxed mb-8 max-w-xl">
            {HERO_CONTENT}
          </p>

          <div className="flex flex-wrap gap-4">
            <a 
              href="#projects" 
              className="px-6 py-3 rounded-lg bg-white text-slate-950 font-medium hover:bg-slate-200 transition-all hover:shadow-lg hover:shadow-white/20"
            >
              View Projects
            </a>
            <a 
              href="#contact" 
              className="px-6 py-3 rounded-lg border border-slate-700 text-slate-300 font-medium hover:bg-slate-800 hover:border-slate-600 transition-all"
            >
              Get in Touch
            </a>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
        >
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Real-time Systems", desc: "WebSockets, Kafka, Redis" },
              { label: "Cloud Infrastructure", desc: "AWS, K8s, Terraform" },
              { label: "Database Design", desc: "SQL, NoSQL, Optimization" },
              { label: "API Architecture", desc: "REST, GraphQL, gRPC" }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="p-5 rounded-xl bg-slate-800/50 border border-slate-700/50 hover:border-slate-600 transition-all group cursor-default"
              >
                <h3 className="font-semibold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                  {item.label}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
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
  <section id="about" className="py-20 px-6 lg:px-8 bg-slate-900/30">
    <div className="max-w-7xl mx-auto">
      <motion.div 
        initial={{ opacity: 0 }} 
        whileInView={{ opacity: 1 }} 
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center gap-3 mb-12">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-700 to-transparent" />
          <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">About</h2>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-700 to-transparent" />
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-6">
            <p className="text-lg text-slate-300 leading-relaxed">
              {ABOUT_TEXT}
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 mt-8">
              <div className="space-y-4">
                <h3 className="font-semibold text-white flex items-center gap-2">
                  <div className="w-1 h-4 bg-cyan-400 rounded-full" />
                  Core Expertise
                </h3>
                <ul className="space-y-2 text-sm text-slate-400">
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400 mt-1">▸</span>
                    Distributed systems & microservices architecture
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400 mt-1">▸</span>
                    High-performance APIs & data pipelines
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400 mt-1">▸</span>
                    Database optimization & query performance
                  </li>
                </ul>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-semibold text-white flex items-center gap-2">
                  <div className="w-1 h-4 bg-blue-400 rounded-full" />
                  Focus Areas
                </h3>
                <ul className="space-y-2 text-sm text-slate-400">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1">▸</span>
                    System design & scalability patterns
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1">▸</span>
                    DevOps, CI/CD & infrastructure as code
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1">▸</span>
                    Monitoring, logging & observability
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="p-6 rounded-xl bg-slate-800/30 border border-slate-700/50">
              <h4 className="font-semibold text-white mb-4">Quick Info</h4>
              <dl className="space-y-3 text-sm">
                <div className="flex justify-between items-center">
                  <dt className="text-slate-400">Location</dt>
                  <dd className="text-white font-medium">Remote / India</dd>
                </div>
                <div className="flex justify-between items-center">
                  <dt className="text-slate-400">Experience</dt>
                  <dd className="text-white font-medium">8+ Years</dd>
                </div>
                <div className="flex justify-between items-center">
                  <dt className="text-slate-400">Role</dt>
                  <dd className="text-white font-medium">Senior Backend</dd>
                </div>
                <div className="pt-3 border-t border-slate-700/50">
                  <a 
                    href={`mailto:${CONTACT.email}`} 
                    className="text-cyan-400 hover:text-cyan-300 transition-colors text-sm font-medium"
                  >
                    {CONTACT.email}
                  </a>
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
  const techs = [
    "Node.js", "TypeScript", "Python", "PostgreSQL", "MongoDB", 
    "Redis", "Kafka", "Docker", "Kubernetes", "AWS", "GraphQL", "gRPC"
  ];
  
  return (
    <section id="technologies" className="py-20 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-8">Technology Stack</h2>
        <div className="flex flex-wrap gap-3">
          {techs.map((tech, i) => (
            <motion.div
              key={tech}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -4 }}
              className="px-5 py-2.5 rounded-lg bg-slate-800/50 border border-slate-700/50 text-sm font-medium text-slate-300 hover:border-slate-600 hover:bg-slate-800 transition-all cursor-default"
            >
              {tech}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1 }}
    className="group relative"
  >
    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    <a
      href={project.link}
      className="relative block p-8 rounded-2xl bg-slate-800/30 border border-slate-700/50 hover:border-slate-600 transition-all"
    >
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-xl font-semibold text-white group-hover:text-cyan-400 transition-colors">
          {project.title}
        </h3>
        <svg 
          className="w-5 h-5 text-slate-400 group-hover:text-cyan-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
        </svg>
      </div>
      
      <p className="text-slate-400 leading-relaxed mb-6">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-2">
        {project.technologies.map(tech => (
          <span 
            key={tech} 
            className="px-3 py-1 rounded-md bg-slate-700/30 border border-slate-700/50 text-xs font-medium text-slate-300"
          >
            {tech}
          </span>
        ))}
      </div>
    </a>
  </motion.div>
);

const ProjectsSection = () => (
  <section id="projects" className="py-20 px-6 lg:px-8 bg-slate-900/30">
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center gap-3 mb-12">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-700 to-transparent" />
        <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Selected Projects</h2>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-700 to-transparent" />
      </div>
      
      <div className="grid lg:grid-cols-2 gap-8">
        {PROJECTS.map((project, i) => (
          <ProjectCard key={project.title} project={project} index={i} />
        ))}
      </div>
    </div>
  </section>
);

const Experience = () => (
  <section id="experience" className="py-20 px-6 lg:px-8">
    <div className="max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-12">Experience</h2>
      <div className="space-y-8">
        <motion.div 
          initial={{ opacity: 0, x: -20 }} 
          whileInView={{ opacity: 1, x: 0 }} 
          viewport={{ once: true }}
          className="relative pl-8 border-l-2 border-slate-700"
        >
          <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-cyan-400 border-4 border-slate-950" />
          <div className="pb-8">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
              <h4 className="text-xl font-semibold text-white">Senior Backend Engineer</h4>
              <span className="px-3 py-1 rounded-full bg-slate-800 text-xs font-medium text-slate-300">
                2022 — Present
              </span>
            </div>
            <p className="text-cyan-400 font-medium mb-4">Acme Labs • Remote</p>
            <p className="text-slate-400 leading-relaxed">
              Led backend development for the core analytics platform processing 50M+ daily events. Reduced API latency by 60% and improved system reliability to 99.99% uptime through architectural improvements and performance optimization.
            </p>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: -20 }} 
          whileInView={{ opacity: 1, x: 0 }} 
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="relative pl-8 border-l-2 border-slate-700"
        >
          <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-blue-400 border-4 border-slate-950" />
          <div className="pb-8">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
              <h4 className="text-xl font-semibold text-white">Backend Engineer</h4>
              <span className="px-3 py-1 rounded-full bg-slate-800 text-xs font-medium text-slate-300">
                2019 — 2022
              </span>
            </div>
            <p className="text-blue-400 font-medium mb-4">Nova Commerce • Bangalore</p>
            <p className="text-slate-400 leading-relaxed">
              Built and scaled microservices architecture handling 10M+ requests daily. Implemented event-driven systems with Kafka and designed RESTful APIs serving multiple frontend applications.
            </p>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: -20 }} 
          whileInView={{ opacity: 1, x: 0 }} 
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="relative pl-8"
        >
          <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-slate-600 border-4 border-slate-950" />
          <div>
            <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
              <h4 className="text-xl font-semibold text-white">Full Stack Developer</h4>
              <span className="px-3 py-1 rounded-full bg-slate-800 text-xs font-medium text-slate-300">
                2017 — 2019
              </span>
            </div>
            <p className="text-slate-400 font-medium mb-4">TechStart Solutions • Mumbai</p>
            <p className="text-slate-400 leading-relaxed">
              Developed full-stack applications using Node.js and React. Collaborated with cross-functional teams to deliver customer-facing features and improved application performance.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

const Contact = () => (
  <section id="contact" className="py-20 px-6 lg:px-8 bg-slate-900/30">
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center gap-3 mb-12">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-700 to-transparent" />
        <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Get in Touch</h2>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-700 to-transparent" />
      </div>

      <div className="grid lg:grid-cols-5 gap-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }}
          className="lg:col-span-2 space-y-8"
        >
          <div>
            <h3 className="text-2xl font-bold text-white mb-4">
              Let's build something great together
            </h3>
            <p className="text-slate-400 leading-relaxed">
              I'm always interested in hearing about new projects and opportunities. Whether you have a question or just want to say hi, feel free to reach out.
            </p>
          </div>

          <div className="space-y-4">
            <a 
              href={`mailto:${CONTACT.email}`}
              className="flex items-center gap-3 text-slate-300 hover:text-white transition-colors group"
            >
              <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center group-hover:bg-slate-700 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="font-medium">{CONTACT.email}</span>
            </a>

            <a 
              href="#"
              className="flex items-center gap-3 text-slate-300 hover:text-white transition-colors group"
            >
              <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center group-hover:bg-slate-700 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </div>
              <span className="font-medium">linkedin.com/in/nayanbera</span>
            </a>

            <a 
              href="#"
              className="flex items-center gap-3 text-slate-300 hover:text-white transition-colors group"
            >
              <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center group-hover:bg-slate-700 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </div>
              <span className="font-medium">github.com/nayanbera</span>
            </a>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-3"
        >
          <div className="p-8 rounded-2xl bg-slate-800/30 border border-slate-700/50">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Name
                </label>
                <input 
                  type="text"
                  className="w-full px-4 py-3 rounded-lg bg-slate-900/50 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Email
                </label>
                <input 
                  type="email"
                  className="w-full px-4 py-3 rounded-lg bg-slate-900/50 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Message
                </label>
                <textarea 
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg bg-slate-900/50 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              <button 
                type="button"
                className="w-full px-6 py-3 rounded-lg bg-white text-slate-950 font-medium hover:bg-slate-200 transition-all hover:shadow-lg hover:shadow-white/20"
              >
                Send Message
              </button>
            </div>
          </div>
        </motion.div>
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

      <footer className="border-t border-slate-800 py-8 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-sm text-slate-400">
              © {new Date().getFullYear()} Nayan Kr Bera. All rights reserved.
            </div>
            <div className="flex items-center gap-6 text-sm text-slate-500">
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