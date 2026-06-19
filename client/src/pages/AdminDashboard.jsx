import React, { useState, useEffect } from 'react';
import { 
  Music, Film, Settings, Users, Mail, Plus, Trash2, 
  Edit3, Eye, Calendar, Clock, Sparkles, Check, AlertCircle 
} from 'lucide-react';
import API from '../utils/api';
import { StatsSkeleton } from '../components/LoadingSkeleton';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('tracks');
  
  // Data States
  const [tracks, setTracks] = useState([]);
  const [services, setServices] = useState([]);
  const [projects, setProjects] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modals & Forms State
  const [modalType, setModalType] = useState(null); // 'add-track' | 'edit-track' | 'add-service' | ...
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({});
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');

  // Fetch all dashboard data
  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const [tracksRes, servicesRes, projectsRes, testimonialsRes, inquiriesRes] = await Promise.all([
        API.get('/tracks'),
        API.get('/services'),
        API.get('/projects'),
        API.get('/testimonials'),
        API.get('/inquiries'),
      ]);

      if (tracksRes.data.success) setTracks(tracksRes.data.data);
      if (servicesRes.data.success) setServices(servicesRes.data.data);
      if (projectsRes.data.success) setProjects(projectsRes.data.data);
      if (testimonialsRes.data.success) setTestimonials(testimonialsRes.data.data);
      if (inquiriesRes.data.success) setInquiries(inquiriesRes.data.data);

    } catch (error) {
      console.error('Failed to load dashboard statistics:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  // Form Field Handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Open Add Modals
  const openAddModal = (tab) => {
    setFormError('');
    setFormSuccess('');
    setEditingItem(null);
    
    // Set default keys depending on active tab
    if (tab === 'tracks') {
      setFormData({ title: '', genre: '', category: 'Film', description: '', audioUrl: '', imageUrl: '', duration: '' });
      setModalType('add-track');
    } else if (tab === 'services') {
      setFormData({ title: '', description: '', turnaroundTime: '' });
      setModalType('add-service');
    } else if (tab === 'projects') {
      setFormData({ clientName: '', projectType: 'Short Film Score', description: '', imageUrl: '', year: new Date().getFullYear() });
      setModalType('add-project');
    } else if (tab === 'testimonials') {
      setFormData({ clientName: '', feedback: '', rating: 5 });
      setModalType('add-testimonial');
    }
  };

  // Open Edit Modals
  const openEditModal = (item, type) => {
    setFormError('');
    setFormSuccess('');
    setEditingItem(item);
    setFormData({ ...item });
    setModalType(type);
  };

  // CRUD Operations
  const handleSave = async (e) => {
    e.preventDefault();
    setFormError('');
    setFormSuccess('');

    let endpoint = '';
    if (modalType.includes('track')) endpoint = '/tracks';
    else if (modalType.includes('service')) endpoint = '/services';
    else if (modalType.includes('project')) endpoint = '/projects';
    else if (modalType.includes('testimonial')) endpoint = '/testimonials';

    try {
      let response;
      if (modalType.startsWith('add')) {
        // Create operation
        response = await API.post(endpoint, formData);
      } else {
        // Update operation
        response = await API.put(`${endpoint}/${editingItem._id}`, formData);
      }

      if (response.data.success) {
        setFormSuccess('Record successfully saved!');
        setTimeout(() => {
          setModalType(null);
          fetchDashboardData();
        }, 1000);
      }
    } catch (error) {
      console.error('Failed to save record:', error);
      setFormError(error.response?.data?.message || 'Error occurred. Validate inputs.');
    }
  };

  const handleDelete = async (id, tab) => {
    if (!window.confirm('Are you sure you want to delete this record?')) return;

    let endpoint = '';
    if (tab === 'tracks') endpoint = '/tracks';
    else if (tab === 'services') endpoint = '/services';
    else if (tab === 'projects') endpoint = '/projects';
    else if (tab === 'testimonials') endpoint = '/testimonials';
    else if (tab === 'inquiries') endpoint = '/inquiries';

    try {
      const response = await API.delete(`${endpoint}/${id}`);
      if (response.data.success) {
        fetchDashboardData();
      }
    } catch (error) {
      console.error('Delete operation failed:', error);
      alert('Failed to delete the record.');
    }
  };

  // Tab configurations
  const tabs = [
    { id: 'tracks', label: 'Tracks', icon: <Music size={16} /> },
    { id: 'services', label: 'Services', icon: <Settings size={16} /> },
    { id: 'projects', label: 'Projects', icon: <Film size={16} /> },
    { id: 'testimonials', label: 'Testimonials', icon: <Users size={16} /> },
    { id: 'inquiries', label: 'Inquiries', icon: <Mail size={16} /> },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Dashboard Title */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-zinc-900 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-white">Composer Control Center</h1>
          <p className="text-zinc-500 text-xs uppercase tracking-widest font-mono mt-1">Manage SoundFolio contents and messages</p>
        </div>
        <div className="flex gap-2">
          {activeTab !== 'inquiries' && (
            <button
              onClick={() => openAddModal(activeTab)}
              className="px-4 py-2.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all shadow-md shadow-purple-500/10 active:scale-95"
            >
              <Plus size={14} />
              <span>Add New Item</span>
            </button>
          )}
        </div>
      </div>

      {/* Analytics Statistics Panel */}
      {loading ? (
        <StatsSkeleton />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Total Tracks */}
          <div className="glassmorphism rounded-2xl p-6 flex items-center gap-5 border-l-4 border-purple-500">
            <div className="p-4 bg-zinc-900 rounded-xl text-purple-400">
              <Music size={24} />
            </div>
            <div>
              <h3 className="text-zinc-500 text-xs uppercase font-mono tracking-wider">Total Tracks</h3>
              <p className="text-3xl font-extrabold text-white">{tracks.length}</p>
            </div>
          </div>

          {/* Total Projects */}
          <div className="glassmorphism rounded-2xl p-6 flex items-center gap-5 border-l-4 border-amber-500">
            <div className="p-4 bg-zinc-900 rounded-xl text-amber-500">
              <Film size={24} />
            </div>
            <div>
              <h3 className="text-zinc-500 text-xs uppercase font-mono tracking-wider">Total Projects</h3>
              <p className="text-3xl font-extrabold text-white">{projects.length}</p>
            </div>
          </div>

          {/* Total Inquiries */}
          <div className="glassmorphism rounded-2xl p-6 flex items-center gap-5 border-l-4 border-purple-500">
            <div className="p-4 bg-zinc-900 rounded-xl text-purple-400">
              <Mail size={24} />
            </div>
            <div>
              <h3 className="text-zinc-500 text-xs uppercase font-mono tracking-wider">New Inquiries</h3>
              <p className="text-3xl font-extrabold text-white">{inquiries.length}</p>
            </div>
          </div>
        </div>
      )}

      {/* Tabs Navigation */}
      <div className="flex border-b border-zinc-900 overflow-x-auto gap-2 select-none no-scrollbar">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-5 py-3.5 rounded-t-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 border-b-2 transition-all whitespace-nowrap ${
              activeTab === tab.id
                ? 'border-purple-500 bg-zinc-900/40 text-purple-400'
                : 'border-transparent text-zinc-400 hover:text-white'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Active Tab Content Listing */}
      <div className="space-y-6">
        {loading ? (
          <div className="text-center py-20 text-zinc-500">Loading control panels...</div>
        ) : (
          <div className="bg-zinc-900/20 border border-zinc-900 rounded-2xl overflow-hidden">
            
            {/* 1. TRACKS TAB */}
            {activeTab === 'tracks' && (
              <div className="divide-y divide-zinc-900">
                {tracks.length > 0 ? (
                  tracks.map((track) => (
                    <div key={track._id} className="p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:bg-zinc-900/20">
                      <div>
                        <span className="text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-purple-950/80 border border-purple-500/20 text-purple-400 font-mono">
                          {track.category}
                        </span>
                        <h4 className="text-base font-bold text-white mt-1.5">{track.title}</h4>
                        <p className="text-xs text-zinc-500 mt-0.5">{track.genre} // {track.duration}</p>
                      </div>
                      <div className="flex gap-2 w-full sm:w-auto justify-end">
                        <button
                          onClick={() => openEditModal(track, 'edit-track')}
                          className="p-2.5 rounded-lg border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 hover:bg-zinc-900"
                          aria-label="Edit track"
                        >
                          <Edit3 size={14} />
                        </button>
                        <button
                          onClick={() => handleDelete(track._id, 'tracks')}
                          className="p-2.5 rounded-lg border border-zinc-800 text-red-400 hover:text-red-300 hover:border-red-950 hover:bg-red-950/20"
                          aria-label="Delete track"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-12 text-center text-zinc-600">No tracks configured yet.</div>
                )}
              </div>
            )}

            {/* 2. SERVICES TAB */}
            {activeTab === 'services' && (
              <div className="divide-y divide-zinc-900">
                {services.length > 0 ? (
                  services.map((service) => (
                    <div key={service._id} className="p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:bg-zinc-900/20">
                      <div className="space-y-1">
                        <h4 className="text-base font-bold text-white">{service.title}</h4>
                        <p className="text-xs text-zinc-500 flex items-center gap-1">
                          <Clock size={12} className="text-amber-500" />
                          <span>Delivery: {service.turnaroundTime}</span>
                        </p>
                      </div>
                      <div className="flex gap-2 w-full sm:w-auto justify-end">
                        <button
                          onClick={() => openEditModal(service, 'edit-service')}
                          className="p-2.5 rounded-lg border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 hover:bg-zinc-900"
                          aria-label="Edit service"
                        >
                          <Edit3 size={14} />
                        </button>
                        <button
                          onClick={() => handleDelete(service._id, 'services')}
                          className="p-2.5 rounded-lg border border-zinc-800 text-red-400 hover:text-red-300 hover:border-red-950 hover:bg-red-950/20"
                          aria-label="Delete service"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-12 text-center text-zinc-600">No services configured yet.</div>
                )}
              </div>
            )}

            {/* 3. PROJECTS TAB */}
            {activeTab === 'projects' && (
              <div className="divide-y divide-zinc-900">
                {projects.length > 0 ? (
                  projects.map((proj) => (
                    <div key={proj._id} className="p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:bg-zinc-900/20">
                      <div>
                        <span className="text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-amber-500 text-zinc-950 font-mono">
                          {proj.projectType}
                        </span>
                        <h4 className="text-base font-bold text-white mt-1.5">{proj.clientName}</h4>
                        <p className="text-xs text-zinc-500 mt-0.5">Year: {proj.year}</p>
                      </div>
                      <div className="flex gap-2 w-full sm:w-auto justify-end">
                        <button
                          onClick={() => openEditModal(proj, 'edit-project')}
                          className="p-2.5 rounded-lg border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 hover:bg-zinc-900"
                          aria-label="Edit project"
                        >
                          <Edit3 size={14} />
                        </button>
                        <button
                          onClick={() => handleDelete(proj._id, 'projects')}
                          className="p-2.5 rounded-lg border border-zinc-800 text-red-400 hover:text-red-300 hover:border-red-950 hover:bg-red-950/20"
                          aria-label="Delete project"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-12 text-center text-zinc-600">No projects configured yet.</div>
                )}
              </div>
            )}

            {/* 4. TESTIMONIALS TAB */}
            {activeTab === 'testimonials' && (
              <div className="divide-y divide-zinc-900">
                {testimonials.length > 0 ? (
                  testimonials.map((test) => (
                    <div key={test._id} className="p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:bg-zinc-900/20">
                      <div className="max-w-xl">
                        <h4 className="text-base font-bold text-white">{test.clientName}</h4>
                        <p className="text-xs text-zinc-400 italic mt-1">"{test.feedback}"</p>
                        <p className="text-xs text-amber-500 mt-1">★ {test.rating}/5 Rating</p>
                      </div>
                      <div className="flex gap-2 w-full sm:w-auto justify-end">
                        <button
                          onClick={() => openEditModal(test, 'edit-testimonial')}
                          className="p-2.5 rounded-lg border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 hover:bg-zinc-900"
                          aria-label="Edit testimonial"
                        >
                          <Edit3 size={14} />
                        </button>
                        <button
                          onClick={() => handleDelete(test._id, 'testimonials')}
                          className="p-2.5 rounded-lg border border-zinc-800 text-red-400 hover:text-red-300 hover:border-red-950 hover:bg-red-950/20"
                          aria-label="Delete testimonial"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-12 text-center text-zinc-600">No client reviews configured yet.</div>
                )}
              </div>
            )}

            {/* 5. INQUIRIES TAB */}
            {activeTab === 'inquiries' && (
              <div className="divide-y divide-zinc-900">
                {inquiries.length > 0 ? (
                  inquiries.map((inq) => (
                    <div key={inq._id} className="p-6 hover:bg-zinc-900/20 flex flex-col gap-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="text-base font-bold text-white">{inq.name}</h4>
                          <a href={`mailto:${inq.email}`} className="text-xs text-purple-400 hover:underline">{inq.email}</a>
                          {inq.phone && <p className="text-xs text-zinc-500 mt-0.5">Phone: {inq.phone}</p>}
                        </div>
                        <button
                          onClick={() => handleDelete(inq._id, 'inquiries')}
                          className="p-2 text-red-400 hover:text-red-300 border border-zinc-800 hover:border-red-950 rounded-lg hover:bg-red-950/20"
                          aria-label="Dismiss inquiry"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-zinc-900/40 rounded-xl border border-zinc-800/50 text-xs">
                        <div>
                          <span className="text-zinc-500 block uppercase font-mono">Project Type</span>
                          <span className="text-zinc-300 font-semibold">{inq.projectType}</span>
                        </div>
                        <div>
                          <span className="text-zinc-500 block uppercase font-mono">Budget Range</span>
                          <span className="text-zinc-300 font-semibold">{inq.budget || 'Not specified'}</span>
                        </div>
                        <div>
                          <span className="text-zinc-500 block uppercase font-mono">Timeline</span>
                          <span className="text-zinc-300 font-semibold">{inq.timeline || 'Not specified'}</span>
                        </div>
                        <div>
                          <span className="text-zinc-500 block uppercase font-mono">Received</span>
                          <span className="text-zinc-300 font-semibold">
                            {new Date(inq.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>

                      <div className="text-sm text-zinc-400 leading-relaxed font-sans bg-zinc-950/50 p-4 rounded-xl border border-zinc-900">
                        {inq.description}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-12 text-center text-zinc-600">No contact inquiries received yet.</div>
                )}
              </div>
            )}

          </div>
        )}
      </div>

      {/* CRUD MODALS OVERLAYS */}
      {modalType && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glassmorphism w-full max-w-xl rounded-2xl p-6 md:p-8 space-y-6 relative border border-zinc-800 max-h-[90vh] overflow-y-auto">
            
            {/* Close Button */}
            <button
              onClick={() => setModalType(null)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-white"
            >
              ✕
            </button>

            {/* Modal Title */}
            <div>
              <h3 className="text-xl font-bold text-white capitalize">
                {modalType.replace('-', ' ')}
              </h3>
              <p className="text-zinc-500 text-xs">Fill in inputs to write to MongoDB</p>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-left">
              {formError && (
                <div className="p-3 bg-red-950/20 border border-red-500/20 rounded-lg text-red-400 text-xs flex items-center gap-2">
                  <AlertCircle size={14} />
                  <span>{formError}</span>
                </div>
              )}
              {formSuccess && (
                <div className="p-3 bg-emerald-950/20 border border-emerald-500/20 rounded-lg text-emerald-400 text-xs flex items-center gap-2">
                  <Check size={14} />
                  <span>{formSuccess}</span>
                </div>
              )}

              {/* 1. Track Fields */}
              {modalType.includes('track') && (
                <>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs uppercase font-bold tracking-wider text-zinc-400">Track Title *</label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title || ''}
                      onChange={handleInputChange}
                      className="px-3 py-2.5 bg-zinc-950 border border-zinc-800 rounded-lg text-sm focus:outline-none focus:border-purple-500 text-white"
                      placeholder="e.g. Echoes of the Cinematic Horizon"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs uppercase font-bold tracking-wider text-zinc-400">Genre *</label>
                      <input
                        type="text"
                        name="genre"
                        value={formData.genre || ''}
                        onChange={handleInputChange}
                        className="px-3 py-2.5 bg-zinc-950 border border-zinc-800 rounded-lg text-sm focus:outline-none focus:border-purple-500 text-white"
                        placeholder="e.g. Orchestral / Cyberpunk"
                        required
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs uppercase font-bold tracking-wider text-zinc-400">Category *</label>
                      <select
                        name="category"
                        value={formData.category || 'Film'}
                        onChange={handleInputChange}
                        className="px-3 py-2.5 bg-zinc-950 border border-zinc-800 rounded-lg text-sm focus:outline-none focus:border-purple-500 text-zinc-300"
                        required
                      >
                        {['Film', 'Jingle', 'Arrangement', 'Background Score', 'Commercial'].map((cat) => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs uppercase font-bold tracking-wider text-zinc-400">Audio URL (direct link) *</label>
                      <input
                        type="url"
                        name="audioUrl"
                        value={formData.audioUrl || ''}
                        onChange={handleInputChange}
                        className="px-3 py-2.5 bg-zinc-950 border border-zinc-800 rounded-lg text-sm focus:outline-none focus:border-purple-500 text-white"
                        placeholder="https://www.soundhelix.com/...mp3"
                        required
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs uppercase font-bold tracking-wider text-zinc-400">Cover Art Image URL</label>
                      <input
                        type="url"
                        name="imageUrl"
                        value={formData.imageUrl || ''}
                        onChange={handleInputChange}
                        className="px-3 py-2.5 bg-zinc-950 border border-zinc-800 rounded-lg text-sm focus:outline-none focus:border-purple-500 text-white"
                        placeholder="https://images.unsplash.com/..."
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs uppercase font-bold tracking-wider text-zinc-400">Duration (e.g. 3:45)</label>
                    <input
                      type="text"
                      name="duration"
                      value={formData.duration || ''}
                      onChange={handleInputChange}
                      className="px-3 py-2.5 bg-zinc-950 border border-zinc-800 rounded-lg text-sm focus:outline-none focus:border-purple-500 text-white"
                      placeholder="e.g. 5:12"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs uppercase font-bold tracking-wider text-zinc-400">Description</label>
                    <textarea
                      name="description"
                      rows={3}
                      value={formData.description || ''}
                      onChange={handleInputChange}
                      className="px-3 py-2.5 bg-zinc-950 border border-zinc-800 rounded-lg text-sm focus:outline-none focus:border-purple-500 text-white resize-none"
                      placeholder="Short notes about the track scope, arrangement structure..."
                    />
                  </div>
                </>
              )}

              {/* 2. Service Fields */}
              {modalType.includes('service') && (
                <>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs uppercase font-bold tracking-wider text-zinc-400">Service Title *</label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title || ''}
                      onChange={handleInputChange}
                      className="px-3 py-2.5 bg-zinc-950 border border-zinc-800 rounded-lg text-sm focus:outline-none focus:border-purple-500 text-white"
                      placeholder="e.g. Brand Sonic Logos"
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs uppercase font-bold tracking-wider text-zinc-400">Turnaround Time *</label>
                    <input
                      type="text"
                      name="turnaroundTime"
                      value={formData.turnaroundTime || ''}
                      onChange={handleInputChange}
                      className="px-3 py-2.5 bg-zinc-950 border border-zinc-800 rounded-lg text-sm focus:outline-none focus:border-purple-500 text-white"
                      placeholder="e.g. 5 to 7 business days"
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs uppercase font-bold tracking-wider text-zinc-400">Service Description *</label>
                    <textarea
                      name="description"
                      rows={4}
                      value={formData.description || ''}
                      onChange={handleInputChange}
                      className="px-3 py-2.5 bg-zinc-950 border border-zinc-800 rounded-lg text-sm focus:outline-none focus:border-purple-500 text-white resize-none"
                      placeholder="Detailed overview of what is included in the package..."
                      required
                    />
                  </div>
                </>
              )}

              {/* 3. Project Fields */}
              {modalType.includes('project') && (
                <>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs uppercase font-bold tracking-wider text-zinc-400">Client Name / Project Title *</label>
                    <input
                      type="text"
                      name="clientName"
                      value={formData.clientName || ''}
                      onChange={handleInputChange}
                      className="px-3 py-2.5 bg-zinc-950 border border-zinc-800 rounded-lg text-sm focus:outline-none focus:border-purple-500 text-white"
                      placeholder="e.g. Velocity Motors"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs uppercase font-bold tracking-wider text-zinc-400">Project Type *</label>
                      <input
                        type="text"
                        name="projectType"
                        value={formData.projectType || ''}
                        onChange={handleInputChange}
                        className="px-3 py-2.5 bg-zinc-950 border border-zinc-800 rounded-lg text-sm focus:outline-none focus:border-purple-500 text-white"
                        placeholder="e.g. Brand Campaign"
                        required
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs uppercase font-bold tracking-wider text-zinc-400">Year *</label>
                      <input
                        type="number"
                        name="year"
                        value={formData.year || ''}
                        onChange={handleInputChange}
                        className="px-3 py-2.5 bg-zinc-950 border border-zinc-800 rounded-lg text-sm focus:outline-none focus:border-purple-500 text-white font-mono"
                        placeholder="2025"
                        required
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs uppercase font-bold tracking-wider text-zinc-400">Thumbnail Image URL</label>
                    <input
                      type="url"
                      name="imageUrl"
                      value={formData.imageUrl || ''}
                      onChange={handleInputChange}
                      className="px-3 py-2.5 bg-zinc-950 border border-zinc-800 rounded-lg text-sm focus:outline-none focus:border-purple-500 text-white"
                      placeholder="https://images.unsplash.com/..."
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs uppercase font-bold tracking-wider text-zinc-400">Description *</label>
                    <textarea
                      name="description"
                      rows={3}
                      value={formData.description || ''}
                      onChange={handleInputChange}
                      className="px-3 py-2.5 bg-zinc-950 border border-zinc-800 rounded-lg text-sm focus:outline-none focus:border-purple-500 text-white resize-none"
                      placeholder="Summary of what score or jingle elements were composed..."
                      required
                    />
                  </div>
                </>
              )}

              {/* 4. Testimonial Fields */}
              {modalType.includes('testimonial') && (
                <>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs uppercase font-bold tracking-wider text-zinc-400">Client Name & Affiliation *</label>
                    <input
                      type="text"
                      name="clientName"
                      value={formData.clientName || ''}
                      onChange={handleInputChange}
                      className="px-3 py-2.5 bg-zinc-950 border border-zinc-800 rounded-lg text-sm focus:outline-none focus:border-purple-500 text-white"
                      placeholder="e.g. Marcus Vance (Velocity Motors)"
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs uppercase font-bold tracking-wider text-zinc-400">Rating (1-5 Stars) *</label>
                    <select
                      name="rating"
                      value={formData.rating || 5}
                      onChange={handleInputChange}
                      className="px-3 py-2.5 bg-zinc-950 border border-zinc-800 rounded-lg text-sm focus:outline-none focus:border-purple-500 text-zinc-300"
                      required
                    >
                      {[5, 4, 3, 2, 1].map((r) => (
                        <option key={r} value={r}>{r} Stars</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs uppercase font-bold tracking-wider text-zinc-400">Feedback *</label>
                    <textarea
                      name="feedback"
                      rows={4}
                      value={formData.feedback || ''}
                      onChange={handleInputChange}
                      className="px-3 py-2.5 bg-zinc-950 border border-zinc-800 rounded-lg text-sm focus:outline-none focus:border-purple-500 text-white resize-none"
                      placeholder="Write review details..."
                      required
                    />
                  </div>
                </>
              )}

              {/* Modal Actions */}
              <div className="flex gap-3 justify-end pt-4 border-t border-zinc-950">
                <button
                  type="button"
                  onClick={() => setModalType(null)}
                  className="px-5 py-2.5 rounded-lg bg-zinc-950 hover:bg-zinc-900 border border-zinc-850 text-zinc-400 hover:text-white font-semibold text-xs uppercase tracking-wider transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs uppercase tracking-wider transition-colors"
                >
                  Save Record
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminDashboard;
