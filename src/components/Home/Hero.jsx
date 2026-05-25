import React, { useEffect, memo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Slider from "react-slick";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import HeroSkeleton from "./HeroSkeleton";
import { Link } from "react-router-dom";
import useGalleryStore from "../../store/useGalleryStore";
import useUiStore from "../../store/useUiStore";
import { limitByWords } from "../../lib/titleCompressorHelper";

const NextArrow = memo(({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute top-1/2 right-2 md:right-6 -translate-y-1/2 z-20 bg-black/30 hover:bg-blue-600 backdrop-blur-md p-2.5 md:p-3.5 rounded-full text-white transition-all duration-300 border border-white/10 hover:border-blue-500 shadow-2xl flex items-center justify-center cursor-pointer"
    aria-label="Next Adventure Slide"
  >
    <ChevronRightIcon className="w-4 h-4 md:w-5 md:h-5" />
  </button>
));

const PrevArrow = memo(({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute top-1/2 left-2 md:left-6 -translate-y-1/2 z-20 bg-black/30 hover:bg-blue-600 backdrop-blur-md p-2.5 md:p-3.5 rounded-full text-white transition-all duration-300 border border-white/10 hover:border-blue-500 shadow-2xl flex items-center justify-center cursor-pointer"
    aria-label="Previous Adventure Slide"
  >
    <ChevronLeftIcon className="w-4 h-4 md:w-5 md:h-5" />
  </button>
));

function Hero() {
  const { images, isLoading, loadGallery } = useGalleryStore();
  const prefersReducedMotion = useReducedMotion();
  const openInquiry = useUiStore((state) => state.openInquiry);

  useEffect(() => {
    loadGallery();
  }, [loadGallery]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 1200,
    fade: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: !prefersReducedMotion,
    autoplaySpeed: 6500,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    appendDots: (dots) => (
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20">
        <ul className="flex items-center gap-2 custom-hero-dots"> {dots} </ul>
      </div>
    ),
  };

  if (isLoading && images.length === 0) return <HeroSkeleton />;

  return (
    <section className="relative h-screen w-full overflow-hidden bg-slate-950">
      {images.length === 0 ? (
        <section className="h-screen w-full flex flex-col justify-center items-center text-white p-6 bg-slate-950">
          <p className="text-slate-400 text-sm font-semibold uppercase tracking-widest mb-4 animate-pulse">
            Connecting to Live Network Infrastructure...
          </p>
          <div className="relative w-10 h-10">
            <div className="absolute inset-0 rounded-full border-2 border-white/10" />
            <div className="absolute inset-0 rounded-full border-t-2 border-blue-500 animate-spin" />
          </div>
        </section>
      ) : (
        <Slider {...settings} className="h-full w-full">
          {images.map((item, index) => (
            <section
              key={item._id || index}
              className="relative h-screen w-full outline-none select-none"
            >
              {/* --- IMAGE BACKGROUND FRAMEWORK --- */}
              <section className="absolute inset-0 bg-slate-950 overflow-hidden">
                <motion.img
                  src={item.imageFile}
                  alt={
                    item.title || "Ibirwa African Lake Tours Exploration Loop"
                  }
                  loading={index === 0 ? "eager" : "lazy"}
                  fetchPriority={index === 0 ? "high" : "low"}
                  decoding="async"
                  className="w-full h-full object-cover object-center transform pointer-events-none"
                  // SPEED FIX: Disable entry scaling values for index 0 to eliminate animation LCP paint blocking
                  initial={
                    index === 0 || prefersReducedMotion
                      ? { scale: 1 }
                      : { scale: 1.12 }
                  }
                  animate={
                    index === 0 || prefersReducedMotion
                      ? { scale: 1 }
                      : { scale: 1.02 }
                  }
                  // SPEED FIX: Drop the animation duration string to 0 for index 0 so it registers immediately
                  transition={
                    index === 0
                      ? { duration: 0 }
                      : { duration: 7, ease: "easeOut" }
                  }
                />
              </section>

              {/* --- CINEMATIC GRADIENT VIGNETTE --- */}
              <section className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-slate-950/95 z-10" />

              {/* --- FOREGROUND CONTENT LAYER --- */}
              <section className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-12 md:px-6">
                <section className="max-w-5xl mx-auto flex flex-col items-center">
                  {/* Dynamic Context Header Tag */}
                  <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="mb-6"
                  >
                    <span className="inline-block bg-white/10 backdrop-blur-md text-white font-bold text-[10px] md:text-xs tracking-[0.25em] uppercase px-5 py-2 rounded-full border border-white/20 shadow-lg">
                      We travel in comfort
                    </span>
                  </motion.div>

                  {/* Main Header Matrix */}
                  <motion.h2
                    // SPEED FIX: Render immediately with full opacity on index 0 to eliminate the 1.3s LCP delay
                    initial={
                      index === 0 ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }
                    }
                    animate={
                      index === 0 ? { y: 0, opacity: 1 } : { y: 0, opacity: 1 }
                    }
                    transition={
                      index === 0
                        ? { duration: 0 }
                        : { delay: 0.5, duration: 0.8, ease: "easeOut" }
                    }
                    className="text-white text-3xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-8 tracking-tighter leading-[1.1] md:leading-[1.05] drop-shadow-xl max-w-4xl font-sans  subpixel-antialiased"
                  >
                    {limitByWords(item.title)}
                  </motion.h2>

                  {/* Interactive Call to Action Layout */}
                  <motion.div
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.7, duration: 0.8 }}
                    className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center items-center px-4 sm:px-0"
                  >
                    <Link
                      to="/services"
                      className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-10 py-4.5 rounded-2xl font-black uppercase tracking-widest text-xs transition-all duration-300 shadow-xl hover:shadow-blue-600/30 active:scale-95 text-center"
                    >
                      Explore Services
                    </Link>
                    <button
                      onClick={openInquiry}
                      className="w-full sm:w-auto bg-white/10 hover:bg-white/20 backdrop-blur-xl text-white border border-white/20 px-10 py-4.5 rounded-2xl font-black uppercase tracking-widest text-xs transition-all duration-300 active:scale-95"
                    >
                      Inquire Now
                    </button>
                  </motion.div>
                </section>
              </section>
            </section>
          ))}
        </Slider>
      )}
    </section>
  );
}

export default Hero;
