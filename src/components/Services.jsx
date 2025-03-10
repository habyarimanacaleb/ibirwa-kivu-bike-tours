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
        if (response.data && Array.isArray(response.data)) {
          setServices(response.data);
        } else {
          console.error("Unexpected response format:", response.data);
        }
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
        console.error("Error fetching services:", error);
      }
    };
    fetchServices();
  }, []);

  if (error) {
    return <div>Error fetching services: {error.message}</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Services</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading
          ? Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-lg">
                <Skeleton height={192} className="rounded-lg" />
                <Skeleton height={24} width={`80%`} className="mt-4" />
                <Skeleton height={16} width={`60%`} className="mt-2" />
                <Skeleton height={16} width={`40%`} className="mt-2" />
              </div>
            ))
          : services.map((service) => (
              <div
                key={service._id}
                className="bg-white p-4 rounded-lg shadow-lg"
              >
                {service.imageFile && (
                  <img
                    src={service.imageFile}
                    alt={service.title}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                )}
                <h2 className="text-xl font-bold mt-4">{service.title}</h2>
                <p className="text-sm text-gray-500">{service.description}</p>
                <Link
                  to={`/service/${service._id}`}
                  className="text-blue-500 mt-2 inline-block"
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
