import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";
import { loginUser } from "../services/auth_api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser({ email, password });
      console.log(res.data);
      const token = res.data.token;
      login(token);
      navigate("/dashboard");
    } catch (err) {
      console.log(err);
      alert("Login Failed");
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded shadow w-80"
        >
          <h2 className="text-xl font-bold mb-4">Login</h2>

          <input
            type="email"
            placeholder="Email"
            className="w-full mb-3 p-2 border rounded"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full mb-3 p-2 border rounded"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="w-full bg-blue-600 text-white p-2 rounded">
            Login
          </button>
        </form>
      </div>
    </>
  );
};
export default Login;
