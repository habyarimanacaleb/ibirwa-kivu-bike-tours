import React, { useEffect } from "react";
import IquirryModal from "./components/IquirryModal";
import GlobalAlertBanner from "./features/settings/GlobalAlertBanner";

// Styles
import "./App.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ToastContainer } from "react-toastify";
import { InitPostHog } from "./analystics/posthog";
import { router } from "./router";
import { RouterProvider } from "react-router-dom";

function App() {
  useEffect(() => {
    InitPostHog();
  }, []);
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. This places the banner at the absolute top of the entire app viewport */}
      <GlobalAlertBanner />
      <div className="flex-grow">
        <RouterProvider router={router} />
      </div>
      {/* Global Modals/Containers */}
      <IquirryModal />
      <ToastContainer />
    </div>
  );
}

export default App;
