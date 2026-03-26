// ─── Theme tokens ────────────────────────────────────────────────────────────
export const THEME = {
  gold: "#c9a227",
  goldLight: "#e8c96a",
  goldDark: "#7a5c0a",
  navy: "#0b0e2a",
  navyMid: "#131742",
  teal: "#0fcfcf",
  purple: "#4a1a6e",
  white: "#f5f0e8",
} as const;

function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s |= 0;
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// ─── Stars ───────────────────────────────────────────────────────────────────
export interface StarData {
  id: number;
  x: number;
  y: number;
  size: number;
  dur: string;
  minOp: string;
  maxOp: string;
  delay: string;
}

// seed=42 → ค่าเหมือนกันทุกครั้ง ไม่ว่าจะ HMR กี่รอบ
const rng = seededRandom(42);

export const STARS: StarData[] = Array.from({ length: 80 }, (_, i) => ({
  id: i,
  x: rng() * 100,
  y: rng() * 100,
  size: rng() * 2 + 0.5,
  dur: (rng() * 3 + 2).toFixed(1),
  minOp: (rng() * 0.2 + 0.1).toFixed(2),
  maxOp: (rng() * 0.6 + 0.4).toFixed(2),
  delay: (rng() * 4).toFixed(1),
}));

// ─── Zodiac glyphs ───────────────────────────────────────────────────────────
export const GLYPHS = [
  "♈",
  "♉",
  "♊",
  "♋",
  "♌",
  "♍",
  "♎",
  "♏",
  "♐",
  "♑",
  "♒",
  "♓",
  "☿",
  "♀",
  "♂",
  "♃",
  "♄",
  "☽",
  "☉",
  "⊕",
] as const;

export interface GlyphPosition {
  top: string;
  left: string;
}

export const GLYPH_POSITIONS: GlyphPosition[] = [
  { top: "10%", left: "2%" },
  { top: "15%", left: "85%" },
  { top: "30%", left: "90%" },
  { top: "60%", left: "88%" },
  { top: "80%", left: "5%" },
  { top: "70%", left: "48%" },
  { top: "8%", left: "55%" },
  { top: "45%", left: "2%" },
  { top: "85%", left: "70%" },
  { top: "20%", left: "40%" },
  { top: "55%", left: "95%" },
  { top: "90%", left: "30%" },
];

// ─── Constellation ────────────────────────────────────────────────────────────
export const CONSTELLATION_POINTS: [number, number][] = [
  [20, 80],
  [80, 40],
  [150, 60],
  [220, 20],
  [280, 50],
  [110, 100],
  [170, 110],
];

export const CONSTELLATION_EDGES: [number, number, number, number][] = [
  [20, 80, 80, 40],
  [80, 40, 150, 60],
  [150, 60, 220, 20],
  [220, 20, 280, 50],
  [80, 40, 110, 100],
  [150, 60, 170, 110],
];
