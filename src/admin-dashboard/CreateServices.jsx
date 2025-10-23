import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import MainLayout from "../admin-panel/MainLayout";

export const CreateServices = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [detailPage, setDetailPage] = useState("");
  const [highlights, setHighlights] = useState([""]);
  const [tips, setTips] = useState([""]);
  const [whatsapp, setWhatsapp] = useState("");
  const [email, setEmail] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [responseMessage, setResponseMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchServiceDetails = async () => {
      try {
        const response = await axios.get(
          "https://demo.ibirwakivubiketours.com/api/services/67c0f47f02c5888782662aca"
        );
        const service = response.data;
        setTitle(service.title);
        setDescription(service.description);
        setDetailPage(service.detailPage);
        setHighlights(service.details.highlights);
        setTips(service.details.tips);
        setWhatsapp(service.details.whatsapp);
        setEmail(service.details.email);
      } catch (error) {
        console.error("Error fetching service details:", error);
      }
    };

    fetchServiceDetails();
  }, []);

  const handleAddHighlight = () => setHighlights([...highlights, ""]);
  const handleAddTip = () => setTips([...tips, ""]);

  const handleHighlightChange = (index, value) => {
    const newHighlights = [...highlights];
    newHighlights[index] = value;
    setHighlights(newHighlights);
  };

  const handleTipChange = (index, value) => {
    const newTips = [...tips];
    newTips[index] = value;
    setTips(newTips);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("detailPage", detailPage);
    formData.append(
      "details",
      JSON.stringify({
        highlights,
        tips,
        whatsapp,
        email,
      })
    );
    if (imageFile) {
      formData.append("imageFile", imageFile);
    }

    try {
      const response = await axios.post(
        "https://demo.ibirwakivubiketours.com/api/services",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        setResponseMessage("✅ Service created successfully!");
        setTimeout(() => {
          navigate("/tour-services");
        }, 2000);
      }
    } catch (error) {
      setResponseMessage(
        "❌ " + (error.response?.data?.message || "Failed to submit data.")
      );
    }
  };

  return (
    <MainLayout>
      <div className="bg-gray-100 min-h-screen p-6">
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-md">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
            ✨ Create New Service
          </h1>

          <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                required
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Detail Page URL */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Detail Page URL</label>
              <input
                type="text"
                value={detailPage}
                onChange={(e) => setDetailPage(e.target.value)}
                required
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Highlights */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Highlights</label>
              {highlights.map((h, i) => (
                <input
                  key={i}
                  type="text"
                  value={h}
                  onChange={(e) => handleHighlightChange(i, e.target.value)}
                  className="w-full mb-2 p-2 border rounded-lg focus:ring-1 focus:ring-blue-400"
                />
              ))}
              <button
                type="button"
                onClick={handleAddHighlight}
                className="text-sm text-blue-600 hover:underline"
              >
                + Add Highlight
              </button>
            </div>

            {/* Tips */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tips</label>
              {tips.map((t, i) => (
                <input
                  key={i}
                  type="text"
                  value={t}
                  onChange={(e) => handleTipChange(i, e.target.value)}
                  className="w-full mb-2 p-2 border rounded-lg focus:ring-1 focus:ring-blue-400"
                />
              ))}
              <button
                type="button"
                onClick={handleAddTip}
                className="text-sm text-blue-600 hover:underline"
              >
                + Add Tip
              </button>
            </div>

            {/* Whatsapp */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Whatsapp</label>
              <input
                type="text"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                required
                className="w-full p-2 border rounded-lg"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full p-2 border rounded-lg"
              />
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Upload Image</label>
              <input
                type="file"
                onChange={(e) => setImageFile(e.target.files[0])}
                className="w-full p-2 border rounded-lg"
              />
            </div>

            {/* Submit */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
              >
                Create Service
              </button>
            </div>

            {/* Response Message */}
            {responseMessage && (
              <p
                className={`text-center font-medium mt-4 ${
                  responseMessage.includes("Error")
                    ? "text-red-500"
                    : "text-green-600"
                }`}
              >
                {responseMessage}
              </p>
            )}
          </form>
        </div>
      </div>
    </MainLayout>
  );
};
