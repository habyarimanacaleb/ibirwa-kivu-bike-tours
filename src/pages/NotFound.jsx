import React from "react";
import { Compass, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom"; // Assumes you use react-router

const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center"
        >
          {/* Icon Wrapper */}
          <div className="w-24 h-24 mb-8 bg-blue-600/10 rounded-full flex items-center justify-center border border-blue-500/20 shadow-xl shadow-blue-900/10">
            <Compass className="text-blue-500 animate-spin-slow" size={48} />
          </div>

          {/* Text Content */}
          <h1 className="text-8xl font-black text-white mb-2 tracking-tighter">
            404
          </h1>
          <h2 className="text-2xl font-bold text-slate-300 mb-4 font-serif italic">
            Off the beaten path
          </h2>
          <p className="text-slate-500 max-w-sm mb-10 leading-relaxed">
            It looks like this expedition route hasn't been mapped yet. Let's
            get you back to the main base camp.
          </p>

          {/* Action */}
          <button
            onClick={() => navigate(-1)} // 3. Use -1 to go back one step in history
            className="flex items-center gap-3 bg-white text-slate-950 font-black py-4 px-8 rounded-2xl hover:bg-slate-200 transition-all shadow-lg"
          >
            <ArrowLeft size={20} />
            Go Back
          </button>
        </motion.div>
      </div>    
  );
};

export default NotFoundPage;
