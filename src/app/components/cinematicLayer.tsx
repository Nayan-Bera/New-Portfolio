"use client";

import { motion, useScroll, useTransform } from "framer-motion";

const ambientMeteors = [
  { top: "8%", left: "-18%", delay: "0s", duration: "7.4s", size: "w-36" },
  { top: "28%", left: "-26%", delay: "2.1s", duration: "8.8s", size: "w-48" },
  { top: "58%", left: "-14%", delay: "4.6s", duration: "9.6s", size: "w-40" },
];

export const CinematicLayer = () => {
  const { scrollYProgress } = useScroll();
  const starY = useTransform(scrollYProgress, [0, 1], ["0vh", "-22vh"]);
  const nebulaY = useTransform(scrollYProgress, [0, 1], ["0vh", "16vh"]);
  const meteorX = useTransform(scrollYProgress, [0, 0.28, 0.65, 1], ["-18vw", "18vw", "58vw", "104vw"]);
  const meteorY = useTransform(scrollYProgress, [0, 0.28, 0.65, 1], ["8vh", "24vh", "54vh", "84vh"]);
  const meteorTilt = useTransform(scrollYProgress, [0, 1], [28, 34]);
  const meteorScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.72, 1.15, 0.82]);
  const depthRingY = useTransform(scrollYProgress, [0, 1], ["8vh", "-18vh"]);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_14%,rgba(14,165,233,0.18),transparent_32%),radial-gradient(circle_at_82%_18%,rgba(45,212,191,0.12),transparent_28%),radial-gradient(circle_at_52%_72%,rgba(30,64,175,0.16),transparent_38%),linear-gradient(180deg,#020617_0%,#030712_48%,#020617_100%)]" />

      <motion.div
        style={{ y: nebulaY }}
        className="absolute inset-[-12%] opacity-70 blur-3xl"
      >
        <div className="absolute left-[12%] top-[16%] h-72 w-72 rounded-full bg-cyan-500/10" />
        <div className="absolute right-[8%] top-[44%] h-96 w-96 rounded-full bg-blue-500/10" />
        <div className="absolute left-[42%] bottom-[4%] h-80 w-80 rounded-full bg-teal-400/8" />
      </motion.div>

      <motion.div style={{ y: starY }} className="absolute inset-0">
        <div className="absolute inset-0 galaxy-stars opacity-70" />
        <div className="absolute inset-0 galaxy-stars-far opacity-55" />
      </motion.div>

      <motion.div
        style={{ y: depthRingY }}
        className="absolute left-1/2 top-1/2 hidden h-[46rem] w-[46rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-300/10 sm:block"
      >
        <div className="absolute inset-12 rounded-full border border-blue-300/10" />
        <div className="absolute inset-28 rounded-full border border-teal-300/10" />
      </motion.div>

      <motion.div
        style={{
          x: meteorX,
          y: meteorY,
          rotate: meteorTilt,
          scale: meteorScale,
        }}
        className="absolute left-0 top-0 hidden h-28 w-80 sm:block"
      >
        <div className="absolute right-0 top-1/2 h-5 w-5 -translate-y-1/2 rounded-full bg-white shadow-[0_0_20px_8px_rgba(125,211,252,0.45),0_0_72px_20px_rgba(34,211,238,0.18)]" />
        <div className="absolute right-3 top-1/2 h-2 w-64 -translate-y-1/2 rounded-full bg-linear-to-l from-white via-cyan-200/80 to-transparent blur-[1px]" />
        <div className="absolute right-6 top-[42%] h-px w-56 rounded-full bg-linear-to-l from-cyan-100/70 via-blue-300/35 to-transparent" />
        <div className="absolute right-7 top-[58%] h-px w-48 rounded-full bg-linear-to-l from-teal-100/50 via-cyan-300/25 to-transparent" />
      </motion.div>

      {ambientMeteors.map((meteor) => (
        <div
          key={`${meteor.top}-${meteor.left}`}
          className={`shooting-meteor absolute ${meteor.size}`}
          style={{
            top: meteor.top,
            left: meteor.left,
            animationDelay: meteor.delay,
            animationDuration: meteor.duration,
          }}
        />
      ))}

      <div className="absolute inset-x-0 top-0 h-28 bg-linear-to-b from-slate-950 via-slate-950/80 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-slate-950 via-slate-950/80 to-transparent" />
    </div>
  );
};
