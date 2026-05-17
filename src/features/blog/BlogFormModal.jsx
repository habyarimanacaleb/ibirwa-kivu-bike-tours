import React, { useState, useEffect } from "react";
import { X, Upload, Loader2, Image as ImageIcon } from "lucide-react";
import useBlogStore from "../../store/useBlogStore";
import { toast } from "react-toastify";

const BlogFormModal = ({ isOpen, onClose, blogData }) => {
  const { createBlog, updateBlog, isLoading } = useBlogStore();
  const isEditMode = !!blogData;

  // Primary Metadata Form Fields
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState(""); 
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [tags, setTags] = useState("");

  // Primary Single Banner Upload Nodes
  const [mainImage, setMainImage] = useState(null); 
  const [imagePreview, setImagePreview] = useState("");

  // Multiple Gallery Upload Tracking States
  const [galleryFiles, setGalleryFiles] = useState([]); 
  const [existingGallery, setExistingGallery] = useState([]); 

  useEffect(() => {
    if (blogData) {
      setTitle(blogData.title || "");
      setExcerpt(blogData.excerpt || ""); 
      setContent(blogData.content || "");
      setAuthor(blogData.author || "");
      
      // 🌟 Clean Safeguard: Explicitly handle whether incoming tags data is an array or string
      if (Array.isArray(blogData.tags)) {
        setTags(blogData.tags.join(", "));
      } else {
        setTags(blogData.tags || "");
      }

      setImagePreview(blogData.mainImage || ""); 
      setExistingGallery(blogData.gallery || []);
      setGalleryFiles([]); 
    } else {
      setTitle("");
      setExcerpt("");
      setContent("");
      setAuthor("");
      setTags("");
      setMainImage(null);
      setImagePreview("");
      setGalleryFiles([]);
      setExistingGallery([]);
    }
  }, [blogData, isOpen]);

  // Handle single Cover Hero Image selection updates
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMainImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Process new appended collection rows to the dynamic layout streams
  const handleGalleryChange = (e) => {
    const files = Array.from(e.target.files);
    
    // 🌟 Check to make sure total items across both tracking arrays won't breach a count of 4
    const totalCurrentCount = existingGallery.length + galleryFiles.length;
    if (totalCurrentCount + files.length > 4) {
      toast.warning(`Gallery constraint threshold reached. Maximum limit is 4 images total.`);
      return;
    }

    if (files.length > 0) {
      const uniqueObjects = files.map(file => ({
        file,
        previewUrl: URL.createObjectURL(file)
      }));
      setGalleryFiles((prev) => [...prev, ...uniqueObjects]);
    }
  };

  const removeStagedGalleryFile = (indexToRemove) => {
    setGalleryFiles((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const removeExistingGalleryUrl = (urlToRemove) => {
    setExistingGallery((prev) => prev.filter((url) => url !== urlToRemove));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("excerpt", excerpt); 
    formData.append("content", content);
    formData.append("author", author);
    
    // 🌟 Secure Parsing: Convert tag inputs cleanly back into standard JSON Arrays
    const stringTags = String(tags); 
    const parsedTags = stringTags.split(",").map(t => t.trim()).filter(t => t !== "");
    formData.append("tags", JSON.stringify(parsedTags));

    if (mainImage) {
      formData.append("mainImage", mainImage); 
    }

    formData.append("existingGallery", JSON.stringify(existingGallery));

    galleryFiles.forEach((item) => {
      formData.append("gallery", item.file);
    });

    let result;
    if (isEditMode) {
      result = await updateBlog(blogData._id, formData);
    } else {
      result = await createBlog(formData);
    }

    if (result.success) {
      onClose();
    } else {
      toast.error(`Mutation Failed: ${result.error || "Check backend engine connectivity paths."}`);
    }
  };

  if (!isOpen) return null;

  // Track layout counts dynamically
  const totalGalleryCount = existingGallery.length + galleryFiles.length;

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl border border-slate-200 w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col transform transition-all duration-200">
        
        <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <h2 className="font-bold text-slate-900 text-base">
            {isEditMode ? "Mutate Existing Record Data" : "Publish Live Article Link"}
          </h2>
          <button onClick={onClose} className="p-1 rounded-md text-slate-400 hover:bg-slate-200 transition-colors">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 text-sm flex-1">
          
          {/* Title & Author Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium text-slate-700 mb-1">Title *</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Article headline string"
                className="w-full border border-slate-200 px-3 py-2 rounded-lg outline-none focus:border-emerald-500 transition-colors"
              />
            </div>
            <div>
              <label className="block font-medium text-slate-700 mb-1">Author Attribution</label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Defaults to Admin Group"
                className="w-full border border-slate-200 px-3 py-2 rounded-lg outline-none focus:border-emerald-500 transition-colors"
              />
            </div>
          </div>

          {/* Brief Excerpt */}
          <div>
            <label className="block font-medium text-slate-700 mb-1">Brief Excerpt *</label>
            <textarea
              required
              rows={2}
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="Provide a compelling hook excerpt text for directory listing layouts..."
              className="w-full border border-slate-200 px-3 py-2 rounded-lg outline-none focus:border-emerald-500 transition-colors resize-none"
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block font-medium text-slate-700 mb-1">Tags (Comma Separated)</label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="e.g., Congo Nile, CAD Design, Hydrodynamics, Rwanda"
              className="w-full border border-slate-200 px-3 py-2 rounded-lg outline-none focus:border-emerald-500 transition-colors"
            />
          </div>

          {/* Cover Header Asset Upload Canvas Component */}
          <div>
            <label className="block font-medium text-slate-700 mb-1">Cover Header Asset (Main Image)</label>
            <div className="border-2 border-dashed border-slate-200 rounded-xl p-4 flex flex-col items-center justify-center bg-slate-50/50 hover:bg-slate-50 transition-colors relative group">
              {imagePreview ? (
                <div className="w-full relative h-40 rounded-lg overflow-hidden">
                  <img src={imagePreview} alt="Preview Cover Banner" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-medium cursor-pointer">
                    Click to Change Main Image Stream
                    <input type="file" accept="image/*" onChange={handleImageChange} className="absolute inset-0 opacity-0 cursor-pointer" />
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center py-4 cursor-pointer relative w-full">
                  <Upload size={24} className="text-slate-400 mb-2" />
                  <span className="text-slate-600 font-medium text-xs">Upload Main Stream Cover Image</span>
                  <input type="file" accept="image/*" onChange={handleImageChange} className="absolute inset-0 opacity-0 cursor-pointer" />
                </div>
              )}
            </div>
          </div>

          {/* MULTI-IMAGE GALLERY FORM LAYOUT SECTION */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="block font-medium text-slate-700">Expedition Gallery Collections</label>
              <span className={`text-xs font-semibold ${totalGalleryCount >= 4 ? 'text-rose-600' : 'text-slate-400'}`}>
                ({totalGalleryCount}/4 Images)
              </span>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              
              {/* Render Existing Live Server Items */}
              {existingGallery.map((url, index) => (
                <div key={`cloud-${index}`} className="relative aspect-square rounded-xl overflow-hidden bg-slate-100 border border-slate-200 group">
                  <img src={url} alt="Hosted Gallery Context" className="w-full h-full object-cover filter brightness-95" />
                  <span className="absolute top-1 left-1 text-[9px] font-black uppercase bg-slate-900/80 px-1.5 py-0.5 rounded text-emerald-400 backdrop-blur-xs select-none">Live</span>
                  <button
                    type="button"
                    onClick={() => removeExistingGalleryUrl(url)}
                    className="absolute top-1 right-1 p-1 bg-rose-600 hover:bg-rose-700 text-white rounded-md opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all shadow-md"
                    title="Remove from Server Matrix"
                  >
                    <X size={12} />
                  </button>
                </div>
              ))}

              {/* Render Staged Local Binary Previews */}
              {galleryFiles.map((item, index) => (
                <div key={`staged-${index}`} className="relative aspect-square rounded-xl overflow-hidden bg-slate-50 border border-emerald-200 group">
                  <img src={item.previewUrl} alt="Staged Collection File" className="w-full h-full object-cover" />
                  <span className="absolute top-1 left-1 text-[9px] font-black uppercase bg-emerald-600 px-1.5 py-0.5 rounded text-white select-none shadow-sm">Staged</span>
                  <button
                    type="button"
                    onClick={() => removeStagedGalleryFile(index)}
                    className="absolute top-1 right-1 p-1 bg-slate-900/80 text-slate-200 hover:text-white rounded-md shadow-md"
                  >
                    <X size={12} />
                  </button>
                </div>
              ))}

              {/* Hide upload block once the 4 image ceiling is reached */}
              {totalGalleryCount < 4 && (
                <div className="border-2 border-dashed border-slate-200 hover:border-emerald-400 rounded-xl aspect-square flex flex-col items-center justify-center bg-slate-50/50 hover:bg-emerald-50/20 transition-all relative cursor-pointer group p-2">
                  <ImageIcon size={20} className="text-slate-400 group-hover:text-emerald-600 group-hover:scale-105 transition-transform mb-1" />
                  <span className="text-slate-500 font-bold text-[11px] group-hover:text-emerald-700 text-center leading-tight">Add Gallery Images</span>
                  <input 
                    type="file" 
                    accept="image/*" 
                    multiple 
                    onChange={handleGalleryChange} 
                    className="absolute inset-0 opacity-0 cursor-pointer" 
                  />
                </div>
              )}
            </div>
          </div>

          {/* Content Payload Area */}
          <div>
            <label className="block font-medium text-slate-700 mb-1">Markdown / Content Payload *</label>
            <textarea
              required
              rows={6}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Provide clean markdown or core text logs here..."
              className="w-full border border-slate-200 px-3 py-2 rounded-lg outline-none focus:border-emerald-500 transition-colors font-mono text-xs"
            />
          </div>

          {/* Footer Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 bg-white">
            <button
              type="button"
              disabled={isLoading}
              onClick={onClose}
              className="px-4 py-2 border border-slate-200 rounded-lg font-medium text-slate-600 hover:bg-slate-50 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg shadow-sm transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              {isLoading && <Loader2 className="animate-spin" size={16} />}
              {isLoading ? "Syncing Store Pipeline..." : isEditMode ? "Confirm Modification" : "Publish To Cluster"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BlogFormModal;