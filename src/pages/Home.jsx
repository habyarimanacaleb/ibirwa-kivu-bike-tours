import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import homeBg from "../assets/css/Home.module.css";
import Services from "../components/Services";
import { Footer } from "../components/Footer";
import ChevronButton from "../components/ChevronButton";
import TourInquiryForm from "../components/TourInquiryForm";
// import WhatsAppChat from "../components/WhatsAppChat";
import Navbar from "../components/Navbar";
import ReviewForm from "../components/ReviewForm";

export const Home = () => {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [newTestimonial, setNewTestimonial] = useState({ name: "", text: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTestimonial.name && newTestimonial.text) {
      alert("Thank you for your review!");
      setNewTestimonial({ name: "", text: "" });
    }
  };

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(
          "https://kivu-back-end.onrender.com/api/services/images"
        );
        setServices(response.data.data || []);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  useEffect(() => {
    if (services.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % services.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [services.length]);

  return (
    <>
      <Navbar />
      <div className="bg-gray-200 pt-2">
        <section className="relative home-hello-section lg:h-screen h-auto py-6 text-white">
          <div className="services-images relative h-80 w-full overflow-hidden">
            {loading ? (
              <div className={`text-center text-white pt-12 ${homeBg.skeletonLoader}`}>
                Loading...
              </div>
            ) : error ? (
              <div className="text-center text-red-500">Error: {error.message}</div>
            ) : (
              services.map((imageUrl, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-1000 ${
                    index === currentIndex ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <img
                    src={imageUrl}
                    alt={`Service ${index + 1}`}
                    className="w-full min-w-full h-full object-cover"
                  />
                </div>
              ))
            )}
          </div>

          <div className="flex flex-col justify-center text-center bg-gray bg-opacity-70 z-10">
            <TourInquiryForm />
          </div>
        </section>

        <section
          className={`about fade-in mx-auto flex flex-col items-center mt-[-12px] justify-center ${homeBg.aboutBg} p-6 lg:h-screen h-auto`}
        >
          <div className="about-content py-6">
            <h1 className="headings mb-12 text-4xl text-center text-bold-600">
              About Us
            </h1>
            <div className="about-content px-3 max-w-[900px]">
              <p className="lg:text-3xl sm:text-sm md:text-xl pb-2">
                Welcome to IBIRWA KIVU BIKE TOURS, your premier travel partner
                for exploring the beauty, culture, and adventure of Rwanda. We
                specialize in offering unforgettable experiences tailored to
                your interests, whether you’re seeking serenity in nature,
                historical insights, or thrilling adventures. Our goal is to
                ensure your journey through Rwanda is exceptional and filled
                with memories that will last a lifetime.
              </p>
            </div>
          </div>
          <button
            onClick={() => navigate("/about")}
            className="btn my-2 w-[150px] bg-blue-500 cursor-pointer text-white px-3 py-2 rounded-md hover:bg-blue-600"
          >
            Lead More
          </button>
        </section>

        <section className="service fade-in" id="service">
          <h1 className="headings text-bold-600 text-center text-5xl my-10">
            Our Services/Tours
          </h1>
          <Services />
        </section>

        <section id="mtb-tours" className="py-10 bg-gray-100">
          <div className="mx-auto px-6 flex flex-col justify-center items-center">
            <h2 className="text-2xl font-bold text-black-800 text-center mb-8">
              6-Day MTB Adventure Through the Land of a Thousand Hills
            </h2>
            <p className="text-xl pt-2 pb-6 text-gray-700 text-justify">
              Rwanda, known as the "Land of a Thousand Hills," offers a unique
              and thrilling destination for mountain biking enthusiasts. With
              its breathtaking landscapes, diverse ecosystems, and challenging
              terrains, this small East African country is an undiscovered gem
              for those seeking an adventurous cycling experience. From the
              bustling streets of Kigali to the volcanic peaks of Musanze and
              the tranquil shores of Lake Kivu, Rwanda’s diverse beauty provides
              the perfect backdrop for a mountain biking tour.
            </p>
            <div
              onClick={() => navigate("/explore-more-to-Rwanda")}
              title="Explore Rwanda"
              className="mt-6 flex items-center justify-center bg-gray-600 text-white px-5 py-3 rounded-lg hover:bg-gray-700 w-[250px]"
            >
              Explore More to Rwanda
            </div>
          </div>
        </section>

        <section id="contactus">
          <div
            className="contact-us-by-this-button text-center py-6 bg-gray-100 rounded-lg shadow-md"
            role="article"
            aria-label="Contact Us Section"
          >
            <h1 className="text-3xl sm:text-xl font-extrabold capitalize text-black-800">
              Need Assistance?
              <span className="text-black-600">We’re Here to Help!</span>
            </h1>
            <p className="text-lg mt-3 text-gray-700">
              Whether it’s a question, feedback, or just saying hello, we’re
              only one click away. Connect with our friendly support team for
              personalized assistance!
            </p>
            <div className="user-action sm:flex sm:justify-center sm:items-center mt-5">
              <button
                onClick={() => navigate("/contact")}
                className="bg-gray-500 contact-us-btn bg-gradient-to-r from-gray-600 to-gray-400 text-white px-6 py-3 mt-5 mx-3 rounded-lg hover:scale-105 hover:from-gray-700 hover:to-gray-500 transition-transform shadow-lg"
                aria-label="Click to connect with our support team"
                title="Reach Out to Us"
              >
                <i className="fa-solid fa-envelope mr-2"></i> Start Chat with
                Our Team
              </button>
            </div>
            <p className="mt-4 text-gray-600 text-sm italic">
              <i className="fa-solid fa-clock mr-2"></i> Our team is available
              Monday to Friday, 9 AM to 6 PM.
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
        {/* <WhatsAppChat /> */}
      </div>
      <Footer />
    </>
  );
};

export default Home;
