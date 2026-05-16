import React, { useState, useEffect } from "react";
import { X, Upload, Loader2 } from "lucide-react";
import useBlogStore from "../../store/useBlogStore";

const BlogFormModal = ({ isOpen, onClose, blogData }) => {
  const { createBlog, updateBlog, isLoading } = useBlogStore();
  const isEditMode = !!blogData;

  // Sync state controls values
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [tags, setTags] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  useEffect(() => {
    if (blogData) {
      setTitle(blogData.title || "");
      setSummary(blogData.summary || "");
      setContent(blogData.content || "");
      setAuthor(blogData.author || "");
      setTags(blogData.tags ? blogData.tags.join(", ") : "");
      setImagePreview(blogData.coverImage || "");
    }
  }, [blogData]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("summary", summary);
    formData.append("content", content);
    formData.append("author", author);
    
    // Parse input string cleanly into an array format matches database specifications
    const parsedTags = tags.split(",").map(t => t.trim()).filter(t => t !== "");
    // Send array structure as a clean JSON parsable string format for multipart routers
    formData.append("tags", JSON.stringify(parsedTags));

    if (coverImage) {
      formData.append("coverImage", coverImage);
    }

    let result;
    if (isEditMode) {
      result = await updateBlog(blogData._id, formData);
    } else {
      result = await createBlog(formData);
    }

    if (result.success) {
      onClose();
    } else {
      alert(`Mutation Failed: ${result.error || "Check backend engine connectivity paths."}`);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl border border-slate-200 w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col transform transition-all engine duration-200">
        
        <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <h2 className="font-bold text-slate-900 text-base">{isEditMode ? "Mutate Existing Record" : "Publish Live Article Link"}</h2>
          <button onClick={onClose} className="p-1 rounded-md text-slate-400 hover:bg-slate-200 transition-colors">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 text-sm flex-1">
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

          <div>
            <label className="block font-medium text-slate-700 mb-1">Brief Summary *</label>
            <textarea
              required
              rows={2}
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="Provide a compelling hook excerpt text for directory listing layouts..."
              className="w-full border border-slate-200 px-3 py-2 rounded-lg outline-none focus:border-emerald-500 transition-colors resize-none"
            />
          </div>

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

          {/* Banner Media Frame Asset Ingestion Slot */}
          <div>
            <label className="block font-medium text-slate-700 mb-1">Cover Header Asset</label>
            <div className="border-2 border-dashed border-slate-200 rounded-xl p-4 flex flex-col items-center justify-center bg-slate-50/50 hover:bg-slate-50 transition-colors relative group">
              {imagePreview ? (
                <div className="w-full relative h-40 rounded-lg overflow-hidden">
                  <img src={imagePreview} alt="Preview Asset" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-medium cursor-pointer">
                    Click to Update Binary Stream
                    <input type="file" accept="image/*" onChange={handleImageChange} className="absolute inset-0 opacity-0 cursor-pointer" />
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center py-4 cursor-pointer relative w-full">
                  <Upload size={24} className="text-slate-400 mb-2" />
                  <span className="text-slate-600 font-medium text-xs">Upload Stream Media File</span>
                  <input type="file" accept="image/*" onChange={handleImageChange} className="absolute inset-0 opacity-0 cursor-pointer" />
                </div>
              )}
            </div>
          </div>

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

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 bg-white">
            <button
              type="button"
              disabled={isLoading}
              onClick={onClose}
              className="px-4 py-2 border border-slate-200 rounded-lg font-medium text-slate-600 hover:bg-slate-50 transition-colors disabled:opacity-50"
            >
              Aborted
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