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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(
        "https://v2.ibirwakivubiketours.com/api/contact",
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
        setFormData({ name: "", email: "", message: "" });

        setTimeout(() => {
          setResponseClass("hidden");
          navigate("/");
        },1000);
      } else {
        setResponseMessage("Error: " + result.message);
        setResponseClass("text-red-600 font-bold");
      }
    } catch (err) {
      setResponseMessage("Error: Failed to submit data");
      setResponseClass("text-red-600 font-bold");
      console.error("Error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />

      <div className="mx-auto h-screen grid grid-cols-1 md:grid-cols-2">
        {/* LEFT: Description */}
        <div className="contact-left bg-white px-6 md:px-10 py-10 h-full flex flex-col justify-center shadow-lg">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-center md:text-left">
            Get in Touch
          </h2>
          <p className="text-lg md:text-xl font-sans leading-relaxed text-center md:text-left">
            Have a question, feedback, or inquiry? Reach out to us and we'll respond as soon as possible.
            <br /><br />
            <span className="font-semibold">Ibirwa Kivu Bike Tours</span> is here to provide unforgettable tour experiences across the stunning Karongi region and the shores of Lake Kivu.
          </p>
        </div>

        {/* RIGHT: Contact Form */}
        <div className="bg-white px-6 py-10 md:px-10 flex flex-col justify-center shadow-lg">
          <div className="w-full max-w-lg mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-center">Contact Us</h1>
            <form id="contactForm" onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 font-semibold mb-1">
                  Name:
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-3 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 font-semibold mb-1">
                  Email:
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-3 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="message" className="block text-gray-700 font-semibold mb-1">
                  Message:
                </label>
                <textarea
                  name="message"
                  id="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="w-full border border-gray-300 p-3 rounded"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-black text-white py-3 rounded font-semibold hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </form>
            <p id="responseMessage" className={`mt-4 text-center ${responseClass}`}>
              {responseMessage}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
