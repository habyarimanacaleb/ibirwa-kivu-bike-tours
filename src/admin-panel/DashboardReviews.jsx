import React, { useEffect, useState } from "react";
import axios from "axios";
import MainLayout from "./MainLayout";

const DashboardReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://kivu-back-end.onrender.com/api/reviews"


      );
      setReviews(response.data || []);
      // console.log("Fetched reviews:", response.data);
      setError(null);
    } catch (err) {
      setError(err.message || "Error fetching reviews");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this review?")) return;
    try {
      await axios.delete(`https://kivu-back-end.onrender.com/api/reviews/${id}`);
      setReviews((prev) => prev.filter((r) => r._id !== id));
    } catch (err) {
      alert("Failed to delete review");
    }
  };

  if (loading) return <p>Loading reviews...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <MainLayout>
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Manage All Reviews</h1>
      {reviews.length === 0 ? (
        <p>No reviews found.</p>
      ) : (
        <table className="min-w-full border border-gray-300 rounded-md shadow-md">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-3 border border-gray-300">Name</th>
              <th className="p-3 border border-gray-300">Review Text</th>
              <th className="p-3 border border-gray-300">Date</th>
              <th className="p-3 border border-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map(({ _id, name, comment, createdAt }) => (
              <tr key={_id} className="even:bg-gray-100">
                <td className="p-3 border border-gray-300 max-w-xs truncate">{name}</td>
                <td className="p-3 border border-gray-300 max-w-lg truncate">{comment}</td>
                <td className="p-3 border border-gray-300 text-center">
                  {new Date(createdAt).toLocaleDateString()}
                </td>
                <td className="p-3 border border-gray-300 text-center space-x-3">
                  <button
                    onClick={() => handleDelete(_id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
    </MainLayout>
  );
};

export default DashboardReviews;
