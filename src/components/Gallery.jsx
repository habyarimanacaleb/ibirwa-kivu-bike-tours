import React from "react";
import cardsData from "../assets/Servicesdata";
const Gallery = () => {
  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">
        Our Photo Gallery
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {cardsData.map((card) => (
          <div
            key={card.id}
            className="relative bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 p-4"
          >
            <img
              src={card.image}
              alt={card.title}
              loading="lazy"
              className="w-full h-56 object-cover"
            />
            <div className="absolute bottom-0 bg-black bg-opacity-50 text-white text-center w-full py-2">
              {card.title}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
