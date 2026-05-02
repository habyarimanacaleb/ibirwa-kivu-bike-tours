import React, { useState } from 'react';
import { X, UserPlus, Shield, Mail, Lock, User, Loader2 } from 'lucide-react'; 
import { motion, AnimatePresence } from 'framer-motion';

const AddUserModal = ({ isOpen, onClose, onRegister, isLoading }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'client', 
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await onRegister(formData);
    if (result?.success) {
      onClose(); 
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
          onClick={onClose}
        />
        
        <motion.div 
          initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
          className="relative bg-white rounded-[2rem] w-full max-w-md p-8 shadow-2xl"
        >
          <button onClick={onClose} className="absolute top-6 right-6 text-slate-400 hover:text-slate-900"><X size={20}/></button>
          
          <h2 className="text-xl font-black text-slate-900 uppercase tracking-tighter mb-1">Provision Access</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4 mt-6">
            {/* ... [Keep your existing form fields here] ... */}
            
            <button 
              disabled={isLoading}
              type="submit" 
              className="w-full mt-6 bg-slate-900 text-white py-4 rounded-xl font-black uppercase tracking-widest text-xs hover:bg-blue-600 transition-all flex items-center justify-center gap-2"
            >
              {isLoading ? <Loader2 className="animate-spin" size={16} /> : "Initialize Account"}
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default AddUserModal;