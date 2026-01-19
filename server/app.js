const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/auth", require("./routes/auth_routes"));
app.use("/api/interview/", require("./routes/interview_route"));
app.use("/api/roadmap", require("./routes/roadmap_route"));
app.use("/api/analytics", require("./routes/analytics_route"));
module.exports = app;
