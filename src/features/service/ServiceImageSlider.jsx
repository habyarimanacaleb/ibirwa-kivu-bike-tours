import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { FaEye, FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export const ServiceImageSlider = ({ images }) => {
  const [fullScreenImage, setFullScreenImage] = useState(null);

  return (
    <div className="relative w-full">
      {/* Custom Scoped Swiper Styling to match your premium branding */}
      <style dangerouslySetInnerHTML={{__html: `
        .swiper-button-next, .swiper-button-prev {
          color: #ffffff !important;
          background-color: rgba(10, 25, 47, 0.75);
          width: 44px !important;
          height: 44px !important;
          border-radius: 50%;
          backdrop-filter: blur(4px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.3s ease;
        }
        .swiper-button-next:after, .swiper-button-prev:after {
          font-size: 16px !important;
          font-weight: bold;
        }
        .swiper-button-next:hover, .swiper-button-prev:hover {
          background-color: #2563eb !important;
          transform: scale(1.05);
        }
        .swiper-pagination-bullet-active {
          background: #2563eb !important;
          width: 24px !important;
          border-radius: 4px !important;
        }
      `}} />

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={16} // Generous gap between slides
        loop={images.length > 1}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        navigation={true}
        pagination={{ clickable: true, dynamicBullets: true }}
        // Clean responsive breakpoints
        breakpoints={{
          320: { slidesPerView: 1, spaceBetween: 12 }, // 1 image on mobile
          640: { slidesPerView: 2, spaceBetween: 16 }, // 2 on tablets
          1024: { slidesPerView: 3, spaceBetween: 20 }, // 3 on small laptops
          1280: { slidesPerView: 4, spaceBetween: 24 }  // 4 on large screens
        }}
        className="w-full h-[260px] md:h-[380px] pb-12" // Added padding at bottom for dynamic pagination bullets
      >
        {images.map((img, index) => (
          <SwiperSlide key={index} className="overflow-hidden rounded-[2rem]">
            <div className="relative w-full h-full group overflow-hidden bg-slate-900 border border-slate-100/10">
              <img 
                src={img} 
                alt={`Gallery snapshot ${index + 1}`} 
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 group-hover:opacity-90" 
                loading="lazy"
              />
              
              {/* Perfectly centered layout layer overlay */}
              <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                <button 
                  onClick={() => setFullScreenImage(img)}
                  className="bg-white text-slate-900 p-4 rounded-full shadow-2xl scale-75 group-hover:scale-100 transition-all duration-300 hover:bg-blue-600 hover:text-white"
                  title="Expand frame"
                >
                  <FaEye size={18} />
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Lightbox Preview Modal with smooth Framer Motion transitions */}
      <AnimatePresence>
        {fullScreenImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setFullScreenImage(null)}
            className="fixed inset-0 z-[9999] bg-slate-950/95 flex items-center justify-center p-4 backdrop-blur-md"
          >
            <button 
              onClick={() => setFullScreenImage(null)} 
              className="absolute top-6 right-6 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-4 rounded-full transition-all text-xl"
            >
              <FaTimes />
            </button>
            
            <motion.img 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25 }}
              src={fullScreenImage} 
              alt="Enlarged gallery frame view" 
              className="max-w-full max-h-[85vh] rounded-2xl object-contain shadow-2xl border border-white/5" 
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};