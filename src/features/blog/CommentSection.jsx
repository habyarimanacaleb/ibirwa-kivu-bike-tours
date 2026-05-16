import React, { useState } from 'react';
import useBlogStore from '../../store/useBlogStore';
import { MessageSquare, Send, User } from 'lucide-react';

const CommentSection = ({ blogId, comments = [] }) => {
  const [commentText, setCommentText] = useState('');
  const { addComment } = useBlogStore(); 

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    const commentPayload = {
      text: commentText.trim(),
      user: "Anonymous Rider" 
    };

    addComment(blogId, commentPayload);
    setCommentText(''); // Instantly resets input text buffer
  };

  return (
    <div className="mt-16 border-t border-slate-100 pt-10">
      <h3 className="text-lg font-black text-slate-950 tracking-tight mb-6 flex items-center gap-2">
        <MessageSquare size={18} className="text-blue-600" /> Community Log Notes ({comments.length})
      </h3>

      {/* Input Field Form Container */}
      <form onSubmit={handleCommentSubmit} className="mb-10">
        <div className="relative">
          <textarea
            rows={3}
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Share your thoughts on this expedition route or setup... No sign-in required."
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
          comments.map((comment) => (
            <div 
              key={comment._id || Math.random()} 
              className="p-5 bg-slate-50/60 rounded-2xl border border-slate-100 flex items-start gap-3.5 text-sm"
            >
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center border border-slate-200 text-slate-400 flex-shrink-0 shadow-sm">
                <User size={14} />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900">{comment.user || "Anonymous Rider"}</span>
                  {comment.createdAt && (
                    <span className="text-[10px] text-slate-400">
                      {new Date(comment.createdAt).toLocaleDateString()}
                    </span>
                  )}
                </div>
                <p className="text-slate-700 leading-relaxed font-medium">{comment.text}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CommentSection;