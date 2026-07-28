const features = [
  {
    title: "AI-generated interviews",
    desc: "Generate targeted questions from role, difficulty, resume, or custom topics.",
  },
  {
    title: "Answer evaluation",
    desc: "Receive score, strengths, weak areas, and improved answer guidance.",
  },
  {
    title: "Performance analytics",
    desc: "Track score trend, repeated weaknesses, and confident strengths.",
  },
  {
    title: "Personalized roadmap",
    desc: "Turn interview feedback into a focused four-week learning plan.",
  },
];

const FeatureSection = () => {
  return (
    <section className="bg-white px-5 py-16 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-teal-700">
            Product features
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-normal text-slate-950">
            Built for placement preparation
          </h2>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {features.map((feature) => (
            <article
              key={feature.title}
              className="rounded-lg border border-slate-200 bg-slate-50 p-5"
            >
              <h3 className="text-lg font-bold text-slate-950">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                {feature.desc}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
