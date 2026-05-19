import React, { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Style merge utility function
const cn = (...inputs) => twMerge(clsx(inputs));

// 1. Data Matrix
const pillars = [
  {
    number: 1,
    side: "left", // Desktop positioning context
    theme: "blue",
    iconBg: "bg-blue-600",
    text: (
      <>
        IBIRWA KIVU BIKE TOURS is a local tour company in Rwanda offering
        unforgettable adventures and authentic travel experiences across the
        country. We specialize in cycling tours, Congo Nile Trail experiences,
        hiking adventures, national park tours, Lake Kivu activities, bike and
        car rental services, accommodation booking, and customized trips. Our
        mission is to help travelers discover the natural beauty, culture, and
        hospitality of Rwanda through safe, professional, and memorable
        experiences. From scenic biking trails and mountain hikes to relaxing
        Lake Kivu excursions, we create journeys that connect visitors with the
        heart of Rwanda. With experienced local guides and personalized service,
        IBIRWA KIVU BIKE TOURS is committed to making every adventure unique,
        enjoyable, and unforgettable.
      </>
    ),
  },
  {
    number: 2,
    side: "right", // Desktop positioning context
    theme: "emerald",
    iconBg: "bg-emerald-500",
    text: (
      <>
        We offers Local expertise, unforgettable adventures, and authentic
        Rwanda experiences. We offer cycling tours, Congo Nile Trail
        expeditions, Lake Kivu activities, hiking adventures, national park
        tours, bike and car rentals, accommodation assistance, and customized
        travel experiences designed to help you explore the beauty of Rwanda
        safely and comfortably.
      </>
    ),
  },
];

// 2. Pillar Node Component (Alternating Layout and InView detection)
const PillarNode = ({ pillar, totalPillars }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Component configuration
  const isLast = pillar.number === totalPillars;
  const isLeft = pillar.side === "left";

  return (
    <div
      ref={ref}
      className={cn(
        "grid items-center gap-4 md:gap-6",
        // Desktop structure: Center the vertical line
        "md:grid-cols-[1fr_auto_1fr] md:items-start",
        // Mobile structure: Normal grid, line is handled implicitly
        "grid-cols-1 pb-12 md:pb-20 relative",
      )}
    >
      {/* 3. The Numbered Node & Connector Line */}
      <div
        className={cn(
          "md:col-start-2 z-10 flex flex-col items-center",
          // Mobile positioning: top-left of the text block
          "absolute top-6 left-6 md:relative md:top-0 md:left-0 md:w-auto",
        )}
      >
        {/* Node Circle */}
        <motion.div
          animate={
            isInView ? { scale: 1, opacity: 1 } : { scale: 0.5, opacity: 0 }
          }
          transition={{ duration: 0.4, delay: 0.1 }}
          className={cn(
            "w-12 h-12 md:w-16 md:h-16 rounded-3xl flex items-center justify-center font-bold font-mono text-xl md:text-2xl text-white shadow-xl group",
            pillar.iconBg,
          )}
        >
          {pillar.number}
        </motion.div>

        {/* Mobile Static Connector Line (only on mobile) */}
        {!isLast && (
          <div className="absolute top-[48px] md:hidden left-1/2 -translate-x-1/2 w-0.5 h-full bg-slate-100 -z-10" />
        )}
      </div>

      {/* 4. Text Pillar Card */}
      <motion.div
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
        whileHover={{ y: -6 }}
        className={cn(
          "bg-white border border-slate-100 rounded-3xl relative transition-all duration-300 hover:shadow-xl hover:shadow-slate-100",
          "p-4 md:p-6",
          // Mobile layout adjustments
          "pt-12 md:pt-10 pl-4 md:pl-8 ml-12 md:ml-0",
          // Theme specific hover colors
          isLeft ? "hover:border-blue-400/60" : "hover:border-emerald-400/60",
          // Desktop positioning
          isLeft ? "md:col-start-1" : "md:col-start-3",
        )}
      >
        <p className="text-slate-600 text-base md:text-lg leading-relaxed font-medium pt-2">
          {pillar.text}
        </p>
      </motion.div>
    </div>
  );
};

// ==========================================
// Main Section Export
// ==========================================
export default function AboutHomeSection() {
  const containerRef = useRef(null);

  // 5. Framer Motion useScroll hook (track progress for the lifeline drawing)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // 6. Transforming scroll progress into line extension (desktop only)
  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      ref={containerRef}
      className="py-16 md:py-24 bg-slate-50/50 border-t border-slate-100 overflow-hidden relative"
    >
      <div className="max-w-7xl mx-auto px-4">
        {/* Header Stack */}
        <div className="mb-12 md:mb-16 text-center">
          <p className="text-blue-600 font-black uppercase tracking-[0.25em] text-xs mb-2">
            Who We Are
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-black text-slate-900 tracking-tight leading-tight max-w-4xl mx-auto">
            Our Blueprint for Rwandan Adventure
          </h2>
        </div>

        {/* 7. Vertical Lifeline Wrapper */}
        <div className="relative">
          {/* Static Full Line (Desktop only) */}
          <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 h-full w-1.5 bg-slate-100 -z-0 rounded-full" />

          {/* Animated Drawing Line (Desktop only - triggers on scroll) */}
          <motion.div
            style={{ scaleY: lineScaleY, originY: 0 }}
            className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 h-full w-1.5 bg-blue-600 rounded-full z-0"
          />

          {/* Map through the pillars (handles mobile stacking implicitly) */}
          <div className="space-y-4 md:space-y-0 relative z-10">
            {pillars.map((pillar) => (
              <PillarNode
                key={pillar.number}
                pillar={pillar}
                totalPillars={pillars.length}
              />
            ))}
          </div>
        </div>

        {/* Action Call to Action */}
        <div className="mt-8 text-center">
          <Link
            to="/services"
            className="inline-flex items-center gap-2.5 text-sm border border-blue-200 py-4 px-6 rounded-full font-bold uppercase tracking-wider text-blue-600 hover:text-blue-700 transition-colors group"
          >
            Explore Our Expeditions
            <ArrowRight
              size={16}
              className="group-hover:translate-x-1.5 transition-transform duration-300"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
