module.exports = ({ question, answer }) => `
You are a strict technical interviewer.

Evaluate the candidate answer.

Question:
"${question}"

Candidate Answer:
"${answer}"

Rules:
- Respond ONLY with valid JSON
- No markdown
- No explanations outside JSON

JSON FORMAT:
{
  "score": 0-10,
  "confidenceScore": 0-10,
  "strengths": ["string"],
  "weaknesses": ["string"],
  "improvedAnswer": "string"
}
`;
