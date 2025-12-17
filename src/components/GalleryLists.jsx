import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import MainLayout from "../admin-panel/MainLayout";

const GalleryList = () => {
  const [galleries, setGalleries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const navigate = useNavigate();

  // Fetch gallery data
  useEffect(() => {
    const fetchGalleries = async () => {
      try {
        const response = await axios.get(
          "https://kivu-back-end.onrender.com/api/gallery"
        );
      
        const data = await response.data.data
        // IMPORTANT: adjust if your API wraps data
        setGalleries(data);
      } catch (error) {
        console.error(
          "Failed to fetch galleries:",
          error.response?.data || error.message
        );
      } finally {
        setLoading(false);
      }
    };

    fetchGalleries();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this gallery image?"
    );
    if (!confirmDelete) return;

    try {
      setDeletingId(id);

      await axios.delete(
        `https://kivu-back-end.onrender.com/api/gallery/${id}`
      );

      setGalleries((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Delete failed:", error.response?.data || error.message);
      alert("Failed to delete image. Try again.");
    } finally {
      setDeletingId(null);
    }
  };

  const handleUpdate = (id) => {
    navigate(`/update-gallery/${id}`);
  };

  if (loading) {
    return (
      <div className="text-center py-20 text-gray-500">
        Loading gallery...
      </div>
    );
  }

  return (
    <MainLayout>
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        📸 Gallery Management
      </h1>

      {galleries.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          No gallery items available.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleries.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-xl shadow-md overflow-hidden
              transition transform hover:-translate-y-1 hover:shadow-xl"
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden group">
                {item.imageFile ? (
                  <img
                    src={item.imageFile}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform
                    duration-300 group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-100">
                    <span className="text-gray-400">No Image</span>
                  </div>
                )}

                {/* Title overlay */}
                <div className="absolute bottom-0 left-0 right-0
                bg-gradient-to-t from-black/70 to-transparent p-3">
                  <h2 className="text-white font-semibold truncate">
                    {item.title}
                  </h2>
                </div>
              </div>

              {/* Actions */}
              <div className="p-4 flex justify-between items-center">
                <Link
                  to={`/gallery/${item._id}`}
                  className="text-blue-600 text-sm font-medium hover:underline"
                >
                  View
                </Link>

                <div className="flex gap-3">
                  <button
                    onClick={() => handleUpdate(item._id)}
                    className="text-yellow-600 text-sm font-medium hover:text-yellow-700"
                  >
                    Edit
                  </button>

                  <button
                    disabled={deletingId === item._id}
                    onClick={() => handleDelete(item._id)}
                    className={`text-sm font-medium ${
                      deletingId === item._id
                        ? "text-gray-400 cursor-not-allowed"
                        : "text-red-600 hover:text-red-700"
                    }`}
                  >
                    {deletingId === item._id ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
    </MainLayout>
  );
};

export default GalleryList;
