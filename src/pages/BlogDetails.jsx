import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Calendar,
  Heart,
  Share2,
  Map,
  ShieldCheck,
  Loader2,
} from "lucide-react";
import useBlogStore from "../store/useBlogStore";
import Navbar from "../components/Navbar";
import { Footer } from "../components/Footer";
import CommentSection from "../features/blog/CommentSection";

const BlogDetails = () => {
  const { id } = useParams();
  const {
    currentBlog,
    fetchBlogById,
    clearCurrentBlog,
    toggleLike,
    isLoading,
  } = useBlogStore();

  useEffect(() => {
    fetchBlogById(id);
    return () => clearCurrentBlog();
  }, [id, fetchBlogById, clearCurrentBlog]);

  if (isLoading || !currentBlog) {
    return (
      <section className="h-screen flex flex-col items-center justify-center bg-white gap-3">
        <Loader2 className="animate-spin text-blue-600" size={28} />
        <div className="text-slate-400 font-black tracking-widest uppercase text-xs">
          Retrieving Log Entry...
        </div>
      </section>
    );
  }

  return (
    <>
      <Navbar />
      <div className="bg-black h-20 w-full"></div>
      <section className="bg-white min-h-screen pb-20">
        {/* Hero Banner Area */}
        <div className="relative h-[65vh] w-full overflow-hidden">
          <img
            src={currentBlog.coverImage || "/placeholder-blog.png"}
            className="w-full h-full object-cover"
            alt={currentBlog.title}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-black/30" />
          <div className="absolute bottom-0 left-0 w-full p-6 md:p-16">
            <div className="max-w-7xl mx-auto">
              <Link
                to="/blogs"
                className="flex items-center gap-2 text-slate-900 font-black text-[10px] uppercase tracking-[0.3em] mb-6 hover:gap-4 transition-all w-fit"
              >
                <ArrowLeft size={16} /> Back to Archive
              </Link>
              <h1 className="text-4xl md:text-7xl font-black text-slate-900 tracking-tighter leading-none max-w-5xl">
                {currentBlog.title}
              </h1>
            </div>
          </div>
        </div>

        {/* Content Presentation Layer */}
        <section className="max-w-7xl mx-auto px-6 mt-20">
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* Article Main Text Core */}
            <article className="lg:col-span-8">
              <p className="text-xl md:text-2xl text-slate-600 leading-relaxed font-medium mb-12 italic border-l-4 border-blue-600 pl-8">
                {currentBlog.summary}
              </p>

              <div className="text-slate-800 leading-loose space-y-8 text-lg font-medium whitespace-pre-line">
                {currentBlog.content}
              </div>

              {/* Dynamic Tag Injector Grid */}
              {currentBlog.tags && currentBlog.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-12">
                  {currentBlog.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="bg-slate-100 text-slate-600 font-bold text-xs px-3 py-1.5 rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Expedition Visual Gallery */}
              {currentBlog.gallery && currentBlog.gallery.length > 0 && (
                <div className="mt-24">
                  <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600 mb-12">
                    Expedition Visuals
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {currentBlog.gallery.map((img, i) => (
                      <motion.div
                        key={i}
                        whileHover={{ scale: 1.01 }}
                        className={`rounded-[2.5rem] overflow-hidden shadow-xl ${i === 0 ? "md:col-span-2 aspect-video" : "aspect-square"}`}
                      >
                        <img
                          src={img}
                          className="w-full h-full object-cover"
                          alt={`Log Snapshot Details ${i}`}
                        />
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Integrated Comment Submission Area */}
              <CommentSection
                blogId={currentBlog._id}
                comments={currentBlog.comments}
              />
            </article>

            {/* Verification Metadata Sidebar Panel */}
            <article className="lg:col-span-4">
              <section className="sticky top-32 space-y-8">
                <section className="p-10 rounded-[3rem] bg-slate-50 border border-slate-100 shadow-sm">
                  <h4 className="font-black uppercase tracking-widest text-[10px] text-blue-600 mb-8">
                    Verification Data
                  </h4>

                  <div className="space-y-8 text-sm">
                    <div className="flex items-center gap-5">
                      <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-sm">
                        <Calendar size={20} className="text-blue-600" />
                      </div>
                      <div>
                        <p className="text-[9px] font-black uppercase text-slate-400">
                          Date Logged
                        </p>
                        <p className="font-bold text-slate-900">
                          {currentBlog.createdAt
                            ? new Date(
                                currentBlog.createdAt,
                              ).toLocaleDateString()
                            : "Live Draft"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-5">
                      <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-sm">
                        <Map size={20} className="text-blue-600" />
                      </div>
                      <div>
                        <p className="text-[9px] font-black uppercase text-slate-400">
                          Terrain
                        </p>
                        <p className="font-bold text-slate-900">
                          Kivu Belt, Western Rwanda
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-5">
                      <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-sm">
                        <ShieldCheck size={20} className="text-blue-600" />
                      </div>
                      <div>
                        <p className="text-[9px] font-black uppercase text-slate-400">
                          Authored By
                        </p>
                        <p className="font-bold text-slate-900">
                          {currentBlog.author || "Ibirwa Kivu Ltd Team"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Actions Bar Footer Area */}
                  <div className="mt-12 pt-10 border-t border-slate-200 flex justify-between items-center">
                    <button
                      onClick={() => toggleLike(currentBlog._id)}
                      className="flex items-center gap-3 font-black text-xs uppercase tracking-widest group text-slate-700"
                    >
                      <Heart
                        className={`transition-all ${
                          // Fallback check: Checks if local user signature is explicitly present inside backend likes array indices
                          currentBlog.isLiked ||
                          currentBlog.likes?.includes("current_user")
                            ? "fill-red-500 text-red-500 scale-110"
                            : "group-hover:text-red-500"
                        }`}
                        size={22}
                      />
                      {currentBlog.likes?.length || 0} Likes
                    </button>
                    <Share2
                      size={20}
                      className="text-slate-300 hover:text-blue-600 cursor-pointer transition-colors"
                    />
                  </div>
                </section>
              </section>
            </article>
          </section>
        </section>
      </section>
      <Footer />
    </>
  );
};

export default BlogDetails;
