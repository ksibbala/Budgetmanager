import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../services/axios";
import { useAuth } from "../context/AuthContext";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/auth/login", { email, password });
      login(response.data.token);
      navigate("/");
    } catch (err) {
      setError("Invalid credentials. Please try again.");
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

      {/* Typing effect welcome text */}
      <div
        className="absolute top-20 text-center text-4xl font-extrabold text-white"
        style={{
          zIndex: 1, // Ensure it's above the overlay
        }}
      >
        <div className="typing-effect">
          <span className="hidden sm:inline">Welcome to </span>
          <span className="text-indigo-600">Budget Manager</span>
        </div>
      </div>

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
          Login
        </h2>

        {error && <div className="text-red-600 text-sm mb-4">{error}</div>}

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-800 mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800"
              required
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-800 mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition duration-300"
          >
            Login
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-sm">
            Not a user?{" "}
            <span
              onClick={() => navigate("/register")}
              className="text-indigo-600 cursor-pointer hover:underline font-bold text-lg"
            >
              Register here
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;