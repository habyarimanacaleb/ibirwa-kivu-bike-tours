import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

//     formData.append("detailPage", detailPage);
const GalleryList = ({ galleryData }) => {
  const [galleries, setGalleries] = useState(galleryData || []);
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`https://kivu-back-end.onrender.com/api/gallery/${id}`);
      if (response.status === 200 || response.status === 204) {
        setGalleries(galleries.filter((item) => item._id !== id));
      } else {
        console.error("Failed to delete: Unexpected response", response);
      }
    } catch (error) {
      console.error("Error deleting gallery item:", error.response?.data || error.message);
    }
  };

  const handleUpdate = (id) => {
    navigate(`/update-gallery/${id}`);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <h1 className="text-2xl font-bold my-4 pl-4 col-span-full">Gallery List</h1>

      {galleries.length === 0 ? (
        <p className="text-gray-500 col-span-full">No gallery items available.</p>
      ) : (
        galleries.map((item) => (
          <div
            key={item._id}
            className="bg-white p-4 rounded-lg shadow-lg w-full min-h-[400px] flex flex-col overflow-hidden"
          >
            {item.imageFile && (
              <div className="w-full max-h-[40vh] bg-white flex justify-center items-center rounded-lg overflow-hidden">
                <img
                  src={item.imageFile}
                  alt={item.title}
                  className="w-full h-auto object-contain"
                />
              </div>
            )}
            <div className="p-4 flex-grow flex flex-col justify-between">
              <div>
                <h2 className="text-xl font-bold">{item.title}</h2>
              </div>
              <div className="flex justify-around pt-4">
                <Link
                  to={`/gallery/${item._id}`}
                  className="text-blue-500 border-2 border-blue-500 hover:bg-blue-500 hover:text-white rounded-md py-2 px-3"
                >
                  View
                </Link>
                <button
                  onClick={() => handleUpdate(item._id)}
                  className="text-yellow-500 border-2 border-yellow-500 hover:bg-yellow-500 hover:text-white rounded-md py-2 px-3"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="text-red-500 border-2 border-red-500 hover:bg-red-500 hover:text-white rounded-md py-2 px-3"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default GalleryList;