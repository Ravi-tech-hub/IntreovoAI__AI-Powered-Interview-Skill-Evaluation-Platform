import { useEffect, useState } from "react";
import OverviewCards from "../components/analytical/OverviewCard";
import ScoreTrendChart from "../components/analytical/ScoreTrendChart";
import SessionInsights from "../components/analytical/SessionInsights";
import RoadmapSection from "../components/dashboard/RoadmapSection";

import {
  getOverview,
  getScoreTrend,
  getSessionInsights,
  getStrengthsBreakdown,
  getWeaknessesBreakdown,
} from "../services/analytic_api";

const Dashboard = () => {
  const [overview, setOverview] = useState(null);
  const [trend, setTrend] = useState([]);
  const [sessionInsights, setSessionInsights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const [overviewRes, trendRes] = await Promise.all([
          getOverview(),
          getScoreTrend(),
        ]);

        setOverview(overviewRes.data);
        setTrend(trendRes.data);

        try {
          const insightRes = await getSessionInsights();
          setSessionInsights(insightRes.data.insights || []);
        } catch (insightError) {
          const [weaknessRes, strengthRes] = await Promise.all([
            getWeaknessesBreakdown(),
            getStrengthsBreakdown(),
          ]);

          setSessionInsights([
            {
              sessionId: "overall-summary",
              role: "Overall feedback summary",
              difficulty: "All sessions",
              status: "summary",
              createdAt: new Date().toISOString(),
              answeredQuestions: 0,
              averageScore: overviewRes.data.averageScore || 0,
              strengths: (strengthRes.data || []).map((item) => ({
                label: item._id,
                count: item.count,
              })),
              weaknesses: (weaknessRes.data || []).map((item) => ({
                label: item._id,
                count: item.count,
              })),
            },
          ]);

          console.warn("Session insights endpoint unavailable", insightError);
        }
      } catch (fetchError) {
        console.error("Failed to load analytics", fetchError);
        setError("Dashboard analytics could not be loaded right now.");
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="p-5 sm:p-8">
        <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold text-slate-500">
            Loading dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-5 sm:p-8">
      <header className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-teal-700">
            Placement preparation
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-normal text-slate-950 sm:text-4xl">
            Interview Readiness Dashboard
          </h1>
          <p className="mt-2 max-w-2xl text-slate-600">
            Track mock interview performance, identify weak areas, and turn
            feedback into a practical learning roadmap.
          </p>
        </div>
        <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          Focus today: complete one interview and review feedback.
        </div>
      </header>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700">
          {error}
        </div>
      )}

      {overview && <OverviewCards data={overview} />}

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(320px,0.85fr)_minmax(0,1.4fr)]">
        <div>
          <ScoreTrendChart data={trend} />
        </div>
        <SessionInsights insights={sessionInsights} />
      </div>

      <RoadmapSection />
    </div>
  );
};

export default Dashboard;
