import React from "react";
import Skeleton from "react-loading-skeleton";

function ServiceSkeleton() {
  return (
    <div className="bg-white p-0 rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Aspect ratio box for image */}
      <div className="aspect-[4/3]">
        <Skeleton height="100%" borderRadius={0} />
      </div>
      <div className="p-6">
        <Skeleton width="30%" height={12} className="mb-3" />
        <Skeleton width="80%" height={24} className="mb-4" />
        <Skeleton count={3} height={14} className="mb-2" />
        <div className="mt-4 pt-4 border-t border-gray-50">
           <Skeleton width="40%" height={20} />
        </div>
      </div>
    </div>
  );
}

export default ServiceSkeleton;
