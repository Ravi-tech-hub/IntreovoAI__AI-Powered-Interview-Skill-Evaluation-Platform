import { useState } from "react";
import { submitAnswer } from "../../services/interview_api";
import { useInterview } from "../../context/InterviewContext";
import Feedback from "./Feedback";
import VoiceRecorder from "./VoiceRecoder";

const AnswerBox = ({ questionIndex }) => {
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { sessionId, nextQuestion } = useInterview();

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await submitAnswer(sessionId, {
        questionIndex,
        answerText: answer,
      });

      console.log("FRONTEND API RESPONSE:", res.data);
      setFeedback(res.data.evaluation);
    } catch (err) {
      console.error("Submit Answer Error:", err);
      setError("Failed to evaluate answer");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-3">
      <textarea
        rows={5}
        className="w-full border p-2"
        placeholder="Type your answer..."
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
      />

      <VoiceRecorder onResult={(text) => setAnswer(text)} />
      <button
        onClick={handleSubmit}
        className="bg-green-600 text-white px-4 py-2 rounded"
        disabled={loading || !answer.trim()}
      >
        {loading ? "Evaluating..." : "Submit Answer"}
      </button>

      {error && <p className="text-red-500">{error}</p>}
      {feedback && (
        <>
          <Feedback feedback={feedback} />

          <button
            onClick={() => {
              setFeedback(null);
              setAnswer("");
              nextQuestion();
            }}
            className="bg-blue-500 text-white px-3 py-1 rounded"
          >
            Next Question
          </button>
        </>
      )}
    </div>
  );
};

export default AnswerBox;
