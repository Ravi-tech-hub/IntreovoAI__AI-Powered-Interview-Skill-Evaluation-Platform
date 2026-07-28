import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="bg-slate-950 px-5 py-20 text-white sm:px-8 lg:min-h-[88vh] lg:py-24">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-teal-300">
            AI interview preparation
          </p>
          <h1 className="mt-4 text-4xl font-bold leading-tight tracking-normal sm:text-5xl lg:text-6xl">
            IntervoAI
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-8 text-slate-300">
            Practice placement interviews, get AI feedback on every answer, and
            convert weak areas into a personalized learning roadmap.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/login"
              className="inline-flex min-h-12 items-center justify-center rounded-lg bg-white px-6 text-sm font-bold text-slate-950 transition hover:bg-slate-100"
            >
              Start interview
            </Link>
            <Link
              to="/how-it-works"
              className="inline-flex min-h-12 items-center justify-center rounded-lg border border-white/20 px-6 text-sm font-bold text-white transition hover:bg-white/10"
            >
              See workflow
            </Link>
          </div>
        </div>

        <div className="rounded-lg border border-white/10 bg-white p-4 text-slate-950 shadow-2xl">
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-teal-700">
                  Live practice
                </p>
                <h2 className="mt-1 text-xl font-bold">
                  MERN Developer Interview
                </h2>
              </div>
              <span className="rounded-full bg-teal-50 px-3 py-1 text-xs font-bold text-teal-700">
                Medium
              </span>
            </div>

            <div className="mt-4 rounded-lg bg-slate-950 p-5 text-white">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-300">
                Question 3 of 8
              </p>
              <p className="mt-3 text-2xl font-bold leading-tight">
                How would you secure JWT authentication in a MERN app?
              </p>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {[
                ["Score", "8.1"],
                ["Strength", "React"],
                ["Focus", "DBMS"],
              ].map(([label, value]) => (
                <div key={label} className="rounded-lg bg-white p-4">
                  <p className="text-xs font-semibold text-slate-500">
                    {label}
                  </p>
                  <p className="mt-1 text-2xl font-bold">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
