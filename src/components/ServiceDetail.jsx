import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaWhatsapp, FaEnvelope, FaCheckCircle, 
  FaLightbulb, FaClock, FaTimesCircle, 
  FaMapMarkedAlt, FaCalendarAlt, FaChevronLeft
} from "react-icons/fa";
import useServiceStore from "../store/useServiceStore";
import Navbar from "./Navbar";
import { Footer } from "./Footer";
import WhatsAppChat from "./WhatsapMeInService";

export const ServiceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentService, isLoading, fetchServiceById, error } = useServiceStore();

  useEffect(() => {
    fetchServiceById(id);
    window.scrollTo(0, 0);
  }, [id, fetchServiceById]);

  // Modern Loading Screen
  if (isLoading) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-slate-950 text-white">
        <motion.div 
          animate={{ rotate: 360 }} 
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="h-16 w-16 border-t-4 border-blue-600 rounded-full mb-6"
        />
        <p className="text-2xl font-black tracking-tighter uppercase">Synchronizing Expedition...</p>
      </div>
    );
  }

  // Error State
  if (error || !currentService) {
    return (
      <div className="h-screen flex flex-col items-center justify-center text-slate-900 bg-white px-6 text-center">
        <h2 className="text-4xl font-black mb-4 tracking-tighter">Expedition Not Found.</h2>
        <p className="text-slate-500 mb-8 max-w-md font-medium">The specific service ID was not found in our registry. It may have been moved or archived.</p>
        <button onClick={() => navigate("/services")} className="bg-slate-900 text-white px-10 py-4 rounded-full font-bold">
          Return to Registry
        </button>
      </div>
    );
  }

  // PRE-FILLED COMMUNICATION LOGIC
  const whatsappNumber = currentService.details?.whatsapp || "250788000000"; 
  const mailAddress = currentService.details?.email || "booking@ibirwa.com";
  const bookingMessage = `Hello Ibirwa Kivu! I'm interested in the "${currentService.title}" tour.\n\nCould you please provide more details regarding pricing and availability?`;
  
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(bookingMessage)}`;
  const mailtoUrl = `mailto:${mailAddress}?subject=Booking Inquiry: ${currentService.title}&body=${encodeURIComponent(bookingMessage)}`;

  return (
    <div className="bg-white">
      <Navbar />

      {/* Wrapping children in a single motion.div with a unique key fixes the duplicate key error */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentService._id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* HERO SECTION */}
          <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
            <motion.img
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.5 }}
              src={currentService.imageFile}
              alt={currentService.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-slate-900/40 via-slate-900/60 to-white" />

            <div className="relative z-10 max-w-5xl mx-auto px-6 text-center text-white">
              <button onClick={() => navigate(-1)} className="mb-6 flex items-center gap-2 mx-auto text-white/80 hover:text-white font-bold uppercase text-[10px] tracking-widest">
                <FaChevronLeft /> Back to Exploration
              </button>
              <h1 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter leading-none uppercase">
                {currentService.title}
              </h1>
            </div>
          </section>

          {/* CONTENT GRID */}
          <section className="relative -mt-32 pb-24 z-20">
            <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-3 gap-12">
              
              {/* LEFT: Detailed Intel */}
              <div className="lg:col-span-2 space-y-10">
                
                {/* Core Description Card */}
                <div className="bg-white rounded-[3rem] p-8 lg:p-12 shadow-2xl shadow-slate-200 border border-slate-50">
                  <div className="flex flex-wrap gap-8 mb-10 pb-8 border-b border-slate-100">
                     <div className="flex items-center gap-3">
                        <FaClock className="text-blue-600" />
                        <div>
                          <p className="text-[10px] uppercase font-black text-slate-400">Duration</p>
                          <p className="font-bold text-slate-900">Customizable</p>
                        </div>
                     </div>
                     <div className="flex items-center gap-3">
                        <FaMapMarkedAlt className="text-emerald-500" />
                        <div>
                          <p className="text-[10px] uppercase font-black text-slate-400">Location</p>
                          <p className="font-bold text-slate-900">Lake Kivu, Rwanda</p>
                        </div>
                     </div>
                     <div className="flex items-center gap-3">
                        <FaCalendarAlt className="text-amber-500" />
                        <div>
                          <p className="text-[10px] uppercase font-black text-slate-400">Season</p>
                          <p className="font-bold text-slate-900">Year-round</p>
                        </div>
                     </div>
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 mb-6 uppercase tracking-tighter">Mission Overview</h3>
                  <p className="text-lg text-slate-500 leading-relaxed font-medium whitespace-pre-line">
                    {currentService.description}
                  </p>
                </div>

                {/* Highlights & Inclusions */}
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white shadow-xl shadow-blue-900/20">
                    <h4 className="text-xl font-black mb-6 flex items-center gap-3 uppercase tracking-tighter">
                      <FaCheckCircle className="text-emerald-400" /> What's Included
                    </h4>
                    <ul className="space-y-4">
                      {currentService.details?.highlights?.map((h, i) => (
                        <li key={i} className="text-sm opacity-80 flex gap-3 leading-relaxed">
                          <span className="text-emerald-400 font-bold">•</span> {h}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-xl">
                    <h4 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-3 uppercase tracking-tighter">
                      <FaTimesCircle className="text-rose-500" /> Not Included
                    </h4>
                    <ul className="space-y-4 text-slate-500 text-sm font-medium">
                      <li>• Personal travel insurance</li>
                      <li>• International flights to Rwanda</li>
                      <li>• Personal shopping and tips</li>
                      <li>• Alcoholic beverages (unless specified)</li>
                    </ul>
                  </div>
                </div>

                {/* Pro Tips */}
                <div className="bg-blue-50/50 border border-blue-100 rounded-[2.5rem] p-10">
                  <h4 className="text-xl font-black text-blue-900 mb-8 flex items-center gap-3 uppercase tracking-tighter">
                     <FaLightbulb className="text-blue-600" /> Operational Tips
                  </h4>
                  <div className="grid sm:grid-cols-2 gap-8">
                    {currentService.details?.tips?.map((tip, i) => (
                      <div key={i} className="flex gap-4">
                        <span className="text-blue-600 font-black">0{i+1}</span>
                        <p className="text-sm text-slate-600 font-medium">{tip}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* RIGHT: Booking Sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-28 space-y-6">
                  <div className="bg-white p-10 rounded-[3rem] shadow-2xl border border-slate-100 text-center">
                    <h3 className="text-2xl font-black text-slate-900 mb-2 uppercase tracking-tighter">Secure Your Spot</h3>
                    <p className="text-slate-400 text-sm mb-8 font-medium px-4">Contact our team via WhatsApp or Email to finalize your booking.</p>
                    
                    <div className="space-y-4">
                      <a 
                        href={whatsappUrl} 
                        target="_blank" 
                        rel="noreferrer"
                        className="flex items-center justify-center gap-3 w-full bg-[#25D366] hover:bg-[#20bd5a] text-white py-4 rounded-2xl font-bold transition-all shadow-lg shadow-green-500/20 active:scale-95"
                      >
                        <FaWhatsapp size={20} /> WhatsApp Booking
                      </a>

                      <a 
                        href={mailtoUrl}
                        className="flex items-center justify-center gap-3 w-full bg-slate-900 text-white py-4 rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-lg active:scale-95"
                      >
                        <FaEnvelope size={18} /> Email Inquiry
                      </a>
                    </div>

                    <div className="mt-8 pt-8 border-t border-slate-50 flex flex-col gap-3 text-left">
                       <div className="flex items-center gap-3 text-[11px] font-black text-slate-400 uppercase tracking-widest">
                          <FaCheckCircle className="text-emerald-500" /> No hidden fees
                       </div>
                       <div className="flex items-center gap-3 text-[11px] font-black text-slate-400 uppercase tracking-widest">
                          <FaCheckCircle className="text-emerald-500" /> Expert Local Guides
                       </div>
                    </div>
                  </div>

                  <div className="p-6 bg-slate-50 rounded-[2.5rem] text-center border border-slate-100">
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Payment Methods</p>
                    <p className="text-slate-500 text-[10px] mt-2 italic">Bank Transfer & Mobile Money <br/>Accepted at check-in</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </motion.div>
      </AnimatePresence>

      <WhatsAppChat introMessage={currentService.title} />
      <Footer />
    </div>
  );
};

export default ServiceDetail;
