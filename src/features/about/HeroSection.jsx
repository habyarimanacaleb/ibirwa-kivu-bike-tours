import React from 'react';
import { motion } from "framer-motion";

function HeroSection({staggerContainer, fadeUp}) {
  return (
    <section className="relative bg-gradient-to-br from-blue-950 via-blue-900 to-blue-700 px-6 py-24 md:py-40 text-center overflow-hidden">
      {/* Decorative Elements */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.1 }} className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
      
      <motion.div 
        className="relative max-w-3xl mx-auto"
        variants={staggerContainer(0.15, 0.1)}
        initial="hidden"
        animate="show"
      >
        <motion.span variants={fadeUp} className="inline-block bg-white/10 text-blue-100 text-xs tracking-widest uppercase px-4 py-2 rounded-full border border-white/20 mb-8">
          Adventure Cycling in Rwanda
        </motion.span>

        <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl font-black text-white leading-[1.1] mb-8 tracking-tighter">
          We Ride So You Can <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-emerald-300">Discover Lake Kivu</span>
        </motion.h1>

        <motion.p variants={fadeUp} className="text-lg md:text-xl text-blue-100/80 leading-relaxed max-w-2xl mx-auto font-medium">
          Ibirwa Kivu Bike Tours is a Rwandan-owned cycling company. We design tours that go through villages, along volcanoes, and down to the shores of Africa's most beautiful lake.
        </motion.p>
      </motion.div>
    </section>
  );
}
export default HeroSection;