import React, { useState } from "react";
import { motion } from "framer-motion";
import ReviewForm from "../components/ReviewForm";
import Navbar from "../components/Navbar";
import { Footer } from "../components/Footer";

export const About = () => {
  const [testimonials, setTestimonials] = useState([
    {
      id: 1,
      name: "Sarah, United Kingdom",
      text: "IBIRWA KIVU BIKE TOURS gave us the opportunity to explore Rwanda's beautiful landscapes, rich culture, and incredible history. Our biking trip was exhilarating, and we loved connecting with local communities along the way!",
    },
    {
      id: 2,
      name: "Carlos, Spain",
      text: "The best travel experience I've had! The guides were knowledgeable, friendly, and made us feel like part of the family. Rwanda’s natural beauty will stay in my heart forever.",
    },
  ]);

  const [newTestimonial, setNewTestimonial] = useState({
    name: "",
    text: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTestimonial.name && newTestimonial.text) {
      setTestimonials([
        ...testimonials,
        { id: testimonials.length + 1, ...newTestimonial },
      ]);
      setNewTestimonial({ name: "", text: "" });
    }
  };

  const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>
      <Navbar />
      <div className="about fade-in mx-auto w-full lg:max-w-[1200px] flex flex-col py-10 px-4 mt-8 ">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInVariants}
          transition={{ duration: 0.5 }}
        >
          <h1 className="headings mb-5 text-center text-4xl font-bold text-blue-800">
            About Us
          </h1>
        </motion.div>

        {[
          "Welcome to IBIRWA KIVU BIKE TOURS – your ultimate gateway to explore the beauty, adventure, and culture of Rwanda. Whether you are seeking tranquil escapes, thrilling adventures, or deep cultural insights, we offer a variety of experiences that cater to every traveler.",
          "As Rwanda's premier adventure partner, we take pride in offering bespoke tours that connect you to the heart of this extraordinary country. Our tailored experiences take you through awe-inspiring landscapes, cultural landmarks, and a fascinating history that has shaped Rwanda into the vibrant nation it is today.",
          "From the tranquil shores of Lake Kivu to the rugged terrain of the Congo Nile Trail, our tours offer the perfect balance of adventure and serenity. Imagine biking through lush hills, kayaking on crystal-clear waters, or hiking in the footsteps of Rwanda's royal heritage. Each of our tours invites you to immerse yourself fully in the captivating beauty and culture of Rwanda.",
          "Explore Kigali, a bustling city full of history and modern charm, or visit the iconic Genocide Memorials that provide a powerful and moving journey through Rwanda's resilient past. Beyond the capital, you'll discover the beauty of Musanze, Rubavu, Kibuye, and Huye, each offering unique experiences, from cultural visits to breathtaking natural landscapes."
        ].map((text, index) => (
          <motion.div
            key={index}
            initial="hidden"
            animate="visible"
            variants={fadeInVariants}
            transition={{ duration: 0.5, delay: 0.2 * (index + 1) }}
          >
            <p className="text-xl sm:text-lg md:text-xl text-justify mb-6 text-gray-700 leading-relaxed">
              {text}
            </p>
          </motion.div>
        ))}

        {/* Sustainability Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInVariants}
          transition={{ duration: 0.5, delay: 1.0 }}
        >
          <div className="sustainability text-xl sm:text-lg md:text-xl text-justify py-6">
            <h2 className="font-bold text-3xl mb-4 text-blue-800">Sustainability at IBIRWA KIVU</h2>
            <p className="mb-6 text-gray-700">
              At IBIRWA KIVU BIKE TOURS, sustainability is at the heart of everything we do. We are committed to protecting Rwanda's natural beauty for future generations by ensuring that our tours are environmentally friendly. From using eco-friendly materials to minimizing our carbon footprint, we are dedicated to preserving the land we love.
            </p>
            <p className="mb-6 text-gray-700">
              We also believe in the power of community. By working closely with local artisans, farmers, and guides, we ensure that the communities we visit thrive from the tourism we bring. Every tour you take helps support local economies and keeps Rwanda’s cultural heritage alive.
            </p>
          </div>
        </motion.div>

        {/* Additional Information */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInVariants}
          transition={{ duration: 0.5, delay: 1.2 }}
        >
          <div className="text-xl sm:text-lg md:text-xl text-justify py-6">
            {[
              "Rwanda’s agricultural heritage is another gem that we proudly highlight. Our tours include visits to the lush coffee and tea plantations in the West Province, where you can observe the process of cultivation and sample some of the world’s finest brews. At Nkombo Island, you’ll experience the beauty of traditional handcrafts, created by skilled artisans that showcase Rwanda’s artistic soul.",
              "For those with a keen sense of adventure, the mountain biking trails offer exhilarating rides through Rwanda’s iconic hills. Hidden waterfalls, diverse wildlife, and interactions with local communities make these trails an unforgettable journey. You’ll not only witness Rwanda's natural beauty but also experience its cultural diversity and the warm hospitality of its people.",
              "At IBIRWA KIVU BIKE TOURS, we believe that travel should be more than just a journey—it should be a life-changing experience. Our tours create lasting memories by fostering meaningful connections with Rwanda’s vibrant culture, breathtaking landscapes, and fascinating history. Each trip is an opportunity to learn, explore, and grow, leaving you with an experience that will stay with you for a lifetime.",
              "For the adventurous at heart, we offer the Mount Karongi Half-Day and Full-Day Trail Biking Adventures. Ride through scenic tea and coffee plantations, visit the Gisovu Tea and Coffee Factory, and immerse yourself in the powerful history at the Bisesero Genocide Memorial. End your journey with a visit to the stunning Mubuga Waterfall. These experiences last 6-12 hours and are designed for those who want to take their adventure to the next level."
            ].map((para, i) => (
              <p key={i} className="mb-6 text-gray-700">{para}</p>
            ))}
          </div>
        </motion.div>

        {/* Review Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInVariants}
          transition={{ duration: 0.5, delay: 1.4 }}
        >
          <div className="bg-gradient-to-r from-blue-50 to-white border border-blue-200 rounded-lg p-6 mt-10 shadow">
            <h2 className="text-2xl font-bold text-center text-blue-800 mb-6">
              Kivu Tour Reviews
            </h2>
            <div className="space-y-4">
              {testimonials.map((review) => (
                <div
                  key={review.id}
                  className="bg-white border-l-4 border-blue-500 shadow p-4 rounded-md"
                >
                  <p className="text-gray-800 italic">"{review.text}"</p>
                  <p className="text-sm text-gray-600 text-right mt-2">— {review.name}</p>
                </div>
              ))}
            </div>
            <ReviewForm
              newTestimonial={newTestimonial}
              setNewTestimonial={setNewTestimonial}
              handleSubmit={handleSubmit}
            />
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInVariants}
          transition={{ duration: 0.5, delay: 1.6 }}
        >
          <p className="text-xl text-center font-semibold text-gray-700 mt-10">
            At IBIRWA KIVU BIKE TOURS, we don’t just offer tours—we create transformative journeys that connect you with the spirit of Rwanda. Ready for the adventure of a lifetime?{' '}
            <a href="/contact" className="text-blue-600 hover:underline">
              Book your tour today
            </a>{' '}and let’s explore together!
          </p>
        </motion.div>
      </div>
      <Footer />
    </>
  );
};
