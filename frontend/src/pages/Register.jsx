import { useState, useEffect } from "react";
import api from "../api/api";
import toast from "react-hot-toast";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState(null); // Track user being edited

  // Fetch users
  const fetchUsers = async () => {
    try {
      const response = await api.get("/users");
      setUsers(response.data);
    } catch (error) {
      toast.error("Failed to fetch users");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Submit new or updated user
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editId) {
        // UPDATE
        const response = await api.put(`/users/${editId}`, formData);
        toast.success(response.data.message);
        setEditId(null);
      } else {
        // CREATE
        const response = await api.post("/register", formData);
        toast.success(response.data.message);
      }

      setFormData({ name: "", email: "", password: "" });
      fetchUsers(); // Refresh table

    } catch (error) {
      toast.error(error.response?.data?.message || "Operation failed");
    } finally {
      setLoading(false);
    }
  };

  // Load user into form for editing
  const handleEdit = (user) => {
    setFormData({ name: user.name, email: user.email, password: "" });
    setEditId(user.id);
    window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to form
  };

  // Delete user
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      const response = await api.delete(`/users/${id}`);
      toast.success(response.data.message);
      fetchUsers();
    } catch (error) {
      toast.error(error.response?.data?.message || "Delete failed");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gray-100 py-10">

      {/* Registration Form */}
      <div className="bg-white p-8 w-96 border border-gray-300 mb-10">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {editId ? "Edit User" : "Register"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border p-2"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border p-2"
          />

          <input
            type="password"
            name="password"
            placeholder={editId ? "New Password (optional)" : "Password"}
            value={formData.password}
            onChange={handleChange}
            className="w-full border p-2"
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-blue-600 text-white py-2 hover:bg-blue-700 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {loading ? (editId ? "Updating..." : "Creating...") : (editId ? "Update User" : "Create Account")}
          </button>

        </form>
      </div>

      {/* Users Table */}
      <div className="w-11/12 md:w-3/4 lg:w-2/3 bg-white p-6 border border-gray-300">
        <h2 className="text-xl font-bold mb-4 text-center">Registered Users</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 text-left">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2 border">ID</th>
                <th className="px-4 py-2 border">Name</th>
                <th className="px-4 py-2 border">Email</th>
                <th className="px-4 py-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center py-4 border">
                    No users yet
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-4 py-2 border">{user.id}</td>
                    <td className="px-4 py-2 border">{user.name}</td>
                    <td className="px-4 py-2 border">{user.email}</td>
                    <td className="px-4 py-2 border flex gap-2">
                      <button
                        onClick={() => handleEdit(user)}
                        className="bg-yellow-400 text-white px-2 py-1 hover:bg-yellow-500"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="bg-red-600 text-white px-2 py-1 hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}

export default Register;