import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";

const ProtectedRoute = () => {
  // Use atomic selectors so the guard doesn't re-render on unrelated store changes
  const currentUser = useAuthStore((state) => state.currentUser);
  const token = useAuthStore((state) => state.token);
  
  // Local guard to track if Zustand has finished reading from localStorage
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // This runs immediately after the component mounts, giving the persist
    // middleware exactly one microtask tick to load data into memory
    setIsHydrated(true);
  }, []);

  // 1. Show a clean initialization screen while reading localStorage
  if (!isHydrated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white gap-3">
        <div className="w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-xs uppercase tracking-widest text-gray-400 font-mono">Initializing Session...</p>
      </div>
    );
  }

  // 2. If storage hydration is complete but credentials are missing, redirect to join
  if (!currentUser || !token) {
    return <Navigate to="/join" replace />;
  }

  // 3. If they are logged in but are NOT an admin, restrict access to the dashboard
  if (currentUser.role !== "admin") {
    return <Navigate to="/services" replace />;
  }

  // 4. Everything matches perfectly, render the protected layout components safely
  return <Outlet />;
};

export default ProtectedRoute;