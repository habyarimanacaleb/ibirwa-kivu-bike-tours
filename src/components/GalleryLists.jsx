import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlus, FaEdit, FaTrash, FaImage, FaSpinner } from "react-icons/fa";
import MainLayout from "../admin-panel/MainLayout";
import useGalleryStore from "../store/useGalleryStore";

const GalleryList = () => {
  const { images, isLoading, loadGallery, removeImage } = useGalleryStore();
  const [deletingId, setDeletingId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadGallery();
  }, [loadGallery]);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this memory? This action cannot be undone.")) return;
    try {
      setDeletingId(id);
      await removeImage(id);
    } catch (error) {
      alert("Failed to delete image.");
    } finally {
      setDeletingId(null);
    }
  };

  if (isLoading) {
    return (
      <MainLayout>
        <div className="h-[60vh] flex flex-col items-center justify-center text-blue-900">
          <FaSpinner className="animate-spin text-4xl mb-4" />
          <p className="font-bold tracking-widest uppercase text-xs">Syncing Gallery...</p>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="p-8 bg-[#f8fafc] min-h-screen">
        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-10 gap-6">
          <div>
            <h1 className="text-4xl font-black text-[#0a192f] tracking-tighter uppercase">Gallery Control</h1>
            <p className="text-slate-500 font-medium mt-1">Manage your visual expedition assets.</p>
          </div>
          <Link 
            to="/add-gallery" 
            className="flex items-center justify-center gap-2 bg-[#0a192f] text-white px-8 py-4 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-yellow-600 transition-colors shadow-lg shadow-blue-900/20"
          >
            <FaPlus /> Upload Asset
          </Link>
        </div>

        {/* GALLERY GRID */}
        {images.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="text-center py-20 bg-white rounded-[2rem] border border-dashed border-slate-300"
          >
            <FaImage className="mx-auto text-5xl text-slate-300 mb-4" />
            <h3 className="text-xl font-bold text-slate-800">Gallery Empty</h3>
            <p className="text-slate-500 mb-6">Start by adding your first stunning shot.</p>
            <Link to="/add-gallery" className="text-blue-600 font-bold hover:underline">Add New Image →</Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <AnimatePresence>
              {images.map((item) => (
                <motion.div
                  key={item._id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-2xl hover:shadow-blue-900/10 transition-all duration-300 group"
                >
                  <div className="relative h-[200px] overflow-hidden">
                    <img
                      src={item.imageFile || "/placeholder.jpg"}
                      alt={item.title}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
                  </div>

                  <div className="p-6">
                    <h2 className="text-lg font-black text-slate-900 truncate mb-4 uppercase tracking-tight">
                      {item.title}
                    </h2>
                    
                    <div className="flex gap-3">
                      <button 
                        onClick={() => navigate(`/update-gallery/${item._id}`)}
                        className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors font-bold text-[10px] uppercase"
                      >
                        <FaEdit /> Edit
                      </button>
                      <button
                        disabled={deletingId === item._id}
                        onClick={() => handleDelete(item._id)}
                        className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl transition-colors font-bold text-[10px] uppercase ${
                          deletingId === item._id 
                          ? "bg-gray-100 text-gray-400" 
                          : "bg-red-50 text-red-600 hover:bg-red-100"
                        }`}
                      >
                        {deletingId === item._id ? <><FaSpinner className="animate-spin" /> Wait</> : <><FaTrash /> Del</>}
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default GalleryList;