// components/StatsCard.jsx
import React from "react";

const StatsCard = ({ title, value, icon }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4">
      <div className="text-blue-600 text-3xl">{icon}</div>
      <div>
        <h3 className="text-xl font-medium">{title}</h3>
        <p className="text-3xl font-bold">{value}</p>
      </div>
    </div>
  );
};

export default StatsCard;
