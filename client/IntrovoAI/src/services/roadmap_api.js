import api from "./api";

export const getRoadmapBySession = (sessionId) =>
  api.get(`/roadmap/${sessionId}`);
