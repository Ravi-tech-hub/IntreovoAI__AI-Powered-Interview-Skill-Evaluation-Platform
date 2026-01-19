const model = require("../../server/src/config/gemini");
const buildPrompt = require("../prompts/roadmapPrompt");

const extractJSON = (text) => {
  const match = text.match(/\{[\s\S]*\}/);
  if (!match) throw new Error("No JSON found in roadmap response");
  return match[0];
};

const normalizeRoadmap = (data) => {
  if (Array.isArray(data.weeks)) return data.weeks;
  if (data.roadmap && Array.isArray(data.roadmap.weeks))
    return data.roadmap.weeks;
  if (Array.isArray(data.plan)) return data.plan;
  return [];
};

const generateRoadmap = async ({ role, weaknesses }) => {
  try {
    const prompts = buildPrompt({ role, weaknesses });
    const result = await model.generateContent(prompts);
    const responseText = result.response.text();
    const jsonString = extractJSON(responseText);
    const parsed = JSON.parse(jsonString);
    return {
      weeks: normalizeRoadmap(parsed),
    };
  } catch (error) {
    console.error("Roadmap Generation Error:", error);
    throw new Error("Failed to generate learning roadmap");
  }
};
module.exports = generateRoadmap;
