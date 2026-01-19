const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth_middleware");
const { createRoadmap } = require("../controller/roadmap_controller");

router.post("/:sessionId", auth, createRoadmap);

module.exports = router;
