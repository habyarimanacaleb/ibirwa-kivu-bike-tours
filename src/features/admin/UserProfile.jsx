import React, { useState, useEffect, useRef } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import useAuthStore from "../../store/useAuthStore";

export default function UserProfileDropdown({ theme = "dark" }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const currentUser = useAuthStore((state) => state.currentUser);
  const logout = useAuthStore((state) => state.logout);

  if (!currentUser) return null;

  const getInitials = (name) => {
    if (!name) return "?";
    return name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const handleLogoutClick = () => {
    setIsOpen(false);
    logout();
    navigate("/join");
  };

  // Dynamic style matrices based on the active structural theme
  const isLight = theme === "light";
  
  const styles = {
    triggerHover: isLight 
      ? "hover:bg-slate-100 border-transparent hover:border-slate-200" 
      : "hover:bg-slate-800/60 border-transparent hover:border-slate-700/50",
    nameText: isLight ? "text-slate-800" : "text-slate-200",
    roleText: isLight ? "text-indigo-600" : "text-indigo-400",
    menuBg: isLight ? "bg-white border-slate-200" : "bg-slate-900 border-slate-800",
    headerBorder: isLight ? "border-slate-100" : "border-slate-800/60",
    subText: isLight ? "text-slate-400" : "text-slate-500",
    emailText: isLight ? "text-slate-700" : "text-slate-300",
    linkText: isLight ? "text-slate-600 hover:text-slate-900 hover:bg-slate-50" : "text-slate-300 hover:text-white hover:bg-slate-800/70",
    svgColor: isLight ? "text-slate-400 group-hover:text-indigo-600" : "text-slate-400 group-hover:text-indigo-400",
    footerBorder: isLight ? "border-slate-100" : "border-slate-800/60"
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2.5 p-1.5 rounded-xl border transition-all duration-200 focus:outline-none ${styles.triggerHover}`}
      >
        {currentUser.avatarUrl ? (
          <img
            className="w-8 h-8 rounded-lg object-cover ring-1 ring-slate-200"
            src={currentUser.avatarUrl}
            alt={currentUser.name}
          />
        ) : (
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold font-mono shadow-sm">
            {getInitials(currentUser.name || currentUser.username || currentUser.email)}
          </div>
        )}
        
        <div className="hidden md:flex flex-col text-left">
          <span className={`text-xs font-bold tracking-wide truncate max-w-[120px] ${styles.nameText}`}>
            {currentUser.name || currentUser.username || "User Profile"}
          </span>
          <span className={`text-[10px] font-semibold uppercase tracking-wider font-mono ${styles.roleText}`}>
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

      {/* Dropdown Card */}
      {isOpen && (
        <div className={`absolute right-0 mt-2 w-56 origin-top-right rounded-xl border shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none z-50 animate-in fade-in slide-in-from-top-1 duration-150 ${styles.menuBg}`}>
          <div className={`px-4 py-3 border-b ${styles.headerBorder}`}>
            <p className={`text-[10px] font-bold uppercase tracking-widest font-mono ${styles.subText}`}>Signed in as</p>
            <p className={`text-xs font-semibold truncate mt-0.5 ${styles.emailText}`}>{currentUser.email}</p>
          </div>

          <div className="py-1.5 px-1.5 space-y-0.5">
            {currentUser.role === "admin" && (
              <NavLink
                to="/admin-settings"
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-2 px-3 py-2 text-xs font-medium rounded-lg transition-colors group ${styles.linkText}`}
              >
                <svg className={`w-4 h-4 transition-colors ${styles.svgColor}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
                Governance Panel
              </NavLink>
            )}

            <NavLink
              to="/admin-settings"
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-2 px-3 py-2 text-xs font-medium rounded-lg transition-colors group ${styles.NavLinkText}`}
            >
              <svg className={`w-4 h-4 transition-colors ${styles.svgColor}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Account Settings
            </NavLink>
          </div>

          <div className={`p-1.5 border-t ${styles.footerBorder}`}>
            <button
              onClick={handleLogoutClick}
              className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-rose-500 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors group"
            >
              <svg className="w-4 h-4 text-rose-500 group-hover:text-rose-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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