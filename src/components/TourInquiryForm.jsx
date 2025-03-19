import React, { useState } from "react";

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Inquiry Submitted:", formData);
    setResponseMessage("Inquiry submitted successfully!");
    setFormData({
      name: "",
      email: "",
      destination: "",
      paxNumber: "",
      checkinDate: "",
      checkoutDate: "",
    });
    setTimeout(() => {
      setResponseMessage("");
    }, 3000);
  };

  return (
    <div className=" text-white pt-10 pb-2 px-5  md:px-20 mt-[-15px] z-10">
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
              type="text"
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
              type="text"
              name="checkinDate"
              value={formData.checkinDate}
              onChange={handleChange}
              placeholder="Checkin Date (dd/mm/yyyy)"
              required
              className="p-3 w-full bg-gray-800 text-white rounded-md focus:ring-2 focus:ring-green-500"
            />
            <input
              type="text"
              name="checkoutDate"
              value={formData.checkoutDate}
              onChange={handleChange}
              placeholder="Checkout Date (dd/mm/yyyy)"
              required
              className="p-3 w-full bg-gray-800 text-white rounded-md focus:ring-2 focus:ring-green-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-black font-semibold py-3 rounded-md hover:bg-green-600 transition"
          >
            Inquire Now
          </button>
        </form>
        <p className="text-green-500 text-sm py-2 text-center">
          {responseMessage}
        </p>
      </div>
    </div>
  );
};

export default TourInquiryForm;
