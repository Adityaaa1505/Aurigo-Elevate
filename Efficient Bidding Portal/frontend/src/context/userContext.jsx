// src/context/AuthContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';

// Create the context
const AuthContext = createContext();

// Provide the context
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);

  // Load token, role, name, and email from localStorage on initialization
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedRole = localStorage.getItem('role');
    const storedName = localStorage.getItem('name');
    const storedEmail = localStorage.getItem('email');
    if (storedToken) setToken(storedToken);
    if (storedRole) setRole(storedRole);
    if (storedName) setName(storedName);
    if (storedEmail) setEmail(storedEmail);
  }, []);

  // Save token, role, name, and email to localStorage whenever they are updated
  useEffect(() => {
    if (token) localStorage.setItem('token', token);
    if (role) localStorage.setItem('role', role);
    if (name) localStorage.setItem('name', name);
    if (email) localStorage.setItem('email', email);
  }, [token, role, name, email]);

  // Clear all authentication details
  const clearAuth = () => {
    setToken(null);
    setRole(null);
    setName(null);
    setEmail(null);
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('name');
    localStorage.removeItem('email');
  };

  return (
    <AuthContext.Provider value={{ token, role, name, email, setToken, setRole, setName, setEmail, clearAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for using the Auth context
export default AuthContext;
