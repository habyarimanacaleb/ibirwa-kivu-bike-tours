import React from "react";
import { Navbar } from "../components/Navbar";
import { Hero } from "../components/Hero ";
import { ExploreDescription } from "../components/ExploreDescription";
import { Footer } from "../components/Footer";

export const ExploreRwanda = () => {
  return (
    <div className="bg-white text-gray-800">
      {/* Top Navigation */}
      <Navbar />

      {/* Hero Section */}
      <Hero />

      {/* Introduction Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-6">
          Explore Rwanda: A Land of Wonders
        </h1>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto">
          Known as the "Land of a Thousand Hills", Rwanda boasts breathtaking landscapes,
          unique wildlife, and rich cultural traditions. Whether you’re seeking thrilling
          adventure or peaceful nature, Rwanda offers an unforgettable experience.
        </p>
      </section>

      {/* Explore Description Section */}
      <section className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <ExploreDescription />
      </section>

      {/* book you adventure */}
      <div className="text-center mt-10 py-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Ready to Book Your Adventure?
        </h2>
        <p className="text-lg text-gray-600 mb-6">
          Join us for an unforgettable journey through Rwanda’s stunning landscapes and vibrant culture.
        </p>

        <a href="/" className="inline-block bg-black text-white px-6 py-3 rounded-lg shadow hover:bg-gray-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white ">
          Book Your Adventure
        </a>
      </div>


      {/* Footer Section */}
      <Footer />
    </div>
  );
};
