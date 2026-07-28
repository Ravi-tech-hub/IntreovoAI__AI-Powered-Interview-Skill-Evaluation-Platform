import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { loginUser } from "../services/auth_api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await loginUser({ email, password });
      login(res.data.token);
      navigate("/dashboard");
    } catch (loginError) {
      console.error("Login failed", loginError);
      setError(loginError.response?.data?.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="grid min-h-screen grid-cols-1 bg-slate-50 lg:grid-cols-[1fr_440px]">
      <section className="hidden border-r border-slate-200 bg-slate-950 p-10 text-white lg:flex lg:flex-col lg:justify-between">
        <div>
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white text-sm font-bold text-slate-950">
            IA
          </div>
          <h1 className="mt-8 max-w-xl text-4xl font-bold leading-tight tracking-normal">
            Practice interviews with feedback that turns into a plan.
          </h1>
          <p className="mt-4 max-w-lg text-slate-300">
            IntervoAI helps placement candidates generate mock interviews,
            evaluate answers, and build focused roadmaps from weak areas.
          </p>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {["AI questions", "Analytics", "Roadmap"].map((item) => (
            <div key={item} className="rounded-lg bg-white/10 p-4">
              <p className="text-sm font-semibold">{item}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="flex items-center justify-center px-5 py-10">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
        >
          <p className="text-sm font-semibold uppercase tracking-wide text-teal-700">
            Welcome back
          </p>
          <h2 className="mt-2 text-3xl font-bold text-slate-950">Login</h2>
          <p className="mt-2 text-sm text-slate-500">
            Continue your interview preparation dashboard.
          </p>

          {error && (
            <p className="mt-5 rounded-lg border border-red-200 bg-red-50 p-3 text-sm font-medium text-red-700">
              {error}
            </p>
          )}

          <label className="mt-6 block">
            <span className="text-sm font-semibold text-slate-700">Email</span>
            <input
              type="email"
              value={email}
              placeholder="you@example.com"
              className="mt-2 min-h-11 w-full rounded-lg border border-slate-200 px-3 text-slate-800 outline-none focus:border-teal-700 focus:ring-4 focus:ring-teal-100"
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          <label className="mt-4 block">
            <span className="text-sm font-semibold text-slate-700">
              Password
            </span>
            <input
              type="password"
              value={password}
              placeholder="Enter your password"
              className="mt-2 min-h-11 w-full rounded-lg border border-slate-200 px-3 text-slate-800 outline-none focus:border-teal-700 focus:ring-4 focus:ring-teal-100"
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          <button
            type="submit"
            disabled={loading || !email || !password}
            className="mt-6 min-h-11 w-full rounded-lg bg-slate-950 px-4 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="mt-5 text-center text-sm text-slate-500">
            New to IntervoAI?{" "}
            <Link to="/register" className="font-semibold text-teal-700">
              Create account
            </Link>
          </p>
        </form>
      </section>
    </main>
  );
};

export default Login;
