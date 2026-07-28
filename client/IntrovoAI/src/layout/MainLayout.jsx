import { NavLink, Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const MainLayout = () => {
  const mobileLinkClass = ({ isActive }) =>
    [
      "rounded-lg px-3 py-2 text-sm font-semibold",
      isActive ? "bg-slate-950 text-white" : "text-slate-600",
    ].join(" ");

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <Sidebar />

      <div className="border-b border-slate-200 bg-white px-4 py-3 md:hidden">
        <div className="mb-3 flex items-center justify-between">
          <div>
            <p className="text-lg font-bold text-slate-950">IntervoAI</p>
            <p className="text-xs text-slate-500">Interview skill studio</p>
          </div>
        </div>
        <nav className="flex gap-2">
          <NavLink to="/dashboard" className={mobileLinkClass}>
            Dashboard
          </NavLink>
          <NavLink to="/interview" className={mobileLinkClass}>
            Practice
          </NavLink>
        </nav>
      </div>

      <main className="min-h-screen md:pl-64">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
