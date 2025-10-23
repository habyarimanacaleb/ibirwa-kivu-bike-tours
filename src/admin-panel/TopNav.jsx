import React from "react";
import { FiSearch } from "react-icons/fi";

export default function TopNav() {
  return (
    <header className="fixed w-full bg-white shadow px-6 py-4 flex justify-between items-center h-16 z-30">
      {/* Hide on mobile, show on sm+ */}
      <h1 className="text-xl font-semibold text-gray-900 ml-10 hidden sm:flex">
        Dashboard
      </h1>

      <div className="flex items-center space-x-4 mr-0 ml-40 sm:mr-64">
        {/* Search bar */}
        <form
          action="https://www.google.com/search"
          method="GET"
          target="_blank"
          className="relative flex items-center bg-gray-100 rounded-full px-3 py-1.5 shadow-sm w-56"
        >
          <input
            type="text"
            name="q"
            placeholder="Search on Google..."
            className="w-full bg-transparent outline-none text-sm pr-6 text-gray-700 placeholder-gray-500"
          />
          <button type="submit">
            <FiSearch className="w-5 h-5 text-gray-500 absolute right-2 top-2" />
          </button>
        </form>


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
