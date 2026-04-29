import React, { useState } from "react";
import { X } from "lucide-react";
import useUiStore from "../store/useUiStore";
import useInquiryStore from "../store/useInquiryStore";
import InquiryForm from "./InquiryForm"; // Your simplified component

const InquiryModal = () => {
  const { isInquiryOpen, closeInquiry } = useUiStore();
  const { createInquiry, isLoading } = useInquiryStore();
  
  const [formData, setFormData] = useState({
    name: "", email: "", destination: "",
    paxNumber: "", checkinDate: "", checkoutDate: ""
  });
  const [responseMessage, setResponseMessage] = useState("");

  if (!isInquiryOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await createInquiry(formData);
    
    if (result.success) {
      setResponseMessage("Inquiry sent successfully!");
      setFormData({ name: "", email: "", destination: "", paxNumber: "", checkinDate: "", checkoutDate: "" });
      setTimeout(() => {
        setResponseMessage("");
        closeInquiry();
      }, 2000);
    } else {
      setResponseMessage(`Error: ${result.message}`);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
      <div className="relative w-full max-w-3xl bg-gray-900 rounded-xl shadow-2xl border border-white/10 overflow-hidden">
        {/* Header & Close Button */}
        <div className="flex justify-between items-center p-6 border-b border-white">
        <div>
        <p className="text-lg font-medium text-white">Inquiry Form</p>
        <h2 className="text-3xl font-semibold text-center text-white">
          Plan Your Tour today!
        </h2> 
          </div>         
        <button onClick={closeInquiry} className=" border rounded-full p-2 text-gray-400 hover:text-white transition-colors">
            <X size={28} />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6">
          <InquiryForm 
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            loading={isLoading}
            responseMessage={responseMessage}
          />
        </div>
      </div>
    </div>
  );
};

export default InquiryModal;
