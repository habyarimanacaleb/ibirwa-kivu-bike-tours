import React from "react";
import { useNavigate } from "react-router-dom";
import homeBg from "../assets/css/Home.module.css";
import cardsData from "../assets/Servicesdata";
import { ServiceCard } from "../components/ServiceCard";
import ChevronButton from "../components/ChevronButton";

export const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-gray-100 mb-4">
      <section
        id="home"
        className={`welcome-page ${homeBg.bgImage} min-h-[100vh] flex flex-col pt-16`}
      >
        <div className="hello flex flex-col items-center justify-center">
          <h1 className="lg:text-[90px] text-[36px] sm:text-[50px] text-bold py-2 capitalize text-center">
            IBIRWA KIVU BIKE TOURS
          </h1>
          <h4 className="text-bold-600 lg:text-[45px] text-[25px]  text-center">
            Rental and Tour Services in Rwanda
          </h4>
          <p className="home-bind py-1 lg:text-[20px] text-[12px] text-center">
            <span className="text-gray-700 italic">Kigali</span>
            <span className=" px-1 text-gray-500 text-md">|</span>
            <span className="text-gray-700 italic">Lake Kivu</span>
            <span className=" px-1 text-gray-500 text-md">|</span>
            <span className="text-gray-700 italic">Gisenyi</span>
            <span className=" px-1 text-gray-500 text-md">|</span>
            <span className="text-gray-700 italic">Kibuye</span>
            <span className=" px-1 text-gray-500 text-md">|</span>
            <span className="text-gray-700 italic">Gitesi</span>
            <span className=" px-1 text-gray-500 text-md">|</span>
            <span className="text-gray-700 italic">Nyakariba Swamp</span>
            <span className=" px-1 text-gray-500 text-md">|</span>
            <span className="text-gray-700 italic">Nkombo Culture</span>
          </p>
        </div>
        <div className="my-quote text-3xl mt-68 italic font-serif font-bold pb-10">
          <p className="text-center text-bold capitalize">
            We Travel in Comfort
          </p>
        </div>
      </section>
      <section
        className={`about fade-in mx-auto flex flex-col items-center justify-center ${homeBg.aboutBg} p-6 min-h-[100vh]`}
      >
        <div className="about-content py-3">
          <h1 className="headings mb-12 text-4xl text-center text-bold-600">
            About Us
          </h1>
          <div className="about-content px-3 max-w-[900px]">
            <p className="lg:text-3xl sm:text-sm md:text-xl pb-2">
              Welcome to IBIRWA KIVU BIKE TOURS, your premier travel partner for
              exploring the beauty, culture, and adventure of Rwanda. We
              specialize in offering unforgettable experiences tailored to your
              interests, whether you’re seeking serenity in nature, historical
              insights, or thrilling adventures. Our goal is to ensure your
              journey through Rwanda is exceptional and filled with memories
              that will last a lifetime.
            </p>
          </div>
        </div>
        <button
          onClick={() => navigate("/about")}
          className="btn mt-2 w-[150px] bg-blue-500 cursor-pointer text-white px-3 py-2 rounded-md hover:bg-blue-600"
        >
          Lead More
        </button>
      </section>
      <section className="service fade-in" id="service">
        <h1 className="headings text-bold-600 text-center text-5xl my-10">
          Our Services/Tours
        </h1>
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6"
          id="servicesGrid"
        >
          {cardsData.map((service) => (
            <ServiceCard
              key={service.id}
              id={service.id}
              image={service.image}
              title={service.title}
              description={service.description}
            />
          ))}
        </div>
      </section>
      <section id="mtb-tours" className="py-10 bg-gray-100">
        <div className="mx-auto px-6 flex flex-col justify-center items-center">
          <h2 className="text-3xl font-bold text-blue-600 text-center mb-8">
            Explore Rwanda: 6-Day MTB Adventure Through the Land of a Thousand
            Hills
          </h2>
          <p className="text-xl pt-2 pb-6 text-gray-700 text-justify">
            Rwanda, known as the "Land of a Thousand Hills," offers a unique and
            thrilling destination for mountain biking enthusiasts. With its
            breathtaking landscapes, diverse ecosystems, and challenging
            terrains, this small East African country is an undiscovered gem for
            those seeking an adventurous cycling experience. From the bustling
            streets of Kigali to the volcanic peaks of Musanze and the tranquil
            shores of Lake Kivu, Rwanda’s diverse beauty provides the perfect
            backdrop for a mountain biking tour.
          </p>
          <div
            onClick={() => navigate("/explore-more-to-Rwanda")}
            title="Explore Rwanda"
            className="mt-6 flex items-center justify-center bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700 w-[250px]"
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
          <h1 className="text-3xl sm:text-xl font-extrabold capitalize text-blue-800">
            Need Assistance?
            <span className="text-blue-600">We’re Here to Help!</span>
          </h1>
          <p className="text-lg mt-3 text-gray-700">
            Whether it’s a question, feedback, or just saying hello, we’re only
            one click away. Connect with our friendly support team for
            personalized assistance!
          </p>
          <div className="user-action sm:flex sm:justify-center sm:items-center mt-5">
            <button
              onClick={() => navigate("/join")}
              className=" bg-blue-500 contact-us-btn bg-gradient-to-r from-blue-600 to-blue-400 text-white px-6 py-3 mt-5 mx-3 rounded-lg hover:scale-105 hover:from-blue-700 hover:to-blue-500 transition-transform shadow-lg"
              aria-label="Click to connect with our support team"
              title="Stay with us"
            >
              <i className="fa-solid fa-right-to-bracket"></i> Signup/Login to
              Book
            </button>
            <button
              onClick={() => navigate("/contact")}
              className="bg-blue-500 contact-us-btn bg-gradient-to-r from-blue-600 to-blue-400 text-white px-6 py-3 mt-5 mx-3 rounded-lg hover:scale-105 hover:from-blue-700 hover:to-blue-500 transition-transform shadow-lg"
              aria-label="Click to connect with our support team"
              title="Reach Out to Us"
            >
              <i className="fa-solid fa-envelope mr-2"></i> Start Chat with Our
              Team
            </button>
          </div>
          <p className="mt-4 text-gray-600 text-sm italic">
            <i className="fa-solid fa-clock mr-2"></i> Our team is available
            Monday to Friday, 9 AM to 6 PM.
          </p>
        </div>
      </section>
      <section className="map w-[100%] min-h-[60vh]">
        <div id="google-map-container">
          <iframe
            title="explore Ibirwa African Tours"
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d498.40452490265733!2d29.351690226419816!3d-2.0614499745769814!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19dd299a5c0f8e8b%3A0x5ff6d8482fdee395!2sIBIRWA%20AFRICAN%20LAKE%20TOURS!5e0!3m2!1sen!2sru!4v1734709878109!5m2!1sen!2sru"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            autoSave={true}
            className="map-link w-[100%] h-[100vh]"
          ></iframe>
        </div>
      </section>
      <ChevronButton />
    </div>
  );
};
