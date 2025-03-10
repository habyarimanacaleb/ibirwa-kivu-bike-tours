// Sidebar.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaBars,
  FaHome,
  FaPlus,
  FaEdit,
  FaCog,
  FaChartLine,
  FaNewspaper,
  FaEnvelope,
} from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";

export const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();

  const links = [
    { name: "Dashboard", path: "/admin", icon: <FaHome /> },
    { name: "Create Service", path: "/create-service", icon: <FaPlus /> },
    { name: "Create Gallery", path: "/create-gallery", icon: <FaPlus /> },
    { name: "Update Gallery", path: "/update-gallery", icon: <FaEdit /> },
    { name: "User Querry", path: "/contact-information", icon: <FaMessage /> },
    { name: "Settings", path: "/settings", icon: <FaCog /> },
    { name: "Trends", path: "/trends", icon: <FaChartLine /> },
    { name: "News", path: "/news", icon: <FaNewspaper /> },
  ];

  return (
    <>
      <div
        className={`side-bar bg-blue-800 h-screen p-5 text-white transition-all duration-300 fixed  ${
          isOpen ? "w-60" : "w-16"
        } `}
      >
        <div className="flex flex-col items-center justify-between">
          <h1
            className={`text-xl font-bold transition-opacity pb-3 ${
              isOpen ? "opacity-100" : "opacity-0"
            } md:opacity-100`}
          >
            LOGO
          </h1>
          <button onClick={toggleSidebar} className="text-white text-xl">
            <FaBars />
          </button>
        </div>

        {/* Navigation Links */}
        <ul className="mt-6 space-y-4">
          {links.map((link) => (
            <li
              key={link.name}
              className={`flex items-center p-2 rounded-md hover:text-blue-600 ${
                location.pathname === link.path ? "bg-blue-700" : ""
              }`}
            >
              <span className="text-xl">{link.icon}</span>
              <Link
                to={link.path}
                className={`ml-3 text-xl font-medium transition-opacity ${
                  isOpen ? "opacity-100" : "opacity-0"
                } md:opacity-100`}
              >
                {isOpen && link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-blue-800 p-4 flex justify-around text-white">
        {links.map((link) => (
          <Link
            key={link.name}
            to={link.path}
            className="flex flex-col items-center"
          >
            <span className="text-xl">{link.icon}</span>
            <span className="text-xs">{link.name}</span>
          </Link>
        ))}
      </div>
    </>
  );
};
