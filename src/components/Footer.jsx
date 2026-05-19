import React from "react";
import { useNavigate, NavLink } from "react-router-dom";
import {
  FaEnvelopeOpen,
  FaPhone,
  FaMapMarkerAlt,
  FaFacebook,
  FaYoutube,
  FaTiktok,
  FaInstagram,
  FaChevronUp,
  FaExternalLinkAlt,
} from "react-icons/fa";

import { FaXTwitter } from "react-icons/fa6";

export const Footer = () => {
  const navigate = useNavigate();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-slate-950 text-white py-20 relative z-10 overflow-hidden">
      <section className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-600 to-transparent opacity-50" />

      <section className="container mx-auto px-6">
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <section className="lg:col-span-2">
            <NavLink to="/" className="flex items-center gap-4 z-[70]">
              <img
                src="/bt-logo-52.png"
                alt="Kivu Logo"
                className="h-16 w-16"
              />
            </NavLink>
            <h3 className="text-3xl font-black mb-4 tracking-tighter uppercase leading-none">
              Ibirwa Kivu{" "}
              <span className="text-blue-600 text-sm block tracking-widest mt-1">
                Bike Tours & Expeditions
              </span>
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed max-w-md mb-8 font-medium">
              Premium active travel through Rwanda's western corridor.
              Navigating the legendary terrain of the Congo Nile Trail, pristine
              National Parks, and the volcanic emerald shores of Lake Kivu.
            </p>
          </section>
          <section>
            <h3 className="text-xs font-black mb-6 uppercase tracking-[0.3em] text-slate-500">
              Navigation
            </h3>
            <ul className="space-y-4 text-sm font-bold uppercase tracking-tighter">
              <li>
                <NavLink
                  to="/"
                  className="hover:text-blue-500 transition-colors"
                >
                  Home Base
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/services"
                  className="hover:text-blue-500 transition-colors"
                >
                  Our Tours / Services
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/blogs"
                  className="hover:text-blue-500 transition-colors"
                >
                  Our Blogs
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contact"
                  className="hover:text-blue-500 transition-colors"
                >
                  Contact-Link
                </NavLink>
              </li>
            </ul>
          </section>
          <section>
            <h3 className="text-xs font-black mb-6 uppercase tracking-[0.3em] text-slate-500">
              HQ Contact
            </h3>
            <ul className="text-slate-300 space-y-4 text-sm font-medium">
              <li className="flex items-start gap-3">
                <FaEnvelopeOpen className="text-blue-600 mt-1 shrink-0" />
                <span className="break-all">ibirwakivubiketours@gmail.com</span>
              </li>
              <li className="flex items-center gap-3">
                <FaPhone className="text-blue-600 shrink-0" />
                <span>+250 784 606 393</span>
              </li>
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-blue-600 mt-1 shrink-0" />
                <span>
                  Kibuye, Karongi
                  <br />
                  Western Province, Rwanda
                </span>
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
          </section>
        </section>
        <section className="mt-20 pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-6">
          <section className="flex flex-wrap items-center gap-5">
            {/* Instagram */}
            <a
              href="https://www.instagram.com/ibirwaafricanlaketours/"
              target="_blank"
              rel="noreferrer"
              className="text-slate-500 hover:text-white transition-colors text-xl"
              aria-label="Instagram Link"
            >
              <FaInstagram />
            </a>

            {/* Facebook */}
            <a
              href="https://www.facebook.com/IbirwaAfricanLakeTours"
              target="_blank"
              rel="noreferrer"
              className="text-slate-500 hover:text-white transition-colors text-xl"
              aria-label="Facebook Link"
            >
              <FaFacebook />
            </a>

            {/* TikTok */}
            <a
              href="https://www.tiktok.com/@ibirwaafricanlaketours"
              target="_blank"
              rel="noreferrer"
              className="text-slate-500 hover:text-white transition-colors text-xl"
              aria-label="TikTok Link"
            >
              <FaTiktok />
            </a>

            {/* X (formerly Twitter) */}
            <a
              href="https://x.com/DJean80592"
              target="_blank"
              rel="noreferrer"
              className="text-slate-500 hover:text-white transition-colors text-xl"
              aria-label="X Twitter Link"
            >
              <FaXTwitter />
            </a>

            {/* YouTube */}
            <a
              href="https://youtube.com/@ibirwatours?si=ekBGZlLiJYdWaTSL"
              target="_blank"
              rel="noreferrer"
              className="text-slate-500 hover:text-white transition-colors text-xl"
              aria-label="YouTube Link"
            >
              <FaYoutube />
            </a>
          </section>
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-600 text-center md:max-w-none max-w-xs">
            © {new Date().getFullYear()} Ibirwa Kivu Bike Tours. All Rights
            Reserved. Optimized by Engineering Standards.
          </p>
          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-slate-500 hover:text-white transition-all focus:outline-none"
          >
            Top{" "}
            <FaChevronUp className="group-hover:-translate-y-1 transition-transform duration-200" />
          </button>
        </section>
      </section>
    </footer>
  );
};
