import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate,useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();
  // const API_URL = import.meta.env.VITE_API_URL;

  const location = useLocation();

  useEffect(() => {
    if (location.state?.message) {
      toast.warning(location.state.message);
    }
  }, [location]);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await login({
        email: formData.email,
        password: formData.password,
      });

      navigate("/");
    } catch (error) {
      console.log("Login Error:", error);
      console.log("Response:", error.response?.data);

      alert(error.response?.data?.message || error.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };
  return (
    // <div className="min-h-screen bg-[#fff8f4] flex items-center justify-center px-4">
    <div className="min-h-screen flex">
      <div className="hidden lg:flex w-1/2 bg-linear-to-br from-violet-700 via-indigo-700 to-purple-800 text-white items-center justify-center p-12">
        <div className="max-w-md">
          <h1 className="text-6xl font-bold mb-6">Campusly</h1>

          <p className="text-xl text-violet-100 leading-relaxed">
            Connect with your campus community through events, announcements,
            marketplace listings, and real-time communication.
          </p>

          <div className="mt-10 grid grid-cols-2 gap-4">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4">
              🎉 Events
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4">
              💬 Chat
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4">
              📢 Notices
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4">
              🛒 Marketplace
            </div>
          </div>
        </div>
      </div>
      {/* Login Card */}
      <div className="flex-1 flex items-center justify-center bg-gray-50 px-6 py-10">
        <div className="w-full max-w-lg bg-white rounded-3xl shadow-xl p-8">
          <h2 className="text-2xl font-bold mb-6">Login</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              name="email"
              placeholder="University Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#8b5e3c]"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#8b5e3c]"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-violet-600 text-white rounded-xl font-semibold hover:bg-violet-700 transition"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="text-center mt-6 text-gray-600">
            Don't have an account?
          </p>

          <Link to="/register">
            <button className="mt-3 w-full py-3 border border-violet-600 text-violet-600 rounded-xl font-semibold hover:bg-violet-50 transition">
              Create Account
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
