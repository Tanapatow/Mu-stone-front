"use client";

import {
  CONSTELLATION_EDGES,
  CONSTELLATION_POINTS,
  GLYPH_POSITIONS,
  GLYPHS,
  STARS,
} from "@/lib/styles/home-styles";

function StarField() {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden>
      {STARS.map((s) => (
        <span
          key={s.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            ["--min-op" as string]: s.minOp,
            ["--max-op" as string]: s.maxOp,
            ["--dur" as string]: `${s.dur}s`,
            animation: `twinkle ${s.dur}s ease-in-out ${s.delay}s infinite alternate`,
          }}
        />
      ))}
    </div>
  );
}

function ZodiacGlyphs() {
  return (
    <>
      {GLYPH_POSITIONS.map((pos, i) => (
        <span
          key={i}
          aria-hidden
          className="absolute text-[rgba(15,207,207,0.15)] text-2xl select-none"
          style={{
            top: pos.top,
            left: pos.left,
            ["--dur" as string]: `${4 + (i % 4)}s`,
            animation: `glyphFloat ${4 + (i % 4)}s ease-in-out ${i * 0.5}s infinite alternate`,
          }}
        >
          {GLYPHS[i % GLYPHS.length]}
        </span>
      ))}
    </>
  );
}

function SpiralVortex() {
  return (
    <div
      aria-hidden
      className="absolute top-1/2 right-[22%] w-80 h-80 rounded-full blur-[1px] animate-spiral-spin"
      style={{
        background: `conic-gradient(from 0deg,
          transparent 0%,
          rgba(201,162,39,0.06) 10%,
          transparent 20%,
          rgba(201,162,39,0.04) 30%,
          transparent 40%
        )`,
      }}
    />
  );
}

function Constellation() {
  return (
    <svg
      className="absolute bottom-[5%] left-1/2 opacity-35"
      style={{ filter: "drop-shadow(0 0 6px #0fcfcf)" }}
      width="300"
      height="120"
      viewBox="0 0 300 120"
      aria-hidden
    >
      <g stroke="#0fcfcf" strokeWidth="0.8" opacity="0.6">
        {CONSTELLATION_EDGES.map(([x1, y1, x2, y2], i) => (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />
        ))}
      </g>
      {CONSTELLATION_POINTS.map(([cx, cy], i) => (
        <circle
          key={i}
          cx={cx}
          cy={cy}
          r="3"
          fill="#0fcfcf"
          style={{ filter: "drop-shadow(0 0 4px #0fcfcf)" }}
        />
      ))}
    </svg>
  );
}

// ─── Main export ─────────────────────────────────────────────────────────────

export default function HeroBackground() {
  return (
    <>
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/hero-bg.png')" }}
      />

      <div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(90deg,
              rgba(6,8,26,0.85) 0%,
              rgba(6,8,26,0.6)  40%,
              rgba(6,8,26,0.15) 70%,
              transparent       100%
            )
          `,
        }}
      />

      <div
        className="absolute inset-0 animate-nebula-pulse"
        style={{
          background: `
            radial-gradient(ellipse 50% 40% at 60% 55%, rgba(15,207,207,0.06) 0%, transparent 60%)
          `,
        }}
      />

      <StarField />
      <ZodiacGlyphs />
      <SpiralVortex />
      <Constellation />
    </>
  );
}
