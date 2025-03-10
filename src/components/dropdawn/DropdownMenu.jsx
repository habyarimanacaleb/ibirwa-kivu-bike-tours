import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa";
import servicesData from "../../assets/Servicesdata.js";

export const DropdownMenu = ({ closeMenu }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleNavigation = (serviceId) => {
    setIsOpen(false);
    closeMenu();
    navigate(`/service/${serviceId}`);
  };

  return (
    <div className="relative mr-0 lg:mr-40">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="text-white flex items-center text-xl cursor-pointer gap-2"
        title="Services Menu"
      >
        <FaChevronDown
          className={`transition-transform duration-200 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>
      {/* Dropdown List */}
      {isOpen && (
        <ul
          ref={dropdownRef}
          className="absolute left-0 mt-[13px] bg-blue-700 z-10 px-2 w-[300px] py-4 rounded-md shadow-lg max-h-80 overflow-y-auto"
        >
          <li>
            <h3 className="text-gray-600 font-semibold text-[18px] mb-2">
              Our Services
            </h3>
            {servicesData.map((service) => (
              <div
                key={service.id}
                onClick={() => handleNavigation(service.id)}
              >
                <button className="text-white p-2 hover:bg-blue-500 w-full text-left flex flex-col items-center">
                  {service.title}
                </button>
              </div>
            ))}
          </li>
        </ul>
      )}
    </div>
  );
};
