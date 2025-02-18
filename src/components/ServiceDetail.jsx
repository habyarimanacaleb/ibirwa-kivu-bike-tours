import React from "react";
import { useParams } from "react-router-dom";
import servicesData from "../assets/Servicesdata";
import { Navbar } from "../components/Navbar";
import { FaWhatsapp, FaEnvelope, FaChevronDown } from "react-icons/fa";

const ServiceDetail = () => {
  const { id } = useParams();
  const service = servicesData.find((service) => service.id === parseInt(id));

  if (!service) {
    return <div>Service not found</div>;
  }
  return (
    <div className="service-detail">
      <Navbar />
      <section className="content py-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="initial-content mt-4">
          {" "}
          <h1 className="heading lg:text-5xl text-2xl font-bold text-center mx-auto text-blue-800 mb-2">
            {" "}
            {service.title}
          </h1>
          <p className="text-xl md:text-xl text-gray-700 mt-2 text-center">
            {" "}
            {service.description}
          </p>
        </div>
        <div className="main-content mt-10 flex flex-col lg:flex-row">
          <div className="main-content-left lg:w-2/3 p-6">
            <h2 className="heading text-2xl font-bold text-center text-blue-800 mb-6">
              Services Description
            </h2>
            <p className="text-lg text-gray-700 mb-6">{service.description}</p>
            <div className="additional">
              <h3 className="text-2xl font-semibold text-blue-800 mb-4">
                Highlights
              </h3>
              <ul className="list-disc list-inside text-lg text-gray-700 mb-6">
                {service.details.highlights.map((highlight, index) => (
                  <li key={index}>{highlight}</li>
                ))}
              </ul>
              <h3 className="text-2xl font-semibold text-blue-800 mb-4">
                Additional Tips
              </h3>
              <ul className="list-disc list-inside text-lg text-gray-700 mb-6">
                {service.details.tips.map((tip, index) => (
                  <li key={index}>{tip}</li>
                ))}
              </ul>
            </div>
            <div className="bookings bg-gray-100 p-6 rounded-lg shadow-md mt-6">
              <h2 className="text-xl font-semibold mb-4 text-blue-800">
                Bookings and More Information
              </h2>
              <h4 className="text-xl font-semibold mb-6 flex items-center text-gray-700">
                Contact Us Via
                <FaChevronDown className="text-2xl ml-2" />
              </h4>
              <div className="call-actions flex gap-4" id="contact-via">
                <a
                  href={service.details.contact.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 text-lg font-medium text-green-600 hover:underline"
                  style={{ textDecoration: "none", marginRight: "20px" }}
                >
                  <FaWhatsapp className="text-2xl" />
                  Whatsapp
                </a>
                <a
                  href={`${service.details.contact.email}`}
                  className="flex items-center gap-3 text-lg font-medium text-blue-600  over:underline"
                  style={{ textDecoration: "none", marginRight: "20px" }}
                >
                  <FaEnvelope className="text-2xl" />
                  Email
                </a>
              </div>
            </div>
          </div>
          <div className="image-slider  w-full lg:w-1/3 max-w-lg mx-auto overflow-hidden mt-10 lg:mt-0">
            <div className=" flex transition-transform duration-500">
              <img
                src={`../${service.image}`}
                alt={service.title}
                className="w-full sm:w-auto rounded-md h-[400px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServiceDetail;
