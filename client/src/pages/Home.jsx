import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Music, Play, Radio, Users, Briefcase, Award, Star } from 'lucide-react';
import API from '../utils/api';
import { useAudio } from '../context/AudioContext';
import TestimonialCard from '../components/TestimonialCard';
import WaveformVisualizer from '../components/WaveformVisualizer';

const Home = () => {
  const [featuredTrack, setFeaturedTrack] = useState(null);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentTrack, isPlaying, playTrack, togglePlay } = useAudio();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [tracksRes, testimonialsRes] = await Promise.all([
          API.get('/tracks'),
          API.get('/testimonials')
        ]);
        
        if (tracksRes.data.success && tracksRes.data.data.length > 0) {
          // Find first track or latest track as featured
          setFeaturedTrack(tracksRes.data.data[0]);
        }
        if (testimonialsRes.data.success) {
          setTestimonials(testimonialsRes.data.data.slice(0, 3)); // show top 3
        }
      } catch (error) {
        console.error('Error fetching home data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const isCurrent = currentTrack?._id === featuredTrack?._id;
  const isFeaturedPlaying = isCurrent && isPlaying;

  const handleFeaturedPlay = () => {
    if (!featuredTrack) return;
    if (isCurrent) {
      togglePlay();
    } else {
      playTrack(featuredTrack, [featuredTrack]);
    }
  };

  // Hero SVG Waveform generator for visual backdrop
  const svgLines = Array.from({ length: 40 }, (_, i) => i);

  return (
    <div className="space-y-24 pb-20 overflow-hidden">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[85vh] flex items-center justify-center pt-10 border-b border-zinc-900/50">
        
        {/* Animated Waveform Background */}
        <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none select-none">
          <div className="flex items-end gap-1.5 h-64">
            {svgLines.map((line, index) => (
              <motion.div
                key={line}
                className="w-1 md:w-2 bg-purple-500 rounded-full"
                initial={{ height: 10 }}
                animate={{
                  height: [
                    20,
                    Math.sin(index * 0.4) * 120 + 130,
                    20
                  ]
                }}
                transition={{
                  duration: 2 + (index % 4) * 0.3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </div>
        </div>

        {/* Ambient Glows */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-purple-500/10 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-amber-500/5 blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900 border border-zinc-800"
          >
            <Radio size={12} className="text-purple-400 animate-pulse" />
            <span className="text-[10px] uppercase tracking-widest font-mono text-zinc-400">Available for Custom Scoring</span>
          </motion.div>

          <div className="space-y-4">
            <motion.h1 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-6xl md:text-8xl font-black tracking-tight"
            >
              Ak <span className="bg-gradient-to-r from-purple-400 via-purple-500 to-amber-400 bg-clip-text text-transparent">Bhuker</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="text-lg md:text-2xl text-zinc-400 font-light tracking-wide max-w-2xl mx-auto"
            >
              Professional Music Composer & Arranger
            </motion.p>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-zinc-500 text-sm max-w-lg mx-auto leading-relaxed"
          >
            Crafting premium cinematic scores, bespoke commercial jingles, and radio-ready arrangements. Translating stories into breathtaking auditory art.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap gap-4 justify-center items-center"
          >
            <Link
              to="/portfolio"
              className="px-8 py-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold tracking-wider uppercase text-xs flex items-center gap-2 transition-all shadow-lg hover:shadow-purple-500/20 active:scale-95"
            >
              <span>Listen to Work</span>
              <Music size={14} />
            </Link>
            <Link
              to="/contact"
              className="px-8 py-4 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-700 font-bold tracking-wider uppercase text-xs transition-all active:scale-95"
            >
              Contact Me
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 2. FEATURED TRACK SECTION */}
      {featuredTrack && (
        <section className="max-w-5xl mx-auto px-4 space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-3xl md:text-4xl font-extrabold">Featured Composition</h2>
            <p className="text-zinc-500 text-sm uppercase tracking-widest font-mono">Composer's Latest Selection</p>
          </div>

          <div className="relative glassmorphism rounded-2xl p-6 md:p-8 flex flex-col md:flex-row gap-8 items-center border border-purple-500/10 shadow-[0_0_50px_rgba(139,92,246,0.03)]">
            <div className="relative w-full md:w-56 h-56 rounded-xl bg-zinc-900 overflow-hidden flex-shrink-0 flex items-center justify-center border border-zinc-800 shadow-md">
              {featuredTrack.imageUrl ? (
                <img 
                  src={featuredTrack.imageUrl} 
                  alt={featuredTrack.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-purple-400">
                  <Play size={48} className="stroke-1" />
                </div>
              )}

              {/* Glowing circular play button overlay */}
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <button
                  onClick={handleFeaturedPlay}
                  className="w-16 h-16 rounded-full bg-purple-500 hover:bg-purple-600 text-white flex items-center justify-center transition-transform hover:scale-105 shadow-xl shadow-purple-500/20"
                  aria-label={isFeaturedPlaying ? 'Pause Featured Track' : 'Play Featured Track'}
                >
                  {isFeaturedPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" className="ml-1" />}
                </button>
              </div>
            </div>

            <div className="flex-1 space-y-4 text-center md:text-left">
              <div className="flex justify-center md:justify-start items-center gap-3">
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-purple-950/80 border border-purple-500/30 text-purple-300">
                  {featuredTrack.category}
                </span>
                <span className="text-xs text-zinc-500 font-mono">
                  {featuredTrack.genre} // {featuredTrack.duration}
                </span>
              </div>

              <h3 className="text-2xl md:text-3xl font-extrabold text-white">{featuredTrack.title}</h3>
              <p className="text-zinc-400 text-sm leading-relaxed max-w-2xl">
                {featuredTrack.description || 'Listen to Ak Bhuker\'s latest musical arrangement. Fully conceptualized, arranged, mixed, and mastered in-house.'}
              </p>

              {isCurrent && (
                <div className="flex items-center justify-center md:justify-start gap-3 mt-4">
                  <WaveformVisualizer isPlaying={isPlaying} barCount={20} color="purple" />
                  <span className="text-xs text-purple-400 font-semibold animate-pulse">Now Playing</span>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* 3. STATISTICS SECTION */}
      <section className="bg-zinc-950/40 border-y border-zinc-900 py-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            
            <div className="space-y-2 p-6 glassmorphism rounded-xl border border-zinc-900">
              <div className="inline-flex p-3 bg-purple-500/5 rounded-lg border border-purple-500/10 text-purple-400 mb-2">
                <Briefcase size={24} />
              </div>
              <h3 className="text-4xl font-extrabold text-white">150+</h3>
              <p className="text-xs uppercase font-mono tracking-widest text-zinc-500">Projects Completed</p>
            </div>

            <div className="space-y-2 p-6 glassmorphism rounded-xl border border-zinc-900">
              <div className="inline-flex p-3 bg-amber-500/5 rounded-lg border border-amber-500/10 text-amber-400 mb-2">
                <Users size={24} />
              </div>
              <h3 className="text-4xl font-extrabold text-white">80+</h3>
              <p className="text-xs uppercase font-mono tracking-widest text-zinc-500">Happy Clients</p>
            </div>

            <div className="space-y-2 p-6 glassmorphism rounded-xl border border-zinc-900">
              <div className="inline-flex p-3 bg-purple-500/5 rounded-lg border border-purple-500/10 text-purple-400 mb-2">
                <Award size={24} />
              </div>
              <h3 className="text-4xl font-extrabold text-white">10+</h3>
              <p className="text-xs uppercase font-mono tracking-widest text-zinc-500">Years Experience</p>
            </div>

          </div>
        </div>
      </section>

      {/* 4. TESTIMONIALS SECTION */}
      {testimonials.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-2">
            <h2 className="text-3xl md:text-4xl font-extrabold">Client Endorsements</h2>
            <p className="text-zinc-500 text-sm uppercase tracking-widest font-mono">What Directors & Brands Say</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t._id} className="h-full">
                <TestimonialCard testimonial={t} />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 5. CALL TO ACTION SECTION */}
      <section className="max-w-5xl mx-auto px-4">
        <div className="bg-gradient-to-r from-purple-950/40 to-zinc-900/60 border border-purple-500/10 rounded-3xl p-8 md:p-16 text-center space-y-6 relative overflow-hidden shadow-[0_0_50px_rgba(139,92,246,0.04)]">
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-purple-500/5 blur-[80px] pointer-events-none" />
          
          <h2 className="text-3xl md:text-5xl font-black leading-tight max-w-2xl mx-auto">
            Ready to Elevate Your Project With Custom Music?
          </h2>
          <p className="text-zinc-400 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
            Let's collaborate. Whether you need a cinematic sweep, a catchy corporate brand hook, or a crisp mix/master, Ak Bhuker delivers professional music on schedule.
          </p>
          <div className="pt-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white font-bold tracking-wider uppercase text-xs transition-all active:scale-95 hover:shadow-lg hover:shadow-purple-500/20"
            >
              <span>Get in Touch Now</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
