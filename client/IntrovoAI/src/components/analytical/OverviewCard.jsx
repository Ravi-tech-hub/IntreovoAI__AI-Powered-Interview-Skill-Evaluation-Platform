const OverviewCards = ({ data }) => {
  const averageScore = data.averageScore ? Number(data.averageScore) : 0;
  const cards = [
    {
      label: "Mock interviews",
      value: data.totalInterview ?? 0,
      note: "Sessions created from role, resume, and custom practice",
    },
    {
      label: "Average score",
      value: averageScore.toFixed(1),
      note: "Target 8.0+ before final placement rounds",
    },
    {
      label: "Readiness level",
      value: averageScore >= 8 ? "Strong" : averageScore >= 6 ? "Building" : "Starter",
      note: "Based on your evaluated answer score",
    },
    {
      label: "Next action",
      value: "Practice",
      note: "Answer, evaluate, then generate a roadmap",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <div
          key={card.label}
          className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
        >
          <p className="text-sm font-semibold text-slate-500">{card.label}</p>
          <p className="mt-2 text-3xl font-bold text-slate-950">
            {card.value}
          </p>
          <p className="mt-2 text-sm leading-5 text-slate-500">{card.note}</p>
        </div>
      ))}
    </div>
  );
};

export default OverviewCards;
