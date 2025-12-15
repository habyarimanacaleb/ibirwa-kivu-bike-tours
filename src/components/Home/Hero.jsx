import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

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
  // console.log("uri",API_URI)
  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await fetch('https://kivu-back-end.onrender.com/api/gallery');
        const data = await res.json();
        console.log("data", data)
        setImages(data.data || []);
      } catch (error) {
        console.error("Failed to fetch gallery:", error);
      }
    };

    fetchGallery();
  }, [ ]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  if (images.length === 0) {
    return (
      <div className="h-96 flex items-center justify-center">
        <p className="text-gray-500">No image available yet</p>
      </div>
    );
  }

  return (
    <div className="relative h-96 w-full overflow-hidden">
      <Slider {...settings}>
        {images.map((item) => (
          <div key={item._id} className="relative">
            <img
              src={item.imageFile}
              alt={item.title}
              className="w-full h-96 object-cover"
            />

            {/* Overlay text */}
            <div className="absolute inset-0 bg-black/30 flex items-end">
              <h2 className="text-white text-2xl font-bold p-6">
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
