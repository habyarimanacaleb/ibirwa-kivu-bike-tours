import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Plus, Trash2, Image as ImageIcon, Send, ArrowLeft, Info, ShieldCheck, X } from "lucide-react";
import useServiceStore from "../store/useServiceStore";
import MainLayout from "../admin-panel/MainLayout";
import { toast } from "react-toastify";

export const CreateServices = () => {
  const navigate = useNavigate();
  const { createService, isLoading } = useServiceStore();

  const [form, setForm] = useState({
    title: "",
    description: "",
    detailPage: "",
    whatsapp: "",
    email: "",
    highlights: [""],
    tips: [""],
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  
  // 🌟 New State Hooks: Handle multiple file arrays for gallery injection
  const [galleryFiles, setGalleryFiles] = useState([]);
  const [galleryPreviews, setGalleryPreviews] = useState([]);
  const [status, setStatus] = useState({ message: "", type: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleArrayChange = (field, index, value) => {
    const updated = [...form[field]];
    updated[index] = value;
    setForm({ ...form, [field]: updated });
  };

  const addField = (field) => setForm({ ...form, [field]: [...form[field], ""] });
  
  const removeField = (field, index) => {
    if (form[field].length > 1) {
      const updated = form[field].filter((_, i) => i !== index);
      setForm({ ...form, [field]: updated });
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    if (file) setImagePreview(URL.createObjectURL(file));
  };

  // 🌟 Handle Multiple File Inputs for Gallery Pipeline
  const handleGalleryChange = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    setGalleryFiles((prev) => [...prev, ...files]);
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setGalleryPreviews((prev) => [...prev, ...newPreviews]);
  };

  // 🌟 Remove a file block out of the staging queues prior to upload
  const removeStagedGalleryItem = (index) => {
    setGalleryFiles((prev) => prev.filter((_, i) => i !== index));
    setGalleryPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    
    data.append("title", form.title);
    data.append("description", form.description);
    data.append("detailPage", form.detailPage);
    data.append("whatsapp", form.whatsapp);
    data.append("email", form.email);
    
    data.append("highlights", JSON.stringify(form.highlights.filter(h => h.trim())));
    data.append("tips", JSON.stringify(form.tips.filter(t => t.trim())));

    if (imageFile) data.append("imageFile", imageFile);

    // 🌟 Append multiple target assets into file mapping matching backend fields
    if (galleryFiles.length > 0) {
      galleryFiles.forEach((file) => {
        data.append("gallery", file);
      });
    }

    const result = await createService(data);

    if (result.success) {
      setStatus({ message: "✅ Expedition deployed to registry!", type: "success" });
      toast.success("✅ Expedition deployed to registry!")
      setTimeout(() => navigate("/admin-panel"), 1500);
    } else {
      setStatus({ message: `❌ Deployment failed: ${result.message}`, type: "error" });
      toast.error("❌ Deployment failed:", result.message)
    }
  };

  return (
    <MainLayout>
      <div className="bg-[#F8FAFC] min-h-screen p-6 lg:p-12 font-sans">
        <div className="max-w-6xl mx-auto">
          
          {/* TOP BAR */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
            <div className="flex items-center gap-6">
              <button 
                type="button"
                onClick={() => navigate(-1)} 
                className="group p-4 bg-white rounded-2xl shadow-sm hover:shadow-md hover:bg-slate-900 transition-all"
              >
                <ArrowLeft size={20} className="group-hover:text-white transition-colors" />
              </button>
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600 mb-1">Administrative Terminal</p>
                <h1 className="text-4xl font-black text-slate-950 tracking-tighter uppercase">Initialize Expedition</h1>
              </div>
            </div>

            {status.message && (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className={`px-6 py-3 rounded-2xl text-xs font-bold uppercase tracking-widest flex items-center gap-3 ${
                  status.type === 'success' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-rose-50 text-rose-600 border border-rose-100'
                }`}
              >
                {status.message}
              </motion.div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* MAIN CONFIGURATION (LEFT) */}
            <div className="lg:col-span-8 space-y-8">
              
              {/* CORE PARAMETERS */}
              <div className="bg-white p-10 rounded-[3rem] shadow-2xl shadow-slate-200 border border-slate-50 space-y-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-2 w-2 rounded-full bg-blue-600 animate-pulse" />
                  <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">Core Parameters</h3>
                </div>

                <div className="space-y-4">
                  <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Expedition Title</label>
                  <input
                    name="title" placeholder="e.g. CONGO NILE ARCHIPELAGO TOUR"
                    value={form.title} onChange={handleChange} required
                    className="w-full p-5 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-600 outline-none font-bold text-slate-900 placeholder:text-slate-300 transition-all"
                  />
                  
                  <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Registry Brief (Short Description)</label>
                  <textarea
                    name="description" placeholder="Brief mission overview for the list view..."
                    value={form.description} onChange={handleChange} required rows={2}
                    className="w-full p-5 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-600 outline-none resize-none font-medium text-slate-600"
                  />

                  <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Full Mission intel (Detail Page)</label>
                  <textarea
                    name="detailPage" placeholder="The comprehensive story, history, and route data..."
                    value={form.detailPage} onChange={handleChange} required rows={8}
                    className="w-full p-5 bg-slate-50 border-none rounded-[2rem] focus:ring-2 focus:ring-blue-600 outline-none resize-none font-medium text-slate-600 whitespace-pre-line"
                  />
                </div>
              </div>

              {/* OPERATIONAL LOGISTICS */}
              <div className="grid md:grid-cols-2 gap-8">
                {['highlights', 'tips'].map((field) => (
                  <div key={field} className="bg-white p-10 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-50">
                    <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-2">
                      <ShieldCheck size={14} className="text-blue-600" /> Expedition {field}
                    </h3>
                    <div className="space-y-3">
                      {form[field].map((val, i) => (
                        <div key={`field-${field}-${i}`} className="flex gap-3 items-center group">
                          <input
                            value={val} onChange={(e) => handleArrayChange(field, i, e.target.value)}
                            className="flex-grow p-4 bg-slate-50 border-none rounded-xl text-sm font-bold text-slate-700 focus:bg-white focus:ring-1 focus:ring-slate-200 transition-all"
                            placeholder={`Enter ${field}...`}
                          />
                          <button 
                            type="button" 
                            onClick={() => removeField(field, i)} 
                            className="text-slate-300 hover:text-rose-500 transition-colors opacity-0 group-hover:opacity-100"
                          >
                            <Trash2 size={18}/>
                          </button>
                        </div>
                      ))}
                    </div>
                    <button 
                      type="button" 
                      onClick={() => addField(field)} 
                      className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-blue-600 mt-6 hover:text-slate-900 transition-colors"
                    >
                      <Plus size={14}/> Add Parameter
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* SIDEBAR ASSETS (RIGHT) */}
            <div className="lg:col-span-4 space-y-8">
              
              {/* PRIMARY MEDIA UPLOAD */}
              <div className="bg-slate-950 p-10 rounded-[3rem] text-white shadow-2xl shadow-blue-900/20">
                <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-6">Primary Visual Cover</h3>
                <div className="relative aspect-square rounded-[2rem] bg-white/5 border-2 border-dashed border-white/10 flex items-center justify-center overflow-hidden group">
                  {imagePreview ? (
                    <img src={imagePreview} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Preview" />
                  ) : (
                    <div className="text-center">
                      <ImageIcon className="text-white/10 mx-auto mb-4" size={48} />
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-4">Upload Hero Image</p>
                    </div>
                  )}
                  <input type="file" onChange={handleFileChange} className="absolute inset-0 opacity-0 cursor-pointer" />
                </div>
              </div>

              {/* 🌟 NEW BLOCK: MULTI-IMAGE GALLERY MATRIX BUILDER */}
              <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-slate-100 space-y-4">
                <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Expedition Gallery Grid</h3>
                
                <div className="grid grid-cols-3 gap-2">
                  {galleryPreviews.map((url, index) => (
                    <div key={`preview-${index}`} className="relative aspect-square rounded-xl bg-slate-100 overflow-hidden group border border-slate-200">
                      <img src={url} alt={`Staged Grid Asset ${index}`} className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => removeStagedGalleryItem(index)}
                        className="absolute top-1 right-1 p-1 bg-rose-600 rounded-lg text-white shadow opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ))}
                  
                  {/* Append File Grid Cell Trigger */}
                  <label className="relative aspect-square rounded-xl bg-slate-50 border-2 border-dashed border-slate-200 flex flex-col items-center justify-center cursor-pointer hover:bg-slate-100/70 hover:border-blue-400 transition-colors">
                    <Plus size={18} className="text-slate-400" />
                    <span className="text-[8px] font-black uppercase text-slate-400 tracking-wider mt-1">Add Image</span>
                    <input type="file" multiple onChange={handleGalleryChange} className="absolute inset-0 opacity-0 cursor-pointer" />
                  </label>
                </div>
                <p className="text-[8px] text-slate-400 italic">Upload contextual landscapes, trail snapshots, and terrain highlights.</p>
              </div>

              {/* CONTACT PROTOCOLS */}
              <div className="bg-white p-10 rounded-[2.5rem] shadow-xl shadow-slate-200 border border-slate-50 space-y-6">
                <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2 flex items-center gap-2">
                  <Info size={14} className="text-blue-600" /> Contact Protocols
                </h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">WhatsApp Line</label>
                    <input
                      name="whatsapp" placeholder="25078..."
                      value={form.whatsapp} onChange={handleChange} required
                      className="w-full p-4 bg-slate-50 border-none rounded-xl text-sm font-bold"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Email Address</label>
                    <input
                      name="email" type="email" placeholder="booking@ibirwa.com"
                      value={form.email} onChange={handleChange} required
                      className="w-full p-4 bg-slate-50 border-none rounded-xl text-sm font-bold"
                    />
                  </div>
                </div>
              </div>

              {/* DEPLOY BUTTON */}
              <button
                type="submit" 
                disabled={isLoading}
                className="group relative w-full bg-blue-600 hover:bg-slate-900 text-white py-6 rounded-[2.5rem] font-black uppercase tracking-widest text-xs shadow-2xl shadow-blue-500/30 transition-all active:scale-95 disabled:opacity-50 overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center gap-4">
                  {isLoading ? "Synchronizing Data..." : <>Deploy to Registry <Send size={16}/></>}
                </span>
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity"
                  initial={false}
                />
              </button>
            </div>
          </form>
        </div>
      </div>
    </MainLayout>
  );
};