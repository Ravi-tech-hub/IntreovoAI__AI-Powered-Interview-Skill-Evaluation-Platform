import { useState } from "react";
import { completeInterview, submitAnswer } from "../../services/interview_api";
import { useInterview } from "../../context/InterviewContext";
import Feedback from "./Feedback";
import VoiceRecorder from "./VoiceRecoder";

const AnswerBox = ({ questionIndex, totalQuestions }) => {
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { sessionId, nextQuestion } = useInterview();
  const isLastQuestion = questionIndex + 1 >= totalQuestions;

  const handleSubmit = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await submitAnswer(sessionId, {
        questionIndex,
        answerText: answer,
      });

      setFeedback(res.data.evaluation);
    } catch (submitError) {
      console.error("Submit Answer Error:", submitError);
      setError(
        submitError.response?.data?.message || "Failed to evaluate answer."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleNext = async () => {
    setFeedback(null);
    setAnswer("");

    if (isLastQuestion) {
      try {
        await completeInterview(sessionId);
      } catch (completeError) {
        console.error("Failed to complete interview", completeError);
      }
    }

    nextQuestion();
  };

  return (
    <div className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(320px,0.8fr)]">
      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col justify-between gap-3 border-b border-slate-200 pb-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-teal-700">
              Candidate answer
            </p>
            <h2 className="mt-1 text-xl font-bold text-slate-950">
              Write or speak your response
            </h2>
          </div>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold uppercase tracking-wide text-slate-600">
            {answer.trim().split(/\s+/).filter(Boolean).length} words
          </span>
        </div>

        <textarea
          rows={10}
          className="mt-5 w-full rounded-lg border border-slate-200 bg-white p-4 leading-6 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-teal-700 focus:ring-4 focus:ring-teal-100"
          placeholder="Type your answer with examples, tradeoffs, and a clean conclusion..."
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />

        {error && (
          <p className="mt-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm font-medium text-red-700">
            {error}
          </p>
        )}

        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
          <VoiceRecorder onResult={(text) => setAnswer(text)} />
          <button
            type="button"
            onClick={handleSubmit}
            className="min-h-11 rounded-lg bg-slate-950 px-4 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-300"
            disabled={loading || !answer.trim()}
          >
            {loading ? "Evaluating answer..." : "Evaluate answer"}
          </button>
        </div>
      </section>

      <div className="space-y-5">
        {feedback ? (
          <>
            <Feedback feedback={feedback} />
            <button
              type="button"
              onClick={handleNext}
              className="min-h-11 w-full rounded-lg bg-teal-700 px-4 text-sm font-semibold text-white transition hover:bg-teal-800"
            >
              {isLastQuestion ? "Finish interview" : "Next question"}
            </button>
          </>
        ) : (
          <section className="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-6 text-center">
            <p className="text-sm font-semibold text-slate-700">
              Feedback will appear here
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              Submit your answer to see score, strengths, weaknesses, and an
              improved answer.
            </p>
          </section>
        )}
      </div>
    </div>
  );
};

export default AnswerBox;
