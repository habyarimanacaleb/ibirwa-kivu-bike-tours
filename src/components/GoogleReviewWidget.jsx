import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Star, Quote, MapPin } from "lucide-react";

const GoogleReviews = () => {
  useEffect(() => {
    const existingScript = document.querySelector('script[src="https://static.elfsight.com/platform/platform.js"]');
    if (!existingScript) {
      const script = document.createElement("script");
      script.src = "https://static.elfsight.com/platform/platform.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div className="w-full relative py-10">
      {/* Decorative background "Trust Glow" */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-64 bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative z-10"
      >
        {/* Widget Container with Custom Frame */}
        <div className="bg-white/40 backdrop-blur-md border border-white/20 p-2 md:p-8 rounded-[3rem] shadow-2xl shadow-blue-900/5">
          <div
            className="elfsight-app-3a7db855-6986-417c-bc2e-9255df41903e"
            data-elfsight-app-lazy
          ></div>
        </div>

        {/* Bottom Trust Badge */}
        <div className="flex flex-col items-center mt-10 gap-2">
           <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
              ))}
           </div>
           <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
             Verified Google Maps Feedback
           </p>
        </div>
      </motion.div>
    </div>
  );
};

export default GoogleReviews;