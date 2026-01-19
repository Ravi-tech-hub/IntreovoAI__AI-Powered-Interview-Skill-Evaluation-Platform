import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/auth_api";

const Register = () => {
  const [form, setform] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(form);
      navigate("/login");
    } catch {
      alert("Registration Failed");
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow w-80"
      >
        <h2 className="text-xl font-bold mb-4">Register</h2>

        {["name", "email", "password"].map((field) => (
          <input
            key={field}
            placeholder={field}
            type={field === "password" ? "password" : "text"}
            className="w-full mb-3 p-2 border rounded"
            onChange={(e) => setform({ ...form, [field]: e.target.value })}
          />
        ))}

        <button className="w-full bg-green-600 text-white p-2 rounded">
          Register
        </button>
      </form>
    </div>
  );
};
export default Register;
