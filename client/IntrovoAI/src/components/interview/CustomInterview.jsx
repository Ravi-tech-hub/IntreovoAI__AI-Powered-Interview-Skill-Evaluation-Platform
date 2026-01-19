import { useState } from "react";
import { DOMAIN_TOPICS } from "../../constant/InterviewConfig";
import api from "../../services/api";
import { useInterview } from "../../context/InterviewContext";

const CustomInterview = () => {
  const { startSession } = useInterview();

  const [domain, setDomain] = useState("");
  const [customDomain, setCustomDomain] = useState("");
  const [topics, setTopics] = useState([]);
  const [customTopics, setCustomTopics] = useState("");
  const [questionCount, setQuestionCount] = useState(5);
  const [difficulty, setDifficulty] = useState("Medium");
  const [instructions, setInstructions] = useState("");

  const isOther = domain === "Other";

  const toggleTopic = (topic) => {
    setTopics((prev) =>
      prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic]
    );
  };

  const handleStart = async () => {
    const payload = {
      domain: isOther ? customDomain : domain,
      topics: isOther ? customTopics : topics.join(", "),
      questionCount,
      difficulty,
      instructions,
    };

    const res = await api.post("/interview/custom", payload);
    startSession(res.data.sessionId, res.data.questions);
  };

  return (
    <div className="bg-white p-6 rounded shadow space-y-4">
      <h2 className="text-xl font-bold">Custom Interview</h2>

      <select
        className="border p-2 w-full"
        value={domain}
        onChange={(e) => {
          setDomain(e.target.value);
          setTopics([]);
        }}
      >
        <option value="">Select Domain</option>
        {Object.keys(DOMAIN_TOPICS).map((d) => (
          <option key={d} value={d}>
            {d}
          </option>
        ))}
        <option value="Other">Other</option>
      </select>

      {isOther && (
        <input
          placeholder="Enter custom domain"
          className="border p-2 w-full"
          onChange={(e) => setCustomDomain(e.target.value)}
        />
      )}

      {!isOther && domain && (
        <div>
          <p className="font-semibold mb-2">Select Topics</p>
          {DOMAIN_TOPICS[domain].map((topic) => (
            <label key={topic} className="block">
              <input
                type="checkbox"
                checked={topics.includes(topic)}
                onChange={() => toggleTopic(topic)}
              />{" "}
              {topic}
            </label>
          ))}
        </div>
      )}

      {isOther && (
        <textarea
          placeholder="Describe topics"
          className="border p-2 w-full"
          onChange={(e) => setCustomTopics(e.target.value)}
        />
      )}

      <input
        type="number"
        min={1}
        max={20}
        value={questionCount}
        onChange={(e) => setQuestionCount(e.target.value)}
        className="border p-2 w-full"
      />

      <select
        className="border p-2 w-full"
        value={difficulty}
        onChange={(e) => setDifficulty(e.target.value)}
      >
        <option>Easy</option>
        <option>Medium</option>
        <option>Hard</option>
      </select>

      <textarea
        placeholder="Special instructions (optional)"
        className="border p-2 w-full"
        onChange={(e) => setInstructions(e.target.value)}
      />

      <button
        onClick={handleStart}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Start Interview
      </button>
    </div>
  );
};

export default CustomInterview;
