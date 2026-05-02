import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { UserPlus, ArrowLeft, Send, Mail, User, ShieldCheck, Lock } from "lucide-react";
import useAuthStore from "../store/useAuthStore";
import Navbar from "./Navbar";

export const CreateAccount = ({ onSwitchToSignIn }) => {
  const [formData, setFormData] = useState({ email: "", username: "", password: "" });
  
  const navigate = useNavigate();
  const { signup, loading, error } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await signup(formData);

    if (result.success) {
      setFormData({ email: "", username: "", password: "" });
      navigate("/login"); 
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-6 relative overflow-hidden">
        {/* Visual Corridor Accents */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 left-1/4 w-px h-full bg-slate-200/50"></div>
          <div className="absolute top-0 right-1/4 w-px h-full bg-slate-200/50"></div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full max-w-md relative z-10"
        >
          <div className="bg-white rounded-[3rem] shadow-2xl shadow-slate-200/60 p-10 md:p-12 border border-slate-50">
            
            {/* BRANDING HEADER */}
            <div className="text-center mb-10">
              <div className="inline-block relative mb-4">
                <div className="absolute inset-0 bg-blue-600 blur-xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
                <img 
                  src="/bt-logo-52.png" 
                  alt="Logo" 
                  className="relative w-20 h-20 rounded-3xl object-cover shadow-lg border border-slate-100" 
                />
              </div>
              <h1 className="text-3xl font-black text-slate-950 tracking-tighter uppercase leading-none">
                Initialize <span className="text-blue-600">Account</span>
              </h1>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mt-3">JOIN IBIRWA KIVU EXPEDITIONS</p>
            </div>

            {/* TAB TOGGLE */}
            <div className="flex bg-slate-50 p-1.5 rounded-2xl mb-10 border border-slate-100">
              <button 
                onClick={onSwitchToSignIn} 
                className="w-1/2 py-3 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-600 transition-all flex items-center justify-center gap-2"
              >
                <ArrowLeft size={14} /> Sign In
              </button>
              <button className="w-1/2 py-3 bg-white shadow-sm rounded-xl text-[10px] font-black uppercase tracking-widest text-blue-600 border border-slate-100">
                Register
              </button>
            </div>

            {/* ERROR FEEDBACK */}
            <AnimatePresence>
              {error && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-rose-50 border border-rose-100 p-4 rounded-2xl mb-8 overflow-hidden"
                >
                  <p className="text-rose-600 text-[10px] font-black uppercase tracking-widest text-center">
                    {error}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* EMAIL */}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2 flex items-center gap-2">
                   <Mail size={12} className="text-blue-600" /> Email Address
                </label>
                <input
                  type="email" name="email" value={formData.email} onChange={handleChange} required
                  placeholder="example@gmail.com"
                  className="w-full p-5 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-600 outline-none text-sm font-bold text-slate-950 placeholder:text-slate-300 transition-all"
                />
              </div>

              {/* USERNAME */}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2 flex items-center gap-2">
                   <User size={12} className="text-blue-600" /> Name Identifier
                </label>
                <input
                  type="text" name="username" value={formData.username} onChange={handleChange} required
                  placeholder="Ex: John Doe"
                  className="w-full p-5 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-600 outline-none text-sm font-bold text-slate-950 placeholder:text-slate-300 transition-all"
                />
              </div>

              {/* PASSWORD */}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2 flex items-center gap-2">
                   <Lock size={12} className="text-blue-600" /> Security Password
                </label>
                <input
                  type="password" name="password" value={formData.password} onChange={handleChange} required
                  placeholder="••••••••"
                  className="w-full p-5 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-600 outline-none text-sm font-bold text-slate-950 placeholder:text-slate-300 transition-all"
                />
              </div>

              {/* SUBMIT BUTTON */}
              <button
                type="submit" disabled={loading}
                className="w-full mt-4 bg-blue-600 hover:bg-slate-950 text-white py-6 rounded-[2rem] font-black text-[11px] uppercase tracking-[0.25em] shadow-2xl shadow-blue-500/30 flex items-center justify-center gap-4 transition-all active:scale-95 disabled:opacity-50"
              >
                {loading ? "Establishing Node..." : (
                  <>
                    Create Account <Send size={18} />
                  </>
                )}
              </button>
            </form>

            {/* SECURE FOOTER */}
            <div className="mt-10 pt-8 border-t border-slate-50 flex flex-col items-center gap-2">
               <div className="flex items-center gap-2">
                  <ShieldCheck size={14} className="text-emerald-500" />
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.2em]">
                    Registry Protocol v2.1 • Secure
                  </p>
               </div>
            </div>
          </div>
          
          <p className="text-center mt-10 text-[9px] font-black text-slate-300 uppercase tracking-[0.4em]">
            Ibirwa Kivu • Western Corridor Systems
          </p>
        </motion.div>
      </div>
    </>
  );
};

export default CreateAccount;