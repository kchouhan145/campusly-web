import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../services/api";

export default function EditProfile() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState("");

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

      setAvatarPreview(data.user.avatar || "");
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

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setAvatar(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      const data = new FormData();

      data.append("name", formData.name);
      data.append("username", formData.username);
      data.append("department", formData.department);

      if (avatar) {
        data.append("avatar", avatar);
      }

      const response = await api.put(
        "/api/users/profile",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

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
          <div className="bg-linear-to-r from-violet-700 via-indigo-700 to-purple-800 h-44 relative">

            <div className="absolute left-1/2 -bottom-16 -translate-x-1/2">

              <label
                htmlFor="avatar"
                className="relative cursor-pointer group"
              >
                {avatarPreview ? (
                  <img
                    src={avatarPreview}
                    alt="Avatar"
                    className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-xl"
                  />
                ) : (
                  <div className="w-32 h-32 rounded-full bg-white shadow-xl flex items-center justify-center text-5xl font-bold text-violet-700 border-4 border-white">
                    {formData.name?.charAt(0).toUpperCase()}
                  </div>
                )}

                <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
                  <span className="text-white text-2xl">
                    📷
                  </span>
                </div>

                <input
                  id="avatar"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarChange}
                />
              </label>

            </div>
          </div>

          {/* Form */}
          <div className="pt-24 px-8 pb-8">

            <h1 className="text-3xl font-bold text-center">
              Edit Profile
            </h1>

            <p className="text-gray-500 text-center mt-2">
              Update your Campusly account information
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
                  className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-violet-500"
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
                  className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-violet-500"
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
                  className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-violet-500"
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
                  className="flex-1 border border-gray-300 py-3 rounded-xl hover:bg-gray-50 transition"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 bg-violet-600 text-white py-3 rounded-xl hover:bg-violet-700 disabled:opacity-50 transition"
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>

              </div>

            </form>

          </div>

        </div>

      </div>
    </div>
  );
}