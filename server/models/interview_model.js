const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  questionText: {
    type: String,
    required: true,
  },
  topic: String,
  difficulty: {
    type: String,
    enum: ["Easy", "Medium", "Hard"],
    default: "Medium",
  },
});

const interviewSessionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    role: {
      type: String,
      required: true,
    },

    topics: String,
    questionCount: Number,
    difficulty: String,
    instructions: String,
    status: {
      type: String,
      enum: ["in-progress", "completed"],
      default: "in-progress",
    },

    questions: {
      type: [questionSchema],
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("InterviewSession", interviewSessionSchema);
