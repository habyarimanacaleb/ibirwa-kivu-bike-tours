import React, { useEffect, useState, useCallback } from "react";
import MainLayout from "./MainLayout";
import ServicesList from "../components/ServicesList";
import DasboardQuickActions from "../components/DasboardQuickActions";
import SearchBar from "./SearchBar";
import { Bell, Users, MapPin, Image as ImageIcon, MessageSquare, Activity, ShieldCheck, Zap, RefreshCw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Global Stores
import useAuthStore from "../store/useAuthStore";
import useServiceStore from "../store/useServiceStore";
import useGalleryStore from "../store/useGalleryStore";
import useContactStore from "../store/useContactStore";


 
function MainDashboardLayout() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isInitializing, setIsInitializing] = useState(true);
  const [initError, setInitError] = useState(false);

  // Pull data from all stores
  const { users, fetchUsers } = useAuthStore();
  const { services, fetchServices } = useServiceStore();
  const { images: gallery, loadGallery } = useGalleryStore();
  const { contacts, fetchContacts } = useContactStore();
  // Unified Data Fetcher
  const initDashboard = useCallback(async () => {
    setIsInitializing(true);
    setInitError(false);
    try {
      await Promise.all([
        fetchUsers(),
        fetchServices(),
        loadGallery(),
        fetchContacts()
      ]);
    } catch (err) {
      console.error("Dashboard Init Error:", err);
      setInitError(true);
    } finally {
      setIsInitializing(false);
    }
  }, [fetchUsers, fetchServices, loadGallery, fetchContacts]);

  useEffect(() => {
    initDashboard();
  }, [initDashboard]);

  // Analytics Calculation
  const analytics = [
    { label: "Active Users", value: users.length, icon: <Users size={20}/>, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Expeditions", value: services.length, icon: <MapPin size={20}/>, color: "text-emerald-600", bg: "bg-emerald-50" },
    { label: "Visual Assets", value: gallery.length, icon: <ImageIcon size={20}/>, color: "text-purple-600", bg: "bg-purple-50" },
    { label: "Inquiries", value: contacts.length, icon: <MessageSquare size={20}/>, color: "text-amber-600", bg: "bg-amber-50" },
  ];

  const notifications = contacts.filter(c => !c.responded).length;

  // --- RENDERING ---

  if (initError) {
    return (
      <MainLayout>
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-10">
          <h2 className="text-2xl font-black text-slate-900 mb-4 uppercase">System Connection Failed</h2>
          <p className="text-slate-500 mb-8 max-w-sm">The servers might be warming up. Please attempt a hard sync.</p>
          <button onClick={initDashboard} className="flex items-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-full font-bold hover:bg-blue-600 transition-colors">
            <RefreshCw size={18} /> Retry Sync
          </button>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="bg-[#F8FAFC] min-h-screen p-4 md:p-12">
        <div className="max-w-[1700px] mx-auto">
          
          <AnimatePresence mode="wait">
            {isInitializing ? (
              <motion.div 
                key="loader"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center min-h-[60vh]"
              >
                <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-6"></div>
                <p className="text-xs font-black tracking-[0.3em] uppercase text-slate-400">Synchronizing Command Center...</p>
              </motion.div>
            ) : (
              <motion.div key="content" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                
                {/* --- TOP HUD --- */}
                <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                      <p className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600">Operations Online</p>
                    </div>
                    <h2 className="text-5xl font-black text-slate-950 tracking-tighter uppercase leading-none">Command Center</h2>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <motion.div whileHover={{ scale: 1.05 }} className="relative p-4 bg-white rounded-2xl shadow-sm border border-slate-100 cursor-pointer">
                      <Bell className="text-slate-400" size={26} />
                      {notifications > 0 && (
                        <span className="absolute top-2 right-2 bg-blue-600 text-white text-[9px] font-black w-5 h-5 flex items-center justify-center rounded-full ring-4 ring-white">
                          {notifications}
                        </span>
                      )}
                    </motion.div>
                  </div>
                </div>

                {/* --- ANALYTICS GRID --- */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                  {analytics.map((stat, i) => (
                    <div key={stat.label} className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-50 flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">{stat.label}</p>
                        <p className="text-4xl font-black text-slate-950 tracking-tighter">{stat.value}</p>
                      </div>
                      <div className={`p-5 ${stat.bg} ${stat.color} rounded-[1.5rem]`}>{stat.icon}</div>
                    </div>
                  ))}
                </div>

                {/* --- OPERATIONAL GRID --- */}
                <div className="flex flex-col px-0 lg:px-10  mx-auto">
                  <DasboardQuickActions />
                  <div className="lg:col-span-8 space-y-10">
                    <div className="bg-white p-4 rounded-[2rem] shadow-xl shadow-slate-200/60 border border-slate-50">
                      <SearchBar searchTerm={searchTerm} handleSearch={(e) => setSearchTerm(e.target.value)} />
                    </div>
                    <div className="bg-white rounded-[3rem] p-2 shadow-sm border border-slate-50">
                      <ServicesList /> 
                    </div>
                  </div>
                </div>

              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </MainLayout>
  );
}

export default MainDashboardLayout;