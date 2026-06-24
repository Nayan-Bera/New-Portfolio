import { ImageResponse } from "next/og";
import { siteConfig } from "./seo";

export const alt = `${siteConfig.name} portfolio preview`;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#020617",
          color: "#f8fafc",
          padding: "72px",
          fontFamily: "Inter, Arial, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "18px",
            fontSize: 30,
            color: "#67e8f9",
          }}
        >
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 18,
              background: "linear-gradient(135deg, #3b82f6, #06b6d4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#ffffff",
              fontWeight: 800,
            }}
          >
            NB
          </div>
          {siteConfig.name}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 78,
              lineHeight: 1.02,
              fontWeight: 800,
            }}
          >
            <span>Software Engineer</span>
            <span>& System Architect</span>
          </div>
          <div
            style={{
              maxWidth: 860,
              fontSize: 30,
              lineHeight: 1.35,
              color: "#cbd5e1",
            }}
          >
            Full-stack applications, backend APIs, real-time systems, and
            scalable product architecture.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: "18px",
            fontSize: 24,
            color: "#94a3b8",
          }}
        >
          <span>Next.js</span>
          <span>TypeScript</span>
          <span>Node.js</span>
          <span>PostgreSQL</span>
        </div>
      </div>
    ),
    size
  );
}
