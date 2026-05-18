import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

// Smooth viewport reveal variants
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

export default function AboutSummarySection() {
  return (
    <section className="py-20 md:py-28 bg-white border-t border-slate-100 overflow-hidden">
      <motion.div 
        className="max-w-7xl mx-auto px-6"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        
        {/* Header Stack */}
        <motion.div variants={itemVariants} className="mb-12 md:mb-16">
          <p className="text-blue-600 font-black uppercase tracking-[0.25em] text-xs mb-2">
            Who We Are
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-black text-slate-900 tracking-tight leading-tight max-w-3xl">
            About Ibirwa Kivu Bike Tours
          </h2>
        </motion.div>

        {/* Responsive Target Pillar Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch text-slate-600 text-base md:text-lg leading-relaxed font-medium">
          
          {/* Card 1 */}
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -6, scale: 1.01 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="p-6 md:p-8 bg-slate-50/50 border border-slate-200/80 rounded-3xl relative transition-colors duration-300 hover:border-blue-400/60 hover:bg-white hover:shadow-xl hover:shadow-slate-100 flex flex-col justify-between h-full group"
          >
            <span className="w-7 h-7 bg-blue-600 text-white font-bold absolute -top-3 -left-2 rounded-xl text-xs flex items-center justify-center shadow-md shadow-blue-500/20 group-hover:animate-pulse">
              1
            </span>
            <p className="pt-2">
              At Ibirwa Kivu Bike Tours, we don’t just show you Rwanda—we immerse you in its pulse. 
              Built on a passion for authentic active travel, we bridge the gap between world-class 
              adventure sports and raw natural beauty by designing premium, all-inclusive multi-day 
              expeditions. Our core operations are focused entirely around three foundational pillars: 
              navigating the legendary terrain of the <strong className="text-slate-900 font-bold">Congo Nile Trail on top-tier mountain bikes</strong>, 
              tracking pristine wilderness within Rwanda’s majestic <strong className="text-slate-900 font-bold">National Parks</strong>, and cruising 
              across the emerald volcanic horizons of <strong className="text-slate-900 font-bold">Lake Kivu</strong>.
            </p>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -6, scale: 1.01 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="p-6 md:p-8 bg-slate-50/50 border border-slate-200/80 rounded-3xl relative transition-colors duration-300 hover:border-emerald-400/60 hover:bg-white hover:shadow-xl hover:shadow-slate-100 flex flex-col justify-between h-full group"
          >
            <span className="w-7 h-7 bg-emerald-500 text-white font-bold absolute -top-3 -left-2 rounded-xl text-xs flex items-center justify-center shadow-md shadow-emerald-500/20 group-hover:animate-pulse">
              2
            </span>
            <p className="pt-2">
              Whether you are tackling technical single-track ridges with our elite local cycling guides, trekking 
              into ancient mist-shrouded rainforests to see mountain gorillas, or island-hopping via traditional 
              wooden boats to witness the famous singing fishermen at twilight, we manage your entire itinerary 
              flawlessly. From 4x4 mechanical support vehicles and professional park permits to handpicked lakeside 
              eco-lodges, every journey we map balances strict safety standards with genuine community wealth-sharing. 
              We ensure that your exploration directly fuels economic growth for the local Rwandan communities who 
              safeguard these extraordinary landscapes.
            </p>
          </motion.div>

        </div>

        {/* Action Call to Action */}
        <motion.div variants={itemVariants} className="mt-12 text-left">
          <Link 
            to="/services" 
            className="inline-flex items-center gap-2.5 text-sm font-bold uppercase tracking-wider text-blue-600 hover:text-blue-700 transition-colors group"
          >
            Explore Our Expeditions
            <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform duration-300" />
          </Link>
        </motion.div>

      </motion.div>
    </section>
  );
}