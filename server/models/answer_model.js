const mongoose = require("mongoose");

const answerEvaluationSchema = new mongoose.Schema(
  {
    sessionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "InterviewSession",
      required: true,
    },

    questionIndex: {
      type: Number,
      required: true,
    },

    questionText: {
      type: String,
      required: true,
    },

    answerText: {
      type: String,
      required: true,
    },

    score: {
      type: Number,
      required: true,
    },

    strengths: [String],
    weaknesses: [String],

    improvedAnswer: String,
  },
  { timestamps: true },
);

module.exports = mongoose.model("AnswerEvaluation", answerEvaluationSchema);
