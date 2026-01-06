import React from "react";
import homeBg from "../assets/css/Home.module.css";
import Services from "../components/Services";
import { Footer } from "../components/Footer";
import ChevronButton from "../components/ChevronButton";
import TourInquiryForm from "../components/TourInquiryForm";
import WhatsAppChat from "../components/WhatsAppChat";
import Navbar from "../components/Navbar";
import GoogleReviews from "../components/GoogleReviewWidget";
import Hero from "../components/Home/Hero";
import About from "../components/Home/About";
import MountainBikingSection from "../components/Home/MountainBikingSection";
import Contact from "../components/Home/Contact";
import SectionReveal from "../components/common/SectionReveal";

export const Home = () => {
  return (
    <>
      <Navbar />
      <main className="bg-gray-200 pt-2">
        {/* HERO (no animation — LCP safe) */}
        <section className="relative py-6">
          <Hero />
          <div className="flex justify-center bg-gray-200 bg-opacity-70">
            <TourInquiryForm />
          </div>
        </section>

        {/* SERVICES */}
        <SectionReveal>
          <section className="mb-6" id="service">
            <h1 className="text-center text-5xl my-10 font-bold">Our Tours</h1>
            <Services />
          </section>
        </SectionReveal>

        {/* ABOUT */}
        <SectionReveal delay={0.1}>
          <About homeBg={homeBg} />
        </SectionReveal>

        {/* MOUNTAIN BIKING */}
        <SectionReveal delay={0.15}>
          <MountainBikingSection />
        </SectionReveal>

        {/* CONTACT */}
        <SectionReveal delay={0.2}>
          <Contact />
        </SectionReveal>

        {/* GOOGLE REVIEWS */}
        <SectionReveal>
          <section className="flex flex-col items-center">
            <h1 className="text-5xl font-bold mt-6 mb-3 text-center">
              Our Google Reviews
            </h1>
            <GoogleReviews />
          </section>
        </SectionReveal>

        <ChevronButton />
        <WhatsAppChat />
      </main>

      <Footer />
    </>
  );
};

export default Home;
