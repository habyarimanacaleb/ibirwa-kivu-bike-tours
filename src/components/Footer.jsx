import React from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  FaEnvelopeOpen,
  FaPhone,
  FaMapMarkerAlt,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaChevronUp,
  FaExternalLinkAlt,
} from "react-icons/fa";

export const Footer = () => {
  const navigate = useNavigate();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-slate-950 text-white py-20 relative z-10 overflow-hidden">
      {/* Decorative subtle gradient background */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-600 to-transparent opacity-50" />
      
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Column 1: Brand & Partner */}
          <div className="lg:col-span-2">
            <h3 className="text-3xl font-black mb-4 tracking-tighter uppercase leading-none">
              Ibirwa Kivu <span className="text-blue-600 text-sm block tracking-widest mt-1">Safaris & Expeditions</span>
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed max-w-md mb-8 font-medium">
              Precision-guided tours through Rwanda's western corridor. From the 
              volcanic shores of Lake Kivu to the heart of the Congo-Nile Trail.
            </p>
            
            {/* PARTNER HIGHLIGHT */}
            <div className="p-6 bg-slate-900/50 border border-slate-800 rounded-3xl inline-block">
              <p className="text-[10px] uppercase font-black tracking-[0.2em] text-blue-500 mb-2">Exclusive Wildlife Partner</p>
              <h4 className="text-lg font-bold text-slate-100">Turacos Tours</h4>
              <p className="text-xs text-slate-400 font-medium">Rwanda Wildlife Safaris & Primate Tracking</p>
            </div>
          </div>

          {/* Column 2: Registry Links */}
          <div>
            <h3 className="text-xs font-black mb-6 uppercase tracking-[0.3em] text-slate-500">Navigation</h3>
            <ul className="space-y-4 text-sm font-bold uppercase tracking-tighter">
              <li><Link to="/" className="hover:text-blue-500 transition-colors">Home Base</Link></li>
              <li><Link to="/services" className="hover:text-blue-500 transition-colors">Expedition Registry</Link></li>
              <li><Link to="/gallery" className="hover:text-blue-500 transition-colors">Visual Archive</Link></li>
              <li><Link to="/contact" className="hover:text-blue-500 transition-colors">Comm-Link</Link></li>
            </ul>
          </div>

          {/* Column 3: Get in Touch (HQ Intel) */}
          <div>
            <h3 className="text-xs font-black mb-6 uppercase tracking-[0.3em] text-slate-500">HQ Contact</h3>
            <ul className="text-slate-300 space-y-4 text-sm font-medium">
              <li className="flex items-start gap-3">
                <FaEnvelopeOpen className="text-blue-600 mt-1" />
                <span>ibirwakivubiketours@gmail.com</span>
              </li>
              <li className="flex items-center gap-3">
                <FaPhone className="text-blue-600" />
                <span>+250 784 606 393</span>
              </li>
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-blue-600 mt-1" />
                <span>Kibuye, Karongi<br />Western Province, Rwanda</span>
              </li>
              <li className="pt-2">
                <a
                  href="https://www.google.com/maps/search/?api=1&query=IBIRWA+KIVU+BIKE+TOURS+Rwanda"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-blue-500 font-black uppercase text-[10px] tracking-widest hover:text-white transition-all"
                >
                  Google Map View <FaExternalLinkAlt size={10} />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-20 pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex space-x-6">
            <a href="https://facebook.com" className="text-slate-500 hover:text-white transition-colors text-xl">
              <FaFacebook />
            </a>
            <a href="https://twitter.com" className="text-slate-500 hover:text-white transition-colors text-xl">
              <FaTwitter />
            </a>
            <a href="https://instagram.com" className="text-slate-500 hover:text-white transition-colors text-xl">
              <FaInstagram />
            </a>
          </div>

          <p className="text-[10px] font-black uppercase tracking-widest text-slate-600 text-center">
            © {new Date().getFullYear()} Ibirwa Kivu Bike & Turacos Tours. Optimized by Engineering Standards.
          </p>

          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-slate-500 hover:text-white transition-all"
          >
            Top <FaChevronUp className="group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
};