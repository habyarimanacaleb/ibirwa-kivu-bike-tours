import React from "react";
import Button from "../common/Button";

function About({homeBg}) {
  return (
    <section
      className={`about fade-in mx-auto flex flex-col items-center mt-[-12px] justify-center ${homeBg.aboutBg} p-6 lg:h-screen h-auto`}
    >
      <article className="about-content py-6">
        <h1 className="headings mb-12 text-5xl text-center font-bold">
          About Us
        </h1>
        <div className="about-content px-3 max-w-[900px]">
          <p className="lg:text-3xl sm:text-sm md:text-xl pb-2">
            Welcome to IBIRWA KIVU BIKE TOURS, your premier travel partner for
            exploring the beauty, culture, and adventure of Rwanda...
          </p>
        </div>
      </article>

      <div className="mt-5">
        <Button label="Learn More" to="/about" />
      </div>
    </section>
  );
}

export default About;
