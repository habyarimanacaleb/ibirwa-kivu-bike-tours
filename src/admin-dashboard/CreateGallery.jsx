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
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">
        {editingPhoto ? "Update Photo" : "Create Gallery"}
      </h1>
      <form onSubmit={handleSubmit} className="mb-6 max-w-1/2 mx-auto">
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="title"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="imageFile"
          >
            Image
          </label>
          <input
            type="file"
            id="imageFile"
            name="imageFile"
            onChange={(e) => setImageFile(e.target.files[0])}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          {editingPhoto ? "Update" : "Upload"}
        </button>
      </form>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto">
        {gallery.map((photo) => (
          <div key={photo._id} className="bg-white p-4 rounded-lg shadow-lg">
            <img
              src={photo.imageFile}
              alt={photo.title}
              className="w-full h-48 object-cover rounded-lg"
            />
            <h2 className="text-xl font-bold mt-4">{photo.title}</h2>
            <button
              onClick={() => handleEdit(photo)}
              className="text-yellow-500 mt-2 inline-block"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(photo._id)}
              className="text-red-500 mt-2 inline-block"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

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
    </MainLayout>
  );
};

export default CreateGallery;
