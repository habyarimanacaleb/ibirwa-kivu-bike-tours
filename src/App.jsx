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
import ProtectedRoute from "./components/ProtectedRoute";
import { DashboardHome } from "./pages/DashboardHome";
import { CreateService } from "./admin-dashboard/CreateServices";
import { Sidebar } from "./components/Sidebar"; 

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          {/* Public Routes with Navbar & Footer */}
          <Route
            path="/*"
            element={
              <>
                <Navbar />
                <Routes>
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
                </Routes>
                <Footer />
              </>
            }
          />
          <Route element={<ProtectedRoute />}>
            <Route
              path="/admin/*"
              element={
                <div className="flex">
                  <Sidebar />
                  <div className="flex-1 p-4">
                    <Routes>
                      <Route path="/" element={<DashboardHome />} />
                      <Route path="create-service" element={<CreateService />} />
                    </Routes>
                  </div>
                </div>
              }
            />
          </Route>

          {/* 404 Page */}
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
