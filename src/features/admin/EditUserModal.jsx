import React, { useState, useEffect } from "react";
import { X, Save, Loader2 } from "lucide-react";

const EditUserModal = ({ isOpen, onClose, user, onUpdate, isLoading }) => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    role: "user",
  });
  const [error, setError] = useState("");

  // Populate form with current user details whenever a different user is selected
  useEffect(() => {
    if (user) {
      setForm({
        username: user.username || "",
        email: user.email || "",
        role: user.role || "user",
      });
      setError("");
    }
  }, [user]);

  if (!isOpen || !user) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    const result = await onUpdate(user._id, form);
    if (result && result.success) {
      onClose(); // Shut modal on success
    } else {
      setError(result?.message || "Failed to update user clearance registry.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-sm">
      <div className="w-full max-w-md bg-white rounded-[2.5rem] border border-slate-100 shadow-2xl overflow-hidden transform transition-all">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-slate-50 bg-slate-50/50">
          <div>
            <span className="text-[9px] font-black uppercase tracking-widest text-blue-600 font-mono">
              REF-{user._id?.slice(-8).toUpperCase()}
            </span>
            <h2 className="text-lg font-black text-slate-900 tracking-tighter uppercase mt-0.5">
              Modify Clearance
            </h2>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-all"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body / Form */}
        <form onSubmit={handleSubmit} className="p-8 space-y-5">
          <div className="space-y-2">
            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              required
              className="w-full p-4 bg-slate-50 border-none rounded-xl text-sm font-bold text-slate-800 focus:ring-2 focus:ring-blue-600 outline-none"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full p-4 bg-slate-50 border-none rounded-xl text-sm font-bold text-slate-800 focus:ring-2 focus:ring-blue-600 outline-none"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">
              System Role
            </label>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full p-4 bg-slate-50 border-none rounded-xl text-sm font-bold text-slate-800 focus:ring-2 focus:ring-blue-600 outline-none appearance-none"
            >
              <option value="user">User (Standard Access)</option>
              <option value="admin">Admin (Terminal Control)</option>
            </select>
          </div>

          {error && (
            <div className="p-4 bg-rose-50 text-rose-700 text-xs font-bold rounded-xl border border-rose-100">
              {error}
            </div>
          )}

          {/* Action Call Controls */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 py-4 rounded-xl font-bold text-xs uppercase tracking-wider transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-slate-900 text-white py-4 rounded-xl font-bold text-xs uppercase tracking-wider transition-all disabled:opacity-50"
            >
              {isLoading ? (
                <Loader2 className="animate-spin" size={14} />
              ) : (
                <>Commit <Save size={14} /></>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUserModal;