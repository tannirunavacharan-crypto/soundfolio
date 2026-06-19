import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { Menu, X, Music, LogOut, LayoutDashboard } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    logout();
    setIsOpen(false);
    navigate('/');
  };

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/portfolio', label: 'Portfolio' },
    { path: '/services', label: 'Services' },
    { path: '/projects', label: 'Projects' },
    { path: '/contact', label: 'Contact' },
  ];

  const activeStyle = ({ isActive }) => 
    `text-sm font-semibold tracking-wider transition-colors duration-300 uppercase ${
      isActive 
        ? 'text-purple-400 border-b-2 border-purple-500 pb-1' 
        : 'text-zinc-400 hover:text-white'
    }`;

  const activeMobileStyle = ({ isActive }) =>
    `block py-3 px-4 text-base font-semibold tracking-widest rounded-lg transition-colors ${
      isActive 
        ? 'bg-purple-950/50 text-purple-400 border-l-4 border-purple-500' 
        : 'text-zinc-400 hover:text-white hover:bg-zinc-900/50'
    }`;

  return (
    <nav className="sticky top-0 z-50 glassmorphism shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo / Brand */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="p-2 bg-gradient-to-br from-purple-600 to-purple-800 rounded-lg group-hover:shadow-[0_0_15px_rgba(139,92,246,0.4)] transition-all">
              <Music className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg tracking-wider text-white group-hover:text-purple-400 transition-colors uppercase leading-none font-mono">
                SoundFolio
              </span>
              <span className="text-[9px] text-zinc-500 tracking-widest uppercase font-mono mt-0.5 leading-none">
                Ak Bhuker
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink key={link.path} to={link.path} className={activeStyle}>
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Desktop Admin controls / Login */}
          <div className="hidden lg:flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-3">
                <Link
                  to="/admin"
                  className="px-4 py-2 rounded-lg bg-purple-600/10 hover:bg-purple-600/20 border border-purple-500/30 text-purple-400 hover:text-purple-300 font-semibold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all"
                >
                  <LayoutDashboard size={14} />
                  <span>Dashboard</span>
                </Link>
                <button
                  onClick={handleLogoutClick}
                  className="px-4 py-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-white font-semibold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all"
                  aria-label="Logout"
                >
                  <LogOut size={14} />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-zinc-950 font-bold text-xs uppercase tracking-widest transition-all shadow-md hover:shadow-amber-500/10 active:scale-95"
              >
                Admin Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-zinc-400 hover:text-white hover:bg-zinc-900 focus:outline-none"
              aria-expanded={isOpen}
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className="lg:hidden border-t border-zinc-900 bg-zinc-950/95 backdrop-blur-md">
          <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={activeMobileStyle}
              >
                {link.label}
              </NavLink>
            ))}
            
            {/* Mobile Auth Actions */}
            <div className="pt-4 mt-4 border-t border-zinc-900 px-3">
              {user ? (
                <div className="space-y-2">
                  <Link
                    to="/admin"
                    onClick={() => setIsOpen(false)}
                    className="w-full py-3 px-4 rounded-lg bg-purple-600 text-white font-bold text-sm uppercase tracking-widest flex items-center justify-center gap-2"
                  >
                    <LayoutDashboard size={16} />
                    <span>Dashboard</span>
                  </Link>
                  <button
                    onClick={handleLogoutClick}
                    className="w-full py-3 px-4 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-400 font-bold text-sm uppercase tracking-widest flex items-center justify-center gap-2 border border-zinc-800"
                  >
                    <LogOut size={16} />
                    <span>Logout</span>
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-amber-600 to-amber-500 text-zinc-950 font-bold text-sm uppercase tracking-widest flex items-center justify-center"
                >
                  Admin Login
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
