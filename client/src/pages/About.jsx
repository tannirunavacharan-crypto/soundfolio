import React from 'react';
import { motion } from 'framer-motion';
import { Award, Target, Music, CheckCircle2, Cpu, Calendar } from 'lucide-react';

const About = () => {
  const skills = [
    { name: 'Film Scoring & Underscoring', percentage: 95 },
    { name: 'Orchestral Arrangement', percentage: 90 },
    { name: 'Jingle Writing & Sonic Branding', percentage: 92 },
    { name: 'Audio Mixing & Mastering', percentage: 88 },
    { name: 'Synthesizer Programming & Sound Design', percentage: 85 },
  ];

  const milestones = [
    {
      year: '2025',
      title: 'Scored "Stellar Drift" Sci-Fi Short',
      desc: 'Composed and arranged the entire cinematic soundscape, recording live violins and cellos, earning a Best Score nomination at the Indie Film Fest.',
    },
    {
      year: '2023',
      title: 'Sonic Branding Lead at Velocity Motors',
      desc: 'Crafted the official electric startup sound and commercial audio suites for their new lineup of hybrid roadsters.',
    },
    {
      year: '2021',
      title: 'Founded SoundFolio Studio',
      desc: 'Launched a professional, acoustically treated mixing facility in Hyderabad, offering remote composition and mixing worldwide.',
    },
    {
      year: '2018',
      title: 'Lead Arranger at Tide Records',
      desc: 'Wrote orchestral string parts and backing instrumentation for multiple chart-topping pop and acoustic rock albums.',
    },
    {
      year: '2015',
      title: 'Graduated in Composition & Audio Tech',
      desc: 'Completed formal education in music synthesis, composition, and sound reinforcement systems, transitioning into full-time scoring.',
    },
  ];

  const studioGear = [
    { category: 'Workstations & Interfaces', items: ['Logic Pro X', 'Pro Tools Ultimate', 'Universal Audio Apollo x8p'] },
    { category: 'Monitoring', items: ['Genelec 8040B Studio Monitors', 'Sennheiser HD600 Reference Headphones'] },
    { category: 'Synthesizers & Instruments', items: ['Moog Subsequent 37', 'Nord Stage 4', 'Gibson Les Paul Custom Guitar'] },
    { category: 'Key Sample Libraries', items: ['Spitfire Symphonic Orchestra', 'Native Instruments Komplete 14 Ultimate', 'Spectrasonic Omnisphere 2'] },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-24">
      
      {/* 1. BIO HERO ZONE */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Photo Container */}
        <div className="lg:col-span-5 relative group">
          <div className="absolute inset-0 bg-gradient-to-tr from-purple-500 to-amber-500 rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity" />
          <div className="relative border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl bg-zinc-900 aspect-square lg:aspect-[4/5]">
            <img 
              src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=600" 
              alt="Ak Bhuker in studio" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Visual grid texture overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-80" />
            
            <div className="absolute bottom-6 left-6 right-6 space-y-1">
              <p className="text-xl font-bold text-white">Ak Bhuker</p>
              <p className="text-xs text-purple-400 font-mono tracking-widest uppercase">Composer / Producer / Mixer</p>
            </div>
          </div>
        </div>

        {/* Bio text */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-purple-500 font-bold">// THE COMPOSER</span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white">Ak Bhuker</h1>
          </div>

          <p className="text-zinc-300 leading-relaxed font-sans text-base">
            Ak Bhuker is a visionary music composer, arranger, and multi-instrumentalist based in Hyderabad, India, crafting bespoke sonic worlds for film, advertising, and recording artists. Known for fusing rich classical orchestration with cutting-edge analog synthesis, his work is designed to breathe life and deep emotional weight into visual media.
          </p>

          <p className="text-zinc-400 leading-relaxed text-sm">
            Over the past decade, Ak has collaborated with independent directors, advertising agencies, and music labels to deliver soundtracks that captivate. From subtle, suspenseful thriller background cues to full-scale cinematic themes and catchy brand identities, he approaches every project with meticulous arrangement and sonic focus.
          </p>

          {/* Core Values Quick Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
            <div className="flex items-start gap-3 p-4 rounded-xl bg-zinc-900 border border-zinc-800/50">
              <Award className="text-amber-400 w-5 h-5 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-semibold text-white">Quality Driven</h4>
                <p className="text-xs text-zinc-500 mt-1">High-end sample libraries and hardware mixing routes.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 rounded-xl bg-zinc-900 border border-zinc-800/50">
              <Target className="text-purple-400 w-5 h-5 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-semibold text-white">Strict Timelines</h4>
                <p className="text-xs text-zinc-500 mt-1">Delivered on schedule, aligned with post-production cuts.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SKILLS MATRIX SECTION */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-zinc-950/40 border-y border-zinc-900/60 py-16 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div className="space-y-6">
          <span className="text-xs font-mono uppercase tracking-widest text-amber-500 font-bold">// CAPABILITIES</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white">Musical Journey & Expertise</h2>
          <p className="text-zinc-400 text-sm leading-relaxed max-w-lg">
            Every audio track undergoes a structured pipeline: sketching, midi arrangement, recording, multi-track mixing, and master processing. Here are the core areas where Ak contributes to projects:
          </p>
          <ul className="space-y-3 text-sm text-zinc-300">
            {['Film scoring for indie shorts & features', 'Bespoke corporate advertising jingles', 'String and horn arrangement for bands', 'Analog synthesis and ambient sound design'].map((item, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-purple-400 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Skill sliders */}
        <div className="space-y-6">
          {skills.map((skill, idx) => (
            <div key={idx} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-semibold text-white">{skill.name}</span>
                <span className="text-purple-400 font-mono font-bold">{skill.percentage}%</span>
              </div>
              <div className="h-2 bg-zinc-900 border border-zinc-800 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.percentage}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: idx * 0.1 }}
                  className="h-full bg-gradient-to-r from-purple-600 to-purple-400 rounded-full"
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. TIMELINE OF CAREER MILESTONES */}
      <section className="space-y-12">
        <div className="text-center space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest text-purple-500 font-bold">// TIMELINE</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white">Career Milestones</h2>
          <p className="text-zinc-500 text-sm max-w-lg mx-auto">The journey of building SoundFolio and crafting compositions.</p>
        </div>

        <div className="relative border-l border-zinc-800 max-w-3xl mx-auto pl-6 md:pl-8 space-y-12">
          {milestones.map((m, idx) => (
            <div key={idx} className="relative">
              {/* Timeline dot */}
              <div className="absolute -left-[31px] md:-left-[39px] top-1.5 p-1 bg-zinc-950 rounded-full border-2 border-purple-500 text-purple-400">
                <Calendar size={12} className="fill-purple-500/10" />
              </div>
              
              <div className="space-y-2 group">
                <span className="inline-block text-xs font-bold font-mono px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-amber-400 group-hover:border-amber-500/40 transition-colors">
                  {m.year}
                </span>
                <h3 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors">
                  {m.title}
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed font-sans max-w-2xl">
                  {m.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. STUDIO GEAR & SOFTWARE MATRIX */}
      <section className="glassmorphism rounded-2xl p-8 md:p-12 space-y-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-amber-500/5 blur-[80px] pointer-events-none" />

        <div className="space-y-3">
          <div className="inline-flex p-3 bg-zinc-900 border border-zinc-800 rounded-lg text-purple-400">
            <Cpu size={24} />
          </div>
          <h2 className="text-3xl font-extrabold text-white">SoundFolio Studio Gear</h2>
          <p className="text-zinc-400 text-sm max-w-lg">A peek into the primary production environment where Ak arranges and mixes tracks:</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-6 border-t border-zinc-950">
          {studioGear.map((gear, idx) => (
            <div key={idx} className="space-y-3 p-4 bg-zinc-900/50 border border-zinc-900 rounded-xl hover:border-zinc-800 transition-all">
              <h4 className="text-xs uppercase font-bold tracking-widest text-amber-400 font-mono">{gear.category}</h4>
              <ul className="space-y-2 text-sm text-zinc-400">
                {gear.items.map((item, itemIdx) => (
                  <li key={itemIdx} className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-500/80" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default About;
