import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const [showOtpVerification, setShowOtpVerification] = useState(false);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    department: "",
    role: "student",
    password: "",
    confirmPassword: "",
  });

  const departments = ["DCSA"];

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    // const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    // const emailRegex =
    //   /^[a-zA-Z0-9._%+-]+@(gmail\.com|outlook\.com|hotmail\.com|yahoo\.com|kuk\.ac\.in)$/;
    // if (!emailRegex.test(formData.email)) {
    //   alert("Please enter a valid email address(we only accept the kuk.ac.in or popular email like yahoo,gamil and hotmail)");
    //   return;
    // }
    // const passwordRegex =
    //   /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    // if (!passwordRegex.test(formData.password)) {
    //   alert(
    //     "Please enter a valid password with alphabetic, numeric, and special characters."
    //   );
    //   return;
    // }
    if (formData.password !== formData.confirmPassword) {
      return alert("Passwords do not match");
    }

    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          username: formData.username,
          email: formData.email,
          department: formData.department,
          role: formData.role,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setShowOtpVerification(true);
        alert(data.message || "OTP sent to your email");
      } else {
        alert(data.message || "Registration failed");
      }
    } catch (error) {
      console.error(error);
      alert("Server Error");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/api/auth/verify-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          otp,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Account verified successfully");
        navigate("/login");
      } else {
        alert(data.message || "Invalid OTP");
      }
    } catch (error) {
      console.error(error);
      alert("Server Error");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    try {
      const response = await fetch(`${API_URL}/api/auth/resend-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
        }),
      });

      const data = await response.json();

      alert(data.message || "OTP sent");
    } catch (error) {
      console.error(error);
      alert("Unable to resend OTP");
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Section */}
      <div className="hidden lg:flex w-1/2 bg-linear-to-br from-violet-700 via-indigo-700 to-purple-800 text-white items-center justify-center p-12">
        <div className="max-w-md">
          <h1 className="text-6xl font-bold mb-6">
            Join Campusly
          </h1>

          <p className="text-xl text-violet-100 leading-relaxed">
            Become part of your campus community. Discover events,
            connect with students, buy and sell items, and stay updated.
          </p>

          <div className="grid grid-cols-2 gap-4 mt-10">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4">
              🎉 Events
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4">
              💬 Chat
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4">
              📢 Announcements
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4">
              🛒 Marketplace
            </div>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex-1 flex items-center justify-center bg-gray-50 px-6 py-10">
        <div className="w-full max-w-lg bg-white rounded-3xl shadow-xl p-8">

          {!showOtpVerification ? (
            <>
              <div className="text-center">
                <h2 className="text-4xl font-bold text-gray-900">
                  Create Account
                </h2>

                <p className="text-gray-500 mt-2">
                  Register using your official university email
                </p>
              </div>

              <form onSubmit={handleSignup} className="mt-8 space-y-4">

                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border rounded-xl"
                />

                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border rounded-xl"
                />

                <input
                  type="email"
                  name="email"
                  placeholder="Official University Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border rounded-xl"
                />

                <select
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border rounded-xl"
                >
                  <option value="">Select Department</option>

                  {departments.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>

                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border rounded-xl"
                >
                  <option value="student">Student</option>
                  <option value="teacher">Teacher</option>
                </select>

                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border rounded-xl"
                />

                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border rounded-xl"
                />

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-violet-600 text-white rounded-xl font-semibold hover:bg-violet-700"
                >
                  {loading ? "Creating Account..." : "Create Account"}
                </button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-gray-600">
                  Already have an account?
                </p>

                <Link to="/login">
                  <button className="mt-3 w-full py-3 border border-violet-600 text-violet-600 rounded-xl font-semibold hover:bg-violet-50">
                    Login
                  </button>
                </Link>
              </div>
            </>
          ) : (
            <>
              <div className="text-center">
                <h2 className="text-4xl font-bold text-gray-900">
                  Verify Email
                </h2>

                <p className="text-gray-500 mt-3">
                  Enter the OTP sent to
                </p>

                <p className="font-semibold text-violet-600">
                  {formData.email}
                </p>
              </div>

              <form
                onSubmit={handleVerifyOtp}
                className="mt-8 space-y-4"
              >
                <input
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                  className="w-full px-4 py-3 border rounded-xl text-center text-lg tracking-widest"
                />

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-violet-600 text-white rounded-xl font-semibold"
                >
                  {loading ? "Verifying..." : "Verify OTP"}
                </button>

                <button
                  type="button"
                  onClick={handleResendOtp}
                  className="w-full py-3 border border-violet-600 text-violet-600 rounded-xl font-semibold"
                >
                  Resend OTP
                </button>
              </form>
            </>
          )}

          <p className="mt-6 text-center text-sm text-gray-400">
            Only verified KUK students and teachers can register.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;