import { Code2, Compass, Database, Palette, Megaphone } from "lucide-react";

// Keep these hex values in sync with the CSS variables in src/index.css —
// this object exists because inline styles and recharts `fill` props need
// literal color strings, not CSS custom properties.
export const TOKENS = {
  void: "#0A0C12",
  panel: "#12151F",
  panel2: "#181C29",
  border: "rgba(255,255,255,0.08)",
  gold: "#D7A86E",
  goldSoft: "rgba(215,168,110,0.16)",
  azure: "#6E8FFF",
  azureSoft: "rgba(110,143,255,0.16)",
  ivory: "#F3EFE6",
  muted: "#8C93A8",
  mutedDim: "#5B6178",
  success: "#6FCF97",
  danger: "#E2776E",
};

export const ROLES = [
  { id: "swe", label: "Software Engineer", icon: Code2, blurb: "Systems, trade-offs, code." },
  { id: "pm", label: "Product Manager", icon: Compass, blurb: "Strategy & stakeholders." },
  { id: "ds", label: "Data Scientist", icon: Database, blurb: "Models, rigor, impact." },
  { id: "ux", label: "UX Designer", icon: Palette, blurb: "Craft & user empathy." },
  { id: "mkt", label: "Marketing Lead", icon: Megaphone, blurb: "Story, growth, voice." },
];

export const LEVELS = [
  { id: "junior", label: "Junior", desc: "0–2 years" },
  { id: "mid", label: "Mid-level", desc: "3–5 years" },
  { id: "senior", label: "Senior", desc: "6+ years" },
];

export const QUESTION_TIME = 90; // seconds per question

export const THINKING_MESSAGES = [
  "Reading the room…",
  "Drafting questions for this role…",
  "Calibrating to your level…",
];

export const SCORING_MESSAGES = [
  "Reviewing your answers…",
  "Weighing structure & depth…",
  "Scoring communication…",
  "Writing up notes…",
];
