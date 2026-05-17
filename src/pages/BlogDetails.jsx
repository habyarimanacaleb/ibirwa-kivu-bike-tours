import React, { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { 
  Calendar, 
  User, 
  Tag, 
  Heart, 
  Clock, 
  Compass, 
  ChevronRight, 
  Share2, 
  ArrowLeft,
  CheckCircle,
  Hash,
  Menu,
  Image as ImageIcon,
  X,
  ChevronLeft
} from "lucide-react";
import useBlogStore from "../store/useBlogStore";
import CommentSection from "../features/blog/CommentSection";

const BlogDetail = () => {
  const { id } = useParams();
  const { blogs, isLoading, fetchBlogs, toggleLike } = useBlogStore();
  const [copied, setCopied] = useState(false);
  
  // Scrolling progress tracking indicators
  const [scrollProgress, setScrollProgress] = useState(0);
  const [headings, setHeadings] = useState([]);
  const contentRef = useRef(null);

  // 🌟 Gallery Lightbox State Tracking Nodes
  const [activeImageIndex, setActiveImageIndex] = useState(null);

  useEffect(() => {
    if (!blogs || blogs.length === 0) {
      fetchBlogs();
    }
  }, [blogs, fetchBlogs]);

  // Dynamic Scroll Progress Bar Calculation
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(progress);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Find exact active record document
  const blog = blogs?.find((item) => item._id === id);

  // Dynamic Table of Contents Heading Parser
  useEffect(() => {
    if (blog?.content) {
      const lines = blog.content.split("\n");
      const extractedHeadings = lines
        .filter(line => line.trim().startsWith("###"))
        .map((line) => {
          const text = line.replace("###", "").trim();
          const safeId = text.toLowerCase().replace(/[^a-z0-9]+/g, "-");
          return { id: safeId, text };
        });
      setHeadings(extractedHeadings);
    }
  }, [blog]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center text-slate-500 text-sm gap-3">
        <div className="w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
        <span className="font-medium tracking-wide">Mapping Kivu Expedition Logs...</span>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center max-w-sm shadow-sm">
          <Compass className="text-slate-300 mx-auto mb-4" size={44} />
          <h2 className="text-base font-bold text-slate-900 mb-1">Route Log Missing</h2>
          <p className="text-xs text-slate-500 mb-6">The requested index marker could not be resolved in our coordinates.</p>
          <Link to="/blogs" className="inline-flex items-center gap-2 text-xs font-semibold bg-emerald-600 text-white px-4 py-2 rounded-xl hover:bg-emerald-700 transition-colors">
            <ArrowLeft size={14} /> Back to Directory
          </Link>
        </div>
      </div>
    );
  }

  const wordCount = blog.content ? blog.content.split(/\s+/).length : 0;
  const readingTime = Math.max(1, Math.ceil(wordCount / 225));

  // Safe fallback list configuration array mapping if blog.gallery contains zero components
  const displayGallery = blog.gallery && blog.gallery.length > 0 ? blog.gallery : [];

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const getCategoryColor = (cat) => {
    switch (cat) {
      case "Technical": return "bg-blue-50 text-blue-700 border-blue-200";
      case "Culture": return "bg-amber-50 text-amber-700 border-amber-200";
      case "Eco": return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "Safety": return "bg-rose-50 text-rose-700 border-rose-200";
      case "Nature": return "bg-teal-50 text-teal-700 border-teal-200";
      case "Geology": return "bg-orange-50 text-orange-700 border-orange-200";
      default: return "bg-slate-50 text-slate-700 border-slate-200";
    }
  };

  const scrollToAnchor = (idString) => {
    const element = document.getElementById(idString);
    if (element) {
      const yOffset = -90; 
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  // Lightbox navigational functions
  const nextLightboxImage = (e) => {
    e.stopPropagation();
    setActiveImageIndex((prev) => (prev + 1) % displayGallery.length);
  };

  const prevLightboxImage = (e) => {
    e.stopPropagation();
    setActiveImageIndex((prev) => (prev - 1 + displayGallery.length) % displayGallery.length);
  };

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20 selection:bg-emerald-100 selection:text-emerald-900 relative">
      
      {/* STICKY TOP SCROLL PROGRESS INDICATOR BAR */}
      <div className="fixed top-0 left-0 right-0 h-3 bg-slate-100 z-50 overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-emerald-500 via-teal-500 to-blue-600 transition-all duration-75 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Structural Navigation Breadcrumb Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-medium text-slate-500 mb-6 bg-white px-4 py-2.5 rounded-xl border border-slate-200/60 shadow-sm">
          <div className="flex items-center gap-2">
            <Link to="/" className="hover:text-emerald-600 transition-colors">Hub</Link>
            <ChevronRight size={12} className="text-slate-300" />
            <Link to="/blogs" className="hover:text-emerald-600 transition-colors">Expedition Logs</Link>
            <ChevronRight size={12} className="text-slate-300" />
            <span className="text-slate-800 font-semibold truncate max-w-[200px] sm:max-w-xs">{blog.title}</span>
          </div>
          <Link to="/blogs" className="inline-flex items-center gap-1.5 hover:text-emerald-600 font-semibold text-slate-700 transition-colors">
            <ArrowLeft size={12} /> Return to Map Index
          </Link>
        </div>
      </div>

      {/* Main Core View Grid Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: Main Editorial Content Stream (8 Cols) */}
        <div className="lg:col-span-8 space-y-6">
          <article className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-sm">
            
            {/* Header Metadata Frame Elements */}
            <div className="p-6 sm:p-8 border-b border-slate-100 bg-gradient-to-b from-slate-50/50 to-transparent">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className={`px-2.5 py-0.5 rounded-md text-xs font-bold uppercase tracking-wider border ${getCategoryColor(blog.category)}`}>
                  {blog.category || "Technical"}
                </span>
                <div className="flex items-center gap-1.5 text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md font-medium">
                  <Clock size={12} />
                  <span>{readingTime} min read</span>
                </div>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-tight mb-4">
                {blog.title}
              </h1>

              <p className="text-slate-500 text-sm sm:text-base font-medium leading-relaxed mb-6 border-l-2 border-emerald-500 pl-4 italic">
                {blog.excerpt}
              </p>

              {/* Author and Date Meta Profile Segment */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200 font-bold text-slate-700 shadow-sm">
                    {blog.author ? blog.author.charAt(0).toUpperCase() : "A"}
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-slate-900">{blog.author || "Admin Team"}</span>
                    <span className="text-[11px] text-slate-400 font-medium flex items-center gap-1 mt-0.5">
                      <Calendar size={11} /> 
                      {blog.createdAt ? new Date(blog.createdAt).toLocaleDateString("en-US", {
                        year: "numeric", month: "short", day: "numeric"
                      }) : "Draft Entry"}
                    </span>
                  </div>
                </div>

                {/* Social Interaction Tools */}
                <div className="flex items-center gap-1 bg-slate-50 p-1.5 border border-slate-200/60 rounded-xl shadow-inner">
                  <button 
                    onClick={() => toggleLike(blog._id)}
                    className="p-2 hover:bg-white rounded-lg text-rose-600 transition-colors flex items-center gap-1"
                    title="Toggle Log Validation"
                  >
                    <Heart size={15} fill={blog.likes?.length > 0 ? "currentColor" : "none"} />
                    <span className="text-xs font-bold text-slate-700">{blog.likes?.length || 0}</span>
                  </button>
                  <div className="h-4 w-[1px] bg-slate-200 self-center"></div>
                  <button 
                    onClick={handleShare}
                    className={`p-2 rounded-lg transition-colors flex items-center gap-1 ${copied ? 'text-emerald-600 bg-white shadow-sm' : 'text-slate-500 hover:bg-white'}`}
                    title="Copy Route Payload Link"
                  >
                    {copied ? <CheckCircle size={15} /> : <Share2 size={15} />}
                  </button>
                </div>
              </div>
            </div>

            {/* Core Wide Banner Asset Canvas Slot */}
            <div className="relative aspect-[16/9] w-full bg-slate-100 border-b border-slate-100">
              <img 
                src={blog.mainImage || "/placeholder-blog.png"} 
                alt={blog.title} 
                className="w-full h-full object-cover select-none"
              />
            </div>

            {/* Primary Body Content Body Canvas */}
            <div className="p-6 sm:p-8 prose prose-slate max-w-none" ref={contentRef}>
              <div className="text-slate-800 text-sm sm:text-base leading-relaxed space-y-6 font-medium whitespace-pre-wrap">
                {blog.content ? (
                  blog.content.split("\n").map((line, index) => {
                    if (line.trim().startsWith("###")) {
                      const cleanText = line.replace("###", "").trim();
                      const safeId = cleanText.toLowerCase().replace(/[^a-z0-9]+/g, "-");
                      return (
                        <h3 key={index} id={safeId} className="text-lg sm:text-xl font-bold text-slate-900 pt-4 tracking-tight flex items-center gap-2 scroll-mt-24">
                          <span className="w-1.5 h-4 bg-emerald-500 rounded-sm inline-block"></span>
                          {cleanText}
                        </h3>
                      );
                    }
                    return <p key={index}>{line}</p>;
                  })
                ) : (
                  <p className="text-slate-400 italic">No entry telemetry content available.</p>
                )}
              </div>
            </div>

            {/* Lower Document Metatag Arrays */}
            {blog.tags && blog.tags.length > 0 && (
              <div className="px-6 sm:px-8 pb-8 pt-4 border-t border-slate-50 flex flex-wrap items-center gap-1.5">
                <div className="text-slate-400 font-bold text-xs flex items-center gap-1 mr-1.5 uppercase tracking-wider">
                  <Tag size={12} /> Index Tokens:
                </div>
                {blog.tags.map((tag, i) => (
                  <span key={i} className="inline-flex items-center bg-slate-50 border border-slate-200 text-slate-600 px-2.5 py-1 rounded-lg text-xs font-semibold hover:border-slate-300 transition-colors cursor-default">
                    <Hash size={10} className="text-slate-400" />
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </article>

          {/* 🌟 UPGRADED PACKAGED EXPEDITION GALLERY SLATE GRID */}
          {displayGallery.length > 0 && (
            <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                  <ImageIcon size={16} className="text-emerald-600" /> Capture Field Files
                </h3>
                <span className="text-[11px] font-bold text-slate-400 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-100">
                  {displayGallery.length} Positions Captured
                </span>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {displayGallery.map((imgUrl, idx) => (
                  <div 
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className="group relative aspect-square rounded-xl overflow-hidden bg-slate-100 border border-slate-200 cursor-pointer shadow-sm"
                  >
                    <div className="absolute inset-0 bg-slate-950/0 group-hover:bg-slate-950/30 transition-colors duration-300 z-10 flex items-center justify-center">
                      <Compass size={20} className="text-white opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 transform" />
                    </div>
                    <img 
                      src={imgUrl} 
                      alt={`Expedition context visualization ${idx + 1}`}
                      className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: Informative Sticky Navigation Widgets Panel (4 Cols) */}
        <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-6">
          
          {/* DYNAMIC CONTENT TABLE OF CONTENTS WIDGET CARD */}
          {headings.length > 0 && (
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
              <h2 className="text-xs font-black text-slate-400 tracking-widest uppercase flex items-center gap-1.5 pb-2.5 border-b border-slate-100 mb-3">
                <Menu size={13} className="text-emerald-600" /> Navigation Anchors
              </h2>
              <nav className="space-y-1">
                {headings.map((heading, i) => (
                  <button
                    key={i}
                    onClick={() => scrollToAnchor(heading.id)}
                    className="w-full text-left flex items-start gap-2 p-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-emerald-700 hover:bg-slate-50 transition-all group"
                  >
                    <span className="text-slate-300 group-hover:text-emerald-400 font-mono">0{i+1}.</span>
                    <span className="truncate">{heading.text}</span>
                  </button>
                ))}
              </nav>
            </div>
          )}

          {/* Informative Details Metric Frame Card */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
            <h2 className="text-xs font-black text-slate-400 tracking-widest uppercase flex items-center gap-1.5 pb-2 border-b border-slate-100">
              <Compass size={13} className="text-slate-400" /> Expedition Metrics
            </h2>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-center">
                <span className="block text-[10px] uppercase font-bold text-slate-400">Word Load</span>
                <span className="text-base font-black text-slate-900 mt-0.5 block">{wordCount}</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-center">
                <span className="block text-[10px] uppercase font-bold text-slate-400">Total Validations</span>
                <span className="text-base font-black text-rose-600 mt-0.5 block">{blog.likes?.length || 0} ♥</span>
              </div>
            </div>
          </div>

          {/* Linked Routes Nearby Reference Card */}
          {blog.toursNearby && blog.toursNearby.length > 0 && (
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
              <h2 className="text-xs font-black text-slate-400 tracking-widest uppercase flex items-center gap-1.5 pb-3 border-b border-slate-100 mb-3">
                <Compass size={13} className="text-emerald-600" /> Linked Routes Nearby
              </h2>
              <div className="space-y-2.5">
                {blog.toursNearby.map((tour, index) => (
                  <Link 
                    key={tour._id || index} 
                    to={`/tours/${tour._id || tour}`} 
                    className="group flex items-center justify-between p-3 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-emerald-50/40 hover:border-emerald-100 transition-all text-xs font-semibold text-slate-800"
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <div className="w-6 h-6 rounded-md bg-emerald-50 group-hover:bg-emerald-100 flex items-center justify-center text-emerald-700 text-[10px] font-bold flex-shrink-0 transition-colors">
                        0{index + 1}
                      </div>
                      <span className="truncate group-hover:text-emerald-950 transition-colors">
                        {tour.title || `Excursion Waypoint Pointer ${index + 1}`}
                      </span>
                    </div>
                    <ChevronRight size={14} className="text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-all flex-shrink-0" />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Brand/Theme Card Block */}
          <div className="relative rounded-2xl overflow-hidden aspect-[4/3] border border-slate-200 bg-slate-900 group shadow-sm select-none">
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent z-10"></div>
            <img 
              src={blog.mainImage || "/placeholder-blog.png"} 
              alt="Decorative Framing Background" 
              className="absolute inset-0 w-full h-full object-cover filter brightness-95 contrast-105 group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute bottom-4 left-4 right-4 z-20 text-white">
              <span className="text-[9px] uppercase font-bold tracking-widest text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-2 py-0.5 rounded-md inline-block mb-1">Kivu Horizon Hub</span>
              <h4 className="text-sm font-extrabold tracking-tight">Ready to see these coordinates live?</h4>
              <p className="text-[10px] text-slate-300 font-medium leading-relaxed mt-0.5">Book field support and boat charters directly via our central reservation nodes.</p>
            </div>
          </div>
        </aside>
      </div>

      {/* Isolated Comments Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 grid grid-cols-1 lg:grid-cols-12">
        <div className="lg:col-span-8 bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-sm">
          <CommentSection blogId={blog._id} comments={blog.comments} />
        </div>
      </div>

      {/* 🌟 LIGHTBOX MODAL OVERLAY PORTAL SCREEN SLIDER */}
      {activeImageIndex !== null && (
        <div 
          className="fixed inset-0 bg-slate-950/95 backdrop-blur-sm z-[100] flex flex-col items-center justify-center p-4 animate-fade-in transition-all selection:bg-transparent"
          onClick={() => setActiveImageIndex(null)}
        >
          {/* Top Info HUD Header string */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-white text-xs font-semibold select-none z-10">
            <span className="bg-slate-900/80 border border-slate-800 px-3 py-1.5 rounded-xl backdrop-blur-md">
              Marker Matrix File: {activeImageIndex + 1} / {displayGallery.length}
            </span>
            <button 
              onClick={() => setActiveImageIndex(null)}
              className="p-2 bg-slate-900/80 border border-slate-800 rounded-xl text-slate-300 hover:text-white transition-colors backdrop-blur-md"
            >
              <X size={18} />
            </button>
          </div>

          {/* Interactive Image Target Slider Canvas Frame Container */}
          <div className="relative max-w-5xl w-full aspect-auto max-h-[80vh] flex items-center justify-center select-none">
            
            {/* Prev Trigger Button */}
            {displayGallery.length > 1 && (
              <button 
                onClick={prevLightboxImage}
                className="absolute left-2 sm:-left-6 p-2.5 rounded-full bg-slate-950/60 hover:bg-slate-900 text-white border border-slate-800/80 shadow-md backdrop-blur-sm transition-all transform hover:-translate-x-0.5 z-20"
              >
                <ChevronLeft size={22} />
              </button>
            )}

            <img 
              src={displayGallery[activeImageIndex]} 
              alt="High definition target waypoint overview map focus view" 
              className="max-w-full max-h-[75vh] object-contain rounded-xl border border-slate-800/40 shadow-2xl animate-scale-up"
              onClick={(e) => e.stopPropagation()}
            />

            {/* Next Trigger Button */}
            {displayGallery.length > 1 && (
              <button 
                onClick={nextLightboxImage}
                className="absolute right-2 sm:-right-6 p-2.5 rounded-full bg-slate-950/60 hover:bg-slate-900 text-white border border-slate-800/80 shadow-md backdrop-blur-sm transition-all transform hover:translate-x-0.5 z-20"
              >
                <ChevronRight size={22} />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogDetail;