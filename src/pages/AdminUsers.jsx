import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

const AdminUsers = () => {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const res = await api.get("api/users/admin");
      setUsers(res.data.users || res.data);
      console.log(res.data.users);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  useEffect(() => {
    if (currentUser?.role === "admin") {
      fetchUsers();
    }
  }, [currentUser]);

  const toggleStatus = async (id,currentStatus) => {
    try {
      await api.patch(`api/users/admin/${id}/status`,{
        isVerified:!currentStatus,
      });
      fetchUsers();
    } catch (err) {
      console.error("Error updating user status:", err);
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Delete this user?")) return;

    try {
      await api.delete(`api/users/admin/${id}`);
      fetchUsers();
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  if (currentUser?.role !== "admin") {
    return (
      <div className="p-6 text-center text-red-500">
        Access Denied
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">
        Admin User Management
      </h1>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="w-full">
          <thead className="bg-slate-100">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Role</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr
                  key={user._id}
                  className="border-t hover:bg-slate-50"
                >
                  <td className="p-3">{user.name}</td>
                  <td className="p-3">{user.email}</td>
                  <td className="p-3 capitalize">{user.role}</td>

                  <td className="p-3">
                    {user.isVerified
                      ? "✅ Verified"
                      : "❌ Unverified"}
                  </td>

                  <td className="p-3 flex gap-2">
                    <button
                      onClick={() => toggleStatus(user._id,user.isVerified)}
                      className="px-3 py-1 bg-blue-500 text-white rounded"
                    >
                      {user.isVerified
                        ? "Unverify"
                        : "Verify"}
                    </button>

                    {user._id !== currentUser?._id && (
                      <button
                        onClick={() => deleteUser(user._id)}
                        className="px-3 py-1 bg-red-500 text-white rounded"
                      >
                        Delete
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="p-6 text-center text-gray-500"
                >
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUsers;