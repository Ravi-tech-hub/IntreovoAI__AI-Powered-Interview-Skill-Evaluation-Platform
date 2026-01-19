import api from "./api";

export const getOverview = () => {
  return api.get("/analytics/overview");
};
export const getScoreTrend = () => {
  return api.get("/analytics/score-trend");
};
export const getWeaknessesBreakdown = () => {
  return api.get("/analytics/weakness-breakdown");
};

export const getStrengthsBreakdown = () => {
  return api.get("/analytics/strenght-breakdown");
};
