import React from "react";
import { motion } from "framer-motion";
import { 
  FaLeaf, FaDrum, FaUsers, 
  FaHandHoldingHeart, FaGraduationCap, FaSeedling, 
  FaArrowRight 
} from "react-icons/fa";
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
    },
    {
      icon: <FaHandHoldingHeart className="text-pink-600" />,
      title: "Direct Community Impact",
      desc: "Support local infrastructure projects directly—from funding classroom materials to sponsoring clean water initiatives."
    },
    {
      icon: <FaGraduationCap className="text-purple-600" />,
      title: "Skills Exchange",
      desc: "Share your professional expertise or host a workshop to empower local entrepreneurs and youth with digital skills."
    },
    {
      icon: <FaSeedling className="text-emerald-600" />,
      title: "Environmental Stewardship",
      desc: "Join reforestation efforts along the Kivu hillsides to protect our local ecosystem and mitigate climate change."
    }
  ];

  return (
    <div className="bg-[#fcfcfd] min-h-screen">
      <Navbar />
      
      {/* HERO SECTION */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[#0a192f]/70 z-10" />
        <img 
          src="https://res.cloudinary.com/djaqdvqld/image/upload/v1765872941/kivu/services/file_tsy9kj.jpg" 
          className="absolute inset-0 w-full h-full object-cover" 
          alt="Rwandan Culture"
        />
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-20 text-center px-6 text-white"
        >
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4">Life & Heritage</h1>
          <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto">
            Beyond the tour—the heartbeat of the Lake Kivu community. Be a part of the change.
          </p>
        </motion.div>
      </section>

      {/* FEATURES GRID */}
      <section className="py-20 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight mb-4">Our Community Pillars</h2>
          <div className="w-20 h-1 bg-yellow-500 mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-8 bg-white rounded-3xl border-l-4 border-yellow-500 shadow-sm hover:shadow-2xl hover:border-yellow-500 transition-all duration-300"
            >
              <div className="text-4xl mb-6">{f.icon}</div>
              <h3 className="text-xl font-black mb-4 uppercase tracking-tight">{f.title}</h3>
              <p className="text-slate-600 leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SUPPORT & IMPACT CTA */}
      <section className="py-20 bg-[#0a192f] text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="inline-block mb-6"
          >
            <FaHandHoldingHeart className="text-6xl text-yellow-500" />
          </motion.div>
          <h2 className="text-4xl font-black uppercase tracking-tighter mb-6">Ready to make a difference?</h2>
          <p className="text-blue-200 mb-10 text-lg leading-relaxed">
            We believe in ethical tourism. Your visit is more than just a tour; it is a direct support system for 
            our local artisans, farmers, and students. Contact us to learn how you can contribute to a specific project.
          </p>
          <NavLink 
            to="/contact" 
            className="inline-flex items-center gap-2 bg-yellow-500 text-[#0a192f] px-10 py-4 rounded-full font-black uppercase tracking-widest text-sm hover:bg-white hover:scale-105 transition-all duration-300"
          >
            Get Involved <FaArrowRight />
          </NavLink>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default CommunityPage;