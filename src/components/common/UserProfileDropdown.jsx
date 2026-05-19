import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import useAuthStore from "../../store/useAuthStore";

export default function UserProfileDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Atomic selectors to keep this component isolated and performant
  const currentUser = useAuthStore((state) => state.currentUser);
  const logout = useAuthStore((state) => state.logout);

  // Fallback if component is rendered without an active session
  if (!currentUser) return null;

  // Setup user initials for avatar placeholder if no image exists
  const getInitials = (name) => {
    if (!name) return "?";
    return name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
  };

  // Close the dropdown cleanly when clicking outside the boundary box
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const handleLogoutClick = () => {
    setIsOpen(false);
    logout();
    navigate("/join");
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 p-1.5 rounded-xl hover:bg-slate-800/60 border border-transparent hover:border-slate-700/50 transition-all duration-200 focus:outline-none"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        {currentUser.avatarUrl ? (
          <img
            className="w-8 h-8 rounded-lg object-cover ring-1 ring-slate-700"
            src={currentUser.avatarUrl}
            alt={currentUser.name}
          />
        ) : (
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold font-mono shadow-sm">
            {getInitials(currentUser.name || currentUser.username || currentUser.email)}
          </div>
        )}
        
        <div className="hidden sm:flex flex-col text-left">
          <span className="text-xs font-bold text-slate-200 tracking-wide truncate max-w-[120px]">
            {currentUser.name || currentUser.username || "User Profile"}
          </span>
          <span className="text-[10px] font-semibold uppercase tracking-wider text-indigo-400 font-mono">
            {currentUser.role}
          </span>
        </div>

        <svg 
          className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Card Matrix */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 origin-top-right rounded-xl border border-slate-800 bg-slate-900 shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none z-50 animate-in fade-in slide-in-from-top-1 duration-150">
          {/* Context Header */}
          <div className="px-4 py-3 border-b border-slate-800/60">
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 font-mono">Signed in as</p>
            <p className="text-xs font-semibold text-slate-300 truncate mt-0.5">{currentUser.email}</p>
          </div>

          {/* Action Footer */}
          <div className="p-1.5 border-t border-slate-800/60">
            <button
              onClick={handleLogoutClick}
              className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-rose-400 hover:text-rose-300 rounded-lg hover:bg-rose-950/30 transition-colors group"
            >
              <svg className="w-4 h-4 text-rose-400/80 group-hover:text-rose-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Sign Out Session
            </button>
          </div>
        </div>
      )}
    </div>
  );
}