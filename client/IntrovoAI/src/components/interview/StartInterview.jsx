import { useState } from "react";
import { startInterview } from "../../services/interview_api";
import { useInterview } from "../../context/InterviewContext";

const difficulties = ["Easy", "Medium", "Hard"];

const StartInterview = () => {
  const [role, setRole] = useState("MERN");
  const [difficulty, setDifficulty] = useState("Medium");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { startSession } = useInterview();

  const handleStart = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await startInterview({ role, difficulty });
      startSession(res.data.sessionId, res.data.questions);
    } catch (startError) {
      console.error("Failed to start interview", startError);
      setError("Could not generate questions. Check server and AI API setup.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-teal-700">
          Quick start
        </p>
        <h2 className="mt-1 text-xl font-bold text-slate-950">
          Role-based interview
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Best when you want a fast mock interview for a common placement role.
        </p>
      </div>

      <div className="mt-5 space-y-4">
        <label className="block">
          <span className="text-sm font-semibold text-slate-700">Role</span>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="mt-2 min-h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-slate-800 outline-none focus:border-teal-700 focus:ring-4 focus:ring-teal-100"
          >
            <option>MERN</option>
            <option>Frontend</option>
            <option>Backend</option>
            <option>DSA</option>
          </select>
        </label>

        <div>
          <p className="text-sm font-semibold text-slate-700">Difficulty</p>
          <div className="mt-2 grid grid-cols-3 gap-2 rounded-lg bg-slate-100 p-1">
            {difficulties.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setDifficulty(item)}
                className={[
                  "min-h-10 rounded-md text-sm font-semibold transition",
                  difficulty === item
                    ? "bg-white text-slate-950 shadow-sm"
                    : "text-slate-500 hover:text-slate-950",
                ].join(" ")}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {error && (
          <p className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm font-medium text-red-700">
            {error}
          </p>
        )}

        <button
          type="button"
          onClick={handleStart}
          disabled={loading}
          className="min-h-11 w-full rounded-lg bg-slate-950 px-4 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          {loading ? "Generating questions..." : "Start role interview"}
        </button>
      </div>
    </section>
  );
};

export default StartInterview;
