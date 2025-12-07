"use client";

import { motion } from "framer-motion";

// Icons
import { FaNodeJs, FaPython, FaDocker, FaAws } from "react-icons/fa6";
import {
  SiMongodb,
  SiTypescript,
  SiRedis,
  SiKubernetes,
  SiGraphql,
  SiPostgresql,
} from "react-icons/si";

const techs = [
  { name: "Node.js", icon: <FaNodeJs className="text-green-400" /> },
  { name: "TypeScript", icon: <SiTypescript className="text-blue-400" /> },
  { name: "Python", icon: <FaPython className="text-yellow-300" /> },
  { name: "PostgreSQL", icon: <SiPostgresql className="text-sky-400" /> },
  { name: "MongoDB", icon: <SiMongodb className="text-green-500" /> },
  { name: "Redis", icon: <SiRedis className="text-red-400" /> },
  { name: "Docker", icon: <FaDocker className="text-blue-300" /> },
  { name: "Kubernetes", icon: <SiKubernetes className="text-blue-500" /> },
  { name: "AWS", icon: <FaAws className="text-orange-400" /> },
  { name: "GraphQL", icon: <SiGraphql className="text-pink-500" /> },
];

const Technologies = () => {
  return (
    <section id="technologies" className="py-20 px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-10">Technology Stack</h2>

        {/* Infinite Slider Container */}
        <div className="relative w-full overflow-hidden">
          <motion.div
            className="flex gap-6"
            initial={{ x: 0 }}
            animate={{ x: "-100%" }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {[...techs, ...techs].map((tech, i) => (
              <div
  key={i}
  className="flex items-center gap-2 px-5 py-3 rounded-xl 
             bg-slate-900/40 border border-slate-700/50 
             backdrop-blur-sm cursor-default
             transition-all duration-300
             hover:scale-105 hover:border-cyan-400/40
             shadow-lg shadow-cyan-500/10
             hover:shadow-xl hover:shadow-cyan-400/30"
>
  <span className="text-xl">{tech.icon}</span>
  <span className="text-slate-300 font-medium">{tech.name}</span>
</div>

            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Technologies;
