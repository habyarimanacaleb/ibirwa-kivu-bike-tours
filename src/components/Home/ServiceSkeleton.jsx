import React from "react";
import Skeleton from "react-loading-skeleton";

function ServiceSkeleton({index}) {
  return (
    <div key={index} className="bg-gray-100 p-4 rounded-lg shadow-lg">
      <Skeleton height={192} className="rounded-lg" />
      <Skeleton height={24} width={`80%`} className="mt-4" />
      <Skeleton height={16} width={`60%`} className="mt-2" />
      <Skeleton height={16} width={`40%`} className="mt-2" />
    </div>
  );
}

export default ServiceSkeleton;
