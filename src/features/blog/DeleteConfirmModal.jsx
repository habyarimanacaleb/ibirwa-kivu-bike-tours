import React from "react";
import { AlertTriangle, X, Loader2 } from "lucide-react";
import useBlogStore from "../../store/useBlogStore";

const DeleteConfirmModal = ({ isOpen, onClose, blogId, blogTitle }) => {
  const { deleteBlog, isLoading } = useBlogStore();

  if (!isOpen) return null;

  const handleDelete = async () => {
    const result = await deleteBlog(blogId);
    if (result && result.success) {
      onClose();
    } else if (result) {
      alert(`Purging process aborted: ${result.error || "Mongoose casting exceptions encountered."}`);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl border border-slate-200 w-full max-w-sm overflow-hidden p-6 relative transform transition-all shadow-xl text-sm">
        
        <button 
          onClick={onClose} 
          className="absolute right-4 top-4 p-1 rounded-md text-slate-400 hover:bg-slate-100 transition-colors"
          disabled={isLoading}
        >
          <X size={16} />
        </button>

        <div className="flex items-start gap-3.5">
          <div className="p-2 bg-rose-50 rounded-lg text-rose-600 flex-shrink-0">
            <AlertTriangle size={22} />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-base mb-1">Purge Live Index Document</h3>
            <p className="text-slate-500 leading-relaxed text-xs">
              Confirm permanent destruction of <span className="font-semibold text-slate-800">"{blogTitle || "Untitled Draft"}"</span> inside MongoDB indexes. This operation cannot be reversed.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2.5 mt-6 pt-4 border-t border-slate-100">
          <button
            disabled={isLoading}
            onClick={onClose}
            className="px-3 py-1.5 border border-slate-200 text-slate-600 font-medium rounded-lg hover:bg-slate-50 transition-colors disabled:opacity-50 text-xs"
          >
            Retain Document
          </button>
          <button
            disabled={isLoading}
            onClick={handleDelete}
            className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white font-medium rounded-lg shadow-sm transition-colors disabled:opacity-50 text-xs flex items-center gap-1.5"
          >
            {isLoading && <Loader2 className="animate-spin" size={12} />}
            {isLoading ? "Executing Purge..." : "Confirm Deletion"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;