import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import MainLayout from "../admin-panel/MainLayout";

const UpdateService = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    detailPage: "",
    details: {
      highlights: [],
      tips: [],
      whatsapp: "",
      email: "",
    },
    imageFile: null,
  });

  const [responseMessage, setResponseMessage] = useState("");

  useEffect(() => {
    const fetchService = async () => {
      try {
        const { data } = await axios.get(
          `https://kivu-back-end.onrender.com/api/services/${id}`
        );

        setFormData({
          title: data.title || "",
          description: data.description || "",
          detailPage: data.detailPage || "",
          details: {
            highlights: data.details.highlights || [],
            tips: data.details.tips || [],
            whatsapp: data.details.whatsapp || "",
            email: data.details.email || "",
          },
          imageFile: null,
        });
      } catch (err) {
        console.error("Error fetching service:", err);
        setResponseMessage("❌ Failed to load service data.");
      }
    };

    fetchService();
  }, [id]);

  // Simple input change for top-level fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Input change for nested details
  const handleDetailsChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      details: {
        ...prev.details,
        [name]: value,
      },
    }));
  };

  const handleArrayChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      details: {
        ...prev.details,
        [field]: value.split(",").map((item) => item.trim()),
      },
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, imageFile: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("detailPage", formData.detailPage);
    data.append("details", JSON.stringify(formData.details));

    if (formData.imageFile) data.append("imageFile", formData.imageFile);

    try {
      await axios.put(
        `https://kivu-back-end.onrender.com/api/services/${id}`,
        data,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      setResponseMessage("✅ Service updated successfully!");
      setTimeout(() => navigate("/admin-panel"), 2000);
    } catch (err) {
      console.error("Error updating service:", err);
      setResponseMessage(
        "❌ " + (err.response?.data?.message || "Failed to update service")
      );
    }
  };

  return (
    <MainLayout>
      <div className="bg-gray-100 p-6">
        <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold mb-4">Update Service</h1>
          <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-4">
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Title"
              className="w-full border p-2 rounded"
              required
            />
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Description"
              className="w-full border p-2 rounded"
              required
            />
            <input
              type="text"
              name="detailPage"
              value={formData.detailPage}
              onChange={handleChange}
              placeholder="Detail Page URL"
              className="w-full border p-2 rounded"
              required
            />

            <input
              type="text"
              name="highlights"
              value={formData.details.highlights.join(", ")}
              onChange={(e) => handleArrayChange("highlights", e.target.value)}
              placeholder="Highlights (comma separated)"
              className="w-full border p-2 rounded"
            />

            <input
              type="text"
              name="tips"
              value={formData.details.tips.join(", ")}
              onChange={(e) => handleArrayChange("tips", e.target.value)}
              placeholder="Tips (comma separated)"
              className="w-full border p-2 rounded"
            />

            <input
              type="text"
              name="whatsapp"
              value={formData.details.whatsapp}
              onChange={handleDetailsChange}
              placeholder="Whatsapp"
              className="w-full border p-2 rounded"
            />

            <input
              type="email"
              name="email"
              value={formData.details.email}
              onChange={handleDetailsChange}
              placeholder="Email"
              className="w-full border p-2 rounded"
            />

            <input
              type="file"
              onChange={handleFileChange}
              className="w-full border p-2 rounded"
            />

            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
              Update Service
            </button>
          </form>

          {responseMessage && (
            <p className={`mt-4 font-bold ${responseMessage.includes("❌") ? "text-red-600" : "text-green-600"}`}>
              {responseMessage}
            </p>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default UpdateService;
