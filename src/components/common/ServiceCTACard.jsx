import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const ServiceCTACard = () => {
  return (
    <div className="relative rounded-xl overflow-hidden">
      {/* 🔄 Rotating dashed border */}
      <motion.div
        className="absolute inset-0 rounded-xl border-2 border-dashed border-blue-500 pointer-events-none"
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          duration: 18,
          ease: "linear",
        }}
      />

      {/* Card content */}
      <div className="relative z-10 flex flex-col items-center justify-center bg-blue-50 p-6 rounded-xl text-center">
        <h3 className="text-xl font-bold text-blue-700 mb-2">
          Discover More Tours
        </h3>

        <p className="text-gray-600 mb-4">
          Explore all our biking and adventure experiences around Lake Kivu.
        </p>

        <Link
          to="/services"
          className="inline-block rounded-full bg-blue-600 px-6 py-3 text-white font-semibold hover:bg-blue-700 transition"
        >
          View All Services →
        </Link>
      </div>
    </div>
  );
};

export default ServiceCTACard;
