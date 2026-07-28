const FeedbackList = ({ title, items, tone }) => {
  const toneClass =
    tone === "warning"
      ? "border-amber-200 bg-amber-50 text-amber-900"
      : "border-teal-200 bg-teal-50 text-teal-900";

  return (
    <div className={`rounded-lg border p-4 ${toneClass}`}>
      <p className="text-sm font-bold">{title}</p>
      {items.length === 0 ? (
        <p className="mt-2 text-sm opacity-80">No points returned.</p>
      ) : (
        <ul className="mt-3 space-y-2 text-sm leading-5">
          {items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

const Feedback = ({ feedback }) => {
  if (!feedback) return null;

  const score = Number(feedback.score || 0);

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col justify-between gap-3 border-b border-slate-200 pb-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-teal-700">
            AI feedback
          </p>
          <h3 className="mt-1 text-xl font-bold text-slate-950">
            Answer evaluation
          </h3>
        </div>
        <div className="rounded-lg bg-slate-950 px-4 py-3 text-center text-white">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-300">
            Score
          </p>
          <p className="text-2xl font-bold">{score}/10</p>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <FeedbackList
          title="Strengths"
          items={feedback.strengths || []}
          tone="success"
        />
        <FeedbackList
          title="Needs improvement"
          items={feedback.weaknesses || []}
          tone="warning"
        />
      </div>

      {feedback.improvedAnswer && (
        <div className="mt-4 rounded-lg border border-slate-200 bg-slate-50 p-4">
          <p className="text-sm font-bold text-slate-950">Improved answer</p>
          <p className="mt-2 text-sm leading-6 text-slate-700">
            {feedback.improvedAnswer}
          </p>
        </div>
      )}
    </section>
  );
};

export default Feedback;
