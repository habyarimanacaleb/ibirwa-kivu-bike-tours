import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import Skeleton from "react-loading-skeleton";

// Custom arrows
const NextArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute top-1/2 right-4 -translate-y-1/2 z-10 bg-black/50 p-2 rounded-full"
  >
    <ChevronRightIcon className="w-6 h-6 text-white" />
  </button>
);

const PrevArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute top-1/2 left-4 -translate-y-1/2 z-10 bg-black/50 p-2 rounded-full"
  >
    <ChevronLeftIcon className="w-6 h-6 text-white" />
  </button>
);

function Hero() {
  const [images, setImages] = useState([]);
  // const API_URI = import.meta.env.REACT_SERVER_URL;
  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await fetch(
          "https://kivu-back-end.onrender.com/api/gallery"
        );
        const data = await res.json();
        setImages(data.data || []);
      } catch (error) {
        console.error("Failed to fetch gallery:", error);
      }
    };

    fetchGallery();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  if (images.length === 0) {
    return (
      <>
      <div className="h-[480px] border-b-2 border-gray-50 flex items-center justify-center">
        {/* <p className="text-gray-500">No image available yet</p> */}
        <Skeleton height={480} width={"100%"} className="absolute top-0 left-0 bg-gradient-to-r from-black to-transparent" />
      </div>
      </>
    );
  }

  return (
    <div className="relative h-[480px] w-full overflow-hidden">
      <Slider {...settings}>
        {images.map((item) => (
          <div key={item._id} className="relative">
            <img
              src={item.imageFile}
              alt={item.title}
              className="w-full h-[480px] object-cover bg-black"
            />

            {/* Overlay text */}
            <div className="absolute inset-0 bg-black/30 flex items-end">
              <h2 className="text-white lg:text-4xl text-center lg:text-left  text-2xl font-bold p-8">
                {item.title}
              </h2>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default Hero;
