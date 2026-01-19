import { createContext, useContext, useState } from "react";

const InterviewContext = createContext();

export const InterviewProvider = ({ children }) => {
  const [sessionId, setSessionId] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const startSession = (id, qs) => {
    setSessionId(id);
    setQuestions(qs);
    setCurrentIndex(0);
  };

  const nextQuestion = () => {
    setCurrentIndex((prev) => prev + 1);
  };

  return (
    <InterviewContext.Provider
      value={{
        sessionId,
        questions,
        currentIndex,
        startSession,
        nextQuestion
      }}
    >
      {children}
    </InterviewContext.Provider>
  );
};

export const useInterview = () => useContext(InterviewContext);
