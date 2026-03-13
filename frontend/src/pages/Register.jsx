import { useState } from "react";
import api from "../api/api";
import toast from "react-hot-toast";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    dob: "",
    gender: "",
    grade: "",
    phone: "",
    guardian: "",
    address: ""
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.post("/register", formData);
      toast.success(response.data.message);
      setFormData({
        name: "",
        email: "",
        password: "",
        dob: "",
        gender: "",
        grade: "",
        phone: "",
        guardian: "",
        address: ""
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white w-full max-w-3xl p-8 rounded-lg shadow-md border border-gray-300">
        <h2 className="text-2xl font-bold mb-6 text-center">Student Registration</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Row 1: Name + Email */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block mb-1 font-medium">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                placeholder="Full Name"
                required
              />
            </div>
            <div className="flex-1">
              <label className="block mb-1 font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                placeholder="Email"
                required
              />
            </div>
          </div>

          {/* Row 2: Password + DOB */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block mb-1 font-medium">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                placeholder="Password"
                required
              />
            </div>
            <div className="flex-1">
              <label className="block mb-1 font-medium">Date of Birth</label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                required
              />
            </div>
          </div>

          {/* Row 3: Gender + Grade */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block mb-1 font-medium">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="flex-1">
              <label className="block mb-1 font-medium">Class / Grade</label>
              <input
                type="text"
                name="grade"
                value={formData.grade}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                placeholder="Grade / Class"
                required
              />
            </div>
          </div>

          {/* Row 4: Phone + Guardian */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block mb-1 font-medium">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                placeholder="Phone Number"
                required
              />
            </div>
            <div className="flex-1">
              <label className="block mb-1 font-medium">Parent/Guardian Name</label>
              <input
                type="text"
                name="guardian"
                value={formData.guardian}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                placeholder="Guardian Name"
                required
              />
            </div>
          </div>

          {/* Row 5: Address (full row) */}
          <div>
            <label className="block mb-1 font-medium">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-green-400"
              placeholder="Address"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Registering..." : "Register Student"}
          </button>

          <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <a href="/" className="text-green-600 hover:underline">
            Login here
          </a>
        </p>
        </form>
      </div>
    </div>
  );
}

export default Register;