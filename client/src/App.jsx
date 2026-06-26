import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Providers
import { AuthProvider } from './context/AuthContext';
import { AudioProvider } from './context/AudioContext';
import { ThemeProvider } from './context/ThemeContext';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AudioPlayer from './components/AudioPlayer';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Portfolio from './pages/Portfolio';
import Services from './pages/Services';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import Register from './pages/Register';
import UserDashboard from './pages/UserDashboard';
import AdminLogin from './pages/AdminLogin';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AudioProvider>
          <Router basename={import.meta.env.BASE_URL}>
            <div className="min-h-screen flex flex-col bg-zinc-950 text-zinc-300 font-sans selection:bg-purple-500 selection:text-white relative transition-colors duration-300">
              {/* Header Navigation */}
              <Navbar />

              {/* Main Content Area */}
              <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Routes>
                  {/* Public Authentication Routes */}
                  <Route path="/login" element={<Login />} />
                  <Route path="/admin-login" element={<AdminLogin />} />
                  <Route path="/register" element={<Register />} />
                  
                  {/* Protected Main Pages (requires login) */}
                  <Route 
                    path="/" 
                    element={
                      <ProtectedRoute allowedRoles={['admin', 'user']}>
                        <Home />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/about" 
                    element={
                      <ProtectedRoute allowedRoles={['admin', 'user']}>
                        <About />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/portfolio" 
                    element={
                      <ProtectedRoute allowedRoles={['admin', 'user']}>
                        <Portfolio />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/services" 
                    element={
                      <ProtectedRoute allowedRoles={['admin', 'user']}>
                        <Services />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/projects" 
                    element={
                      <ProtectedRoute allowedRoles={['admin', 'user']}>
                        <Projects />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/contact" 
                    element={
                      <ProtectedRoute allowedRoles={['admin', 'user']}>
                        <Contact />
                      </ProtectedRoute>
                    } 
                  />
                  
                  {/* Protected Admin Console Route */}
                  <Route 
                    path="/admin" 
                    element={
                      <ProtectedRoute allowedRoles={['admin']}>
                        <AdminDashboard />
                      </ProtectedRoute>
                    } 
                  />

                  {/* Protected Client Dashboard Route */}
                  <Route 
                    path="/dashboard" 
                    element={
                      <ProtectedRoute allowedRoles={['admin', 'user']}>
                        <UserDashboard />
                      </ProtectedRoute>
                    } 
                  />
                </Routes>
              </main>

              {/* Sticky Persistent Audio Player */}
              <AudioPlayer />

              {/* Footer Contact and Social */}
              <Footer />
            </div>
          </Router>
        </AudioProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
