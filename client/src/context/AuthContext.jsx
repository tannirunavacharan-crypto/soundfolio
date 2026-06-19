import React, { createContext, useState, useEffect, useContext } from 'react';
import API from '../utils/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      const storedToken = localStorage.getItem('soundfolio_token');
      const storedUser = localStorage.getItem('soundfolio_user');

      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
        
        try {
          // Double check server-side if token is still valid
          const response = await API.get('/auth/me');
          if (response.data.success) {
            setUser(response.data.user);
            localStorage.setItem('soundfolio_user', JSON.stringify(response.data.user));
          } else {
            handleLogout();
          }
        } catch (error) {
          console.error('Token validation failed:', error.message);
          handleLogout();
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const handleLogin = async (email, password) => {
    try {
      const response = await API.post('/auth/login', { email, password });
      if (response.data.success) {
        const { token, user: loggedUser } = response.data;
        
        localStorage.setItem('soundfolio_token', token);
        localStorage.setItem('soundfolio_user', JSON.stringify(loggedUser));
        
        setToken(token);
        setUser(loggedUser);
        return { success: true };
      } else {
        return { success: false, message: response.data.message || 'Login failed' };
      }
    } catch (error) {
      console.error('Login request failed:', error);
      const msg = error.response?.data?.message || 'Server error. Please try again.';
      return { success: false, message: msg };
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('soundfolio_token');
    localStorage.removeItem('soundfolio_user');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login: handleLogin, logout: handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export default AuthContext;
