// src/components/DashboardLayout.jsx
import React, { useState } from "react";

export const DashboardLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside
        className={`w-64 bg-gradient-to-b from-blue-600 to-blue-500 text-white flex flex-col justify-between fixed lg:relative transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 transition-transform duration-300 ease-in-out z-50`}
      >
        {/* Sidebar Content */}
        <div className="p-6">
          <h1 className="text-2xl font-bold text-center">Admin Dashboard</h1>
        </div>
        {/* Sidebar Menu */}
        <nav className="flex-grow">
          <ul className="space-y-6 p-4">
            <li>
              <button className="w-full text-left px-4 py-2 rounded hover:bg-blue-500 transition flex items-center gap-3">
                <i className="fa-solid fa-house"></i> Dashboard Home
              </button>
            </li>
            {/* Add other menu items */}
          </ul>
        </nav>
        {/* Sidebar Footer */}
        <div className="p-6 bg-blue-700">
          <button className="w-full text-left px-4 py-2 rounded hover:bg-blue-500 transition flex items-center gap-3">
            <i className="fa-solid fa-sign-out-alt"></i> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow flex flex-col">
        {/* Header */}
        <header className="bg-white shadow p-4 flex justify-between items-center">
          {/* Hamburger Menu (Visible on mobile) */}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="lg:hidden text-gray-800 focus:outline-none"
          >
            <i className="fa-solid fa-bars text-2xl"></i>
          </button>
          <h2 className="text-xl font-bold text-gray-800">Dashboard Home</h2>
          {/* User Menu */}
          <div className="flex items-center gap-4">
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
              <i className="fa-solid fa-bell"></i>
            </button>
            <div className="relative">
              <button className="flex items-center gap-2 bg-gray-200 px-4 py-2 rounded hover:bg-gray-300 transition">
                <i className="fa-solid fa-user"></i>
                <span>Admin</span>
                <i className="fa-solid fa-chevron-down"></i>
              </button>
              {/* Dropdown Menu */}
              <div className="hidden absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg">
                <ul className="p-2">
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Profile
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Settings
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <div className="flex-grow p-8 overflow-y-auto">{children}</div>
      </main>
    </div>
  );
};
