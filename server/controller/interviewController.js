const InterviewSession = require("../models/interview_model");
const AnswerEvaluation = require("../models/answer_model");
const generateQuestion = require("../ai_engine/services/questionGenerator");
const evaluateAnswer = require("../ai_engine/services/answerEvaluation");
const customPrompt = require("../ai_engine/prompts/customInterviewPrompt");
const extractTextFromPdf = require("../ai_engine/services/resume_parse");
const model = require("../src/config/gemini");
const resumePrompt = require("../ai_engine/prompts/resumeQuestionprompt");

const extractJson = (text) => {
  const cleaned = text.replace(/```json/gi, "").replace(/```/g, "").trim();
  const start = cleaned.indexOf("{");
  const end = cleaned.lastIndexOf("}");

  if (start === -1 || end === -1) {
    throw new Error("Invalid AI JSON format");
  }

  return JSON.parse(cleaned.substring(start, end + 1));
};

const ownsSession = (session, userId) => session.userId.toString() === userId;

exports.startInterview = async (req, res) => {
  try {
    const { role, difficulty } = req.body;
    const userId = req.user.id;

    if (!role || !difficulty) {
      return res.status(400).json({ message: "Role and difficulty are required" });
    }

    const aiQuestions = await generateQuestion({ role, difficulty });

    if (!Array.isArray(aiQuestions) || aiQuestions.length === 0) {
      return res
        .status(500)
        .json({ message: "AI failed to generate questions" });
    }

    const questions = aiQuestions.map((q) => ({
      questionText: q.questionText || q.question || q.text,
      difficulty: q.difficulty || difficulty,
    }));

    const session = await InterviewSession.create({
      userId,
      role,
      difficulty,
      questions,
    });

    res.status(201).json({
      sessionId: session._id,
      questions: session.questions,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to start interview" });
  }
};
exports.getInterview = async (req, res) => {
  try {
    const session = await InterviewSession.findById(req.params.id);
    if (!session) {
      return res.status(404).json({ message: "Interview session not found" });
    }

    if (!ownsSession(session, req.user.id)) {
      return res.status(403).json({ message: "Access denied" });
    }

    res.json({
      session,
      questions: session.questions,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch interview" });
  }
};

exports.submitAnswer = async (req, res) => {
  try {
    const { questionIndex, answerText } = req.body;
    const sessionId = req.params.id;

    const session = await InterviewSession.findById(sessionId);
    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    if (!ownsSession(session, req.user.id)) {
      return res.status(403).json({ message: "Access denied" });
    }

    if (!Number.isInteger(questionIndex) || !answerText?.trim()) {
      return res.status(400).json({ message: "Question index and answer are required" });
    }

    const question = session.questions[questionIndex];
    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    const aiFeedback = await evaluateAnswer({
      question: question.questionText,
      answer: answerText,
    });

    await AnswerEvaluation.create({
      sessionId,
      questionIndex,
      questionText: question.questionText,
      answerText,
      score: aiFeedback.score,
      strengths: aiFeedback.strengths,
      weaknesses: aiFeedback.weaknesses,
      improvedAnswer: aiFeedback.improvedAnswer,
    });

    res.json({
      message: "Answer Evaluated Successfully",
      evaluation: aiFeedback,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Answer submission failed" });
  }
};
exports.completeInterview = async (req, res) => {
  try {
    const session = await InterviewSession.findById(req.params.id);

    if (!session) {
      return res.status(404).json({ message: "Interview session not found" });
    }

    if (!ownsSession(session, req.user.id)) {
      return res.status(403).json({ message: "Access denied" });
    }

    session.status = "completed";
    await session.save();

    res.json({ message: "Interview completed" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to complete interview" });
  }
};
exports.getMyInterviewSessions = async (req, res) => {
  try {
    const userId = req.user.id;

    const sessions = await InterviewSession.find({ userId })
      .select("_id role difficulty status createdAt")
      .sort({ createdAt: -1 });

    res.json({ sessions });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch interview sessions" });
  }
};
exports.startResumeInterview = async (req, res) => {
  try {
    const userId = req.user.id;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: "Resume file required" });
    }

    const resumeText = await extractTextFromPdf(file.buffer);
    const prompt = resumePrompt({ resumeText });

    const result = await model.generateContent(prompt);
    const rawText = result.response.text();
    const data = extractJson(rawText);

    if (!Array.isArray(data.questions) || data.questions.length === 0) {
      return res
        .status(500)
        .json({ message: "AI failed to generate questions" });
    }

    const questions = data.questions.map((q) => ({
      questionText: q.questionText || q.question || q.text,
      difficulty: q.difficulty || "Medium",
    }));

    const session = await InterviewSession.create({
      userId,
      role: "Resume-based",
      questions,
    });

    res.status(201).json({
      sessionId: session._id,
      skills: data.skills || [],
      questions: session.questions,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Resume interview failed" });
  }
};
exports.startCustomInterview = async (req, res) => {
  try {
    const userId = req.user.id;
    const { domain, topics, questionCount, difficulty, instructions } =
      req.body;

    const parsedQuestionCount = Number(questionCount);

    if (
      !domain ||
      !topics ||
      !Number.isInteger(parsedQuestionCount) ||
      parsedQuestionCount < 1 ||
      parsedQuestionCount > 20
    ) {
      return res.status(400).json({ message: "Invalid input" });
    }

    const prompt = customPrompt({
      domain,
      topics,
      questionCount: parsedQuestionCount,
      difficulty,
      instructions,
    });

    const result = await model.generateContent(prompt);
    const data = extractJson(result.response.text());

    if (!Array.isArray(data.questions) || data.questions.length === 0) {
      return res
        .status(500)
        .json({ message: "AI failed to generate questions" });
    }

    const questions = data.questions.map((q) => ({
      questionText: q.questionText || q.question || q.text,
      difficulty: q.difficulty || difficulty,
    }));

    const session = await InterviewSession.create({
      userId,
      role: domain,
      topics,
      questionCount: parsedQuestionCount,
      difficulty,
      instructions,
      questions,
    });

    res.status(201).json({
      sessionId: session._id,
      questions: session.questions,
    });
  } catch (error) {
    console.error("Interview Error:", error.message);
    res.status(500).json({ message: "Custom interview failed" });
  }
};
