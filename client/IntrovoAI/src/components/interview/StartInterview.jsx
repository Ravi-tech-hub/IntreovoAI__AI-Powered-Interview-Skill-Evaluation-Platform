import { useState } from "react";
import { startInterview } from "../../services/interview_api";
import { useInterview } from "../../context/InterviewContext";

const StartInterview = () => {
  const [role, setRole] = useState("MERN");
  const [difficulty, setDifficulty] = useState("Medium");
  const { startSession } = useInterview();

  const handleStart = async () => {
    const res = await startInterview({ role, difficulty });
    startSession(res.data.sessionId, res.data.questions);
  };

  return (
    <div className="space-y-4">
      <select onChange={(e) => setRole(e.target.value)} className="border p-2">
        <option>MERN</option>
        <option>Frontend</option>
        <option>Backend</option>
        <option>DSA</option>
      </select>

      <select
        onChange={(e) => setDifficulty(e.target.value)}
        className="border p-2"
      >
        <option>Easy</option>
        <option>Medium</option>
        <option>Hard</option>
      </select>

      <button
        onClick={handleStart}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Start Interview
      </button>
    </div>
  );
};

export default StartInterview;
