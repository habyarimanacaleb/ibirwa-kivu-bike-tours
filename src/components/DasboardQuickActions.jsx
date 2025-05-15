import React from "react";

const actions = [
  { label: "Add Services", icon: "➕", onClick: () => navigate("/create-service") },
  { label: "Add Gallery", icon: "➕", onClick: () => navigate("/create-gallery") },
];

const DasboardQuickActions = () => (
  <div className="container mx-auto p-4">
    <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
    <div className="flex flex-wrap gap-4">

    {actions.map((action) => (
      <button
        key={action.label}
        onClick={action.onClick}
        className="flex flex-wrap justify-center bg-blue-500 text-white rounded-lg px-4 shadow-md hover:bg-blue-600 transition duration-200"
      >
        <span style={{ fontSize: "2rem" }}>{action.icon}</span>
        <span style={{ marginTop: "0.5rem", fontSize:"1.2rem" }}>{action.label}</span>
      </button>
    ))}
    </div>
  </div>
);

export default DasboardQuickActions;