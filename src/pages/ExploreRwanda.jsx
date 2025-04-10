import React from "react";
import { Navbar } from "../components/Navbar";
import { Hero } from "../components/Hero ";
import { ExploreDescription } from "../components/ExploreDescription";
import { Footer } from "../components/Footer";
export const ExploreRwanda = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <div className="container flex flex-col justify-center items-center mx-auto p-4">
        <h1 className="text-3xl font-bold text-center text-green-700 mb-8">
          Explore Rwanda: A Land of Wonders
        </h1>
        <div className="text-center mb-8 max-w-[900px] mt-5">
          <p className="text-lg text-gray-700">
            Rwanda, known as the "Land of a Thousand Hills", is home to stunning
            landscapes, diverse wildlife, and rich culture. Whether you're an
            adventure seeker or looking to relax in nature, there's something
            for everyone.
          </p>
        </div>
        <ExploreDescription />
      </div>
      <Footer />
    </div>
  );
};
