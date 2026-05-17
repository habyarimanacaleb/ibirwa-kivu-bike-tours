import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Target, Eye, Compass, Calendar, ShieldCheck, MapPin } from "lucide-react";

// Components
import Navbar from "../components/Navbar";
import { Footer } from "../components/Footer";
import HeroSection from "../features/about/HeroSection";
import StorySection from "../features/about/StorySection";
import CTASection from "../features/about/CTASection";
import { categories, stats, tourServices, values } from "../constants";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer = (staggerChildren = 0.15, delayChildren = 0.1) => ({
  hidden: {},
  show: { transition: { staggerChildren, delayChildren } },
});

function RevealOnScroll({ children, className = "", delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      variants={{
        ...fadeUp,
        show: {
          ...fadeUp.show,
          transition: { ...fadeUp.show.transition, delay },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function StatCard({ value, label, animate }) {
  const [display, setDisplay] = useState("0");
  useEffect(() => {
    if (!animate) return;
    const num = parseInt(value.replace(/\D/g, ""), 10);
    let start = 0;
    const end = num;
    if (start === end) return;
    let totalMiliseconds = 1500;
    let incrementTime = (totalMiliseconds / end) * 2;
    let timer = setInterval(() => {
      start += 1;
      setDisplay(
        `${start}${value.includes("+") ? "+" : value.includes("%") ? "%" : ""}`,
      );
      if (start === end) clearInterval(timer);
    }, incrementTime);
  }, [animate, value]);

  return (
    <motion.div
      variants={fadeUp}
      className="text-center py-10 px-6 bg-white/5 backdrop-blur-sm rounded-[2rem] border border-white/10"
    >
      <p className="text-5xl font-black text-white tracking-tighter mb-2">
        {display}
      </p>
      <p className="text-[10px] text-blue-200 uppercase tracking-[0.2em] font-bold">
        {label}
      </p>
    </motion.div>
  );
}

function AboutPage() {
  const statsRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true });
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredServices = activeCategory === "All" 
    ? tourServices 
    : tourServices.filter(s => s.category === activeCategory || (activeCategory === "Custom Packages" && s.category === "Custom Packages"));

  return (
    <>
      <Navbar />
      <div className="bg-white overflow-x-hidden">
        <HeroSection staggerContainer={staggerContainer} fadeUp={fadeUp} />

        {/* MISSION & VISION */}
        <section className="py-24 bg-slate-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <RevealOnScroll delay={0.1}>
                <div className="p-12 bg-white rounded-[3rem] shadow-xl border border-slate-100 group hover:border-blue-500 transition-all duration-500 h-full">
                  <div className="w-14 h-14 bg-blue-600 text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                    <Target size={28} />
                  </div>
                  <h2 className="text-3xl font-black mb-4">Our Mission</h2>
                  <p className="text-slate-500 text-lg leading-relaxed">
                    To deliver unmatched, secure, and diverse African travel experiences across 
                    lakes, trails, and national safaris, creating direct wealth-sharing channels 
                    for Rwandan local communities.
                  </p>
                </div>
              </RevealOnScroll>
              <RevealOnScroll delay={0.2}>
                <div className="p-12 bg-slate-900 text-white rounded-[3rem] shadow-2xl group h-full">
                  <div className="w-14 h-14 bg-emerald-500 text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                    <Eye size={28} />
                  </div>
                  <h2 className="text-3xl font-black mb-4">Our Vision</h2>
                  <p className="text-slate-400 text-lg leading-relaxed">
                    To be the leading premium gateway for holistic adventure, eco-tourism, 
                    and cultural exploration in East Africa—setting the global benchmark for 
                    all-inclusive hospitality.
                  </p>
                </div>
              </RevealOnScroll>
            </div>
          </div>
        </section>

        <StorySection
          RevealOnScroll={RevealOnScroll}
          fadeUp={fadeUp}
          staggerContainer={staggerContainer}
        />

        {/* DYNAMIC STATS */}
        <div
          ref={statsRef}
          className="bg-[#020617] py-24 relative overflow-hidden"
        >
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {stats.map((stat, i) => (
              <StatCard key={i} {...stat} animate={statsInView} />
            ))}
          </div>
        </div>

        {/* --- BRAND NEW INTERACTIVE SERVICES SHOWCASE GRID --- */}
        <section className="py-32 bg-slate-50 border-y border-slate-200/60">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center md:text-left mb-16 max-w-3xl">
              <span className="text-blue-600 font-black uppercase tracking-[0.3em] text-xs">
                Our Full Matrix
              </span>
              <h2 className="text-4xl md:text-5xl font-black mt-4 text-slate-900 tracking-tight leading-tight">
                An All-Inclusive Tour Catalog.
              </h2>
              <p className="text-slate-500 text-lg mt-4 font-medium leading-relaxed">
                We handle your entire itinerary. From tactical multi-day tracking rentals to luxury lake transits and national reserve game drives.
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2 mb-10 pb-4 border-b border-slate-200">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-300 ${
                    activeCategory === cat
                      ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                      : "bg-white text-slate-600 hover:bg-slate-200 border border-slate-200/80"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Grid Layout */}
            <motion.div 
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredServices.map((service) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  key={service.id}
                  className="bg-white p-6 rounded-[2rem] border border-slate-200/60 shadow-sm hover:shadow-xl hover:border-blue-500/30 transition-all duration-300 group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[10px] tracking-widest font-black text-blue-500 uppercase bg-blue-50 px-3 py-1 rounded-full">
                        {service.category}
                      </span>
                      <Compass className="w-4 h-4 text-slate-300 group-hover:text-blue-500 group-hover:rotate-45 transition-all duration-300" />
                    </div>
                    <h4 className="text-lg font-bold text-slate-800 leading-snug group-hover:text-blue-600 transition-colors">
                      {service.title}
                    </h4>
                  </div>
                  <div className="mt-6 flex items-center gap-2 text-xs font-bold text-slate-400 group-hover:text-blue-500 transition-colors">
                    <MapPin className="w-3.5 h-3.5 shrink-0" />
                    <span>Rwanda Exploration</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CORE VALUES */}
        <section className="py-32 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-24 max-w-3xl">
              <span className="text-blue-600 font-black uppercase tracking-[0.3em] text-xs">
                The Ibirwa Standard
              </span>
              <h2 className="text-5xl md:text-6xl font-black mt-4 tracking-tighter text-slate-900 leading-tight">
                Guided by Principles, <br /> Driven by Precision.
              </h2>
              <div className="h-2 w-24 bg-blue-600 mt-8 rounded-full" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-20">
              {values.map((v, i) => (
                <RevealOnScroll key={i} delay={i * 0.1}>
                  <section className="group flex gap-8 items-start">
                    <div className="flex flex-col items-center">
                      <span className="text-blue-100 font-black text-5xl mb-3 group-hover:text-blue-600 transition-all duration-500 italic border-2 border-blue-100 group-hover:border-blue-600 rounded-full w-16 h-16 flex items-center justify-center">
                        0{i + 1}
                      </span>
                      <div className="h-24 w-px bg-slate-200 group-hover:bg-blue-600 transition-all duration-500" />
                    </div>

                    <section className="pt-2">
                      <h3 className="text-2xl font-black mb-4 tracking-tight text-slate-900">
                        {v.title}
                      </h3>
                      <p className="text-slate-500 leading-relaxed text-lg font-medium">
                        {v.desc}
                      </p>
                    </section>
                  </section>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </section>

        <CTASection RevealOnScroll={RevealOnScroll} />
      </div>
      <Footer />
    </>
  );
}

export default AboutPage;