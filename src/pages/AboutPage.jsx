import React, { useEffect, useRef, useState } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import { Target, Eye } from "lucide-react";

// Components
import Navbar from "../components/Navbar";
import { Footer } from "../components/Footer";
import HeroSection from "../features/about/HeroSection";
import StorySection from "../features/about/StorySection";
import CTASection from "../features/about/CTASection";

const stats = [
  { value: "500+", label: "Expeditions Led" },
  { value: "12", label: "Curated Routes" },
  { value: "100%", label: "Local Impact" },
  { value: "0", label: "Carbon Trail" },
];

const values = [
  {
    icon: "🌍",
    title: "Community Anchored",
    desc: "We don't just hire locally; we are local. Every expedition is powered by the people of Lake Kivu, ensuring your journey directly sustains the region’s economic heritage.",
  },
  {
    icon: "⚙️",
    title: "Technical Excellence",
    desc: "Precision is our safety net. Using advanced GPS mapping and rigorous mechanical vetting, we eliminate the variables so you can focus entirely on the horizon.",
  },
  {
    icon: "🌿",
    title: "Low-Impact Legacy",
    desc: "We operate with a 'Leave No Trace' mandate. By prioritizing human-powered transit and zero-waste logistics, we preserve the trails for the next generation of riders.",
  },
  {
    icon: "🕯️",
    title: "Cultural Immersion",
    desc: "Beyond the saddle, we connect you to the soul of Rwanda. From shared meals in village homes to hidden heritage sites, we provide access that typical tours miss.",
  },
];

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
                    To provide world-class adventures that preserve Lake Kivu
                    while creating sustainable opportunities for the Rwandan
                    people.
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
                    To be the global benchmark for community-led tourism in
                    Rwanda, bridging heritage with modern exploration.
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
                  <section  className="group flex gap-8 items-start">
                    <div className="flex flex-col items-center ">
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
