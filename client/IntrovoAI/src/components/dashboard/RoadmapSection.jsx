import { useEffect, useState } from "react";
import RoadmapCard from "../roadmap/RoadmapCard";
import { getMyInterviewSessions } from "../../services/interview_api";
import { getRoadmapBySession } from "../../services/roadmap_api";

const RoadmapSection = () => {
  const [sessions, setSessions] = useState([]);
  const [selectedSession, setSelectedSession] = useState("");
  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchSessions = async () => {
      const res = await getMyInterviewSessions();
      setSessions(res.data.sessions);
      if (res.data.sessions.length > 0) {
        setSelectedSession(res.data.sessions[0]._id);
      }
    };
    fetchSessions();
  }, []);
  useEffect(() => {
    if (!selectedSession) return;

    const fetchRoadmap = async () => {
      setLoading(true);
      try {
        const res = await getRoadmapBySession(selectedSession);
        setRoadmap(res.data.roadmap);
      } catch (err) {
        console.error("Failed to load roadmap", err);
        setRoadmap(null);
      } finally {
        setLoading(false);
      }
    };

    fetchRoadmap();
  }, [selectedSession]);

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-3">
        Personalized Learning Roadmap
      </h2>

      <select
        className="border p-2 mb-4 rounded"
        value={selectedSession}
        onChange={(e) => setSelectedSession(e.target.value)}
      >
        {sessions.map((s) => (
          <option key={s._id} value={s._id}>
            {s.role} — {new Date(s.createdAt).toLocaleDateString()}
          </option>
        ))}
      </select>
      {loading && <p>Loading roadmap...</p>}
      {!loading && !roadmap && <p>No roadmap available.</p>}

      {!loading && roadmap && (
        <div className="space-y-3">
          {roadmap.weeks.map((week) => (
            <RoadmapCard key={week.week} week={week} />
          ))}
        </div>
      )}
    </div>
  );
};

export default RoadmapSection;
