import api from "./api";
export const startInterview = (data) => {
  return api.post("/interview/start", data);
};
export const submitAnswer = (sessionId, data) => {
  return api.post(`/interview/${sessionId}/answer`, data);
};
export const completeInterview = (sessionId) => {
  return api.post(`/interview/${sessionId}/complete`);
};

export const getMyInterviewSessions = () => {
  return api.get("/interview/my-sessions");
};
export const startResumeinterview = (formdata) => {
  return api.post("/interview/resume", formdata, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};
