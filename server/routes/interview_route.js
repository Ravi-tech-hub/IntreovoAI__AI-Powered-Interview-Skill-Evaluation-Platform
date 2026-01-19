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
const upload = multer();

const auth = require("../middleware/auth_middleware");
route.post("/start", auth, startInterview);
route.get("/my-sessions", auth, getMyInterviewSessions);
route.get("/:id", auth, getInterview);
route.post("/:id/answer", auth, submitAnswer);
route.post("/:id/complete", auth, completeInterview);
route.post("/resume", auth, upload.single("resume"), startResumeInterview);
route.post("/custom", auth, startCustomInterview);

module.exports = route;
