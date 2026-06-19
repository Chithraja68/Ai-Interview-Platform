import React, { useMemo } from "react";

export default function Waveform({ active = false, bars = 18 }) {
  const heights = useMemo(
    () => Array.from({ length: bars }, () => 0.6 + Math.random() * 1.4),
    [bars]
  );

  return (
    <div className="wave-bars">
      {heights.map((h, i) => (
        <div
          key={i}
          className={`wave-bar ${active ? "active" : ""}`}
          style={{
            animationDuration: `${0.7 + (i % 5) * 0.15}s`,
            animationPlayState: active ? "running" : "paused",
            height: `${10 + h * 14}px`,
          }}
        />
      ))}
    </div>
  );
}
