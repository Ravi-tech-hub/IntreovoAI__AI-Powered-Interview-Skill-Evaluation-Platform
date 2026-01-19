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
