import React from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import IquirryModal from "./components/IquirryModal";
import GlobalAlertBanner from "./features/settings/GlobalAlertBanner";

// Styles
import "./App.css";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { ToastContainer } from "react-toastify";

function App() {
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