import React,{ useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBars, FaHome, FaPlus, FaEdit, FaTrash, FaCog, FaChartLine, FaNewspaper, FaEnvelope } from "react-icons/fa";

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();

  const links = [
    { name: "Dashboard", path: "/dashboard", icon: <FaHome /> },
    { name: "Create Service", path: "/create-service", icon: <FaPlus /> },
    { name: "Update Service", path: "/update-service", icon: <FaEdit /> },
    { name: "Delete Service", path: "/delete-service", icon: <FaTrash /> },
    { name: "Settings", path: "/settings", icon: <FaCog /> },
    { name: "Trends", path: "/trends", icon: <FaChartLine /> },
    { name: "News", path: "/news", icon: <FaNewspaper /> },
    { name: "Contact Queries", path: "/contact-queries", icon: <FaEnvelope /> },
  ];

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className={`bg-blue-800 h-screen p-5 text-white transition-all duration-300 ${isOpen ? "w-60" : "w-16"}`}>
        <div className="flex items-center justify-between">
          <h1 className={`text-xl font-bold transition-opacity ${isOpen ? "opacity-100" : "opacity-0"}`}>Admin Panel</h1>
          <button onClick={() => setIsOpen(!isOpen)} className="text-white text-2xl">
            <FaBars />
          </button>
        </div>

        {/* Navigation Links */}
        <ul className="mt-6 space-y-4">
          {links.map((link) => (
            <li key={link.name} className={`flex items-center p-2 rounded-md hover:bg-blue-600 ${location.pathname === link.path ? "bg-blue-700" : ""}`}>
              <span className="text-xl">{link.icon}</span>
              <Link to={link.path} className={`ml-3 text-lg font-medium transition-opacity ${isOpen ? "opacity-100" : "opacity-0"}`}>
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
