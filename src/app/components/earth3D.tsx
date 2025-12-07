"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export interface EarthProps {
  className?: string;
}

/**
 * Reusable 3D Earth component.
 * Parent controls size with Tailwind (w- / h- classes) on the wrapper.
 */
const Earth3D: React.FC<EarthProps> = ({ className = "" }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth || 600;
    const height = container.clientHeight || 400;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 3;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Geometry
    const geometry = new THREE.SphereGeometry(1, 64, 64);

    // Shader material
    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        color1: { value: new THREE.Color(0x22d3ee) },
        color2: { value: new THREE.Color(0x0ea5e9) },
        color3: { value: new THREE.Color(0x06b6d4) },
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
          float pattern = sin(vPosition.x * 5.0 + time) *
                          cos(vPosition.y * 5.0 + time * 0.5) *
                          sin(vPosition.z * 5.0 + time * 0.3);
          
          vec3 color = mix(color1, color2, pattern * 0.5 + 0.5);
          color = mix(color, color3, sin(time * 0.5) * 0.3 + 0.3);
          
          float fresnel = pow(1.0 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
          color += color1 * fresnel * 0.5;
          
          float alpha = 0.7 + pattern * 0.3;
          
          gl_FragColor = vec4(color, alpha);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide,
    });

    const earth = new THREE.Mesh(geometry, material);
    scene.add(earth);

    // Wireframe overlay
    const wireframeGeometry = new THREE.SphereGeometry(1.01, 32, 32);
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: 0x22d3ee,
      wireframe: true,
      transparent: true,
      opacity: 0.15,
    });
    const wireframe = new THREE.Mesh(wireframeGeometry, wireframeMaterial);
    scene.add(wireframe);

    // Particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1000;
    const positions = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 5;
    }
    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );

    const particlesMaterial = new THREE.PointsMaterial({
      color: 0x22d3ee,
      size: 0.02,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(
      particlesGeometry,
      particlesMaterial
    );
    scene.add(particles);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x22d3ee, 1, 100);
    pointLight.position.set(2, 2, 2);
    scene.add(pointLight);

    // Animate
    let time = 0;
    let frameId: number;

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      time += 0.01;

      earth.rotation.y += 0.003;
      earth.rotation.x = Math.sin(time * 0.3) * 0.1;

      wireframe.rotation.y += 0.002;
      wireframe.rotation.x = Math.cos(time * 0.3) * 0.1;

      particles.rotation.y -= 0.0005;

      material.uniforms.time.value = time;

      renderer.render(scene, camera);
    };

    animate();

    // Resize
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth || width;
      const newHeight = container.clientHeight || height;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(frameId);
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
          0%,
          100% {
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

export default Earth3D;
