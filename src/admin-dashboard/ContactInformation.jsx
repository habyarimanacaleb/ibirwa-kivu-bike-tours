import React, { useState, useEffect } from "react";
import { Mail, MessageSquare, CheckCircle, Trash2, Search, Calendar, User, ExternalLink } from "lucide-react";
import useContactStore from "../store/useContactStore";
import MainLayout from "../admin-panel/MainLayout";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns"; // Recommended for professional date handling

const ContactInformation = () => {
  const { contacts, isLoading, fetchContacts, respondToContact, deleteContact } = useContactStore();
  const [responseMessage, setResponseMessage] = useState("");
  const [selectedContact, setSelectedContact] = useState(null);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => { fetchContacts(); }, [fetchContacts]);

  const filteredContacts = contacts.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          c.email.toLowerCase().includes(searchTerm.toLowerCase());
    if (filter === "new") return !c.responded && matchesSearch;
    if (filter === "responded") return c.responded && matchesSearch;
    return matchesSearch;
  });

  const handleResponseSubmit = async (e) => {
    e.preventDefault();
    const result = await respondToContact(selectedContact._id, responseMessage);
    if (result.success) {
      setResponseMessage("");
      setSelectedContact(null);
      // Optional: Add a success toast call here
    }
  };

  return (
    <MainLayout>
      <div className="p-6 bg-[#FDFDFF] min-h-screen font-sans">
        
        {/* --- SMART HEADER --- */}
        <div className="flex flex-col lg:flex-row justify-between items-end mb-10 gap-6">
          <div className="w-full lg:w-auto">
            <h1 className="text-4xl font-black text-slate-900 tracking-tight flex items-center gap-3">
              Inbox <span className="text-blue-600 bg-blue-50 px-3 py-1 rounded-2xl text-sm italic">CRM v2.0</span>
            </h1>
            <div className="flex items-center gap-4 mt-2">
              <p className="text-slate-500 font-medium">Customer Relations Manager</p>
              <div className="h-1 w-1 bg-slate-300 rounded-full" />
              <button onClick={() => fetchContacts()} className="text-blue-600 text-xs font-bold hover:underline">Refresh Feed</button>
            </div>
          </div>
          
          {/* Actionable Stats */}
          <div className="flex gap-3 w-full lg:w-auto overflow-x-auto pb-2 lg:pb-0">
             <StatCard label="Total" count={contacts.length} color="slate" />
             <StatCard label="Pending" count={contacts.filter(c => !c.responded).length} color="orange" pulse />
             <StatCard label="Resolved" count={contacts.filter(c => c.responded).length} color="emerald" />
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
          
          {/* --- MESSAGES SECTION --- */}
          <div className="xl:col-span-7 space-y-6">
            
            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-grow group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-500 transition-colors" size={18} />
                <input 
                  type="text" 
                  placeholder="Filter by name or email..."
                  className="w-full pl-12 pr-4 py-4 bg-white rounded-3xl border-2 border-transparent focus:border-blue-100 focus:ring-4 focus:ring-blue-50/50 shadow-sm transition-all"
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex bg-slate-100 p-1.5 rounded-3xl self-start">
                {['all', 'new', 'responded'].map((t) => (
                  <button
                    key={t}
                    onClick={() => setFilter(t)}
                    className={`px-5 py-2.5 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all ${
                      filter === t ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Message Cards */}
            <div className="space-y-4">
              <AnimatePresence mode="popLayout">
                {filteredContacts.map((contact) => (
                  <motion.div
                    layout
                    key={contact._id}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    onClick={() => setSelectedContact(contact)}
                    className={`relative p-6 rounded-[2rem] border-2 transition-all cursor-pointer group ${
                      selectedContact?._id === contact._id 
                        ? "bg-white border-blue-500 shadow-2xl ring-8 ring-blue-50/30 z-10" 
                        : "bg-white border-slate-50 shadow-sm hover:shadow-xl hover:border-blue-100"
                    }`}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${
                          contact.responded ? "bg-slate-50 text-slate-400" : "bg-blue-600 text-white shadow-lg shadow-blue-200"
                        }`}>
                          <User size={20} />
                        </div>
                        <div>
                          <h2 className="font-black text-slate-900 flex items-center gap-2">
                            {contact.name}
                            {!contact.responded && <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" />}
                          </h2>
                          <div className="flex items-center gap-2 text-[10px] text-slate-400 font-bold uppercase tracking-tighter">
                            <Calendar size={12} /> {contact.createdAt ? format(new Date(contact.createdAt), "MMM dd, yyyy") : "Recently"}
                          </div>
                        </div>
                      </div>
                      
                      <button 
                        onClick={(e) => { e.stopPropagation(); deleteContact(contact._id); }}
                        className="opacity-0 group-hover:opacity-100 p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>

                    <div className="bg-slate-50/50 p-5 rounded-2xl border border-slate-50 text-slate-600 text-sm leading-relaxed mb-4">
                      {contact.message}
                    </div>

                    <div className="flex justify-between items-center text-[11px] font-black uppercase tracking-widest">
                      <span className="text-slate-400">{contact.email}</span>
                      {contact.responded ? (
                        <span className="flex items-center gap-1.5 text-emerald-600 bg-emerald-50 px-3 py-1 rounded-lg">
                          <CheckCircle size={14} /> Resolved
                        </span>
                      ) : (
                        <span className="text-blue-600 flex items-center gap-1">
                          Reply Pending <ExternalLink size={12} />
                        </span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* --- REPLY CONTEXT PANEL --- */}
          <div className="xl:col-span-5">
            <div className="sticky top-8">
              <AnimatePresence mode="wait">
                {selectedContact ? (
                  <motion.div
                    key={selectedContact._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-slate-900 rounded-[3rem] p-10 text-white shadow-2xl relative overflow-hidden"
                  >
                    {/* Decorative Background Blob */}
                    <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-600/20 blur-[100px] rounded-full pointer-events-none" />
                    
                    <div className="relative z-10">
                      <div className="mb-8">
                        <h3 className="text-3xl font-black tracking-tight leading-none mb-2">Send Response</h3>
                        <p className="text-slate-400 text-sm">Direct email to {selectedContact.email}</p>
                      </div>

                      <form onSubmit={handleResponseSubmit} className="space-y-6">
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-blue-400">Your Message</label>
                          <textarea
                            value={responseMessage}
                            onChange={(e) => setResponseMessage(e.target.value)}
                            className="w-full bg-slate-800/50 border-2 border-slate-800 focus:border-blue-500 p-6 rounded-3xl text-white min-h-[350px] resize-none transition-all placeholder:text-slate-600"
                            placeholder={`Hi ${selectedContact.name.split(' ')[0]}, thank you for reaching out to Ibirwa Kivu...`}
                            required
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <button
                            type="submit"
                            disabled={isLoading}
                            className="bg-blue-600 text-white font-black uppercase tracking-widest text-xs py-5 rounded-2xl hover:bg-blue-500 transition-all shadow-xl shadow-blue-900/40 flex items-center justify-center gap-3 disabled:opacity-50"
                          >
                            {isLoading ? "Sending..." : "Send Reply"} <Send size={16} />
                          </button>
                          <button
                            type="button"
                            onClick={() => setSelectedContact(null)}
                            className="bg-white/5 border border-white/10 text-white font-black uppercase tracking-widest text-xs py-5 rounded-2xl hover:bg-white/10 transition-all"
                          >
                            Close
                          </button>
                        </div>
                      </form>
                    </div>
                  </motion.div>
                ) : (
                  <div className="bg-white rounded-[3rem] border-2 border-dashed border-slate-100 p-20 text-center shadow-sm">
                    <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                      <MessageSquare size={40} className="text-slate-200" />
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 mb-2">No Active Thread</h3>
                    <p className="text-slate-400 text-sm leading-relaxed max-w-[200px] mx-auto">Select a customer inquiry from the list to start a conversation.</p>
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

// Helper Component for Stats
const StatCard = ({ label, count, color, pulse }) => {
  const colors = {
    slate: "text-slate-600 bg-slate-50",
    orange: "text-orange-600 bg-orange-50",
    emerald: "text-emerald-600 bg-emerald-50",
  };
  return (
    <div className={`flex flex-col min-w-[120px] p-4 rounded-3xl border border-slate-100 ${colors[color]}`}>
      <div className="flex items-center gap-2 mb-1">
        {pulse && <div className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />}
        <span className="text-[10px] font-black uppercase tracking-widest opacity-70">{label}</span>
      </div>
      <span className="text-2xl font-black">{count}</span>
    </div>
  );
};

export default ContactInformation;