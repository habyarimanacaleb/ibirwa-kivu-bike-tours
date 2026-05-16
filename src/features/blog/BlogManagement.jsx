import React, { useEffect, useState } from "react";
import { Plus, Edit2, Trash2, Search, Eye, Calendar, User, Loader2 } from "lucide-react";
import useBlogStore from "../../store/useBlogStore"; 
import BlogFormModal from "./BlogFormModal";
import DeleteConfirmModal from "./DeleteConfirmModal";

const BlogManagement = () => {
  const { blogs, isLoading, fetchBlogs } = useBlogStore();
  const [searchTerm, setSearchTerm] = useState("");
  
  // Modal State Triggers
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);

  // Load backend indices on initial mount
  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  // Client-side text filter pipeline across live array collections
  const filteredBlogs = blogs.filter((blog) => {
    const query = searchTerm.toLowerCase();
    return (
      blog.title?.toLowerCase().includes(query) ||
      blog.author?.toLowerCase().includes(query) ||
      blog.tags?.some((tag) => tag.toLowerCase().includes(query))
    );
  });

  const openCreateModal = () => {
    setSelectedBlog(null);
    setIsFormOpen(true);
  };

  const openEditModal = (blog) => {
    setSelectedBlog(blog);
    setIsFormOpen(true);
  };

  const openDeleteModal = (blog) => {
    setSelectedBlog(blog);
    setIsDeleteOpen(true);
  };

  return (
    <div className="p-6 bg-slate-50 min-h-screen text-slate-800">
      {/* Header View Bar */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Blog Infrastructure</h1>
          <p className="text-sm text-slate-500">Live synchronization with: kivu-back-end.onrender.com</p>
        </div>
        <button
          onClick={openCreateModal}
          className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-4 py-2.5 rounded-lg shadow-sm transition-all text-sm"
        >
          <Plus size={18} />
          Create Live Post
        </button>
      </div>

      {/* Control Filter Input */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm mb-6 flex items-center gap-2">
        <Search className="text-slate-400" size={20} />
        <input
          type="text"
          placeholder="Filter live index indexes by title, author, or tags..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full text-sm outline-none bg-transparent placeholder-slate-400"
        />
      </div>

      {/* Data Ingestion Grid Surface */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="p-12 flex flex-col items-center justify-center text-slate-500 gap-2 text-sm">
            <Loader2 className="animate-spin text-emerald-600" size={24} />
            <span>Querying active cloud indices...</span>
          </div>
        ) : filteredBlogs.length === 0 ? (
          <div className="p-12 text-center text-slate-400 text-sm">
            No live blog documents found matching runtime filters.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-slate-50/70 border-b border-slate-200 text-slate-600 font-medium">
                  <th className="p-4">Article Media Details</th>
                  <th className="p-4">Author Mapping</th>
                  <th className="p-4">Tag Arrays</th>
                  <th className="p-4">Timestamp</th>
                  <th className="p-4 text-right">Operations Matrix</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredBlogs.map((blog) => (
                  <tr key={blog._id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-4 max-w-md">
                      <div className="flex items-center gap-3">
                        <img
                          src={blog.coverImage || "/placeholder-blog.png"}
                          alt="Cover"
                          className="w-12 h-12 rounded-lg object-cover bg-slate-100 flex-shrink-0"
                        />
                        <div className="truncate">
                          <span className="font-semibold text-slate-900 block truncate">{blog.title}</span>
                          <span className="text-xs text-slate-400 line-clamp-1">{blog.summary}</span>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-slate-600">
                      <div className="flex items-center gap-1.5">
                        <User size={14} className="text-slate-400" />
                        {blog.author || "Admin Team"}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex flex-wrap gap-1 max-w-[180px]">
                        {blog.tags?.map((tag, i) => (
                          <span key={i} className="bg-slate-100 text-slate-600 text-[11px] px-2 py-0.5 rounded-md font-medium">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="p-4 text-slate-500">
                      <div className="flex items-center gap-1.5 text-xs">
                        <Calendar size={14} className="text-slate-400" />
                        {blog.createdAt ? new Date(blog.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        }) : "Draft String"}
                      </div>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => window.open(`/blog/${blog._id}`, "_blank")}
                          className="p-1.5 hover:bg-slate-100 rounded-md text-slate-500 transition-colors"
                          title="Review Layout View"
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          onClick={() => openEditModal(blog)}
                          className="p-1.5 hover:bg-amber-50 rounded-md text-amber-600 transition-colors"
                          title="Mutate Record"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => openDeleteModal(blog)}
                          className="p-1.5 hover:bg-rose-50 rounded-md text-rose-600 transition-colors"
                          title="Purge Record"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Shared Portal Modals Component Declarations */}
      {isFormOpen && (
        <BlogFormModal
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          blogData={selectedBlog}
        />
      )}

      {isDeleteOpen && (
        <DeleteConfirmModal
          isOpen={isDeleteOpen}
          onClose={() => setIsDeleteOpen(false)}
          blogId={selectedBlog?._id}
          blogTitle={selectedBlog?.title}
        />
      )}
    </div>
  );
};

export default BlogManagement;