import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Phone, Mail, MessageSquare, ArrowRight } from 'lucide-react';

function Contact() {
  return (
    <section id="contactus" className="py-20 px-6">
      <div className="max-w-7xl mx-auto relative overflow-hidden rounded-[2.5rem] bg-slate-900 shadow-2xl">
        
        {/* Background Visual Element */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://res.cloudinary.com/djaqdvqld/image/upload/v1767034084/kivu/services/file_y5lypy.jpg" 
            alt="Lake Kivu background" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent" />
        </div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 p-10 md:p-20 items-center">
          
          {/* Left Side: The Hook */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-blue-500 font-bold uppercase tracking-[0.3em] text-xs">
                Plan Your Escape
              </span>
              <h2 className="text-4xl md:text-5xl font-serif font-black text-white mt-4 leading-tight">
                Ready to Experience <br />
                <span className="text-blue-500 italic">Lake Kivu</span> Like Never Before?
              </h2>
              <p className="text-slate-400 text-lg mt-6 max-w-md font-light leading-relaxed">
                Whether you're looking for a rugged bike adventure or a peaceful sunset boat ride, our local experts are ready to customize your perfect itinerary.
              </p>
            </motion.div>

            {/* Quick Contact Stats */}
            <div className="flex flex-wrap gap-6 border-t border-white/10 pt-8">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-600/20 rounded-lg">
                  <Phone size={18} className="text-blue-400" />
                </div>
                <span className="text-white font-medium">+250 784606393</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-600/20 rounded-lg">
                  <Mail size={18} className="text-blue-400" />
                </div>
                <span className="text-white font-medium">ibirwakivubiketours@gmail.com</span>
              </div>
            </div>
          </div>

          {/* Right Side: Action Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <NavLink to="/contact" className="group">
              <div className="bg-white/5 border border-white/10 p-8 rounded-3xl hover:bg-blue-600 transition-all duration-500 hover:-translate-y-2 h-full">
                <MessageSquare className="text-blue-500 group-hover:text-white mb-4" size={32} />
                <h4 className="text-white font-bold text-xl mb-2">Tailor-Made Tours</h4>
                <p className="text-slate-400 group-hover:text-white/80 text-sm font-light">Get a personalized quote for your group or family adventure.</p>
                <div className="mt-6 flex items-center gap-2 text-blue-400 group-hover:text-white font-bold text-xs uppercase tracking-widest">
                  Inquire Now <ArrowRight size={14} />
                </div>
              </div>
            </NavLink>

            <div className="bg-blue-600 p-8 rounded-3xl flex flex-col justify-between shadow-xl shadow-blue-900/20">
              <div>
                <h4 className="text-white font-serif font-black text-2xl leading-tight">24/7 Adventure <br /> Support</h4>
                <p className="text-blue-100 mt-4 text-sm font-light">Our guides are on standby to help you with booking, rentals, or trail info.</p>
              </div>
              <div className="mt-8 flex items-center gap-2 text-[10px] text-blue-200 uppercase tracking-tighter font-black">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" /> Always Available
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Contact;