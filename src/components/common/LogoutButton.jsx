import React from "react";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react"; // Optional: icon for style
import useAuthStore from "../../store/useAuthStore";

const LogoutButton = ({ className = "" }) => {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    // 1. Clear the Zustand state & LocalStorage
    logout();
    
    // 2. Redirect to login or home
    navigate("/login", { replace: true });
  };

  return (
    <button
      onClick={handleLogout}
      className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-all rounded-lg 
        bg-red-600/10 text-red-500 hover:bg-red-600 hover:text-white ${className}`}
    >
      <LogOut size={18} />
      <span>Logout</span>
    </button>
  );
};

export default LogoutButton;
