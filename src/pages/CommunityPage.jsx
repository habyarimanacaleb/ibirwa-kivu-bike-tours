import React from "react";
import { motion } from "framer-motion";
import { FaHandHoldingHeart, FaLeaf, FaDrum, FaUsers, FaArrowRight } from "react-icons/fa";
import Navbar from "../components/Navbar";
import { Footer } from "../components/Footer";
import { NavLink } from "react-router-dom";

const CommunityPage = () => {
  const features = [
    {
      icon: <FaLeaf className="text-green-600" />,
      title: "Sustainable Agriculture",
      desc: "Experience the life of local farmers growing Rwanda’s world-renowned coffee and tea on the fertile Kivu hills."
    },
    {
      icon: <FaDrum className="text-yellow-600" />,
      title: "Cultural Heritage",
      desc: "Learn about traditional Rwandan dance, storytelling, and the preservation of our local heritage."
    },
    {
      icon: <FaUsers className="text-blue-600" />,
      title: "Community Resilience",
      desc: "Discover how local cooperatives empower women and youth through basket weaving and artisan crafts."
    }
  ];

  return (
    <div className="bg-[#fcfcfd] min-h-screen">
      <Navbar />
      
      {/* HERO SECTION */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[#0a192f]/80 z-10" />
        <img 
          src="YOUR_CULTURAL_HERITAGE_IMAGE_URL" 
          className="absolute inset-0 w-full h-full object-cover" 
          alt="Rwandan Culture"
        />
        <div className="relative z-20 text-center px-6 text-white">
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4">Life & Heritage</h1>
          <p className="text-lg md:text-xl text-blue-100 max-w-2xl">
            Beyond the tour—the heartbeat of the Lake Kivu community.
          </p>
        </div>
      </section>

      {/* COMMUNITY LIFE */}
      <section className="py-20 max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12">
          {features.map((f, i) => (
            <div key={i} className="p-8 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all">
              <div className="text-4xl mb-6">{f.icon}</div>
              <h3 className="text-xl font-black mb-4 uppercase tracking-tight">{f.title}</h3>
              <p className="text-slate-600 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SUPPORT & IMPACT SECTION */}
      <section className="py-20 bg-[#0a192f] text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <FaHandHoldingHeart className="text-5xl text-yellow-500 mx-auto mb-6" />
          <h2 className="text-4xl font-black uppercase tracking-tighter mb-6">Empower our Community</h2>
          <p className="text-blue-200 mb-10 text-lg">
            We believe in ethical tourism. Your visit is more than a tour; it is a direct support system for 
            our local artisans and farmers. Whether you're looking to purchase handmade crafts, 
            support a youth workshop, or learn about local farming, your presence makes a difference.
          </p>
          <NavLink to="/contact" className="inline-flex items-center gap-2 bg-yellow-500 text-[#0a192f] px-10 py-4 rounded-full font-black uppercase tracking-widest text-xs hover:bg-white transition-all">
            Get Involved <FaArrowRight />
          </NavLink>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default CommunityPage;