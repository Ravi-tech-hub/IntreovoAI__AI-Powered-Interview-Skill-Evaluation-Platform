const interviewSession = require("../models/interview_model");
const AnswerEvaluation = require("../models/answer_model");
const mongoose = require("mongoose");

exports.getOverview = async (req, res) => {
  {
    try {
      const userId = new mongoose.Types.ObjectId(req.user.id);
      const totalInterview = await interviewSession.countDocuments({ userId });
      const score = await AnswerEvaluation.aggregate([
        {
          $lookup: {
            from: "interviewsessions",
            localField: "sessionId",
            foreignField: "_id",
            as: "session",
          },
        },
        { $unwind: "$session" },
        { $match: { "session.userId": userId } },
        {
          $group: {
            _id: null,
            avgScore: { $avg: "$score" },
          },
        },
      ]);
      res.json({
        totalInterview,
        averageScore: score[0]?.avgScore || 0,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to fetch overview analytics" });
    }
  }
};

exports.getScoreTrend = async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user.id);

    const trend = await AnswerEvaluation.aggregate([
      {
        $lookup: {
          from: "interviewsessions",
          localField: "sessionId",
          foreignField: "_id",
          as: "session",
        },
      },
      { $unwind: "$session" },
      { $match: { "session.userId": userId } },
      {
        $group: {
          _id: "$session._id",
          date: { $first: "$session.createdAt" },
          avgScore: { $avg: "$score" },
        },
      },
      { $sort: { date: 1 } },
    ]);

    res.json(trend);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch score trend" });
  }
};

exports.getWeaknessBreakdown = async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user.id);

    const breakdown = await AnswerEvaluation.aggregate([
      {
        $lookup: {
          from: "interviewsessions",
          localField: "sessionId",
          foreignField: "_id",
          as: "session",
        },
      },
      { $unwind: "$session" },
      { $match: { "session.userId": userId } },
      { $unwind: "$weaknesses" },
      {
        $group: {
          _id: "$weaknesses",
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
    ]);

    res.json(breakdown);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch weakness breakdown" });
  }
};

exports.getStrengthBreakdown = async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user.id);

    const breakdown = await AnswerEvaluation.aggregate([
      {
        $lookup: {
          from: "interviewsessions",
          localField: "sessionId",
          foreignField: "_id",
          as: "session",
        },
      },
      { $unwind: "$session" },
      { $match: { "session.userId": userId } },
      { $unwind: "$strengths" },
      {
        $group: {
          _id: "$strengths",
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
    ]);

    res.json(breakdown);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch strength breakdown" });
  }
};

exports.getSessionInsights = async (req, res) => {
  try {
    const userId = req.user.id;

    const sessions = await interviewSession
      .find({ userId })
      .select("_id role difficulty status createdAt")
      .sort({ createdAt: -1 })
      .lean();

    const sessionIds = sessions.map((session) => session._id);
    const evaluations = await AnswerEvaluation.find({
      sessionId: { $in: sessionIds },
    })
      .select("sessionId questionIndex score strengths weaknesses createdAt")
      .sort({ questionIndex: 1 })
      .lean();

    const evaluationsBySession = evaluations.reduce((acc, evaluation) => {
      const key = evaluation.sessionId.toString();
      if (!acc[key]) acc[key] = [];
      acc[key].push(evaluation);
      return acc;
    }, {});

    const countItems = (items) =>
      Object.entries(
        items.reduce((acc, item) => {
          if (!item) return acc;
          acc[item] = (acc[item] || 0) + 1;
          return acc;
        }, {})
      )
        .map(([label, count]) => ({ label, count }))
        .sort((a, b) => b.count - a.count);

    const insights = sessions.map((session) => {
      const sessionEvaluations = evaluationsBySession[session._id.toString()] || [];
      const scores = sessionEvaluations.map((evaluation) => evaluation.score || 0);
      const averageScore =
        scores.length > 0
          ? scores.reduce((sum, score) => sum + score, 0) / scores.length
          : 0;

      return {
        sessionId: session._id,
        role: session.role,
        difficulty: session.difficulty || "Mixed",
        status: session.status,
        createdAt: session.createdAt,
        answeredQuestions: sessionEvaluations.length,
        averageScore,
        strengths: countItems(
          sessionEvaluations.flatMap((evaluation) => evaluation.strengths || [])
        ),
        weaknesses: countItems(
          sessionEvaluations.flatMap((evaluation) => evaluation.weaknesses || [])
        ),
      };
    });

    res.json({ insights });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch session insights" });
  }
};
