// src/pages/Services.js
import React from "react";
import Slideshow from "../components/Slideshow";

export const GalleryServices = () => {
  return (
    <section id="service" className="service fade-in mt-14">
      <h1 className="headings text-bold-600 text-center text-5xl">
        Our Experience Gallery
      </h1>
      <div>
        <Slideshow />
      </div>
      <div className="service-container mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Dynamically insert cards */}
      </div>
    </section>
  );
};
