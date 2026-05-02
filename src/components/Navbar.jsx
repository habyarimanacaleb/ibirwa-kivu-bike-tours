import React, { useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { FaUserCircle } from "react-icons/fa";
import { DropdownMenu } from "./dropdawn/DropdownMenu";
import useAuthStore from "../store/useAuthStore";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser, logout } = useAuthStore();

  // 1. Handle Scroll Effect for Navbar styling
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isOpen]);

  // 2. THE FIX FOR SERVICE DETAIL: Use useEffect to handle hash scrolling 
  // This prevents the infinite re-render loop by letting the Router finish its job first.
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        // Delay slightly to ensure the DOM is ready
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
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "Our Story", path: "/#our-story" },
    { name: "Tour Info", path: "/#tour-information" },
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

          <div className="hidden md:flex items-center gap-2">
            <ul className="flex items-center space-x-1 font-bold text-[12px] uppercase tracking-widest text-white/70">
              {navLinks.map((link) => {
                // Check if link is active (considering both path and hash)
                const isCurrent =
                  location.pathname + location.hash === link.path ||
                  (link.path === "/" && location.pathname === "/");

                return (
                  <li key={link.name} className="relative">
                    <NavLink
                      to={link.path}
                      onClick={closeMenu}
                      // Using the function version of className to avoid passing isActive to DOM
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

            <div className="flex items-center gap-4 ml-6 pl-6 border-l border-white/10">
              <DropdownMenu closeMenu={closeMenu} />
              {currentUser ? (
                <div className="flex items-center gap-4">
                  <motion.div
                    whileHover={{ y: -2 }}
                    className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-xl border border-white/10"
                  >
                    <FaUserCircle className="text-yellow-500" size={18} />
                    <NavLink to={currentUser.role === "admin" ? "/admin-panel" : "/gallery"} className="text-[10px] text-white font-black">
                      {currentUser.username}
                    </NavLink>
                  </motion.div>
                  <button onClick={handleLogout} className="text-red-500 text-[10px] font-black uppercase hover:text-red-400">Exit</button>
                </div>
              ) : (
                <NavLink to="/join" className="bg-white text-black px-6 py-1 uppercase rounded-full font-black text-md hover:bg-yellow-500 transition-colors">
                  Sign In
                </NavLink>
              )}
            </div>
          </div>

          <button className="md:hidden text-yellow-500 text-3xl z-[70] p-2" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <HiX /> : <HiMenuAlt3 />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="fixed inset-0 bg-black/95 z-[55] flex flex-col justify-center items-center p-10 text-center"
          >
            <div className="flex flex-col space-y-6 w-full max-w-sm">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  onClick={closeMenu}
                  className="text-5xl font-black text-white hover:text-yellow-500 transition-colors uppercase tracking-tighter"
                >
                  {link.name}
                </NavLink>
              ))}
            </div>
            <div className="flex justify-center items-center w-full gap-4 mt-6 border-white/10">
              {currentUser ? (
                <div className="flex items-center gap-4">
                  <motion.div
                    whileHover={{ y: -2 }}
                    className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-xl border border-white/10"
                  >
                    <FaUserCircle className="text-yellow-500" size={18} />
                    <NavLink to={currentUser.role === "admin" ? "/admin-panel" : "/gallery"} className="text-[10px] text-white font-black">
                      {currentUser.username}
                    </NavLink>
                  </motion.div>
                  <button onClick={handleLogout} className="text-red-500 text-[10px] font-black uppercase hover:text-red-400">Exit</button>
                </div>
              ) : (
                <NavLink to="/join" className="bg-white text-black px-6 py-2.5 rounded-full font-black text-4xl hover:bg-yellow-500 transition-colors">
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