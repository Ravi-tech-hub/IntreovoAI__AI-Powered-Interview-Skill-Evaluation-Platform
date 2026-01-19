const express = require("express");
const route = express.Router();
const auth = require("../middleware/auth_middleware");
const analyticalContoller = require("../controller/anaytics_controller");

route.get("/overview", auth, analyticalContoller.getOverview);
route.get("/score-trend", auth, analyticalContoller.getScoreTrend);
route.get(
  "/weakness-breakdown",
  auth,
  analyticalContoller.getWeaknessBreakdown
);
route.get(
  "/strenght-breakdown",
  auth,
  analyticalContoller.getStrengthBreakdown
);

module.exports = route;
