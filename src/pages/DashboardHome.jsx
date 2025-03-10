import React, { useState, useEffect } from "react";
import { Sidebar } from "../components/Sidebar";
import StatsCard from "../components/StatsCard";
import ChartComponent from "../components/ChartComponent";
import { FaUsers, FaCog, FaChartLine, FaSearch } from "react-icons/fa";
import ServicesList from "../components/ServicesList";
import Gallery from "../admin-dashboard/Gallery";
import { FaMessage, FaNoteSticky, FaUser } from "react-icons/fa6";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import SearchBar from "../components/SearchBar";
export const DashboardHome = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [services, setServices] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [servicesResponse, galleryResponse] = await Promise.all([
          axios.get("https://kivu-back-end.onrender.com/api/services"),
          axios.get("https://kivu-back-end.onrender.com/api/gallery"),
        ]);
        setServices(servicesResponse.data);
        setGallery(galleryResponse.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };
  const filteredServices = services.filter((service) =>
    service.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const filteredGallery = gallery.filter((photo) =>
    photo.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <div className="flex h-full min-h-[100hv] bg-gray-100">
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      <div
        className={`flex-1 p-4 transition-all duration-300 ${
          isOpen ? "ml-60" : "ml-16"
        }`}
      >
        <div className="flex justify-between items-center search-bar">
          <SearchBar searchTerm={searchTerm} handleSearch={handleSearch} />
        </div>
        <h1 className="text-3xl font-bold mb-6">
          Welcome to the Admin Dashboard
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {loading ? (
            Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-lg">
                <Skeleton height={24} width={`80%`} className="mb-4" />
                <Skeleton height={24} width={`60%`} className="mb-4" />
                <Skeleton height={24} width={`40%`} className="mb-4" />
              </div>
            ))
          ) : (
            <>
              <StatsCard title="Total Users" value="1,234" icon={<FaUsers />} />
              <StatsCard title="Active Services" value="24" icon={<FaCog />} />
              <StatsCard title="New Trends" value="7" icon={<FaChartLine />} />
              <StatsCard title="New messages" value="12" icon={<FaMessage />} />
              <StatsCard title="New user" value="16" icon={<FaUser />} />
              <StatsCard
                title="Announcements"
                value="8"
                icon={<FaNoteSticky />}
              />
            </>
          )}
        </div>
        <div className="services-list-here">
          {loading ? (
            <Skeleton count={6} height={192} className="rounded-lg mb-4" />
          ) : (
            <ServicesList services={filteredServices} />
          )}
        </div>
        <div className="gallery-list-here mb-12">
          {loading ? (
            <Skeleton count={6} height={192} className="rounded-lg mb-4" />
          ) : (
            <Gallery gallery={filteredGallery} />
          )}
        </div>
      </div>
    </div>
  );
};
