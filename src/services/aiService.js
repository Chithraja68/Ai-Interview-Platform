import { QUESTION_BANK, GENERIC_QUESTIONS } from "../data/questionBank.js";
import { STRENGTHS_POOL, IMPROVEMENTS_POOL, SUMMARY_TEMPLATES } from "../data/feedbackBank.js";

/* ============================================================
   AI SERVICE
   ------------------------------------------------------------
   By default this runs fully offline — no API key, no backend —
   so the app works the moment you run `npm install && npm run dev`.
   Questions are pulled from curated pools and feedback is scored
   with a lightweight heuristic, so every run still feels live.

   TO WIRE UP REAL, LIVE AI-GENERATED QUESTIONS & FEEDBACK:
   1. Run the small Express proxy in /server (see server/index.js).
      It holds your Anthropic API key server-side — never call
      api.anthropic.com directly from the browser, that exposes
      your key to anyone who opens devtools.
   2. Create a .env file in the project root:
        VITE_API_BASE_URL=http://localhost:8787
   3. Flip USE_LIVE_AI to true below.
   That's the entire swap — generateQuestions/generateFeedback
   keep the same signature either way, so no component changes.
   ============================================================ */

const USE_LIVE_AI = false;
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8787";

function pickRandom(arr, n) {
  const copy = [...arr];
  const out = [];
  while (out.length < n && copy.length) {
    const i = Math.floor(Math.random() * copy.length);
    out.push(copy.splice(i, 1)[0]);
  }
  return out;
}

async function callBackend(path, body) {
  try {
    const res = await fetch(`${API_BASE_URL}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error("Backend returned an error");
    return await res.json();
  } catch (e) {
    console.warn("Live AI call failed, falling back to offline mode:", e.message);
    return null;
  }
}

/* ---------------- Questions ---------------- */

function offlineQuestions(role, level) {
  const rolePool = QUESTION_BANK[role.id] || [];
  const picked = pickRandom(rolePool, 3);
  const generic = pickRandom(GENERIC_QUESTIONS, 2).map((q) =>
    q.replace(/\{role\}/g, role.label.toLowerCase())
  );
  return [...picked, ...generic];
}

export async function generateQuestions(role, level) {
  if (USE_LIVE_AI) {
    const data = await callBackend("/api/questions", { role: role.label, level: level.label });
    if (data && Array.isArray(data.questions) && data.questions.length) {
      return data.questions.slice(0, 5);
    }
  }
  // Small delay so the "Reading the room…" loading state feels intentional
  // rather than instant — remove freely if you'd rather it be immediate.
  await new Promise((r) => setTimeout(r, 900));
  return offlineQuestions(role, level);
}

/* ---------------- Feedback ---------------- */

function scoreFromAnswer(answer) {
  const wordCount = answer.trim().split(/\s+/).filter(Boolean).length;
  const lengthScore = Math.min(100, 35 + wordCount * 1.8);
  const hasStructureMarkers = /(first|because|result|so that|for example|specifically|then|ultimately)/i.test(
    answer
  );
  const structureBonus = hasStructureMarkers ? 10 : 0;
  const raw = lengthScore + structureBonus - 5 + Math.random() * 10;
  return Math.max(40, Math.min(97, Math.round(raw)));
}

function offlineFeedback(role, level, transcript) {
  const perAnswer = transcript.map((t) => scoreFromAnswer(t.answer));
  const avg = Math.round(perAnswer.reduce((a, b) => a + b, 0) / perAnswer.length);
  const jitter = () => Math.max(35, Math.min(98, avg + Math.round((Math.random() - 0.5) * 16)));

  const scores = {
    communication: jitter(),
    technicalDepth: jitter(),
    structure: jitter(),
    confidence: jitter(),
  };
  const overall = Math.round(
    (scores.communication + scores.technicalDepth + scores.structure + scores.confidence) / 4
  );

  const summary = pickRandom(SUMMARY_TEMPLATES, 1)[0]
    .replace(/\{role\}/g, role.label)
    .replace(/\{level\}/g, level.label.toLowerCase());

  return {
    scores,
    overall,
    strengths: pickRandom(STRENGTHS_POOL, 3),
    improvements: pickRandom(IMPROVEMENTS_POOL, 3),
    summary,
  };
}

export async function generateFeedback(role, level, transcript) {
  if (USE_LIVE_AI) {
    const data = await callBackend("/api/feedback", {
      role: role.label,
      level: level.label,
      transcript,
    });
    if (data && data.scores && typeof data.overall === "number") return data;
  }
  await new Promise((r) => setTimeout(r, 1100));
  return offlineFeedback(role, level, transcript);
}
