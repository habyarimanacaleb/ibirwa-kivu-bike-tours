
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import ServiceCard from "./ServiceCard";
import { ArrowRight } from "lucide-react";

const Services = () => {
  const navigate = useNavigate();

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
    <div className="px-4 sm:px-6 lg:px-12 py-6 flex flex-col mx-auto items-center">
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
          : services.slice(0,18).map((service) => (
              <ServiceCard service={service} key={service._id} />
            ))}
          </div>
      <button
      onClick={()=> navigate('/get-all-services')} 
      className="flex items-center my-12 text-xl p-4 bg-gradient-to-tr via-blue from-gray-300 to-gray-600 w-60 hover:scale-105 transition duration-500 ease-in-out hover:bg-blue-100 text-gray-50 rounded-xl cursor-pointer">
        Browse More Tours
        <ArrowRight className="inline-block ml-2 animate-pulse" size={20} />
      </button>
    </div>
  );
};

export default Services;
