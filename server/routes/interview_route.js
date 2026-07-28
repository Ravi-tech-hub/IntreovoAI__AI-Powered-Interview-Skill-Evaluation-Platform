const express = require("express");
const route = express.Router();
const {
  startInterview,
  getInterview,
  submitAnswer,
  completeInterview,
  getMyInterviewSessions,
  startResumeInterview,
  startCustomInterview,
} = require("../controller/interviewController");
const multer = require("multer");
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: (Number(process.env.MAX_RESUME_FILE_SIZE_MB) || 5) * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== "application/pdf") {
      return cb(new Error("Only PDF resumes are allowed"));
    }
    cb(null, true);
  },
});

const auth = require("../middleware/auth_middleware");
route.post("/start", auth, startInterview);
route.post("/resume", auth, upload.single("resume"), startResumeInterview);
route.post("/custom", auth, startCustomInterview);
route.get("/my-sessions", auth, getMyInterviewSessions);
route.get("/:id", auth, getInterview);
route.post("/:id/answer", auth, submitAnswer);
route.post("/:id/complete", auth, completeInterview);

module.exports = route;
