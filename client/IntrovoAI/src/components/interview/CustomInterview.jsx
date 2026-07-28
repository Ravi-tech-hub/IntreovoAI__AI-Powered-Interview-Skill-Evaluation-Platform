import { useState } from "react";
import { DOMAIN_TOPICS } from "../../constant/InterviewConfig";
import api from "../../services/api";
import { useInterview } from "../../context/InterviewContext";

const difficulties = ["Easy", "Medium", "Hard"];

const CustomInterview = () => {
  const { startSession } = useInterview();

  const [domain, setDomain] = useState("");
  const [customDomain, setCustomDomain] = useState("");
  const [topics, setTopics] = useState([]);
  const [customTopics, setCustomTopics] = useState("");
  const [questionCount, setQuestionCount] = useState(5);
  const [difficulty, setDifficulty] = useState("Medium");
  const [instructions, setInstructions] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isOther = domain === "Other";
  const selectedDomain = isOther ? customDomain.trim() : domain;
  const selectedTopics = isOther ? customTopics.trim() : topics.join(", ");
  const canStart = selectedDomain && selectedTopics && questionCount > 0;

  const toggleTopic = (topic) => {
    setTopics((prev) =>
      prev.includes(topic) ? prev.filter((item) => item !== topic) : [...prev, topic]
    );
  };

  const handleStart = async () => {
    if (!canStart) {
      setError("Select a domain and at least one topic before starting.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const payload = {
        domain: selectedDomain,
        topics: selectedTopics,
        questionCount: Number(questionCount),
        difficulty,
        instructions,
      };

      const res = await api.post("/interview/custom", payload);
      startSession(res.data.sessionId, res.data.questions);
    } catch (startError) {
      console.error("Custom interview failed", startError);
      setError(
        startError.response?.data?.message ||
          "Could not generate custom interview questions."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col justify-between gap-3 border-b border-slate-200 pb-5 lg:flex-row lg:items-start">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-teal-700">
            Custom mode
          </p>
          <h2 className="mt-1 text-2xl font-bold text-slate-950">
            Design a focused interview
          </h2>
          <p className="mt-1 max-w-2xl text-sm text-slate-500">
            Choose a domain, topic set, difficulty, and question count for the
            exact preparation session you need.
          </p>
        </div>
        <span className="rounded-full bg-teal-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-teal-700">
          Flexible
        </span>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-2">
        <label className="block">
          <span className="text-sm font-semibold text-slate-700">Domain</span>
          <select
            className="mt-2 min-h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-slate-800 outline-none focus:border-teal-700 focus:ring-4 focus:ring-teal-100"
            value={domain}
            onChange={(e) => {
              setDomain(e.target.value);
              setTopics([]);
              setError("");
            }}
          >
            <option value="">Select domain</option>
            {Object.keys(DOMAIN_TOPICS).map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
            <option value="Other">Other</option>
          </select>
        </label>

        {isOther ? (
          <label className="block">
            <span className="text-sm font-semibold text-slate-700">
              Custom domain
            </span>
            <input
              value={customDomain}
              placeholder="Example: DevOps, Data Analytics"
              className="mt-2 min-h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-slate-800 outline-none focus:border-teal-700 focus:ring-4 focus:ring-teal-100"
              onChange={(e) => setCustomDomain(e.target.value)}
            />
          </label>
        ) : (
          <label className="block">
            <span className="text-sm font-semibold text-slate-700">
              Question count
            </span>
            <input
              type="number"
              min={1}
              max={20}
              value={questionCount}
              onChange={(e) => setQuestionCount(e.target.value)}
              className="mt-2 min-h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-slate-800 outline-none focus:border-teal-700 focus:ring-4 focus:ring-teal-100"
            />
          </label>
        )}
      </div>

      <div className="mt-5">
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

      {!isOther && domain && (
        <div className="mt-5">
          <p className="text-sm font-semibold text-slate-700">Topics</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {DOMAIN_TOPICS[domain].map((topic) => (
              <button
                key={topic}
                type="button"
                onClick={() => toggleTopic(topic)}
                className={[
                  "rounded-full border px-3 py-2 text-sm font-semibold transition",
                  topics.includes(topic)
                    ? "border-teal-200 bg-teal-50 text-teal-700"
                    : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:text-slate-950",
                ].join(" ")}
              >
                {topic}
              </button>
            ))}
          </div>
        </div>
      )}

      {isOther && (
        <label className="mt-5 block">
          <span className="text-sm font-semibold text-slate-700">
            Topics to cover
          </span>
          <textarea
            value={customTopics}
            placeholder="Example: Docker, CI/CD, Kubernetes basics"
            className="mt-2 min-h-24 w-full rounded-lg border border-slate-200 bg-white px-3 py-3 text-slate-800 outline-none focus:border-teal-700 focus:ring-4 focus:ring-teal-100"
            onChange={(e) => setCustomTopics(e.target.value)}
          />
        </label>
      )}

      {isOther && (
        <label className="mt-5 block">
          <span className="text-sm font-semibold text-slate-700">
            Question count
          </span>
          <input
            type="number"
            min={1}
            max={20}
            value={questionCount}
            onChange={(e) => setQuestionCount(e.target.value)}
            className="mt-2 min-h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-slate-800 outline-none focus:border-teal-700 focus:ring-4 focus:ring-teal-100"
          />
        </label>
      )}

      <label className="mt-5 block">
        <span className="text-sm font-semibold text-slate-700">
          Special instructions
        </span>
        <textarea
          value={instructions}
          placeholder="Example: Ask project-oriented questions and include one debugging scenario."
          className="mt-2 min-h-28 w-full rounded-lg border border-slate-200 bg-white px-3 py-3 text-slate-800 outline-none focus:border-teal-700 focus:ring-4 focus:ring-teal-100"
          onChange={(e) => setInstructions(e.target.value)}
        />
      </label>

      {error && (
        <p className="mt-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm font-medium text-red-700">
          {error}
        </p>
      )}

      <button
        type="button"
        onClick={handleStart}
        disabled={loading}
        className="mt-5 min-h-11 w-full rounded-lg bg-slate-950 px-4 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-300"
      >
        {loading ? "Generating custom interview..." : "Start custom interview"}
      </button>
    </section>
  );
};

export default CustomInterview;
