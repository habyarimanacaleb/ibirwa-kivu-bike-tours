import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MessageCircle, Heart, ArrowRight, Share2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import useBlogStore from '../store/useBlogStore';
import Navbar from '../components/Navbar';
import { Footer } from '../components/Footer';

const BlogPage = () => {
  const { blogs, fetchBlogs, isLoading, toggleLike } = useBlogStore();

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  if (isLoading && blogs.length === 0) {
    return (
      <section className="h-screen w-full flex items-center justify-center bg-white">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-12 w-48 bg-slate-100 rounded-full mb-4" />
          <p className="text-slate-400 font-black uppercase tracking-widest text-xs">Syncing Archive...</p>
        </div>
      </section>
    );
  }

  return (
    <>
    <Navbar />
    <div className='bg-black h-28 w-full'></div>
    <section className="bg-white min-h-screen pt-16 pb-20">
      <article className="max-w-7xl  mx-auto p-6">
        
        {/* Header Section */}
        <header className="mb-24  flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-3xl">
            <span className="text-blue-600 font-black uppercase tracking-[0.3em] text-[10px]">
              Expedition Logs
            </span>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-slate-900 mt-4 leading-[0.85]">
              Stories from <br /> the Saddle.
            </h1>
          </div>
          <p className="text-slate-500 font-medium max-w-xs leading-relaxed">
            Technical insights, local heritage, and the raw beauty of Rwanda—documented by our guides and riders.
          </p>
        </header>

        {/* Blog Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-20">
          {blogs.map((post, i) => (
            <motion.article 
              key={post._id || i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
              className="group"
            >
              <Link to={`/blog/${post._id}`}>
                <div className="relative aspect-[4/5] overflow-hidden rounded-[3rem] bg-slate-100 mb-8 shadow-sm">
                  <img 
                    src={post.mainImage} 
                    alt={post.title} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  
                  <div className="absolute top-6 left-6 z-10">
                    <span className="bg-white/90 backdrop-blur-md px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl text-slate-900">
                      {post.category || "Adventure"}
                    </span>
                  </div>

                  <div className="absolute inset-0 bg-blue-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center gap-6">
                    <div className="flex flex-col items-center text-white">
                       <Heart className={post.isLiked ? "fill-white" : ""} size={24} />
                       <span className="text-xs font-black mt-2">{post.likes?.length || 0}</span>
                    </div>
                    <div className="flex flex-col items-center text-white">
                       <MessageCircle size={24} />
                       <span className="text-xs font-black mt-2">{post.comments?.length || 0}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-5 text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mb-4">
                  <span className="flex items-center gap-2">
                    <Calendar size={14} className="text-blue-600" /> 
                    {new Date(post.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                  <div className="h-1 w-1 bg-slate-300 rounded-full" />
                  
                  {/* Interactive Like Button in metadata */}
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      toggleLike(post._id);
                    }}
                    className="flex items-center gap-2 hover:text-red-500 transition-colors"
                  >
                    <Heart 
                      size={14} 
                      className={post.isLiked ? "fill-red-500 text-red-500" : "group-hover:text-red-500"} 
                    /> 
                    {post.likes?.length || 0}
                  </button>
                </div>

                <h3 className="text-3xl font-black text-slate-900 group-hover:text-blue-600 transition-colors leading-tight mb-4 tracking-tighter">
                  {post.title}
                </h3>
                
                <p className="text-slate-500 line-clamp-2 text-sm font-medium mb-6 leading-relaxed">
                   {post.excerpt || (post.content && post.content.substring(0, 100) + "...")}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-blue-600 font-black uppercase text-[10px] tracking-[0.3em] group-hover:gap-4 transition-all">
                    View Log <ArrowRight size={14} />
                  </div>
                  <button className="text-slate-300 hover:text-blue-600 transition-colors">
                    <Share2 size={16} />
                  </button>
                </div>
              </Link>
            </motion.article>
          ))}
        </section>
      </article>
    </section>
    <Footer />
    </>
  );
};

export default BlogPage;