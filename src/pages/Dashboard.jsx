import React from "react";
import { useState, useEffect } from "react";
import {
  Menu,
  X,
  Home,
  Plus,
  Edit,
  Cog,
  ChartLine,
  Newspaper,
  MessageSquare,
  Bell,
  User,
} from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";
import SearchBar from "../components/SearchBar";
import ServicesList from "../components/ServicesList";
import GalleryList from "../components/GalleryLists";
import DasboardQuickActions from "../components/DasboardQuickActions";

export function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [analytics, setAnalytics] = useState({
    users: 0,
    contacts: 0,
    services: 0,
    gallery: 0,
  });
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [services, setServices] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [error, setError] = useState(null);
  const [notifications, setNotifications] = useState(0);

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    async function fetchAnalytics() {
      try {
        const usersRes = await axios.get(
          "https://kivu-back-end.onrender.com/api/ibirwa-clients/users"
        );
        const contactsRes = await axios.get(
          "https://kivu-back-end.onrender.com/api/contacts"
        );
        const servicesRes = await axios.get(
          "https://kivu-back-end.onrender.com/api/services"
        );
        const galleryRes = await axios.get(
          "https://kivu-back-end.onrender.com/api/gallery"
        );

        const usersData = usersRes.data;
        const contactsData = contactsRes.data;
        const servicesData = servicesRes.data.services;
        const galleryData = galleryRes.data.data;

        setAnalytics({
          users: usersData.length,
          contacts: contactsData.length,
          services: servicesData.length,
          gallery: galleryData.length,
        });

        // Assuming notifications are part of contacts data
        setNotifications(contactsData.length);
      } catch (error) {
        console.error("Error fetching analytics:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    }

    fetchAnalytics();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [servicesResponse, galleryResponse] = await Promise.all([
          axios.get("https://kivu-back-end.onrender.com/api/services"),
          axios.get("https://kivu-back-end.onrender.com/api/gallery"),
        ]);
        setServices(servicesResponse.data.services || []);
        setGallery(galleryResponse.data.data  || []);
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

  const SkeletonCard = () => (
    <div className="bg-gray-200 p-4 shadow rounded-lg animate-pulse transition-all duration-500 ease-in-out text-center h-24">
      <div className="h-6 bg-gray-300 rounded w-3/4 mx-auto mb-4"></div>
      <div className="h-8 bg-gray-300 rounded w-1/2 mx-auto"></div>
    </div>
  );

  return (
    <div className="flex h-screen flex-col md:flex-row">
      {/* Sidebar for Large Screens */}
      <aside
        className={`hidden md:flex w-64 bg-blue-800 text-white p-5 flex-col min-h-screen transition-all duration-300 ${
          isSidebarOpen ? "block" : "hidden"
        }`}
      >
        <h1 className="text-xl font-bold mb-6">Admin Panel</h1>
        <nav>
          <ul className="space-y-4">
            <li>
              <Link
                to="/admin"
                className="flex items-center hover:text-blue-300"
              >
                <Home className="mr-2" /> Admin Panel
              </Link>
            </li>
            <li>
              <Link
                to="/create-service"
                className="flex items-center hover:text-blue-300"
              >
                <Plus className="mr-2" /> Create Service
              </Link>
            </li>
            <li>
              <Link
                to="/create-gallery"
                className="flex items-center hover:text-blue-300"
              >
                <Plus className="mr-2" /> Create Gallery
              </Link>
            </li>
            <li>
              <Link
                to="/update-service"
                className="flex items-center hover:text-blue-300"
              >
                <Edit className="mr-2" /> Update Services
              </Link>
            </li>
            <li>
              <Link
                to="/update-gallery"
                className="flex items-center hover:text-blue-300"
              >
                <Edit className="mr-2" /> Update Gallery
              </Link>
            </li>
            <li>
              <Link
                to="/contact-information"
                className="flex items-center hover:text-blue-300"
              >
                <MessageSquare className="mr-2" /> Client Queries
              </Link>
            </li>
            <li>
              <Link
                to="/inquiries-information"
                className="flex items-center hover:text-blue-300"
              >
                <MessageSquare className="mr-2" /> Client inquiry Inform
              </Link>
            </li>
            <li>
              <Link
                to="/settings"
                className="flex items-center hover:text-blue-300"
              >
                <Cog className="mr-2" /> Settings
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Mobile Navigation */}
      <div className="md:hidden bg-blue-800 text-white p-4 flex justify-between items-center w-full">
        <h1 className="text-xl font-bold">Admin Panel</h1>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-blue-800 text-white p-4 flex flex-col z-50 w-64 h-full shadow-lg transition-transform duration-300 ease-in-out">
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="self-end mb-4"
          >
            {/* <X size={24} /> */}
          </button>
          <nav>
            <ul className="space-y-4">
              <li>
                <Link to="/admin" onClick={() => setIsMobileMenuOpen(false)}>
                  Admin Panel
                </Link>
              </li>
              <li>
                <Link
                  to="/create-service"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Create Service
                </Link>
              </li>
              <li>
                <Link
                  to="/create-gallery"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Create Gallery
                </Link>
              </li>
              <li>
                <Link
                  to="/contact-information"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center hover:text-blue-300"
                >
                  Client Queries
                </Link>
              </li>
              <li>
                <Link
                  to="/user-information"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center hover:text-blue-300"
                >
                  Users
                </Link>
              </li>
              <li>
                <Link
                  to="/inquiries-information"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center hover:text-blue-300"
                >
                  Client inquiry Inform
                </Link>
              </li>
              <li>
                <Link
                  to="/settings"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center hover:text-blue-300"
                >
                  Settings
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-auto">
        <div className="flex justify-between items-center">
          <SearchBar searchTerm={searchTerm} handleSearch={handleSearch} />
          <div className=" flex justify-between items-center search-bar pr-2">
            <div className="relative">
              <Bell className="mr-2" />
              {notifications > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                  {notifications}
                </span>
              )}
            </div>
            <div className="p-1 rounded-full bg-gray-200 mx-1">
              <User />
            </div>
          </div>
        </div>
        <h1 className="text-3xl font-bold mb-6">Welcome back, Admin!</h1>

        {/* Analytics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          {loading
            ? Array.from({ length: 4 }).map((_, index) => (
                <SkeletonCard key={index} />
              ))
            : Object.entries(analytics).map(([key, value], index) => (
                <div
                  key={index}
                  className="bg-white p-4 shadow rounded-lg text-center"
                >
                  <h2 className="text-lg font-semibold">
                    {key.replace(/_/g, " ").toUpperCase()}
                  </h2>
                  <p className="text-2xl font-bold">{value}</p>
                </div>
              ))}
        </div>
        <DasboardQuickActions />
        <div className="our-services">
        <ServicesList services={filteredServices} />
        </div>
        <div className="gallery mt-6">
        <GalleryList gallery={filteredGallery} galleryData={gallery}/>
        </div>
      </main>
    </div>
  );
}
