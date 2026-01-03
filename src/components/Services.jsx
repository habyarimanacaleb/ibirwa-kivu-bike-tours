import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "react-loading-skeleton/dist/skeleton.css";
import ServiceSkeleton from "./Home/ServiceSkeleton";
import ServiceCard from "../components/common/ServiceCard";

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
              <ServiceSkeleton index={index} />
            ))
          : services.map((service,idx) => (
             <ServiceCard
                key={service._id}
                service={service}
                index={idx}
              />
            ))}
      </div>
    </div>
  );
};

export default Services;
