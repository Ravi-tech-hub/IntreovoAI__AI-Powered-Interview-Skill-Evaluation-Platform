import { useEffect, useState } from "react";
import RoadmapCard from "../roadmap/RoadmapCard";
import { getMyInterviewSessions } from "../../services/interview_api";
import {
  createRoadmapBySession,
  getRoadmapBySession,
} from "../../services/roadmap_api";

const RoadmapSection = () => {
  const [sessions, setSessions] = useState([]);
  const [selectedSession, setSelectedSession] = useState("");
  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const res = await getMyInterviewSessions();
        setSessions(res.data.sessions);
        if (res.data.sessions.length > 0) {
          setSelectedSession(res.data.sessions[0]._id);
        }
      } catch (error) {
        console.error("Failed to load sessions", error);
        setMessage("Interview sessions could not be loaded.");
      }
    };

    fetchSessions();
  }, []);

  useEffect(() => {
    if (!selectedSession) return;

    const fetchRoadmap = async () => {
      setLoading(true);
      setMessage("");
      try {
        const res = await getRoadmapBySession(selectedSession);
        setRoadmap(res.data.roadmap);
      } catch {
        setRoadmap(null);
      } finally {
        setLoading(false);
      }
    };

    fetchRoadmap();
  }, [selectedSession]);

  const handleGenerate = async () => {
    if (!selectedSession) return;

    setGenerating(true);
    setMessage("");
    try {
      const res = await createRoadmapBySession(selectedSession);
      setRoadmap(res.data.roadmap);
      setMessage("Roadmap generated from your weak areas.");
    } catch (error) {
      console.error("Failed to generate roadmap", error);
      setMessage(
        error.response?.data?.message ||
          "Submit at least one evaluated answer before generating a roadmap."
      );
    } finally {
      setGenerating(false);
    }
  };

  return (
    <section className="rounded-lg border border-slate-200 bg-white shadow-sm">
      <div className="flex flex-col justify-between gap-4 border-b border-slate-200 p-5 lg:flex-row lg:items-center">
        <div>
          <h2 className="text-xl font-bold text-slate-950">
            Personalized Learning Roadmap
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Generate a four-week plan from weaknesses found in an interview.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <select
            className="min-h-11 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:border-teal-700 focus:ring-4 focus:ring-teal-100"
            value={selectedSession}
            onChange={(e) => setSelectedSession(e.target.value)}
            disabled={sessions.length === 0}
          >
            {sessions.length === 0 ? (
              <option>No sessions yet</option>
            ) : (
              sessions.map((session) => (
                <option key={session._id} value={session._id}>
                  {session.role} - {new Date(session.createdAt).toLocaleDateString()}
                </option>
              ))
            )}
          </select>

          <button
            type="button"
            onClick={handleGenerate}
            disabled={!selectedSession || generating}
            className="min-h-11 rounded-lg bg-slate-950 px-4 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            {generating ? "Generating..." : "Generate roadmap"}
          </button>
        </div>
      </div>

      <div className="p-5">
        {message && (
          <div className="mb-4 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm font-medium text-amber-800">
            {message}
          </div>
        )}

        {loading && (
          <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-sm text-slate-500">
            Loading roadmap...
          </div>
        )}

        {!loading && !roadmap && (
          <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
            <p className="text-sm font-semibold text-slate-700">
              No roadmap available for this session.
            </p>
            <p className="mt-1 text-sm text-slate-500">
              Generate one after submitting evaluated answers.
            </p>
          </div>
        )}

        {!loading && roadmap && (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            {roadmap.weeks.map((week) => (
              <RoadmapCard key={week.week} week={week} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default RoadmapSection;
