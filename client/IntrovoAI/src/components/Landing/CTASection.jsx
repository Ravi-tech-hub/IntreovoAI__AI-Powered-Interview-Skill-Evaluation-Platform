import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <section className="bg-white px-5 py-16 text-center sm:px-8">
      <div className="mx-auto max-w-3xl rounded-lg border border-slate-200 bg-slate-950 p-8 text-white shadow-sm">
        <h2 className="text-3xl font-bold tracking-normal">
          Ready to practice like the real interview matters?
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-slate-300">
          Start with one mock interview, review AI feedback, and build your
          roadmap from actual weak areas.
        </p>
        <Link
          to="/login"
          className="mt-6 inline-flex min-h-12 items-center justify-center rounded-lg bg-white px-6 text-sm font-bold text-slate-950 transition hover:bg-slate-100"
        >
          Start interview
        </Link>
      </div>
    </section>
  );
};

export default CTASection;
