import React from "react";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="relative h-[70vh] flex items-center justify-center overflow-hidden bg-slate-900">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-[10s] hover:scale-110"
        style={{ backgroundImage: "url('../kivu-image/mtb-bg-image.jpg')" }}
      />
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px]" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <span className="inline-block px-4 py-1.5 bg-blue-600 text-white text-[10px] font-black uppercase tracking-[0.4em] rounded-full mb-6">
            Elite MTB Expedition
          </span>
          <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter leading-none mb-6">
            Explore <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Rwanda.</span>
          </h1>
          <p className="text-lg md:text-2xl text-slate-100 font-medium max-w-2xl mx-auto opacity-90 tracking-tight">
            A 6-Day journey through the Land of a Thousand Hills.
          </p>
        </motion.div>
      </div>

      {/* Decorative Wave at Bottom */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
        <svg className="relative block w-full h-12 text-white fill-current" viewBox="0 0 1200 120">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C57.23,105.15,113.4,113,172,119.03c58.6,6.03,117.2,12.06,172,12.06Z"></path>
        </svg>
      </div>
    </section>
  );
};

export default Hero;