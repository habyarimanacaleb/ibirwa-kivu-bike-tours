// src/pages/DashboardHome.jsx
import React from "react";
import { DashboardLayout } from "../components/DashboardLayout ";
import { useNavigate } from "react-router-dom";

export const DashboardHome = () => {
  const navigate = useNavigate();

  return (
    <DashboardLayout>
      <div>
        <h2 className="text-3xl font-bold text-blue-600 mb-6">
          Welcome to Admin Dashboard
        </h2>
        <button
          className="bg-green-500 text-white px-6 py-3 rounded hover:bg-green-600 transition mb-6"
          onClick={() => navigate("/create-service")}
        >
          Create New Service
        </button>
      </div>
      <p className="text-gray-600">
        Use the sidebar to navigate through different functionalities.
      </p>
    </DashboardLayout>
  );
};
