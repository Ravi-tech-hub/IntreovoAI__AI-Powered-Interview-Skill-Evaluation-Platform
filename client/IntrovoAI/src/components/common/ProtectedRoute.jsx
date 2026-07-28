import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="rounded-lg border border-slate-200 bg-white p-6 text-sm font-semibold text-slate-600 shadow-sm">
          Loading...
        </div>
      </div>
    );
  }
  if (!user) return <Navigate to="/login" />;
  return children;
};
export default ProtectedRoute;
