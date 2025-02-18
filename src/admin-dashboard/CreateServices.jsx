// src/components/CreateService.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const CreateService = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [detailPage, setDetailPage] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [responseMessage, setResponseMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("detailPage", detailPage);
    if (imageFile) {
      formData.append("imageFile", imageFile);
    }

    try {
      const response = await axios.post(
        "https://kivu-back-end.onrender.com/api/cards",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        setResponseMessage("Card created successfully!");
        setTimeout(() => {
          navigate("/dashboard"); // Redirect to the dashboard after success
        }, 2000);
      }
    } catch (error) {
      setResponseMessage(
        "Error: " + error.response?.data?.message || "Failed to submit data"
      );
      console.error("Error:", error);
    }
  };

  return (
    <div className="bg-gray-100 p-6">
      <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Create New Service</h1>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="mb-4">
            <label
              htmlFor="imageFile"
              className="block text-gray-700 font-bold"
            >
              Image:
            </label>
            <input
              type="file"
              name="imageFile"
              id="imageFile"
              onChange={(e) => setImageFile(e.target.files[0])}
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700 font-bold">
              Title:
            </label>
            <input
              type="text"
              name="title"
              id="title"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
          </div>
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
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
          </div>
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
              placeholder="Detail Page URL"
              value={detailPage}
              onChange={(e) => setDetailPage(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Create Card
          </button>
        </form>
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
