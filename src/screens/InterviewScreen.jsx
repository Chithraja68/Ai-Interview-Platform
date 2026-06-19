import React, { useState, useEffect } from "react";
import { Mic, ArrowRight, Radio } from "lucide-react";
import HeaderBar from "../components/HeaderBar.jsx";
import Orb from "../components/Orb.jsx";
import Waveform from "../components/Waveform.jsx";
import { QUESTION_TIME, TOKENS } from "../data/constants.js";

export default function InterviewScreen({ role, level, questions, qIndex, onSubmitAnswer, isLastQuestion }) {
  const [answer, setAnswer] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [seconds, setSeconds] = useState(QUESTION_TIME);
  const [shake, setShake] = useState(false);

  useEffect(() => {
    setAnswer("");
    setSeconds(QUESTION_TIME);
  }, [qIndex]);

  useEffect(() => {
    const id = setInterval(() => setSeconds((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(id);
  }, [qIndex]);

  const pct = (seconds / QUESTION_TIME) * 100;
  const low = seconds <= 10;
  const r = 26;
  const circumference = 2 * Math.PI * r;
  const offset = circumference - (circumference * pct) / 100;

  const handleSubmit = () => {
    if (!answer.trim()) {
      setShake(true);
      setTimeout(() => setShake(false), 420);
      return;
    }
    onSubmitAnswer(answer.trim());
  };

  return (
    <div style={{ maxWidth: 760, margin: "0 auto", padding: "0 24px 80px" }}>
      <HeaderBar onBack={() => {}} steps={["Setup", "Interview", "Report"]} current={1} />

      <div className="fade-up" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
        <div className="font-mono" style={{ fontSize: 12.5, color: TOKENS.muted, letterSpacing: 1 }}>
          QUESTION {qIndex + 1} OF {questions.length} · {role.label.toUpperCase()} · {level.label.toUpperCase()}
        </div>
        <svg width={60} height={60} viewBox="0 0 60 60">
          <circle cx="30" cy="30" r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="4" />
          <circle
            cx="30"
            cy="30"
            r={r}
            fill="none"
            stroke={low ? TOKENS.danger : TOKENS.azure}
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            transform="rotate(-90 30 30)"
            style={{ transition: "stroke-dashoffset 1s linear, stroke 0.4s ease" }}
          />
          <text x="30" y="34" textAnchor="middle" fontSize="13" fontFamily="JetBrains Mono" fill={low ? TOKENS.danger : TOKENS.ivory}>
            {seconds}
          </text>
        </svg>
      </div>

      <div className="progress-track fade-up" style={{ marginBottom: 36 }}>
        <div className="progress-fill" style={{ width: `${(qIndex / questions.length) * 100}%` }} />
      </div>

      <div key={qIndex} className="pop-in" style={{ display: "flex", gap: 20, marginBottom: 32, alignItems: "flex-start" }}>
        <Orb state={isRecording ? "listening" : "speaking"} size={64} iconScale={0.42} />
        <div className="card" style={{ flex: 1, padding: "22px 24px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
            <Radio size={13} color={TOKENS.gold} />
            <span style={{ fontSize: 11.5, letterSpacing: 1.5, color: TOKENS.gold, fontWeight: 600 }}>INTERVIEWER</span>
          </div>
          <p className="font-display" style={{ fontSize: 21, lineHeight: 1.45, margin: 0, fontWeight: 500 }}>
            {questions[qIndex]}
          </p>
        </div>
      </div>

      <div className="fade-up" style={{ marginBottom: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 12 }}>
          <button
            className={`mic-toggle ${isRecording ? "live" : ""}`}
            onClick={() => setIsRecording((v) => !v)}
            aria-label="Toggle recording"
          >
            <Mic size={19} color={isRecording ? TOKENS.danger : TOKENS.muted} />
          </button>
          <Waveform active={isRecording} />
          <span style={{ fontSize: 12.5, color: TOKENS.mutedDim }}>
            {isRecording ? "Listening…" : "Mic off — type your answer below"}
          </span>
        </div>

        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Speak it out loud, then write the gist of your answer here…"
          rows={6}
          className={`answer-box scrollbar-slim ${shake ? "invalid shake" : ""}`}
        />
      </div>

      <div style={{ textAlign: "right" }}>
        <button className="btn btn-primary" style={{ padding: "13px 28px" }} onClick={handleSubmit}>
          {isLastQuestion ? "Finish interview" : "Submit answer"} <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
