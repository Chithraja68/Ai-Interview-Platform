import React from "react";
import { Sparkles, Volume2, Brain } from "lucide-react";
import { TOKENS } from "../data/constants.js";

export default function Orb({ state = "idle", size = 96, iconScale = 0.4 }) {
  const Icon = state === "thinking" ? Sparkles : state === "speaking" ? Volume2 : Brain;
  const ringColorClass = state === "thinking" || state === "speaking" ? "gold" : "";

  return (
    <div className="orb-wrap" style={{ width: size * 1.8, height: size * 1.8 }}>
      <div className={`orb-ring ${ringColorClass}`} style={{ width: size, height: size }} />
      <div className={`orb-ring delay2 ${ringColorClass}`} style={{ width: size, height: size }} />
      <div className={`orb-ring delay3 ${ringColorClass}`} style={{ width: size, height: size }} />
      <div className={`orb-core is-${state}`} style={{ width: size, height: size }}>
        <Icon
          size={size * iconScale}
          color={state === "thinking" || state === "speaking" ? TOKENS.gold : TOKENS.azure}
          className={state === "thinking" ? "orb-icon-spin" : ""}
          strokeWidth={1.6}
        />
      </div>
    </div>
  );
}
