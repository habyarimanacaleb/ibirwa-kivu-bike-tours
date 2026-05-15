import React, { useEffect, memo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Slider from "react-slick";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import HeroSkeleton from "./HeroSkeleton";
import { Link } from "react-router-dom";
import useGalleryStore from "../../store/useGalleryStore";
import useUiStore from "../../store/useUiStore";

const NextArrow = memo(({ onClick }) => (
  <button onClick={onClick} className="absolute top-1/2 right-6 -translate-y-1/2 z-20 bg-white/10 backdrop-blur-md p-3 rounded-full hover:bg-white/30 transition-all border border-white/20">
    <ChevronRightIcon className="w-6 h-6 text-white" />
  </button>
));

const PrevArrow = memo(({ onClick }) => (
  <button onClick={onClick} className="absolute top-1/2 left-6 -translate-y-1/2 z-20 bg-white/10 backdrop-blur-md p-3 rounded-full hover:bg-white/30 transition-all border border-white/20">
    <ChevronLeftIcon className="w-6 h-6 text-white" />
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
    speed: 1000,
    fade: true, // Smoother for high-res hero images
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: !prefersReducedMotion,
    autoplaySpeed: 6000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  if (isLoading && images.length === 0) return <HeroSkeleton />;

  return (
    <div className="relative h-screen w-full overflow-hidden bg-slate-950">
      {images.length === 0 ? (
        <div className="h-screen w-full flex flex-col justify-center items-center text-white p-6">
          <p className="text-slate-400 mb-4">Waking up Kivu Server...</p>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
        </div>
      ) : (
        <Slider {...settings}>
          {images.map((item, index) => (
            <div key={item._id || index} className="relative h-screen">
              {/* IMAGE OPTIMIZATION: Priority on the first slide */}
              <motion.img
                src={item.imageFile}
                alt={item.title}
                loading={index === 0 ? "eager" : "lazy"}
                fetchpriority={index === 0 ? "high" : "low"}
                decoding="async"
                className="w-full h-full object-cover"
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 8, ease: "linear" }}
              />
              
              {/* Advanced Gradient Overlay for better text contrast */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80 flex flex-col items-center justify-center text-center px-4">
                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="max-w-5xl"
                >
                  <h2 className="text-white text-5xl md:text-7xl font-black mb-8 tracking-tighter leading-tight">
                    {item.title}
                  </h2>

                  <div className="flex flex-col sm:flex-row gap-5 justify-center items-center mt-6 mx-18 md:mx-0">
                    <Link
                      to="/services"
                      className="w-full sm:w-auto bg-yellow-600 hover:bg-yellow-700 text-white px-12 py-5 rounded-2xl font-black uppercase tracking-widest transition-all shadow-2xl hover:-translate-y-1"
                    >
                      Explore Tours
                    </Link>
                    <button
                      onClick={openInquiry}
                      className="w-full sm:w-auto bg-white/10 hover:bg-white/20 backdrop-blur-xl text-white border border-white/30 px-12 py-5 rounded-2xl font-black uppercase tracking-widest transition-all"
                    >
                      Inquiry Now
                    </button>
                  </div>
                </motion.div>
              </div>
            </div>
          ))}
        </Slider>
      )}

      {/* Modern Badge */}
      <div className="absolute top-32 left-1/2 -translate-x-1/2 z-20">
        <span className="bg-blue-600/10 backdrop-blur-md border border-blue-400/50 text-blue-100 px-6 py-2 rounded-full text-[8px] md:text-[10px] font-black uppercase tracking-[0.3em]">
          We travel in comfort
        </span>
      </div>
    </div>
  );
}

export default Hero;