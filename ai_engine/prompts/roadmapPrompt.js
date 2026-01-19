module.exports = ({ role, weaknesses }) =>
  `You are a senior technical mentor.
  A candidate is preparing for the role: ${role}
  
  They have the following weak areas:
  ${weaknesses.map((w) => `-${w}`).join("\n")}
  
Task:
Create a personalized 4-week learning roadmap to improve these weaknesses.

Rules:
- Be practical and realistic
- Focus on fundamentals + interview readiness
- Do NOT include explanations outside JSON
- Output ONLY valid JSON

JSON FORMAT:
{
  "weeks": [
    {
      "week": 1,
      "focus": "string",
      "topics": ["string"],
      "practice": ["string"]
    }
  ]
}
`;
