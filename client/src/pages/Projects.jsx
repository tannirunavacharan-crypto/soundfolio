import React, { useState, useEffect } from 'react';
import API from '../utils/api';
import ProjectCard from '../components/ProjectCard';
import { ProjectSkeleton } from '../components/LoadingSkeleton';
import { Film } from 'lucide-react';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [typeFilter, setTypeFilter] = useState('All');
  const [yearFilter, setYearFilter] = useState('All');
  
  const [availableTypes, setAvailableTypes] = useState(['All']);
  const [availableYears, setAvailableYears] = useState(['All']);

  // Fetch unique years and types once to populate selectors
  useEffect(() => {
    const fetchFilterOptions = async () => {
      try {
        const response = await API.get('/projects');
        if (response.data.success) {
          const allProjects = response.data.data;
          
          // Extract unique types
          const types = ['All', ...new Set(allProjects.map(p => p.projectType))];
          setAvailableTypes(types);

          // Extract unique years and sort descending
          const years = ['All', ...new Set(allProjects.map(p => p.year))].sort((a, b) => b - a);
          setAvailableYears(years.map(String));
        }
      } catch (error) {
        console.error('Error fetching initial projects for filters:', error);
      }
    };
    fetchFilterOptions();
  }, []);

  // Fetch projects with current filters
  useEffect(() => {
    const fetchFilteredProjects = async () => {
      setLoading(true);
      try {
        const response = await API.get('/projects', {
          params: {
            type: typeFilter,
            year: yearFilter
          }
        });
        if (response.data.success) {
          setProjects(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchFilteredProjects();
  }, [typeFilter, yearFilter]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      
      {/* Page Header */}
      <div className="text-center space-y-3">
        <span className="text-xs font-mono uppercase tracking-widest text-purple-500 font-bold">// WORK DICTIONARY</span>
        <h1 className="text-4xl md:text-5xl font-extrabold text-white">Client Projects</h1>
        <p className="text-zinc-500 text-sm max-w-lg mx-auto">
          Browse films, advertisement spots, sonic brand rollouts, and music releases Ak Bhuker has contributed to.
        </p>
      </div>

      {/* Filter Dropdowns bar */}
      <div className="glassmorphism rounded-2xl p-5 flex flex-col sm:flex-row gap-4 items-center justify-between relative z-20">
        <span className="text-xs font-bold uppercase tracking-widest text-zinc-400 font-mono">
          Filter Projects By:
        </span>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          {/* Project Type Filter */}
          <div className="flex flex-col gap-1 w-full sm:w-44">
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="bg-zinc-900 border border-zinc-800 text-zinc-300 px-3 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider focus:outline-none focus:border-purple-500 transition-colors w-full cursor-pointer"
            >
              {availableTypes.map((t) => (
                <option key={t} value={t}>{t === 'All' ? 'All Types' : t}</option>
              ))}
            </select>
          </div>

          {/* Year Filter */}
          <div className="flex flex-col gap-1 w-full sm:w-36">
            <select
              value={yearFilter}
              onChange={(e) => setYearFilter(e.target.value)}
              className="bg-zinc-900 border border-zinc-800 text-zinc-300 px-3 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider focus:outline-none focus:border-purple-500 transition-colors w-full cursor-pointer"
            >
              {availableYears.map((y) => (
                <option key={y} value={y}>{y === 'All' ? 'All Years' : y}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
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
        <div className="text-center py-20 bg-zinc-900/30 border border-zinc-900 rounded-xl space-y-4">
          <div className="inline-flex p-4 bg-zinc-900 rounded-full text-zinc-700">
            <Film size={32} />
          </div>
          <h3 className="text-lg font-semibold text-zinc-400">No projects match filters</h3>
          <p className="text-sm text-zinc-600 max-w-sm mx-auto">
            Try resetting your year and type filters to see older client listings.
          </p>
        </div>
      )}

    </div>
  );
};

export default Projects;
