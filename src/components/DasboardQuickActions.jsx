import React from "react";
import { useNavigate } from "react-router-dom";
import { PlusCircle, ImagePlus, MapPin } from "lucide-react";
import { motion } from "framer-motion";

const DasboardQuickActions = () => {
  const navigate = useNavigate();

  const actions = [
    { 
      label: "Add Service", 
      icon: <MapPin size={20} />, 
      path: "/create-service",
      color: "bg-blue-500/10 text-blue-400 border-blue-500/20"
    },
    { 
      label: "Add Gallery", 
      icon: <ImagePlus size={20} />, 
      path: "/create-gallery",
      color: "bg-purple-500/10 text-purple-400 border-purple-500/20"
    },
  ];

  return (
    <div className="flex flex-col h-full">
      <div className="mb-8">
        <h3 className="text-3xl font-black uppercase tracking-[0.2em] text-slate-500 mb-1">
          Quick Controls
        </h3>
        <h2 className="text-[20px] text-slate-400 font-bold tracking-tight">
          System Actions
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {actions.map((action) => (
          <motion.button
            key={action.label}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate(action.path)}
            className={`flex items-center gap-4 p-4 rounded-2xl border transition-all duration-300 ${action.color} hover:border-opacity-50`}
          >
            <div className="p-2 rounded-xl bg-black/20">
              {action.icon}
            </div>
            <span className="font-bold text-sm tracking-wide">
              {action.label}
            </span>
            <PlusCircle size={16} className="ml-auto opacity-50" />
          </motion.button>
        ))}
      </div>
      
      <div className="mt-auto pt-8">
        <p className="text-[9px] text-slate-600 font-bold uppercase tracking-widest text-center">
          Admin Privileges Active
        </p>
      </div>
    </div>
  );
};

export default DasboardQuickActions;