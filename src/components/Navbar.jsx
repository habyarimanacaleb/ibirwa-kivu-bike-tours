import React, { useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import UserProfileDropdown from "../components/common/UserProfileDropdown"; 
import useAuthStore from "../store/useAuthStore";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Atomic state extraction to isolate the component from global loading states
  const currentUser = useAuthStore((state) => state.currentUser);
  const logout = useAuthStore((state) => state.logout);

  // 1. Handle Scroll Effect for Navbar styling
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isOpen]);

  // 2. Hash Scrolling Manager
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, [location]);

  const closeMenu = () => setIsOpen(false);

  const handleLogout = () => {
    logout();
    closeMenu();
    navigate("/");
  };

  const navLinks = [
    { name: "Home", path: "/#home" },
    { name: "About", path: "/#about" },
    { name: "Our Tour", path: "/#our-tour" },
    { name: "Contact", path: "/#contact" },
    { name: "Blogs", path: "/blogs" },
  ];

  return (
    <>
      <nav
        className={`fixed w-full top-0 left-0 z-[60] transition-all duration-500 flex items-center ${
          scrolled || isOpen
            ? "h-20 bg-black/95 backdrop-blur-lg shadow-2xl border-b border-white/5"
            : "h-24 bg-transparent"
        }`}
      >
        <div className="container mx-auto flex justify-between items-center px-6">
          {/* LOGO MATRIX */}
          <NavLink to="/" className="flex items-center gap-4 z-[70]" onClick={closeMenu}>
            <motion.img
              whileHover={{ scale: 1.1, rotate: -5 }}
              src="/bt-logo-52.png"
              alt="Kivu Logo"
              className={`${scrolled ? "h-12 w-12" : "h-16 w-16"} transition-all duration-500`}
            />
            <div className="text-white flex flex-col uppercase leading-none">
              <span className="text-xl font-black tracking-tighter">Ibirwa Kivu</span>
              <span className="text-[10px] text-yellow-500 font-bold tracking-[0.3em]">Bike Tours</span>
            </div>
          </NavLink>

          {/* DESKTOP VIEWPORT CONTROLS */}
          <div className="hidden md:flex items-center gap-2">
            <ul className="flex items-center space-x-1 font-bold text-[12px] uppercase tracking-widest text-white/70">
              {navLinks.map((link) => {
                const isCurrent =
                  location.pathname + location.hash === link.path ||
                  (link.path === "/" && location.pathname === "/");

                return (
                  <li key={link.name} className="relative">
                    <NavLink
                      to={link.path}
                      onClick={closeMenu}
                      className={() => `relative z-10 px-4 py-2 text-md font-black uppercase tracking-[0.2em] transition-all duration-500 ${
                        isCurrent ? "text-black" : "text-white/70 hover:text-white hover:scale-110"
                      }`}
                    >
                      {link.name}
                      {isCurrent && (
                        <motion.span
                          layoutId="activeBackground"
                          className="absolute inset-0 bg-yellow-500 rounded-full -z-10"
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}
                    </NavLink>
                  </li>
                );
              })}
            </ul>

            {/* PROFILE CONTEXT TRIGGER */}
            <div className="flex items-center gap-4 ml-6 pl-6 border-l border-white/10">
              {currentUser ? (
                <UserProfileDropdown />
              ) : (
                <NavLink to="/join" className="bg-white text-black px-6 py-1 uppercase rounded-full font-black text-md hover:bg-yellow-500 transition-colors">
                  Sign In
                </NavLink>
              )}
            </div>
          </div>

          {/* MOBILE TOGGLE TRIGGER */}
          <button className="md:hidden text-yellow-500 text-3xl z-[70] p-2" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <HiX /> : <HiMenuAlt3 />}
          </button>
        </div>
      </nav>

      {/* FULL SCREEN MOBILE MENUS */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="fixed inset-0 bg-black/95 z-[55] flex flex-col justify-center items-center p-10 text-center animate-in fade-in duration-300"
          >
            <div className="flex flex-col space-y-6 w-full max-w-sm">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  onClick={closeMenu}
                  className="text-4xl font-black text-white hover:text-yellow-500 transition-colors uppercase tracking-tighter"
                >
                  {link.name}
                </NavLink>
              ))}
            </div>
            
            {/* MOBILE AUTH ACTION RINGS */}
            <div className="flex justify-center items-center w-full mt-10 pt-6 border-t border-white/10 max-w-xs">
              {currentUser ? (
                <div className="flex flex-col items-center gap-4 w-full">
                  <NavLink 
                    to={currentUser.role === "admin" ? "/admin-panel" : "/gallery"} 
                    onClick={closeMenu}
                    className="text-sm text-yellow-500 font-black tracking-wider uppercase bg-white/5 px-6 py-2.5 rounded-xl border border-white/10 w-full text-center"
                  >
                    Dashboard ({currentUser.username})
                  </NavLink>
                  <button 
                    onClick={handleLogout} 
                    className="text-red-500 text-xs font-black uppercase tracking-widest bg-red-950/20 hover:bg-red-950/40 border border-red-900/30 w-full py-2.5 rounded-xl transition-all"
                  >
                    Disconnect Session
                  </button>
                </div>
              ) : (
                <NavLink to="/join" onClick={closeMenu} className="bg-white text-black w-full py-3 rounded-full font-black text-xl hover:bg-yellow-500 transition-colors uppercase tracking-wider">
                  Sign In
                </NavLink>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;