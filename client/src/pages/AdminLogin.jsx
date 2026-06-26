import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Mail, Lock, AlertTriangle, KeyRound, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const AdminLogin = () => {
  const { user, login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  // Redirect based on role when user state updates
  useEffect(() => {
    if (user) {
      if (user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
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
      // Redirect is handled by the useEffect above
    } else {
      setError(result.message || 'Incorrect email or password.');
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-[78vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16 relative overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-amber-500/5 blur-[100px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/3 w-64 h-64 rounded-full bg-purple-500/10 blur-[100px] pointer-events-none" />

      <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
        
        {/* Showcase Pane (Left Column) */}
        <div className="lg:col-span-7 space-y-8 text-left hidden lg:block">
          <div className="space-y-4">
            <span className="text-xs font-mono uppercase tracking-widest text-amber-500 font-bold">// SOUNDFOLIO CREATIVE CONTROL</span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight font-sans">
              Manage Your Works <br />
              <span className="bg-gradient-to-r from-amber-500 via-amber-400 to-purple-500 bg-clip-text text-transparent font-black">& Client Projects.</span>
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm max-w-lg leading-relaxed">
              Composer dashboard gateway. Publish new arrangements, organize audio catalog files, and review inbound client briefs.
            </p>
          </div>

          {/* Equalizer Visualizer */}
          <div className="glassmorphism rounded-3xl p-6 border border-zinc-200 dark:border-zinc-850 shadow-md flex items-center justify-between gap-6 max-w-md">
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-mono tracking-widest text-zinc-500 dark:text-zinc-500 font-bold">Studio Engine Active</span>
              <p className="text-xs text-zinc-850 dark:text-zinc-300 font-bold">Streaming Audio Visualizer</p>
            </div>
            
            <div className="flex items-end gap-1 h-10">
              <style>{`
                @keyframes eq-bounce {
                  0%, 100% { height: 20%; }
                  50% { height: 100%; }
                }
                .eq-bar {
                  animation: eq-bounce 1s ease-in-out infinite alternate;
                }
              `}</style>
              {[1.2, 0.8, 1.5, 0.9, 1.3, 0.7, 1.1, 1.4, 0.8, 1.2, 1.0, 1.4].map((duration, i) => (
                <div
                  key={i}
                  className="w-1 rounded-full bg-gradient-to-t from-amber-500 via-amber-400 to-purple-650 eq-bar"
                  style={{
                    animationDuration: `${duration}s`,
                    animationDelay: `${i * 0.08}s`
                  }}
                />
              ))}
            </div>
          </div>

          {/* Core Features list */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-lg">
            <div className="flex gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 flex-shrink-0" />
              <div>
                <h4 className="text-xs font-bold uppercase text-zinc-900 dark:text-white tracking-wider">Project Tracking</h4>
                <p className="text-xs text-zinc-500 dark:text-zinc-500 mt-1 leading-relaxed">Publish revisions, upload media cues, and configure details.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2 flex-shrink-0" />
              <div>
                <h4 className="text-xs font-bold uppercase text-zinc-900 dark:text-white tracking-wider">Inquiry Alerts</h4>
                <p className="text-xs text-zinc-500 dark:text-zinc-500 mt-1 leading-relaxed">Review incoming collaboration briefs and visitor inquiries.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Login Form Panel (Right Column) */}
        <div className="lg:col-span-5 w-full space-y-6">
          
          {/* Mobile Branding Header */}
          <div className="text-center space-y-3 lg:hidden">
            <div className="inline-flex p-3.5 bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-900 dark:to-zinc-950 border border-zinc-200 dark:border-zinc-850 rounded-2xl text-amber-600 dark:text-amber-500 shadow-md">
              <KeyRound size={28} className="stroke-[1.5]" />
            </div>
            <h1 className="text-3xl font-extrabold text-white">SoundFolio Admin</h1>
            <p className="text-zinc-500 text-xs uppercase font-mono tracking-widest">Composer Dashboard Portal</p>
          </div>

          {/* Desktop/Global Login Header */}
          <div className="text-left space-y-1 hidden lg:block">
            <h1 className="text-2xl font-extrabold text-white">Admin Sign In</h1>
            <p className="text-xs text-zinc-500 font-mono uppercase tracking-wider">Composer dashboard gateway</p>
          </div>

          {/* Login Card */}
          <div className="glassmorphism rounded-3xl p-8 md:p-10 shadow-2xl relative overflow-hidden transition-all duration-300 border-t-4 border-t-amber-500">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {error && (
                <div className="p-4 bg-red-950/20 border border-red-500/20 rounded-xl flex items-start gap-3 text-red-400 text-sm">
                  <AlertTriangle size={18} className="flex-shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              {/* Email Input */}
              <div className="flex flex-col gap-2">
                <label className={`text-xs font-bold uppercase tracking-wider transition-colors duration-200 ${emailFocused ? 'text-amber-600 dark:text-amber-500' : 'text-zinc-400'}`}>Admin Email</label>
                <div className="relative">
                  <Mail 
                    size={16} 
                    className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-200 ${emailFocused ? 'text-amber-600 dark:text-amber-500' : 'text-zinc-500'}`} 
                  />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => setEmailFocused(true)}
                    onBlur={() => setEmailFocused(false)}
                    className="w-full pl-11 pr-4 py-3.5 bg-zinc-950/40 border border-zinc-800 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/10 rounded-xl text-sm text-zinc-300 placeholder-zinc-600 focus:outline-none transition-all shadow-inner"
                    placeholder="admin@soundfolio.com"
                    required
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="flex flex-col gap-2">
                <label className={`text-xs font-bold uppercase tracking-wider transition-colors duration-200 ${passwordFocused ? 'text-amber-600 dark:text-amber-500' : 'text-zinc-400'}`}>Password</label>
                <div className="relative">
                  <Lock 
                    size={16} 
                    className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-200 ${passwordFocused ? 'text-amber-600 dark:text-amber-500' : 'text-zinc-500'}`} 
                  />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    onFocus={() => setPasswordFocused(true)}
                    onBlur={() => setPasswordFocused(false)}
                    className="w-full pl-11 pr-11 py-3.5 bg-zinc-950/40 border border-zinc-800 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/10 rounded-xl text-sm text-zinc-300 placeholder-zinc-600 focus:outline-none transition-all shadow-inner"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors focus:outline-none cursor-pointer"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* Submit Action */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 disabled:from-amber-800 disabled:to-amber-900 text-white font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-[0.98] shadow-md shadow-amber-500/10"
              >
                {submitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                    <span>Logging in...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In to Admin Panel</span>
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

export default AdminLogin;
