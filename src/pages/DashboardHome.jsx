// pages/DashboardHome.jsx
import React from "react";
import { Sidebar } from "../components/Sidebar";
import StatsCard from "../components/StatsCard"; // Default import (without curly braces)
import ChartComponent from "../components/ChartComponent"; // Default import (without curly braces)
import { FaUsers, FaCog, FaChartLine } from "react-icons/fa"; // Icons for stats

export const DashboardHome = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6 ml-64">
        <h1 className="text-3xl font-bold mb-6">
          Welcome to the Admin Dashboard
        </h1>

        {/* Stats Cards Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          <StatsCard title="Total Users" value="1,234" icon={<FaUsers />} />
          <StatsCard title="Active Services" value="24" icon={<FaCog />} />
          <StatsCard title="New Trends" value="7" icon={<FaChartLine />} />
        </div>

        {/* Chart Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <ChartComponent />
        </div>
      </div>
    </div>
  );
};
