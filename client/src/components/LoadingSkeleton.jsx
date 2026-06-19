import React from 'react';

export const TrackSkeleton = () => {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 animate-pulse flex flex-col md:flex-row gap-4 items-center">
      <div className="w-24 h-24 bg-zinc-800 rounded-lg flex-shrink-0"></div>
      <div className="flex-1 w-full space-y-3">
        <div className="h-4 bg-zinc-800 rounded w-1/3"></div>
        <div className="h-3 bg-zinc-800 rounded w-1/4"></div>
        <div className="h-3 bg-zinc-800 rounded w-5/6"></div>
        <div className="h-3 bg-zinc-800 rounded w-1/2"></div>
      </div>
      <div className="w-12 h-12 bg-zinc-800 rounded-full flex-shrink-0"></div>
    </div>
  );
};

export const ProjectSkeleton = () => {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden animate-pulse">
      <div className="h-48 bg-zinc-800 w-full"></div>
      <div className="p-5 space-y-3">
        <div className="flex justify-between">
          <div className="h-4 bg-zinc-800 rounded w-1/3"></div>
          <div className="h-4 bg-zinc-800 rounded w-1/6"></div>
        </div>
        <div className="h-3 bg-zinc-800 rounded w-1/4"></div>
        <div className="h-3 bg-zinc-800 rounded w-full"></div>
        <div className="h-3 bg-zinc-800 rounded w-4/5"></div>
      </div>
    </div>
  );
};

export const StatsSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-pulse">
      {[1, 2, 3].map((n) => (
        <div key={n} className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 space-y-3">
          <div className="h-3 bg-zinc-800 rounded w-1/3"></div>
          <div className="h-8 bg-zinc-800 rounded w-1/4"></div>
        </div>
      ))}
    </div>
  );
};
