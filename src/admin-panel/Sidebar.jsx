import React, { useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Wrench, 
  Image, 
  BookOpen, 
  Mail, 
  Users, 
  Settings, 
  LogOut, 
  Star, 
  Menu, 
  X,
  FileImage
} from "lucide-react";
import LogoutButton from "../components/common/LogoutButton";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate("/");
  };

  // Helper function to handle NavLink classes
  const getLinkClass = ({ isActive }) =>
    `flex items-center px-4 py-3 transition-colors duration-200 ${
      isActive 
        ? "bg-blue-600 text-white" 
        : "text-slate-400 hover:text-white hover:bg-slate-700"
    }`;

  const navItems = [
    { to: "/admin-panel", icon: <LayoutDashboard size={20} />, label: "Home" },
    { to: "/create-service", icon: <Wrench size={20} />, label: "Create Service" },
    { to: "/create-gallery", icon: <Image size={20} />, label: "Create Gallery" },
    { to: "/admin-gallery-list", icon: <FileImage size={20} />, label: "Manage Gallery" },
    {to: "/admin-blogs", icon: <FileImage size={20} />,label: "Manage Blogs" },
    { to: "/inquiries-information", icon: <BookOpen size={20} />, label: "View Bookings" },
    { to: "/contact-information", icon: <Mail size={20} />, label: "View Messages" },
    { to: "/admin-panel/reviews", icon: <Star size={20} />, label: "Reviews" },
    { to: "/user-information", icon: <Users size={20} />, label: "Users/Clients" },
    { to: "/admin-settings", icon: <Settings size={20} />, label: "Settings" },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 left-0 h-full bg-slate-900 text-white w-64 transform transition-transform duration-300 z-30 shadow-2xl
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:static md:flex-shrink-0 flex flex-col`}
      >
        <div className="p-6 text-xl font-black uppercase tracking-widest text-blue-500 border-b border-slate-800">
          Ibirwa Admin
        </div>

        <nav className="flex-grow mt-6">
          <div className="flex flex-col">
            {navItems.map((item) => (
              <NavLink 
                key={item.to} 
                to={item.to} 
                className={getLinkClass}
                onClick={() => setIsOpen(false)}
              >
                <span className="mr-3">{item.icon}</span>
                <span className="text-sm font-medium">{item.label}</span>
              </NavLink>
            ))}
          </div>
        </nav>

        {/* Logout Section */}
        <div className="p-4 border-t border-slate-800">
          <LogoutButton  />
        </div>
      </aside>

      {/* Mobile Toggle Button */}
      <button
        className="fixed top-4 left-4 z-40 md:hidden p-2 bg-slate-900 text-white rounded-xl shadow-lg"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
    </>
  );
}