import React, { useState, useEffect } from "react";
import axios from "axios";

const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch the latest tourism news or any relevant news API (e.g., news API or custom backend)
  useEffect(() => {
    const fetchNews = async () => {
      try {
        // Example of fetching from an external news API, replace with a real endpoint if needed
        const response = await axios.get(
          "https://newsapi.org/v2/everything?q=tourism&apiKey=beae7a17935f4581ae18c30b29998cc6"
        );
        setNews(response.data.articles); // Update with fetched news articles
        setLoading(false);
      } catch (error) {
        setError("Error fetching news.");
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Travel News</h1>

      {/* News Section */}
      {loading ? (
        <p>Loading the latest news...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div>
          <h2 className="text-xl font-semibold mb-4">Latest Travel News</h2>
          {news.length > 0 ? (
            news.map((article, index) => (
              <div key={index} className="mb-6 p-4 border-b">
                <h3 className="text-lg font-semibold">{article.title}</h3>
                <p className="text-sm text-gray-600">
                  By {article.author || "Unknown"}
                </p>
                <p className="text-gray-800">{article.description}</p>
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  Read more
                </a>
              </div>
            ))
          ) : (
            <p>No news available at the moment.</p>
          )}
        </div>
      )}

      {/* Other sections like Event Announcements */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Upcoming Events</h2>
        <ul>
          <li className="mb-2">
            The Akagera Wildlife Conservation Summit - March 2025
          </li>
          <li className="mb-2">Rwanda Wildlife Safari Tour - April 2025</li>
          <li className="mb-2">National Park Clean-Up Day - May 2025</li>
        </ul>
      </div>

      {/* Important Announcements */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Important Announcements</h2>
        <ul>
          <li className="mb-2">
            New restrictions on tourist group sizes in Akagera National Park
            (Effective April 2025).
          </li>
          <li className="mb-2">
            Special discounts on luxury accommodations in Kigali (Limited time
            offer).
          </li>
        </ul>
      </div>
    </div>
  );
};

export default News;
