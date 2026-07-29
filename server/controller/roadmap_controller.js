const answerEvaluation = require("../models/answer_model");
const InterviewSession = require("../models/interview_model");
const Roadmap = require("../models/roadmap_model");
const generateRoadmap = require("../ai_engine/services/roadmapGenerator");

exports.createRoadmap = async (req, res) => {
  try {
    const sessionId = req.params.sessionId;
    const userId = req.user.id;
    const session = await InterviewSession.findById(sessionId);
    if (!session) {
      return res.status(404).json({ message: "Interview session not found" });
    }

    if (session.userId.toString() !== userId) {
      return res.status(403).json({ message: "Access denied" });
    }

    const evaluation = await answerEvaluation.find({ sessionId });
    const weaknesses = [...new Set(evaluation.flatMap((e) => e.weaknesses))];

    if (weaknesses.length === 0) {
      return res.status(400).json({
        message: "No weaknesses found to generate roadmap",
      });
    }

    const roadmapdata = await generateRoadmap({
      role: session.role,
      weaknesses,
    });

    const roadmap = await Roadmap.create({
      userId,
      sessionId,
      role: session.role,
      weeks: roadmapdata.weeks,
    });

    res.status(201).json({
      message: "Personalized roadmap generated",
      roadmap,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to generate roadmap" });
  }
};

exports.getRoadmapBySession = async (req, res) => {
  try {
    const sessionId = req.params.sessionId;
    const userId = req.user.id;

    const roadmap = await Roadmap.findOne({ sessionId, userId }).sort({
      createdAt: -1,
    });

    if (!roadmap) {
      return res.status(404).json({ message: "Roadmap not found" });
    }

    res.json({ roadmap });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch roadmap" });
  }
};
