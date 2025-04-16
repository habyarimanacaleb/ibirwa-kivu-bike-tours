import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const CreateServices = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [detailPage, setDetailPage] = useState("");
  const [highlights, setHighlights] = useState([""]);
  const [tips, setTips] = useState([""]);
  const [whatsapp, setWhatsapp] = useState("");
  const [email, setEmail] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [responseMessage, setResponseMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchServiceDetails = async () => {
      try {
        const response = await axios.get(
          "https://kivu-back-end.onrender.com/api/services/67c0f47f02c5888782662aca"
        );
        const service = response.data;
        console.log("Fetched service details:", service);
        setTitle(service.title);
        setDescription(service.description);
        setDetailPage(service.detailPage);
        setHighlights(service.details.highlights);
        setTips(service.details.tips);
        setWhatsapp(service.details.whatsapp);
        setEmail(service.details.email);
      } catch (error) {
        console.error("Error fetching service details:", error);
      }
    };

    fetchServiceDetails();
  }, []);

  const handleAddHighlight = () => setHighlights([...highlights, ""]);
  const handleAddTip = () => setTips([...tips, ""]);

  const handleHighlightChange = (index, value) => {
    const newHighlights = [...highlights];
    newHighlights[index] = value;
    setHighlights(newHighlights);
  };

  const handleTipChange = (index, value) => {
    const newTips = [...tips];
    newTips[index] = value;
    setTips(newTips);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("detailPage", detailPage);
    formData.append(
      "details",
      JSON.stringify({
        highlights,
        tips,
        whatsapp,
        email,
      })
    );
    if (imageFile) {
      formData.append("imageFile", imageFile);
    }

    try {
      const response = await axios.post(
        "https://kivu-back-end.onrender.com/api/services",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        setResponseMessage("Service created successfully!");
        setTimeout(() => {
          navigate("/tour-services");
        }, 2000);
      }
    } catch (error) {
      console.error("Error response:", error.response);
      if (error.response) {
        console.error("Error data:", error.response.data);
        console.error("Error status:", error.response.status);
        console.error("Error headers:", error.response.headers);
      }
      setResponseMessage(
        "Error: " + (error.response?.data?.message || "Failed to submit data")
      );
      console.error("Error:", error);
    }
  };

  return (
    <div className="bg-gray-100 p-6">
      <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Create New Service</h1>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          {/* Title Field */}
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700 font-bold">
              Title:
            </label>
            <input
              type="text"
              name="title"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
          </div>

          {/* Description Field */}
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-gray-700 font-bold"
            >
              Description:
            </label>
            <textarea
              name="description"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
          </div>

          {/* Detail Page Field */}
          <div className="mb-4">
            <label
              htmlFor="detailPage"
              className="block text-gray-700 font-bold"
            >
              Detail Page URL:
            </label>
            <input
              type="text"
              name="detailPage"
              id="detailPage"
              value={detailPage}
              onChange={(e) => setDetailPage(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
          </div>

          {/* Highlights Field */}
          <div className="mb-4">
            <label
              htmlFor="highlights"
              className="block text-gray-700 font-bold"
            >
              Highlights:
            </label>
            {highlights.map((highlight, index) => (
              <input
                key={index}
                type="text"
                value={highlight}
                onChange={(e) => handleHighlightChange(index, e.target.value)}
                className="w-full border border-gray-300 p-2 rounded mb-2"
                required
              />
            ))}
            <button
              type="button"
              onClick={handleAddHighlight}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Add Highlight
            </button>
          </div>

          {/* Tips Field */}
          <div className="mb-4">
            <label htmlFor="tips" className="block text-gray-700 font-bold">
              Tips:
            </label>
            {tips.map((tip, index) => (
              <input
                key={index}
                type="text"
                value={tip}
                onChange={(e) => handleTipChange(index, e.target.value)}
                className="w-full border border-gray-300 p-2 rounded mb-2"
                required
              />
            ))}
            <button
              type="button"
              onClick={handleAddTip}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Add Tip
            </button>
          </div>

          {/* Whatsapp Field */}
          <div className="mb-4">
            <label htmlFor="whatsapp" className="block text-gray-700 font-bold">
              Whatsapp:
            </label>
            <input
              type="text"
              name="whatsapp"
              id="whatsapp"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
          </div>

          {/* Email Field */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-bold">
              Email:
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
          </div>

          {/* Image Upload */}
          <div className="mb-4">
            <label
              htmlFor="imageFile"
              className="block text-gray-700 font-bold"
            >
              Upload Image:
            </label>
            <input
              type="file"
              name="imageFile"
              id="imageFile"
              onChange={(e) => setImageFile(e.target.files[0])}
              className="w-full border border-gray-300 p-2 rounded"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Create Service
          </button>
        </form>

        {/* Response Message */}
        {responseMessage && (
          <p
            className={`mt-4 font-bold ${
              responseMessage.includes("Error")
                ? "text-red-600"
                : "text-green-600"
            }`}
          >
            {responseMessage}
          </p>
        )}
      </div>
    </div>
  );
};
