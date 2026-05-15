import React from "react";
import { createBrowserRouter } from "react-router-dom";
// Pages & Components
import { Home } from "./pages/Home";
import About from "./pages/AboutPage";
import { ExploreRwanda } from "./pages/ExploreRwanda";
import { Join } from "./components/Join";
import { Contacts } from "./pages/Contacts";
import { ServiceDetail } from "./components/ServiceDetail";
import { SignIn } from "./components/SignIn";
import ProtectedRoute from "./components/ProtectedRoute";
import ServicesList from "./components/ServicesList";
import { CreateServices } from "./admin-dashboard/CreateServices";
import ContactInformation from "./admin-dashboard/ContactInformation";
import UpdateUser from "./admin-dashboard/UpdateUser";
import Users from "./admin-dashboard/Users";
import CreateGallery from "./admin-dashboard/CreateGallery";
import UpdateGallery from "./admin-dashboard/UpdateGallery";
import UpdateService from "./admin-dashboard/UpdateService";
import Services from "./components/Services";
import TourInquiriesDashboard from "./admin-panel/TourInquiriesDashboard";
import AdminSettings from "./admin-panel/Settings";
import GalleryList from "./components/GalleryLists";
import SingleGalleryView from "./admin-dashboard/SingleGalleryView";
import MainDashboardLout from "./admin-panel/MainDashboardLout";
import GalleryPage from "./pages/GalleryPage";
import DashboardReviews from "./admin-panel/DashboardReviews";
import ServicesListPage from "./pages/ServicesPage";
import CommunityPage from "./pages/CommunityPage";
import NotFoundPage from "./pages/NotFound";
import BlogPage from "./pages/BlogPage";
import BlogDetails from "./pages/BlogDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    children: [
      // Public Routes
      { index: true, element: <Home /> },
      { path: "services", element: <ServicesListPage /> },
      { path: "service/:id", element: <ServiceDetail /> },
      { path: "gallery", element: <GalleryPage /> },
      { path: "community", element: <CommunityPage /> },
      { path: "about", element: <About /> },
      { path: "blogs", element: <BlogPage /> },
      { path: "blog/:id", element: <BlogDetails /> },
      { path: "login", element: <SignIn /> },
      { path: "join", element: <Join /> },
      { path: "explore-more-to-Rwanda", element: <ExploreRwanda /> },
      { path: "contact", element: <Contacts /> },
    ],
  },
  // Admin Protected Routes
  {
    element: <ProtectedRoute />,
    children: [
      { path: "admin-panel", element: <MainDashboardLout /> },
      { path: "create-service", element: <CreateServices /> },
      { path: "tour-services", element: <Services /> },
      { path: "admin-service-list", element: <ServicesList /> },
      { path: "admin-gallery-list", element: <GalleryList /> },
      { path: "update-service/:id", element: <UpdateService /> },
      { path: "contact-information", element: <ContactInformation /> },
      { path: "user/update/:id", element: <UpdateUser /> },
      { path: "user-information", element: <Users /> },
      { path: "inquiries-information", element: <TourInquiriesDashboard /> },
      { path: "create-gallery", element: <CreateGallery /> },
      { path: "update-gallery/:id", element: <UpdateGallery /> },
      { path: "gallery/:id", element: <SingleGalleryView /> },
      { path: "admin-settings", element: <AdminSettings /> },
      { path: "admin-panel/reviews", element: <DashboardReviews /> },
    ],
  },
  // 404 Page
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
