import React, { useEffect } from "react";
import useServiceStore from "../store/useServiceStore";
import ServiceSkeleton from "./Home/ServiceSkeleton";
import ServiceCard from "../components/common/ServiceCard";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, RefreshCw, AlertCircle, Compass } from "lucide-react";

const Services = () => {
  const { services, isLoading, error, fetchServices } = useServiceStore();

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  // Animation variants for the container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[500px] px-6">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white p-10 rounded-[2.5rem] shadow-2xl border border-red-50 text-center max-w-md relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-red-500" />
          <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertCircle size={40} />
          </div>
          <h2 className="text-2xl font-black text-slate-900 mb-2">Connection Lost</h2>
          <p className="text-slate-500 mb-8 leading-relaxed">We couldn't reach the expedition server. Let's try to reconnect.</p>
          <button 
            onClick={() => fetchServices()} 
            className="group w-full flex items-center justify-center gap-3 bg-slate-900 text-white font-black py-4 rounded-2xl hover:bg-red-600 transition-all shadow-xl shadow-slate-200"
          >
            <RefreshCw size={18} className="group-hover:rotate-180 transition-transform duration-500" />
            RETRY FETCH
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <section className="relative py-24 overflow-hidden bg-[#F8FAFC] rounded-tl-[3rem] rounded-tr-[3rem]">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-100/40 blur-[120px] rounded-full -mr-64 -mt-64" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-100/40 blur-[100px] rounded-full -ml-32 -mb-32" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        
        {/* --- HEADER SECTION --- */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-2 text-blue-600 font-black uppercase tracking-[0.3em] text-xs mb-4"
            >
              <Compass size={14} /> Explore Rwanda
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-6xl font-black text-slate-900 tracking-tighter leading-[0.9]"
            >
              Curated <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-500">Experiences.</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-slate-500 mt-6 text-lg font-medium max-w-md leading-relaxed"
            >
              From the hidden coves of Kivu to mountain vistas, discover tours designed for the modern explorer.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="hidden md:flex items-center gap-3 bg-white px-6 py-4 rounded-3xl shadow-sm border border-slate-100"
          >
            <div className="text-right">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Live Inventory</p>
              <p className="text-xl font-black text-slate-900">{services.length} Adventures</p>
            </div>
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
              <Sparkles size={24} />
            </div>
          </motion.div>
        </div>

        {/* --- GRID SECTION --- */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12"
        >
          {isLoading ? (
            Array.from({ length: 6 }).map((_, index) => (
              <ServiceSkeleton key={`skeleton-${index}`} index={index} />
            ))
          ) : (
            <AnimatePresence>
              {services.map((service, idx) => (
                <motion.div
                  key={service._id}
                  layout
                  whileHover={{ y: -12 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="relative group"
                >
                  <ServiceCard service={service} index={idx} />
                  {/* Modern subtle hover glow */}
                  <div className="absolute inset-0 bg-blue-500/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </motion.div>

        {/* --- EMPTY STATE --- */}
        {!isLoading && services.length === 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="py-32 text-center bg-white rounded-[3rem] border border-slate-100 shadow-inner"
          >
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
               <Compass className="text-slate-300 animate-spin-slow" size={40} />
            </div>
            <h3 className="text-xl font-black text-slate-900 mb-2">New Horizons Coming Soon</h3>
            <p className="text-slate-400 font-medium max-w-xs mx-auto">
              Our guides are currently scouting new locations. Check back shortly for updates.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Services;