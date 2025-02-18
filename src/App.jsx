import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { GalleryServices } from "./pages/GalleryServices";
import { About } from "./pages/About";
import { ExploreRwanda } from "./pages/ExploreRwanda";
import { Navbar } from "./components/Navbar";
import { Join } from "./components/Join";
import { Contacts } from "./pages/Contacts";
import { Footer } from "./components/Footer";
import { ServiceDetail } from "./components/ServiceDetail";
import { SignIn } from "./components/SignIn";
import { UserProvider } from "./context/UserContext";
import { ConfirmEmail } from "./server/VerifyEmail";
import ProtectedRoute from "./components/ProtectedRoute"; // Import the ProtectedRoute component
import { DashboardHome } from "./pages/DashboardHome"; // Import the Dashboard component
import { CreateService } from "./admin-dashboard/CreateServices"; // Import the CreateService component

function App() {
  return (
    <UserProvider>
      <Router>
        <Navbar />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/services-gallery" element={<GalleryServices />} />
          <Route path="/service/:id" element={<ServiceDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/join" element={<Join />} />
          <Route path="/explore-more-to-Rwanda" element={<ExploreRwanda />} />
          <Route path="/parks" element={<h1>National Parks....</h1>} />
          <Route path="/culture" element={<h1>Culture & Heritage...</h1>} />
          <Route path="/contact" element={<Contacts />} />
          <Route path="/api/confirm-email" element={<ConfirmEmail />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<DashboardHome />} />
            <Route path="/create-service" element={<CreateService />} />
          </Route>

          {/* 404 Page */}
          <Route
            path="*"
            element={
              <div>
                <p className="p-12 text-3xl-bold">
                  Page you Tried to Search With NOT FOUND!!
                </p>
              </div>
            }
          />
        </Routes>
        <Footer />
      </Router>
    </UserProvider>
  );
}

export default App;
