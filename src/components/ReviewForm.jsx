import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaStar } from "react-icons/fa";

const ReviewForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState([]);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const res = await axios.get("http://localhost:3001/api/reviews");
      setReviews(res.data);
    } catch (err) {
      console.error("Error fetching reviews:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3001/api/reviews", {
        name,
        email,
        rating,
        comment,
      });

      setSuccess("Review submitted successfully!");
      setError(null);
      setName("");
      setEmail("");
      setRating(5);
      setComment("");
      fetchReviews();
    } catch (err) {
      setError("Failed to submit review.");
      setSuccess(null);
    }
  };

  const averageRating =
    reviews.length > 0
      ? (reviews.reduce((acc, rev) => acc + rev.rating, 0) / reviews.length).toFixed(1)
      : "N/A";

  const renderStars = (count) => (
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <FaStar
          key={i}
          className={`text-lg ${i <= count ? "text-yellow-400" : "text-gray-300"}`}
        />
      ))}
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Section: Review Header */}
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold mb-2">What People Are Saying</h2>
        {averageRating !== "N/A" ? (
          <div className="flex justify-center items-center gap-2">
            <p className="text-gray-700 font-medium">Average Rating: {averageRating}</p>
            {renderStars(Math.round(averageRating))}
          </div>
        ) : (
          <p className="text-gray-500">No ratings yet.</p>
        )}
      </div>

      {/* Section: Review Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12">
        {reviews.length === 0 ? (
          <p className="text-gray-500 col-span-full">No reviews yet.</p>
        ) : (
          reviews.map((rev) => (
            <div key={rev._id} className="bg-white border rounded-lg shadow-sm p-4">
              <div className="flex justify-between items-center mb-2">
                <p className="font-semibold text-lg">{rev.name}</p>
                {renderStars(rev.rating)}
              </div>
              <p className="text-gray-700">{rev.comment}</p>
              <p className="text-sm text-gray-400 mt-2">
                {new Date(rev.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))
        )}
      </div>

      {/* Section: Review Form */}
      <div className="bg-white rounded-lg shadow p-6 md:w-2/3 mx-auto">
        <h3 className="text-xl font-semibold mb-4">Leave a Review</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full p-2 border rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email Address"
            className="w-full p-2 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <select
            className="w-full p-2 border rounded"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
          >
            {[1, 2, 3, 4, 5].map((star) => (
              <option key={star} value={star}>
               
                {star} star{star > 1 && "s"}
              </option>
            ))}
          </select>
          <textarea
            placeholder="Write your comment here..."
            className="w-full p-2 border rounded"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          ></textarea>
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Submit Review
          </button>
          {success && <p className="text-green-600 text-sm">{success}</p>}
          {error && <p className="text-red-600 text-sm">{error}</p>}
        </form>
      </div>

    </div>
  );
};

export default ReviewForm;
