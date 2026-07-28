const QuestionCard = ({ question, index, total }) => (
  <section className="rounded-lg border border-slate-800 bg-slate-950 p-6 text-white shadow-sm">
    <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
      <p className="text-sm font-semibold uppercase tracking-wide text-slate-300">
        Question {index + 1} of {total}
      </p>
      <span className="w-fit rounded-full bg-teal-400/15 px-3 py-1 text-xs font-bold uppercase tracking-wide text-teal-200">
        {question.difficulty || "Medium"}
      </span>
    </div>

    <h2 className="mt-5 text-2xl font-bold leading-tight tracking-normal sm:text-3xl">
      {question.questionText}
    </h2>

    {question.topic && (
      <p className="mt-4 text-sm text-slate-300">Topic: {question.topic}</p>
    )}
  </section>
);

export default QuestionCard;
