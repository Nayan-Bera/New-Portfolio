"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export const CinematicLayer = () => {
  const { scrollYProgress } = useScroll();
  const objectX = useTransform(scrollYProgress, [0, 0.35, 0.7, 1], ["-8vw", "54vw", "18vw", "72vw"]);
  const objectY = useTransform(scrollYProgress, [0, 0.35, 0.7, 1], ["18vh", "8vh", "52vh", "78vh"]);
  const objectRotate = useTransform(scrollYProgress, [0, 1], [-18, 28]);
  const objectScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.72, 0.95]);
  const railY = useTransform(scrollYProgress, [0, 1], ["0%", "-28%"]);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(34,211,238,0.15),transparent_32%),radial-gradient(circle_at_86%_18%,rgba(59,130,246,0.12),transparent_30%),linear-gradient(180deg,#020617_0%,#030712_48%,#020617_100%)]" />
      <div className="absolute inset-0 cinematic-grid opacity-45" />

      <motion.div
        style={{ y: railY }}
        className="absolute inset-x-0 top-0 h-[160vh] opacity-40"
      >
        <div className="absolute left-[8%] top-[12%] h-px w-[58vw] rotate-[-12deg] bg-linear-to-r from-transparent via-cyan-300/60 to-transparent" />
        <div className="absolute right-[-10%] top-[38%] h-px w-[72vw] rotate-[15deg] bg-linear-to-r from-transparent via-blue-400/50 to-transparent" />
        <div className="absolute left-[-12%] top-[70%] h-px w-[68vw] rotate-[-7deg] bg-linear-to-r from-transparent via-teal-300/40 to-transparent" />
      </motion.div>

      <motion.div
        style={{ x: objectX, y: objectY, rotate: objectRotate, scale: objectScale }}
        className="absolute left-0 top-0 hidden h-28 w-28 sm:block"
      >
        <div className="absolute inset-0 rounded-full bg-cyan-400/15 blur-2xl" />
        <div className="absolute left-1/2 top-1/2 h-20 w-36 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-300/50 bg-slate-950/70 shadow-[0_0_48px_rgba(34,211,238,0.26)] backdrop-blur-md">
          <div className="absolute inset-3 rounded-full border border-blue-300/25" />
          <div className="absolute left-6 top-1/2 h-2 w-16 -translate-y-1/2 rounded-full bg-linear-to-r from-cyan-300 via-blue-400 to-transparent" />
          <div className="absolute right-5 top-1/2 h-8 w-8 -translate-y-1/2 rounded-full border border-cyan-200/50 bg-cyan-300/20" />
        </div>
        <div className="absolute left-[-7rem] top-1/2 h-px w-32 -translate-y-1/2 bg-linear-to-r from-transparent to-cyan-300/70" />
      </motion.div>

      <div className="absolute inset-x-0 top-0 h-28 bg-linear-to-b from-slate-950 via-slate-950/80 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-slate-950 via-slate-950/80 to-transparent" />
    </div>
  );
};
