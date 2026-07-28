import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../services/auth_api";

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await registerUser(form);
      navigate("/login");
    } catch (registerError) {
      console.error("Registration failed", registerError);
      setError(
        registerError.response?.data?.message || "Registration failed."
      );
    } finally {
      setLoading(false);
    }
  };

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <main className="grid min-h-screen grid-cols-1 bg-slate-50 lg:grid-cols-[1fr_440px]">
      <section className="hidden border-r border-slate-200 bg-slate-950 p-10 text-white lg:flex lg:flex-col lg:justify-between">
        <div>
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white text-sm font-bold text-slate-950">
            IA
          </div>
          <h1 className="mt-8 max-w-xl text-4xl font-bold leading-tight tracking-normal">
            Build interview confidence with structured AI practice.
          </h1>
          <p className="mt-4 max-w-lg text-slate-300">
            Create an account to save sessions, track scores, and generate
            roadmaps from evaluated weak areas.
          </p>
        </div>
        <div className="rounded-lg bg-white/10 p-5">
          <p className="text-sm font-semibold text-slate-200">
            Placement-ready flow
          </p>
          <p className="mt-2 text-sm leading-6 text-slate-300">
            Practice, evaluate, review analytics, and revise with a weekly plan.
          </p>
        </div>
      </section>

      <section className="flex items-center justify-center px-5 py-10">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
        >
          <p className="text-sm font-semibold uppercase tracking-wide text-teal-700">
            Start preparing
          </p>
          <h2 className="mt-2 text-3xl font-bold text-slate-950">Register</h2>
          <p className="mt-2 text-sm text-slate-500">
            Create your interview practice workspace.
          </p>

          {error && (
            <p className="mt-5 rounded-lg border border-red-200 bg-red-50 p-3 text-sm font-medium text-red-700">
              {error}
            </p>
          )}

          <label className="mt-6 block">
            <span className="text-sm font-semibold text-slate-700">Name</span>
            <input
              value={form.name}
              placeholder="Your name"
              className="mt-2 min-h-11 w-full rounded-lg border border-slate-200 px-3 text-slate-800 outline-none focus:border-teal-700 focus:ring-4 focus:ring-teal-100"
              onChange={(e) => updateField("name", e.target.value)}
            />
          </label>

          <label className="mt-4 block">
            <span className="text-sm font-semibold text-slate-700">Email</span>
            <input
              type="email"
              value={form.email}
              placeholder="you@example.com"
              className="mt-2 min-h-11 w-full rounded-lg border border-slate-200 px-3 text-slate-800 outline-none focus:border-teal-700 focus:ring-4 focus:ring-teal-100"
              onChange={(e) => updateField("email", e.target.value)}
            />
          </label>

          <label className="mt-4 block">
            <span className="text-sm font-semibold text-slate-700">
              Password
            </span>
            <input
              type="password"
              value={form.password}
              placeholder="Minimum 6 characters"
              className="mt-2 min-h-11 w-full rounded-lg border border-slate-200 px-3 text-slate-800 outline-none focus:border-teal-700 focus:ring-4 focus:ring-teal-100"
              onChange={(e) => updateField("password", e.target.value)}
            />
          </label>

          <button
            type="submit"
            disabled={loading || !form.name || !form.email || !form.password}
            className="mt-6 min-h-11 w-full rounded-lg bg-slate-950 px-4 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            {loading ? "Creating account..." : "Create account"}
          </button>

          <p className="mt-5 text-center text-sm text-slate-500">
            Already have an account?{" "}
            <Link to="/login" className="font-semibold text-teal-700">
              Login
            </Link>
          </p>
        </form>
      </section>
    </main>
  );
};

export default Register;
