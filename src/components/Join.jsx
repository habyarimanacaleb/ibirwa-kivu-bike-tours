import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SignIn } from "./SignIn";
import { CreateAccount } from "./CreateAccount";

export const Join = () => {
  const [currentView, setCurrentView] = useState("signin");

  const handleViewChange = (view) => {
    setCurrentView(view);
  };

  return (
    <div className="bg-[#F8FAFC] min-h-screen overflow-x-hidden">
      {/* Note: Since Navbar is already inside your SignIn/CreateAccount components, 
          we don't double-render it here to avoid layout shifts.
      */}
      
      <AnimatePresence mode="wait">
        {currentView === "signin" ? (
          <motion.div
            key="signin"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <SignIn onSwitchToCreate={() => handleViewChange("create")} />
          </motion.div>
        ) : (
          <motion.div
            key="create"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <CreateAccount onSwitchToSignIn={() => handleViewChange("signin")} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* GLOBAL BACKGROUND CORRIDOR DECORATION */}
      <div className="fixed inset-0 pointer-events-none opacity-20">
         <div className="absolute top-0 left-[15%] w-px h-full bg-slate-200"></div>
         <div className="absolute top-0 right-[15%] w-px h-full bg-slate-200"></div>
      </div>
    </div>
  );
};