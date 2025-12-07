"use client";

import React, { useEffect, useRef } from "react";

interface AsciiEarthProps {
  width?: number;   // columns
  height?: number;  // rows
  className?: string;
  glow?: boolean;
}

/**
 * AsciiEarth - rotating ASCII earth with "hacker" terminal styling.
 * Usage: <AsciiEarth width={70} height={34} />
 */
export default function AsciiEarth({
  width = 68,
  height = 34,
  className = "",
  glow = true,
}: AsciiEarthProps) {
  const preRef = useRef<HTMLPreElement | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    // keep sizes sensible
    const WIDTH = Math.max(40, Math.min(110, width));
    const HEIGHT = Math.max(16, Math.min(60, height));

    // resolution control for geometry sampling (coarser = faster)
    const THETA_STEP = 0.09; // around latitude
    const PHI_STEP = 0.06;   // around longitude

    // ASCII chars from dark -> bright (hacker-green vibe works best with denser chars in bright)
    const LUM = " .,:;i1tfLCG08@#";

    // Earth-ish color set used in CSS (we'll color entire pre green; glitches will use different chars)
    const GLITCH_CHARS = "<>/*$%#@[]{}()=+-";

    // rotation angles
    let A = 0; // tilt rotation (x)
    let B = 0; // spin rotation (y)

    // small wobble for "live" jitter
    let wobble = 0;

    // Precompute grid centers and scale factors
    const xCenter = Math.floor(WIDTH / 2);
    const yCenter = Math.floor(HEIGHT / 2);
    const xScale = (WIDTH / 2) * 0.95;
    const yScale = (HEIGHT / 2) * 0.9;

    // light direction (pointing from top-right-front)
    const Lx = 0.4, Ly = 0.9, Lz = -0.2;
    const lLen = Math.hypot(Lx, Ly, Lz) || 1;
    const lx = Lx / lLen, ly = Ly / lLen, lz = Lz / lLen;

    function renderFrame() {
      // zbuffer and output array
      const out = new Array(WIDTH * HEIGHT).fill(" ");
      const zbuf = new Array(WIDTH * HEIGHT).fill(-Infinity);

      const cosA = Math.cos(A), sinA = Math.sin(A);
      const cosB = Math.cos(B), sinB = Math.sin(B);

      // sample sphere (latitude theta, longitude phi)
      for (let theta = 0; theta < Math.PI; theta += THETA_STEP) {
        const cost = Math.cos(theta), sint = Math.sin(theta);
        for (let phi = 0; phi < Math.PI * 2; phi += PHI_STEP) {
          const cosp = Math.cos(phi), sinp = Math.sin(phi);

          // sphere point (unit sphere)
          let x = cost * cosp;
          let y = sint;
          let z = cost * sinp;

          // apply a tilt around X (A) then spin around Y (B) for earth-like rotation
          // rotate around X by A:
          const y1 = y * cosA - z * sinA;
          const z1 = y * sinA + z * cosA;
          const x1 = x;
          // rotate around Y by B:
          const x2 = x1 * cosB + z1 * sinB;
          const y2 = y1;
          const z2 = -x1 * sinB + z1 * cosB;

          // simple perspective: push forward and project
          const zproj = z2 + 3.5; // shift forward
          if (zproj <= 0) continue;
          const invz = 1 / zproj;

          const xp = Math.floor(xCenter + x2 * xScale * invz);
          const yp = Math.floor(yCenter - y2 * yScale * invz);

          // lighting: use the normal (for sphere it's same as position)
          // but rotate normal same as point (we rotated the point already)
          const nx = x2, ny = y2, nz = z2;
          const nlen = Math.hypot(nx, ny, nz) || 1;
          const ndotl = (nx * lx + ny * ly + nz * lz) / nlen; // -1..1

          // water/land hint: slightly bias islands based on phi/theta to make continents (cheap)
          // crude procedural: create a ridge-like pattern to resemble landmasses (not accurate)
          const landNoise = Math.sin(phi * 3.1 + theta * 2.7 + A * 0.5) * Math.cos(theta * 2.2 + B * 0.3);
          const isLand = landNoise > 0.15 && Math.abs(theta - Math.PI/2) < 1.1; // equatorial bias

          // pick character by brightness + land/water
          let lumIndex = Math.floor(((ndotl + 1) / 2) * (LUM.length - 1));
          lumIndex = Math.max(0, Math.min(LUM.length - 1, lumIndex));
          let ch = LUM[lumIndex];

          // if land, bias to denser char set to look solid
          if (isLand) {
            ch = LUM[Math.max(0, Math.min(LUM.length - 1, lumIndex + 2))];
          }

          // projection bounds check
          if (xp >= 0 && xp < WIDTH && yp >= 0 && yp < HEIGHT) {
            const idx = xp + yp * WIDTH;
            // depth test
            if (invz > zbuf[idx]) {
              zbuf[idx] = invz;

              // occasional small flicker + glitch substitution
              const probGlitch = 0.004 + Math.abs(wobble) * 0.0008; // tiny base chance
              if (Math.random() < probGlitch) {
                ch = GLITCH_CHARS[(Math.random() * GLITCH_CHARS.length) | 0];
              }

              out[idx] = ch;
            }
          }
        }
      }

      // build lines; add tiny HUD on top-left (time + rotation)
      const lines: string[] = [];
      for (let y = 0; y < HEIGHT; y++) {
        const line = out.slice(y * WIDTH, (y + 1) * WIDTH).join("");
        lines.push(line.replace(/\s+$/g, ""));
      }

      // write to pre
      if (preRef.current) {
        preRef.current.textContent = lines.join("\n");
      }

      // advance rotation and wobble
      A += 0.009; // slow tilt
      B += 0.03;  // spin
      wobble = Math.sin(B * 2.3) * 0.6 + (Math.random() - 0.5) * 0.06;
      rafRef.current = requestAnimationFrame(renderFrame);
    }

    rafRef.current = requestAnimationFrame(renderFrame);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [width, height]);

  // CSS styles: green terminal with glow, scanlines, flicker
  // We'll keep markup simple: a <pre> with CSS classes. The rest is inlined styles for convenience.
  return (
    <div className={`ascii-earth ${className}`} style={{ width: "100%", height: "100%" }}>
      <style jsx>{`
        .ascii-earth pre {
          color: #6aff6a; /* hacker green */
          background: linear-gradient(180deg, rgba(0,0,0,0.02), rgba(0,0,0,0.12));
          text-shadow: ${glow ? "0 0 8px rgba(106,255,106,0.06), 0 0 24px rgba(34,197,94,0.03)" : "none"};
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, "Roboto Mono", "Courier New", monospace;
          font-size: 10px;
          line-height: 0.86;
          padding: 8px 12px;
          border-radius: 8px;
          overflow: hidden;
          display: block;
          white-space: pre;
          user-select: none;
          -webkit-user-select: none;
          isolation: isolate;
          position: relative;
        }

        /* scanline overlay */
        .ascii-earth:before {
          content: "";
          position: absolute;
          inset: 0;
          background-image: linear-gradient(rgba(0,0,0,0.0) 50%, rgba(0,0,0,0.08) 50%);
          background-size: 100% 4px;
          pointer-events: none;
          mix-blend-mode: multiply;
          opacity: 0.6;
        }

        /* subtle flicker animation on the whole block */
        .ascii-earth pre {
          animation: terminalFlicker 3s infinite;
        }
        @keyframes terminalFlicker {
          0% { opacity: 0.96; filter: contrast(1.02) brightness(1); transform: translateZ(0); }
          10% { opacity: 1; filter: contrast(1.05) brightness(1.02); }
          40% { opacity: 0.98; }
          100% { opacity: 0.99; }
        }

        /* small HUD overlay */
        .ascii-earth .hud {
          position: absolute;
          left: 10px;
          top: 8px;
          font-size: 10px;
          color: rgba(106,255,106,0.9);
          display: flex;
          gap: 8px;
          align-items: center;
          pointer-events: none;
        }
        .ascii-earth .hud .dot {
          width: 8px;
          height: 8px;
          border-radius: 8px;
          background: #3df94a;
          box-shadow: 0 0 8px rgba(61,249,74,0.6);
        }
      `}</style>

      <div style={{ position: "relative", width: "100%", height: "100%" }}>
        <pre ref={preRef} aria-hidden className="select-none" />
        <div className="hud" aria-hidden>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <div className="dot" />
            <div style={{ fontFamily: "ui-monospace, monospace" }}>EARTH — ⟳</div>
          </div>
          <div style={{ marginLeft: 10, opacity: 0.85, fontFamily: "ui-monospace, monospace" }}>
            <span id="ae-rot">spin</span>
          </div>
        </div>
      </div>
    </div>
  );
}
