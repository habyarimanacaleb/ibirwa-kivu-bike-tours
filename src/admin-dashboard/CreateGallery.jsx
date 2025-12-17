import React, { useState,} from "react";
import MainLayout from "../admin-panel/MainLayout";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateGallery = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("imageFile", imageFile);

    try {
      const response = await axios.post(
        "https://kivu-back-end.onrender.com/api/gallery",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setResponseMessage("✅ Photo uploaded successfully!");
      setTitle("");
      setImageFile(null);
      navigate('/admin-gallery-list')
    } catch (err) {
      setError(err);
      setResponseMessage(
        "❌ " + (err.response?.data?.message || "Upload failed")
      );
    } finally {
      setLoading(false);
      setTimeout(() => setResponseMessage(""), 3000);
    }
  };

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
        <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl border">

          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-t-2xl px-6 py-5">
            <h1 className="text-2xl font-bold text-white text-center">
              📸 Create Gallery Photo
            </h1>
            <p className="text-blue-100 text-sm text-center mt-1">
              Upload stunning images to showcase your destination
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
                required
                placeholder="Sunset at Lake Kivu"
                className="w-full rounded-lg border px-4 py-2
                  focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Upload Image
              </label>

              <label className="flex flex-col items-center justify-center h-36
                border-2 border-dashed rounded-xl cursor-pointer
                hover:border-blue-500 hover:bg-blue-50 transition">
                <span className="text-gray-500 text-sm">
                  Click to upload or drag & drop
                </span>
                <span className="text-xs text-gray-400 mt-1">
                  JPG / PNG (Max 5MB)
                </span>
                <input
                  type="file"
                  className="hidden"
                  required
                  onChange={(e) => setImageFile(e.target.files[0])}
                />
              </label>

              {imageFile && (
                <p className="text-green-600 text-sm mt-2 font-medium">
                  Selected: {imageFile.name}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-xl text-white font-semibold
                transition transform hover:scale-[1.02]
                ${loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"}`}
            >
              {loading ? "Uploading..." : "Upload Photo"}
            </button>
          </form>

          {/* Response */}
          {responseMessage && (
            <div
              className={`mx-6 mb-6 rounded-lg px-4 py-3 text-sm font-semibold
                ${
                  responseMessage.includes("❌")
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


export default CreateGallery
