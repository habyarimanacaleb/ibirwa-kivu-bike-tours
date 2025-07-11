import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import homeBg from "../assets/css/Home.module.css";
import Services from "../components/Services";
import { Footer } from "../components/Footer";
import ChevronButton from "../components/ChevronButton";
import TourInquiryForm from "../components/TourInquiryForm";
import WhatsAppChat from "../components/WhatsAppChat";
import Navbar from "../components/Navbar";
import ReviewForm from "../components/ReviewForm";
import { helloImagesData as localImages } from "../assets/Servicesdata";

export const Home = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);

  const [newTestimonial, setNewTestimonial] = useState({ name: "", text: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTestimonial.name && newTestimonial.text) {
      alert("Thank you for your review!");
      setNewTestimonial({ name: "", text: "" });
    }
  };

  // Auto-slide carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % localImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Navbar />
      <div className="bg-gray-200 pt-2">
        <section className="relative home-hello-section lg:h-screen h-auto py-6 text-white">
          <div className="services-images relative h-80 w-full overflow-hidden border-b-2 border-gray-300">
            {localImages.map((imageUrl, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                  index === currentIndex ? "opacity-100" : "opacity-0"
                }`}
              >
                <img
                  src={imageUrl}
                  alt={`Service ${index + 1}`}
                  className="w-full h-80 object-cover"
                  style={{ objectPosition: "center" }}
                />
              </div>
            ))}
          </div>

          <div className="flex flex-col justify-center text-center bg-gray-200 bg-opacity-70 z-10">
            <TourInquiryForm />
          </div>
        </section>

        <section
          className={`about fade-in mx-auto flex flex-col items-center mt-[-12px] justify-center ${homeBg.aboutBg} p-6 lg:h-screen h-auto`}
        >
          <div className="about-content py-6">
            <h1 className="headings mb-12 text-4xl text-center font-bold">
              About Us
            </h1>
            <div className="about-content px-3 max-w-[900px]">
              <p className="lg:text-3xl sm:text-sm md:text-xl pb-2">
                Welcome to IBIRWA KIVU BIKE TOURS, your premier travel partner
                for exploring the beauty, culture, and adventure of Rwanda. We
                specialize in offering unforgettable experiences tailored to
                your interests...
              </p>
            </div>
          </div>
          <button
            onClick={() => navigate("/about")}
            className="btn my-2 w-[150px] bg-blue-500 cursor-pointer text-white px-3 py-2 rounded-md hover:bg-blue-600"
          >
            Learn More
          </button>
        </section>

        <section className="service fade-in" id="service">
          <h1 className="headings text-center text-5xl my-10 font-bold">
            Our Services/Tours
          </h1>
          <Services />
        </section>

        <section id="mtb-tours" className="py-10 bg-gray-100">
          <div className="mx-auto px-6 flex flex-col justify-center items-center">
            <h2 className="text-2xl font-bold text-black text-center mb-8">
              6-Day MTB Adventure Through Rwanda
            </h2>
            <p className="text-xl pt-2 pb-6 text-gray-700 text-justify">
              Rwanda, known as the "Land of a Thousand Hills," offers a unique
              and thrilling destination for mountain biking enthusiasts...
            </p>
            <div
              onClick={() => navigate("/explore-more-to-Rwanda")}
              title="Explore Rwanda"
              className="mt-6 flex items-center justify-center bg-gray-600 text-white px-5 py-3 rounded-lg hover:bg-gray-700 w-[250px]"
            >
              Explore More
            </div>
          </div>
        </section>

        <section id="contactus">
          <div className="text-center py-6 bg-gray-100 rounded-lg shadow-md">
            <h1 className="text-3xl sm:text-xl font-extrabold text-black">
              Need Assistance? <span className="text-black-600">We’re Here!</span>
            </h1>
            <p className="text-lg mt-3 text-gray-700">
              Questions, feedback, or just saying hello? We’re only one click away.
            </p>
            <div className="mt-5">
              <button
                onClick={() => navigate("/contact")}
                className="bg-gray-500 bg-gradient-to-r from-gray-600 to-gray-400 text-white px-6 py-3 rounded-lg hover:scale-105 transition-transform shadow-lg"
              >
                <i className="fa-solid fa-envelope mr-2"></i> Contact Us
              </button>
            </div>
            <p className="mt-4 text-gray-600 text-sm italic">
              <i className="fa-solid fa-clock mr-2"></i> Monday to Friday, 9 AM - 6 PM
            </p>
          </div>
        </section>

        <section className="py-16 bg-white">
          <h2 className="text-center text-3xl font-semibold mb-8 text-gray-800">
            Share Your Experience
          </h2>
          <div className="max-w-5xl mx-auto bg-gray-100 p-6 rounded-xl shadow-lg">
            <ReviewForm
              newTestimonial={newTestimonial}
              setNewTestimonial={setNewTestimonial}
              handleSubmit={handleSubmit}
            />
          </div>
        </section>

        <ChevronButton />
        <WhatsAppChat />
      </div>
      <Footer />
    </>
  );
};

export default Home;
