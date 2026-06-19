import React from "react";

export default function StepIndicator({ steps, current }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      {steps.map((s, i) => (
        <div key={s} className={`step-dot ${i === current ? "active" : i < current ? "done" : ""}`} />
      ))}
    </div>
  );
}
