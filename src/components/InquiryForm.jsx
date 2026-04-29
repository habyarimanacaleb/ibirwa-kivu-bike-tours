import React from "react";

const InquiryForm = ({handleSubmit,handleChange,responseMessage,loading,formData}) => {
  return (
    <div className="w-full">
         <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col gap-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter Name (Optional)"
              className="py-6 pr-6 pl-3 w-full placeholder:text-xl bg-gray-800 text-white rounded-md focus:ring-2 focus:ring-green-500"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter Email"
              required
              className="py-6 pr-6 pl-3 w-full placeholder:text-xl bg-gray-800 text-white rounded-md focus:ring-2 focus:ring-green-500"
            />
            <input
              type="text"
              name="destination"
              value={formData.destination}
              onChange={handleChange}
              placeholder="Enter Destination"
              required
              className="py-6 pr-6 pl-3 w-full placeholder:text-xl bg-gray-800 text-white rounded-md focus:ring-2 focus:ring-green-500"
            />
            <input
              type="number"
              name="paxNumber"
              value={formData.paxNumber}
              onChange={handleChange}
              placeholder="No. of People"
              required
              className="py-6 pr-6 pl-3 w-full placeholder:text-xl bg-gray-800 text-white rounded-md focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div className="flex flex-col gap-4">
            <input
              type="text"
              name="checkinDate"
              value={formData.checkinDate}
              onChange={handleChange}
              placeholder="Checkin Date"
              required
              className="py-6 pr-6 pl-3 w-full placeholder:text-xl bg-gray-800 text-white rounded-md focus:ring-2 focus:ring-green-500"
            />
            <input
              type="text"
              name="checkoutDate"
              value={formData.checkoutDate}
              onChange={handleChange}
              placeholder="Checkout Date"
              required
              className="py-6 pr-6 pl-3 w-full placeholder:text-xl bg-gray-800 text-white rounded-md focus:ring-2 focus:ring-green-500"
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
  );
};

export default InquiryForm;
