import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaImage, FaEye, FaTimes } from "react-icons/fa";
import useGalleryStore from "../store/useGalleryStore";
import SmartBackButton from "../components/SmartBackButton";

// 1. LIGHTBOX COMPONENT (Stand-alone for focused viewing)
const Lightbox = ({ image, onClose }) => {
  useEffect(() => {
    // Disable scrolling while lightbox is open
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'auto'; };
  }, []);

  return (
    <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-6 backdrop-blur-sm">
      <motion.button 
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute top-6 right-6 text-white text-3xl hover:text-yellow-500 transition-colors"
      >
        <FaTimes />
      </motion.button>
      <motion.img 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        src={image} 
        alt="Enlarged" 
        className="max-w-full max-h-[90vh] object-contain rounded-xl shadow-2xl" 
      />
    </div>
  );
};

const GalleryPage = () => {
  const { images, isLoading, error, loadGallery } = useGalleryStore();
  const [lightboxImage, setLightboxImage] = useState(null);

  useEffect(() => {
    loadGallery();
  }, [loadGallery]);

  return (
    <div className="min-h-screen bg-[#f1f5f9] selection:bg-yellow-200 selection:text-blue-900">
      {/* Navbar */}
      <nav className="bg-white border-b border-slate-100 py-6 px-8 flex justify-between items-center sticky top-0 z-50">
        <h1 className="text-xl font-black text-[#0a192f] tracking-tighter uppercase leading-none">
          Ibirwa Kivu
        </h1>
        <div className="flex items-center gap-6">
          <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Gallery Control</span>
          <SmartBackButton />
        </div>
      </nav>

      <div className="max-w-screen-2xl mx-auto px-8 py-16">
        <header className="mb-20">
          <h2 className="text-6xl md:text-8xl font-black text-[#0a192f] uppercase tracking-tighter mb-4 leading-none">
            Memories in<br/> Motion
          </h2>
          <p className="text-slate-600 font-medium max-w-lg">Moments captured during our biking expeditions and the stunning landscapes of Lake Kivu, Rwanda.</p>
        </header>

        {/* LOADING STATE */}
        {isLoading ? (
          <div className="h-[50vh] flex flex-col items-center justify-center text-[#0a192f]">
            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }} className="w-12 h-12 border-t-2 border-slate-900 rounded-full mb-4" />
            <p className="text-xs font-black tracking-widest uppercase text-slate-500">Syncing Expedition Data...</p>
          </div>
        ) : error ? (
          <div className="text-center py-20 text-red-500 font-bold bg-white rounded-3xl">{error}</div>
        ) : images.length === 0 ? (
          <div className="text-center py-20 text-slate-400 bg-white rounded-3xl border border-slate-100 shadow-sm">
            <FaImage className="mx-auto text-4xl mb-4 opacity-50" />
            <p className="font-medium">No gallery images available yet.</p>
          </div>
        ) : (
          <>
            {/* 2. CUSTOM MASONRY GRID (Defined in CSS below) */}
            <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-4">
              <AnimatePresence>
                {images.map((item) => (
                  <motion.div
                    key={item._id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    // Enlarging on click logic
                    onClick={() => setLightboxImage(item.imageFile)}
                    className="group relative cursor-zoom-in bg-black rounded-3xl shadow-lg border border-slate-100 overflow-hidden"
                  >
                    <img
                      src={item.imageFile}
                      alt={item.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                    />

                    {/* 3. HOVER OVERLAY: TITLE IN CENTER */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-center p-6 backdrop-blur-sm">
                      <motion.div
                        initial={{ y: 20 }}
                        whileInView={{ y: 0 }}
                        className="text-white flex flex-col items-center gap-4"
                      >
                        <FaEye className="text-yellow-500 text-3xl" />
                        <h3 className="text-2xl font-black uppercase tracking-tight leading-tight">
                          {item.title}
                        </h3>
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </>
        )}
      </div>

      {/* LIGHTBOX DISPLAY */}
      {lightboxImage && <Lightbox image={lightboxImage} onClose={() => setLightboxImage(null)} />}
    </div>
    );
  };
export default GalleryPage;