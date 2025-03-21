import React, { useState } from "react";
import axios from "axios";

const TourInquiryForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    destination: "",
    paxNumber: "",
    checkinDate: "",
    checkoutDate: "",
  });
  const [responseMessage, setResponseMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponseMessage("");

    try {
      const response = await fetch(
        "https://kivu-back-end.onrender.com/api/inquiries",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      setResponseMessage(data.message);
      setFormData({
        name: "",
        email: "",
        destination: "",
        paxNumber: "",
        checkinDate: "",
        checkoutDate: "",
      });
    } catch (error) {
      setResponseMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false);
      setTimeout(() => setResponseMessage(""), 3000);
    }
  };

  return (
    <div className="text-white pt-10 pb-2 px-5 md:px-20 mt-[-15px] z-10">
      <div className="w-full lg:max-w-3xl mx-auto bg-gray-900 p-6 rounded-lg shadow-lg mb-2">
        <h2 className="text-2xl font-semibold text-center mb-4">
          Plan Your Tour
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter Name (Optional)"
              className="p-3 w-full bg-gray-800 text-white rounded-md focus:ring-2 focus:ring-green-500"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter Email"
              required
              className="p-3 w-full bg-gray-800 text-white rounded-md focus:ring-2 focus:ring-green-500"
            />
            <input
              type="text"
              name="destination"
              value={formData.destination}
              onChange={handleChange}
              placeholder="Enter Destination"
              required
              className="p-3 w-full bg-gray-800 text-white rounded-md focus:ring-2 focus:ring-green-500"
            />
            <input
              type="number"
              name="paxNumber"
              value={formData.paxNumber}
              onChange={handleChange}
              placeholder="No. of People"
              required
              className="p-3 w-full bg-gray-800 text-white rounded-md focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="date"
              name="checkinDate"
              value={formData.checkinDate}
              onChange={handleChange}
              required
              className="p-3 w-full bg-gray-800 text-white rounded-md focus:ring-2 focus:ring-green-500"
            />
            <input
              type="date"
              name="checkoutDate"
              value={formData.checkoutDate}
              onChange={handleChange}
              required
              className="p-3 w-full bg-gray-800 text-white rounded-md focus:ring-2 focus:ring-green-500"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-500 text-black font-semibold py-3 rounded-md hover:bg-green-600 transition"
          >
            {loading ? "Submitting..." : "Inquire Now"}
          </button>
        </form>
        {responseMessage && (
          <p
            className={`text-sm py-2 text-center ${
              responseMessage.includes("Error")
                ? "text-red-500"
                : "text-green-500"
            }`}
          >
            {responseMessage}
          </p>
        )}
      </div>
    </div>
  );
};

export default TourInquiryForm;
