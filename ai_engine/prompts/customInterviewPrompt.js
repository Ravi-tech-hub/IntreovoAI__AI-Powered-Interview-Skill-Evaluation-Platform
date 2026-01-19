module.exports = ({
  domain,
  topics,
  questionCount,
  difficulty,
  instructions,
}) => `
You are an expert interviewer across all professional domains.

Interview configuration:
Domain: ${domain}
Topics: ${topics}
Difficulty: ${difficulty}
Number of questions: ${questionCount}
Special instructions: ${instructions || "None"}

Generate exactly ${questionCount} interview questions.

Return ONLY valid JSON:
{
  "questions": [
    {
      "questionText": "Question text",
      "difficulty": "${difficulty}"
    }
  ]
}
`;
