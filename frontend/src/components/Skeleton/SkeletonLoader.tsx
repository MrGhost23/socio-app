const SkeletonLoader = () => {
  return (
    <div className="bg-white shadow-md p-4 rounded-lg animate-pulse">
      {/* Skeleton for an image */}
      <div className="h-32 bg-gray-300 rounded-lg mb-4"></div>

      {/* Skeleton for title */}
      <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>

      {/* Skeleton for subtitle */}
      <div className="h-4 bg-gray-300 rounded w-1/2"></div>
    </div>
  );
};

export default SkeletonLoader;
