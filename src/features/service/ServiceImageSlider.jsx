import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { FaEye, FaTimes } from 'react-icons/fa';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export const ServiceImageSlider = ({ images }) => {
  const [fullScreenImage, setFullScreenImage] = useState(null);
  return (
    <section className="relative w-full overflow-hidden rounded-2xl">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={1}
        slidesPerView={4}
        loop={true}
        autoplay={{ delay: 3000 }}
        navigation
        pagination={{ clickable: true }}
        className="w-full h-[200px] md:h-[300px]"
      >
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <section className="relative w-full h-full group">
              <img src={img} alt={`Gallery ${index}`} className="w-full h-full object-cover hover:scale-102 transition-all" />
              <button 
                onClick={() => setFullScreenImage(img)}
                className="absolute top-[50%] right-[40%] border border-white bg-black/50 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <FaEye size={18} />
              </button>
            </section>
          </SwiperSlide>
        ))}
      </Swiper>
      {fullScreenImage && (
        <section className="fixed inset-0 z-[9999] bg-black/90 flex items-center justify-center p-4">
          <button 
            onClick={() => setFullScreenImage(null)} 
            className="absolute top-8 right-8 text-white text-3xl"
          >
            <FaTimes />
          </button>
          <img src={fullScreenImage} alt="Full view" className="max-w-full max-h-[80vh] rounded-lg object-contain" />
        </section>
      )}
    </section>
  );
};