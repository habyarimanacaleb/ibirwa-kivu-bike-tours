'use client';

import React, { useState, useEffect } from "react";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Link } from "react-router-dom";
import ServiceCard from "../components/ServiceCard";
import { Footer } from "../components/Footer";
import Navbar from "../components/Navbar";

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(
          "https://demo.ibirwakivubiketours.com/api/services"
        );
        const fetchedServices = response?.data?.services;
        if (Array.isArray(fetchedServices)) {
          const sorted = [...fetchedServices].sort((a, b) => {
            const dateA = new Date(a.createdAt || 0).getTime();
            const dateB = new Date(b.createdAt || 0).getTime();
            return dateB - dateA; // Newest first
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

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Cool Header */}
      <header className="bg-blue-100 py-16 text-center relative">
        <h2 className="text-4xl md:text-5xl font-bold text-blue-800 mb-4">
          Explore Our Tours
        </h2>
        <p className="text-lg md:text-xl text-blue-700 max-w-2xl mx-auto">
          Discover breathtaking adventures and unforgettable experiences around Lake Kivu and beyond. Browse our top-rated services and find your perfect tour today.
        </p>
      </header>

      {/* Services Grid */}
      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-12 py-12">
        {error && (
          <div className="text-red-600 text-center mb-6">
            Error fetching services: {error.message || "Something went wrong."}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
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
                <ServiceCard service={service} key={service._id} />
              ))}
        </div>
      </main>

      {/* Footer */}
     <Footer />
    </div>
  );
};

export default Services;
