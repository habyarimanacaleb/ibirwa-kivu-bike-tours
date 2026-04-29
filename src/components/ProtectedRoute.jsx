import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../store/useAuthStore"; // Import your Zustand store

const ProtectedRoute = () => {
  // Use currentUser and loading from your global Zustand store
  const { currentUser, loading } = useAuthStore();

  // If the store is still checking localStorage/fetching the user
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
        <p>Verifying access...</p>
      </div>
    );
  }

  // If no user is logged in, send them to the login page
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  // If they are logged in but are NOT an admin, send them back to the public home
  if (currentUser.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  // If they are an admin, render the protected content
  return <Outlet />;
};

export default ProtectedRoute;
