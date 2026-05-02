import React, { useEffect, useMemo, useRef } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaWhatsapp,
  FaEnvelope,
  FaCheckCircle,
  FaLightbulb,
  FaChevronLeft,
  FaMapMarkerAlt,
  FaMountain,
} from "react-icons/fa";
import useServiceStore from "../store/useServiceStore";
import Navbar from "./Navbar";
import { Footer } from "./Footer";
import WhatsAppChat from "./WhatsapMeInService";
import { ServiceImageSlider } from "../features/service/ServiceImageSlider";

export const ServiceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Guard to prevent multiple fetches during "Pending" state
  const hasFetched = useRef(false);

  const currentService = useServiceStore((state) => state.currentService);
  const isLoading = useServiceStore((state) => state.isLoading);
  const error = useServiceStore((state) => state.error);
  const fetchServiceById = useServiceStore((state) => state.fetchServiceById);

  useEffect(() => {
    if (id) {
      const currentLoadedId = currentService?._id || currentService?.id;

      // Only fetch if we haven't fetched for THIS ID yet and data isn't already there
      if (String(currentLoadedId) !== String(id) && !hasFetched.current) {
        fetchServiceById(id);
        hasFetched.current = true;
      }

      window.scrollTo(0, 0);
    }

    // Reset guard if ID changes
    return () => {
      hasFetched.current = false;
    };
  }, [id, fetchServiceById, currentService]);

  const isCorrectData = useMemo(() => {
    if (!currentService) return false;
    return String(currentService._id || currentService.id) === String(id);
  }, [currentService, id]);

