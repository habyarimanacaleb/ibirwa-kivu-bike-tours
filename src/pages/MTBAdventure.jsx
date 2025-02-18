// src/pages/MTBadventure.js
import React from "react";
import { GalleryCard } from "../components/GalleryCard";

export const MTBadventure = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center text-green-700 mb-8">
        Explore Rwanda: Mount Rwanda Adventure
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Example of adventure cards */}
        <GalleryCard
          title="Mountaineering Adventure"
          description="Embark on a thrilling mountaineering adventure in the heart of Rwanda."
          imageUrl="/images/mount_rwanda.jpg"
        />
        <GalleryCard
          title="Nature Trekking"
          description="Trek through the stunning Rwandan forests and enjoy breathtaking views."
          imageUrl="/images/trekking.jpg"
        />
        {/* Add more cards as needed */}
      </div>
    </div>
  );
};
