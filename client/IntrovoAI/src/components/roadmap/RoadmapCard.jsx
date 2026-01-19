const RoadmapCard = ({ week }) => {
  return (
    <div className="bg-gray-50 border rounded p-4">
      <h3 className="font-bold">
        Week {week.week}: {week.focus}
      </h3>

      <p className="mt-2 font-semibold">Topics</p>
      <ul className="list-disc ml-5">
        {week.topics.map((t, i) => (
          <li key={i}>{t}</li>
        ))}
      </ul>

      <p className="mt-2 font-semibold">Practice</p>
      <ul className="list-disc ml-5">
        {week.practice.map((p, i) => (
          <li key={i}>{p}</li>
        ))}
      </ul>
    </div>
  );
};

export default RoadmapCard;
