import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Bike, Timer, Map } from 'lucide-react';
import Button from '../common/Button';

function MountainBikingSection() {
  return (
    <section id="mtb-tours" className="relative py-24 bg-white overflow-hidden">
      {/* Background Decorative Accent */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-50 -z-10" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Side: Visual Preview */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl shadow-blue-900/10 border-8 border-white">
              <img 
                src="/api/placeholder/800/600" 
                alt="MTB Expedition" 
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-[2s]"
              />
            </div>
            
            {/* Floating Badge */}
            <div className="absolute -bottom-8 -left-8 z-20 bg-blue-600 text-white p-8 rounded-[2.5rem] shadow-xl flex gap-4 items-center">
              <div className="p-3 bg-white/20 rounded-xl">
                <Timer size={28} />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest opacity-80">Duration</p>
                <p className="text-xl font-black italic">6-Day Expedition</p>
              </div>
            </div>
          </motion.div>

          {/* Right Side: Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full">
              <Bike size={16} />
              <span className="text-[10px] font-black uppercase tracking-[0.3em]">Signature Tour</span>
            </div>

            <h2 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tighter leading-[0.9]">
              The Congo-Nile <br /> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-500 italic">
                MTB Odyssey.
              </span>
            </h2>

            <p className="text-lg text-slate-500 leading-relaxed font-medium">
              Rwanda, the "Land of a Thousand Hills," isn't just a destination—it's a vertical playground. 
              Our flagship 6-day expedition takes you through the high-altitude volcanic trails and 
              the emerald shores of Lake Kivu.
            </p>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 gap-6 py-4">
              <div className="flex gap-3 items-center">
                <Map className="text-emerald-500" size={20} />
                <span className="text-sm font-bold text-slate-700">12 Unique Trails</span>
              </div>
              <div className="flex gap-3 items-center">
                <ShieldCheck className="text-blue-500" size={20} />
                <span className="text-sm font-bold text-slate-700">GPS Safety Tracked</span>
              </div>
            </div>

            <div className="pt-4">
              <Button 
                label="View Full Itinerary" 
                to="/explore-more-to-Rwanda" 
                className="group flex items-center gap-2"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

// Simple internal check for the Shield icon if not imported from Lucide
const ShieldCheck = ({ size, className }) => (
  <svg 
    width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" 
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

export default MountainBikingSection;