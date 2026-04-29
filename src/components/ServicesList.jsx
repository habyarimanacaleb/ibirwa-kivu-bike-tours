import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Edit3, Trash2, ExternalLink, MapPin, Plus, Box, ShieldCheck } from "lucide-react";
import useServiceStore from "../store/useServiceStore";
import { motion, AnimatePresence } from "framer-motion";

const ServicesList = () => {
  const navigate = useNavigate();
  const { services, deleteService } = useServiceStore();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
      <AnimatePresence>
        {services.map((service, index) => (
          <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            key={service._id}
            className="group bg-white rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-blue-900/10 transition-all duration-500 overflow-hidden flex flex-col"
          >
            {/* Image Header with Glassmorphism Overlay */}
            <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
              {service.imageFile ? (
                <img
                  src={service.imageFile}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-slate-300">
                  <Box size={40} strokeWidth={1} />
                  <span className="text-[10px] uppercase tracking-widest mt-2">No Media Assets</span>
                </div>
              )}
              
              {/* ID Badge */}
              <div className="absolute top-4 left-4">
                 <span className="bg-slate-900/80 backdrop-blur-md text-white text-[9px] font-black px-3 py-1.5 rounded-full uppercase tracking-tighter">
                   REF: {service._id.slice(-6).toUpperCase()}
                 </span>
              </div>

              {/* Verified Badge (Visual only) */}
              <div className="absolute top-4 right-4">
                 <div className="bg-white/90 backdrop-blur-md p-1.5 rounded-full text-emerald-500 shadow-sm">
                   <ShieldCheck size={14} />
                 </div>
              </div>
            </div>

            {/* Card Body */}
            <div className="p-8 flex-grow flex flex-col">
              <div className="flex items-center gap-1.5 text-blue-600 mb-3">
                <MapPin size={14} />
                <span className="text-[10px] font-black uppercase tracking-[0.2em]">Kivu Operations</span>
              </div>
              
              <h2 className="text-2xl font-black text-slate-900 tracking-tighter line-clamp-1 mb-3">
                {service.title}
              </h2>
              
              <p className="text-slate-500 text-sm line-clamp-3 leading-relaxed mb-8 font-medium">
                {service.description}
              </p>

              {/* Action Bar - Modern Grid */}
              <div className="mt-auto grid grid-cols-3 gap-3 pt-6 border-t border-slate-50">
                <Link
                  to={`/service/${service._id}`}
                  className="flex flex-col items-center justify-center gap-1.5 py-3 rounded-2xl bg-slate-50 text-slate-400 hover:bg-blue-600 hover:text-white transition-all duration-300 group/btn"
                >
                  <ExternalLink size={16} className="group-hover/btn:scale-110 transition-transform" />
                  <span className="text-[9px] font-black uppercase tracking-widest">Live View</span>
                </Link>
                
                <button
                  onClick={() => navigate(`/update-service/${service._id}`)}
                  className="flex flex-col items-center justify-center gap-1.5 py-3 rounded-2xl bg-slate-50 text-slate-400 hover:bg-amber-500 hover:text-white transition-all duration-300 group/btn"
                >
                  <Edit3 size={16} className="group-hover/btn:scale-110 transition-transform" />
                  <span className="text-[9px] font-black uppercase tracking-widest">Edit</span>
                </button>
                
                <button
                  onClick={() => {
                    if(window.confirm("Archiving this service will remove it from public view. Proceed?")) {
                      deleteService(service._id);
                    }
                  }}
                  className="flex flex-col items-center justify-center gap-1.5 py-3 rounded-2xl bg-slate-50 text-slate-400 hover:bg-rose-500 hover:text-white transition-all duration-300 group/btn"
                >
                  <Trash2 size={16} className="group-hover/btn:scale-110 transition-transform" />
                  <span className="text-[9px] font-black uppercase tracking-widest">Remove</span>
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Add New Placeholder - Visual Upgrade */}
      <motion.div 
        whileHover={{ scale: 0.98 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate("/create-service")}
        className="group border-2 border-dashed border-slate-200 rounded-[2.5rem] flex flex-col items-center justify-center p-12 cursor-pointer hover:border-blue-500 hover:bg-blue-50/20 transition-all duration-500"
      >
        <div className="w-20 h-20 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 shadow-inner">
          <Plus size={32} strokeWidth={3} />
        </div>
        <h3 className="mt-6 font-black text-slate-400 group-hover:text-blue-600 uppercase tracking-widest text-xs">
          Provision New Service
        </h3>
        <p className="mt-2 text-[10px] text-slate-300 font-medium">Add a new expedition to the Ibirwa catalog</p>
      </motion.div>
    </div>
  );
};

export default ServicesList;