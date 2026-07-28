const InsightPills = ({ title, items, tone }) => {
  const toneClass =
    tone === "weakness"
      ? "border-amber-200 bg-amber-50 text-amber-900"
      : "border-teal-200 bg-teal-50 text-teal-900";

  return (
    <div className={`rounded-lg border p-4 ${toneClass}`}>
      <p className="text-sm font-bold">{title}</p>
      {items.length === 0 ? (
        <p className="mt-3 text-sm opacity-80">No feedback captured yet.</p>
      ) : (
        <div className="mt-3 flex flex-wrap gap-2">
          {items.slice(0, 5).map((item) => (
            <span
              key={item.label}
              className="rounded-full bg-white/70 px-3 py-1 text-xs font-semibold"
            >
              {item.label} {item.count > 1 ? `x${item.count}` : ""}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

const SessionInsights = ({ insights }) => {
  return (
    <section className="rounded-lg border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 p-5">
        <h2 className="text-xl font-bold text-slate-950">
          Interview Session Insights
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Review strengths and weaknesses session by session instead of reading
          abstract charts.
        </p>
      </div>

      <div className="space-y-4 p-5">
        {insights.length === 0 ? (
          <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
            <p className="text-sm font-semibold text-slate-700">
              No session insights yet.
            </p>
            <p className="mt-1 text-sm text-slate-500">
              Submit answers in an interview to see strengths and weaknesses
              here.
            </p>
          </div>
        ) : (
          insights.map((session) => (
            <article
              key={session.sessionId}
              className="rounded-lg border border-slate-200 bg-slate-50 p-4"
            >
              <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-start">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-lg font-bold text-slate-950">
                      {session.role}
                    </h3>
                    <span className="rounded-full bg-white px-3 py-1 text-xs font-bold uppercase tracking-wide text-slate-600">
                      {session.difficulty}
                    </span>
                    <span className="rounded-full bg-white px-3 py-1 text-xs font-bold uppercase tracking-wide text-slate-600">
                      {session.status}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-slate-500">
                    {new Date(session.createdAt).toLocaleDateString()} ·{" "}
                    {session.answeredQuestions} answered questions
                  </p>
                </div>

                <div className="rounded-lg bg-slate-950 px-4 py-3 text-white">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-300">
                    Avg score
                  </p>
                  <p className="text-2xl font-bold">
                    {Number(session.averageScore || 0).toFixed(1)}/10
                  </p>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
                <InsightPills
                  title="Strengths from this interview"
                  items={session.strengths || []}
                  tone="strength"
                />
                <InsightPills
                  title="Weaknesses to improve"
                  items={session.weaknesses || []}
                  tone="weakness"
                />
              </div>
            </article>
          ))
        )}
      </div>
    </section>
  );
};

export default SessionInsights;
