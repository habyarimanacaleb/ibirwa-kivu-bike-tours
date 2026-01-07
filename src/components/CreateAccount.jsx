import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
export const CreateAccount = ({ onSwitchToSignIn }) => {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
  
    try {
      const response = await fetch("https://v2.ibirwakivubiketours.com/api/ibirwa-clients/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
      console.log("API Response:", data);
  
      if (response.ok || data.message?.includes("Signup successful")) {
        setFormData({ email: "", username: "", password: "" });
        navigate("/login");
      } else {
        setError(data.message || "Signup failed");
      }
    } catch (error) {
      setError(`An error occurred: ${error.message}`);
      console.error("Signup error:", error);
    } finally {
      setLoading(false);
    }
  };
  

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
    <Navbar />
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg p-4">
        <div className="flex justify-center mb-4 flex-col items-center">
          <img src="/kivu-image/bt-logo-52.png" alt="our logo" className="w-13 h-13 rounded-full"/>
          <h1 className="text-2xl font-bold text-center mb-2">Ibirwa Kivu Bike Tours</h1>
          <h2 className="text-2xl font-bold text-center mb-4">Create Account</h2>
        </div>
        <div className="flex justify-between border-b border-gray-200 pb-3">
          <button
            className="w-1/2 text-center font-semibold pb-2 text-gray-400"
            onClick={onSwitchToSignIn} 
          >
            Sign In
          </button>
          <button className="w-1/2 text-center font-semibold pb-2 border-b-2 border-blue-500 text-blue-500">
            Create Account
          </button>
        </div>

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

        <form className="mt-4" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your Email"
              autoComplete="email"
              className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm text-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your Username"
              autoComplete="username"
              className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm text-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your Password"
              autoComplete="current-password"
              className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm text-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-black text-white font-semibold rounded-lg shadow-md hover:bg-black-200 focus:ring-2 focus:ring-black-300 focus:ring-offset-2"
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>
      </div>
    </div>
    </>
  );
};

export default CreateAccount;
