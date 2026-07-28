const InterviewResult = () => {
  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-3xl rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-wide text-teal-700">
          Interview result
        </p>
        <h1 className="mt-2 text-2xl font-bold text-slate-950">
          Results are available in the dashboard
        </h1>
        <p className="mt-2 text-slate-600">
          Review score trends, strengths, weaknesses, and roadmap actions from
          your dashboard after completing an interview.
        </p>
      </div>
    </div>
  );
};

export default InterviewResult;
