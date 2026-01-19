const OverviewCards = ({ data }) => {
  const cards = [
    {
      label: "Total Interviews",
      value: data.totalInterview ?? 0,
      color: "bg-blue-500",
    },
    {
      label: "Average Score",
      value: data.averageScore ? data.averageScore.toFixed(1) : "0.0",
      color: "bg-green-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {cards.map((card, i) => (
        <div
          key={i}
          className={`${card.color} text-white rounded-xl p-5 shadow`}
        >
          <p className="text-sm opacity-80">{card.label}</p>
          <p className="text-3xl font-bold mt-2">{card.value}</p>
        </div>
      ))}
    </div>
  );
};

export default OverviewCards;
