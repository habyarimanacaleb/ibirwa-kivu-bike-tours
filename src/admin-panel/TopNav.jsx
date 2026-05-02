import React from "react";
import { Search, Bell, User, ChevronDown } from "lucide-react";

export default function TopNav() {
  return (
    <header className="sticky top-0 z-20 w-full bg-white/70 backdrop-blur-md border-b border-slate-200 px-6 py-3 flex justify-between items-center h-16">
      
      {/* Page Context (Left) */}
      <div className="flex items-center">
        <h1 className="hidden md:block text-lg font-black text-slate-800 uppercase tracking-tighter">
          Dashboard
        </h1>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-4">
        
        {/* Search Bar */}
        <div className="hidden sm:flex items-center bg-slate-100 rounded-full px-4 py-2 w-64 border border-transparent focus-within:border-blue-500 focus-within:bg-white transition-all">
          <Search className="text-slate-400 mr-2" size={18} />
          <input
            type="text"
            placeholder="Search records..."
            className="w-full bg-transparent outline-none text-sm text-slate-700 placeholder:text-slate-400"
          />
        </div>

        {/* Notifications */}
        <button className="p-2 rounded-full text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-colors">
          <Bell size={20} />
        </button>

        {/* User Profile */}
        <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold">
            AH
          </div>
          <div className="hidden md:block">
            <p className="text-xs font-bold text-slate-800">Caleb H.</p>
            <p className="text-[10px] text-slate-500 uppercase tracking-widest">Admin</p>
          </div>
          <ChevronDown size={14} className="text-slate-400" />
        </div>
      </div>
    </header>
  );
}