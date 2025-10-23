import React from "react";
import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { ExploreRwanda } from "./pages/ExploreRwanda";
import { Join } from "./components/Join";
import { Contacts } from "./pages/Contacts";
import { ServiceDetail } from "./components/ServiceDetail";
import { SignIn } from "./components/SignIn";
import { UserProvider } from "./context/UserContext";
import ProtectedRoute from "./components/ProtectedRoute";
import ServicesList from "./components/ServicesList";
import { CreateServices } from "./admin-dashboard/CreateServices";
import ContactInformation from "./admin-dashboard/ContactInformation";
import UpdateUser from "./admin-dashboard/UpdateUser";
import Users from "./admin-dashboard/Users";
import CreateGallery from "./admin-dashboard/CreateGallery";
import UpdateGallery from "./admin-dashboard/UpdateGallery";
import UpdateService from "./admin-dashboard/UpdateService";
import ServicePage from "./pages/ServicesPage";
import TourInquiriesDashboard from "./admin-panel/TourInquiriesDashboard";
import AdminSettings from "./admin-panel/Settings";
import GalleryList from "./components/GalleryLists";
import SingleGalleryView from "./admin-dashboard/SingleGalleryView";
import { MainDashboardLout } from "./admin-panel/MainDashboardLout";
import GalleryPage from "./pages/GalleryPage";
import DashboardReviews from "./admin-panel/DashboardReviews";
import "./App.css";

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route
            path="/*"
            element={
              <div className="flex flex-col min-h-screen">
                <div className="flex-grow">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path='/get-all-services' element={<ServicePage />} />
                    <Route path="/service/:id" element={<ServiceDetail />} />
                    <Route path="/gallery" element={<GalleryPage />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/login" element={<SignIn />} />
                    <Route path="/join" element={<Join />} />
                    <Route
                      path="/explore-more-to-Rwanda"
                      element={<ExploreRwanda />}
                    />
                    <Route path="/contact" element={<Contacts />} />
                  </Routes>
                </div>
              </div>
            }
          />
          <Route element={<ProtectedRoute />}>
            {/* <Route path="/admin" element={<DashboardHome />} /> */}
            <Route path="/admin-panel" element={<MainDashboardLout />} />
            <Route path="/create-service" element={<CreateServices />} />
            <Route path="/admin-service-list" element={<ServicesList />} />
            <Route path="/admin-gallery-list" element={<GalleryList />} />
            <Route path="/update-service/:id" element={<UpdateService />} />
            <Route
              path="/contact-information"
              element={<ContactInformation />}
            />
            <Route path="/user/update/:id" element={<UpdateUser />} />
            <Route
              path="/user-information"
              element={<Users />}
            />
            <Route
              path="/inquiries-information"
              element={<TourInquiriesDashboard />}
            />
            <Route path="/create-gallery" element={<CreateGallery />} />
            <Route path="/update-gallery/:id" element={<UpdateGallery />} />
            <Route path="/gallery/:id" element={<SingleGalleryView />} />
            <Route path="/admin-settings" element={<AdminSettings />} />
            <Route path="/admin-panel/reviews" element={<DashboardReviews />} />
          </Route>
          <Route
            path="*"
            element={
              <div>
                <p className="p-12 text-3xl-bold">Page NOT FOUND!</p>
              </div>
            }
          />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
