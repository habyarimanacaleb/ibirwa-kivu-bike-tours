import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa";
import axios from "axios";

export const DropdownMenu = ({ closeMenu }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(
          "https://kivu-back-end.onrender.com/api/services"
        );
        setServices(response.data.services || []); 
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const handleNavigation = (serviceId) => {
    setIsOpen(false);
    closeMenu();
    navigate(`/service/${serviceId}`);
  };

  return (
    <div className="relative mr-full lg:mr-40">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="text-white flex items-center text-xl cursor-pointer gap-2"
        title="Services Menu"
        aria-label="Services Menu"
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
          className="absolute left-0 mt-[13px] bg-black z-10 px-2 w-[300px] py-4 rounded-md shadow-lg max-h-80 overflow-y-auto"
        >
          <li>
            <h3 className="text-white font-bold text-[25px] mb-2">
              Our Services
            </h3>
            {loading ? (
              <div className="text-white">Loading...</div>
            ) : error ? (
              <div className="text-red-500">Error: {error.message}</div>
            ) : (
              services.map((service) => (
                <div
                  key={service._id}
                  onClick={() => handleNavigation(service._id)}
                >
                  <button className="text-white p-2 hover:bg-blue-500 w-full text-left flex flex-col items-start gap-2 rounded-md transition duration-200 ease-in-out">
                    {service.title}
                  </button>
                </div>
              ))
            )}
          </li>
        </ul>
      )}
    </div>
  );
};
