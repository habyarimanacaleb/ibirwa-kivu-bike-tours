import React from "react";
import Sidebar from "./Sidebar";
import TopNav from "./TopNav";

export default function MainLayout({ children }) {
  
  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden sm:flex-row flex-col">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-auto">
        <TopNav />
        <main className="p-6 mt-22 flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
