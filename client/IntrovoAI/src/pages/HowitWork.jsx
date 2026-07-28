const steps = [
  {
    title: "Choose interview mode",
    desc: "Start from a role, upload a resume, or customize domain and topics.",
  },
  {
    title: "Answer realistic questions",
    desc: "Practice with AI-generated questions that match your preparation goal.",
  },
  {
    title: "Review AI feedback",
    desc: "See your score, strengths, weaknesses, and a better version of your answer.",
  },
  {
    title: "Track analytics",
    desc: "Use score trends and repeated weak areas to understand progress.",
  },
  {
    title: "Generate roadmap",
    desc: "Turn weaknesses into a practical four-week learning plan.",
  },
];

const HowItWorks = () => {
  return (
    <main className="min-h-screen bg-slate-50 px-5 py-16 sm:px-8">
      <section className="mx-auto max-w-5xl">
        <p className="text-sm font-semibold uppercase tracking-wide text-teal-700">
          Workflow
        </p>
        <h1 className="mt-2 text-4xl font-bold tracking-normal text-slate-950">
          How IntervoAI Works
        </h1>
        <p className="mt-3 max-w-2xl text-slate-600">
          IntervoAI connects interview practice, feedback, analytics, and
          learning roadmaps into one preparation loop.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-4">
          {steps.map((step, index) => (
            <article
              key={step.title}
              className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-950 text-sm font-bold text-white">
                  {index + 1}
                </span>
                <div>
                  <h2 className="text-lg font-bold text-slate-950">
                    {step.title}
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    {step.desc}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
};

export default HowItWorks;
