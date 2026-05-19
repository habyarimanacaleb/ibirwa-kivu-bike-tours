import React, { useState, useEffect } from 'react';
import { X, Shield, Mail, Lock, User, Loader2 } from 'lucide-react'; 
import { motion, AnimatePresence } from 'framer-motion';
import { redirect } from 'react-router-dom';

const AddUserModal = ({ isOpen, onClose, onRegister, isLoading }) => {
  const initialFormState = {
    username: '',
    email: '',
    password: '',
    role: 'client', 
  };

  const [formData, setFormData] = useState(initialFormState);

  // Clear form state completely when modal drops out of view
  useEffect(() => {
    if (!isOpen) {
      setFormData(initialFormState);
    }
  }, [isOpen]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await onRegister(formData);
    if (result?.success) {
      onClose(); 
      redirect('/admin-panel')
    }
  };

  return (
    // Component wrapper always renders so AnimatePresence can track children lifecycle
    <AnimatePresence mode="wait">
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          
          {/* Backdrop Overlay */}
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm"
            onClick={onClose}
          />
          
          {/* Modal Container Chassis */}
          <motion.div 
            initial={{ scale: 0.95, opacity: 0, y: 10 }} 
            animate={{ scale: 1, opacity: 1, y: 0 }} 
            exit={{ scale: 0.95, opacity: 0, y: 10 }}
            transition={{ type: "spring", duration: 0.4 }}
            className="relative bg-white rounded-[2.5rem] w-full max-w-md p-8 shadow-2xl border border-slate-50 z-10"
          >
            {/* Close Button Trigger */}
            <button 
              onClick={onClose} 
              type="button"
              className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-all"
            >
              <X size={18}/>
            </button>
            
            {/* Header Identity */}
            <div className="mb-6">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 block mb-1">
                Security Control
              </span>
              <h2 className="text-xl font-black text-slate-900 uppercase tracking-tighter">
                Provision Access
              </h2>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Username Field */}
              <div className="space-y-1.5">
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
                  Username
                </label>
                <div className="relative flex items-center">
                  <User size={16} className="absolute left-4 text-slate-400" />
                  <input
                    type="text"
                    name="username"
                    required
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="e.g., caleb.h"
                    className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-transparent rounded-xl text-sm font-bold text-slate-800 focus:bg-white focus:border-slate-100 focus:ring-2 focus:ring-blue-600/20 outline-none transition-all"
                  />
                </div>
              </div>

              {/* Email Field */}
              <div className="space-y-1.5">
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
                  Email Address
                </label>
                <div className="relative flex items-center">
                  <Mail size={16} className="absolute left-4 text-slate-400" />
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="operator@kivu.rw"
                    className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-transparent rounded-xl text-sm font-bold text-slate-800 focus:bg-white focus:border-slate-100 focus:ring-2 focus:ring-blue-600/20 outline-none transition-all"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-1.5">
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
                  Security Code
                </label>
                <div className="relative flex items-center">
                  <Lock size={16} className="absolute left-4 text-slate-400" />
                  <input
                    type="password"
                    name="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-transparent rounded-xl text-sm font-bold text-slate-800 focus:bg-white focus:border-slate-100 focus:ring-2 focus:ring-blue-600/20 outline-none transition-all"
                  />
                </div>
              </div>

              {/* Role Selection Dropdown */}
              <div className="space-y-1.5">
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
                  Clearance Level
                </label>
                <div className="relative flex items-center">
                  <Shield size={16} className="absolute left-4 text-slate-400" />
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-transparent rounded-xl text-sm font-bold text-slate-800 focus:bg-white focus:border-slate-100 focus:ring-2 focus:ring-blue-600/20 outline-none transition-all appearance-none"
                  >
                    <option value="client">Client (Default Platform Access)</option>
                    <option value="admin">Admin (Full Control Terminal)</option>
                  </select>
                </div>
              </div>
              
              {/* Submission Control */}
              <button 
                disabled={isLoading}
                type="submit" 
                className="w-full mt-6 bg-slate-900 text-white py-4 rounded-xl font-black uppercase tracking-widest text-xs hover:bg-blue-600 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isLoading ? (
                  <Loader2 className="animate-spin" size={16} />
                ) : (
                  "Initialize Account"
                )}
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AddUserModal;