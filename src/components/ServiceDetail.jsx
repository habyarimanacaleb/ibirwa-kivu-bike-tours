import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import {
  FaWhatsapp,
  FaEnvelope,
  FaCheckCircle,
  FaLightbulb,
} from "react-icons/fa";
import Navbar from "./Navbar";
import { Footer } from "./Footer";
import WhatsAppChat from "./WhatsapMeInService";

export const ServiceDetail = () => {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const res = await axios.get(
          `https://kivu-back-end.onrender.com/api/services/${id}`
        );
        setService(res.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchService();
  }, [id]);

  if (loading) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-800 to-indigo-900 text-white">
        <p className="text-3xl font-bold">Loading...</p>
        <p className="text-blue-200 mt-2">Preparing your experience</p>
      </div>
    );
  }

  if (error || !service) {
    return (
      <div className="h-screen flex items-center justify-center text-red-600">
        Failed to load service details.
      </div>
    );
  }

  return (
    <>
      <Navbar />

      {/* HERO */}
      <section className="relative h-[100vh]  py-20 flex items-center justify-center ">
        <img
          src={service.imageFile}
          alt={service.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />

        <div className="relative z-10 max-w-8xl mx-auto px-6 h-full flex flex-col justify-center items-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            {service.title}
          </h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-5xl">
            {service.description}
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-3 gap-10">

          {/* LEFT CONTENT */}
          <div className="lg:col-span-2 space-y-10">

            {/* HIGHLIGHTS */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-blue-800 mb-6">
                Experience Highlights
              </h2>
              <ul className="space-y-4">
                {service.details.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <FaCheckCircle className="text-green-500 mt-1" />
                    <span className="text-gray-700">{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* TIPS */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-blue-800 mb-6">
                Helpful Tips
              </h2>
              <ul className="space-y-4">
                {service.details.tips.map((tip, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <FaLightbulb className="text-yellow-500 mt-1" />
                    <span className="text-gray-700">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* RIGHT CTA */}
          <div className="sticky top-24 h-fit bg-white rounded-2xl shadow-xl p-8">
            <h3 className="text-xl font-bold text-blue-800 mb-4">
              Book or Ask More
            </h3>
            <p className="text-gray-600 mb-6">
              Reach us instantly to customize your experience.
            </p>

            <div className="space-y-4">
              <a
                href={`https://wa.me/${service.details.whatsapp}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-3 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
              >
                <FaWhatsapp className="text-xl" />
                WhatsApp Us
              </a>

              <a
                href={`mailto:${service.details.email}`}
                className="flex items-center justify-center gap-3 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                <FaEnvelope className="text-xl" />
                Send Email
              </a>
            </div>

            <Link
              to="/gallery"
              className="block text-center mt-6 text-blue-600 font-medium hover:underline"
            >
              View Gallery →
            </Link>
          </div>
        </div>
      </section>

      {/* FLOATING WHATSAPP */}
      <WhatsAppChat introMessage={service.title} />

      <Footer />
    </>
  );
};
