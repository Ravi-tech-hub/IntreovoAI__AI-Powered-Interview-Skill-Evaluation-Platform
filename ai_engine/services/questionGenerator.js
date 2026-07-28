const gemini = require("../../server/src/config/gemini");
const buildPrompt = require("../prompts/interviewPrompt");

const extractJSON = (text) => {
  const cleaned = text.replace(/```json/gi, "").replace(/```/g, "").trim();
  const start = cleaned.indexOf("{");
  const end = cleaned.lastIndexOf("}");

  if (start === -1 || end === -1) {
    throw new Error("No JSON found in Gemini response");
  }

  return cleaned.substring(start, end + 1);
};

const generateQuestion = async ({ role, difficulty }) => {
  try {
    const prompt = buildPrompt({ role, difficulty });
    const result = await gemini.generateContent(prompt);
    const response = result.response.text();
    const parsed = JSON.parse(extractJSON(response));
    return parsed.questions;
  } catch (err) {
    console.error("Gemini Question Generation Error:", err);
    throw new Error("Failed to generate interview questions");
  }
};
module.exports = generateQuestion;
