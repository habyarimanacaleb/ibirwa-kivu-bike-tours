import React from "react";
import { motion } from "framer-motion";

function CTASection({ RevealOnScroll }) {
  return (
    <section className="bg-gradient-to-br from-blue-950 to-blue-800 px-6 py-24 text-center">
      <RevealOnScroll className="max-w-xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
          Ready to Ride With Us?
        </h2>
        <p className="text-blue-100 leading-relaxed mb-10">
          Browse our tours or reach out directly — we'll help you find the
          perfect route for your fitness level, schedule, and sense of
          adventure.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <motion.a
            href="/services"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="bg-white text-blue-900 font-bold px-8 py-3 rounded-full text-sm hover:bg-blue-50 transition-colors"
          >
            View Tours
          </motion.a>
          <motion.a
            href="/contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="border border-white/40 text-white font-semibold px-8 py-3 rounded-full text-sm hover:border-white/80 transition-colors"
          >
            Contact Us
          </motion.a>
        </div>
      </RevealOnScroll>
    </section>
  );
}

export default CTASection;
