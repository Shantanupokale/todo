import { Skeleton } from "./skeleton";

export const SkeletonLoader = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl z-10">
      {[...Array(3)].map((_, index) => (
        <div key={index} className="p-3 bg-black/80 border border-gray-700 shadow-lg rounded-lg backdrop-blur-md flex flex-col justify-between">
          <Skeleton className="h-5 w-3/4 bg-gray-700 mb-3" />
          <Skeleton className="h-4 w-full bg-gray-700 mb-2" />
          <Skeleton className="h-4 w-2/3 bg-gray-700 mb-4" />
          <div className="flex justify-between">
            <Skeleton className="h-5 w-5 bg-gray-700 rounded-full" />
            <div className="flex gap-3">
              <Skeleton className="h-5 w-5 bg-gray-700 rounded-full" />
              <Skeleton className="h-5 w-5 bg-gray-700 rounded-full" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
