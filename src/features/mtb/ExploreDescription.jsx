import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Bike, MapPin, Shield, Users, Coffee, Waves, Mountain } from "lucide-react";

const itinerary = [
  {
    day: "01",
    title: "Kigali to Jari",
    subtitle: "Beginner-Friendly Opening",
    desc: "Warm up in Rwanda’s vibrant capital before heading towards the rolling hills of Jari. Ride through terraced farmlands and local villages to experience rural life up close.",
    icon: <MapPin size={24} />,
  },
  {
    day: "02-03",
    title: "Musanze Highlands",
    subtitle: "Volcanoes National Park",
    desc: "Challenging volcanic terrain under the gaze of the Virunga Mountains. Lush forests and steep climbs offer a high-octane test of skill near the mountain gorillas' home.",
    icon: <Mountain size={24} />,
  },
  {
    day: "04-05",
    title: "The Kivu Shoreline",
    subtitle: "Congo Nile Trail",
    desc: "Cycle Africa’s most picturesque paths. Forested lakeside trails and charming fishing villages line your route along the crystal-clear Lake Kivu.",
    icon: <Waves size={24} />,
  },
  {
    day: "06",
    title: "Mount Karongi",
    subtitle: "The Grand Finale",
    desc: "A full-day trail ending with panoramic views of Lake Kivu’s islands and hidden waterfalls. A perfect mix of physical challenge and natural serenity.",
    icon: <Bike size={24} />,
  },
];

export const ExploreDescription = () => {
  return (
    <main className="max-w-7xl w-full mx-auto px-6 lg:px-12 py-16">
      
      {/* Narrative Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24 items-center">
        <div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tighter mb-6">
            The Expedition <span className="text-blue-600">Blueprint.</span>
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed mb-6 font-medium">
            Embark on a thrilling 6-day mountain biking adventure across Rwanda’s spectacular landscapes. Our expertly curated MTB tour is designed for riders who seek the intersection of physical challenge and cultural depth.
          </p>
          <div className="flex gap-4 p-6 bg-blue-50 rounded-[2rem] border border-blue-100">
             <Shield className="text-blue-600 shrink-0" />
             <p className="text-sm text-blue-800 font-medium">
               Professional guides ensure your safety with deep insight into Rwanda’s history, flora, and vibrant local cultures.
             </p>
          </div>
        </div>
        <div className="relative rounded-[3rem] overflow-hidden shadow-2xl h-80 lg:h-[500px]">
           <img src="https://res.cloudinary.com/djaqdvqld/image/upload/v1769600463/kivu/services/file_jglzcl.webp" alt="MTB Action" className="w-full h-full object-cover" />
           <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
        </div>
      </div>

      {/* Modern Itinerary Timeline */}
      <section className="mb-32">
        <h3 className="text-3xl font-black mb-12 tracking-tight text-center lg:text-left">Operational Itinerary</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {itinerary.map((item, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ y: -10 }}
              className="p-8 bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 relative group"
            >
              <div className="text-5xl font-black text-slate-100 absolute top-4 right-8 group-hover:text-blue-50 transition-colors">
                {item.day}
              </div>
              <div className="w-12 h-12 bg-blue-600 text-white rounded-2xl flex items-center justify-center mb-6 relative z-10 shadow-lg shadow-blue-200">
                {item.icon}
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-1">{item.title}</h4>
              <p className="text-xs font-black text-blue-600 uppercase tracking-widest mb-4">{item.subtitle}</p>
              <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Additional Services - Grid */}
      <section className="bg-slate-900 rounded-[4rem] p-8 lg:p-16 text-white mb-20 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 blur-[100px]" />
        <h3 className="text-3xl font-black mb-12 tracking-tight relative z-10">Logistics & Support</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 relative z-10">
          {[
            { t: "Elite Equipment", d: "High-quality MTB rentals or professional bike assembly support.", i: <Bike /> },
            { t: "Technical Support", d: "Support vehicle for repairs, first aid, and gear transport.", i: <Shield /> },
            { t: "Expert Guides", d: "Local specialists with elite knowledge of terrain and history.", i: <Users /> },
            { t: "Scenic Lodging", d: "Comfortable accommodations hand-picked for their views.", i: <MapPin /> },
            { t: "Curated Meals", d: "Local refreshments and lunch provided during trail time.", i: <Coffee /> },
            { t: "Customizable", d: "Trail difficulty adjustments for every experience level.", i: <CheckCircle2 /> },
          ].map((s, i) => (
            <div key={i} className="flex gap-4">
              <div className="w-10 h-10 shrink-0 bg-white/10 rounded-xl flex items-center justify-center text-blue-400">
                {s.i}
              </div>
              <div>
                <h5 className="font-bold text-lg mb-1">{s.t}</h5>
                <p className="text-slate-400 text-sm">{s.d}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Rwanda Overview Card */}
      <section className="bg-gradient-to-br from-blue-600 to-emerald-500 rounded-[3.5rem] p-12 text-white text-center relative overflow-hidden">
        <div className="max-w-3xl mx-auto relative z-10">
          <h2 className="text-4xl font-black mb-6 tracking-tighter">The Land of a Thousand Hills</h2>
          <p className="text-lg opacity-90 leading-relaxed mb-8 font-medium">
            Rwanda is one of Africa’s cleanest, safest, and most welcoming destinations. From Kigali’s modern charm to the tranquility of Lake Kivu, we help you find meaning in the adventure.
          </p>
          <div className="text-2xl font-serif italic opacity-100">
            “Where adventure meets meaning.”
          </div>
        </div>
      </section>
    </main>
  );
};