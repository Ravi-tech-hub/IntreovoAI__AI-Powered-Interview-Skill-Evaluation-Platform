import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Sidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const linkClass = ({ isActive }) =>
    `block px-4 py-2 rounded ${
      isActive ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-200"
    }`;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside className="w-64 h-screen bg-white border-r fixed left-0 top-0">
      <div
        className="p-5 text-2xl font-bold text-blue-600 cursor-pointer"
        onClick={() => navigate("/dashboard")}
      >
        IntervoAI
      </div>

      <nav className="mt-6 space-y-2 px-3">
        <NavLink to="/dashboard" className={linkClass}>
          Dashboard
        </NavLink>

        <NavLink to="/interview" className={linkClass}>
          Interview
        </NavLink>
      </nav>

      <div className="absolute bottom-6 w-full px-3">
        <button
          onClick={handleLogout}
          className="w-full text-left px-4 py-2 rounded text-red-500 hover:bg-red-100"
        >
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
