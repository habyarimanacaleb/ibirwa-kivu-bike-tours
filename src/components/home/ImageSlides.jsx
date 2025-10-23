import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { ChevronLeft, ChevronRight } from "lucide-react";

function PrevArrow(props) {
    const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/40 cursor-pointer hover:bg-white/60 p-3 rounded-full z-20 transition"
    >
      <ChevronLeft className="text-white w-6 h-6" />
    </button>
  );
}

function NextArrow(props) {
    const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/40 cursor-pointer hover:bg-white/60 p-3 rounded-full z-20 transition"
    >
      <ChevronRight className="text-white w-6 h-6" />
    </button>
  );
}

function SimpleSlider({localImages}) {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    fade: true,
    pauseOnHover: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };

  return (
    <div className="relative mt-4 w-full">
      <Slider {...settings}>
        {localImages.map((item, index) => (
          <div key={index} className="relative group h-[600px] overflow-hidden">
            {/* Image */}
            <img
              src={item.src || item.image}
              alt={`slide-${index}`}
              className="w-full h-full object-cover transition duration-500 group-hover:opacity-60"
            />

            {/* Centered Description Overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white opacity-0 group-hover:opacity-100 transition duration-500">
              <div className="px-6 py-4 text-7xl">
                <p className="mt-3 text-lg md:text-xl drop-shadow-md">
                  {item.description || "Image description goes here."}
                </p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default SimpleSlider;
