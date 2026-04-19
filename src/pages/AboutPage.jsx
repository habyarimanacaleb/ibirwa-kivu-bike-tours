import React, { useEffect, useRef, useState } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import Navbar from "../components/Navbar";
import { Footer } from "../components/Footer";
import HeroSection from "../features/about/HeroSection";
import StorySection from "../features/about/StorySection";
import StatusSection from "../features/about/StatusSection";
import ValueSection from "../features/about/ValueSection";
import TeamSection from "../features/about/TeamSection";
import CTASection from "../features/about/CTASection";

// ── Data ──────────────────

const stats = [
  { value: "500+", label: "Happy Cyclists" },
  { value: "12", label: "Unique Routes" },
  { value: "6", label: "Years of Experience" },
  { value: "100%", label: "Local Guides" },
];

const values = [
  {
    icon: "🌍",
    title: "Local First",
    desc: "Every guide, cook, and support crew member is from the Lake Kivu region. Your money stays in the community.",
  },
  {
    icon: "🚵",
    title: "Adventure Done Right",
    desc: "From gentle lakeside rides to challenging highland climbs — every route is tested, mapped, and safety-checked.",
  },
  {
    icon: "🌱",
    title: "Eco Responsible",
    desc: "We ride light. No motorized support on trails, minimal plastic, and we partner with local conservation efforts.",
  },
  {
    icon: "🤝",
    title: "Honest Hospitality",
    desc: "No tourist traps. Real food, real stories, real Rwanda — the kind of experience you'll talk about for years.",
  },
];

const team = [
  {
    name: "Rwibutso Jean D'Moul",
    role: "Founder & Head Guide",
    initials: "RH",
    bio: "Born in Rubavu, JP has cycled every road around Lake Kivu. He started Ibirwa to share his home with the world.",
    bg: "bg-blue-800",
  },
  {
    name: "Claudine Uwimana",
    role: "Operations Manager",
    initials: "CU",
    bio: "Claudine keeps everything running smoothly — from logistics to customer care, she is the backbone of our team.",
    bg: "bg-blue-600",
  },
  {
    name: "Emmanuel Nkusi",
    role: "Senior Cycling Guide",
    initials: "EN",
    bio: "A former national cyclist turned guide. He knows every hill, shortcut, and hidden viewpoint around Kivu.",
    bg: "bg-blue-900",
  },
];

// ── Reusable animation variants ───────────────
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.7, ease: "easeOut" } },
};

const staggerContainer = (staggerChildren = 0.12, delayChildren = 0.1) => ({
  hidden: {},
  show: { transition: { staggerChildren, delayChildren } },
});

// ── Scroll-triggered wrapper ─────────────────────────
function RevealOnScroll({
  children,
  className = "",
  delay = 0,
  variant = fadeUp,
}) {
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
        show: {
          ...variant.show,
          transition: { ...variant.show.transition, delay },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ── Count-up hook ──────────────────────────
function useCountUp(target, duration = 1800, active = false) {
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!active) return;
    const isPlus = target.includes("+");
    const isPercent = target.includes("%");
    const num = parseInt(target.replace(/\D/g, ""), 10);
    let startTime = null;

    const step = (ts) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(
        `${Math.floor(eased * num)}${isPlus ? "+" : ""}${isPercent ? "%" : ""}`,
      );
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [active, target, duration]);

  return display;
}

// ── Stat card ─────────────────────────────────────────────────────
function StatCard({ value, label, animate, index }) {
  const displayed = useCountUp(value, 1600, animate);
  return (
    <motion.div
      variants={fadeUp}
      className="text-center py-8 px-4"
    >
      <p className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
        {displayed}
      </p>
      <p className="mt-2 text-xs text-blue-300 uppercase tracking-widest font-medium">
        {label}
      </p>
    </motion.div>
  );
}

// ── Main component ─────────────────────────
function AboutPage() {
  const statsRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-60px" });

  return (
    <>
      <Navbar />
      <div className="font-sans text-blue-950 bg-white overflow-x-hidden">
        {/* ──────────── HERO ──────────────────── */}
        <HeroSection staggerContainer={staggerContainer} fadeUp={fadeUp} />
        {/* ── STORY ────────────────────────────────────────────────── */}
        <StorySection 
        staggerContainer={staggerContainer} 
        RevealOnScroll={RevealOnScroll}
        fadeUp={fadeUp}
        />

        {/* ── STATS ────────────────────────────────────────────────── */}
        <StatusSection
        StatCard={StatCard} 
        staggerContainer={staggerContainer} 
        stats={stats}
        />

        {/* ── VALUES ─────────────────── */}
       <ValueSection 
        staggerContainer={staggerContainer}
        fadeUp={fadeUp}
        values={values}
        RevealOnScroll={RevealOnScroll}
       />

       <TeamSection 
       team={team}
       fadeUp={fadeUp}
       staggerContainer={staggerContainer}
       RevealOnScroll={RevealOnScroll}
       />

       <CTASection  RevealOnScroll={RevealOnScroll}/>
      </div>
      <Footer />
    </>
  );
}

export default AboutPage;
