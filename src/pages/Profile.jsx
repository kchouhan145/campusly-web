import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

export default function Profile() {
  const { getProfile, logout } = useAuth();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile();
        setUser(data.user);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProfile();
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-pulse text-xl font-semibold text-violet-600">
          Loading Profile...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Hero Section */}

      <section className="bg-linear-to-r from-violet-700 via-indigo-700 to-purple-800 text-white">
        <div className="max-w-6xl mx-auto px-6 py-16">

          <div className="flex flex-col md:flex-row items-center gap-8">

            <div className="relative">
              <div className="w-36 h-36 rounded-full bg-white/20 backdrop-blur-lg border-4 border-white overflow-hidden shadow-2xl">
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-5xl font-bold text-white">
                    {user?.name?.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>

              <div className="absolute bottom-3 right-3 w-6 h-6 bg-green-500 border-4 border-white rounded-full"></div>
            </div>

            <div>
              <h1 className="text-5xl font-bold">
                {user.name}
              </h1>

              <p className="text-violet-100 text-lg mt-2">
                @{user.username}
              </p>

              <span className="inline-block mt-4 px-4 py-2 rounded-full bg-white/20 backdrop-blur-md text-sm font-semibold capitalize">
                {user.role}
              </span>
            </div>

          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 -mt-10 pb-12">

        {/* Stats */}

        <div className="grid md:grid-cols-3 gap-6">

          <div className="bg-white rounded-3xl p-6 shadow-lg">
            <h3 className="text-gray-500 text-sm">
              Department
            </h3>

            <p className="text-2xl font-bold mt-2">
              {user.department}
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-lg">
            <h3 className="text-gray-500 text-sm">
              Member Since
            </h3>

            <p className="text-2xl font-bold mt-2">
              {new Date(user.createdAt).toLocaleDateString()}
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-lg">
            <h3 className="text-gray-500 text-sm">
              Account Status
            </h3>

            <p className="text-green-600 text-2xl font-bold mt-2">
              Active
            </p>
          </div>

        </div>

        {/* Profile Information */}

        <div className="grid lg:grid-cols-2 gap-6 mt-8">

          <div className="bg-white rounded-3xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold mb-6">
              Personal Information
            </h2>

            <div className="space-y-5">

              <div>
                <p className="text-sm text-gray-500">
                  Full Name
                </p>
                <p className="font-semibold text-lg">
                  {user.name}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Username
                </p>
                <p className="font-semibold text-lg">
                  @{user.username}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Email Address
                </p>
                <p className="font-semibold text-lg break-all">
                  {user.email}
                </p>
              </div>

            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold mb-6">
              Campus Details
            </h2>

            <div className="space-y-5">

              <div>
                <p className="text-sm text-gray-500">
                  Department
                </p>
                <p className="font-semibold text-lg">
                  {user.department}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Role
                </p>
                <p className="font-semibold text-lg capitalize">
                  {user.role}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Joined On
                </p>
                <p className="font-semibold text-lg">
                  {new Date(user.createdAt).toLocaleDateString()}
                </p>
              </div>

            </div>
          </div>

        </div>

        {/* Quick Actions */}

        <div className="bg-white rounded-3xl p-8 shadow-lg mt-8">

          <h2 className="text-2xl font-bold mb-6">
            Account Actions
          </h2>

          <div className="flex flex-wrap gap-4">

            <Link to='/edit-profile'>
              <button
                className="px-6 py-3 bg-violet-600 text-white rounded-xl font-semibold hover:bg-violet-700 transition"
              >
                Edit Profile
              </button>
            </Link>

            {/* <button
              onClick={() =>
                toast.info("Password change coming soon")
              }
              className="px-6 py-3 border border-violet-600 text-violet-600 rounded-xl font-semibold hover:bg-violet-50 transition"
            >
              Change Password
            </button> */}

            <button
              onClick={logout}
              className="px-6 py-3 bg-red-500 text-white rounded-xl font-semibold hover:bg-red-600 transition"
            >
              Logout
            </button>

          </div>

        </div>

      </div>
    </div>
  );
}