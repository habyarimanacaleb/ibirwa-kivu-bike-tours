import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaChevronDown, FaCompass, FaArrowRight } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import useServiceStore from "../../store/useServiceStore";

export const DropdownMenu = ({ closeMenu }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const { services, isLoading, fetchServices } = useServiceStore();

  useEffect(() => {
    fetchServices();
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target))
        setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [fetchServices]);

  // Limit to top 6 services for a clean 2x3 grid
  const displayedServices = services.slice(0, 6);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-white text-sm uppercase hover:text-yellow-400 transition-all font-bold py-2"
      >
        <span>Services</span>
        <FaChevronDown className={`text-sm transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            // UPDATED CLASSES BELOW:
            className="absolute left-1/2 -translate-x-1/2 mt-4 w-[90vw] md:w-[600px] max-h-[80vh] overflow-y-auto scrollbar-hide bg-black/95 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl z-50"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-4 px-2">
                <h3 className="text-yellow-500 text-[10px] uppercase tracking-[0.2em] font-black">
                  Top Tours
                </h3>
                <button
                  onClick={() => {
                    navigate("/services");
                    setIsOpen(false);
                    closeMenu();
                  }}
                  className="text-[10px] text-gray-400 hover:text-white flex items-center gap-1 transition-colors uppercase font-bold"
                >
                  Explore All <FaArrowRight size={8} />
                </button>
              </div>

              {/* Responsive Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {displayedServices.map((service) => (
                  <button
                    key={service._id}
                    onClick={() => {
                      setIsOpen(false);
                      closeMenu();
                      navigate(`/service/${service._id}`);
                    }}
                    className="flex items-start gap-3 p-3 rounded-2xl hover:bg-white/5 transition-all group border border-transparent hover:border-white/10"
                  >
                    <div className="bg-white/10 p-2 rounded-xl group-hover:bg-yellow-500 transition-colors">
                      <FaCompass className="text-white group-hover:text-black text-sm" />
                    </div>
                    <div className="text-left">
                      <p className="text-white text-xs font-bold group-hover:text-yellow-400 transition-colors line-clamp-1">
                        {service.title}
                      </p>
                      <p className="text-[9px] text-gray-500">Learn More</p>
                    </div>
                  </button>
                ))}
              </div>

              {/* Bottom CTA for Mobile Visibility */}
              <div className="mt-4 pt-4 border-t border-white/5 md:hidden">
                <button
                  onClick={() => {
                    navigate("/services");
                    setIsOpen(false);
                    closeMenu();
                  }}
                  className="w-full bg-yellow-500 text-black py-3 rounded-xl font-black text-sm"
                >
                  See All Experiences
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
