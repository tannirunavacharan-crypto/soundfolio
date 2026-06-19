import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Mail, Phone, MapPin, Send, CheckCircle, AlertTriangle } from 'lucide-react';
import API from '../utils/api';

const Contact = () => {
  const location = useLocation();
  
  // Initial states
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: 'Film Score',
    budget: '₹25,000 - ₹75,000',
    timeline: '1-2 Weeks',
    description: '',
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Pre-fill projectType if user was redirected from a specific ServiceCard
  useEffect(() => {
    if (location.state && location.state.projectType) {
      setFormData((prev) => ({
        ...prev,
        projectType: location.state.projectType,
      }));
    }
  }, [location.state]);

  const validate = () => {
    let tempErrors = {};
    if (!formData.name.trim()) tempErrors.name = 'Full name is required';
    
    if (!formData.email.trim()) {
      tempErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      tempErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.description.trim()) {
      tempErrors.description = 'Please describe your project guidelines';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear validation error on change
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    setErrorMessage('');
    try {
      const response = await API.post('/inquiries', formData);
      if (response.data.success) {
        setSuccess(true);
        // Clear form
        setFormData({
          name: '',
          email: '',
          phone: '',
          projectType: 'Film Score',
          budget: '₹25,000 - ₹75,000',
          timeline: '1-2 Weeks',
          description: '',
        });
      }
    } catch (error) {
      console.error('Failed to submit inquiry:', error);
      setErrorMessage(error.response?.data?.message || 'Failed to submit inquiry. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const projectTypes = [
    'Film Score',
    'Jingle Creation',
    'Music Arrangement',
    'Audio Mixing',
    'Full Music Production',
    'Other / Custom Package'
  ];

  const budgets = [
    'Under ₹25,000',
    '₹25,000 - ₹75,000',
    '₹75,000 - ₹1,50,000',
    '₹1,50,000 - ₹3,00,000',
    '₹3,00,000+'
  ];

  const timelines = [
    'Urgent (Under 1 Week)',
    '1-2 Weeks',
    '3-4 Weeks',
    'Flexible (1 Month+)'
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      
      {/* Header */}
      <div className="text-center space-y-3">
        <span className="text-xs font-mono uppercase tracking-widest text-purple-500 font-bold">// INQUIRIES</span>
        <h1 className="text-4xl md:text-5xl font-extrabold text-white">Start a Collaboration</h1>
        <p className="text-zinc-500 text-sm max-w-lg mx-auto">
          Fill out the project brief form below. Ak Bhuker will review details and follow up with a custom proposal.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Side: Contact Information Cards */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glassmorphism rounded-2xl p-6 md:p-8 space-y-6">
            <h3 className="text-xl font-bold text-white border-b border-zinc-900 pb-3">Contact Details</h3>
            
            <div className="space-y-4">
              <div className="flex gap-4 items-start">
                <div className="p-3 bg-zinc-900 border border-zinc-800 rounded-lg text-purple-400">
                  <Mail size={18} />
                </div>
                <div>
                  <h4 className="text-xs uppercase font-mono tracking-widest text-zinc-500">Email Address</h4>
                  <a href="mailto:akbhuker642@gmail.com" className="text-sm text-zinc-300 hover:text-purple-400 transition-colors">
                    akbhuker642@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="p-3 bg-zinc-900 border border-zinc-800 rounded-lg text-amber-500">
                  <Phone size={18} />
                </div>
                <div>
                  <h4 className="text-xs uppercase font-mono tracking-widest text-zinc-500">Phone Support</h4>
                  <a href="tel:+919876543210" className="text-sm text-zinc-300 hover:text-amber-400 transition-colors">
                    +91 98765 43210
                  </a>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="p-3 bg-zinc-900 border border-zinc-800 rounded-lg text-purple-400">
                  <MapPin size={18} />
                </div>
                <div>
                  <h4 className="text-xs uppercase font-mono tracking-widest text-zinc-500">Location</h4>
                  <p className="text-sm text-zinc-300">
                    Hyderabad, India // Available Worldwide
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-zinc-900/40 border border-zinc-900 p-6 rounded-2xl space-y-3">
            <h4 className="text-xs uppercase font-bold tracking-widest text-amber-500 font-mono">Response Time</h4>
            <p className="text-zinc-400 text-xs leading-relaxed">
              We typically review and reply to all project briefs within <strong>24 to 48 business hours</strong>. If your request is urgent, please select the urgent timeline indicator.
            </p>
          </div>
        </div>

        {/* Right Side: Inquiry Form */}
        <div className="lg:col-span-7">
          {success ? (
            <div className="glassmorphism rounded-2xl p-8 text-center space-y-6 border border-purple-500/20 shadow-[0_0_30px_rgba(139,92,246,0.06)] py-16">
              <div className="inline-flex p-4 bg-purple-500/10 rounded-full text-purple-400 border border-purple-500/20">
                <CheckCircle size={40} className="stroke-[1.5]" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-white">Inquiry Submitted!</h3>
                <p className="text-zinc-400 text-sm max-w-md mx-auto">
                  Thank you for submitting your project brief. We have saved your details and sent a copy to Ak Bhuker's inbox. We will contact you shortly.
                </p>
              </div>
              <button
                onClick={() => setSuccess(false)}
                className="px-6 py-2.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs uppercase tracking-wider transition-colors"
              >
                Submit another request
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="glassmorphism rounded-2xl p-6 md:p-8 space-y-6 border border-zinc-800">
              
              {errorMessage && (
                <div className="p-4 bg-red-950/20 border border-red-500/20 rounded-xl flex items-start gap-3 text-red-400 text-sm">
                  <AlertTriangle size={18} className="flex-shrink-0 mt-0.5" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Full Name */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-xs font-bold uppercase tracking-wider text-zinc-400">Full Name *</label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`px-4 py-3 bg-zinc-900 border ${
                      errors.name ? 'border-red-500/50' : 'border-zinc-800 focus:border-purple-500'
                    } rounded-xl text-sm text-zinc-300 placeholder-zinc-600 focus:outline-none transition-all`}
                    placeholder="John Doe"
                  />
                  {errors.name && <span className="text-[10px] text-red-400">{errors.name}</span>}
                </div>

                {/* Email */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-zinc-400">Email Address *</label>
                  <input
                    id="email"
                    type="text"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`px-4 py-3 bg-zinc-900 border ${
                      errors.email ? 'border-red-500/50' : 'border-zinc-800 focus:border-purple-500'
                    } rounded-xl text-sm text-zinc-300 placeholder-zinc-600 focus:outline-none transition-all`}
                    placeholder="john@example.com"
                  />
                  {errors.email && <span className="text-[10px] text-red-400">{errors.email}</span>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Phone Number */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="phone" className="text-xs font-bold uppercase tracking-wider text-zinc-400">Phone Number</label>
                  <input
                    id="phone"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="px-4 py-3 bg-zinc-900 border border-zinc-800 focus:border-purple-500 rounded-xl text-sm text-zinc-300 placeholder-zinc-600 focus:outline-none transition-all"
                    placeholder="+91 98765 43210"
                  />
                </div>

                {/* Project Type */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="projectType" className="text-xs font-bold uppercase tracking-wider text-zinc-400">Project Type</label>
                  <select
                    id="projectType"
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    className="px-4 py-3 bg-zinc-900 border border-zinc-800 focus:border-purple-500 rounded-xl text-sm text-zinc-300 focus:outline-none cursor-pointer transition-all"
                  >
                    {projectTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Budget Range */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="budget" className="text-xs font-bold uppercase tracking-wider text-zinc-400">Budget Range</label>
                  <select
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="px-4 py-3 bg-zinc-900 border border-zinc-800 focus:border-purple-500 rounded-xl text-sm text-zinc-300 focus:outline-none cursor-pointer transition-all"
                  >
                    {budgets.map((b) => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                </div>

                {/* Timeline */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="timeline" className="text-xs font-bold uppercase tracking-wider text-zinc-400">Project Timeline</label>
                  <select
                    id="timeline"
                    name="timeline"
                    value={formData.timeline}
                    onChange={handleChange}
                    className="px-4 py-3 bg-zinc-900 border border-zinc-800 focus:border-purple-500 rounded-xl text-sm text-zinc-300 focus:outline-none cursor-pointer transition-all"
                  >
                    {timelines.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Description */}
              <div className="flex flex-col gap-2">
                <label htmlFor="description" className="text-xs font-bold uppercase tracking-wider text-zinc-400">Project Details & References *</label>
                <textarea
                  id="description"
                  name="description"
                  rows={5}
                  value={formData.description}
                  onChange={handleChange}
                  className={`px-4 py-3 bg-zinc-900 border ${
                    errors.description ? 'border-red-500/50' : 'border-zinc-800 focus:border-purple-500'
                  } rounded-xl text-sm text-zinc-300 placeholder-zinc-650 focus:outline-none transition-all resize-none`}
                  placeholder="Tell us about your film mood, commercial video length, sound styling, or reference tracks..."
                />
                {errors.description && <span className="text-[10px] text-red-400">{errors.description}</span>}
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 px-6 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:bg-purple-800 text-white font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all active:scale-95 shadow-md shadow-purple-500/10"
                >
                  {submitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                      <span>Sending Brief...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Project Inquiry</span>
                      <Send size={12} />
                    </>
                  )}
                </button>
              </div>

            </form>
          )}
        </div>
      </div>

    </div>
  );
};

export default Contact;
