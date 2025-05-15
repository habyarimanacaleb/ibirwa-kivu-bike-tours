import React, { useState, useEffect } from "react";
import axios from "axios";

const Gallery = ({ gallery }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {gallery.map((photo) => (
        <div key={photo._id} className="bg-white p-4 rounded-lg shadow-lg">
          <div className="w-full h-48 flex items-center justify-center bg-gray-200 rounded-lg">
            <img
              src={photo.imageFile}
              alt={photo.title}
              className="w-full h-48 object-cover rounded-lg"
              onLoad={(e) => e.target.classList.remove("hidden")}
              onError={(e) => e.target.classList.add("hidden")}
            />
          </div>
          <h2 className="text-xl font-bold mt-4">{photo.title}</h2>
        </div>
      ))}
    </div>
  );
};

const GalleryContainer = () => {
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [imagesPerPage] = useState(6);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const response = await axios.get(
          "https://kivu-back-end.onrender.com/api/gallery"
        );
        setGallery(response.data.data || []); 
        console.log("Gallery Data",response.data.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchGallery();
  }, []);

  const indexOfLastImage = currentPage * imagesPerPage;
  const indexOfFirstImage = indexOfLastImage - imagesPerPage;
  const currentImages = gallery.slice(indexOfFirstImage, indexOfLastImage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Gallery</h1>
      <Gallery gallery={currentImages} />
    </div>
  );
};
export default GalleryContainer;
