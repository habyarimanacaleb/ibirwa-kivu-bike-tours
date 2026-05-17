import React, { useState } from 'react';
import useBlogStore from '../../store/useBlogStore';
import { MessageSquare, Send, User, MapPin } from 'lucide-react';

const CommentSection = ({ blogId, comments = [] }) => {
  const [commentText, setCommentText] = useState('');
  const [userName, setUserName] = useState('');   // 🌟 Managed on client side
  const [location, setLocation] = useState('');   // 🌟 Managed on client side
  const { addComment } = useBlogStore(); 

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    // Build identity layout parts
    const namePart = userName.trim() || "Anonymous Explorer";
    const locationPart = location.trim();

    // 🌟 Conditionally combine into a single string matching backend specification
    const calculatedUserString = locationPart 
      ? `${namePart} (${locationPart})` 
      : namePart;

    const commentPayload = {
      text: commentText.trim(),
      user: calculatedUserString // 🌟 Sent purely as a single string field
    };

    addComment(blogId, commentPayload);
    
    // Clear localized component view buffers
    setCommentText('');
    setUserName('');
    setLocation('');
  };

  // 🌟 Helper function to parse 'Name (Location)' string cleanly for rendering
  const parseUserIdentity = (userString) => {
    const defaultIdentity = { name: "Anonymous Explorer", address: "" };
    if (!userString) return defaultIdentity;

    const match = userString.match(/^(.*?)\s*\((.*?)\)$/);
    if (match) {
      return {
        name: match[1] || "Anonymous Explorer",
        address: match[2] || ""
      };
    }

    return { name: userString, address: "" };
  };

  return (
    <div className="mt-16 border-t border-slate-100 pt-10">
      <h3 className="text-lg font-black text-slate-950 tracking-tight mb-6 flex items-center gap-2">
        <MessageSquare size={18} className="text-blue-600" /> Comment / Add your idea ({comments.length})
      </h3>

      {/* Input Field Form Container */}
      <form onSubmit={handleCommentSubmit} className="mb-10 space-y-3">
        {/* Identity input boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Your Name (e.g., Caleb H.)"
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 focus:outline-none focus:border-blue-600 bg-slate-50/50 placeholder-slate-400"
          />
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Your Address / Location (e.g., Kigali, Rwanda)"
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 focus:outline-none focus:border-blue-600 bg-slate-50/50 placeholder-slate-400"
          />
        </div>

        <div className="relative">
          <textarea
            rows={3}
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Share your thoughts on this expedition route or setup..."
            className="w-full px-5 py-4 rounded-3xl border border-slate-200 text-sm font-medium text-slate-800 focus:outline-none focus:border-blue-600 bg-slate-50/50 resize-none placeholder-slate-400"
            required
          />
          <button
            type="submit"
            className="absolute bottom-4 right-4 flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white rounded-xl p-2.5 shadow-sm transition-all active:scale-95"
          >
            <Send size={14} />
          </button>
        </div>
      </form>

      {/* Render Active Comments Stream */}
      <div className="space-y-4">
        {comments.length === 0 ? (
          <p className="text-xs text-slate-400 italic">No field notes logged yet. Be the first to share entry remarks!</p>
        ) : (
          comments.map((comment) => {
            // 🌟 Parse single string value out into UI fragments
            const identity = parseUserIdentity(comment.user);

            return (
              <div 
                key={comment._id || Math.random()} 
                className="p-5 bg-slate-50/60 rounded-2xl border border-slate-100 flex items-start gap-3.5 text-sm"
              >
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center border border-slate-200 text-slate-400 flex-shrink-0 shadow-sm">
                  <User size={14} />
                </div>
                <div className="space-y-1 w-full">
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                    <span className="font-bold text-slate-900">{identity.name}</span>
                    
                    {/* 🌟 Nicely separated location indicator badge */}
                    {identity.address && (
                      <span className="inline-flex items-center gap-1 text-[11px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-md font-medium">
                        <MapPin size={10} className="text-slate-400" />
                        {identity.address}
                      </span>
                    )}

                    {comment.createdAt && (
                      <span className="text-[10px] text-slate-400 ml-auto sm:ml-0">
                        {new Date(comment.createdAt).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                  <p className="text-slate-700 leading-relaxed font-medium mt-1">{comment.text}</p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default CommentSection;