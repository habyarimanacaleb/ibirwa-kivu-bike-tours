import React, { useState, useEffect } from "react";
import axios from "axios";

const Trends = () => {
  const [weatherTrends, setWeatherTrends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeatherTrends = async () => {
      try {
        // Replace with your weather API endpoint and API key
        const cities = ["Bali", "Paris", "Kyoto"];
        const apiKey = "0bdbab9c0c6132c2f2acad314bdd0c40";
        const requests = cities.map((city) =>
          axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
          )
        );

        const responses = await Promise.all(requests);
        const trends = responses.map((response) => ({
          city: response.data.name,
          temperature: response.data.main.temp,
          description: response.data.weather[0].description,
          humidity: response.data.main.humidity,
          windSpeed: response.data.wind.speed,
        }));

        setWeatherTrends(trends);
      } catch (error) {
        setError("Failed to fetch weather trends. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherTrends();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Tourism Trends</h1>
      <h2 className="text-xl font-semibold mb-4">Weather Trends</h2>
      {loading ? (
        <p>Loading weather trends...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        weatherTrends.map((trend, index) => (
          <div
            key={index}
            className="mb-6 p-4 border-b bg-gray-100 rounded-lg shadow-md"
          >
            <h3 className="text-lg font-semibold">{trend.city}</h3>
            <p>Temperature: {trend.temperature}°C</p>
            <p>Weather: {trend.description}</p>
            <p>Humidity: {trend.humidity}%</p>
            <p>Wind Speed: {trend.windSpeed} m/s</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Trends;
