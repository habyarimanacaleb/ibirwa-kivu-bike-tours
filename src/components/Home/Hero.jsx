import React, { useEffect, useState, memo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Slider from "react-slick";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

/* ---------------- Fallback slides (instant playback) ---------------- */
const fallbackSlides = [
  {
    _id: "fallback-1",
    title: "Discover Kivu",
    imageFile: "/hello-image/eco-tourism.jpg",
  },
  {
    _id: "fallback-2",
    title: "Nature & Experience",
    imageFile: "/hello-image/flying-image.jpg",
  },
  {
    _id: "fallback-3",
    title: "Explore Rwanda",
    imageFile: "/hello-image/long-trip.jpg",
  },
];

/* ---------------- Motion variants ---------------- */
const imageVariants = {
  initial: { scale: 1.1 },
  animate: { scale: 1, transition: { duration: 6, ease: "easeOut" } },
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
function Hero() {
  const [images, setImages] = useState(fallbackSlides);
  const [isLoading, setIsLoading] = useState(true);
  const prefersReducedMotion = useReducedMotion();

  /* ---- Preload LCP image ---- */
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    link.href = images[0].imageFile;
    document.head.appendChild(link);
  }, [images]);

  /* ---- Fetch images ---- */
  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await fetch(
          "https://v2.ibirwakivubiketours.com/api/gallery"
        );
        const data = await res.json();

        if (data?.data?.length) {
          setImages(data.data);
        }
      } catch (error) {
        console.error("Failed to fetch gallery:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGallery();
  }, []);

  /* ---- Slick settings ---- */
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    lazyLoad: "ondemand",
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <div className="relative h-[480px] w-full overflow-hidden">
      <Slider {...settings}>
        {images.map((item, index) => (
          <div key={item._id} className="relative">
            {/* -------- LCP IMAGE -------- */}
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
                {isLoading && (
                  <span className="block text-sm opacity-70 mt-2">
                    Loading experience…
                  </span>
                )}
              </motion.h2>
            </motion.div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default Hero;
