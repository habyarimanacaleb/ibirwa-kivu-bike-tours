// src/pages/Contacts.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export const Contacts = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [responseMessage, setResponseMessage] = useState("");
  const [responseClass, setResponseClass] = useState("hidden");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://kivu-back-end.onrender.com/api/contact",
        {
          method: "POST",
          body: JSON.stringify(formData),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const result = await response.json();

      if (response.ok) {
        setResponseMessage("Contact information submitted successfully!");
        setResponseClass("text-green-600 font-bold");
        setTimeout(() => {
          setResponseClass("hidden");
          setFormData({ name: "", email: "", message: "" });
        }, 3000);
        navigate("/");
      } else {
        setResponseMessage("Error: " + result.message);
        setResponseClass("text-red-600 font-bold");
      }
    } catch (err) {
      setResponseMessage("Error: Failed to submit data");
      setResponseClass("text-red-600 font-bold");
      console.error("Error:", err);
    }
  };

  return (
    <div className="bg-gray-100 p-6 mt-10 min-h-[100vh]">
      <Navbar />
      <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Contact Us</h1>
        <form id="contactForm" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-bold">
              Name:
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-bold">
              Email:
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="message" className="block text-gray-700 font-bold">
              Message:
            </label>
            <textarea
              name="message"
              id="message"
              value={formData.message}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-black text-white px-4 py-2 rounded hover:bg-black-200"
          >
            Submit
          </button>
        </form>
        <p id="responseMessage" className={`mt-4 ${responseClass}`}>
          {responseMessage}
        </p>
      </div>
    </div>
  );
};
