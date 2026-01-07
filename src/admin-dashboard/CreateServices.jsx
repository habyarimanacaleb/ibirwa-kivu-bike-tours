import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import MainLayout from "../admin-panel/MainLayout";

export const CreateServices = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [detailPage, setDetailPage] = useState("");
  const [highlights, setHighlights] = useState([""]);
  const [tips, setTips] = useState([""]);
  const [whatsapp, setWhatsapp] = useState("");
  const [email, setEmail] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [responseMessage, setResponseMessage] = useState("");

  const handleAddHighlight = () => setHighlights([...highlights, ""]);
  const handleAddTip = () => setTips([...tips, ""]);

  const handleArrayChange = (setter, index, value) => {
    setter(prev => {
      const updated = [...prev];
      updated[index] = value;
      return updated;
    });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  const cleanHighlights = highlights.filter(h => h.trim() !== "");
  const cleanTips = tips.filter(t => t.trim() !== "");

  const formData = new FormData();
  formData.append("title", title);
  formData.append("description", description);
  formData.append("detailPage", detailPage);

  // ✅ SEND ARRAYS DIRECTLY (as JSON strings)
  formData.append("highlights", JSON.stringify(cleanHighlights));
  formData.append("tips", JSON.stringify(cleanTips));

  // ✅ SEND CONTACT FIELDS DIRECTLY
  formData.append("whatsapp", whatsapp);
  formData.append("email", email);

  if (imageFile) {
    formData.append("imageFile", imageFile); // MUST match multer field name
  }

  try {
    await axios.post(
      "https://v2.ibirwakivubiketours.com/api/services",
      formData
    );

    setResponseMessage("✅ Service created successfully!");
    setTimeout(() => navigate("/admin-panel"), 1500);
  } catch (error) {
    console.error(error);
    setResponseMessage(
      "❌ " + (error.response?.data?.message || "Failed to create service")
    );
  }
};


  return (
    <MainLayout>
      <div className="bg-gray-100 min-h-screen p-6">
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-md">
          <h1 className="text-3xl font-bold text-center mb-6">
            Create New Service
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <input
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full p-2 border rounded"
            />

            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="w-full p-2 border rounded"
            />

            <input
              placeholder="Detail Page"
              value={detailPage}
              onChange={(e) => setDetailPage(e.target.value)}
              required
              className="w-full p-2 border rounded"
            />

            {/* Highlights */}
            <div>
              <p className="font-semibold mb-2">Highlights</p>
              {highlights.map((h, i) => (
                <input
                  key={i}
                  value={h}
                  onChange={(e) =>
                    handleArrayChange(setHighlights, i, e.target.value)
                  }
                  className="w-full p-2 border rounded mb-2"
                />
              ))}
              <button type="button" onClick={handleAddHighlight} className="text-blue-600">
                + Add Highlight
              </button>
            </div>

            {/* Tips */}
            <div>
              <p className="font-semibold mb-2">Tips</p>
              {tips.map((t, i) => (
                <input
                  key={i}
                  value={t}
                  onChange={(e) =>
                    handleArrayChange(setTips, i, e.target.value)
                  }
                  className="w-full p-2 border rounded mb-2"
                />
              ))}
              <button type="button" onClick={handleAddTip} className="text-blue-600">
                + Add Tip
              </button>
            </div>

            <input
              placeholder="Whatsapp"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              required
              className="w-full p-2 border rounded"
            />

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-2 border rounded"
            />

            <input
              type="file"
              onChange={(e) => setImageFile(e.target.files[0])}
              className="w-full p-2 border rounded"
            />

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded"
            >
              Create Service
            </button>

            {responseMessage && (
              <p className="text-center mt-3 font-semibold">
                {responseMessage}
              </p>
            )}
          </form>
        </div>
      </div>
    </MainLayout>
  );
};
export default CreateServices;