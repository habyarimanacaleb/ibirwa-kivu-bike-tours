import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const isAuthenticated = localStorage.getItem("token"); // Check for token
  const userRole = localStorage.getItem("role"); // Fetch role from localStorage

  const allowedRoles = ["admin", "superadmin"]; // Define allowed roles for admin access


  // If the user does not have an allowed role, redirect to home
  if (!allowedRoles.includes(userRole) || !isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
