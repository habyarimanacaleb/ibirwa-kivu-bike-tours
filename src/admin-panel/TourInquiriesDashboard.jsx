import React, { useEffect } from "react";
import { Users, Calendar, MapPin, Send, Trash2, MessageSquare, CheckCircle, Plane, Briefcase, Clock } from "lucide-react";
import useInquiryStore from "../store/useInquiryStore";
import MainLayout from "./MainLayout";
import { motion, AnimatePresence } from "framer-motion";

const TourInquiriesDashboard = () => {
  // Pull state and actions directly from the store
  const { 
    inquiries, 
    isLoading, 
    selectedInquiry, 
    responseMessage,
    fetchInquiries, 
    handleDelete, 
    handleRespond,
    setSelectedInquiry,
    setResponseMessage
  } = useInquiryStore();

  useEffect(() => {
    fetchInquiries();
  }, [fetchInquiries]);

  // Handler for sending responses
  const handleSendResponse = async () => {
    // Validation and API logic are handled within the store's handleRespond
    await handleRespond(selectedInquiry._id);
  };

  return (
    <MainLayout>
      <div className="p-6 md:p-10 bg-[#020617] min-h-screen text-slate-200">
        
        {/* --- DYNAMIC HEADER --- */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-12 gap-8">
          <div>
            <h1 className="text-5xl font-black tracking-tight text-white mb-2 bg-gradient-to-r from-white to-slate-500 bg-clip-text">
              Expedition Inbox
            </h1>
            <p className="text-slate-500 font-medium text-lg italic font-serif">Curating journeys across Lake Kivu and beyond.</p>
          </div>

          <div className="flex gap-4 w-full lg:w-auto">
            <QuickStat icon={<Plane size={18}/>} label="Total" value={inquiries.length} color="blue" />
            <QuickStat icon={<Clock size={18}/>} label="New" value={inquiries.filter(i => !i.responded).length} color="orange" pulse />
          </div>
        </div>

        {/* --- MAIN CONTENT --- */}
        {isLoading && inquiries.length === 0 ? (
           <div className="text-center py-20 text-slate-500">Loading expeditions...</div>
        ) : inquiries.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-32 bg-slate-900/20 rounded-[3rem] border border-slate-800/50 backdrop-blur-sm"
          >
            <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mb-6 border border-slate-700">
                <Briefcase className="text-slate-500" size={32} />
            </div>
            <p className="text-slate-400 font-bold text-xl uppercase tracking-widest">No Active Expeditions</p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
            
            {/* --- INQUIRY FEED --- */}
            <div className="xl:col-span-7 space-y-6">
              {inquiries.map((item) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  key={item._id}
                  onClick={() => setSelectedInquiry(item)}
                  className={`group relative overflow-hidden p-8 rounded-[2.5rem] border-2 transition-all duration-500 cursor-pointer ${
                    selectedInquiry?._id === item._id 
                    ? "bg-slate-900 border-blue-500 shadow-[0_0_40px_-10px_rgba(59,130,246,0.3)]" 
                    : "bg-slate-900/40 border-slate-800/50 hover:border-slate-700 hover:bg-slate-900/60 shadow-xl"
                  }`}
                >
                  {selectedInquiry?._id === item._id && (
                    <div className="absolute -right-20 -top-20 w-48 h-48 bg-blue-500/10 blur-[80px] rounded-full pointer-events-none" />
                  )}

                  <div className="flex flex-col md:flex-row justify-between gap-6 relative z-10">
                    <div className="flex-grow">
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`p-3 rounded-2xl ${item.responded ? "bg-slate-800 text-slate-500" : "bg-blue-600 text-white shadow-lg shadow-blue-500/20"}`}>
                          <Users size={20} />
                        </div>
                        <div>
                          <h3 className="text-xl font-black text-white leading-none">{item.name}</h3>
                          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{item.email}</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <InfoTag icon={<MapPin size={14}/>} text={item.destination} color="orange" />
                        <InfoTag icon={<Calendar size={14}/>} text={`${item.checkinDate}`} color="blue" />
                        <div className="col-span-2 mt-2 px-4 py-3 bg-white/5 rounded-2xl border border-white/5 text-sm text-slate-300 italic">
                            &ldquo;Looking for a tour for {item.paxNumber} people...&rdquo;
                        </div>
                      </div>
                    </div>

                    <div className="flex md:flex-col items-center justify-between gap-3 border-l border-slate-800/50 pl-6">
                       {item.responded ? (
                          <div className="flex flex-col items-center gap-1">
                             <CheckCircle className="text-emerald-500" size={24} />
                             <span className="text-[9px] font-black uppercase text-emerald-500">Done</span>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center gap-1 animate-pulse">
                             <div className="w-3 h-3 bg-orange-500 rounded-full" />
                             <span className="text-[9px] font-black uppercase text-orange-500">New</span>
                          </div>
                       )}
                       <button 
                        onClick={(e) => { e.stopPropagation(); handleDelete(item._id); }}
                        className="p-3 bg-slate-800 hover:bg-red-500/20 hover:text-red-500 rounded-2xl transition-all"
                       >
                        <Trash2 size={18} />
                       </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* --- PREMIUM RESPONSE CONSOLE --- */}
            <div className="xl:col-span-5">
              <AnimatePresence mode="wait">
                {selectedInquiry ? (
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="sticky top-10 bg-[#0F172A] border border-slate-800 p-10 rounded-[3.5rem] shadow-2xl overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent pointer-events-none" />

                    <div className="relative z-10">
                      <h2 className="text-3xl font-black text-white mb-1">Create Proposal</h2>
                      <p className="text-sm text-blue-400 font-bold mb-8 uppercase tracking-widest">Client: {selectedInquiry.name}</p>
                      
                      <div className="space-y-6">
                        <textarea
                          value={responseMessage}
                          onChange={(e) => setResponseMessage(e.target.value)}
                          placeholder="Describe the itinerary and pricing..."
                          className="w-full h-64 bg-slate-900/50 border-2 border-slate-800 rounded-[2rem] p-6 text-white focus:border-blue-500 outline-none resize-none transition-all placeholder:text-slate-600 font-medium"
                        />
                        <button
                          onClick={handleSendResponse}
                          disabled={isLoading || !responseMessage.trim()}
                          className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-5 rounded-[2rem] flex items-center justify-center gap-3 transition-all shadow-xl shadow-blue-900/20 disabled:opacity-30 uppercase tracking-widest text-xs"
                        >
                          {isLoading ? "Broadcasting..." : <>Dispatch Proposal <Send size={16} /></>}
                        </button>
                        <button
                          onClick={() => setSelectedInquiry(null)}
                          className="w-full text-slate-500 text-xs font-bold hover:text-white uppercase tracking-widest py-3"
                        >
                          Exit Console
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <div className="sticky top-10 bg-slate-900/30 border-2 border-dashed border-slate-800 p-16 rounded-[3.5rem] text-center backdrop-blur-sm">
                    <div className="w-24 h-24 bg-blue-600/5 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-8 border border-blue-500/10">
                      <MessageSquare size={40} />
                    </div>
                    <h3 className="text-2xl font-black text-white mb-4 italic font-serif tracking-tight">Ready for planning?</h3>
                    <p className="text-slate-500 text-sm leading-relaxed max-w-[220px] mx-auto font-medium">
                      Select a traveller to begin crafting their personalized Lake Kivu experience.
                    </p>
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

const QuickStat = ({ icon, label, value, color, pulse }) => {
  const themes = {
    blue: "bg-blue-600/10 text-blue-400 border-blue-500/20",
    orange: "bg-orange-600/10 text-orange-400 border-orange-500/20",
  };
  return (
    <div className={`flex items-center gap-4 px-6 py-4 rounded-[1.5rem] border ${themes[color]} flex-grow lg:flex-none shadow-sm`}>
      <div className="relative">
        {icon}
        {pulse && <div className="absolute -top-1 -right-1 w-2 h-2 bg-orange-500 rounded-full animate-ping" />}
      </div>
      <div>
        <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60 leading-none mb-1">{label}</p>
        <p className="text-xl font-black text-white leading-none">{value}</p>
      </div>
    </div>
  );
};

const InfoTag = ({ icon, text, color }) => {
  const colors = {
    orange: "text-orange-400 bg-orange-400/5 border-orange-400/10",
    blue: "text-blue-400 bg-blue-400/5 border-blue-400/10",
  };
  return (
    <div className={`flex items-center gap-2 px-4 py-2 rounded-xl border ${colors[color]} text-xs font-bold`}>
      {icon}
      <span className="truncate">{text}</span>
    </div>
  );
};

export default TourInquiriesDashboard;