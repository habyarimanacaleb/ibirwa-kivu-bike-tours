import React from 'react'
import { MapPin, QuotesIcon } from "@phosphor-icons/react";
import { motion } from "framer-motion";
import GoogleReviews from '../../components/GoogleReviewWidget';

function Review() {
  return (
<section className="relative py-24 bg-[#F8FAFC] overflow-hidden">
  {/* Floating Abstract Element */}
  <div className="absolute top-20 right-10 opacity-10 text-slate-900 pointer-events-none rotate-12">
    <QuotesIcon size={200} />
  </div>

  <div className="max-w-7xl mx-auto px-6 flex flex-col items-center relative z-10">
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="flex items-center gap-2 px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full mb-6 border border-blue-100"
    >
      <MapPin size={14} className="animate-bounce" />
      <span className="text-[10px] font-black uppercase tracking-widest">Global Community</span>
    </motion.div>

    <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-4 text-center tracking-tighter leading-[0.9]">
      What our <br/> 
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-500">
        travellers say.
      </span>
    </h1>
    
    <p className="text-slate-500 font-medium text-center max-w-lg mb-12">
      Real stories from explorers who have traversed Lake Kivu with our dedicated team.
    </p>

    <GoogleReviews />
  </div>
</section>
  )
}

export default Review