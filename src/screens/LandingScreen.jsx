import React from "react";
import { ArrowRight, Compass, Brain, RotateCcw } from "lucide-react";
import Orb from "../components/Orb.jsx";
import Logo from "../components/Logo.jsx";
import { TOKENS } from "../data/constants.js";

const FEATURES = [
  {
    icon: Compass,
    title: "Adapts to the room",
    body: "Questions generated fresh for your exact role and level — never the same script twice.",
  },
  {
    icon: Brain,
    title: "Reads the answer, not just the words",
    body: "Feedback on structure, depth, and confidence — not keyword matching.",
  },
  {
    icon: RotateCcw,
    title: "Built for repetition",
    body: "Run it again before the real thing. Every pass sharpens your tenor.",
  },
];

export default function LandingScreen({ onStart }) {
  return (
    <div style={{ maxWidth: 980, margin: "0 auto", padding: "0 24px" }}>
      <div
        className="fade-up"
        style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "28px 0" }}
      >
        <Logo />
        <span className="font-mono" style={{ fontSize: 12, color: TOKENS.mutedDim, letterSpacing: 1 }}>
          AI MOCK INTERVIEWS
        </span>
      </div>

      <div style={{ textAlign: "center", padding: "70px 0 50px" }}>
        <div className="fade-up" style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
          <Orb state="idle" size={108} />
        </div>
        <div
          className="font-mono fade-up"
          style={{ fontSize: 12.5, letterSpacing: 3, color: TOKENS.gold, marginBottom: 18, animationDelay: "0.08s" }}
        >
          AI INTERVIEW REHEARSAL
        </div>
        <h1
          className="font-display fade-up"
          style={{
            fontSize: "clamp(36px, 6vw, 64px)",
            fontWeight: 600,
            lineHeight: 1.08,
            margin: "0 0 22px",
            animationDelay: "0.14s",
          }}
        >
          Find your tenor
          <br />
          before the room does.
        </h1>
        <p
          className="fade-up"
          style={{
            fontSize: 17,
            color: TOKENS.muted,
            maxWidth: 560,
            margin: "0 auto 38px",
            lineHeight: 1.6,
            animationDelay: "0.2s",
          }}
        >
          Practice real interview questions with an AI that listens, adapts, and tells
          you the truth — so the real conversation feels like the second take.
        </p>
        <button
          className="btn btn-primary fade-up"
          style={{ animationDelay: "0.26s", padding: "15px 32px", fontSize: 15.5 }}
          onClick={onStart}
        >
          Start a mock interview <ArrowRight size={17} />
        </button>
      </div>

      <div
        className="stagger"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
          gap: 16,
          paddingBottom: 80,
        }}
      >
        {FEATURES.map((f) => (
          <div key={f.title} className="card" style={{ padding: 26 }}>
            <f.icon size={22} color={TOKENS.azure} strokeWidth={1.7} />
            <h3 className="font-display" style={{ fontSize: 19, margin: "16px 0 8px", fontWeight: 600 }}>
              {f.title}
            </h3>
            <p style={{ fontSize: 14, color: TOKENS.muted, lineHeight: 1.6, margin: 0 }}>{f.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
