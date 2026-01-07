import React, { useEffect, useState } from "react";
import MainLayout from "./MainLayout";
import ServicesList from "../components/ServicesList";
import DasboardQuickActions from "../components/DasboardQuickActions";
import SearchBar from "./SearchBar";
import Pagination from "../components/common/PaginatedServices";
import axios from "axios";
import { Bell } from "lucide-react";

export function MainDashboardLout() {
  const [analytics, setAnalytics] = useState({
    users: 0,
    contacts: 0,
    services: 0,
    gallery: 0,
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [services, setServices] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [error, setError] = useState(null);
  const [notifications, setNotifications] = useState(0);

  /* 🔹 Pagination state */
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  /* -------- Analytics -------- */
  useEffect(() => {
    async function fetchAnalytics() {
      try {
        const [usersRes, contactsRes, servicesRes, galleryRes] =
          await Promise.all([
            axios.get(
              "https://v2.ibirwakivubiketours.com/api/ibirwa-clients/users"
            ),
            axios.get("https://v2.ibirwakivubiketours.com/api/contacts"),
            axios.get("https://v2.ibirwakivubiketours.com/api/services"),
            axios.get("https://v2.ibirwakivubiketours.com/api/gallery"),
          ]);

        setAnalytics({
          users: usersRes.data.length,
          contacts: contactsRes.data.length,
          services: servicesRes.data.totalServices,
          gallery: galleryRes.data.data.length,
        });

        setNotifications(contactsRes.data.length);
      } catch (err) {
        console.error(err);
        setError(err);
      }
    }

    fetchAnalytics();
  }, []);

  /* -------- Paginated services + gallery -------- */
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [servicesRes, galleryRes] = await Promise.all([
          axios.get(
            `https://v2.ibirwakivubiketours.com/api/services?page=${page}`
          ),
          axios.get("https://v2.ibirwakivubiketours.com/api/gallery"),
        ]);

        setServices(servicesRes.data.services || []);
        setTotalPages(servicesRes.data.totalPages || 1);
        setGallery(galleryRes.data.data || []);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page]);

  /* -------- Search -------- */
  const filteredServices = services.filter((service) =>
    service.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (error) {
    return <div className="text-red-600">Error: {error.message}</div>;
  }

  // get user information from local storage
  const userData = localStorage.getItem("user");
  const user = userData ? JSON.parse(userData) : null;

  return (
    <MainLayout>
      <div className="welcome-back-admin">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold">{`Welcome back ${
            user?.username || "Admin"
          }!`}</h2>
          <div className="relative">
            <Bell />
            {notifications > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {notifications}
              </span>
            )}
          </div>
        </div>

        {/* Analytics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          {Object.entries(analytics).map(([key, value]) => (
            <div
              key={key}
              className="bg-white p-4 shadow rounded-lg text-center"
            >
              <h2 className="text-lg font-semibold">{key.toUpperCase()}</h2>
              <p className="text-2xl font-bold">{value}</p>
            </div>
          ))}
        </div>

        <DasboardQuickActions />

        {/* Search */}
        <div className="my-6">
          <SearchBar
            searchTerm={searchTerm}
            handleSearch={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Services */}
        <ServicesList services={filteredServices} loading={loading} />

        {/* Pagination */}
        <div className="flex justify-center mt-8">
          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </div>
      </div>
    </MainLayout>
  );
}
