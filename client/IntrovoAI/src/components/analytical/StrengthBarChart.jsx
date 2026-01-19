import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const StrengthBarChart = ({ data }) => {
  const formattedData = data.map((d) => ({
    strength: d._id,
    count: d.count,
  }));

  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="font-semibold mb-3 text-green-600">Strengths Breakdown</h3>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={formattedData}>
          <XAxis dataKey="strength" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#16a34a" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StrengthBarChart;
