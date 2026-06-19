import React from "react";
import { ArrowRight, Loader2, Target } from "lucide-react";
import HeaderBar from "../components/HeaderBar.jsx";
import { ROLES, LEVELS, TOKENS } from "../data/constants.js";

export default function SetupScreen({ role, setRole, level, setLevel, onBack, onBegin, loading }) {
  return (
    <div style={{ maxWidth: 760, margin: "0 auto", padding: "0 24px 80px" }}>
      <HeaderBar onBack={onBack} steps={["Setup", "Interview", "Report"]} current={0} />

      <div className="fade-up" style={{ textAlign: "center", margin: "36px 0 44px" }}>
        <div className="font-mono" style={{ fontSize: 12, letterSpacing: 3, color: TOKENS.gold, marginBottom: 12 }}>
          SET THE SCENE
        </div>
        <h2 className="font-display" style={{ fontSize: 34, fontWeight: 600, margin: 0 }}>
          Who's in the room today?
        </h2>
      </div>

      <div className="fade-up" style={{ marginBottom: 32 }}>
        <div style={{ fontSize: 13, color: TOKENS.muted, marginBottom: 12, fontWeight: 500 }}>CHOOSE YOUR ROLE</div>
        <div className="stagger" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 12 }}>
          {ROLES.map((r) => (
            <button
              key={r.id}
              className={`card card-select ${role?.id === r.id ? "selected" : ""}`}
              style={{ padding: 18 }}
              onClick={() => setRole(r)}
            >
              <r.icon size={19} color={role?.id === r.id ? TOKENS.gold : TOKENS.muted} strokeWidth={1.7} />
              <div style={{ fontSize: 14.5, fontWeight: 600, margin: "10px 0 3px" }}>{r.label}</div>
              <div style={{ fontSize: 12, color: TOKENS.mutedDim }}>{r.blurb}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="fade-up" style={{ marginBottom: 40 }}>
        <div style={{ fontSize: 13, color: TOKENS.muted, marginBottom: 12, fontWeight: 500 }}>CHOOSE YOUR LEVEL</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
          {LEVELS.map((l) => (
            <button
              key={l.id}
              className={`card card-select ${level?.id === l.id ? "selected" : ""}`}
              style={{ padding: 16, textAlign: "center" }}
              onClick={() => setLevel(l)}
            >
              <Target size={17} color={level?.id === l.id ? TOKENS.gold : TOKENS.muted} style={{ margin: "0 auto" }} />
              <div style={{ fontSize: 14.5, fontWeight: 600, margin: "9px 0 2px" }}>{l.label}</div>
              <div style={{ fontSize: 12, color: TOKENS.mutedDim }}>{l.desc}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="fade-up" style={{ textAlign: "center" }}>
        <button
          className="btn btn-primary"
          style={{ padding: "15px 34px", fontSize: 15.5, minWidth: 230 }}
          disabled={!role || !level || loading}
          onClick={onBegin}
        >
          {loading ? (
            <>
              <Loader2 size={17} className="orb-icon-spin" /> Preparing questions…
            </>
          ) : (
            <>
              Begin rehearsal <ArrowRight size={17} />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
