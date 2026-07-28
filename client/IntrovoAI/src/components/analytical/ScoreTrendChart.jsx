import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const ScoreTrendChart = ({ data }) => {
  const formattedData = data.map((item) => ({
    date: new Date(item.date).toLocaleDateString(),
    score: Number(Number(item.avgScore || 0).toFixed(1)),
  }));

  return (
    <section className="h-full rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4">
        <h2 className="text-lg font-bold text-slate-950">Score Trend</h2>
        <p className="mt-1 text-sm text-slate-500">
          Your average score across completed interview sessions.
        </p>
      </div>

      {formattedData.length === 0 ? (
        <div className="flex h-[260px] items-center justify-center rounded-lg border border-dashed border-slate-300 bg-slate-50 text-center text-sm text-slate-500">
          Complete an interview to see your score trend.
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={formattedData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="date" tick={{ fill: "#64748b", fontSize: 12 }} />
            <YAxis
              domain={[0, 10]}
              tick={{ fill: "#64748b", fontSize: 12 }}
            />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="score"
              stroke="#0f766e"
              strokeWidth={3}
              dot={{ r: 4, strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </section>
  );
};

export default ScoreTrendChart;
