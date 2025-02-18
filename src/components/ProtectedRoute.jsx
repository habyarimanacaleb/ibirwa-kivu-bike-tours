// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  // Check if the user is authenticated (e.g., by checking for a token in localStorage)
  const isAuthenticated = localStorage.getItem("token");

  // If authenticated, render the child components (e.g., Dashboard, CreateService, etc.)
  // If not authenticated, redirect to the login page
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
