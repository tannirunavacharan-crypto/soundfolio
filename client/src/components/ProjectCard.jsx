import React from 'react';
import { Film, Clapperboard } from 'lucide-react';

const ProjectCard = ({ project }) => {
  return (
    <div className="glassmorphism rounded-xl overflow-hidden group hover:border-amber-500/20 hover:shadow-[0_0_30px_rgba(251,191,36,0.06)] hover:scale-[1.02] transition-all duration-300 flex flex-col h-full">
      {/* Cover / Image block */}
      <div className="relative h-48 bg-zinc-900 overflow-hidden flex items-center justify-center border-b border-zinc-800/80">
        {project.imageUrl ? (
          <img 
            src={project.imageUrl} 
            alt={project.clientName} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
        ) : (
          <div className="text-zinc-600 flex flex-col items-center gap-2">
            <Film size={40} className="stroke-1 text-zinc-500 group-hover:text-amber-400 transition-colors duration-300" />
            <span className="text-xs uppercase tracking-wider text-zinc-500">Cinematic Work</span>
          </div>
        )}
        
        {/* Floating Category Badge */}
        <div className="absolute top-4 left-4 flex gap-2">
          <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded bg-amber-500 text-zinc-950 font-sans shadow-md">
            {project.projectType}
          </span>
          <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded bg-zinc-900 border border-zinc-700 text-zinc-300 font-mono shadow-md">
            {project.year}
          </span>
        </div>
      </div>

      {/* Project Details */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-white group-hover:text-amber-400 transition-colors duration-300">
            {project.clientName}
          </h3>
          <p className="text-sm text-zinc-400 leading-relaxed font-sans line-clamp-4">
            {project.description}
          </p>
        </div>
        
        {/* Decorative subtle visual marker */}
        <div className="pt-4 mt-4 border-t border-zinc-900 flex items-center justify-between text-xs text-zinc-500">
          <span className="flex items-center gap-1.5">
            <Clapperboard size={12} className="text-amber-500/80" />
            <span>Soundfolio Certified</span>
          </span>
          <span className="text-amber-500/20 group-hover:text-amber-500/50 transition-colors duration-300 font-mono">
            // COMPOSITION
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
