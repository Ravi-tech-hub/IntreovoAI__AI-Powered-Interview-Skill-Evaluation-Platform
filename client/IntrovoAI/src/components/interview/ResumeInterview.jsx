import { useState } from "react";
import { startResumeinterview } from "../../services/interview_api";
import { useInterview } from "../../context/InterviewContext";

const ResumeInterview = () => {
  const [file, setFile] = useState(null);
  const { startSession } = useInterview();

  const handleStart = async () => {
    const formData = new FormData();
    formData.append("resume", file);

    const res = await startResumeinterview(formData);
    startSession(res.data.sessionId, res.data.questions);
  };

  return (
    <div className="bg-white p-6 rounded shadow max-w-md">
      <h2 className="text-xl font-bold mb-4">Resume-Based Interview</h2>

      <input
        type="file"
        accept=".pdf"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <button
        onClick={handleStart}
        disabled={!file}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
      >
        Start Interview
      </button>
    </div>
  );
};

export default ResumeInterview;
