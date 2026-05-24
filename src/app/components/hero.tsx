'use client';
import Link from "next/link";
import Earth3D from "./earth3D";
import { HERO_CONTENT } from "@/src/constant/data";
import { motion } from "framer-motion";

export const Hero = () => (
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

    <div className="pointer-events-none absolute left-0 top-24 h-48 w-px bg-linear-to-b from-transparent via-cyan-400/60 to-transparent" />
    <div className="pointer-events-none absolute bottom-10 right-[12%] hidden h-24 w-24 rounded-full border border-cyan-300/20 sm:block" />

    <div className="relative max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="order-1"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1.5 text-[11px] sm:text-xs font-medium text-cyan-50 shadow-[0_0_32px_rgba(34,211,238,0.12)] backdrop-blur mb-5 sm:mb-6">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            Available for new opportunities
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight mb-4 sm:mb-6">
           <span>Software Engineer</span>
            <br />
            <span> &</span>
            <br />
            <span className="bg-linear-to-r from-blue-300 via-cyan-300 to-teal-300 bg-clip-text text-transparent">
              System Architect
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-400 leading-relaxed mb-6 sm:mb-8 max-w-xl">
            {HERO_CONTENT}
          </p>

          <div className="flex flex-wrap gap-3 sm:gap-4">
            <Link
              href="/resume.pdf"
              className="scanline px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-white text-slate-950 text-sm sm:text-base font-semibold hover:bg-slate-200 transition-all hover:shadow-lg hover:shadow-white/20"
            >
              View Resume
            </Link>
            <Link
              href="#contact"
              className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl border border-cyan-300/20 bg-slate-950/30 text-slate-200 text-sm sm:text-base font-semibold backdrop-blur hover:bg-cyan-300/10 hover:border-cyan-300/50 transition-all"
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
                className="cinematic-card p-3 sm:p-4 md:p-5 rounded-xl bg-slate-800/50 border border-slate-700/50 hover:border-cyan-300/50 transition-all group cursor-default backdrop-blur"
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
