const model = require("../../src/config/gemini");
const buildPrompt = require("../prompts/evaluationPrompt");

const extractJSON = (text) => {
  const cleaned = text.replace(/```json/gi, "").replace(/```/g, "").trim();
  const start = cleaned.indexOf("{");
  const end = cleaned.lastIndexOf("}");

  if (start === -1 || end === -1) {
    throw new Error("No JSON found in Gemini response");
  }

  return cleaned.substring(start, end + 1);
};

const evaluateAnswer = async ({ question, answer }) => {
  try {
    const prompt = buildPrompt({ question, answer });
    const result = await model.generateContent(prompt);
    const jsonString = extractJSON(result.response.text());
    return JSON.parse(jsonString);
  } catch (error) {
    console.error("Gemini Evaluation Error:", error);
    throw new Error("Answer evaluation failed");
  }
};

module.exports = evaluateAnswer;
