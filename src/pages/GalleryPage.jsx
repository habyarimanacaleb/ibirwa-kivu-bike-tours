import React, { useEffect, useState } from "react";
import axios from "axios";
import SmartBackButton from "../components/SmartBackButton ";

// Skeleton loader component
const SkeletonCard = () => (
  <div className="bg-white rounded-lg shadow animate-pulse h-72">
    <div className="bg-gray-300 h-48 w-full"></div>
    <div className="p-4 space-y-2">
      <div className="h-4 bg-gray-300 rounded w-3/4"></div>
      <div className="h-4 bg-gray-300 rounded w-1/2"></div>
    </div>
  </div>
);

const GalleryPage = () => {
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Pagination setup
  const [currentPage, setCurrentPage] = useState(1);
  const imagesPerPage = 9;

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const response = await axios.get("https://v2.ibirwakivubiketours.com/api/gallery");
        setGallery(response.data.data || []);
      } catch (err) {
        setError(err.message || "Failed to fetch gallery.");
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, []);

  // Pagination logic
  const indexOfLastImage = currentPage * imagesPerPage;
  const indexOfFirstImage = indexOfLastImage - imagesPerPage;
  const currentImages = gallery.slice(indexOfFirstImage, indexOfLastImage);
  const totalPages = Math.ceil(gallery.length / imagesPerPage);
  const paginate = (pageNum) => setCurrentPage(pageNum);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navbar */}
      <nav className="bg-white shadow-md py-4 px-6 flex justify-between items-center sticky top-0 z-50">
        <h1 className="text-xl font-bold-800 text-gray-800">Gallery Page</h1>
        <SmartBackButton />
      </nav>

      <div className="px-6 py-10">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Explore Our Gallery</h2>

        {/* Loading state */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : error ? (
          <p className="text-center text-red-500 mt-4">{error}</p>
        ) : gallery.length === 0 ? (
          <p className="text-center text-gray-500 mt-4">No gallery images available.</p>
        ) : (
          <>
            {/* Image Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {currentImages.map((item) => (
                <div
                  key={item._id}
                  className="bg-white p-4 rounded-lg shadow hover:shadow-md transition duration-300"
                >
                  <div className="w-full h-48 overflow-hidden rounded-md bg-gray-200">
                    <img
                      src={item.imageFile}
                      alt={item.title}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-gray-800">{item.title}</h3>
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-8 space-x-2">
                {Array.from({ length: totalPages }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => paginate(index + 1)}
                    className={`px-4 py-2 rounded-md ${
                      currentPage === index + 1
                        ? "bg-blue-600 text-white"
                        : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default GalleryPage;
