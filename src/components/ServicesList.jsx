import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
const ServicesList = ({ services, setServices }) => {
  const navigate = useNavigate();
  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `https://kivu-back-end.onrender.com/api/services/${id}`
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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {services.map((service) => (
        <div key={service._id} className="bg-white p-4 rounded-lg shadow-lg">
          {service.imageFile && (
            <img
              src={service.imageFile}
              alt={service.title}
              className="w-full h-48 object-cover rounded-lg"
            />
          )}
          <h2 className="text-xl font-bold mt-4">{service.title}</h2>
          <p className="text-sm text-gray-500">{service.description}</p>
          <div className="flex justify-between mt-4">
            <Link
              to={`/service/${service._id}`}
              className="text-blue-500 inline-block"
            >
              Learn more
            </Link>
            <button
              onClick={() => handleUpdate(service._id)}
              className="text-yellow-500 inline-block"
            >
              Update
            </button>
            <button
              onClick={() => handleDelete(service._id)}
              className="text-red-500 inline-block"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
export default ServicesList;
