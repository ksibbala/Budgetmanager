import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../services/axios";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(""); // Clear error when the user types
    setSuccessMessage(""); // Clear success message when the user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true
    try {
      await axios.post("/api/users/register", formData);
      setSuccessMessage("Registration successful!");
      setError(""); // Clear any previous errors
      setFormData({ name: "", email: "", password: "" }); // Reset the form
    } catch (err) {
      setError("Registration failed. Please try again.");
      setSuccessMessage(""); // Clear any previous success messages
    } finally {
      setLoading(false); // Set loading to false after completion
    }
  };

  return (
    <div className="flex justify-center items-center h-screen relative">
      {/* Dark overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.6)", // Darker overlay for better readability
          zIndex: 0,
        }}
      ></div>

      {/* Form Container */}
      <div
        className="bg-white p-8 rounded-lg shadow-lg w-3/4 sm:w-96 md:w-1/2 lg:w-1/3 xl:w-1/4"
        style={{
          position: "relative",
          zIndex: 1, // Ensure the form is above the overlay
          backdropFilter: "blur(10px)", // Apply blur effect
          backgroundColor: "rgba(255, 255, 255, 0.6)", // Light background with transparency for glass effect
        }}
      >
        <h2 className="text-3xl font-bold text-center mb-6 text-indigo-600">
          Register
        </h2>

        {error && <div className="text-red-600 text-sm mb-4">{error}</div>}
        {successMessage && <div className="text-indigo-600 text-xl font-bold mb-4">{successMessage}</div>} {/* Success message */}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-800 mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-800 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-800 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition duration-300 flex justify-center items-center"
            disabled={loading} // Disable button when loading
          >
            {loading ? (
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                ></path>
              </svg>
            ) : (
              "Register"
            )}
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-sm">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-indigo-600 cursor-pointer hover:underline font-bold text-lg"
            >
              Login here
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;