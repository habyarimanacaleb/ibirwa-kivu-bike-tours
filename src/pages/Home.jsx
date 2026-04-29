import React, { useEffect, useState } from "react";
import homeBg from "../assets/css/Home.module.css";
import Services from "../components/Services";
import { Footer } from "../components/Footer";
import ChevronButton from "../components/ChevronButton";
import TourInquiryForm from "../components/TourInquiryForm";
import WhatsAppChat from "../components/WhatsAppChat";
import Navbar from "../components/Navbar";
import GoogleReviews from "../components/GoogleReviewWidget";
import Hero from "../components/Home/Hero";
// import About from "../components/Home/About";
import MountainBikingSection from "../components/Home/MountainBikingSection";
import Contact from "../components/Home/Contact";
import OurStory from "../features/home/OurStory";
import Review from "../features/home/Review";

export const Home = () => {
  const [loading, setLoading] = useState(false);
  return (
    <>
      <Navbar />
      {/*Main section*/}
      <main className="bg-gray-200">
        {/*Hero section*/}
        <section className="relative home-hello-section h-auto pb-6 text-white">
          <Hero loading={loading} setLoading={setLoading} />
        </section>
        <section id="inquiry" className="fade-in mb-6">
          <TourInquiryForm />
        </section>
        <section id="our-story" className="fade-in mb-6">
          <OurStory />
        </section>
        {/*Services section*/}
        <section id="service" className="py-24 bg-white overflow-hidden">
          <div className="max-w-[1440px] mx-auto px-6">
            {/* --- MODERN HEADER SECTION --- */}
            <div className="relative text-center mb-16">
              {/* Background Decorative Text (Optional - for that ultra-modern look) */}
              <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-10 text-[100px] md:text-[140px] font-black text-slate-50 select-none -z-10 uppercase tracking-widest opacity-50">
                Explore
              </span>

              {/* Pre-Header */}
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-10 h-[2px] bg-blue-600 rounded-full"></div>
                <span className="text-blue-600 font-bold uppercase tracking-[0.3em] text-[10px] md:text-xs">
                  World Class Adventures
                </span>
                <div className="w-10 h-[2px] bg-blue-600 rounded-full"></div>
              </div>

              {/* Main Title */}
              <h2 className="text-4xl md:text-6xl font-serif font-black text-slate-900 capitalize tracking-tight">
                Discover Our{" "}
                <span className="text-blue-600 italic">Signature</span> Tours
              </h2>

              {/* Description / Sub-header */}
              <p className="mt-6 text-slate-500 max-w-2xl mx-auto text-lg font-light leading-relaxed">
                From the mist-covered hills of the Congo Nile Trail to the
                peaceful waters of Lake Kivu, choose an experience crafted for
                the soul of an adventurer.
              </p>

              {/* Decorative Accent */}
              <div className="mt-8 flex justify-center">
                <div className="flex gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                  <div className="w-12 h-2 rounded-full bg-blue-600/20"></div>
                  <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                </div>
              </div>
            </div>

            {/* --- SERVICES COMPONENT --- */}
            <div className="fade-in">
              <Services />
            </div>
          </div>
        </section>

        {/*Mountyain bikings  section*/}
        <section className="fade-in mb-6">
          <MountainBikingSection />
        </section>

        {/*Contact section*/}
        <section id="tour-information" className="fade-in mb-6">
          <Contact />
        </section>

        {/*Review From GoogleMap section sectio*/}
        <section className="fade-in mb-6">
          <Review />
        </section>
        <ChevronButton />
        <WhatsAppChat />
      </main>
      <Footer />
    </>
  );
};

export default Home;
