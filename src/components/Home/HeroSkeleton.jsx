import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function HeroSkeleton() {
  return (
    <div className="relative w-full h-[85vh] min-h-[500px] lg:h-screen bg-slate-900 overflow-hidden">
      {/* 1. Main Background Skeleton */}
      <div className="absolute inset-0">
        <Skeleton 
          height="100%" 
          baseColor="#0f172a" // slate-900
          highlightColor="#1e293b" // slate-800
          className="opacity-50"
        />
      </div>

      {/* 2. Gradient Overlay (Mimicking the real Hero) */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent z-10" />

      {/* 3. Content Skeletons */}
      <div className="relative z-20 container mx-auto px-6 h-full flex flex-col justify-center">
        <div className="max-w-3xl space-y-6">
          
          {/* Pre-header Skeleton */}
          <div className="flex items-center gap-3">
            <Skeleton width={120} height={12} baseColor="#1e293b" highlightColor="#334155" borderRadius={8} />
          </div>

          {/* Title Skeleton (Multi-line) */}
          <div className="space-y-3">
            <Skeleton width="80%" height={60} baseColor="#1e293b" highlightColor="#334155" borderRadius={12} />
            <Skeleton width="60%" height={60} baseColor="#1e293b" highlightColor="#334155" borderRadius={12} />
          </div>

          {/* Description Skeleton */}
          <div className="pt-4 space-y-2">
            <Skeleton width="90%" height={18} baseColor="#1e293b" highlightColor="#334155" />
            <Skeleton width="85%" height={18} baseColor="#1e293b" highlightColor="#334155" />
            <Skeleton width="40%" height={18} baseColor="#1e293b" highlightColor="#334155" />
          </div>

          {/* Button Group Skeleton */}
          <div className="flex flex-wrap gap-4 pt-8">
            <Skeleton width={180} height={56} borderRadius={16} baseColor="#1e293b" highlightColor="#334155" />
            <Skeleton width={150} height={56} borderRadius={16} baseColor="#1e293b" highlightColor="#334155" />
          </div>
        </div>
      </div>

      {/* 4. Bottom Decorative Element (Optional) */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20">
        <div className="flex gap-2">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} circle width={10} height={10} baseColor="#334155" />
          ))}
        </div>
      </div>
    </div>
  );
}

export default HeroSkeleton;