import React from "react";
import homeBg from "../assets/css/Home.module.css";
import Services from "../components/Services";
import { Footer } from "../components/Footer";
import ChevronButton from "../components/ChevronButton";
import TourInquiryForm from "../components/TourInquiryForm";
import WhatsAppChat from "../components/WhatsAppChat";
import Navbar from "../components/Navbar";
import { helloImagesData as localImages } from "../assets/Servicesdata";
import Button from "../components/common/Button";
import GoogleReviews from "../components/GoogleReviewWidget";
import Hero from "../components/Home/Hero";
import About from "../components/Home/About";
import MountainBikingSection from "../components/Home/MountainBikingSection";
import Contact from "../components/Home/Contact";

export const Home = () => {
  return (
    <>
      <Navbar />

       {/*Main section*/}
      <main className="bg-gray-200 pt-2">
        {/*Hero section*/}
        <section className="relative home-hello-section lg:h-screen h-auto py-6 text-white">
         <Hero localImages={localImages}/>
          <div className="flex flex-col justify-center text-center bg-gray-200 bg-opacity-70 z-10">
            <TourInquiryForm />
          </div>
        </section>

         {/*About section*/}
        <About  homeBg={homeBg}/>

         {/*Services sectio*/}
        <section className="service fade-in" id="service">
          <h1 className="headings text-center text-5xl my-10 font-bold">
            Our Services/Tours
          </h1>
          <Services />
        </section>


        
         {/*Mountyain bikings  sectio*/}
         <MountainBikingSection />

         {/*Contact section*/}
         <Contact />

          {/*Review From GoogleMap section sectio*/}
        <section className="flex flex-col items-center">
          <h1 className="text-5xl font-bold mt-6 mb-3 text-center">
            Our Google Reviews
          </h1>
          <GoogleReviews />
        </section>
        <ChevronButton />
        <WhatsAppChat />
      </main>
      <Footer />
    </>
  );
};

export default Home;
