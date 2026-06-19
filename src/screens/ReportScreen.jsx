import React, { useState, useEffect } from "react";
import { CheckCircle2, TrendingUp, FileText, ChevronDown, ChevronUp, Quote, RotateCcw } from "lucide-react";
import HeaderBar from "../components/HeaderBar.jsx";
import MetricRing from "../components/MetricRing.jsx";
import { TOKENS } from "../data/constants.js";
import { useCountUp } from "../hooks/useCountUp.js";

export default function ReportScreen({ role, level, feedback, transcript, onRestart }) {
  const [mounted, setMounted] = useState(false);
  const [openTranscript, setOpenTranscript] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => setMounted(true), 120);
    return () => clearTimeout(id);
  }, []);

  const overallCount = useCountUp(feedback.overall, mounted);
  const r = 64;
  const circumference = 2 * Math.PI * r;
  const offset = circumference - (circumference * overallCount) / 100;

  return (
    <div style={{ maxWidth: 820, margin: "0 auto", padding: "0 24px 90px" }}>
      <HeaderBar onBack={() => {}} steps={["Setup", "Interview", "Report"]} current={2} />

      <div className="fade-up" style={{ textAlign: "center", margin: "20px 0 40px" }}>
        <div className="font-mono" style={{ fontSize: 12, letterSpacing: 3, color: TOKENS.gold, marginBottom: 12 }}>
          {role.label.toUpperCase()} · {level.label.toUpperCase()}
        </div>
        <h2 className="font-display" style={{ fontSize: 32, fontWeight: 600, margin: 0 }}>
          Your tenor, measured.
        </h2>
      </div>

      <div className="pop-in" style={{ display: "flex", justifyContent: "center", marginBottom: 44 }}>
        <div style={{ position: "relative", width: 170, height: 170 }}>
          <svg width="170" height="170" viewBox="0 0 170 170">
            <circle cx="85" cy="85" r={r} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="10" />
            <circle
              cx="85"
              cy="85"
              r={r}
              fill="none"
              stroke={TOKENS.gold}
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              transform="rotate(-90 85 85)"
              style={{ transition: "stroke-dashoffset 1.4s cubic-bezier(.22,1,.36,1)" }}
            />
          </svg>
          <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <div className="font-mono" style={{ fontSize: 38, fontWeight: 700 }}>{overallCount}</div>
            <div style={{ fontSize: 11, letterSpacing: 1.5, color: TOKENS.mutedDim }}>OVERALL</div>
          </div>
        </div>
      </div>

      <div className="stagger" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: 12, marginBottom: 40 }}>
        <MetricRing label="Communication" value={feedback.scores.communication} color={TOKENS.azure} active={mounted} />
        <MetricRing label="Technical Depth" value={feedback.scores.technicalDepth} color={TOKENS.gold} active={mounted} />
        <MetricRing label="Structure" value={feedback.scores.structure} color={TOKENS.success} active={mounted} />
        <MetricRing label="Confidence" value={feedback.scores.confidence} color={TOKENS.danger} active={mounted} />
      </div>

      <div className="card fade-up" style={{ padding: 24, marginBottom: 20 }}>
        <p style={{ fontSize: 15, lineHeight: 1.7, color: TOKENS.ivory, margin: 0 }}>{feedback.summary}</p>
      </div>

      <div className="stagger" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16, marginBottom: 20 }}>
        <div className="card" style={{ padding: 22 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
            <CheckCircle2 size={17} color={TOKENS.success} />
            <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: 0.4 }}>STRENGTHS</span>
          </div>
          {feedback.strengths.map((s, i) => (
            <div key={i} style={{ display: "flex", gap: 10, marginBottom: 12, fontSize: 13.5, color: TOKENS.muted, lineHeight: 1.55 }}>
              <span style={{ color: TOKENS.success }}>•</span> {s}
            </div>
          ))}
        </div>
        <div className="card" style={{ padding: 22 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
            <TrendingUp size={17} color={TOKENS.gold} />
            <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: 0.4 }}>NEXT REPS</span>
          </div>
          {feedback.improvements.map((s, i) => (
            <div key={i} style={{ display: "flex", gap: 10, marginBottom: 12, fontSize: 13.5, color: TOKENS.muted, lineHeight: 1.55 }}>
              <span style={{ color: TOKENS.gold }}>•</span> {s}
            </div>
          ))}
        </div>
      </div>

      <div className="card fade-up" style={{ marginBottom: 32, overflow: "hidden" }}>
        <button
          onClick={() => setOpenTranscript((v) => !v)}
          style={{
            width: "100%",
            background: "none",
            border: "none",
            color: TOKENS.ivory,
            padding: "18px 22px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span style={{ display: "flex", alignItems: "center", gap: 9, fontSize: 13.5, fontWeight: 600 }}>
            <FileText size={16} color={TOKENS.azure} /> Transcript review
          </span>
          {openTranscript ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
        {openTranscript && (
          <div className="pop-in" style={{ padding: "0 22px 22px", borderTop: `1px solid ${TOKENS.border}` }}>
            {transcript.map((t, i) => (
              <div key={i} style={{ marginTop: 18 }}>
                <div style={{ fontSize: 12.5, color: TOKENS.gold, marginBottom: 6, fontWeight: 600 }}>
                  Q{i + 1}. {t.question}
                </div>
                <div style={{ display: "flex", gap: 8, fontSize: 13, color: TOKENS.muted, lineHeight: 1.6 }}>
                  <Quote size={13} style={{ marginTop: 3, flexShrink: 0, opacity: 0.5 }} />
                  <span>{t.answer}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="fade-up" style={{ textAlign: "center" }}>
        <button className="btn btn-primary" style={{ padding: "14px 30px" }} onClick={onRestart}>
          <RotateCcw size={16} /> Rehearse again
        </button>
      </div>
    </div>
  );
}
