const model = require("../../server/src/config/gemini");
const buildPrompt = require("../prompts/evaluationPrompt");

const extractJSON = (text) => {
  const match = text.match(/\{[\s\S]*\}/);
  if (!match) throw new Error("No JSON found in Gemini response");
  return match[0];
};

const evaluateAnswer = async ({ question, answer }) => {
  try {
    const prompt = buildPrompt({ question, answer });

    // ✅ v0.24.x expects STRING prompt
    const result = await model.generateContent(prompt);

    // ✅ THIS WORKS in v0.24.x
    const responseText = result.response.text();

    console.log("Gemini Raw Response:\n", responseText);

    const jsonString = extractJSON(responseText);
    return JSON.parse(jsonString);
  } catch (error) {
    console.error("Gemini Evaluation Error:", error);
    throw new Error("Answer evaluation failed");
  }
};

module.exports = evaluateAnswer;
