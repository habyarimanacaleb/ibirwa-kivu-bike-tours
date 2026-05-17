import React from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import IquirryModal from "./components/IquirryModal";

// Styles
import "./App.css";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        <RouterProvider router={router} />
      </div>
      {/* Global Modal managed by Zustand store */}
      <IquirryModal />
      <ToastContainer />
    </div>
  );
}

export default App;
