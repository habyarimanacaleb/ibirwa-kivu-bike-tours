import React, { useEffect, memo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Slider from "react-slick";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import HeroSkeleton from "./HeroSkeleton";
import { Link } from "react-router-dom";
import useGalleryStore from "../../store/useGalleryStore";
import useUiStore from "../../store/useUiStore";

// Add a separate store or state for the Inquiry Modal toggle
// For now, we'll assume a simple function call

const NextArrow = memo(({ onClick }) => (
  <button onClick={onClick} className="absolute top-1/2 right-4 -translate-y-1/2 z-10 bg-black/50 p-2 rounded-full hover:bg-black/70 transition-all">
    <ChevronRightIcon className="w-6 h-6 text-white" />
  </button>
));

const PrevArrow = memo(({ onClick }) => (
  <button onClick={onClick} className="absolute top-1/2 left-4 -translate-y-1/2 z-10 bg-black/50 p-2 rounded-full hover:bg-black/70 transition-all">
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
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: !prefersReducedMotion,
    autoplaySpeed: 5000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  if (isLoading) return <HeroSkeleton />;

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <Slider {...settings}>
        {images.map((item, index) => (
          <div key={item._id || index} className="relative h-screen">
            <motion.img
              src={item.imageFile}
              alt={item.title}
              className="w-full h-full object-cover"
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 6 }}
            />
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center px-4">
              <motion.h2 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-white text-4xl md:text-7xl font-bold mb-8 max-w-5xl"
              >
                {item.title}
              </motion.h2>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <Link
                  to="/services"
                  className="bg-orange-600 hover:bg-orange-700 text-white px-10 py-4 rounded-full font-bold uppercase tracking-widest transition-all shadow-lg"
                >
                  Explore Tours
                </Link>
                <button
                  onClick={() => {
                    openInquiry();
                  }}
                  className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border-2 border-white/50 px-10 py-4 rounded-full font-bold uppercase tracking-widest transition-all"
                >
                  Inquiry Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </Slider>
      
      {/* Badge */}
      <div className="absolute top-25 lg:top-40 left-1/2 -translate-x-1/2 z-20">
        <span className="bg-white/20 backdrop-blur-sm border border-white/30 text-white px-6 py-1 rounded-full text-sm font-medium">
          We Travel in Comfort
        </span>
      </div>
    </div>
  );
}

export default Hero;
