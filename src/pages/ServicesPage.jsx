import React, { useEffect, useState } from "react";
import useServiceStore from "../store/useServiceStore";
import ServiceSkeleton from "../components/Home/ServiceSkeleton";
import { motion } from "framer-motion";
import ServiceCard from "../components/common/ServiceCard";
import Navbar from "../components/Navbar";
import { Footer } from "../components/Footer";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

const ServicesPage = () => {
  // Pull global state and fetch action from Zustand
  const { services, isLoading, error, fetchServices } = useServiceStore();

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const toursPerPage = 6; 

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  // Ensure current page doesn't exceed total pages if services list changes
  const totalPages = Math.ceil(services.length / toursPerPage);
  const effectiveCurrentPage = Math.min(currentPage, totalPages || 1);

  // Pagination Logic
  const indexOfLastTour = effectiveCurrentPage * toursPerPage;
  const indexOfFirstTour = indexOfLastTour - toursPerPage;
  const currentTours = services.slice(indexOfFirstTour, indexOfLastTour);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 px-6">
        <div className="text-center p-10 bg-white rounded-3xl shadow-2xl border border-red-50 max-w-md w-full">
          <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-red-500 text-3xl font-bold">!</span>
          </div>
          <p className="text-slate-900 font-serif font-black text-2xl mb-2">Something went wrong</p>
          <p className="text-slate-500 mb-8 text-sm leading-relaxed">{error}</p>
          <button 
            onClick={() => fetchServices()} 
            className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-xl shadow-blue-100 active:scale-95"
          >
            Retry Connection
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FAFAFA] min-h-screen">
      <Navbar />
      
      {/* --- PREMIUM HERO HEADER --- */}
      <section className="relative pt-44 pb-24 px-6 bg-slate-900 overflow-hidden">
        {/* Background Layer */}
        <div className="absolute inset-0">
          <img 
            src="https://res.cloudinary.com/djaqdvqld/image/upload/v1768207392/kivu/services/file_n1lsk9.jpg" 
            alt="Lake Kivu Background" 
            className="w-full h-full object-cover opacity-40 scale-110" 
          />
          {/* Multi-stage Gradient for better text legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-blue-400 font-bold uppercase tracking-[0.4em] text-[10px]">
              Adventure Awaits in Rwanda
            </span>
            <h1 className="text-5xl md:text-7xl font-serif font-black text-white mt-6 mb-8 leading-[1.1]">
              Explore Our <span className="text-blue-500 italic">Signature</span> Tours
            </h1>
            <p className="text-slate-300 max-w-2xl mx-auto text-lg md:text-xl font-light leading-relaxed">
              Crafted journeys across the "Land of a Thousand Hills"—from lakeside cycling to immersive community cultural experiences.
            </p>
          </motion.div>
        </div>
      </section>

      {/* --- LISTINGS GRID --- */}
      <main className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {isLoading
            ? Array.from({ length: 6 }).map((_, i) => <ServiceSkeleton key={i} />)
            : currentTours.map((service, index) => (
                <div key={service._id} className="group">
                   <ServiceCard service={service} index={index} />
                </div>
              ))}
        </div>

        {/* --- REFINED PAGINATION --- */}
        {!isLoading && totalPages > 1 && (
          <div className="mt-24 flex justify-center items-center gap-3">
            <button
              onClick={() => paginate(effectiveCurrentPage - 1)}
              disabled={effectiveCurrentPage === 1}
              className="p-4 rounded-2xl bg-white border border-slate-200 text-slate-600 disabled:opacity-20 hover:bg-slate-50 transition-all shadow-sm"
            >
              <HiChevronLeft size={20} />
            </button>

            <div className="flex gap-3">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i + 1}
                  onClick={() => paginate(i + 1)}
                  className={`w-14 h-14 rounded-2xl font-bold transition-all duration-300 ${
                    effectiveCurrentPage === i + 1
                      ? "bg-blue-600 text-white shadow-2xl shadow-blue-200 scale-110"
                      : "bg-white text-slate-500 border border-slate-100 hover:border-blue-400"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            <button
              onClick={() => paginate(effectiveCurrentPage + 1)}
              disabled={effectiveCurrentPage === totalPages}
              className="p-4 rounded-2xl bg-white border border-slate-200 text-slate-600 disabled:opacity-20 hover:bg-slate-50 transition-all shadow-sm"
            >
              <HiChevronRight size={20} />
            </button>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && services.length === 0 && (
          <div className="text-center py-32 bg-white rounded-[2rem] border-2 border-dashed border-slate-100">
            <div className="text-6xl mb-6">🚲</div>
            <p className="text-slate-400 text-2xl font-serif italic max-w-sm mx-auto">
              We're currently mapping out new routes. Check back very soon!
            </p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default ServicesPage;