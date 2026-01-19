import { useEffect, useState } from "react";

import OverviewCards from "../components/analytical/OverviewCard";
import ScoreTrendChart from "../components/analytical/ScoreTrendChart";
import WeaknessBarChart from "../components/analytical/WeaknessBarChart";
import StrengthsBarChart from "../components/analytical/StrengthBarChart";
import RoadmapSection from "../components/dashboard/RoadmapSection";

import {
  getOverview,
  getScoreTrend,
  getWeaknessesBreakdown,
  getStrengthsBreakdown,
} from "../services/analytic_api";

const Dashboard = () => {
  const [overview, setOverview] = useState(null);
  const [trend, setTrend] = useState([]);
  const [weaknesses, setWeaknesses] = useState([]);
  const [strengths, setStrengths] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const [o, t, w, s] = await Promise.all([
          getOverview(),
          getScoreTrend(),
          getWeaknessesBreakdown(),
          getStrengthsBreakdown(),
        ]);

        setOverview(o.data);
        setTrend(t.data);
        setWeaknesses(w.data);
        setStrengths(s.data);
      } catch (error) {
        console.error("Failed to load analytics", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading) {
    return <p className="p-6">Loading dashboard...</p>;
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      {overview && <OverviewCards data={overview} />}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ScoreTrendChart data={trend} />
        <WeaknessBarChart data={weaknesses} />
        <StrengthsBarChart data={strengths} />
      </div>
      <RoadmapSection />
    </div>
  );
};

export default Dashboard;
