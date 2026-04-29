import React, { useEffect, useState } from "react";
import MainLayout from "./MainLayout";
import ServicesList from "../components/ServicesList";
import DasboardQuickActions from "../components/DasboardQuickActions";
import SearchBar from "./SearchBar";
import { Bell, Users, MapPin, Image as ImageIcon, MessageSquare, Activity, ShieldCheck, Zap } from "lucide-react";
import { motion } from "framer-motion";

// Global Stores
import useAuthStore from "../store/useAuthStore";
import useServiceStore from "../store/useServiceStore";
import useGalleryStore from "../store/useGalleryStore";
import useContactStore from "../store/useContactStore";

export function MainDashboardLout() {
  const [searchTerm, setSearchTerm] = useState("");

  // 1. Pull data from all stores
  const { users, fetchUsers } = useAuthStore();
  const { services, fetchServices, isLoading: servicesLoading } = useServiceStore();
  const { images: gallery, loadGallery, isLoading: galleryLoading } = useGalleryStore();
  const { contacts, fetchContacts, isLoading: contactsLoading } = useContactStore();

  // 2. Fetch all data on mount
  useEffect(() => {
    fetchUsers();
    fetchServices();
    loadGallery();
    fetchContacts();
  }, []);

  // 3. Analytics Calculation
  const analytics = [
    { label: "Active Users", value: users.length, icon: <Users size={20}/>, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Expeditions", value: services.length, icon: <MapPin size={20}/>, color: "text-emerald-600", bg: "bg-emerald-50" },
    { label: "Visual Assets", value: gallery.length, icon: <ImageIcon size={20}/>, color: "text-purple-600", bg: "bg-purple-50" },
    { label: "Inquiries", value: contacts.length, icon: <MessageSquare size={20}/>, color: "text-amber-600", bg: "bg-amber-50" },
  ];

  const notifications = contacts.filter(c => !c.responded).length;
  const isGlobalLoading = servicesLoading || galleryLoading || contactsLoading;

  const filteredServices = services.filter((s) =>
    s.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const SkeletonCard = () => (
    <div className="bg-white p-8 rounded-[2.5rem] shadow-sm animate-pulse border border-slate-100">
      <div className="h-3 bg-slate-100 rounded-full w-1/3 mb-6"></div>
      <div className="h-10 bg-slate-50 rounded-2xl w-1/2"></div>
    </div>
  );

  return (
    <MainLayout>
      <div className="bg-[#F8FAFC] min-h-screen">
        <div className="p-6 md:p-12 max-w-[1700px] mx-auto">
          
          {/* --- TOP HUD (Heads Up Display) --- */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-8">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping"></span>
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600">Operations Live</p>
              </div>
              <h2 className="text-5xl font-black text-slate-950 tracking-tighter uppercase leading-none">
                Command <span className="text-slate-300">Center</span>
              </h2>
              <p className="text-slate-500 mt-3 font-medium text-sm italic">
                Synchronizing Kivu corridor logistics and tour registries.
              </p>
            </motion.div>
            
            <div className="flex items-center gap-4">
              <div className="flex -space-x-3 overflow-hidden">
                {users.slice(0, 3).map((u, i) => (
                  <div key={i} className="h-10 w-10 rounded-full ring-4 ring-[#F8FAFC] bg-slate-200 flex items-center justify-center text-[10px] font-black">
                    {u.name?.charAt(0) || 'A'}
                  </div>
                ))}
              </div>
              <div className="h-10 w-px bg-slate-200 mx-2 hidden md:block"></div>
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="relative p-4 bg-white rounded-2xl shadow-sm border border-slate-100 cursor-pointer group transition-all"
              >
                <Bell className="text-slate-400 group-hover:text-blue-600 transition-colors" size={24} />
                {notifications > 0 && (
                  <span className="absolute top-3 right-3 bg-blue-600 text-white text-[9px] font-black w-5 h-5 flex items-center justify-center rounded-full ring-4 ring-white">
                    {notifications}
                  </span>
                )}
              </motion.div>
            </div>
          </div>

          {/* --- KEY PERFORMANCE INDICATORS --- */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {isGlobalLoading && services.length === 0
              ? Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
              : analytics.map((stat, i) => (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    key={stat.label}
                    className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-50 flex items-center justify-between group hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500"
                  >
                    <div className="space-y-1">
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">{stat.label}</p>
                      <p className="text-4xl font-black text-slate-950 tracking-tighter">{stat.value}</p>
                    </div>
                    <div className={`p-5 ${stat.bg} ${stat.color} rounded-[1.5rem] group-hover:rotate-12 group-hover:scale-110 transition-all duration-300`}>
                      {stat.icon}
                    </div>
                  </motion.div>
                ))}
          </div>

          {/* --- MAIN OPERATIONAL GRID --- */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
             {/* LEFT: REGISTRY MANAGEMENT */}
             <div className="lg:col-span-8 space-y-10">
                <div className="bg-white p-4 rounded-[2rem] shadow-xl shadow-slate-200/60 border border-slate-50">
                   <SearchBar searchTerm={searchTerm} handleSearch={(e) => setSearchTerm(e.target.value)} />
                </div>
                
                <div className="space-y-8">
                  <div className="flex justify-between items-end px-2">
                    <div>
                      <h3 className="text-2xl font-black text-slate-950 tracking-tight uppercase">Expedition Registry</h3>
                      <p className="text-xs text-slate-400 font-bold tracking-widest uppercase mt-1">Status: Operational</p>
                    </div>
                    <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-4 py-2 rounded-full uppercase tracking-widest">
                      {filteredServices.length} Records Found
                    </span>
                  </div>
                  
                  <div className="bg-white rounded-[3rem] p-2 shadow-sm border border-slate-50 overflow-hidden">
                    <ServicesList /> 
                  </div>
                </div>
             </div>

             {/* RIGHT: SYSTEM DIRECTIVES */}
             <div className="lg:col-span-4">
                <div className="sticky top-12 space-y-8">
                  
                  {/* QUICK ACTIONS CARD */}
                  <div className="bg-slate-950 text-white p-10 rounded-[3rem] shadow-2xl shadow-blue-900/20 relative overflow-hidden">
                     <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-600/10 rounded-full blur-3xl"></div>
                     <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-8">
                          <Zap size={18} className="text-blue-500" />
                          <h3 className="text-xs font-black uppercase tracking-[0.3em] text-slate-500">Quick Directives</h3>
                        </div>
                        <DasboardQuickActions />
                     </div>
                  </div>
                  
                  {/* HEALTH STATUS CARD */}
                  <div className="bg-white p-10 rounded-[3rem] shadow-xl shadow-slate-200/50 border border-slate-50">
                     <div className="flex items-center gap-3 mb-6">
                        <Activity size={18} className="text-emerald-500" />
                        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">System Integrity</h4>
                     </div>
                     <div className="space-y-6">
                        <div className="flex items-center gap-4">
                           <div className="h-10 w-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
                              <ShieldCheck size={20} />
                           </div>
                           <div>
                              <p className="text-sm font-black text-slate-900">API SYNC ACTIVE</p>
                              <p className="text-[10px] text-slate-400 font-medium">Latency: 24ms</p>
                           </div>
                        </div>
                        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                          <p className="text-[10px] text-slate-500 font-bold leading-relaxed">
                            Encryption standards verified. All database clusters in the Rwanda-West region are performing at 100% capacity.
                          </p>
                        </div>
                     </div>
                  </div>

                </div>
             </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}