import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../services/api";

export default function EditProfile() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    department: "",
    email: "",
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const { data } = await api.get("/api/auth/me");

      setFormData({
        name: data.user.name || "",
        username: data.user.username || "",
        department: data.user.department || "",
        email: data.user.email || "",
      });
    } catch (error) {
      toast.error("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      await api.put("/api/users/profile", {
        name: formData.name,
        username: formData.username,
        department: formData.department,
      });

      toast.success("Profile updated successfully");

      navigate("/profile");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to update profile"
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <h2 className="text-xl font-semibold text-violet-600">
          Loading...
        </h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4">

      <div className="max-w-3xl mx-auto">

        <div className="bg-white rounded-3xl shadow-lg overflow-hidden">

          {/* Header */}

          <div className="bg-gradient-to-r from-violet-700 via-indigo-700 to-purple-800 h-40 relative">

            <div className="absolute left-1/2 -bottom-14 -translate-x-1/2">

              <div className="w-28 h-28 rounded-full bg-white shadow-lg flex items-center justify-center text-4xl font-bold text-violet-700 border-4 border-white">
                {formData.name?.charAt(0).toUpperCase()}
              </div>

            </div>

          </div>

          {/* Form */}

          <div className="pt-20 px-8 pb-8">

            <h1 className="text-3xl font-bold text-center">
              Edit Profile
            </h1>

            <p className="text-gray-500 text-center mt-2">
              Update your Campusly profile information
            </p>

            <form
              onSubmit={handleSubmit}
              className="mt-8 space-y-6"
            >

              <div>
                <label className="block mb-2 font-medium">
                  Full Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-violet-500 outline-none"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">
                  Username
                </label>

                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-violet-500 outline-none"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">
                  Department
                </label>

                <input
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-violet-500 outline-none"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">
                  Email
                </label>

                <input
                  type="email"
                  value={formData.email}
                  disabled
                  className="w-full border rounded-xl px-4 py-3 bg-gray-100 cursor-not-allowed"
                />
              </div>

              <div className="flex gap-4 pt-4">

                <button
                  type="button"
                  onClick={() => navigate("/profile")}
                  className="flex-1 border border-gray-300 py-3 rounded-xl hover:bg-gray-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 bg-violet-600 text-white py-3 rounded-xl hover:bg-violet-700 disabled:opacity-50"
                >
                  {saving
                    ? "Saving..."
                    : "Save Changes"}
                </button>

              </div>

            </form>

          </div>

        </div>

      </div>

    </div>
  );
}