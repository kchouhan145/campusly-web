import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

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
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-lg p-8">

        <div className="flex flex-col items-center">

          <div className="w-28 h-28 rounded-full bg-violet-100 flex items-center justify-center text-4xl font-bold text-violet-700">
            {user.name?.charAt(0).toUpperCase()}
          </div>

          <h1 className="mt-4 text-3xl font-bold">
            {user.name}
          </h1>

          <p className="text-gray-500">
            @{user.username}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-10">

          <div className="border rounded-2xl p-5">
            <h3 className="font-semibold mb-2">
              Email
            </h3>
            <p>{user.email}</p>
          </div>

          <div className="border rounded-2xl p-5">
            <h3 className="font-semibold mb-2">
              Department
            </h3>
            <p>{user.department}</p>
          </div>

          <div className="border rounded-2xl p-5">
            <h3 className="font-semibold mb-2">
              Role
            </h3>
            <p className="capitalize">
              {user.role}
            </p>
          </div>

          <div className="border rounded-2xl p-5">
            <h3 className="font-semibold mb-2">
              Joined
            </h3>
            <p>
              {new Date(user.createdAt).toLocaleDateString()}
            </p>
          </div>

        </div>

        <div className="mt-10 flex gap-4">

          <button className="px-6 py-3 bg-violet-600 text-white rounded-xl hover:bg-violet-700" oncl onClick={()=>{toast.warning("Coming Soon.......")}}>
            Edit Profile
          </button>

          <button
            onClick={logout}
            className="px-6 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600"
          >
            Logout
          </button>

        </div>
      </div>
    </div>
  );
}