import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { NavHashLink } from "react-router-hash-link";
import { motion, AnimatePresence } from "framer-motion"; // For modern animations
import { HiMenuAlt3, HiX } from "react-icons/hi"; // More modern icons
import { FaUserCircle } from "react-icons/fa";
import { DropdownMenu } from "./dropdawn/DropdownMenu";
import useAuthStore from "../store/useAuthStore";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const { currentUser, logout } = useAuthStore();

  // Handle body scroll lock & navbar background transition
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  const handleLogout = () => {
    logout();
    closeMenu();
    navigate("/");
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Our Story", path: "/#our-story" },
    { name: "About Us", path: "/about" },
    { name: "Tour Info", path: "/#tour-information" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <>
      <nav 
        className={`fixed w-full top-0 left-0 z-[60] transition-all duration-500 flex items-center ${
          scrolled || isOpen 
            ? "h-20 bg-black/90 backdrop-blur-md shadow-lg" 
            : "h-24 bg-transparent"
        }`}
      >
        <div className="container mx-auto flex justify-between items-center px-6">
          
          {/* Logo Section */}
          <div
            className="cursor-pointer flex items-center gap-3 z-[70]"
            onClick={() => { navigate("/"); closeMenu(); }}
          >
            <img
              src="/kivu-image/bt-logo-52.png"
              alt="Kivu Logo"
              className={`${scrolled ? "h-12 w-12" : "h-16 w-16"} transition-all duration-500`}
            />
            <div className="text-white text-xs font-black flex flex-col uppercase tracking-tighter leading-none">
              <span className="text-lg">Ibirwa Kivu Bike Tours</span>
              <span className="text-yellow-500 italic uppercase">We travel in comfort</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center space-x-8 font-bold text-sm uppercase tracking-widest text-white/90">
            {navLinks.map((link) => (
              <li key={link.name}>
                <NavHashLink
                  smooth
                  to={link.path}
                  className="hover:text-yellow-400 transition-colors duration-300"
                >
                  {link.name}
                </NavHashLink>
              </li>
            ))}
            
            <li className="flex items-center gap-1 group">
              <DropdownMenu closeMenu={closeMenu} />
            </li>

            {/* Desktop Auth */}
            {currentUser ? (
              <li className="flex items-center gap-4 pl-4 border-l border-white/20">
                <NavLink
                  to={currentUser.role === "admin" ? "/admin-panel" : "/gallery"}
                  className="text-yellow-400 flex items-center gap-2 hover:scale-105 transition-transform"
                >
                  <FaUserCircle size={20} /> <span className="hidden lg:block">{currentUser.username}</span>
                </NavLink>
                <button
                  onClick={handleLogout}
                  className="bg-red-600/20 text-red-500 border border-red-600/50 px-4 py-1.5 rounded text-xs uppercase font-black hover:bg-red-600 hover:text-white transition-all"
                >
                  Logout
                </button>
              </li>
            ) : (
              <li>
                <NavLink
                  to="/join"
                  className="bg-yellow-500 text-black px-6 py-2.5 rounded font-black hover:bg-white transition-all shadow-lg active:scale-95"
                >
                  Sign Up
                </NavLink>
              </li>
            )}
          </ul>

          {/* Mobile Toggle Button */}
          <button
            className="md:hidden text-yellow-500 text-3xl z-[70] focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <HiX /> : <HiMenuAlt3 />}
          </button>
        </div>
      </nav>

      {/* Modern Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-black z-[55] flex flex-col pt-32 px-10"
          >
            <div className="flex flex-col space-y-8">
              {navLinks.map((link, idx) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <NavHashLink
                    smooth
                    to={link.path}
                    onClick={closeMenu}
                    className="text-4xl font-black text-white hover:text-yellow-500 transition-colors uppercase tracking-tighter"
                  >
                    {link.name}
                  </NavHashLink>
                </motion.div>
              ))}
              
              <div className="h-px bg-white/10 w-full my-4" />
              
              <div className="flex flex-col gap-6">
                 <div className="flex items-center gap-4 text-2xl font-bold text-white">
                    <span>Explore Services</span>
                    <DropdownMenu closeMenu={closeMenu} />
                 </div>
                 
                 {currentUser ? (
                    <div className="flex flex-col gap-4">
                        <NavLink to="/admin-panel" onClick={closeMenu} className="text-yellow-400 text-xl font-bold uppercase">Dashboard</NavLink>
                        <button onClick={handleLogout} className="text-left text-red-500 text-xl font-bold uppercase">Logout</button>
                    </div>
                 ) : (
                    <NavLink to="/join" onClick={closeMenu} className="bg-yellow-500 text-black text-center py-4 rounded-xl text-xl font-black uppercase">
                      Join the Adventure
                    </NavLink>
                 )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;