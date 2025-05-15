import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const UpdateGallery = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [responseMessage, setResponseMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPhoto = async () => {
      try {
        const response = await axios.get(`https://kivu-back-end.onrender.com/api/gallery/${id}`);
        const photo = response.data;
        console.log('Photo images data from updates',photo);
        if (photo && typeof photo === "object") {
          setTitle(photo.title || "");
        } else {
          setError(new Error("Invalid photo data received"));
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPhoto();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    if (imageFile) {
      formData.append("imageFile", imageFile);
    }

    try {
      const response = await axios.put(
        `https://kivu-back-end.onrender.com/api/gallery/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        setResponseMessage("Gallery card updated successfully!");
        setTimeout(() => {
          navigate("/gallery");
        }, 2000);
      } else {
        setResponseMessage("Failed to update gallery card.");
      }
    } catch (error) {
      console.error("Error updating gallery card:", error);
      setResponseMessage(
        "Error: " +
          (error.response?.data?.message || "Something went wrong")
      );
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error fetching photo: {error.message}</div>;

  return (
    <div className="bg-gray-100 p-6">
      <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Update Gallery Card</h1>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
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
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Update Gallery Card
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

export default UpdateGallery;
