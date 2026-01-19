const gemini = require("../../server/src/config/gemini");
const buildPrompt = require("../prompts/interviewPrompt");

const generateQuestion = async ({ role, difficulty }) => {
  try {
    const prompt = buildPrompt({ role, difficulty });
    const result = await gemini.generateContent(prompt);
    const response = result.response.text();
    const jsonString = response
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const parsed = JSON.parse(jsonString);
    return parsed.questions;
  } catch (err) {
    console.error("Gemini Question Generation Error:", err);
    throw new Error("Failed to generate interview questions");
  }
};
module.exports = generateQuestion;
