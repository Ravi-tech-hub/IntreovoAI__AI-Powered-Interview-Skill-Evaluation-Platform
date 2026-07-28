const RoadmapCard = ({ week }) => {
  return (
    <article className="rounded-lg border border-slate-200 bg-slate-50 p-4">
      <p className="text-xs font-bold uppercase tracking-wide text-teal-700">
        Week {week.week}
      </p>
      <h3 className="mt-2 text-base font-bold text-slate-950">{week.focus}</h3>

      <div className="mt-4">
        <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
          Topics
        </p>
        <ul className="mt-2 space-y-2 text-sm text-slate-700">
          {(week.topics || []).map((topic) => (
            <li key={topic} className="rounded-md bg-white px-3 py-2">
              {topic}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-4">
        <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
          Practice
        </p>
        <ul className="mt-2 space-y-2 text-sm text-slate-700">
          {(week.practice || []).map((item) => (
            <li key={item} className="rounded-md bg-white px-3 py-2">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
};

export default RoadmapCard;
