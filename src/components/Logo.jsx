import React from "react";
import { TOKENS } from "../data/constants.js";

export default function Logo({ size = 22 }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <div
        style={{
          width: size,
          height: size,
          borderRadius: 999,
          background: `radial-gradient(circle at 35% 30%, ${TOKENS.gold}, #6E4B22 75%)`,
          boxShadow: "0 0 16px rgba(215,168,110,0.5)",
        }}
      />
      <span className="font-display" style={{ fontSize: 19, letterSpacing: 1.5, fontWeight: 600 }}>
        TENOR
      </span>
    </div>
  );
}
