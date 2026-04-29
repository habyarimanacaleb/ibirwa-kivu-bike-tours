import React from "react";
import Navbar from "../components/Navbar";
import Hero  from "../features/mtb/Hero ";
import { ExploreDescription } from "../features/mtb/ExploreDescription";
import { Footer } from "../components/Footer";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export const ExploreRwanda = () => {
  return (
    <div className="bg-white text-slate-900">
      <Navbar />
      <Hero />

      {/* Introduction */}
      <section className="max-w-4xl mx-auto px-6 py-24 text-center">
        <motion.h2 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-4xl md:text-6xl font-black tracking-tighter leading-tight mb-8"
        >
          A Land of <span className="italic text-blue-600">Wonders.</span>
        </motion.h2>
        <p className="text-xl text-slate-500 font-medium leading-relaxed">
          Rwanda boasts breathtaking landscapes, unique wildlife, and rich cultural traditions. 
          Whether you’re seeking a high-altitude physical test or peaceful natural serenity, 
          Ibirwa offers an expedition that transforms.
        </p>
      </section>

      {/* Main Content Section */}
      <div className="bg-slate-50/50">
        <ExploreDescription />
      </div>

      {/* Final CTA Section */}
      <div className="py-32 px-6 flex flex-col items-center justify-center text-center bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-50/30 -z-10" />
        <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-6">
          Ready for the <br /> <span className="text-blue-600">Next Peak?</span>
        </h2>
        <p className="text-lg text-slate-500 mb-10 max-w-md font-medium">
          Join our elite team for an unforgettable journey through the heart of Africa.
        </p>

        <a 
          href="/contact" 
          className="group flex items-center gap-3 bg-slate-900 text-white px-10 py-5 rounded-[2rem] font-black uppercase tracking-widest hover:bg-blue-600 transition-all shadow-2xl shadow-slate-200"
        >
          Book Your Adventure
          <ArrowRight className="group-hover:translate-x-2 transition-transform" />
        </a>
      </div>

      <Footer />
    </div>
  );
};