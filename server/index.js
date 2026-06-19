// Minimal proxy so the React app can request live, Claude-generated
// interview questions & feedback without exposing your Anthropic API
// key in the browser.
//
// SETUP:
//   npm install express cors dotenv @anthropic-ai/sdk
//   echo "ANTHROPIC_API_KEY=sk-ant-..." > .env
//   node server/index.js
//
// Then in the React app:
//   1. create a .env file in the project root with:
//        VITE_API_BASE_URL=http://localhost:8787
//   2. in src/services/aiService.js, set USE_LIVE_AI = true

import "dotenv/config";
import express from "express";
import cors from "cors";
import Anthropic from "@anthropic-ai/sdk";

const app = express();
app.use(cors());
app.use(express.json());

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

function parseJSON(text, fallback) {
  try {
    return JSON.parse(text.replace(/```json|```/g, "").trim());
  } catch {
    return fallback;
  }
}

app.post("/api/questions", async (req, res) => {
  try {
    const { role, level } = req.body;
    const msg = await anthropic.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 1000,
      system: "You are an expert interviewer. Respond with ONLY valid JSON, no markdown fences, no preamble.",
      messages: [
        {
          role: "user",
          content: `Generate exactly 5 mock interview questions for a ${level}-level ${role} candidate. Mix behavioral and role-specific questions appropriate to that level. Return strictly this JSON shape: {"questions": ["...","...","...","...","..."]}`,
        },
      ],
    });
    const text = msg.content.map((b) => b.text || "").join("\n");
    res.json(parseJSON(text, { questions: [] }));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to generate questions" });
  }
});

app.post("/api/feedback", async (req, res) => {
  try {
    const { role, level, transcript } = req.body;
    const qa = transcript.map((t, i) => `Q${i + 1}: ${t.question}\nA${i + 1}: ${t.answer}`).join("\n\n");
    const msg = await anthropic.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 1000,
      system: "You are a precise, encouraging interview coach. Respond with ONLY valid JSON, no markdown fences.",
      messages: [
        {
          role: "user",
          content: `Evaluate this mock interview for a ${level}-level ${role} candidate.\n\n${qa}\n\nReturn strictly this JSON shape, all scores 0-100 integers: {"scores": {"communication": 0, "technicalDepth": 0, "structure": 0, "confidence": 0}, "overall": 0, "strengths": ["...","...","..."], "improvements": ["...","...","..."], "summary": "2-3 sentence summary"}`,
        },
      ],
    });
    const text = msg.content.map((b) => b.text || "").join("\n");
    res.json(parseJSON(text, null));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to generate feedback" });
  }
});

const PORT = 8787;
app.listen(PORT, () => console.log(`AI proxy running on http://localhost:${PORT}`));
