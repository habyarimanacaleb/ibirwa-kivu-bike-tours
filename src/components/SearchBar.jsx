import React from "react";
import { FaSearch } from "react-icons/fa";

const SearchBar = ({ searchTerm, handleSearch }) => {
  return (
    <div className="flex justify-between items-center py-4 w-full">
      <FaSearch className="text-gray-500" />
      <input
        type="text"
        placeholder="Search here"
        value={searchTerm}
        onChange={handleSearch}
        className="p-2 w-full rounded-lg border-none outline-none"
      />
    </div>
  );
};

export default SearchBar;
