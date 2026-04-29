import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Save, ArrowLeft, Image as ImageIcon, Plus, Trash2, ShieldAlert, Map } from "lucide-react";
import useServiceStore from "../store/useServiceStore";
import MainLayout from "../admin-panel/MainLayout";

const UpdateService = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { fetchServiceById, updateService, isLoading } = useServiceStore();

  const [form, setForm] = useState({
    title: "",
    description: "",
    detailPage: "",
    whatsapp: "",
    email: "",
    highlights: [],
    tips: [],
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [status, setStatus] = useState({ message: "", type: "" });

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchServiceById(id);
      if (data) {
        setForm({
          title: data.title || "",
          description: data.description || "",
          detailPage: data.detailPage || "",
          whatsapp: data.whatsapp || "",
          email: data.email || "",
          highlights: data.highlights || [""],
          tips: data.tips || [""],
        });
        setImagePreview(data.imageFile);
      }
    };
    loadData();
  }, [id, fetchServiceById]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleArrayChange = (field, index, value) => {
    const updated = [...form[field]];
    updated[index] = value;
    setForm({ ...form, [field]: updated });
  };

  const addField = (field) => setForm({ ...form, [field]: [...form[field], ""] });
  const removeField = (field, index) => {
    const updated = form[field].filter((_, i) => i !== index);
    setForm({ ...form, [field]: updated.length ? updated : [""] });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    if (file) setImagePreview(URL.createObjectURL(file));
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

    const result = await updateService(id, data);

    if (result.success) {
      setStatus({ message: "✅ Registry updated. Changes live on Kivu corridor.", type: "success" });
      setTimeout(() => navigate("/admin-panel"), 1500);
    } else {
      setStatus({ message: `❌ Sync error: ${result.message}`, type: "error" });
    }
  };

  return (
    <MainLayout>
      <div className="bg-[#F8FAFC] min-h-screen p-6 lg:p-12">
        <div className="max-w-6xl mx-auto">
          
          {/* HEADER SECTION */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
            <div className="flex items-center gap-6">
              <button 
                onClick={() => navigate(-1)} 
                className="group p-4 bg-white rounded-2xl shadow-sm hover:bg-slate-900 transition-all"
              >
                <ArrowLeft size={20} className="group-hover:text-white transition-colors" />
              </button>
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600 mb-1">Kivu Logistics Terminal</p>
                <h1 className="text-4xl font-black text-slate-950 tracking-tighter uppercase">Modify Expedition</h1>
              </div>
            </div>

            <div className="flex flex-col items-end">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Registry Serial</span>
                <span className="bg-slate-200 px-4 py-1 rounded-full text-[11px] font-mono font-bold text-slate-600">
                  REF-{id?.slice(-8).toUpperCase()}
                </span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* LEFT: CONTENT CORE */}
            <div className="lg:col-span-8 space-y-8">
              
              <div className="bg-white p-10 rounded-[3rem] shadow-2xl shadow-slate-200 border border-slate-50 space-y-6">
                <div className="flex items-center gap-3 mb-2">
                  <Map className="text-blue-600" size={18} />
                  <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">Mission Intelligence</h3>
                </div>

                <div className="space-y-4">
                  <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Expedition Name</label>
                  <input
                    name="title" value={form.title} onChange={handleChange} required
                    className="w-full p-5 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-600 outline-none font-bold text-slate-950"
                  />
                  
                  <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Corridor Brief</label>
                  <textarea
                    name="description" value={form.description} onChange={handleChange} required rows={3}
                    className="w-full p-5 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-600 outline-none resize-none font-medium text-slate-600"
                  />

                  <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Detailed Itinerary & Narrative</label>
                  <textarea
                    name="detailPage" value={form.detailPage} onChange={handleChange} required rows={8}
                    className="w-full p-5 bg-slate-50 border-none rounded-[2rem] focus:ring-2 focus:ring-blue-600 outline-none resize-none font-medium text-slate-600"
                  />
                </div>
              </div>

              {/* DYNAMIC PARAMETERS */}
              <div className="grid md:grid-cols-2 gap-8">
                {['highlights', 'tips'].map((field) => (
                  <div key={field} className="bg-white p-10 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-50">
                    <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-2">
                      {field === 'highlights' ? 'Tour Inclusions' : 'Operational Advice'}
                    </h3>
                    <div className="space-y-3">
                      {form[field].map((val, i) => (
                        <div key={`${field}-${i}`} className="flex gap-2 group">
                          <input
                            value={val} onChange={(e) => handleArrayChange(field, i, e.target.value)}
                            className="flex-grow p-4 bg-slate-50 border-none rounded-xl text-sm font-bold text-slate-700"
                          />
                          <button type="button" onClick={() => removeField(field, i)} className="text-slate-300 hover:text-rose-500 transition-colors">
                            <Trash2 size={16}/>
                          </button>
                        </div>
                      ))}
                    </div>
                    <button type="button" onClick={() => addField(field)} className="flex items-center gap-2 text-[10px] font-black text-blue-600 mt-6 uppercase tracking-widest">
                      <Plus size={14}/> Append Parameter
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT: SYSTEM & MEDIA */}
            <div className="lg:col-span-4 space-y-8">
              
              {/* IMAGE REGISTRY */}
              <div className="bg-slate-950 p-10 rounded-[3rem] text-white shadow-2xl shadow-blue-900/20">
                <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-6">Asset Visual</h3>
                <div className="relative aspect-square rounded-[2rem] bg-white/5 border-2 border-dashed border-white/10 flex items-center justify-center overflow-hidden group">
                  {imagePreview ? (
                    <img src={imagePreview} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Current" />
                  ) : (
                    <ImageIcon className="text-white/20" size={40} />
                  )}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <p className="text-[10px] font-black uppercase tracking-widest">Update Photo</p>
                  </div>
                  <input type="file" onChange={handleFileChange} className="absolute inset-0 opacity-0 cursor-pointer" />
                </div>
                <p className="text-[9px] text-slate-600 mt-6 text-center italic uppercase tracking-widest">Replace existing Kivu landscape asset</p>
              </div>

              {/* BOOKING NODES */}
              <div className="bg-white p-10 rounded-[2.5rem] shadow-xl shadow-slate-200 border border-slate-50 space-y-6">
                <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Communication Nodes</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                     <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-2">WhatsApp Channel</label>
                     <input
                        name="whatsapp" value={form.whatsapp} onChange={handleChange} required
                        className="w-full p-4 bg-slate-50 border-none rounded-xl text-sm font-bold text-slate-800"
                      />
                  </div>
                  <div className="space-y-2">
                     <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-2">Secure Email</label>
                     <input
                        name="email" value={form.email} onChange={handleChange} required type="email"
                        className="w-full p-4 bg-slate-50 border-none rounded-xl text-sm font-bold text-slate-800"
                      />
                  </div>
                </div>
              </div>

              {/* SUBMIT ACTION */}
              <div className="space-y-4">
                <button
                  type="submit" disabled={isLoading}
                  className="w-full bg-blue-600 hover:bg-slate-950 text-white py-6 rounded-[2.5rem] font-black uppercase tracking-[0.2em] text-[11px] shadow-2xl shadow-blue-500/30 transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-3"
                >
                  {isLoading ? "Synchronizing..." : <>Sync Changes <Save size={16}/></>}
                </button>

                {status.message && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`text-center text-[10px] font-black uppercase tracking-widest p-5 rounded-[2rem] border ${
                      status.type === 'success' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-rose-50 text-rose-700 border-rose-100'
                    }`}
                  >
                    {status.message}
                  </motion.div>
                )}
              </div>

              <div className="p-6 bg-amber-50 rounded-[2rem] border border-amber-100">
                <p className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-amber-700">
                  <ShieldAlert size={12} /> Live Registry Notice
                </p>
                <p className="text-[10px] text-amber-600 mt-2 font-medium">Updating this record will immediately reflect changes on the public expedition map.</p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </MainLayout>
  );
};

export default UpdateService;