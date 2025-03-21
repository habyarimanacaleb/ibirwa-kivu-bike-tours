import React, { useEffect, useState } from "react";
import axios from "axios";

const TourInquiriesDashboard = () => {
  const [inquiries, setInquiries] = useState([]);
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [responseMessage, setResponseMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    try {
      const response = await axios.get(
        "https://kivu-back-end.onrender.com/api/inquiries"
      );
      setInquiries(response.data);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        alert("Inquiries not found. Please check the API endpoint.");
      } else {
        console.error("Error fetching inquiries:", error);
      }
    }
  };

  const handleRespond = async (id) => {
    if (!responseMessage.trim()) return alert("Response message is required.");
    setLoading(true);

    try {
      await axios.post(
        `https://kivu-back-end.onrender.com/api/inquiries/respond/${id}`,
        { responseMessage }
      );
      alert("Response sent successfully!");
      setResponseMessage("");
      setSelectedInquiry(null);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        alert("Inquiry not found. Please check the API endpoint.");
      } else {
        console.error("Error sending response:", error);
        alert("Failed to send response.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this inquiry?"))
      return;

    try {
      await axios.delete(
        `https://kivu-back-end.onrender.com/api/inquiries/${id}`
      );
      alert("Inquiry deleted successfully!");
      fetchInquiries();
    } catch (error) {
      if (error.response && error.response.status === 404) {
        alert("Inquiry not found. Please check the API endpoint.");
      } else {
        console.error("Error deleting inquiry:", error);
        alert("Failed to delete inquiry.");
      }
    }
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">Tour Inquiries Dashboard</h1>
      <div className="space-y-4">
        {inquiries.map((inquiry) => (
          <div
            key={inquiry._id}
            className="p-4 bg-gray-800 text-white rounded-md shadow-md"
          >
            <p>
              <strong>Name:</strong> {inquiry.name || "Not provided"}
            </p>
            <p>
              <strong>Email:</strong> {inquiry.email}
            </p>
            <p>
              <strong>Destination:</strong> {inquiry.destination}
            </p>
            <p>
              <strong>No. of People:</strong> {inquiry.paxNumber}
            </p>
            <p>
              <strong>Check-in Date:</strong> {inquiry.checkinDate}
            </p>
            <p>
              <strong>Check-out Date:</strong> {inquiry.checkoutDate}
            </p>
            <div className="mt-2 space-x-2">
              <button
                onClick={() => setSelectedInquiry(inquiry)}
                className="bg-blue-500 px-3 py-1 rounded-md"
              >
                Respond
              </button>
              <button
                onClick={() => handleDelete(inquiry._id)}
                className="bg-red-500 px-3 py-1 rounded-md"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedInquiry && (
        <div className="mt-5 p-4 bg-gray-900 text-white rounded-md shadow-md">
          <h2 className="text-xl font-bold mb-2">Respond to Inquiry</h2>
          <p>
            <strong>To:</strong> {selectedInquiry.email}
          </p>
          <textarea
            value={responseMessage}
            onChange={(e) => setResponseMessage(e.target.value)}
            placeholder="Type your response here..."
            className="w-full p-2 mt-2 bg-gray-800 text-white rounded-md"
          />
          <div className="mt-2 space-x-2">
            <button
              onClick={() => handleRespond(selectedInquiry._id)}
              disabled={loading}
              className="bg-green-500 px-3 py-1 rounded-md"
            >
              {loading ? "Sending..." : "Send Response"}
            </button>
            <button
              onClick={() => setSelectedInquiry(null)}
              className="bg-gray-500 px-3 py-1 rounded-md"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TourInquiriesDashboard;
