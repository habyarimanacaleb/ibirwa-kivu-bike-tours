import React from "react";
import { WhyChooseUs, OurValue, OurTeam } from "../../constants";

const AboutUs = ({ homeBg }) => {
  const bgClass = homeBg ? homeBg["home-about-section"] : "";

  return (
    <div className="bg-white">
      {/* HERO */}
      <section
        className={`relative bg-gradient-to-r from-blue-700 to-indigo-700 text-white py-24 ${bgClass}`}
      >
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Us</h1>
          <p className="text-lg md:text-xl text-blue-100 max-w-3xl mx-auto">
            We create authentic experiences that connect people with nature,
            culture, and unforgettable memories around Lake Kivu and Rwanda.
          </p>
        </div>
      </section>

      {/* MISSION & VISION */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold mb-4 text-gray-800">Our Mission</h2>
            <p className="text-gray-600 leading-relaxed">
              Deliver meaningful, safe, and eco-friendly tourism experiences that empower local communities while offering unforgettable adventures across Rwanda.
            </p>
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-4 text-gray-800">Our Vision</h2>
            <p className="text-gray-600 leading-relaxed">
              Become a leading community-based tourism brand in Rwanda, inspiring responsible travel and showcasing the beauty of Lake Kivu to the world.
            </p>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Why Choose Us</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {WhyChooseUs.map((item, i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
              >
                <h3 className="font-semibold text-lg mb-2 text-blue-600">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OUR VALUES */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Our Values</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {OurValue.map((item, i) => (
              <div key={i} className="p-6 bg-white rounded-xl shadow hover:shadow-md transition">
                <h3 className="font-semibold text-xl mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM */}
      {/* <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Meet Our Team</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {OurTeam.map((member, i) => (
              <div key={i} className="bg-white rounded-xl shadow overflow-hidden hover:shadow-lg transition">
                <div className="h-44 bg-gray-200 overflow-hidden">
                  <img
                    src={member.image || "/placeholder.png"}
                    alt={member.name || "Team member"}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-semibold text-lg">{member.name}</h3>
                  <p className="text-sm text-gray-500">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* CTA */}
      <section className="bg-blue-700 text-white py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Explore Lake Kivu?</h2>
        <p className="text-blue-100 mb-6">Let us plan your next unforgettable adventure.</p>
        <a
          href="/services"
          className="inline-block bg-white text-blue-700 px-8 py-3 rounded-full font-semibold hover:bg-blue-100 transition"
        >
          View Our Services
        </a>
      </section>
    </div>
  );
};

export default AboutUs;
