import React from "react";
import { RadialBarChart, RadialBar, PolarAngleAxis, ResponsiveContainer } from "recharts";
import { TOKENS } from "../data/constants.js";
import { useCountUp } from "../hooks/useCountUp.js";

export default function MetricRing({ label, value, color, active }) {
  const count = useCountUp(value, active);
  const data = [{ name: label, value: count, fill: color }];

  return (
    <div className="card" style={{ padding: "18px 12px", textAlign: "center" }}>
      <div style={{ height: 100, position: "relative" }}>
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart
            innerRadius="72%"
            outerRadius="100%"
            data={data}
            startAngle={90}
            endAngle={90 - (360 * count) / 100}
          >
            <PolarAngleAxis type="number" domain={[0, 100]} tick={false} angleAxisId={0} />
            <RadialBar background={{ fill: "rgba(255,255,255,0.06)" }} dataKey="value" cornerRadius={8} />
          </RadialBarChart>
        </ResponsiveContainer>
        <div
          className="font-mono"
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 20,
            fontWeight: 700,
            color: TOKENS.ivory,
          }}
        >
          {count}
        </div>
      </div>
      <div style={{ marginTop: 6, fontSize: 12.5, color: TOKENS.muted, letterSpacing: 0.2 }}>{label}</div>
    </div>
  );
}
