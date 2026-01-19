const OverviewCards = ({ data }) => {
  const cards = [
    {
      label: "Total Interviews",
      value: data.totalInterviews,
    },
    {
      label: "Average Score",
      value: data.averageScore?.toFixed(1),
    },
    {
      label: "Avg Confidence",
      value: data.averageConfidence?.toFixed(1),
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {cards.map((card, i) => (
        <div key={i} className="bg-white shadow rounded p-4">
          <p className="text-gray-500">{card.label}</p>
          <p className="text-2xl font-bold">{card.value}</p>
        </div>
      ))}
    </div>
  );
};

export default OverviewCards;
