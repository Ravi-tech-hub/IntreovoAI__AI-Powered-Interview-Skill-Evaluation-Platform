const express = require("express");
const cors = require("cors");
const app = express();

const allowedOrigin = process.env.CORS_ORIGIN || "http://localhost:5173";

app.use(express.json({ limit: "1mb" }));
app.use(
  cors({
    origin: allowedOrigin,
    credentials: true,
  })
);

app.use("/api/auth", require("./routes/auth_routes"));
app.use("/api/interview/", require("./routes/interview_route"));
app.use("/api/roadmap", require("./routes/roadmap_route"));
app.use("/api/analytics", require("./routes/analytics_route"));

app.use((err, req, res, next) => {
  if (err.message === "Only PDF resumes are allowed") {
    return res.status(400).json({ message: err.message });
  }

  if (err.code === "LIMIT_FILE_SIZE") {
    return res.status(400).json({ message: "Resume file is too large" });
  }

  console.error(err);
  return res.status(500).json({ message: "Server Error" });
});

module.exports = app;
