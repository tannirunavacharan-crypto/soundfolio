import React, { useState, useEffect } from 'react';
import { Music, Film, User, Star } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import API from '../utils/api';
import TrackCard from '../components/TrackCard';
import ProjectCard from '../components/ProjectCard';
import { TrackSkeleton, ProjectSkeleton } from '../components/LoadingSkeleton';

const UserDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('tracks');
  
  // Data States
  const [tracks, setTracks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        const [tracksRes, projectsRes] = await Promise.all([
          API.get('/tracks'),
          API.get('/projects'),
        ]);

        if (tracksRes.data.success) setTracks(tracksRes.data.data);
        if (projectsRes.data.success) setProjects(projectsRes.data.data);
      } catch (error) {
        console.error('Failed to load user dashboard resources:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 relative overflow-hidden">
      
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-purple-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-amber-500/3 blur-[120px] pointer-events-none" />

      {/* User Dashboard Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-zinc-200 dark:border-zinc-900 pb-8 relative z-10">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-900/60">
            <User size={12} className="text-purple-600 dark:text-purple-400" />
            <span className="text-[10px] uppercase font-bold tracking-widest font-mono text-purple-700 dark:text-purple-300">Client Portal</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-zinc-900 dark:text-white">
            Welcome, <span className="bg-gradient-to-r from-purple-600 via-purple-500 to-amber-500 bg-clip-text text-transparent">{user?.name || 'Client'}</span>!
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-xs md:text-sm max-w-xl">
            Explore Ak Bhuker's audio library, review client-side scoring projects, and request custom Arrangements.
          </p>
        </div>
      </div>

      {/* Stats Panel */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 relative z-10">
        
        {/* Stat Item 1 */}
        <div className="glassmorphism rounded-2xl p-6 flex items-center gap-5 border border-zinc-200 dark:border-zinc-800">
          <div className="p-3 bg-purple-100 dark:bg-zinc-900 rounded-xl text-purple-600 dark:text-purple-400">
            <Music size={22} />
          </div>
          <div>
            <h3 className="text-zinc-400 dark:text-zinc-500 text-[10px] uppercase font-mono tracking-wider font-bold">Compositions Library</h3>
            <p className="text-2xl font-black text-zinc-900 dark:text-white">{tracks.length}</p>
          </div>
        </div>

        {/* Stat Item 2 */}
        <div className="glassmorphism rounded-2xl p-6 flex items-center gap-5 border border-zinc-200 dark:border-zinc-800">
          <div className="p-3 bg-amber-100 dark:bg-zinc-900 rounded-xl text-amber-600 dark:text-amber-500">
            <Film size={22} />
          </div>
          <div>
            <h3 className="text-zinc-400 dark:text-zinc-500 text-[10px] uppercase font-mono tracking-wider font-bold">Client Compositions</h3>
            <p className="text-2xl font-black text-zinc-900 dark:text-white">{projects.length}</p>
          </div>
        </div>

        {/* Support Card */}
        <div className="glassmorphism rounded-2xl p-6 flex items-center gap-5 border border-zinc-200 dark:border-zinc-800">
          <div className="p-3 bg-purple-100 dark:bg-zinc-900 rounded-xl text-purple-600 dark:text-purple-400">
            <Star size={22} className="fill-current" />
          </div>
          <div>
            <h3 className="text-zinc-400 dark:text-zinc-500 text-[10px] uppercase font-mono tracking-wider font-bold">Account Level</h3>
            <p className="text-sm font-bold text-zinc-800 dark:text-zinc-300 uppercase tracking-widest font-mono">Premium Client</p>
          </div>
        </div>

      </div>

      {/* Tabs Navigation */}
      <div className="flex border-b border-zinc-200 dark:border-zinc-900 overflow-x-auto gap-2 select-none z-10 relative">
        <button
          onClick={() => setActiveTab('tracks')}
          className={`px-5 py-3 rounded-t-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 border-b-2 transition-all whitespace-nowrap ${
            activeTab === 'tracks'
              ? 'border-purple-650 dark:border-purple-500 bg-zinc-100 dark:bg-zinc-900/40 text-purple-600 dark:text-purple-400'
              : 'border-transparent text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
          }`}
        >
          <Music size={14} />
          <span>Compositions Library</span>
        </button>

        <button
          onClick={() => setActiveTab('projects')}
          className={`px-5 py-3 rounded-t-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 border-b-2 transition-all whitespace-nowrap ${
            activeTab === 'projects'
              ? 'border-purple-650 dark:border-purple-500 bg-zinc-100 dark:bg-zinc-900/40 text-purple-600 dark:text-purple-400'
              : 'border-transparent text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
          }`}
        >
          <Film size={14} />
          <span>Cinematic Projects</span>
        </button>
      </div>

      {/* Tab Contents */}
      <div className="space-y-6 relative z-10">
        
        {/* Compositions Tab */}
        {activeTab === 'tracks' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center px-2">
              <h2 className="text-lg font-bold text-zinc-900 dark:text-white">Audio Tracks</h2>
              <span className="text-[10px] text-zinc-400 font-mono">Use persistent player controls below</span>
            </div>
            
            <div className="space-y-4">
              {loading ? (
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
                <div className="text-center py-16 bg-zinc-50 dark:bg-zinc-900/20 border border-zinc-100 dark:border-zinc-900 rounded-2xl text-zinc-500">
                  No composition tracks available.
                </div>
              )}
            </div>
          </div>
        )}

        {/* Projects Tab */}
        {activeTab === 'projects' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center px-2">
              <h2 className="text-lg font-bold text-zinc-900 dark:text-white">Assigned Media Scores</h2>
              <span className="text-[10px] text-zinc-400 font-mono">Filter options available on main page</span>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 3 }).map((_, idx) => (
                  <ProjectSkeleton key={idx} />
                ))}
              </div>
            ) : projects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                  <div key={project._id} className="h-full">
                    <ProjectCard project={project} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-zinc-50 dark:bg-zinc-900/20 border border-zinc-100 dark:border-zinc-900 rounded-2xl text-zinc-500">
                No client scoring projects published yet.
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};

export default UserDashboard;
