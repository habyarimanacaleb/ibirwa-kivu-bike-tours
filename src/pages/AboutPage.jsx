import React, { useEffect, useRef, useState } from "react";
import { motion, useInView, useAnimation, AnimatePresence } from "framer-motion";
import { Target, Eye, BookOpen, Map, Anchor, Compass, Award, ShieldCheck } from "lucide-react";

// Components
import Navbar from "../components/Navbar";
import { Footer } from "../components/Footer";
import HeroSection from "../features/about/HeroSection";
import StorySection from "../features/about/StorySection";
import StatusSection from "../features/about/StatusSection";
import ValueSection from "../features/about/ValueSection";
import CTASection from "../features/about/CTASection";

// ── Updated Data Strategy ──────────────────

const stats = [
  { value: "500+", label: "Expeditions Led" },
  { value: "12", label: "Curated Routes" },
  { value: "100%", label: "Local Impact" },
  { value: "0", label: "Carbon Trail" },
];

const missionVision = {
  mission: {
    title: "Our Mission",
    desc: "To provide world-class outdoor adventures that preserve the natural beauty of Lake Kivu while creating sustainable economic opportunities for the Rwandan people.",
    icon: <Target size={32} />
  },
  vision: {
    title: "Our Vision",
    desc: "To be the global benchmark for sustainable, community-led tourism in Rwanda, bridging heritage with modern exploration.",
    icon: <Eye size={32} />
  }
};

const values = [
  {
    icon: "🌍",
    title: "Local First",
    desc: "Every guide, mechanic, and cook is from the Lake Kivu region. Your journey directly fuels the local economy.",
  },
  {
    icon: "🛡️",
    title: "Engineering Precision",
    desc: "Every route is GPS-mapped, safety-vetted, and meticulously planned. Adventure doesn't have to mean uncertainty.",
  },
  {
    icon: "🌱",
    title: "Eco Integrity",
    desc: "We ride light and respect the landscape. Minimal waste, zero motorized support on trails, maximum respect for nature.",
  },
  {
    icon: "🤝",
    title: "Radical Hospitality",
    desc: "No tourist traps. Just real food, authentic stories, and the genuine warmth of Rwandan culture.",
  },
];

// ── Animation Variants ────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer = (staggerChildren = 0.15, delayChildren = 0.1) => ({
  hidden: {},
  show: { transition: { staggerChildren, delayChildren } },
});

// ── Reusable Wrapper ──────────────────────────

function RevealOnScroll({ children, className = "", delay = 0, variant = fadeUp }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) controls.start("show");
  }, [inView, controls]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        ...variant,
        show: { ...variant.show, transition: { ...variant.show.transition, delay } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ── Stat Animation ────────────────────────────

function useCountUp(target, duration = 1800, active = false) {
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!active) return;
    const isPlus = target.includes("+");
    const num = parseInt(target.replace(/\D/g, ""), 10);
    let startTime = null;

    const step = (ts) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(`${Math.floor(eased * num)}${isPlus ? "+" : ""}`);
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [active, target, duration]);

  return display;
}

function StatCard({ value, label, animate }) {
  const displayed = useCountUp(value, 1600, animate);
  return (
    <motion.div variants={fadeUp} className="text-center py-10 px-6 bg-white/5 backdrop-blur-sm rounded-[2rem] border border-white/10">
      <p className="text-5xl font-black text-white tracking-tighter mb-2">{displayed}</p>
      <p className="text-[10px] text-blue-200 uppercase tracking-[0.2em] font-bold">{label}</p>
    </motion.div>
  );
}

// ── Main About Page ───────────────────────────

function AboutPage() {
  const statsRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-60px" });

  return (
    <>
      <Navbar />
      <div className="font-sans text-slate-900 bg-white overflow-x-hidden">
        
        {/* --- HERO --- */}
        <HeroSection staggerContainer={staggerContainer} fadeUp={fadeUp} />

        {/* --- MISSION & VISION (New High-Impact Section) --- */}
        <section className="py-24 bg-slate-50 relative">
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <RevealOnScroll delay={0.1}>
                <div className="p-12 bg-white rounded-[3.5rem] shadow-xl shadow-blue-900/5 border border-slate-100 h-full group hover:border-blue-500 transition-all duration-500">
                  <div className="w-16 h-16 bg-blue-600 text-white rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-blue-200 group-hover:scale-110 transition-transform">
                    {missionVision.mission.icon}
                  </div>
                  <h2 className="text-4xl font-black mb-6 tracking-tighter">Our Mission</h2>
                  <p className="text-slate-500 text-xl leading-relaxed font-medium">
                    {missionVision.mission.desc}
                  </p>
                </div>
              </RevealOnScroll>

              <RevealOnScroll delay={0.3}>
                <div className="p-12 bg-slate-900 text-white rounded-[3.5rem] shadow-2xl h-full group">
                  <div className="w-16 h-16 bg-emerald-500 text-white rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-emerald-900/20 group-hover:scale-110 transition-transform">
                    {missionVision.vision.icon}
                  </div>
                  <h2 className="text-4xl font-black mb-6 tracking-tighter text-white">Our Vision</h2>
                  <p className="text-slate-400 text-xl leading-relaxed font-medium">
                    {missionVision.vision.desc}
                  </p>
                </div>
              </RevealOnScroll>
            </div>
          </div>
        </section>

        {/* --- STORY --- */}
        <StorySection 
          staggerContainer={staggerContainer} 
          RevealOnScroll={RevealOnScroll}
          fadeUp={fadeUp}
        />

        {/* --- DYNAMIC STATS --- */}
        <div ref={statsRef} className="bg-[#020617] py-24 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {stats.map((stat, i) => (
              <StatCard key={i} {...stat} animate={statsInView} />
            ))}
          </div>
        </div>

        {/* --- CORE VALUES --- */}
        <section className="py-32">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-20">
              <span className="text-blue-600 font-black uppercase tracking-[0.3em] text-xs">The Ibirwa Standard</span>
              <h2 className="text-5xl md:text-6xl font-black tracking-tighter mt-4 text-slate-900">Guided by Principles.</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
              {values.map((v, i) => (
                <RevealOnScroll key={i} delay={i * 0.1}>
                  <div className="flex flex-col items-center text-center group">
                    <div className="text-6xl mb-8 transform group-hover:scale-110 transition-transform duration-300">
                      {v.icon}
                    </div>
                    <h3 className="text-2xl font-black mb-4 tracking-tight text-slate-900">{v.title}</h3>
                    <p className="text-slate-500 leading-relaxed font-medium">{v.desc}</p>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* --- CTA --- */}
        <CTASection RevealOnScroll={RevealOnScroll}/>
      </div>
      <Footer />
    </>
  );
}

export default AboutPage;