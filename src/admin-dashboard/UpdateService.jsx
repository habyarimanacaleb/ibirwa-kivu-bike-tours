import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import MainLayout from "../admin-panel/MainLayout";

const UpdateService = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    detailPage: "",
    details: {
      highlights: [],
      tips: [],
      contact: {
        whatsapp: "",
        email: "",
      },
    },
    imageFile: null,
  });
  const [responseMessage, setResponseMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchService = async () => {
      try {
        const response = await axios.get(
          `https://kivu-back-end.onrender.com/api/services/${id}`
        );
        const data = response.data;
        setFormData({
          title: data.title,
          description: data.description,
          detailPage: data.detailPage,
          details: data.details,
          imageFile: null,
        });
      } catch (error) {
        console.error("Error fetching service:", error);
      }
    };
    fetchService();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDetailsChange = (e) => {
    const { name, value } = e.target;
    const [section, key] = name.split(".");
    setFormData({
      ...formData,
      details: {
        ...formData.details,
        [section]: {
          ...formData.details[section],
          [key]: value,
        },
      },
    });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, imageFile: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("detailPage", formData.detailPage);
    data.append(
      "details",
      JSON.stringify({
        highlights: formData.details.highlights,
        tips: formData.details.tips,
        email: formData.details.email,
        whatsapp: formData.details.whatsapp,
      })
    );
    if (formData.imageFile) {
      data.append("imageFile", formData.imageFile);
    }

    try {
      const response = await axios.put(
        `https://kivu-back-end.onrender.com/api/services/${id}`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setResponseMessage("Service updated successfully!");
      setTimeout(() => {
        navigate("/admin-panel");
      }, 2000);
    } catch (error) {
      console.error("Error updating service:", error);
      setResponseMessage(
        "Error: " + (error.response?.data?.message || "Failed to update data")
      );
    }
  };

  return (
    <MainLayout>
    <div className="bg-gray-100 p-6">
      <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Update Service</h1>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700 font-bold">
              Title:
            </label>
            <input
              type="text"
              name="title"
              id="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-gray-700 font-bold"
            >
              Description:
            </label>
            <textarea
              name="description"
              id="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="detailPage"
              className="block text-gray-700 font-bold"
            >
              Detail Page URL:
            </label>
            <input
              type="text"
              name="detailPage"
              id="detailPage"
              value={formData.detailPage}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="highlights"
              className="block text-gray-700 font-bold"
            >
              Highlights:
            </label>
            <input
              type="text"
              name="details.highlights"
              value={formData.details.highlights.join(", ")}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  details: {
                    ...formData.details,
                    highlights: e.target.value.split(", "),
                  },
                })
              }
              className="w-full border border-gray-300 p-2 rounded mb-2"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="tips" className="block text-gray-700 font-bold">
              Tips:
            </label>
            <input
              type="text"
              name="details.tips"
              value={formData.details.tips.join(", ")}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  details: {
                    ...formData.details,
                    tips: e.target.value.split(", "),
                  },
                })
              }
              className="w-full border border-gray-300 p-2 rounded mb-2"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="details.contact.whatsapp"
              className="block text-gray-700 font-bold"
            >
              Whatsapp:
            </label>
            <input
              type="text"
              name="details.contact.whatsapp"
              value={formData.details.whatsapp}
              onChange={handleDetailsChange}
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="details.contact.email"
              className="block text-gray-700 font-bold"
            >
              Email:
            </label>
            <input
              type="email"
              name="details.contact.email"
              value={formData.details.email}
              onChange={handleDetailsChange}
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="imageFile"
              className="block text-gray-700 font-bold"
            >
              Upload Image:
            </label>
            <input
              type="file"
              name="imageFile"
              id="imageFile"
              onChange={handleFileChange}
              className="w-full border border-gray-300 p-2 rounded"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Update Service
          </button>
        </form>
        {responseMessage && (
          <p
            className={`mt-4 font-bold ${
              responseMessage.includes("Error")
                ? "text-red-600"
                : "text-green-600"
            }`}
          >
            {responseMessage}
          </p>
        )}
      </div>
    </div>
    </MainLayout>
  );
};

export default UpdateService;
