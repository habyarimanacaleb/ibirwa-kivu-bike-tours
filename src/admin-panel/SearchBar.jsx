import React from "react";
import { FaSearch } from "react-icons/fa";

const SearchBar = ({ searchTerm, handleSearch }) => {
  return (
    <div className="flex justify-between items-center py-1 w-full max-w-md mx-auto bg-white shadow-md rounded-lg px-4">
      <FaSearch className="text-gray-400" />
      <input
        type="text"
        placeholder="Search your services..."
        value={searchTerm}
        onChange={handleSearch}
        className="p-2 w-full rounded-lg border-none outline-none"
      />
    </div>
  );
};
export default SearchBar;
