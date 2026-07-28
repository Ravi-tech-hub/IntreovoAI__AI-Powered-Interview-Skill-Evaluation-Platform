import { Link } from "react-router-dom";

const steps = [
  "Choose interview mode",
  "Answer AI-generated questions",
  "Review score and feedback",
  "Follow your roadmap",
];

const HowItWorksSection = () => {
  return (
    <section className="bg-slate-50 px-5 py-16 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-teal-700">
              Workflow
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-normal text-slate-950">
              How it works
            </h2>
          </div>
          <Link
            to="/how-it-works"
            className="w-fit text-sm font-bold text-teal-700"
          >
            Learn more
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-4">
          {steps.map((step, index) => (
            <article
              key={step}
              className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-950 text-sm font-bold text-white">
                {index + 1}
              </span>
              <p className="mt-4 font-semibold text-slate-800">{step}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
