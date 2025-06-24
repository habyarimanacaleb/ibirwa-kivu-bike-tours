import React, { useEffect,useState } from "react";
import MainLayout from "./MainLayout";
import ServicesList from "../components/ServicesList";
import GalleryList from "../components/GalleryLists";
import DasboardQuickActions from "../components/DasboardQuickActions";
import axios from "axios";

export function MainDashboardLout({ searchTerm }) {

  console.log("MainDashboardLout rendered with searchTerm:", searchTerm);
    const [analytics, setAnalytics] = useState({
      users: 0,
      contacts: 0,
      services: 0,
      gallery: 0,
    });
    const [loading, setLoading] = useState(true);
    // const [searchTerm, setsearchTerm] = useState("");
    const [services, setServices] = useState([]);
    const [gallery, setGallery] = useState([]);
    const [error, setError] = useState(null);
    const [notifications, setNotifications] = useState(0);

  //fetch analytics data here if needed
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

 // gallery and services fetching
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
  // Normalize the searchTerm safely
const normalizedSearchTerm = (searchTerm || "").toLowerCase();
console.log("Search term:", normalizedSearchTerm);
// Filter only if search term exists, otherwise return all
const filteredServices = normalizedSearchTerm
  ? services.filter(s =>
      s.title.toLowerCase().includes(normalizedSearchTerm)
    )
  : services;

const filteredGallery = normalizedSearchTerm
  ? gallery.filter(g =>
      g.title.toLowerCase().includes(normalizedSearchTerm)
    )
  : gallery;

// Handle error display
if (error) {
  return <div className="text-red-500">Error: {error.message}</div>;
}


  const SkeletonCard = () => (
    <div className="bg-gray-200 p-4 shadow rounded-lg animate-pulse transition-all duration-500 ease-in-out text-center h-24">
      <div className="h-6 bg-gray-300 rounded w-3/4 mx-auto mb-4"></div>
      <div className="h-8 bg-gray-300 rounded w-1/2 mx-auto"></div>
    </div>
  );

  return (
    <MainLayout>
      <div className="welcome-back-admin">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold mb-6">Welcome back Admin,</h2>
        </ div>
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

        <div className="quick-action">
          <DasboardQuickActions />
        </div>

        {/*services and gallery lists */}
        <div className="our-services">
        <ServicesList services={filteredServices} />
        </div>
        <div className="gallery mt-6">
        <GalleryList gallery={filteredGallery} galleryData={gallery}/>
        </div>
      </div>

    </MainLayout>
  );
}
