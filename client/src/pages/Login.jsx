import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Mail, Lock, AlertTriangle, KeyRound } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const { user, login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // If already logged in, redirect to dashboard immediately
  useEffect(() => {
    if (user && user.role === 'admin') {
      navigate('/admin');
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError(''); // clear error when user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email.trim() || !formData.password.trim()) {
      setError('Please fill in all credentials.');
      return;
    }

    setSubmitting(true);
    setError('');
    
    const result = await login(formData.email, formData.password);
    
    if (result.success) {
      navigate('/admin');
    } else {
      setError(result.message || 'Incorrect email or password.');
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-16 relative">
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-purple-500/10 blur-[100px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/3 w-64 h-64 rounded-full bg-amber-500/5 blur-[100px] pointer-events-none" />

      <div className="w-full max-w-md relative z-10 space-y-6">
        
        {/* Branding header */}
        <div className="text-center space-y-2">
          <div className="inline-flex p-3.5 bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 rounded-2xl text-amber-500 shadow-md">
            <KeyRound size={28} className="stroke-[1.5]" />
          </div>
          <h1 className="text-3xl font-extrabold text-white">SoundFolio Admin</h1>
          <p className="text-zinc-500 text-xs uppercase font-mono tracking-widest">Composer Dashboard Portal</p>
        </div>

        {/* Login Card */}
        <div className="glassmorphism rounded-2xl p-6 md:p-8 border border-zinc-800 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {error && (
              <div className="p-4 bg-red-950/20 border border-red-500/20 rounded-xl flex items-start gap-3 text-red-400 text-sm">
                <AlertTriangle size={18} className="flex-shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            {/* Email Input */}
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-zinc-400">Admin Email</label>
              <div className="relative">
                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-11 pr-4 py-3 bg-zinc-950 border border-zinc-800 focus:border-purple-500 rounded-xl text-sm text-zinc-300 placeholder-zinc-650 focus:outline-none transition-all"
                  placeholder="admin@soundfolio.com"
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="text-xs font-bold uppercase tracking-wider text-zinc-400">Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
                <input
                  id="password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-11 pr-4 py-3 bg-zinc-950 border border-zinc-800 focus:border-purple-500 rounded-xl text-sm text-zinc-300 placeholder-zinc-650 focus:outline-none transition-all"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {/* Submit Action */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 disabled:from-purple-800 disabled:to-purple-900 text-white font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all active:scale-95 shadow-md shadow-purple-500/10"
            >
              {submitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                  <span>Logging in...</span>
                </>
              ) : (
                <>
                  <span>Sign In to Panel</span>
                  <Shield size={12} className="text-amber-400" />
                </>
              )}
            </button>

          </form>
        </div>

        {/* Back Link */}
        <div className="text-center">
          <a
            href="/"
            className="text-xs text-zinc-500 hover:text-zinc-400 transition-colors uppercase tracking-widest font-mono"
          >
            ← Return to Portfolio Website
          </a>
        </div>

      </div>
    </div>
  );
};

export default Login;
