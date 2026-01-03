import React from "react";
import Slider from "react-slick";
import Skeleton from "react-loading-skeleton";

// Custom arrows
const NextArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute top-1/2 w-6 h-6 right-4 -translate-y-1/2 z-10 bg-black/50 p-2 rounded-full"
  >
  </button>
);

const PrevArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute w-6 h-6 top-1/2 left-4 -translate-y-1/2 z-10 bg-black/50 p-2 rounded-full"
  >
  </button>
);

function HeroSkeleton() {
  // const API_URI = import.meta.env.REACT_SERVER_URL;

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

  return (
    <div className="relative h-[480px] w-full overflow-hidden">
      <Slider {...settings}>
          <div className="relative">
            <div
              className="w-full h-[480px] object-cover bg-black"
              aria-label="Image container"
            >
              <Skeleton height={480} width="100%" className="bg-gradient-to-r from-black to-gray-300" />
            </div>

            {/* Overlay text */}
            <div className="absolute inset-0 bg-black/30 flex items-end">
              <h2 className="text-white lg:text-4xl text-center lg:text-left  text-2xl font-bold p-8 w-4 h-4">
              </h2>
            </div>
          </div>
      </Slider>
    </div>
  );
}

export default HeroSkeleton;
