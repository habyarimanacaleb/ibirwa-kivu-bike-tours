import React from "react";

export default function SettingsSidebar({ activeTab, setActiveTab, userRole }) {
  const menuItems = [
    { id: "profile", label: "My Profile", adminOnly: false },
    { id: "account", label: "Account Metrics", adminOnly: false },
    { id: "security", label: "Security", adminOnly: false },
    { id: "governance", label: "Platform Governance", adminOnly: true }, // Admin feature
  ];

  return (
    <div className="w-full md:w-64 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm space-y-1">
      {menuItems.map((item) => {
        // Hide the item completely if it's admin-only and user isn't an admin
        if (item.adminOnly && userRole !== "admin") return null;

        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
              isActive
                ? "bg-indigo-50 text-indigo-700 shadow-sm"
                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
            }`}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}