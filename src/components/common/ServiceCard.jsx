import React from "react";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { ArrowRight, MapPin } from "lucide-react";

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    transition: { delay: index * 0.1, duration: 0.6, ease: "easeOut" },
  }),
};

const ServiceCard = ({ service, index }) => {
  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="group relative bg-white rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col h-full border border-gray-100"
    >
      {/* Image Container with Aspect Ratio */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <motion.img
          src={service.imageFile}
          alt={service.title}
          loading="lazy"
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.8 }}
        />
        {/* Overlay Badge */}
        <div className="absolute top-4 left-4">
          <span className="bg-white/90 backdrop-blur-md text-black text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
            Travel in comfort
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center gap-1 text-green-600 mb-2">
          <MapPin size={14} />
          <span className="text-[11px] font-bold uppercase tracking-widest">Kivu Region</span>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 group-hover:text-green-600 transition-colors duration-300">
          {service.title}
        </h2>

        <p className="text-gray-500 text-sm mt-3 line-clamp-3 leading-relaxed flex-grow">
          {service.description.slice(0, 250)}...
        </p>

        <div className="mt-4 pt-4 border-t border-gray-50 flex items-center justify-between">
          <NavLink
            to={`/service/${service._id}`}
            className="flex items-center gap-2 text-sm font-bold text-gray-900 hover:text-green-600 transition-all group/btn"
          >
            Explore Experience
            <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
          </NavLink>
        </div>
      </div>
    </motion.div>
  );
};

export default ServiceCard;
