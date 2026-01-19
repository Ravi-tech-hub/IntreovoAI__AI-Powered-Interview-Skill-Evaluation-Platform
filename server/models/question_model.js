
const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
    sessionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "InterviewSession",
      required: true,
    },

    questionText: {
      type: String,
      required: true,
    },

    topic: {
      type: String,
    },

    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Question", questionSchema);
