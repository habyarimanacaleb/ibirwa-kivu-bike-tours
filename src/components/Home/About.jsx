import React from "react";
import { WhyChooseUs, OurValue} from "../../constants";
import { motion } from "framer-motion";

/* Animation Variants */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const staggerGrid = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};


const AboutUs = ({ homeBg }) => {
  const bgClass = homeBg ? homeBg["home-about-section"] : "";

  return (
    <div className="bg-white">
      {/* HERO */}
      <section
        className={`relative bg-gradient-to-r from-blue-700 to-indigo-700 text-white py-24 ${bgClass}`}
      >
        <motion.div
          className="max-w-6xl mx-auto px-6 text-center"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Us</h1>
          <p className="text-lg md:text-xl text-blue-100 max-w-3xl mx-auto">
            We create authentic experiences that connect people with nature,
            culture, and unforgettable memories around Lake Kivu and Rwanda.
          </p>
        </motion.div>
      </section>

      {/* MISSION & VISION */}
      <section className="py-20 bg-gray-50">
        <motion.div
          className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerGrid}
        >
          {["Mission", "Vision"].map((title, i) => (
            <motion.div key={i} variants={fadeUp}>
              <h2 className="text-3xl font-bold mb-4 text-gray-800">
                Our {title}
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {title === "Mission"
                  ? "Deliver meaningful, safe, and eco-friendly tourism experiences that empower local communities while offering unforgettable adventures across Rwanda."
                  : "Become a leading community-based tourism brand in Rwanda, inspiring responsible travel and showcasing the beauty of Lake Kivu to the world."}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <motion.h2
            className="text-3xl font-bold text-center mb-12 text-gray-800"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            Why Choose Us
          </motion.h2>

          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-3"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerGrid}
          >
            {WhyChooseUs.map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                whileHover={{ y: -6 }}
                className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
              >
                <h3 className="font-semibold text-lg mb-2 text-blue-600">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* OUR VALUES */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <motion.h2
            className="text-3xl font-bold text-center mb-12 text-gray-800"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            Our Values
          </motion.h2>

          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-3"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerGrid}
          >
            {OurValue.map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                whileHover={{ scale: 1.05 }}
                className="p-6 bg-white rounded-xl shadow hover:shadow-md transition"
              >
                <h3 className="font-semibold text-xl mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-700 text-white py-16 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold mb-4">
            Ready to Explore Lake Kivu?
          </h2>
          <p className="text-blue-100 mb-6">
            Let us plan your next unforgettable adventure.
          </p>
          <a
            href="/services"
            className="inline-block bg-white text-blue-700 px-8 py-3 rounded-full font-semibold hover:bg-blue-100 transition"
          >
            View Our Services
          </a>
        </motion.div>
      </section>
    </div>
  );
};

export default AboutUs;


