import React from 'react'
import { Link } from 'react-router-dom'

const ServiceCard = ({service}) => {
  return (
<div
                key={service._id}
                className="bg-white p-4 rounded-lg shadow-lg w-full h-full flex flex-col overflow-hidden 
                         transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl"
              >
                {service.imageFile && (
                  <div className="w-full max-h-[40vh] flex justify-center items-center rounded-lg overflow-hidden">
                    <img
                      src={service.imageFile}
                      alt={service.title}
                      loading="lazy"
                      className="w-full h-auto object-contain transition-transform duration-300 ease-in-out hover:scale-110"
                    />
                  </div>
                )}
                <h2 className="text-xl font-bold mt-4 hover:text-blue-600 transition">
                  {service.title}
                </h2>
                <p className="text-sm text-gray-500 mt-2">
                  {service.description.slice(0, 200)}...
                </p>
                <Link
                  to={`/service/${service._id}`}
                  className="text-blue-500 mt-3 hover:underline hover:text-blue-700 transition"
                >
                  Learn more
                </Link>
              </div>  )
}

export default ServiceCard