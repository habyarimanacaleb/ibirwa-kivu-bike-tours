import React, { useEffect, useState, memo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Slider from "react-slick";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import HeroSkeleton from "./HeroSkeleton";
import { ChevronDown } from "lucide-react";
import { FaChevronDown } from "react-icons/fa";
import { Link } from "react-router-dom";

/* ---------------- Motion variants ---------------- */
const imageVariants = {
  initial: { scale: 1.1 },
  animate: {
    scale: 1,
    transition: { duration: 6, ease: "easeOut" },
  },
};

const overlayVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.8 } },
};

const titleVariants = {
  initial: { y: 24, opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: { delay: 0.25, duration: 0.5 },
  },
};

/* ---------------- Memoized arrows ---------------- */
const NextArrow = memo(({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute top-1/2 right-4 -translate-y-1/2 z-10 bg-black/50 p-2 rounded-full"
  >
    <ChevronRightIcon className="w-6 h-6 text-white" />
  </button>
));

const PrevArrow = memo(({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute top-1/2 left-4 -translate-y-1/2 z-10 bg-black/50 p-2 rounded-full"
  >
    <ChevronLeftIcon className="w-6 h-6 text-white" />
  </button>
));

/* ---------------- Hero ---------------- */
function Hero({ loading, setLoading }) {
  const [images, setImages] = useState([]);
  const prefersReducedMotion = useReducedMotion();

  /* ---- Preload first image (LCP) ---- */
  useEffect(() => {
    if (images.length > 0) {
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "image";
      link.href = images[0].imageFile;
      document.head.appendChild(link);
    }
  }, [images]);

  /* ---- Fetch images ---- */
  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await fetch(
          "https://kivu-back-end.onrender.com/api/gallery",
        );
        setLoading(true)
        const data = await res.json();
        setImages(data.data || []);
      } catch (error) {
        console.error("Failed to fetch gallery:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, []);

  /* ---- Slick optimizations ---- */
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    lazyLoad: "ondemand", // 🚀 BIG scripting win
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  if (loading){
    return <HeroSkeleton />
  }

  return (
    <div className="relative h-[480px] w-full overflow-hidden">
      <Slider {...settings}>
        {images.map((item, index) => (
          <div key={item._id} className="relative">
            {/* -------- LCP IMAGE (NO MOTION) -------- */}
            {index === 0 ? (
              <img
                src={item.imageFile}
                alt={item.title}
                width="1920"
                height="480"
                fetchpriority="high"
                loading="eager"
                decoding="async"
                className="w-full h-[480px] object-cover bg-black"
              />
            ) : (
              <motion.img
                src={item.imageFile}
                alt={item.title}
                loading="lazy"
                className="w-full h-[480px] object-cover bg-black"
                variants={prefersReducedMotion ? {} : imageVariants}
                initial="initial"
                animate="animate"
              />
            )}

            {/* -------- Overlay -------- */}
            <motion.div
              className="absolute inset-0 bg-black/40 flex items-end"
              variants={prefersReducedMotion ? {} : overlayVariants}
              initial="initial"
              animate="animate"
            >
              <motion.h2
                className="text-white lg:text-4xl text-2xl font-bold p-8"
                variants={prefersReducedMotion ? {} : titleVariants}
                initial="initial"
                animate="animate"
              >
                {item.title}
              </motion.h2>
            </motion.div>
          </div>
        ))}
      </Slider>
      <div className="absolute top-40 right-50 flex flex-col items-center gap-10">

      <span className=" border px-4 rounded-full  font-medium">We Travel in Comfort</span>
      <Link to={'#tours'}>
      <FaChevronDown  size={30} className="animate-bounce rounded-full bg-black/70 p-1"/>
      </Link>
      </div>
    </div>
  );
}

export default Hero;
