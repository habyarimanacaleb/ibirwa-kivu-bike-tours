export function AnalyticsCard({ title, value }) {
  return (
    <div className="bg-white p-4 shadow rounded-lg text-center">
      <h2 className="text-gray-500">{title}</h2>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}

export function SkeletonCard() {
  return (
    <div className="bg-gray-200 p-4 shadow rounded-lg animate-pulse text-center h-24">
      <div className="h-6 bg-gray-300 rounded w-3/4 mx-auto mb-4"></div>
      <div className="h-8 bg-gray-300 rounded w-1/2 mx-auto"></div>
    </div>
  );
}
