import api from "./api";

export const getRoadmapBySession = (sessionId) =>
  api.get(`/roadmap/${sessionId}`);

export const createRoadmapBySession = (sessionId) =>
  api.post(`/roadmap/${sessionId}`);
