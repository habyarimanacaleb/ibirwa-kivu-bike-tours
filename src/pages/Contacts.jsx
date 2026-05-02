import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, Instagram, Facebook, Twitter } from "lucide-react";
import useContactStore from "../store/useContactStore";
import Navbar from "../components/Navbar";

export const Contacts = () => {
  const navigate = useNavigate();
  const { submitInquiry, isLoading } = useContactStore();

  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState({ message: "", type: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await submitInquiry(formData);

    if (result.success) {
      setStatus({ message: "Adventure awaits! We'll be in touch soon.", type: "success" });
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => navigate("/"), 2500);
    } else {
      setStatus({ message: result.message, type: "error" });
    }
  };

  return (
    <div className="bg-[rgb(10,25,47)] min-h-screen">
      <Navbar />

      <div className="flex flex-col lg:flex-row min-h-screen pt-20">
        
        {/* LEFT: Information & Branding with Visual Storytelling */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative lg:w-5/12 bg-slate-900 text-white p-8 md:p-16 lg:p-24 flex flex-col justify-between overflow-hidden"
        >
          {/* Background Image Overlay */}
          <div className="absolute inset-0 z-0">
            <img 
              src="https://res.cloudinary.com/djaqdvqld/image/upload/v1768207392/kivu/services/file_n1lsk9.jpg" 
              alt="Lake Kivu" 
              className="w-full h-full object-cover opacity-20 scale-110" 
            />
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-900/80 to-blue-900/40" />
          </div>

          <div className="relative z-10 space-y-8">
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-blue-600/20 border border-blue-500/30 text-blue-400 font-bold uppercase tracking-widest text-[10px] mb-6">
                Start Your Journey
              </span>
              <h1 className="text-5xl md:text-6xl font-serif font-black leading-[1.1] tracking-tight">
                Let’s Plan Your <br /> 
                <span className="text-blue-500 italic">Next Story.</span>
              </h1>
            </motion.div>

            <p className="text-slate-300 text-lg max-w-sm font-light leading-relaxed">
              Whether it's a sunrise cycle or a private boat tour, we are here to craft your perfect Rwandan escape.
            </p>

            <div className="space-y-8 pt-6">
              {[
                { icon: <Mail />, val: "ibirwakivubiketours@gmail.com", label: "Email Us" },
                { icon: <Phone />, val: "+250 784606393", label: "Call/WhatsApp" },
                { icon: <MapPin />, val: "Karongi, Rwanda", label: "Our Base" }
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-5 group cursor-default">
                  <div className="p-4 bg-white/5 rounded-2xl border border-white/10 group-hover:bg-blue-600 group-hover:border-blue-500 transition-all duration-300 shadow-xl">
                    {React.cloneElement(item.icon, { size: 20, className: "text-blue-400 group-hover:text-white" })}
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-1">{item.label}</p>
                    <p className="text-lg font-medium">{item.val}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Social Links */}
          <div className="relative z-10 pt-12 flex gap-6">
             <a href="#" className="hover:text-blue-500 transition-colors"><Instagram size={20}/></a>
             <a href="#" className="hover:text-blue-500 transition-colors"><Facebook size={20}/></a>
             <a href="#" className="hover:text-blue-500 transition-colors"><Twitter size={20}/></a>
          </div>
        </motion.div>

        {/* RIGHT: Modern Form Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:w-7/12 p-8 md:p-16 lg:p-24 flex items-center justify-center bg-[#FAFAFA]"
        >
          <div className="max-w-xl w-full bg-white p-10 md:p-14 rounded-[2.5rem] shadow-2xl shadow-slate-200/50 border border-slate-100">
            <div className="mb-10">
              <h3 className="text-3xl font-serif font-black text-slate-900">Get in Touch</h3>
              <p className="text-slate-500 mt-2 font-light">Fill out the form and our team will get back to you within a few hours.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Your Name</label>
                  <input
                    type="text" name="name" value={formData.name} onChange={handleChange} required
                    className="w-full bg-slate-50 border-none p-4 rounded-2xl focus:ring-2 focus:ring-blue-600 outline-none transition-all placeholder:text-slate-300"
                    placeholder="Ex:Kamana kimani"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Email Address</label>
                  <input
                    type="email" name="email" value={formData.email} onChange={handleChange} required
                    className="w-full bg-slate-50 border-none p-4 rounded-2xl focus:ring-2 focus:ring-blue-600 outline-none transition-all placeholder:text-slate-300"
                    placeholder="ex:kamana@example.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">How can we help?</label>
                <textarea
                  name="message" value={formData.message} onChange={handleChange} required rows={4}
                  className="w-full bg-slate-50 border-none p-4 rounded-2xl focus:ring-2 focus:ring-blue-600 outline-none transition-all resize-none placeholder:text-slate-300"
                  placeholder="I'm interested in the 3-day cycling tour..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-5 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 transition-all shadow-xl shadow-blue-200 disabled:opacity-50 active:scale-[0.98]"
              >
                {isLoading ? "Dispatching..." : <>Send Inquiry <Send size={16} /></>}
              </button>
            </form>

            {status.message && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }} 
                animate={{ opacity: 1, scale: 1 }}
                className={`mt-6 text-center font-bold p-4 rounded-2xl text-sm ${
                  status.type === "success" ? "bg-green-50 text-green-700 border border-green-100" : "bg-red-50 text-red-700 border border-red-100"
                }`}
              >
                {status.message}
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};