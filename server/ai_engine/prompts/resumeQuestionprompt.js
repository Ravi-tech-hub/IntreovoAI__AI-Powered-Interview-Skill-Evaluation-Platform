module.exports = ({ resumeText }) => `
You are an expert technical interviewer.

Given the following resume text, do the following:
1. Identify key skills, projects, and experience
2. Generate 8–10 technical + behavioral interview questions
3. Questions must be specific to the resume

Resume:
"""
${resumeText}
"""

Return ONLY valid JSON in this format:
{
  "skills": ["React", "Node.js"],
  "questions": [
    {
      "questionText": "Explain your role in the XYZ project",
      "difficulty": "Medium"
    }
  ]
}
`;
