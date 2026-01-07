/* ---------------------------------- */

import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

/* Animation Variants */
const cardVariants = {
    hidden: (index) => ({
        opacity: 0,
        y: 20,
        transition: { delay: index * 0.1 },
    }),
    visible: (index) => ({
        opacity: 1,
        y: 0,
        transition: { delay: index * 0.1, duration: 0.5 },
    }),
};
    
/* Service Card Component              */
/* ---------------------------------- */
const ServiceCard = ({ service, index }) => {
  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ scale: 1.04 }}
      className="bg-white p-4 rounded-lg shadow-lg flex flex-col overflow-hidden"
    >
      {service.imageFile && (
        <div className="w-full max-h-[600px] rounded-lg overflow-hidden">
          <motion.img
            src={service.imageFile}
            alt={service.title}
            loading="lazy"
            className="w-full h-[60vh] object-cover"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.4 }}
          />
        </div>
      )}

      <h2 className="text-xl font-bold mt-4 hover:text-blue-600 transition">
        {service.title}
      </h2>

      <p className="text-sm text-gray-500 mt-2 flex-grow">
        {service.description?.slice(0, 200)}...
      </p>

      <Link
        to={`/service/${service._id}`}
        className="text-blue-500 mt-3 hover:underline hover:text-blue-700 transition"
      >
        Learn more →
      </Link>
    </motion.div>
  );
};
export default ServiceCard;