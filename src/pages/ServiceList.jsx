import React, { useEffect, useState } from "react";
import axios from "axios";
import "react-loading-skeleton/dist/skeleton.css";
import ServiceSkeleton from "../components/Home/ServiceSkeleton";
import ServiceCard from "../components/common/ServiceCard";
import Navbar from "../components/Navbar";
import { Footer } from "../components/Footer";
/* ---------------------------------- */
/* Main Page Component                 */
/* ---------------------------------- */
const ServicesPapeListings = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /* -------- Fetch Services -------- */
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const { data } = await axios.get(
          "https://kivu-back-end.onrender.com/api/services"
        );

        const list = Array.isArray(data?.services) ? data.services : [];

        const sorted = list.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        setServices(sorted);
      } catch (err) {
        console.error("Error fetching services:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  /* -------- Error State -------- */
  if (error) {
    return (
      <div className="text-red-600 text-center py-10">
        Error fetching services.
      </div>
    );
  }

  /* -------- UI -------- */
  return (
    <>
    <Navbar />
    <article className="px-4 sm:px-6 lg:px-12 py-10 ">
      
    <header className="mb-12 mt-6">
        <h1 className="text-3xl font-bold text-center mb-8 text-blue-800">
            Our Services
        </h1>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Explore our diverse range of services designed to make your Lake Kivu adventure unforgettable. From guided tours to bike rentals, we have something for every traveler.
        </p>
    </header>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading
          ? Array.from({ length: 9 }).map((_, i) => (
              <ServiceSkeleton key={i} />
            ))
          : services.map((service, index) => (
              <ServiceCard
                key={service._id}
                service={service}
                index={index}
              />
            ))}
      </div>
    </article>
    <Footer />
    </>
  );
};

export default ServicesPapeListings;
