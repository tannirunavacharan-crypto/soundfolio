import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, ArrowRight, Star, HeartHandshake, Settings, Sliders, Music4 } from 'lucide-react';

const ServiceCard = ({ service, index }) => {
  const navigate = useNavigate();

  const handleRequestQuote = () => {
    // Navigate to contact form and pass the service title as pre-filled state
    navigate('/contact', { state: { projectType: service.title } });
  };

  // Assign distinct icons based on index or title
  const getIcon = () => {
    const title = service.title.toLowerCase();
    if (title.includes('score') || title.includes('film')) {
      return <Music4 className="text-purple-400 w-8 h-8" />;
    } else if (title.includes('jingle') || title.includes('brand')) {
      return <Star className="text-amber-400 w-8 h-8 animate-pulse-slow" />;
    } else if (title.includes('arrangement') || title.includes('instrument')) {
      return <HeartHandshake className="text-purple-400 w-8 h-8" />;
    } else if (title.includes('mixing') || title.includes('master')) {
      return <Sliders className="text-amber-400 w-8 h-8" />;
    }
    return <Settings className="text-purple-400 w-8 h-8" />;
  };

  return (
    <div className="glassmorphism rounded-xl p-6 md:p-8 flex flex-col justify-between hover:border-purple-500/20 hover:shadow-[0_0_40px_rgba(139,92,246,0.06)] hover:scale-[1.01] transition-all duration-300 relative group overflow-hidden">
      {/* Visual top border indicator */}
      <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${
        index % 2 === 0 ? 'from-purple-500 to-purple-800' : 'from-amber-500 to-amber-600'
      } opacity-50 group-hover:opacity-100 transition-opacity duration-300`} />

      <div>
        <div className="flex justify-between items-start mb-6">
          <div className="p-3 bg-zinc-900 border border-zinc-800 rounded-lg group-hover:border-zinc-700/80 transition-colors">
            {getIcon()}
          </div>
          <span className="text-5xl font-extrabold text-zinc-800/40 select-none font-mono">
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>

        <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-purple-400 transition-colors duration-300">
          {service.title}
        </h3>
        
        <p className="text-zinc-400 text-sm leading-relaxed mb-6 font-sans">
          {service.description}
        </p>
      </div>

      <div className="space-y-4 pt-4 border-t border-zinc-900">
        <div className="flex items-center gap-2 text-xs text-zinc-500 font-mono">
          <Clock size={14} className="text-zinc-400" />
          <span>EST. TIMELINE: </span>
          <span className="text-zinc-300 font-semibold">{service.turnaroundTime}</span>
        </div>

        <button
          onClick={handleRequestQuote}
          className="w-full py-3 px-4 rounded-lg bg-zinc-900 hover:bg-purple-600 border border-zinc-800 hover:border-purple-500 text-zinc-300 hover:text-white font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 group-hover:shadow-[0_0_15px_rgba(139,92,246,0.1)]"
        >
          <span>Request Quote</span>
          <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  );
};

export default ServiceCard;
