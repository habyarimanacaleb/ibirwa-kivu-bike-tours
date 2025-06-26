import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaEnvelopeOpen,
  FaPhone,
  FaMapMarkerAlt,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaChevronUp,
} from "react-icons/fa";

export const Footer = () => {
  const navigate = useNavigate();
  return (
    <footer className="bg-black text-white py-10 relative">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
          <div className="footer-left">
            <h3 className="text-2xl font-bold mb-3">Kivu safari & tours</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Explore the best of Lake Kivu's natural beauty and cultural
              richness. From scenic tours to unique adventures, we bring you
              unforgettable experiences in Rwanda.
            </p>
            <span
              onClick={() => {
                navigate("/contact");
              }}
              className="inline-block mt-4 text-blue-900 hover:text-blue-200 cursor-pointer"
            >
              Contact Us
            </span>
          </div>
          <div className="footer-right block lg:flex items-start justify-between">
            
            <div className="footer-contact-get-in-touch mt-8 lg:mt-0">
              <h3 className="text-xl font-semibold mb-3">Get in Touch</h3>
              <ul className="text-gray-300 space-y-2 text-sm">
                <li>
                  <FaEnvelopeOpen className="mr-2" />
                  ibirwakivubiketours@gmail.com
                </li>
                <li>
                  <FaPhone className="mr-2" /> +250784606393
                </li>
                <li>
                  <FaMapMarkerAlt className="mr-2" /> Kibuye, Rwanda
                </li>
                <li>
                  <a
                    href="https://www.google.com/maps?q=Kibuye,+Rwanda"
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    View on Google Maps
                  </a>
                </li>
              </ul>
            </div>
            <div className="mt-8 flex space-x-4">
              <a href="https://facebook.com" className="hover:text-blue-200">
                <FaFacebook className="text-xl" />
              </a>
              <a href="https://twitter.com" className="hover:text-blue-200">
                <FaTwitter className="text-xl" />
              </a>
              <a href="https://instagram.com" className="hover:text-blue-200">
                <FaInstagram className="text-xl" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-2 lg:mt-8 text-center border-t border-blue-600 pt-4 text-sm text-gray-400">
          &copy; {new Date().getFullYear()} Ibirwa Kivu Bike. All rights
          reserved.
        </div>
      </div>
      <button
        id="scrollToTop"
        className="fixed bottom-10 right-6 hidden bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-500 transition"
      >
        <FaChevronUp />
      </button>
    </footer>
  );
};
