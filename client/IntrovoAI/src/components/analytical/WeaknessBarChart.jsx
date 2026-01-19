import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const WeaknessBarChart = ({ data }) => {
  const formattedData = data.map((d) => ({
    weakness: d._id,
    count: d.count,
  }));

  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="font-semibold mb-3">Weakness Breakdown</h3>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={formattedData}>
          <XAxis dataKey="weakness" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#dc2626" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WeaknessBarChart;
