import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Play } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-zinc-950 border-t border-zinc-900 pt-16 pb-24 md:pb-8 relative z-10">
      {/* Background glow overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-purple-950/10 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Logo & Bio Info Column */}
          <div className="space-y-4 text-center md:text-left">
            <Link to="/" className="inline-block">
              <span className="font-extrabold text-2xl tracking-wider text-white uppercase font-mono">
                Sound<span className="text-purple-500">Folio</span>
              </span>
            </Link>
            <p className="text-zinc-500 text-xs tracking-widest uppercase font-mono">
              Ak Bhuker // Music Composer
            </p>
            <p className="text-zinc-400 text-sm max-w-sm">
              Creating unforgettable sonic landscapes and custom arrangements for cinema, commercials, and independent artists globally.
            </p>
          </div>

          {/* Contact Details Column */}
          <div className="space-y-4 text-center md:text-left">
            <h4 className="text-xs uppercase font-bold tracking-widest text-white border-b border-zinc-900 pb-2">
              Contact Info
            </h4>
            <ul className="space-y-3 text-sm text-zinc-400">
              <li className="flex items-center justify-center md:justify-start gap-2.5">
                <Mail size={14} className="text-purple-400" />
                <a href="mailto:akbhuker642@gmail.com" className="hover:text-white transition-colors">
                  akbhuker642@gmail.com
                </a>
              </li>
              <li className="flex items-center justify-center md:justify-start gap-2.5">
                <Phone size={14} className="text-amber-500" />
                <a href="tel:+919876543210" className="hover:text-white transition-colors">
                  +91 98765 43210
                </a>
              </li>
              <li className="flex items-center justify-center md:justify-start gap-2.5">
                <MapPin size={14} className="text-purple-400" />
                <span>Hyderabad, India // Remote Worldwide</span>
              </li>
            </ul>
          </div>

          {/* Social Platforms Links Column */}
          <div className="space-y-4 text-center md:text-left">
            <h4 className="text-xs uppercase font-bold tracking-widest text-white border-b border-zinc-900 pb-2">
              Follow Ak Bhuker
            </h4>
            <p className="text-zinc-400 text-sm mb-4">
              Listen to work and stay updated on active scoring projects:
            </p>
            <div className="flex justify-center md:justify-start gap-3">
              <a
                href="https://spotify.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-zinc-900 border border-zinc-800 hover:border-purple-500 text-zinc-400 hover:text-white rounded-lg transition-all"
                aria-label="Spotify"
              >
                {/* Simulated Spotify Icon using clean music/play combo or text */}
                <span className="text-[10px] font-bold font-mono">SPOTIFY</span>
              </a>
              <a
                href="https://soundcloud.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-zinc-900 border border-zinc-800 hover:border-amber-500 text-zinc-400 hover:text-white rounded-lg transition-all"
                aria-label="SoundCloud"
              >
                <span className="text-[10px] font-bold font-mono">S_CLOUD</span>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-zinc-900 border border-zinc-800 hover:border-purple-500 text-zinc-400 hover:text-white rounded-lg transition-all flex items-center justify-center"
                aria-label="YouTube"
              >
                <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="currentColor"></polygon>
                </svg>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-zinc-900 border border-zinc-800 hover:border-amber-500 text-zinc-400 hover:text-white rounded-lg transition-all flex items-center justify-center"
                aria-label="Instagram"
              >
                <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Credits Area */}
        <div className="border-t border-zinc-900 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center text-xs text-zinc-500 gap-4">
          <p>© {currentYear} SoundFolio. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/login" className="hover:text-zinc-400 transition-colors">Admin Panel</Link>
            <span className="text-zinc-800">|</span>
            <span className="text-zinc-600 font-mono">Designed for Music Production Excellence</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
