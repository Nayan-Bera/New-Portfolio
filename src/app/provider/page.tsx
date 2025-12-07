"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import * as THREE from "three";

interface EarthProps {
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

// 3D Earth Component with Three.js
const Earth3D: React.FC<EarthProps> = ({ className = "" }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 3;

    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true 
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Create Earth sphere
    const geometry = new THREE.SphereGeometry(1, 64, 64);
    
    // Create custom shader material for glowing effect
    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        color1: { value: new THREE.Color(0x22d3ee) }, // cyan
        color2: { value: new THREE.Color(0x0ea5e9) }, // blue
        color3: { value: new THREE.Color(0x06b6d4) }  // cyan-600
      },
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vPosition;
        
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vPosition = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform vec3 color1;
        uniform vec3 color2;
        uniform vec3 color3;
        
        varying vec3 vNormal;
        varying vec3 vPosition;
        
        void main() {
          // Create rotating pattern
          float pattern = sin(vPosition.x * 5.0 + time) * 
                         cos(vPosition.y * 5.0 + time * 0.5) * 
                         sin(vPosition.z * 5.0 + time * 0.3);
          
          // Mix colors based on pattern
          vec3 color = mix(color1, color2, pattern * 0.5 + 0.5);
          color = mix(color, color3, sin(time * 0.5) * 0.3 + 0.3);
          
          // Add fresnel glow
          float fresnel = pow(1.0 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
          color += color1 * fresnel * 0.5;
          
          // Fade based on position for depth
          float alpha = 0.7 + pattern * 0.3;
          
          gl_FragColor = vec4(color, alpha);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide
    });

    const earth = new THREE.Mesh(geometry, material);
    scene.add(earth);

    // Add wireframe overlay
    const wireframeGeometry = new THREE.SphereGeometry(1.01, 32, 32);
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: 0x22d3ee,
      wireframe: true,
      transparent: true,
      opacity: 0.15
    });
    const wireframe = new THREE.Mesh(wireframeGeometry, wireframeMaterial);
    scene.add(wireframe);

    // Add particles around earth
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1000;
    const positions = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 5;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      color: 0x22d3ee,
      size: 0.02,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // Add point light
    const pointLight = new THREE.PointLight(0x22d3ee, 1, 100);
    pointLight.position.set(2, 2, 2);
    scene.add(pointLight);

    // Animation
    let time = 0;
    const animate = () => {
      requestAnimationFrame(animate);
      time += 0.01;

      // Rotate earth
      earth.rotation.y += 0.003;
      earth.rotation.x = Math.sin(time * 0.3) * 0.1;

      // Rotate wireframe slightly different
      wireframe.rotation.y += 0.002;
      wireframe.rotation.x = Math.cos(time * 0.3) * 0.1;

      // Rotate particles
      particles.rotation.y -= 0.0005;

      // Update shader time
      material.uniforms.time.value = time;

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;

      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      wireframeGeometry.dispose();
      wireframeMaterial.dispose();
      particlesGeometry.dispose();
      particlesMaterial.dispose();
    };
  }, []);

  return (
    <div ref={containerRef} className={`earth-3d-wrapper ${className}`}>
      <style jsx>{`
        .earth-3d-wrapper {
          position: relative;
          width: 100%;
          height: 100%;
        }
        
        .earth-3d-wrapper canvas {
          display: block;
          width: 100%;
          height: 100%;
        }

        .earth-3d-wrapper:before {
          content: "";
          position: absolute;
          inset: -30%;
          background: radial-gradient(
            ellipse at center,
            rgba(6, 182, 212, 0.25) 0%,
            rgba(14, 165, 233, 0.15) 30%,
            transparent 70%
          );
          animation: pulseGlow 3s ease-in-out infinite;
          pointer-events: none;
          z-index: -1;
        }

        @keyframes pulseGlow {
          0%, 100% { 
            opacity: 0.7;
            transform: scale(1);
          }
          50% { 
            opacity: 1;
            transform: scale(1.08);
          }
        }
      `}</style>
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
    {/* 3D Earth Background - positioned behind text */}
    <div className="absolute top-0 left-0 right-0 bottom-0 pointer-events-none">
      <div className="absolute top-1/2 -translate-y-1/2 left-[5%] w-[1000px] h-[600px] opacity-40">
        <Earth3D />
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

// Rest of your components (About, Technologies, ProjectCard, etc.) remain the same...
// I'll continue in the next message due to length

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Nav />
      <main>
        <Hero />
        {/* Other sections */}
      </main>
    </div>
  );
}