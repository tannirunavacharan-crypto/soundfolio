import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, AlertTriangle, KeyRound, Eye, EyeOff } from 'lucide-react';
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
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-purple-500/8 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-amber-500/4 blur-[130px] pointer-events-none" />

      <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
        
        {/* Showcase Pane (Left Column) */}
        <div className="lg:col-span-7 space-y-8 text-left hidden lg:block">
          <div className="space-y-4">
            <span className="text-xs font-mono uppercase tracking-widest text-purple-650 dark:text-purple-400 font-bold">// SOUNDFOLIO CLIENT CONSOLE</span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight font-sans">
              Bespoke Soundtracks <br />
              <span className="bg-gradient-to-r from-purple-600 via-purple-450 to-amber-500 bg-clip-text text-transparent font-black">Tailored to Your Vision.</span>
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm max-w-lg leading-relaxed">
              Welcome back to your private creative hub. Review composition drafts, stream high-fidelity scoring reels, and collaborate directly with Ak Bhuker.
            </p>
          </div>

          {/* Equalizer Visualizer */}
          <div className="glassmorphism rounded-3xl p-6 border border-zinc-200 dark:border-zinc-850 shadow-md flex items-center justify-between gap-6 max-w-md">
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-mono tracking-widest text-zinc-500 dark:text-zinc-500 font-bold">Studio Engine Active</span>
              <p className="text-xs text-zinc-800 dark:text-zinc-300 font-bold">Streaming Audio Visualizer</p>
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
                  className="w-1 rounded-full bg-gradient-to-t from-purple-600 via-purple-500 to-amber-500 eq-bar"
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
              <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2 flex-shrink-0" />
              <div>
                <h4 className="text-xs font-bold uppercase text-zinc-900 dark:text-white tracking-wider">Cinematic Scoring</h4>
                <p className="text-xs text-zinc-500 dark:text-zinc-500 mt-1 leading-relaxed">Direct access to project audio cues and timeline arrangements.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 flex-shrink-0" />
              <div>
                <h4 className="text-xs font-bold uppercase text-zinc-900 dark:text-white tracking-wider">High-Fidelity Audio</h4>
                <p className="text-xs text-zinc-500 dark:text-zinc-500 mt-1 leading-relaxed">Listen to master files in full lossless detail directly in the browser.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Login Form Panel (Right Column) */}
        <div className="lg:col-span-5 w-full space-y-6">
          
          {/* Mobile Branding Header */}
          <div className="text-center space-y-3 lg:hidden">
            <div className="inline-flex p-3.5 bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-900 dark:to-zinc-950 border border-zinc-200 dark:border-zinc-850 rounded-2xl text-purple-600 dark:text-purple-400 shadow-md">
              <KeyRound size={28} className="stroke-[1.5]" />
            </div>
            <h1 className="text-3xl font-extrabold text-white">Client Portal</h1>
            <p className="text-zinc-500 text-xs uppercase font-mono tracking-widest">Sign In to Client Projects & Music</p>
          </div>

          {/* Desktop/Global Login Header */}
          <div className="text-left space-y-1 hidden lg:block">
            <h1 className="text-2xl font-extrabold text-white">Client Sign In</h1>
            <p className="text-xs text-zinc-500 font-mono uppercase tracking-wider">Enter your account credentials</p>
          </div>

          {/* Login Card */}
          <div className="glassmorphism rounded-3xl p-8 md:p-10 shadow-2xl relative overflow-hidden transition-all duration-300 border-t-4 border-t-purple-500">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {error && (
                <div className="p-4 bg-red-950/20 border border-red-500/20 rounded-xl flex items-start gap-3 text-red-400 text-sm">
                  <AlertTriangle size={18} className="flex-shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              {/* Email Input */}
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className={`text-xs font-bold uppercase tracking-wider transition-colors duration-200 ${emailFocused ? 'text-purple-600 dark:text-purple-400' : 'text-zinc-400'}`}>
                  Email Address
                </label>
                <div className="relative">
                  <Mail 
                    size={16} 
                    className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-200 ${emailFocused ? 'text-purple-600 dark:text-purple-400' : 'text-zinc-500'}`} 
                  />
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => setEmailFocused(true)}
                    onBlur={() => setEmailFocused(false)}
                    className="w-full pl-11 pr-4 py-3.5 bg-zinc-950/40 border border-zinc-800 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/10 rounded-xl text-sm text-zinc-300 placeholder-zinc-600 focus:outline-none transition-all shadow-inner"
                    placeholder="john@example.com"
                    required
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="flex flex-col gap-2">
                <label htmlFor="password" className={`text-xs font-bold uppercase tracking-wider transition-colors duration-200 ${passwordFocused ? 'text-purple-600 dark:text-purple-400' : 'text-zinc-400'}`}>
                  Password
                </label>
                <div className="relative">
                  <Lock 
                    size={16} 
                    className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-200 ${passwordFocused ? 'text-purple-600 dark:text-purple-400' : 'text-zinc-500'}`} 
                  />
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    onFocus={() => setPasswordFocused(true)}
                    onBlur={() => setPasswordFocused(false)}
                    className="w-full pl-11 pr-11 py-3.5 bg-zinc-950/40 border border-zinc-800 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/10 rounded-xl text-sm text-zinc-300 placeholder-zinc-600 focus:outline-none transition-all shadow-inner"
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
                className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 disabled:from-purple-800 disabled:to-purple-900 text-white font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-[0.98] shadow-md shadow-purple-500/10"
              >
                {submitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                    <span>Logging in...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In as Client</span>
                  </>
                )}
              </button>

            </form>
          </div>

          {/* Bottom Navigation & Registration Links */}
          <div className="text-center space-y-4">
            <div className="text-xs text-zinc-500">
              Don't have an account?{' '}
              <Link to="/register" className="text-purple-650 dark:text-purple-450 hover:text-purple-500 font-semibold hover:underline">
                Register as Client
              </Link>
            </div>
            <div>
              <Link
                to="/"
                className="text-xs text-zinc-500 hover:text-zinc-400 transition-colors uppercase tracking-widest font-mono block"
              >
                ← Return to Portfolio Website
              </Link>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Login;
