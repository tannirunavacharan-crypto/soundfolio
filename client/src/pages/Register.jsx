import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User, AlertTriangle, PlayCircle, KeyRound } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import API from '../utils/api';

const Register = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, confirmPassword } = formData;

    if (!name.trim() || !email.trim() || !password.trim()) {
      setError('Please fill in all required fields.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (password.length < 5) {
      setError('Password must be at least 5 characters long.');
      return;
    }

    setSubmitting(true);
    setError('');
    
    try {
      const response = await API.post('/auth/register', { name, email, password });
      
      if (response.data.success) {
        setSuccess('Registration successful! Logging you in...');
        
        // Auto-login the user
        const loginResult = await login(email, password);
        
        if (loginResult.success) {
          setTimeout(() => {
            navigate('/dashboard');
          }, 1500);
        } else {
          navigate('/login');
        }
      }
    } catch (err) {
      console.error('Registration failed:', err);
      setError(err.response?.data?.message || 'Registration failed. Please check credentials.');
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
          <div className="inline-flex p-3.5 bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 rounded-2xl text-purple-400 shadow-md">
            <KeyRound size={28} className="stroke-[1.5]" />
          </div>
          <h1 className="text-3xl font-extrabold text-white">Client Portal</h1>
          <p className="text-zinc-500 text-xs uppercase font-mono tracking-widest">Register a Composer Project Account</p>
        </div>

        {/* Register Card */}
        <div className="glassmorphism rounded-2xl p-6 md:p-8 border border-zinc-800 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {error && (
              <div className="p-4 bg-red-950/20 border border-red-500/20 rounded-xl flex items-start gap-3 text-red-400 text-sm">
                <AlertTriangle size={18} className="flex-shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            {success && (
              <div className="p-4 bg-emerald-950/20 border border-emerald-500/20 rounded-xl flex items-start gap-3 text-emerald-400 text-sm">
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-emerald-400 border-t-transparent mt-0.5" />
                <span>{success}</span>
              </div>
            )}

            {/* Name Input */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="name" className="text-xs font-bold uppercase tracking-wider text-zinc-400">Full Name *</label>
              <div className="relative">
                <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full pl-11 pr-4 py-3 bg-zinc-950 border border-zinc-800 focus:border-purple-500 rounded-xl text-sm text-zinc-300 placeholder-zinc-550 focus:outline-none transition-all"
                  placeholder="John Doe"
                  required
                />
              </div>
            </div>

            {/* Email Input */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-zinc-400">Email Address *</label>
              <div className="relative">
                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-11 pr-4 py-3 bg-zinc-950 border border-zinc-800 focus:border-purple-500 rounded-xl text-sm text-zinc-300 placeholder-zinc-550 focus:outline-none transition-all"
                  placeholder="john@example.com"
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="password" className="text-xs font-bold uppercase tracking-wider text-zinc-400">Password *</label>
              <div className="relative">
                <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
                <input
                  id="password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-11 pr-4 py-3 bg-zinc-950 border border-zinc-800 focus:border-purple-500 rounded-xl text-sm text-zinc-300 placeholder-zinc-650 focus:outline-none transition-all"
                  placeholder="Min 5 characters"
                  required
                />
              </div>
            </div>

            {/* Confirm Password Input */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="confirmPassword" className="text-xs font-bold uppercase tracking-wider text-zinc-400">Confirm Password *</label>
              <div className="relative">
                <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
                <input
                  id="confirmPassword"
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full pl-11 pr-4 py-3 bg-zinc-950 border border-zinc-800 focus:border-purple-500 rounded-xl text-sm text-zinc-300 placeholder-zinc-650 focus:outline-none transition-all"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {/* Submit Action */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 disabled:from-purple-800 disabled:to-purple-900 text-white font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all active:scale-95 shadow-md shadow-purple-500/10"
              >
                {submitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                    <span>Creating Account...</span>
                  </>
                ) : (
                  <>
                    <span>Create Client Account</span>
                    <PlayCircle size={14} className="text-purple-300" />
                  </>
                )}
              </button>
            </div>

          </form>
        </div>

        {/* Back Link */}
        <div className="text-center space-y-4">
          <div className="text-xs text-zinc-500">
            Already have a client account?{' '}
            <a href="/login" className="text-purple-450 hover:text-purple-400 font-semibold hover:underline">
              Log In
            </a>
          </div>
          <div>
            <a
              href="/"
              className="text-xs text-zinc-500 hover:text-zinc-400 transition-colors uppercase tracking-widest font-mono block"
            >
              ← Return to Portfolio Website
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Register;
