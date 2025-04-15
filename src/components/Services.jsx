import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const servicesPerPage = 6;

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(
          "https://kivu-back-end.onrender.com/api/services"
        );
        if (response.data.services && Array.isArray(response.data.services)) {
          setServices(response.data.services);
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

  const indexOfLastService = currentPage * servicesPerPage;
  const indexOfFirstService = indexOfLastService - servicesPerPage;
  const currentServices = services.slice(indexOfFirstService, indexOfLastService);
  const totalPages = Math.ceil(services.length / servicesPerPage);

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  if (error) {
    return <div>Error fetching services: {error.message}</div>;
  }

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading
          ? Array.from({ length: servicesPerPage }).map((_, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-lg">
                <Skeleton height={192} className="rounded-lg" />
                <Skeleton height={24} width={`80%`} className="mt-4" />
                <Skeleton height={16} width={`60%`} className="mt-2" />
                <Skeleton height={16} width={`40%`} className="mt-2" />
              </div>
            ))
          : currentServices.map((service) => (
              <div
                key={service._id}
                className="bg-white p-4 rounded-lg shadow-lg w-full h-full flex flex-col overflow-hidden 
                           transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl"
              >
                {service.imageFile && (
                  <div className="w-full max-h-[40vh] bg-white flex justify-center items-center rounded-lg overflow-hidden">
                    <img
                      src={service.imageFile}
                      alt={service.title}
                      className="w-full h-auto object-contain transition-transform duration-300 ease-in-out hover:scale-110"
                    />
                  </div>
                )}
                <h2 className="text-xl font-bold mt-4 transition-all duration-300 ease-in-out hover:text-blue-600">
                  {service.title}
                </h2>
                <p className="text-sm text-gray-500 transition-all duration-300 ease-in-out hover:text-gray-700">
                  {service.description}
                </p>
                <Link
                  to={`/service/${service._id}`}
                  className="text-blue-500 mt-2 inline-block transition-all duration-300 ease-in-out hover:underline hover:text-blue-700"
                >
                  Learn more
                </Link>
              </div>
            ))}
      </div>

      {!loading && services.length > servicesPerPage && (
        <div className="flex justify-center items-center gap-4 my-8">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className="p-2 rounded-full border border-gray-300 hover:bg-gray-100 disabled:opacity-50"
          >
            <ChevronLeft />
          </button>
          <span className="text-sm text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className="p-2 rounded-full border border-gray-300 hover:bg-gray-100 disabled:opacity-50"
          >
            <ChevronRight />
          </button>
        </div>
      )}
    </div>
  );
};

export default Services;
