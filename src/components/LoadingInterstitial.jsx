import React, { useState, useEffect } from "react";
import Orb from "./Orb.jsx";
import { TOKENS } from "../data/constants.js";

export default function LoadingInterstitial({ messages, sub }) {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIdx((i) => (i + 1) % messages.length), 1500);
    return () => clearInterval(id);
  }, [messages.length]);

  return (
    <div
      style={{
        minHeight: "60vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <Orb state="thinking" size={104} />
      <div className="font-display shimmer-text" style={{ fontSize: 22, marginTop: 28, fontWeight: 600 }}>
        {messages[idx]}
      </div>
      {sub && <div style={{ fontSize: 13.5, color: TOKENS.mutedDim, marginTop: 10 }}>{sub}</div>}
    </div>
  );
}
