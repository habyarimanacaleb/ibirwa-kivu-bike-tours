import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const ServicesList = ({ services, setServices }) => {
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `https://v2.ibirwakivubiketours.com/api/services/${id}`
      );
      setServices(services.filter((service) => service._id !== id));
    } catch (error) {
      console.error("Error deleting service:", error);
    }
  };

  const handleUpdate = (id) => {
    navigate(`/update-service/${id}`);
  };

  return (
    <>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {services.map((service) => (
        <div
          key={service._id}
          className="bg-white p-4 rounded-lg shadow-lg w-full min-h-[420px] h-full flex flex-col overflow-hidden"
        >
          {service.imageFile && (
            <div className="w-full max-h-[40vh] bg-white flex justify-center items-center rounded-lg overflow-hidden">
              <img
                src={service.imageFile}
                alt={service.title}
                className="w-full h-auto object-contain"
              />
            </div>
          )}
          <div className="p-4 flex-grow flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-bold">{service.title}</h2>
              <p className="text-sm text-gray-500">{service.description}</p>
            </div>
            <div className="flex justify-around pt-4">
              <Link
                to={`/service/${service._id}`}
                className="text-blue-500 border-2 border-blue-500 hover:bg-blue-500 hover:text-white rounded-md py-2 px-3"
              >
                Learn more
              </Link>
              <button
                onClick={() => handleUpdate(service._id)}
                className="text-yellow-500 border-2 border-yellow-500 hover:bg-yellow-500 hover:text-white rounded-md py-2 px-3"
              >
                Update
              </button>
              <button
                onClick={() => handleDelete(service._id)}
                className="text-red-500 border-2 border-red-500 hover:bg-red-500 hover:text-white rounded-md py-2 px-3"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  
    </>
  );
};

export default ServicesList;
