// components/ProtectedRoute.jsx
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../context/UserContext";
const ProtectedRoute = () => {
  const { user } = useUser();
  if (!user) {
    return <Navigate to="/signin" />;
  }
  if (user.role !== "admin") {
    return <Navigate to="/" />;
  }
  return <Outlet />;
};
export default ProtectedRoute;
