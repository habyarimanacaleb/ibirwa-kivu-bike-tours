import React from "react"; 
import { FiSearch } from "react-icons/fi";

export default function TopNav({searchTerm,handleSearch}) {
  console.log("TopNav rendered with searchTerm:", searchTerm);
  return (
    <header className="fixed w-full bg-white shadow px-6 py-4 flex justify-between items-center h-16 z-30">
      {/* Hide on mobile, show on sm+ */}
      <h1 className="text-xl font-semibold text-gray-900 ml-10 hidden sm:flex">
        Dashboard
      </h1>

      <div className="flex items-center space-x-4 mr-0 ml-40 sm:mr-60">
        {/* Search bar */}
        <div className="relative flex items-center bg-gray-100 rounded-full px-3 py-1.5 shadow-sm w-64">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearch}
            className=" w-full bg-transparent outline-none text-sm pr-6 text-gray-700 placeholder-gray-500"
          />
          <FiSearch className="w-5 h-5 text-gray-500 absolute right-2" />
        </div>

        {/* User avatar */}
        <img
          src="https://i.pravatar.cc/40"
          alt="User"
          className="w-10 h-10 rounded-full"
        />
      </div>
    </header>
  );
}
