const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth_middleware");
const {
  createRoadmap,
  getRoadmapBySession,
} = require("../controller/roadmap_controller");

router.get("/:sessionId", auth, getRoadmapBySession);
router.post("/:sessionId", auth, createRoadmap);

module.exports = router;
