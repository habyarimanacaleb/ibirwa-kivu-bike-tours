import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(
          "https://kivu-back-end.onrender.com/api/services"
        );

        const fetchedServices = response?.data?.services;

        if (Array.isArray(fetchedServices)) {
          const sorted = [...fetchedServices].sort((a, b) => {
            const dateA = new Date(a.createdAt || 0).getTime();
            const dateB = new Date(b.createdAt || 0).getTime();
            return dateB - dateA; // Descending: newest first
          });

          setServices(sorted);
        } else {
          console.warn("Unexpected response format:", response.data);
          setServices([]);
        }
      } catch (err) {
        console.error("Error fetching services:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (error) {
    return (
      <div className="text-red-600 text-center p-4">
        Error fetching services: {error.message || "Something went wrong."}
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 lg:px-12 py-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading
          ? Array.from({ length: 9 }).map((_, index) => (
              <div key={index} className="bg-gray-100 p-4 rounded-lg shadow-lg">
                <Skeleton height={192} className="rounded-lg" />
                <Skeleton height={24} width={`80%`} className="mt-4" />
                <Skeleton height={16} width={`60%`} className="mt-2" />
                <Skeleton height={16} width={`40%`} className="mt-2" />
              </div>
            ))
          : services.map((service) => (
              <div
                key={service._id}
                className="bg-white p-4 rounded-lg shadow-lg w-full h-full flex flex-col overflow-hidden 
                         transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl"
              >
                {service.imageFile && (
                  <div className="w-full max-h-[40vh] flex justify-center items-center rounded-lg overflow-hidden">
                    <img
                      src={service.imageFile}
                      alt={service.title}
                      className="w-full h-auto object-contain transition-transform duration-300 ease-in-out hover:scale-110"
                    />
                  </div>
                )}
                <h2 className="text-xl font-bold mt-4 hover:text-blue-600 transition">
                  {service.title}
                </h2>
                <p className="text-sm text-gray-500 mt-2">
                  {service.description}
                </p>
                <Link
                  to={`/service/${service._id}`}
                  className="text-blue-500 mt-3 hover:underline hover:text-blue-700 transition"
                >
                  Learn more
                </Link>
              </div>
            ))}
      </div>
    </div>
  );
};

export default Services;
