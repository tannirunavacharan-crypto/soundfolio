import React, { useState, useEffect } from 'react';
import { Search, SlidersHorizontal, Music } from 'lucide-react';
import API from '../utils/api';
import TrackCard from '../components/TrackCard';
import { TrackSkeleton } from '../components/LoadingSkeleton';

const Portfolio = () => {
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  
  const categories = ['All', 'Film', 'Jingle', 'Arrangement', 'Background Score', 'Commercial'];

  useEffect(() => {
    const fetchTracks = async () => {
      setLoading(true);
      try {
        const response = await API.get('/tracks', {
          params: { category, search }
        });
        if (response.data.success) {
          setTracks(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching tracks:', error);
      } finally {
        setLoading(false);
      }
    };

    // Add debouncing to search input
    const delayDebounceFn = setTimeout(() => {
      fetchTracks();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [category, search]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      
      {/* Page Header */}
      <div className="text-center space-y-3">
        <span className="text-xs font-mono uppercase tracking-widest text-purple-500 font-bold">// COMPOSITIONS</span>
        <h1 className="text-4xl md:text-5xl font-extrabold text-white">Music Portfolio</h1>
        <p className="text-zinc-500 text-sm max-w-lg mx-auto">
          Explore previous compositions, arrangements, and soundtracks. Use the player controls at the bottom to listen.
        </p>
      </div>

      {/* Filter and Search Bar Zone */}
      <div className="glassmorphism rounded-2xl p-5 flex flex-col lg:flex-row gap-5 justify-between items-center relative z-20">
        
        {/* Category Filters */}
        <div className="flex gap-2 overflow-x-auto w-full lg:w-auto pb-2 lg:pb-0 no-scrollbar select-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-all duration-300 border ${
                category === cat
                  ? 'bg-purple-600 border-purple-500 text-white shadow-md shadow-purple-500/10'
                  : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input Box */}
        <div className="relative w-full lg:w-80 flex-shrink-0">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input
            type="text"
            placeholder="Search tracks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-sm text-zinc-300 placeholder-zinc-500 focus:outline-none focus:border-purple-500/80 transition-all font-sans"
          />
        </div>

      </div>

      {/* Tracks Listing */}
      <div className="space-y-4">
        {loading ? (
          // Display Skeletons while loading API response
          Array.from({ length: 4 }).map((_, idx) => (
            <TrackSkeleton key={idx} />
          ))
        ) : tracks.length > 0 ? (
          tracks.map((track, idx) => (
            <TrackCard 
              key={track._id} 
              track={track} 
              index={idx} 
              playlist={tracks} 
            />
          ))
        ) : (
          <div className="text-center py-20 bg-zinc-900/30 border border-zinc-900 rounded-xl space-y-4">
            <div className="inline-flex p-4 bg-zinc-900 rounded-full text-zinc-700">
              <Music size={32} />
            </div>
            <h3 className="text-lg font-semibold text-zinc-400">No tracks found</h3>
            <p className="text-sm text-zinc-600 max-w-sm mx-auto">
              Try adjusting your category selection or search term to discover other works.
            </p>
          </div>
        )}
      </div>

    </div>
  );
};

export default Portfolio;
