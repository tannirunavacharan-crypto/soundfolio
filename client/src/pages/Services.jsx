import React, { useState, useEffect } from 'react';
import API from '../utils/api';
import ServiceCard from '../components/ServiceCard';
import { Settings, ShieldCheck, MailQuestion } from 'lucide-react';

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await API.get('/services');
        if (response.data.success) {
          setServices(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching services:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      
      {/* Page Header */}
      <div className="text-center space-y-3">
        <span className="text-xs font-mono uppercase tracking-widest text-amber-500 font-bold">// BESPOKE AUDIO</span>
        <h1 className="text-4xl md:text-5xl font-extrabold text-white">Services & Pricing</h1>
        <p className="text-zinc-500 text-sm max-w-lg mx-auto">
          Tailored composition packages to elevate your visual medium or record production. Selected services deliver industry-standard masters.
        </p>
      </div>

      {/* Services Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
          {[1, 2, 3, 4, 5].map((n) => (
            <div key={n} className="bg-zinc-900 border border-zinc-800 rounded-xl h-64"></div>
          ))}
        </div>
      ) : services.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ServiceCard key={service._id} service={service} index={index} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-zinc-900/30 border border-zinc-900 rounded-xl space-y-4">
          <div className="inline-flex p-4 bg-zinc-900 rounded-full text-zinc-700">
            <Settings size={32} />
          </div>
          <h3 className="text-lg font-semibold text-zinc-400">No services posted yet</h3>
          <p className="text-sm text-zinc-600 max-w-sm mx-auto">
            The administrator has not configured services yet. Please check back shortly or make inquiries directly.
          </p>
        </div>
      )}

      {/* Workflow Information Panel */}
      <section className="bg-zinc-900/40 border border-zinc-900 rounded-2xl p-8 md:p-12 grid grid-cols-1 lg:grid-cols-3 gap-8 items-center relative overflow-hidden">
        <div className="lg:col-span-2 space-y-4">
          <div className="inline-flex items-center gap-2 text-purple-400">
            <ShieldCheck size={18} />
            <span className="text-xs uppercase font-bold tracking-widest font-mono">COLLABORATION PROCESS</span>
          </div>
          <h3 className="text-2xl font-bold text-white">How We Work Together</h3>
          <p className="text-zinc-400 text-sm leading-relaxed max-w-2xl">
            After submitting an inquiry, we arrange a call or video chat to review your script, video cues, or references. Ak shares early audio drafts (sketches) for review, incorporating feedback before proceeding to the final mixing and mastering stage.
          </p>
        </div>

        <div className="bg-zinc-950 border border-zinc-800 p-6 rounded-xl space-y-4 text-center lg:text-left">
          <div className="flex justify-center lg:justify-start text-amber-500">
            <MailQuestion size={24} />
          </div>
          <h4 className="font-semibold text-white">Have a unique request?</h4>
          <p className="text-xs text-zinc-500">
            Custom podcast packaging, sound design loops, or theatrical scoring are quoted on demand.
          </p>
          <a
            href="/contact"
            className="inline-block text-xs font-bold text-purple-400 hover:text-purple-300 transition-colors uppercase tracking-wider"
          >
            Ask a Question →
          </a>
        </div>
      </section>

    </div>
  );
};

export default Services;
