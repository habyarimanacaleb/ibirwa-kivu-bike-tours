import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, MessageCircle, Heart, Share2, Map, ShieldCheck } from 'lucide-react';
import useBlogStore from '../store/useBlogStore';
import Navbar from '../components/Navbar';
import { Footer } from '../components/Footer';

const BlogDetails = () => {
  const { id } = useParams();
  const { currentBlog, fetchBlogById, clearCurrentBlog, toggleLike, isLoading } = useBlogStore();

  useEffect(() => {
    fetchBlogById(id);
    return () => clearCurrentBlog();
  }, [id, fetchBlogById, clearCurrentBlog]);

  if (isLoading || !currentBlog) {
    return (
      <section className="h-screen flex items-center justify-center bg-white">
        <div className="animate-pulse text-slate-400 font-black tracking-widest uppercase text-xs">Retrieving Log Entry...</div>
      </section>
    );
  }

  return (
    <>
    <Navbar />
    <div className='bg-black h-20 w-full'></div>
    <section className="bg-white min-h-screen pb-20">
      {/* Hero Section */}
      <div className="relative h-[65vh] w-full overflow-hidden">
        <img src={currentBlog.mainImage} className="w-full h-full object-cover" alt={currentBlog.title} />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-black/30" />
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-16">
          <div className="max-w-7xl mx-auto">
            <Link to="/blogs" className="flex items-center gap-2 text-slate-900 font-black text-[10px] uppercase tracking-[0.3em] mb-6 hover:gap-4 transition-all">
              <ArrowLeft size={16}/> Back to Archive
            </Link>
            <h1 className="text-5xl md:text-8xl font-black text-slate-900 tracking-tighter leading-none max-w-5xl">
              {currentBlog.title}
            </h1>
          </div>
        </div>
      </div>

      <section className="max-w-7xl mx-auto px-6 mt-20">
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Article Main */}
          <article className="lg:col-span-8">
            <p className="text-2xl text-slate-600 leading-relaxed font-medium mb-12 italic border-l-4 border-blue-600 pl-8">
              {currentBlog.excerpt}
            </p>
            
            <div className="text-slate-800 leading-loose space-y-8 text-lg font-medium">
              {currentBlog.content}
            </div>

            {/* Expedition Gallery Grid */}
            <div className="mt-24">
              <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600 mb-12">Expedition Visuals</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {currentBlog.gallery?.map((img, i) => (
                  <motion.div 
                    key={i} 
                    whileHover={{ scale: 1.02 }}
                    className={`rounded-[3rem] overflow-hidden shadow-2xl ${i === 0 ? 'md:col-span-2 aspect-video' : 'aspect-square'}`}
                  >
                    <img src={img} className="w-full h-full object-cover" alt={`Log Detail ${i}`} />
                  </motion.div>
                ))}
              </div>
            </div>
          </article>

          {/* Sidebar */}
          <article className="lg:col-span-4">
            <section className="sticky top-32 space-y-8">
              <section className="p-10 rounded-[3rem] bg-slate-50 border border-slate-100 shadow-sm">
                <h4 className="font-black uppercase tracking-widest text-[10px] text-blue-600 mb-8">Verification Data</h4>
                <article className="space-y-8">
                   <header className="flex items-center gap-5">
                      <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-sm"><Calendar size={20} className="text-blue-600"/></div>
                      <div><p className="text-[9px] font-black uppercase text-slate-400">Date Logged</p><p className="font-bold text-slate-900">{new Date(currentBlog.createdAt).toLocaleDateString()}</p></div>
                   </header>
                   <section className="flex items-center gap-5">
                      <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-sm"><Map size={20} className="text-blue-600"/></div>
                      <div><p className="text-[9px] font-black uppercase text-slate-400">Terrain</p><p className="font-bold text-slate-900">Kivu Belt, Western Rwanda</p></div>
                   </section>
                   <section className="flex items-center gap-5">
                      <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-sm"><ShieldCheck size={20} className="text-blue-600"/></div>
                      <div><p className="text-[9px] font-black uppercase text-slate-400">Authored By</p><p className="font-bold text-slate-900">Ibirwa Kivu Ltd Team</p></div>
                   </section>
                </article>

                <article className="mt-12 pt-10 border-t border-slate-200 flex justify-between items-center">
                  <button 
                    onClick={() => toggleLike(currentBlog._id)} 
                    className="flex items-center gap-3 font-black text-xs uppercase tracking-widest group"
                  >
                    <Heart className={`transition-all ${currentBlog.isLiked ? "fill-red-500 text-red-500 scale-125" : "group-hover:text-red-500"}`} size={22} /> 
                    {currentBlog.likes?.length || 0} Likes
                  </button>
                  <Share2 size={20} className="text-slate-300 hover:text-blue-600 cursor-pointer transition-colors" />
                </article>
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