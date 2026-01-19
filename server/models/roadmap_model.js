const mongoose = require("mongoose");

const roadmapSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    sessionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "InterviewSession",
      required: true,
    },
    role: { type: String, required: true },
    weeks: [
      { week: Number, focus: String, topics: [String], practice: [String] },
    ],
  },
  { timestamps: true }
);
module.exports=mongoose.model("Roadmap",roadmapSchema);
