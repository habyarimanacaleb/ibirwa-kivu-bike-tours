// src/pages/Services.js
import React from "react";
import Slideshow from "../components/Slideshow";
import Gallery from "../components/Gallery";

export const GalleryServices = () => {
  return (
    <section id="service" className="service fade-in mt-14">
      <h1 className="headings text-bold-600 text-center text-5xl">
        Our Experience Gallery
      </h1>
      <div>
        <Slideshow />
      </div>
      <Gallery />
    </section>
  );
};