// Transform the single imageFile into an array of 5 for the slider
const sliderImages = useMemo(() => {
  if (!currentService?.imageFile) return [];
  // Creates an array of 5 items, all filled with the same image URL
  return Array(5).fill(currentService.imageFile);
}, [currentService]);

  // 1. Kivu Themed Loading State
  if (isLoading || !isCorrectData) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-[#0a192f] text-white">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="relative mb-6"
        >
          <FaMountain className="text-6xl text-blue-400" />
          <div className="absolute -bottom-2 left-0 right-0 h-1 bg-blue-500/30 rounded-full overflow-hidden">
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="h-full bg-yellow-500 w-1/2"
            />
          </div>
        </motion.div>
        <p className="text-sm font-black tracking-[0.4em] uppercase text-blue-200">
          Exploring Lake Kivu...
        </p>
      </div>
    );
  }

  // 2. Error State
  if (error) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-gray-50 p-6 text-center">
        <h2 className="text-4xl font-black text-slate-900 mb-4 uppercase">
          Path Missing
        </h2>
        <p className="text-slate-500 mb-8 font-medium">{error}</p>
        <button
          onClick={() => navigate("/")}
          className="bg-blue-600 text-white px-10 py-4 rounded-full font-bold uppercase text-xs tracking-widest shadow-lg transition-all hover:bg-blue-700"
        >
          Back to Expeditions
        </button>
      </div>
    );
  }

  return (
    <div className="bg-[#fcfcfd] selection:bg-blue-100 selection:text-blue-900 min-h-screen">
      <Navbar />

      <AnimatePresence mode="wait">
        <motion.div
          key={id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {/* IMMERSIVE HERO SECTION */}
          <section className="relative h-[85vh] w-full flex items-center justify-center overflow-hidden bg-slate-900">
            <motion.img
              initial={{ scale: 1.15 }}
              animate={{ scale: 1 }}
              transition={{ duration: 2.5, ease: "easeOut" }}
              src={currentService.imageFile}
              alt={currentService.title}
              className="absolute inset-0 w-full h-full object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#fcfcfd] via-black/10 to-black/60" />

            <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <button
                  onClick={() => navigate(-1)}
                  className="mb-8 mt-16 inline-flex items-center gap-2 text-white/80 hover:text-yellow-500 transition-colors uppercase text-[10px] font-black tracking-[0.3em] border border-white/20 px-4 py-2 rounded-full"
                >
                  <FaChevronLeft /> All Expeditions
                </button>
                <h1 className="text-5xl md:text-8xl font-black text-white mb-12 tracking-tighter uppercase leading-[0.9]">
                  {currentService.title}
                </h1>
                <div className="flex items-center justify-center gap-4 text-blue-200">
                  <FaMapMarkerAlt className="text-yellow-500 animate-bounce" />
                  <span className="font-bold tracking-widest uppercase text-xs">
                    Lake Kivu, Rwanda
                  </span>
                </div>
              </motion.div>
            </div>
          </section>

          {/* MAIN CONTENT SECTION */}
          <section className="relative -mt-24 pb-32 z-20">
            <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-3 gap-12">
              {/* LEFT COLUMN */}
              <div className="lg:col-span-2 space-y-12">
                <div className="bg-white rounded-[2.5rem] p-10 md:p-16 shadow-xl shadow-blue-900/5 border border-slate-100">
                  <h3 className="text-xs font-black text-blue-600 uppercase tracking-[0.4em] mb-6">
                    The Journey
                  </h3>
                  <p className="text-xl md:text-2xl text-slate-700 leading-relaxed font-medium whitespace-pre-line">
                    {currentService.description}
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  {/* Highlights Card */}
                  <motion.div
                    whileInView={{ opacity: 1, y: 0 }}
                    initial={{ opacity: 0, y: 20 }}
                    viewport={{ once: true }}
                    className="bg-white p-10 rounded-[2.5rem] shadow-lg border border-slate-100"
                  >
                    <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 text-blue-600">
                      <FaCheckCircle size={24} />
                    </div>
                    <h4 className="text-2xl font-black text-slate-900 mb-6 uppercase tracking-tight">
                      Highlights
                    </h4>
                    <ul className="space-y-4">
                      {currentService.details?.highlights?.map((h, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-3 text-slate-600 font-medium"
                        >
                          <span className="h-1.5 w-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                          {h}
                        </li>
                      ))}
                    </ul>
                  </motion.div>

                  {/* Tips Card */}
                  <motion.div
                    whileInView={{ opacity: 1, y: 0 }}
                    initial={{ opacity: 0, y: 20 }}
                    viewport={{ once: true }}
                    className="bg-[#0a192f] p-10 rounded-[2.5rem] shadow-lg text-white"
                  >
                    <div className="w-12 h-12 bg-yellow-500/20 rounded-2xl flex items-center justify-center mb-6 text-yellow-500">
                      <FaLightbulb size={24} />
                    </div>
                    <h4 className="text-2xl font-black mb-6 uppercase tracking-tight">
                      Traveler Tips
                    </h4>
                    <ul className="space-y-4">
                      {currentService.details?.tips?.map((tip, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-3 text-blue-100/70 text-sm italic"
                        >
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </div>
              </div>

              {/* RIGHT COLUMN: Sticky Booking */}
              <div className="lg:col-span-1">
                <div className="sticky top-32 bg-white rounded-[2.5rem] p-10 shadow-2xl shadow-blue-900/10 border-t-4 border-yellow-500">
                  <h3 className="text-3xl font-black text-slate-900 mb-2 uppercase tracking-tighter">
                    Book Tour
                  </h3>
                  <p className="text-slate-500 text-sm mb-8 font-medium">
                    Instant pricing and availability via chat.
                  </p>

                  <div className="space-y-4">
                    <motion.a
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      href={`https://wa.me/${currentService.details?.whatsapp || "25074606393"}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-center gap-3 bg-[#25D366] text-white py-5 rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg transition-transform"
                    >
                      <FaWhatsapp size={20} /> WhatsApp Agent
                    </motion.a>

                    <motion.a
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      href={`mailto:${currentService.details?.email || "ibirwakivubiketours@gmail.com"}`}
                      className="flex items-center justify-center gap-3 bg-[#0a192f] text-white py-5 rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg transition-transform"
                    >
                      <FaEnvelope size={18} /> Email Inquiry
                    </motion.a>

                    <Link
                      to="/gallery"
                      className="block text-center pt-4 text-blue-600 font-black text-[10px] uppercase tracking-[0.2em] hover:text-yellow-600 transition-colors"
                    >
                      Browse Trip Gallery →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </motion.div>

      </AnimatePresence>
        {/* Replace your static hero image or add this section below your header */}
<section className="my-12 px-4 md:px-0">
  <div className="max-w-4xl mx-auto">
    <h3 className="text-5xl w-40 font-black text-blue-600 uppercase tracking-[0.3em] mb-6">
      Expedition Gallery
    </h3>
    
    {sliderImages.length > 0 ? (
      <ServiceImageSlider images={sliderImages} />
    ) : (
      <div className="w-full h-64 bg-slate-100 rounded-3xl flex items-center justify-center text-slate-400">
        No images available
      </div>
    )}
  </div>
</section>

      {/* Floating WhatsApp with context message */}
      <WhatsAppChat
        introMessage={`I am interested in the ${currentService.title} tour.`}
      />
      <Footer />
    </div>
  );
};

export default ServiceDetail;
