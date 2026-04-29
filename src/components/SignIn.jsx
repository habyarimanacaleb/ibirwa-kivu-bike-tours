import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, LogIn, UserPlus, ShieldCheck, Mail, Lock } from "lucide-react";
import useAuthStore from "../store/useAuthStore";
import Navbar from "./Navbar";

export const SignIn = ({ onSwitchToCreate }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  
  const navigate = useNavigate();
  const { login, loading, error } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(formData);

    if (result.success) {
      const user = useAuthStore.getState().currentUser;
      setFormData({ email: "", password: "" });
      // Logic: Admins to panel, Users to gallery
      navigate(user.role === "admin" ? "/admin-panel" : "/gallery");
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-6 relative overflow-hidden">
        {/* Ambient background decoration */}
        <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 -right-24 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl opacity-50"></div>
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-slate-200 rounded-full blur-3xl opacity-30"></div>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md relative z-10"
        >
          <div className="bg-white rounded-[3rem] shadow-2xl shadow-slate-200/60 p-10 md:p-12 border border-slate-50">
            
            {/* BRANDING HEADER */}
            <div className="flex flex-col items-center text-center mb-10">
              <div className="relative mb-6 group">
                <div className="absolute inset-0 bg-blue-600 blur-xl opacity-10 group-hover:opacity-20 transition-opacity"></div>
                <img 
                  src="/kivu-image/bt-logo-52.png" 
                  alt="Logo" 
                  className="relative w-20 h-20 rounded-3xl object-cover shadow-lg border border-slate-100" 
                />
              </div>
              <h1 className="text-3xl font-black text-slate-950 tracking-tighter uppercase leading-none">
                Access <span className="text-blue-600 text-2xl tracking-normal">Portal</span>
              </h1>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mt-3">Personnel Authorization Required</p>
            </div>

            {/* TOGGLE NAVIGATION */}
            <div className="flex bg-slate-50 p-1.5 rounded-2xl mb-10 border border-slate-100">
              <button className="w-1/2 py-3 bg-white shadow-sm rounded-xl text-[10px] font-black uppercase tracking-widest text-blue-600 border border-slate-100">
                Sign In
              </button>
              <button 
                onClick={onSwitchToCreate} 
                className="w-1/2 py-3 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-600 transition-all flex items-center justify-center gap-2"
              >
                <UserPlus size={14} /> Register
              </button>
            </div>

            {/* ERROR FEEDBACK */}
            <AnimatePresence>
              {error && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-rose-50 border border-rose-100 p-4 rounded-2xl mb-8 text-center"
                >
                  <p className="text-rose-600 text-[10px] font-black uppercase tracking-widest">
                    {error}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* EMAIL FIELD */}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2 flex items-center gap-2">
                   <Mail size={12} className="text-blue-600" /> Identifier
                </label>
                <input
                  type="email" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleChange} 
                  required
                  placeholder="explorer@kivu.rw"
                  className="w-full p-5 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-600 outline-none transition-all font-bold text-slate-950 placeholder:text-slate-300"
                />
              </div>

              {/* PASSWORD FIELD */}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2 flex items-center gap-2">
                   <Lock size={12} className="text-blue-600" /> Access Key
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password" 
                    value={formData.password} 
                    onChange={handleChange} 
                    required
                    placeholder="••••••••"
                    className="w-full p-5 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-600 outline-none transition-all font-bold text-slate-950 placeholder:text-slate-300"
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowPassword(!showPassword)} 
                    className="absolute inset-y-0 right-5 flex items-center text-slate-300 hover:text-blue-600 transition-colors"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* ACTION BUTTON */}
              <button
                type="submit" 
                disabled={loading}
                className="w-full mt-4 bg-slate-950 hover:bg-blue-600 text-white py-6 rounded-[2rem] font-black text-[11px] uppercase tracking-[0.25em] shadow-2xl shadow-slate-900/20 flex items-center justify-center gap-4 transition-all active:scale-95 disabled:opacity-50"
              >
                {loading ? "Decrypting..." : (
                  <>
                    Authorize Entry <LogIn size={18} />
                  </>
                )}
              </button>
            </form>

            {/* TRUST FOOTER */}
            <div className="mt-10 pt-8 border-t border-slate-50 flex flex-col items-center gap-3">
               <div className="flex items-center gap-2">
                  <ShieldCheck size={14} className="text-emerald-500" />
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.2em]">
                     Secure Encryption Active
                  </p>
               </div>
               <p className="text-[9px] text-slate-300 italic">
                 Terminal Node ID: {Math.random().toString(16).slice(2, 10).toUpperCase()}
               </p>
            </div>
          </div>
          
          <p className="text-center mt-10 text-[9px] font-black text-slate-300 uppercase tracking-[0.4em]">
            Ibirwa Kivu • Command System v2.0
          </p>
        </motion.div>
      </div>
    </>
  );
};

export default SignIn;