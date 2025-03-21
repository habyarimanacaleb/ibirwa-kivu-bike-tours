import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { GalleryServices } from "./pages/GalleryServices";
import { About } from "./pages/About";
import { ExploreRwanda } from "./pages/ExploreRwanda";
import { Navbar } from "./components/Navbar";
import { Join } from "./components/Join";
import { Contacts } from "./pages/Contacts";
import { ServiceDetail } from "./components/ServiceDetail";
import { SignIn } from "./components/SignIn";
import { UserProvider } from "./context/UserContext";
import { ConfirmEmail } from "./server/VerifyEmail";
import ProtectedRoute from "./components/ProtectedRoute";
// import { DashboardHome } from "./pages/DashboardHome";
import { Dashboard } from "./pages/Dashboard";
import ServicesList from "./components/ServicesList";
import { CreateServices } from "./admin-dashboard/CreateServices";
import ContactInformation from "./admin-dashboard/ContactInformation";
import CreateGallery from "./admin-dashboard/CreateGallery";
import UpdateGallery from "./admin-dashboard/UpdateGallery";
import UpdateService from "./admin-dashboard/UpdateService";
import Services from "./components/Services";
import TourInquiriesDashboard from "./components/TourInquiriesDashboard";
import Trends from "./components/Trends";
import News from "./components/News";
import Settings from "./components/Settings";
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
                <Navbar />
                <div className="flex-grow">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route
                      path="/services-gallery"
                      element={<GalleryServices />}
                    />
                    <Route path="/services" element={<Services />} />
                    <Route path="/service/:id" element={<ServiceDetail />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/signin" element={<SignIn />} />
                    <Route path="/join" element={<Join />} />
                    <Route
                      path="/explore-more-to-Rwanda"
                      element={<ExploreRwanda />}
                    />
                    <Route
                      path="/parks"
                      element={<h1>National Parks....</h1>}
                    />
                    <Route
                      path="/culture"
                      element={<h1>Culture & Heritage...</h1>}
                    />
                    <Route path="/contact" element={<Contacts />} />
                    <Route
                      path="/api/confirm-email"
                      element={<ConfirmEmail />}
                    />
                  </Routes>
                </div>
              </div>
            }
          />
          <Route element={<ProtectedRoute />}>
            {/* <Route path="/admin" element={<DashboardHome />} /> */}
            <Route path="/admin" element={<Dashboard />} />
            <Route path="create-service" element={<CreateServices />} />
            <Route path="/tour-services" element={<Services />} />
            <Route path="/admin" element={<ServicesList />} />
            <Route path="/update-service/:id" element={<UpdateService />} />
            <Route
              path="/contact-information"
              element={<ContactInformation />}
            />
            <Route
              path="/inquiries-information"
              element={<TourInquiriesDashboard />}
            />
            <Route path="/create-gallery" element={<CreateGallery />} />
            <Route path="/update-gallery/:id" element={<UpdateGallery />} />
            <Route path="/trends" element={<Trends />} />
            <Route path="/news" element={<News />} />
            <Route path="/settings" element={<Settings />} />
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
