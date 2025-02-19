import  React from 'react';
import { Sidebar } from "../components/Sidebar";

export const DashboardHome = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold">Welcome to the Admin Dashboard</h1>
      </div>
    </div>
  );
};
