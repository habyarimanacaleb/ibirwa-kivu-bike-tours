import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import MainLayout from "../admin-panel/MainLayout";

const SingleGalleryView = () => {
  const { id } = useParams();
  const [galleryItem, setGalleryItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchGalleryItem = async () => {
      try {
        const response = await axios.get(`https://v2.ibirwakivubiketours.com/api/gallery/${id}`);
        setGalleryItem(response.data);
      } catch (err) {
        setError("Failed to fetch gallery item.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchGalleryItem();
  }, [id]);

  if (loading) return <div className="text-center mt-10 text-lg">Loading...</div>;
  if (error) return <div className="text-center mt-10 text-red-600">{error}</div>;

  return (
    <MainLayout>
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Gallery Item Details</h1>
      {galleryItem && (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {galleryItem.imageFile && (
            <img
              src={galleryItem.imageFile}
              alt={galleryItem.title}
              className="w-full max-h-[500px] object-contain bg-gray-100"
            />
          )}
          <div className="p-6">
            <h2 className="text-2xl font-semibold mb-2">{galleryItem.title}</h2>
            
             {/* Static Description Section */}
            <section className="bg-gray-100 p-4 rounded-md border">
              <h3 className="text-lg font-semibold mb-2">Gallery Description</h3>
              <p className="text-gray-700 w-full lg:w-a mx-auto p-4 rounded-md border hover:bg-gray-200 hover:shadow-md hover:transition-all hover:duration-300 hover:scale-105 hover:cursor-pointer hover: motiion-safe">
                Welcome to our beautiful gallery collection. Each image showcases the natural wonders,
                cultural landmarks, and scenic beauty that define the Kivu region. Enjoy the visual journey!
              </p>

            </section>
            <Link
              to="/admin-panel"
              className="inline-block mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Back to Gallery
            </Link>
          </div>
        </div>
      )}
    </div>
    </MainLayout>
  );
};

export default SingleGalleryView;
