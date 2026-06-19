import React, { useState, useCallback } from "react";
import Particles from "./components/Particles.jsx";
import LoadingInterstitial from "./components/LoadingInterstitial.jsx";
import LandingScreen from "./screens/LandingScreen.jsx";
import SetupScreen from "./screens/SetupScreen.jsx";
import InterviewScreen from "./screens/InterviewScreen.jsx";
import ReportScreen from "./screens/ReportScreen.jsx";
import { generateQuestions, generateFeedback } from "./services/aiService.js";
import { THINKING_MESSAGES, SCORING_MESSAGES } from "./data/constants.js";

// view: landing | setup | loadingQ | interview | loadingF | report
export default function App() {
  const [view, setView] = useState("landing");
  const [role, setRole] = useState(null);
  const [level, setLevel] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [qIndex, setQIndex] = useState(0);
  const [transcript, setTranscript] = useState([]);
  const [feedback, setFeedback] = useState(null);

  const handleBegin = useCallback(async () => {
    setView("loadingQ");
    const qs = await generateQuestions(role, level);
    setQuestions(qs);
    setQIndex(0);
    setTranscript([]);
    setView("interview");
  }, [role, level]);

  const handleSubmitAnswer = useCallback(
    async (answerText) => {
      const entry = { question: questions[qIndex], answer: answerText };
      const nextTranscript = [...transcript, entry];
      setTranscript(nextTranscript);

      if (qIndex + 1 < questions.length) {
        setQIndex((i) => i + 1);
      } else {
        setView("loadingF");
        const fb = await generateFeedback(role, level, nextTranscript);
        setFeedback(fb);
        setView("report");
      }
    },
    [questions, qIndex, transcript, role, level]
  );

  const handleRestart = useCallback(() => {
    setView("setup");
    setQuestions([]);
    setTranscript([]);
    setFeedback(null);
    setQIndex(0);
  }, []);

  return (
    <div className="tenor-root">
      <div className="bg-grid" />
      <Particles />
      <div style={{ position: "relative", zIndex: 1, paddingTop: 8 }}>
        {view === "landing" && (
          <div className="screen-fade">
            <LandingScreen onStart={() => setView("setup")} />
          </div>
        )}

        {view === "setup" && (
          <div className="screen-fade">
            <SetupScreen
              role={role}
              setRole={setRole}
              level={level}
              setLevel={setLevel}
              onBack={() => setView("landing")}
              onBegin={handleBegin}
              loading={false}
            />
          </div>
        )}

        {view === "loadingQ" && (
          <div className="screen-fade">
            <LoadingInterstitial messages={THINKING_MESSAGES} sub={`${role?.label} · ${level?.label}`} />
          </div>
        )}

        {view === "interview" && questions.length > 0 && (
          <div className="screen-fade">
            <InterviewScreen
              role={role}
              level={level}
              questions={questions}
              qIndex={qIndex}
              onSubmitAnswer={handleSubmitAnswer}
              isLastQuestion={qIndex === questions.length - 1}
            />
          </div>
        )}

        {view === "loadingF" && (
          <div className="screen-fade">
            <LoadingInterstitial messages={SCORING_MESSAGES} sub="Scoring your rehearsal" />
          </div>
        )}

        {view === "report" && feedback && (
          <div className="screen-fade">
            <ReportScreen role={role} level={level} feedback={feedback} transcript={transcript} onRestart={handleRestart} />
          </div>
        )}
      </div>
    </div>
  );
}
