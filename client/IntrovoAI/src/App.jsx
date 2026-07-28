import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import HowItWork from "./pages/HowitWork";
import ProtectedRoute from "./components/common/ProtectedRoute";
import Interview from "./pages/Interview";
import Dashboard from "./pages/Dashboard";
import MainLayout from "./layout/MainLayout";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/how-it-works" element={<HowItWork />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/interview" element={<Interview />} />
      </Route>
      <Route
        path="*"
        element={
          <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
            <div className="rounded-lg border border-slate-200 bg-white p-8 text-center shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-wide text-teal-700">
                404
              </p>
              <h1 className="mt-2 text-2xl font-bold text-slate-950">
                Page not found
              </h1>
            </div>
          </div>
        }
      />
    </Routes>
  );
};

export default App;
