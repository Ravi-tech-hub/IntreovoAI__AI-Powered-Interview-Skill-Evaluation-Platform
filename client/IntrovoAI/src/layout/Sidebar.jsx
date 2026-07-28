import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Sidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const linkClass = ({ isActive }) =>
    [
      "flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-semibold transition",
      isActive
        ? "bg-slate-950 text-white shadow-sm"
        : "text-slate-600 hover:bg-slate-100 hover:text-slate-950",
    ].join(" ");

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside className="fixed left-0 top-0 z-30 hidden h-screen w-64 flex-col border-r border-slate-200 bg-white md:flex">
      <button
        type="button"
        onClick={() => navigate("/dashboard")}
        className="flex items-center gap-3 border-b border-slate-200 px-5 py-5 text-left"
      >
        <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-950 text-sm font-bold text-white">
          IA
        </span>
        <span>
          <span className="block text-lg font-bold leading-none text-slate-950">
            IntervoAI
          </span>
          <span className="mt-1 block text-xs text-slate-500">
            Interview skill studio
          </span>
        </span>
      </button>

      <nav className="flex-1 space-y-2 px-3 py-5">
        <NavLink to="/dashboard" className={linkClass}>
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-white/10 text-xs">
            DB
          </span>
          Dashboard
        </NavLink>

        <NavLink to="/interview" className={linkClass}>
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-white/10 text-xs">
            IN
          </span>
          Interview Practice
        </NavLink>
      </nav>

      <div className="border-t border-slate-200 p-3">
        <div className="mb-3 rounded-lg border border-slate-200 bg-slate-50 p-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Next step
          </p>
          <p className="mt-1 text-sm leading-5 text-slate-700">
            Complete a mock interview, then turn weak areas into a roadmap.
          </p>
        </div>

        <button
          type="button"
          onClick={handleLogout}
          className="w-full rounded-lg px-4 py-3 text-left text-sm font-semibold text-red-600 transition hover:bg-red-50"
        >
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
