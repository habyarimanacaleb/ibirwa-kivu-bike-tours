import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import MainLayout from "../admin-panel/MainLayout";

const CreateGallery = () => {
  const [title, setTitle] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [responseMessage, setResponseMessage] = useState("");
  const [editingPhoto, setEditingPhoto] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const response = await axios.get(
          "https://kivu-back-end.onrender.com/api/gallery"
        );
        const data = response.data;
        const galleryArray = Array.isArray(data) ? data : data.gallery || [];
        setGallery(galleryArray);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchGallery();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    if (imageFile) {
      formData.append("imageFile", imageFile);
    }

    try {
      if (editingPhoto) {
        const response = await axios.put(
          `https://kivu-back-end.onrender.com/api/gallery/${editingPhoto._id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setGallery(
          gallery.map((photo) =>
            photo._id === editingPhoto._id ? response.data : photo
          )
        );
        setResponseMessage("Photo updated successfully!");
      } else {
        const response = await axios.post(
          "https://kivu-back-end.onrender.com/api/gallery",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setGallery([...gallery, response.data]);
        setResponseMessage("Photo uploaded successfully!");
      }
      setTimeout(() => {
        setResponseMessage("");
      }, 2000);
      setTitle("");
      setImageFile(null);
      setEditingPhoto(null);
    } catch (error) {
      setError(error);
      setResponseMessage(
        "Error: " + (error.response?.data?.message || "Failed to update data")
      );
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `https://kivu-back-end.onrender.com/api/gallery/${id}`
      );
      setGallery(gallery.filter((photo) => photo._id !== id));
      console.log("Photo deleted successfully!");
    } catch (error) {
      setError(error);
    }
  };

  const handleEdit = (photo) => {
    navigate(`/update-gallery/${photo._id}`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <MainLayout>
  <div className="h-screen bg-gray-100 flex items-center justify-center p-6">
    <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl border border-gray-200">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-t-2xl px-6 py-4">
        <h1 className="text-xl md:text-2xl font-bold text-white text-center">
          {editingPhoto ? "Update Gallery Photo" : "Create Gallery"}
        </h1>
        <p className="text-blue-100 text-sm text-center mt-1">
          Upload high-quality images for your website gallery
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        
        {/* Title */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Photo Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Sunset at Lake Kivu"
            required
            className="w-full rounded-lg border border-gray-300 px-4 py-2
              focus:ring-2 focus:ring-blue-500 focus:border-blue-500
              transition"
          />
        </div>

        {/* File Upload */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Upload Image
          </label>

          <div className="flex items-center justify-center w-full">
            <label className="flex flex-col items-center justify-center w-full h-36
              border-2 border-dashed border-gray-300 rounded-xl cursor-pointer
              hover:border-blue-500 hover:bg-blue-50 transition">
              
              <span className="text-gray-500 text-sm">
                Click to upload or drag & drop
              </span>
              <span className="text-xs text-gray-400 mt-1">
                JPG, PNG (Max 5MB)
              </span>

              <input
                type="file"
                className="hidden"
                onChange={(e) => setImageFile(e.target.files[0])}
                required={!editingPhoto}
              />
            </label>
          </div>

          {imageFile && (
            <p className="mt-2 text-sm text-green-600 font-medium">
              Selected: {imageFile.name}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700
            text-white font-semibold py-3 rounded-xl
            transition transform hover:scale-[1.02]
            focus:ring-2 focus:ring-blue-400"
        >
          {editingPhoto ? "Update Photo" : "Upload Photo"}
        </button>
      </form>

      {/* Response Message */}
      {responseMessage && (
        <div
          className={`mx-6 mb-6 rounded-lg px-4 py-3 text-sm font-semibold
          ${
            responseMessage.includes("Error")
              ? "bg-red-50 text-red-700 border border-red-200"
              : "bg-green-50 text-green-700 border border-green-200"
          }`}
        >
          {responseMessage}
        </div>
      )}
    </div>
  </div>
</MainLayout>

  );
};

export default CreateGallery;
